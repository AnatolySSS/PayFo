import { changeDateType } from './changeDateType.js';
import { formatDate } from './formatDate.js';
import { AppDate } from './app_date.js';
import { DAY } from './variables.js';

/* Объект для выплаты по решению ФУ

    * id - порядковый № выплаты
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

class ClaimCourt {
  id

  date_sv
  date_uts
  date_ev
  date_stor

  name
  type
  summ
  from
  to
  without

  last_day
  penalty_day

  constructor(id, name, type, summ, from, to, without) {

    this.date_sv = new AppDate("date_sv")
    this.date_uts = new AppDate("date_uts")
    this.date_ev = new AppDate("date_ev")
    this.date_stor = new AppDate("date_stor")

    this.id = id;
    this.name = name;
    this.type = type;
    this.summ = Number(summ.value.replace(/\s+/g, ''));
    this.from = Date.parse(changeDateType(from.value) + 'T00:00:00');
    this.to = Date.parse(changeDateType(to.value) + 'T00:00:00');
    this.without = without;

    //Вычисление количества дней между датой выплаты и 20м днем
    switch (this.name.options.selectedIndex) {
      case 1:
      case 5:
        this.last_day = this.date_sv.getLastDay();
        this.penalty_day = this.date_sv.getPenaltyDay();
        break;
      case 2:
        this.last_day = this.date_uts.getLastDay();
        this.penalty_day = this.date_uts.getPenaltyDay();
        break;
      case 3:
        this.last_day = this.date_ev.getLastDay();
        this.penalty_day = this.date_ev.getPenaltyDay();
        break;
      case 4:
        this.last_day = this.date_stor.getLastDay();
        this.penalty_day = this.date_stor.getPenaltyDay();
        break;
    }
  }
}

export class CourtPenalty {

  id
  date
  claim = [];

  constructor(id, date) {

    this.id = id;
    this.date = date;

    var number_of_claims = $('.court_claim_' + id).length;
    var names = $('.court_claim_' + id); //Получение массива требований
    var types = $('.court_claim_type_' + id); //Получение массива требований
    var summs = $('.court_claim_summ_' + id); //Получение массива дат решений
    var froms = $('.date_court_penalty_from_' + id); //Получение массива дат начала периода судебных неустоек
    var tos = $('.date_court_penalty_to_' + id); //Получение массива дат конца периода судебных неустоек
    var without_periods = $('.court_without_period_' + id); //Получение массива неустоек без периода
    for (var i = 0; i < number_of_claims; i++) {
      this.claim[i] = new ClaimCourt(i + 1,
                                  names[i],
                                  types[i],
                                  summs[i],
                                  froms[i],
                                  tos[i],
                                  without_periods[i]);

      if (this.claim[i].without.checked) {
        this.claim[i].from = this.claim[i].penalty_day;
        this.claim[i].to = this.getDate();
      }
    }
  }

  getDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
}
