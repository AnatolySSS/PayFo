import { makeRubText_nominative } from './makeRubText_nominative.js';
import { makeRubText_genitive } from './makeRubText_genitive.js';
import { declinationDays } from './declinationDays.js';
import { changeDateType } from './changeDateType.js';
import { formatDate } from './formatDate.js';
import { findInForceFuDay, findLastDayForPayFu } from './findInForceFuDay.js';
import { paymentFu } from './variables.js';
import { PaymentFu } from './payment_fu.js';
import { courtPenalty } from './variables.js';
import { CourtPenalty } from './court_penalty.js';
import { AppDate } from './app_date.js';
import { COLUMN_NAME_0, COLUMN_NAME_1, COLUMN_NAME_2, COLUMN_NAME_3, COLUMN_NAME_4 } from './variables.js';
import { COLUMN_NAME_5, COLUMN_NAME_6, COLUMN_NAME_7, COLUMN_NAME_8 } from './variables.js';
import { DAY } from './variables.js';
import { allClaims } from './objects/allClaims';

/* Объект для выплаты по решению ФУ

    * id - порядковый № выплаты
    * fu - Финансовый уполномоченный
    * date - дата решения
    * number - № решения
    * order - № платежного поручения
    // * days_delay - количество дней просрочки
    // * penalty_summ - сумма неустойки
    //
    // * last_day - последний день 20го срока
    // * penalty_day - первый день начисления неустойки (21й день)
*/
// let date_sv = new AppDate("date_sv")
// let date_uts = new AppDate("date_uts")
// let date_ev = new AppDate("date_ev")
// let date_stor = new AppDate("date_stor")

class PenaltyCourtPeriod {
  start_date
  end_date

  constructor(start_date, end_date){
    this.start_date = start_date;
    this.end_date = end_date;
  }
  getStartDateFormatted() { return formatDate(new Date(this.start_date)); }
  getEndDateFormatted() { return formatDate(new Date(this.end_date)); }
}

class PenaltyPeriod {
  start_date
  end_date
  days_delay
  penalty_summ

  constructor(start_date, end_date){
    this.start_date = start_date;
    this.end_date = end_date;
  }
  getStartDateFormatted() { return formatDate(new Date(this.start_date)); }
  getEndDateFormatted() { return formatDate(new Date(this.end_date)); }
}

class ClaimCourt {
  id

  date_sv
  date_uts
  date_ev
  date_stor

  name
  type
  type_text
  type_text_nominative
  type_text_full
  summ
  summ_text
  from
  to
  without

  last_day
  last_day_form
  penalty_day
  penalty_day_form

  days_delay
  penalty_summ

  penalty_period = [];

  constructor(id, name, type, summ, from, to, without) {

    this.date_sv = new AppDate("date_sv")
    this.date_uts = new AppDate("date_uts")
    this.date_ev = new AppDate("date_ev")
    this.date_stor = new AppDate("date_stor")

    this.id = id;
    this.name = name;
    this.type = type;
    this.summ = Number(summ.value.replace(/\s+/g, ''));
    this.summ_text = makeRubText_genitive(this.summ)
    this.from = Date.parse(changeDateType(from.value) + 'T00:00:00');
    this.to = Date.parse(changeDateType(to.value) + 'T00:00:00');
    this.without = without;

    allClaims.claims.forEach(element => {
      if (this.name.value == element.claim) {
          this.type_text = element.short
          this.type_text_nominative = element.nom
          if (this.name.value == "УТС") {
            this.type_text = "страхового возмещения в части УТС"
            this.type_text_nominative = "страховое возмещение в части УТС"
          }
      }
    })

    //Вычисление количества дней между датой выплаты и 20м днем
    switch (this.name.options.selectedIndex) {
      case 1:
      case 5:
        this.app_day = this.date_sv.getAppDate();
        this.app_day_form = this.date_sv.getAppDateFormatted();
        this.last_day = this.date_sv.getLastDay();
        this.last_day_form = this.date_sv.getLastDayFormatted();
        this.penalty_day = this.date_sv.getPenaltyDay();
        this.penalty_day_form = this.date_sv.getPenaltyDayFormatted();
        break;
      case 2:
        this.app_day = this.date_uts.getAppDate();
        this.app_day_form = this.date_uts.getAppDateFormatted();
        this.last_day = this.date_uts.getLastDay();
        this.last_day_form = this.date_uts.getLastDayFormatted();
        this.penalty_day = this.date_uts.getPenaltyDay();
        this.penalty_day_form = this.date_uts.getPenaltyDayFormatted();
        break;
      case 3:
        this.app_day = this.date_ev.getAppDate();
        this.app_day_form = this.date_ev.getAppDateFormatted();
        this.last_day = this.date_ev.getLastDay();
        this.last_day_form = this.date_ev.getLastDayFormatted();
        this.penalty_day = this.date_ev.getPenaltyDay();
        this.penalty_day_form = this.date_ev.getPenaltyDayFormatted();
        break;
      case 4:
        this.app_day = this.date_stor.getAppDate();
        this.app_day_form = this.date_stor.getAppDateFormatted();
        this.last_day = this.date_stor.getLastDay();
        this.last_day_form = this.date_stor.getLastDayFormatted();
        this.penalty_day = this.date_stor.getPenaltyDay();
        this.penalty_day_form = this.date_stor.getPenaltyDayFormatted();
        break;
    }
  }

  setObject() {
    return {
        name : this.name.value,
        type : this.type.value,
        summ : this.summ,
        from : this.from.value,
        to : this.to.value,
        without : this.without.checked,
    }
  }
}

export class PaymentCourt {

  id

  court
  type
  number
  order

  date
  date_end_form
  in_force_date
  pay_date

  claim = [];
  claimObjects = []
  total_penalty_summ_court
  penalty_court_period = [];
  max_penalty_period
  max_days_delay
  count_days
  fu_claim_set
  fu_claim_set_type

  app_to_court_paragraph
  court_decision_paragraph
  court_decision_paragraph_motivation
  court_analize_period_paragraph_motivation
  court_execution_paragraph
  court_execution_paragraph_motivation
  main_paragraph

  constructor(id, court, type, number, date, date_end_form, in_force_date, pay_date, order) {

    //Получение массива значений всех переменных решений ФУ
    var number_of_fus = $('.fus').length; //Получение количества строк с выплатами
    var fu_names = $('.fu_names'); //Получение массива ФУ
    var fu_types = $('.fu_types'); //Получение массива дат решений ФУ
    var fu_dates = $('.fu_dates'); //Получение массива дат решений ФУ
    var fu_numbers = $('.fu_numbers'); //Получение массива номеров решений ФУ

    var fu_app_dates = $('.fu_app_dates'); //Получение массива номеров решений ФУ
    var fu_orders = $('.fu_orders'); //Получение массива номеров решений ФУ

    var fu_pay_dates = $('.fu_pay_dates'); //Получение массива дат решений ФУ
    var fu_in_force_dates = $('.fu_in_force_dates'); //Получение массива дат решений ФУ
    var fu_last_day_for_pay_dates = $('.fu_last_day_for_pay_dates'); //Получение массива дат решений ФУ

    var add_fu_info_suspension_types = $('.add_fu_info_suspension_types'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_dates = $('.add_fu_info_suspension_dates'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_numbers = $('.add_fu_info_suspension_numbers'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_court_names = $('.add_fu_info_suspension_court_names'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_court_numbers = $('.add_fu_info_suspension_court_numbers'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_court_results = $('.add_fu_info_suspension_court_results'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_court_dates = $('.add_fu_info_suspension_court_dates'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_court_date_end_forms = $('.add_fu_info_suspension_court_date_end_forms'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_court_date_in_forces = $('.add_fu_info_suspension_court_date_in_forces'); //Получение массива номеров решений ФУ

    this.fu_claim_set = new Set();
    this.fu_claim_set.clear();

    //Создание экземпляров решений ФУ
    for (var i = 0; i < number_of_fus; i++) {
      paymentFu[i] = new PaymentFu(i + 1,
                                 fu_names[i],
                                 fu_types[i],
                                 fu_dates[i],
                                 fu_numbers[i],
                                 fu_app_dates[i],
                                 fu_orders[i],
                                 fu_pay_dates[i],
                                 fu_in_force_dates[i],
                                 fu_last_day_for_pay_dates[i],
                                 add_fu_info_suspension_types[i],
                                 add_fu_info_suspension_dates[i],
                                 add_fu_info_suspension_numbers[i],
                                 add_fu_info_suspension_court_names[i],
                                 add_fu_info_suspension_court_numbers[i],
                                 add_fu_info_suspension_court_results[i],
                                 add_fu_info_suspension_court_dates[i],
                                 add_fu_info_suspension_court_date_end_forms[i],
                                 add_fu_info_suspension_court_date_in_forces[i]);
      for (var j = 0; j < paymentFu[i].claim.length; j++) {
        if (paymentFu[i].claim[j].summ != "" ||
            paymentFu[i].claim[j].type.options.selectedIndex == 2 ||
            (paymentFu[i].type.options.selectedIndex == 2 && paymentFu[i].date != "")) {
          this.fu_claim_set.add(paymentFu[i].claim[j].name.options.selectedIndex);
        }
      }
    }

    //Получение массива значений всех переменных решений судов
    var number_of_courts = $('.courts').length; //Получение количества строк с выплатами
    var court_dates = $('.court_dates'); //Получение массива дат решений судов
    var numberOfPenaltyCourtPeriod = 0;
    var numberOfPenaltyPeriod;
    //Создание экземпляров решений ФУ
    for (var i = 0; i < number_of_courts; i++) {
      courtPenalty[i] = new CourtPenalty(i + 1,
                                   court_dates[i]);
     for (var j = 0; j < courtPenalty[i].claim.length; j++) {
       if (courtPenalty[i].claim[j].name.options.selectedIndex == 5) {
         this.penalty_court_period[numberOfPenaltyCourtPeriod] = new PenaltyCourtPeriod(courtPenalty[i].claim[j].from,
                                                                       courtPenalty[i].claim[j].to);
         numberOfPenaltyCourtPeriod++;
       }
     }
    }

    this.id = id;
    this.court = court;
    this.type = type
    this.number = number;
    this.date = date;
    this.date_end_form = date_end_form
    this.in_force_date = in_force_date;
    this.pay_date = pay_date;
    this.order = order

    this.total_penalty_summ_court = 0;
    this.max_penalty_period = 0;
    this.max_days_delay = 0;
    this.fu_claim_set_type = 0;

    var main_fo_name = document.querySelector("#fo_name").value
    let fo_name_nominative = "Финансовая организация";
    let fo_name_genitive = "Финансовой организации";
    let fo_name_accusative = "Финансовую организацию";
    let fo_name_instrumental = "Финансовой организацией";
    let make_a_payment = " осуществила";
    let fulfill = " исполнила";
    let keep = " удержала";
    let request = "запросила"
    let send = "направила"
    let deny = "отказала"
    let must = "должна"
    let notify = "уведомила"
    let transfer = "перечислила"

    this.app_to_court_paragraph = ""
    this.court_decision_paragraph = ""
    this.court_decision_paragraph_motivation = ""
    this.court_analize_period_paragraph_motivation = ""
    this.court_execution_paragraph = ""
    this.court_execution_paragraph_motivation = ""
    this.main_paragraph = ""
    
    //Получение количества удовлетворенных требований для каждого решения
    var number_of_payments = $('div.payments').length; //Получение количества строк с выплатами
    var number_of_fus = $('div.fus').length; //Получение количества строк с выплатами
    var number_of_claims = $('.court_claim_' + id).length;
    var names = $('.court_claim_' + id); //Получение массива требований
    var types = $('.court_claim_type_' + id); //Получение массива требований
    var summs = $('.court_claim_summ_' + id); //Получение массива дат решений
    var froms = $('.date_court_penalty_from_' + id); //Получение массива дат начала периода судебных неустоек
    var tos = $('.date_court_penalty_to_' + id); //Получение массива дат конца периода судебных неустоек
    var without_periods = $('.court_without_period_' + id); //Получение массива неустоек без периода

    var app_to_court_paragraph_all_claims = ""
    var court_decision_paragraph_all_claims = ""
    var court_decision_paragraph_all_claims_count = 0
    var court_decision_paragraph_claims_denied = ""
    var court_decision_paragraph_claims_denied_count = 0
    var court_decision_paragraph_claims_without_consideration = ""
    var court_decision_paragraph_claims_without_consideration_count = 0
    var court_decision_paragraph_has_penalty = ""
    var court_decision_paragraph_has_penalty_boolean = false
    var court_execution_paragraph_all_claims = ""
    var court_execution_paragraph_all_claims_summ = 0

    for (var i = 0; i < number_of_claims; i++) {
      numberOfPenaltyPeriod = 0;
      this.claim[i] = new ClaimCourt(i + 1,
                                  names[i],
                                  types[i],
                                  summs[i],
                                  froms[i],
                                  tos[i],
                                  without_periods[i]);
      this.claimObjects[i] = this.claim[i].setObject()

      //количество дней со дня первоначального обращения с заявлением о страховой выплате (для графика)
      this.count_days = (this.getPayDate() - this.claim[i].date_sv.getAppDate()) / DAY;
      
      //Вычисление периода задержки
      if (this.fu_claim_set.has(this.claim[i].name.options.selectedIndex)) {
        this.claim[i].days_delay = (this.getPayDate() - this.getInForceDate() + DAY) / DAY;
        this.claim[i].penalty_day = this.getInForceDate();
        this.claim[i].penalty_day_form = this.getInForceDateFormatted();
        this.fu_claim_set_type = 1;
      } else {
        this.claim[i].days_delay = (this.getPayDate() - this.claim[i].last_day) / DAY;
      }

      //Если выплата была в срок, то изменение отрицательного значения на нулевое
      if (this.claim[i].days_delay < 0 || isNaN(this.claim[i].days_delay)) {
        this.claim[i].days_delay = 0;
      }

      //Вычисление максимального периода задержки
      if (this.claim[i].days_delay > this.max_days_delay) {
        this.max_days_delay = this.claim[i].days_delay; //Получение значения самой большой задержки
      }

      //Вычисление суммы неустойки
      this.claim[i].penalty_summ = this.claim[i].summ * this.claim[i].days_delay * 0.01;
      if (isNaN(this.claim[i].penalty_summ)) {
        this.claim[i].penalty_summ = 0;
      }

      //Алгоритм для определения периодов судебного взыскания неустойки
      if (this.penalty_court_period.length > 0  && this.claim[i].days_delay > 0) {
        this.claim[i].penalty_summ = 0;
        for (var j = 0; j < this.penalty_court_period.length; j++) {
          //алгоритм для первого судебного периода вызскания неустойки
          if (j == 0) {
            //Вычисление самого первого периода невзысканной судом неустойки (с 21го дня)
            if (this.penalty_court_period[j].start_date > this.claim[i].penalty_day) {
              this.claim[i].penalty_period[numberOfPenaltyPeriod] = new PenaltyPeriod(this.claim[i].penalty_day,
                                                                            this.penalty_court_period[j].start_date - DAY);
              //Определение самого раннего начала судебного периода взыскания неустойки
              for (var k = j + 1; k < this.penalty_court_period.length; k++) {
                if (this.penalty_court_period[k].start_date <= this.claim[i].penalty_period[numberOfPenaltyPeriod].end_date) {
                  this.claim[i].penalty_period[numberOfPenaltyPeriod].end_date = this.penalty_court_period[k].start_date - DAY;
                }
              }
              //Определение количества дней просрочки
              this.claim[i].penalty_period[numberOfPenaltyPeriod].days_delay =
              (this.claim[i].penalty_period[numberOfPenaltyPeriod].end_date - this.claim[i].penalty_period[numberOfPenaltyPeriod].start_date + DAY) / DAY;
              //Если количество дней просрочки равно или больше 0,
              //то происводится расчет суммы неустойки,
              //в противном случае элемент массива с невзысканным периодом неустойки удаляется
              if (this.claim[i].penalty_period[numberOfPenaltyPeriod].days_delay > 0) {
                this.claim[i].penalty_period[numberOfPenaltyPeriod].penalty_summ =
                this.claim[i].summ * this.claim[i].penalty_period[numberOfPenaltyPeriod].days_delay * 0.01;
                numberOfPenaltyPeriod++;
              } else {
                this.claim[i].penalty_period.splice(numberOfPenaltyPeriod, 1);
              }
            }
          }
          //Вычисление второго и последующих периодов невзысканной судом неустойки
          if (this.penalty_court_period[j].end_date < this.getPayDate()) {
            if (this.penalty_court_period[j].end_date < this.claim[i].penalty_day) {
              this.claim[i].penalty_period[numberOfPenaltyPeriod] = new PenaltyPeriod(this.claim[i].penalty_day,
                                                                            this.getPayDate());
            } else {
              this.claim[i].penalty_period[numberOfPenaltyPeriod] = new PenaltyPeriod(this.penalty_court_period[j].end_date + DAY,
                                                                            this.getPayDate());
            }
            //Определение самого раннего начала следующего за первым судебного периода взыскания неустойки
            for (var k = j + 1; k < this.penalty_court_period.length; k++) {
              if (this.penalty_court_period[k].start_date <= this.claim[i].penalty_period[numberOfPenaltyPeriod].end_date) {
                this.claim[i].penalty_period[numberOfPenaltyPeriod].end_date = this.penalty_court_period[k].start_date - DAY;
              }
            }
            //Определение количества дней просрочки
            this.claim[i].penalty_period[numberOfPenaltyPeriod].days_delay =
            (this.claim[i].penalty_period[numberOfPenaltyPeriod].end_date - this.claim[i].penalty_period[numberOfPenaltyPeriod].start_date + DAY) / DAY;
            //Если количество дней просрочки равно или больше 0,
            //то происводится расчет суммы неустойки,
            //в противном случае элемент массива с невзысканным периодом неустойки удаляется
            if (this.claim[i].penalty_period[numberOfPenaltyPeriod].days_delay > 0) {
              this.claim[i].penalty_period[numberOfPenaltyPeriod].penalty_summ =
              this.claim[i].summ * this.claim[i].penalty_period[numberOfPenaltyPeriod].days_delay * 0.01;
              numberOfPenaltyPeriod++;
            } else {
              delete this.claim[i].penalty_period[numberOfPenaltyPeriod]
            }
          }
        }
        //Сложение всех сумма неустоек по одному решению суда
        for (var j = 0; j < this.claim[i].penalty_period.length; j++) {
          this.claim[i].penalty_summ = this.claim[i].penalty_summ + this.claim[i].penalty_period[j].penalty_summ;
        }
        //Определение максимального количества периодов для начисления неустойки
        if (this.claim[i].penalty_period.length > this.max_penalty_period) {
         this.max_penalty_period = this.claim[i].penalty_period.length
        }
      }
      this.total_penalty_summ_court = this.total_penalty_summ_court + this.claim[i].penalty_summ;

      //ФОРМИРОВАНИЕ ТЕКСТОВОЙ ЧАСТИ РЕШЕНИЯ ФУ
      var current_claim_summ = ""
      if (this.claim[i].summ != 0) {
          current_claim_summ = " в размере " + this.claim[i].summ_text
      } else {
          current_claim_summ = ""
      }
      //Собирание требований, заявленных к ФУ
      app_to_court_paragraph_all_claims = app_to_court_paragraph_all_claims + this.claim[i].type_text + ", "

      if (this.claim[i].type.options.selectedIndex == 1) {
        //Собирание требований, удовлетворенных ФУ
        court_decision_paragraph_all_claims_count++
        court_decision_paragraph_all_claims = court_decision_paragraph_all_claims + this.claim[i].type_text_nominative + 
                                         current_claim_summ + ", "
        //Собирание требований, исполненных ФО
        court_execution_paragraph_all_claims_summ = court_execution_paragraph_all_claims_summ + this.claim[i].summ
        court_execution_paragraph_all_claims = court_execution_paragraph_all_claims + this.claim[i].type_text_nominative + 
                                         current_claim_summ + ", "
      } else if (this.claim[i].type.options.selectedIndex == 2) {
        //Собирание требований, оставленных ФУ без удовлетворения
        court_decision_paragraph_claims_denied_count++
        court_decision_paragraph_claims_denied = court_decision_paragraph_claims_denied + this.claim[i].type_text + 
                                         current_claim_summ + ", "
      } else if (this.claim[i].type.options.selectedIndex == 3) {
        //Собирание требований, оставленных ФУ без рассмотрения
        court_decision_paragraph_claims_without_consideration_count++
        court_decision_paragraph_claims_without_consideration = court_decision_paragraph_claims_without_consideration + this.claim[i].type_text + 
                                         current_claim_summ + ", "
      }
      //Определение рассматривалось ли требование о взыскании неустойки
      if (this.claim[i].name.options.selectedIndex == 5) {
        court_decision_paragraph_has_penalty_boolean = true
      }
    }

    var court_decision_paragraph_all_claims_help_str = "требование"
    var court_decision_paragraph_all_claims_help_str1 = "требованием"
    var court_decision_paragraph_all_claims_help_str2 = "удовлетворено"
    var court_decision_paragraph_all_claims_help_str3 = ""
    //Изменений вспомогательных значений в случае нескольких требований к ФУ
    if ((court_decision_paragraph_all_claims_count + court_decision_paragraph_claims_denied_count + 
      court_decision_paragraph_claims_without_consideration_count) > 1) {
      court_decision_paragraph_all_claims_help_str = "требования"
      court_decision_paragraph_all_claims_help_str1 = "требованиями"
      court_decision_paragraph_all_claims_help_str2 = "удовлетворены"
    }
    app_to_court_paragraph_all_claims = app_to_court_paragraph_all_claims.slice(0, -2)
    court_decision_paragraph_all_claims = court_decision_paragraph_all_claims.slice(0, -2)
    //Если есть требования, в удовлетворении которых отказано ФУ
    if (court_decision_paragraph_claims_denied_count > 0 || court_decision_paragraph_claims_without_consideration_count > 0) {
      court_decision_paragraph_all_claims_help_str3 = " частично"
      var court_decision_paragraph_claims_denied_help_str = "требования"
      if (court_decision_paragraph_claims_denied_count > 1) {
        court_decision_paragraph_claims_denied_help_str = "требований"
      }
      court_decision_paragraph_claims_denied = `. В удовлетворении ${court_decision_paragraph_claims_denied_help_str} 
      Заявителя к ${fo_name_genitive} о взыскании ${court_decision_paragraph_claims_denied.slice(0, -2)} отказано`
    }
    //Если есть требования, оставленные без рассмотрения ФУ
    if (court_decision_paragraph_claims_without_consideration_count > 0) {
      court_decision_paragraph_all_claims_help_str3 = " частично"
      var court_decision_paragraph_claims_without_consideration_help_str = ". Требование"
      var court_decision_paragraph_claims_without_consideration_help_str2 = "оставлено"
      if (court_decision_paragraph_claims_without_consideration_count > 1) {
        court_decision_paragraph_claims_without_consideration_help_str = ". Требования"
        court_decision_paragraph_claims_without_consideration_help_str2 = "оставлены"
      }
      court_decision_paragraph_claims_without_consideration = `${court_decision_paragraph_claims_without_consideration_help_str} 
      о взыскании с ${fo_name_genitive} ${court_decision_paragraph_claims_without_consideration.slice(0, -2)} 
      ${court_decision_paragraph_claims_without_consideration_help_str2} без рассмотрения`
    }
    
    court_execution_paragraph_all_claims = court_execution_paragraph_all_claims.slice(0, -2)

    //Формирование абзаца с обращением к ФУ
    this.app_to_court_paragraph = `<p>Заявитель, обратился в ${this.court.value} (далее – Суд) с исковым заявлением к ${fo_name_genitive} 
    о взыскании ${app_to_court_paragraph_all_claims}.</p>`

    //Формирование абзаца с указанием на то, что требвоание о взыскании неустойки ФУ не рассматривалось в данном решении
    if (!court_decision_paragraph_has_penalty_boolean) {
      court_decision_paragraph_has_penalty = `<p>Требование о взыскании c ${fo_name_genitive} неустойки не заявлялось, Судом не рассматривалось.</p>`
    }

    //Формирование абзаца с описанием решения суда
    if (this.type.options.selectedIndex == 1) {

      //Для резолютивной части
      this.court_decision_paragraph = `<p>${this.getDateFormatted()} решением Суда по делу № ${this.number.value} 
      ${court_decision_paragraph_all_claims_help_str} Заявителя 
      ${court_decision_paragraph_all_claims_help_str2}${court_decision_paragraph_all_claims_help_str3} 
      (далее – Решение Суда от ${this.getDateFormatted()}). 
      В пользу Заявителя c ${fo_name_genitive} взыскано 
      ${court_decision_paragraph_all_claims}${court_decision_paragraph_claims_denied}${court_decision_paragraph_claims_without_consideration}.</p>
      ${court_decision_paragraph_has_penalty}
      <p>Решение Суда от ${this.getDateFormatted()} вступило в силу ${this.getInForceDateFormatted()}.</p>`
      
      //Для мотивированной части
      this.court_decision_paragraph_motivation = `<p>Решением Суда от ${this.getDateFormatted()} 
      ${court_decision_paragraph_all_claims_help_str} Заявителя ${court_decision_paragraph_all_claims_help_str2}${court_decision_paragraph_all_claims_help_str3}. 
      В пользу Заявителя c ${fo_name_genitive} взыскано ${court_decision_paragraph_all_claims}${court_decision_paragraph_claims_denied}${court_decision_paragraph_claims_without_consideration}.</p>`
    } else {
      
    }

    //Формирование абзацев с исполнением решения суда
    //Для резолютивной части
    this.court_execution_paragraph = `<p>${this.getPayDateFormatted()} ${fo_name_nominative} в рамках исполнения Решения Суда 
    от ${this.getDateFormatted()} ${transfer} Заявителю ${makeRubText_genitive(court_execution_paragraph_all_claims_summ)} 
    (в том числе ${court_execution_paragraph_all_claims}), 
    что подтверждается платежным поручением № ${this.order.value}.</p>`

    this.main_paragraph = this.app_to_court_paragraph +
                          this.court_decision_paragraph +
                          this.court_execution_paragraph
  }

  getDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
  getDateFormatted() { return formatDate(new Date(this.getDate())); }
  getDateEndForm() {return Date.parse(changeDateType(this.date_end_form.value) + 'T00:00:00');}
  getDateEndFormFormatted() { return formatDate(new Date(this.getDateEndForm())); }
  getInForceDate() {return Date.parse(changeDateType(this.in_force_date.value) + 'T00:00:00');}
  getInForceDateFormatted() { return formatDate(new Date(this.getInForceDate())); }
  getPayDate() {return Date.parse(changeDateType(this.pay_date.value) + 'T00:00:00');}
  getPayDateFormatted() { return formatDate(new Date(this.getPayDate())); }

  setObject() {
    return {
      court : this.court.value,
      type : this.type.value,
      date : this.date.value,
      number : this.number.value,
      order : this.order.value,

      pay_date : this.pay_date.value,
      in_force_date : this.in_force_date.value,
      date_end_form : this.date_end_form.value,

      claim : this.claimObjects,
    }
  }

  fillPayments() {
    var str_payment_dataled_helper;
    var str_payment_dataled = '';
    for (var i = 0; i < this.claim.length; i++) {
      str_payment_dataled_helper = '';
      if (this.date.value != "" &&
          this.claim[i].type.selectedIndex == 1) {
        if (this.claim[i].name.selectedIndex == 1 ||
            this.claim[i].name.selectedIndex == 2 ||
            this.claim[i].name.selectedIndex == 3 ||
            this.claim[i].name.selectedIndex == 4) {
          let number_of_payment_rows = $('.payment_row').length; //Получение количества строк с выплатами

          if (this.claim[i].penalty_period.length > 0 && this.claim[i].days_delay > 0) {
            for (var j = 0; j < this.claim[i].penalty_period.length; j++) {
              str_payment_dataled_helper = str_payment_dataled_helper +
              '<td><span>' + formatDate(new Date(this.claim[i].penalty_period[j].start_date)) + '</span></td>' +
              '<td><span>' + formatDate(new Date(this.claim[i].penalty_period[j].end_date)) + '</span></td>' +
              '<td><span>' + declinationDays(this.claim[i].penalty_period[j].days_delay) + '</span></td>' +
              '<td><span><b>' + makeRubText_nominative(this.claim[i].penalty_period[j].penalty_summ) + '</b></span></td>';
            }
            str_payment_dataled = '<tr role="button" class = "payment_row">' +
              '<th scope="row"><span>' + (number_of_payment_rows + 1) + '</span></th>' +
              '<td><span>' + this.claim[i].name.value + ' <b>(на основании решения суда № ' + this.id + ')</b></span></td>' +
              '<td><span>' + makeRubText_nominative(this.claim[i].summ) + '</span></td>' +
              str_payment_dataled_helper +
            '</tr>';

            $('#str_payment_dataled').append(str_payment_dataled);

           //Добавление подсказки для даты и количества днея просрочки
            $('#str_payment_dataled').children().last().css({"color" : "#dc3545"});
            for (var j = 0; j < this.claim[i].penalty_period.length; j++) {
              $('#str_payment_dataled').children().last().children().eq(3 + j * 4).attr('tooltip', 'Начало периода № ' + (j + 1));
              $('#str_payment_dataled').children().last().children().eq(4 + j * 4).attr('tooltip', 'Конец периода № ' + (j + 1));
              $('#str_payment_dataled').children().last().children().eq(5 + j * 4).attr('tooltip', 'Количество дней просрочки');
            }
          } else {
            str_payment_dataled = '<tr role="button" class = "payment_row">' +
              '<th scope="row"><span>' + (number_of_payment_rows + 1) + '</span></th>' +
              '<td><span>' + this.claim[i].name.value + ' <b>(на основании решения суда № ' + this.id + ')</b></span></td>' +
              '<td><span>' + makeRubText_nominative(this.claim[i].summ) + '</span></td>' +
              '<td><span>' + this.claim[i].penalty_day_form + '</span></td>' +
              '<td><span>' + this.getPayDateFormatted() + '</span></td>' +
              '<td><span>' + declinationDays(this.claim[i].days_delay) + '</span></td>' +
              '<td><span><b>' + makeRubText_nominative(this.claim[i].penalty_summ) + '</b></span></td>' +
            '</tr>';

            $('#str_payment_dataled').append(str_payment_dataled);

            //Добавление подсказки для даты и количества днея просрочки
            $('#str_payment_dataled').children().last().css({"color" : "#dc3545"});
            $('#str_payment_dataled').children().last().children().eq(4).attr('tooltip', 'Дата исполнения решения суда');
            $('#str_payment_dataled').children().last().children().eq(5).attr('tooltip', 'Количество дней просрочки');
            if (this.claim[i].penalty_day_form == this.getInForceDateFormatted()) {
              $('#str_payment_dataled').children().last().children().eq(3).attr('tooltip', 'Дата вступления в силу решения суда');
            } else {
              $('#str_payment_dataled').children().last().children().eq(3).attr('tooltip', '21й день');
            }
          }
        }
      }
    }
  }

  toString() {
    return this.id +
           "\nФУ: " + this.fu +
           "\nДата решения: " + formatDate(new Date(this.date)) +
           ".\nНомер решения: " + this.number +
           ".\nДата исполнения: " + formatDate(new Date(this.pay_date)) +
           ".\nТребование 1: " + this.claim[0].name +
           ".\nТребование 1: " + makeRubText_nominative(this.claim[0].summ);
  }
}
