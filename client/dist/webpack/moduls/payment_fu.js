import { makeRubText_nominative } from './makeRubText_nominative.js';
import { makeRubText_genitive } from './makeRubText_genitive.js';
import { declinationDays } from './declinationDays.js';
import { changeDateType } from './changeDateType.js';
import { formatDate } from './formatDate.js';
import { findInForceFuDay, findLastDayForPayFu } from './findInForceFuDay.js';
import { findLastDayForPayFuSuspension } from "./findLastDayForPayFuSuspension";
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

class ClaimFu {
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

  app_day
  app_day_form
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
    this.from = from;
    this.to = to;
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

export class PaymentFu {

  id

  fu
  type
  date
  number

  app_date
  order

  pay_date
  in_force_date
  last_day_for_pay_date

  suspension_type
  suspension_date
  suspension_number

  suspension_court_name
  suspension_court_number
  suspension_court_result
  suspension_court_date
  suspension_court_date_end_form
  suspension_court_date_in_force

  claim = [];
  claimObjects = []
  total_penalty_summ_fu
  penalty_court_period = [];
  max_penalty_period
  max_days_delay
  count_days

  app_to_fu_paragraph
  fu_decision_paragraph
  fu_decision_paragraph_motivation
  fu_suspension_paragraph
  fu_suspension_paragraph_motivation
  fu_court_paragraph
  fu_court_paragraph_motivation
  fu_analize_period_paragraph_motivation
  fu_execution_paragraph
  fu_execution_paragraph_motivation
  main_paragraph

  constructor(id, fu, type, date, number, app_date, order, pay_date, in_force_date, last_day_for_pay_date,
              suspension_type,
              suspension_date,
              suspension_number,
              suspension_court_name,
              suspension_court_number,
              suspension_court_result,
              suspension_court_date,
              suspension_court_date_end_form,
              suspension_court_date_in_force) {

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
    this.fu = fu;
    this.type = type;
    this.date = date;
    this.number = number;
    this.app_date = app_date;
    this.order = order;
    this.pay_date = pay_date;
    this.in_force_date = in_force_date;
    this.last_day_for_pay_date = last_day_for_pay_date;

    this.suspension_type = suspension_type;
    this.suspension_date = suspension_date;
    this.suspension_number = suspension_number;
    this.suspension_court_name = suspension_court_name;
    this.suspension_court_number = suspension_court_number;
    this.suspension_court_result = suspension_court_result;
    this.suspension_court_date = suspension_court_date;
    this.suspension_court_date_end_form = suspension_court_date_end_form;
    this.suspension_court_date_in_force = suspension_court_date_in_force;

    this.total_penalty_summ_fu = 0;
    this.max_penalty_period = 0;
    this.max_days_delay = 0;

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

    this.app_to_fu_paragraph = ""
    this.fu_decision_paragraph = ""
    this.fu_decision_paragraph_motivation = ""
    this.fu_suspension_paragraph = ""
    this.fu_suspension_paragraph_motivation = ""
    this.fu_court_paragraph = ""
    this.fu_court_paragraph_motivation = ""
    this.fu_analize_period_paragraph_motivation = ""
    this.fu_execution_paragraph = ""
    this.fu_execution_paragraph_motivation = ""
    this.main_paragraph = ""
    
    //Получение количества удовлетворенных требований для каждого решения
    var number_of_payments = $('div.payments').length; //Получение количества строк с выплатами
    var number_of_claims = $('.fu_claim_' + id).length;
    var names = $('.fu_claim_' + id); //Получение массива требований
    var types = $('.fu_claim_type_' + id); //Получение массива требований
    var summs = $('.fu_claim_summ_' + id); //Получение массива дат решений
    var froms = $('.date_fu_penalty_from_' + id); //Получение массива дат начала периода судебных неустоек
    var tos = $('.date_fu_penalty_to_' + id); //Получение массива дат конца периода судебных неустоек
    var without_periods = $('.fu_without_period_' + id); //Получение массива неустоек без периода

    var app_to_fu_paragraph_all_claims = ""
    var fu_decision_paragraph_all_claims = ""
    var fu_decision_paragraph_all_claims_count = 0
    var fu_decision_paragraph_claims_denied = ""
    var fu_decision_paragraph_claims_denied_count = 0
    var fu_decision_paragraph_claims_without_consideration = ""
    var fu_decision_paragraph_claims_without_consideration_count = 0
    var fu_decision_paragraph_has_penalty = ""
    var fu_decision_paragraph_has_penalty_boolean = false
    var fu_execution_paragraph_all_claims = ""
    
    for (var i = 0; i < number_of_claims; i++) {
      numberOfPenaltyPeriod = 0;
      this.claim[i] = new ClaimFu(i + 1,
                                  names[i],
                                  types[i],
                                  summs[i],
                                  froms[i],
                                  tos[i],
                                  without_periods[i]);
      this.claimObjects[i] = this.claim[i].setObject()

      //количество дней со дня первоначального обращения с заявлением о страховой выплате (для графика)
      this.count_days = (this.getPayDate() - this.claim[i].date_sv.getAppDate()) / DAY;
      //Если решение ФУ исполнено не в срок, то начисляется неустойка с 21го дня, если в срок, то неустойка равна 0
      if (this.getPayDate() > this.getLastDayForPayFu()) {
        this.claim[i].days_delay = (this.getPayDate() - this.claim[i].last_day) / DAY;
      } else {
        this.claim[i].days_delay = 0;
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
                delete this.claim[i].penalty_period[numberOfPenaltyPeriod]
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
              this.claim[i].penalty_period.splice(numberOfPenaltyPeriod, 1);
            }
          }
        }
        //Сложение всех сумм неустоек по одному решению ФУ
        for (var j = 0; j < this.claim[i].penalty_period.length; j++) {
          this.claim[i].penalty_summ = this.claim[i].penalty_summ + this.claim[i].penalty_period[j].penalty_summ;
        }
        //Определение максимального количества периодов для начисления неустойки
        if (this.claim[i].penalty_period.length > this.max_penalty_period) {
         this.max_penalty_period = this.claim[i].penalty_period.length
        }
      }
      this.total_penalty_summ_fu = this.total_penalty_summ_fu + this.claim[i].penalty_summ;

      //ФОРМИРОВАНИЕ ТЕКСТОВОЙ ЧАСТИ РЕШЕНИЯ ФУ
      var current_claim_summ = ""
      if (this.claim[i].summ != 0) {
          current_claim_summ = " в размере " + this.claim[i].summ_text
      } else {
          current_claim_summ = ""
      }
      //Собирание требований, заявленных к ФУ
      app_to_fu_paragraph_all_claims = app_to_fu_paragraph_all_claims + this.claim[i].type_text + ", "

      if (this.claim[i].type.options.selectedIndex == 1) {
        //Собирание требований, удовлетворенных ФУ
        fu_decision_paragraph_all_claims_count++
        fu_decision_paragraph_all_claims = fu_decision_paragraph_all_claims + this.claim[i].type_text_nominative + 
                                         current_claim_summ + ", "
        //Собирание требований, исполненных ФО
        fu_execution_paragraph_all_claims = fu_execution_paragraph_all_claims + this.claim[i].type_text + 
                                         current_claim_summ + ", "
      } else if (this.claim[i].type.options.selectedIndex == 2) {
        //Собирание требований, оставленных ФУ без удовлетворения
        fu_decision_paragraph_claims_denied_count++
        fu_decision_paragraph_claims_denied = fu_decision_paragraph_claims_denied + this.claim[i].type_text + 
                                         current_claim_summ + ", "
      } else if (this.claim[i].type.options.selectedIndex == 3) {
        //Собирание требований, оставленных ФУ без рассмотрения
        fu_decision_paragraph_claims_without_consideration_count++
        fu_decision_paragraph_claims_without_consideration = fu_decision_paragraph_claims_without_consideration + this.claim[i].type_text + 
                                         current_claim_summ + ", "
      }
      //Определение рассматривалось ли требование о взыскании неустойки
      if (this.claim[i].name.options.selectedIndex == 5) {
        fu_decision_paragraph_has_penalty_boolean = true
      }
    }
    var fu_decision_paragraph_all_claims_help_str = "требование"
    var fu_decision_paragraph_all_claims_help_str1 = "требованием"
    var fu_decision_paragraph_all_claims_help_str2 = "удовлетворено"
    var fu_decision_paragraph_all_claims_help_str3 = ""
    //Изменений вспомогательных значений в случае нескольких требований к ФУ
    if ((fu_decision_paragraph_all_claims_count + fu_decision_paragraph_claims_denied_count + 
      fu_decision_paragraph_claims_without_consideration_count) > 1) {
      fu_decision_paragraph_all_claims_help_str = "требования"
      fu_decision_paragraph_all_claims_help_str1 = "требованиями"
      fu_decision_paragraph_all_claims_help_str2 = "удовлетворены"
    }
    app_to_fu_paragraph_all_claims = app_to_fu_paragraph_all_claims.slice(0, -2)
    fu_decision_paragraph_all_claims = fu_decision_paragraph_all_claims.slice(0, -2)
    //Если есть требования, в удовлетворении которых отказано ФУ
    if (fu_decision_paragraph_claims_denied_count > 0) {
      fu_decision_paragraph_all_claims_help_str3 = " частично"
      var fu_decision_paragraph_claims_denied_help_str = "требования"
      if (fu_decision_paragraph_claims_denied_count > 1) {
        fu_decision_paragraph_claims_denied_help_str = "требований"
      }
      fu_decision_paragraph_claims_denied = `. В удовлетворении ${fu_decision_paragraph_claims_denied_help_str} 
      Заявителя к ${fo_name_genitive} о взыскании ${fu_decision_paragraph_claims_denied.slice(0, -2)} отказано`
    }
    //Если есть требования, оставленные без рассмотрения ФУ
    if (fu_decision_paragraph_claims_without_consideration_count > 0) {
      fu_decision_paragraph_all_claims_help_str3 = " частично"
      var fu_decision_paragraph_claims_without_consideration_help_str = ". Требование"
      var fu_decision_paragraph_claims_without_consideration_help_str2 = "оставлено"
      if (fu_decision_paragraph_claims_without_consideration_count > 1) {
        fu_decision_paragraph_claims_without_consideration_help_str = ". Требования"
        fu_decision_paragraph_claims_without_consideration_help_str2 = "оставлены"
      }
      fu_decision_paragraph_claims_without_consideration = `${fu_decision_paragraph_claims_without_consideration_help_str} 
      о взыскании с ${fo_name_genitive} ${fu_decision_paragraph_claims_without_consideration.slice(0, -2)} 
      ${fu_decision_paragraph_claims_without_consideration_help_str2} без рассмотрения`
    }
    
    fu_execution_paragraph_all_claims = fu_execution_paragraph_all_claims.slice(0, -2)

    //Формирование абзаца с обращением к ФУ
    this.app_to_fu_paragraph = `<p>Не согласившись с позицией ${fo_name_genitive}, ${this.getAppDateFormatted()} Заявитель 
    руководствуясь досудебным порядком урегулирования страхового спора, в порядке, предусмотренном Законом № 123-ФЗ обратился 
    в Службу финансового уполномоченного с ${fu_decision_paragraph_all_claims_help_str1} о взыскании ${app_to_fu_paragraph_all_claims}.</p>`

    var fu_name = ""
    var fu_post = ""
    switch (this.fu.value) {
      case "Воронин Ю.В.":
        fu_name = "Воронина Ю.В."
        fu_post = "Главного финансового уполномоченного"
        break;
      case "Климов В.В.":
        fu_name = "Климова В.В."
        fu_post = "Финансового уполномоченного в сферах страхования, " +
        "кредитной кооперации, деятельности кредитных организаций, " +
        "ломбардов и негосударственных пенсионных фондов"
        break;
      case "Максимова С.В.":
        fu_name = "Максимовой С.В."
        fu_post = "Финансового уполномоченного в сферах " +
        "страхования, микрофинансирования, кредитной кооперации " +
        "и деятельности кредитных организаций"
        break;
      case "Писаревский Е.Л.":
        fu_name = "Писаревского Е.Л."
        fu_post = "Финансового уполномоченного по правам потребителей " + 
        "финансовых услуг в сферах страхования, микрофинансирования, " + 
        "кредитной кооперации и деятельности кредитных организаций"
        break;
      case "Новак Д.В.":
        fu_name = "Новака Д.В."
        fu_post = "Финансового уполномоченного в сферах страхования, микрофинансирования, " +
        "кредитной кооперации, деятельности кредитных организаций"
        break;
      case "Савицкая Т.М.":
        fu_name = "Савицкой Т.М."
        fu_post = "Финансового уполномоченного в сферах кредитной " +
        "кооперации, деятельности кредитных организаций, " +
        "ломбардов и негосударственных пенсионных фондов"
        break;
      default:
        break;
    }

    //Формирование абзаца с указанием на то, что требвоание о взыскании неустойки ФУ не рассматривалось в данном решении
    if (!fu_decision_paragraph_has_penalty_boolean) {
      fu_decision_paragraph_has_penalty = `<p>Решением финансового уполномоченного от ${this.getDateFormatted()} 
      требование о взыскании c ${fo_name_genitive} неустойки не рассматривалось.</p>`
    }
    //Формирование абзаца с описанием решения ФУ
    var app_number = this.number.value.slice(0, this.number.value.indexOf("/"))
    //Если вынесено решение об удовлетворении требований Заявителя
    if (this.type.options.selectedIndex == 1) {

      //Для резолютивной части
      this.fu_decision_paragraph = `<p>${this.getDateFormatted()} решением ${fu_post} ${fu_name} № ${this.number.value} 
      по результатам рассмотрения обращения от ${this.getAppDateFormatted()} № ${app_number} (далее – Решение финансового 
      уполномоченного от ${this.getDateFormatted()}) ${fu_decision_paragraph_all_claims_help_str} Заявителя 
      ${fu_decision_paragraph_all_claims_help_str2}${fu_decision_paragraph_all_claims_help_str3}. В пользу Заявителя c ${fo_name_genitive} 
      взыскано ${fu_decision_paragraph_all_claims}${fu_decision_paragraph_claims_denied}${fu_decision_paragraph_claims_without_consideration}.</p>
      ${fu_decision_paragraph_has_penalty}
      <p>Решение финансового уполномоченного от ${this.getDateFormatted()} вступило в силу ${this.getInForceDateFormatted()}.</p>`
      
      //Для мотивированной части
      this.fu_decision_paragraph_motivation = `<p>Решением финансового уполномоченного от ${this.getDateFormatted()} 
      ${fu_decision_paragraph_all_claims_help_str} Заявителя ${fu_decision_paragraph_all_claims_help_str2}${fu_decision_paragraph_all_claims_help_str3}. 
      В пользу Заявителя c ${fo_name_genitive} взыскано ${fu_decision_paragraph_all_claims}${fu_decision_paragraph_claims_denied}${fu_decision_paragraph_claims_without_consideration}.</p>
      <p>В резолютивной части Решения финансового уполномоченного от ${this.getDateFormatted()} указано, что 
      Решение финансового уполномоченного от ${this.getDateFormatted()} подлежит исполнению ${fo_name_instrumental} в течение 10 рабочих дней после дня вступления в силу.</p>`
    } else {
      
    }

    //Формирование абзаца c решением ФУ о приостановлении сроков
    if (this.suspension_type.options.selectedIndex == 1) {

      //Для резолютивной части
      this.fu_suspension_paragraph = `<p>Решением финансового уполномоченного от ${this.getSuspensionDateFormatted()} 
      № ${this.suspension_number.value} срок исполнения Решения финансового уполномоченного от ${this.getDateFormatted()} 
      приостановлен в связи с обращением ${fo_name_genitive} в ${this.suspension_court_name.value} (далее – Суд) с заявлением об 
      обжаловании Решения финансового уполномоченного от ${this.getDateFormatted()}.</p>`

      //Для мотивированной части
      this.fu_suspension_paragraph_motivation = `<p>Решением финансового уполномоченного от ${this.getSuspensionDateFormatted()} 
      № ${this.suspension_number.value} срок исполнения Решения финансового уполномоченного от 
      ${this.getDateFormatted()} приостановлен до вынесения решения Судом.</p>`

      //Формирование абзацев в судом (в случае, если требования ФО оставлены без удовлетворения)
      if (this.suspension_court_result.options.selectedIndex == 2) {
        //Для резолютивной части
        this.fu_court_paragraph = `<p>Решением Суда от ${this.getSuspensionCourtDateFormatted()} по гражданскому делу № 
        ${this.suspension_court_number.value} Решение финансового уполномоченного 
        от ${this.getDateFormatted()} оставлено без изменений (далее – Решение суда).</p>
        <p>Решение суда в окончательной форме изготовлено ${this.getSuspensionCourtDateEndFormDateFormatted()}.</p>`

        //Для мотивированной части
        this.fu_court_paragraph_motivation = `<p>Решением Суда исковое заявление ${fo_name_genitive} 
        оставлено без удовлетворения. Резолютивная часть Решения Суда объявлена ${this.getSuspensionCourtDateFormatted()}, 
        мотивированное Решение Суда в окончательной форме составлено ${this.getSuspensionCourtDateEndFormDateFormatted()}. 
        Решение Суда вступило в законную силу ${this.getSuspensionCourtDateInForceDateFormatted()}.</p>`
      }

      //Формирование абзаца с выводом по срокам исполнения
      this.fu_analize_period_paragraph_motivation = `<p>Таким образом, Решение финансового уполномоченного 
      от ${this.getDateFormatted()} вступило в силу ${this.getInForceDateFormatted()} и подлежало исполнению 
      в течение 10 рабочих дней после даты вступления в законную силу 
      Решения Суда, за вычетом количества дней с момента вступления в силу Решение финансового уполномоченного 
      от ${this.getDateFormatted()} и до даты приостановления срока исполнения Решение финансового уполномоченного 
      от ${this.getDateFormatted()}, то есть до ${this.getLastDayForPayFuFormatted()}.</p>`
    } else {
      this.fu_analize_period_paragraph_motivation = `<p>Таким образом, Решение финансового уполномоченного от 
      ${this.getDateFormatted()} вступило в силу ${this.getInForceDateFormatted()} и подлежало исполнению 
      ${fo_name_instrumental} до ${this.getLastDayForPayFuFormatted()} включительно (в течение 10 рабочих дней после 
        дня вступления в силу).</p>`
    }
    
    //Формирование абзацев с исполнением решения ФУ
    //Для резолютивной части
    this.fu_execution_paragraph = `<p>${this.getPayDateFormatted()} ${fo_name_nominative} в рамках добровольного исполнения Решения 
    финансового уполномоченного от ${this.getDateFormatted()} ${make_a_payment} Заявителю выплату ${fu_execution_paragraph_all_claims}, 
    что подтверждается платежным поручением № ${this.order.value}.</p>`

    //Для мотивированной части
    if (this.getPayDate() <= this.getLastDayForPayFu()) {
      this.fu_execution_paragraph_motivation = `<p>${this.getPayDateFormatted()}, то есть в срок, установленный 
      Законом № 123-ФЗ, ${fo_name_nominative} ${fulfill} Решение финансового уполномоченного от ${this.getDateFormatted()}.</p>`
    } else {
      this.fu_execution_paragraph_motivation = `<p>${this.getPayDateFormatted()}, то есть с нарушением срока, установленного 
      Законом № 123-ФЗ, ${fo_name_nominative} ${fulfill} Решение финансового уполномоченного от ${this.getDateFormatted()}.</p>`
    }

    this.main_paragraph = this.app_to_fu_paragraph +
                          this.fu_decision_paragraph +
                          this.fu_suspension_paragraph +
                          this.fu_court_paragraph +
                          this.fu_execution_paragraph
  }

  getDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
  getDateFormatted() { return formatDate(new Date(this.getDate())); }
  getPayDate() {return Date.parse(changeDateType(this.pay_date.value) + 'T00:00:00');}
  getPayDateFormatted() { return formatDate(new Date(this.getPayDate())); }

  getInForceDate(){ return findInForceFuDay(this.getDate()); }
  getInForceDateFormatted(){ return formatDate(new Date(this.getInForceDate()));}
  getLastDayForPayFu(){ 
    //Если решение ФУ было приостановлено
    if (this.suspension_type.options.selectedIndex == 1) {
      //Если значения дат вступления в силу решения ФУ, приостановки решения ФУ и вступления  силу решения суда заполнены
      if (!isNaN(this.getInForceDate()) && 
          !isNaN(this.getSuspensionDate()) && 
          !isNaN(this.getSuspensionCourtDateInForceDate())) {
        //Если дата приостановки ранее либо равна дате окончания срока на исполнения без приостановки (приостановка сроков произошла в течение 10 дней)
        if (this.getSuspensionDate() <= findLastDayForPayFu(this.getInForceDate())) {
          //Если дата приостановки позднее даты вступления в силу решения ФУ
          if (this.getSuspensionDate() > this.getInForceDate()) {
            return findLastDayForPayFuSuspension(this.getInForceDate(), this.getSuspensionDate(), this.getSuspensionCourtDateInForceDate())
          //Если дата приостановки ранее даты вступления в силу решения ФУ
          } else {
            return findLastDayForPayFuSuspension(this.getInForceDate(), this.getInForceDate() + DAY, this.getSuspensionCourtDateInForceDate())

          }
        }
      }
    //Если решение ФУ не было приостановлено
    } else {
      return findLastDayForPayFu(this.getInForceDate())
    }
  }
  
  getLastDayForPayFuFormatted(){ return formatDate(new Date(this.getLastDayForPayFu())); }

  getAppDate() {return Date.parse(changeDateType(this.app_date.value) + 'T00:00:00');}
  getAppDateFormatted() { return formatDate(new Date(this.getAppDate())); }

  getSuspensionDate() {return Date.parse(changeDateType(this.suspension_date.value) + 'T00:00:00');}
  getSuspensionDateFormatted() { return formatDate(new Date(this.getSuspensionDate())); }
  getSuspensionCourtDate() {return Date.parse(changeDateType(this.suspension_court_date.value) + 'T00:00:00');}
  getSuspensionCourtDateFormatted() { return formatDate(new Date(this.getSuspensionCourtDate())); }
  getSuspensionCourtDateEndFormDate() {return Date.parse(changeDateType(this.suspension_court_date_end_form.value) + 'T00:00:00');}
  getSuspensionCourtDateEndFormDateFormatted() { return formatDate(new Date(this.getSuspensionCourtDateEndFormDate())); }
  getSuspensionCourtDateInForceDate() {return Date.parse(changeDateType(this.suspension_court_date_in_force.value) + 'T00:00:00');}
  getSuspensionCourtDateInForceDateFormatted() { return formatDate(new Date(this.getSuspensionCourtDateInForceDate())); }

  setObject() {
    return {
      fu : this.fu.value,
      type : this.type.value,
      date : this.date.value,
      number : this.number.value,

      app_date : this.app_date.value,
      order : this.order.value,

      pay_date : this.pay_date.value,
      in_force_date : this.in_force_date.value,
      last_day_for_pay_date : this.last_day_for_pay_date.value,

      suspension_type : this.suspension_type.value,
      suspension_date : this.suspension_date.value,
      suspension_number : this.suspension_number.value,

      suspension_court_name : this.suspension_court_name.value,
      suspension_court_number : this.suspension_court_number.value,
      suspension_court_result : this.suspension_court_result.value,
      suspension_court_date : this.suspension_court_date.value,
      suspension_court_date_end_form : this.suspension_court_date_end_form.value,
      suspension_court_date_in_force : this.suspension_court_date_in_force.value,

      claim : this.claimObjects,
    }
  }
  

  //Вывод на экран значений дня вступления в силу и последнего дня для исполнения решения ФУ
  fillDates() {
    this.in_force_date.innerHTML = "";
    this.last_day_for_pay_date.innerHTML = "";

    if (!isNaN(findInForceFuDay(this.getDate()))) {
      this.in_force_date.value = this.getInForceDateFormatted();
      this.last_day_for_pay_date.value = this.getLastDayForPayFuFormatted();
    }
  }

  fillPayments() {
    var str_payment_dataled_helper;
    var str_payment_dataled = '';
    for (var i = 0; i < this.claim.length; i++) {
      str_payment_dataled_helper = '';
      if (this.date.value != "" &&
          this.type.selectedIndex == 1 &&
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
              '<td><span>' + this.claim[i].name.value + ' <b>(на основании решения ФУ № ' + this.id + ')</b></span></td>' +
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
              '<td><span>' + this.claim[i].name.value + ' <b>(на основании решения ФУ № ' + this.id + ')</b></span></td>' +
              '<td><span>' + makeRubText_nominative(this.claim[i].summ) + '</span></td>' +
              '<td><span>' + this.claim[i].penalty_day_form + '</span></td>' +
              '<td><span>' + this.getPayDateFormatted() + '</span></td>' +
              '<td><span>' + declinationDays(this.claim[i].days_delay) + '</span></td>' +
              '<td><span><b>' + makeRubText_nominative(this.claim[i].penalty_summ) + '</b></span></td>' +
            '</tr>';

            $('#str_payment_dataled').append(str_payment_dataled);

            //Добавление подсказки для даты и количества днея просрочки
            if (this.getPayDate() <= this.getLastDayForPayFu()) {
              $('#str_payment_dataled').children().last().css({"color" : "#28a745"});
              $('#str_payment_dataled').children().last().children().eq(3).children().first().text(this.getLastDayForPayFuFormatted());
              $('#str_payment_dataled').children().last().children().eq(3).attr('tooltip-green', 'Дата окончания срока исполнения');
              $('#str_payment_dataled').children().last().children().eq(4).attr('tooltip-green', 'Дата исполнения решения ФУ');
              $('#str_payment_dataled').children().last().children().eq(5).attr('tooltip-green', 'Решение ФУ исполнено в срок');
            } else {
              $('#str_payment_dataled').children().last().css({"color" : "#dc3545"});
              $('#str_payment_dataled').children().last().children().eq(3).attr('tooltip', '21й день');
              $('#str_payment_dataled').children().last().children().eq(4).attr('tooltip', 'Дата исполнения решения ФУ');
              $('#str_payment_dataled').children().last().children().eq(5).attr('tooltip', 'Количество дней просрочки');
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
