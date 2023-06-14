import { findLastDay } from './findLastDay.js';
import { changeDateType } from './changeDateType.js';
import { formatDate } from './formatDate.js';
import { DAY, COLUMN_NAME_20, COLUMN_NAME_21} from './variables.js';
import { holly_boolen } from './findLastDay.js';
import { FirstDateClaim } from "./firstDateClaims";

export class AppDate {

  date_id
  count_days

  firstDateClaim = []

  constructor(type_of_app){

    //Получение массива обращений в ФО
    var number_of_apps_to_fo = $('.apps_to_fos').length
    var apps_to_fo_date = $('.apps_to_fo_dates')
    var apps_to_fo_claims_contract_info = $('.apps_to_fo_claims_contract_infos')

    for (let i = 0; i < number_of_apps_to_fo; i++) {
      this.firstDateClaim[i] = new FirstDateClaim(i + 1,
                              apps_to_fo_date[i],
                              apps_to_fo_claims_contract_info[i])
    }
    

    this.date_id = this.firstDateClaim[0].appDate
    outerLoop:
    switch (type_of_app) {
      case "date_sv":
        this.date_id = this.firstDateClaim[0].appDate
        break;
      case "date_uts":
        for (let i = 0; i < this.firstDateClaim.length; i++) {
          for (let j = 0; j < this.firstDateClaim[i].claimsContractToFo.length; j++) {
            for (let k = 0; k < this.firstDateClaim[i].claimsContractToFo[j].claim.length; k++) {
              if (this.firstDateClaim[i].claimsContractToFo[j].claim[k].type.options.selectedIndex == 2) {
                this.date_id = this.firstDateClaim[i].appDate
                break outerLoop
              }
            }
          }
        }
        break;
      case "date_ev":
        for (let i = 0; i < this.firstDateClaim.length; i++) {
          for (let j = 0; j < this.firstDateClaim[i].claimsContractToFo.length; j++) {
            for (let k = 0; k < this.firstDateClaim[i].claimsContractToFo[j].claim.length; k++) {
              if (this.firstDateClaim[i].claimsContractToFo[j].claim[k].type.options.selectedIndex == 3) {
                this.date_id = this.firstDateClaim[i].appDate
                break outerLoop
              }
            }
          }
        }
        break;
      case "date_stor":
        for (let i = 0; i < this.firstDateClaim.length; i++) {
          for (let j = 0; j < this.firstDateClaim[i].claimsContractToFo.length; j++) {
            for (let k = 0; k < this.firstDateClaim[i].claimsContractToFo[j].claim.length; k++) {
              if (this.firstDateClaim[i].claimsContractToFo[j].claim[k].type.options.selectedIndex == 4) {
                this.date_id = this.firstDateClaim[i].appDate
                break outerLoop
              }
            }
          }
        }
        break;
      default:
        break;
    }
    this.count_days = (this.getPenaltyDay() - this.getAppDate()) / DAY
  }

  getAppDate() {return Date.parse(changeDateType(this.date_id.value) + 'T00:00:00') }
  getAppDateFormatted() { return formatDate(new Date(this.getAppDate())) }
  getLastDay() { return findLastDay(this.date_id.value) }
  getLastDayFormatted() { return formatDate(new Date(this.getLastDay())) }
  getPenaltyDay() { return this.getLastDay() + DAY }
  getPenaltyDayFormatted() { return formatDate(new Date(this.getPenaltyDay())) }

  // fillLastDate() {
  //   this.date_last_day_id.removeAttr('tooltip');
  //   this.date_last_day_id.html("");
  //   this.date_penalty_day_id.html("");
  //   this.date_last_day_id.css({"color" : "#212529"});

  //   if (!isNaN(findLastDay(this.date_id.val()))) {
  //     $('#COLUMN_NAME_20').html(COLUMN_NAME_20);
  //     $('#COLUMN_NAME_21').html(COLUMN_NAME_21);
  //     this.date_last_day_id.html(this.getLastDayFormatted());
  //     this.date_penalty_day_id.html(this.getPenaltyDayFormatted());
  //     if (holly_boolen) {
  //       this.date_last_day_id.css({"color" : "#b00000"});
  //       this.date_last_day_id.attr('tooltip', '193 ГК РФ');
  //     }
  //   }
  // }
}
