//Function for find in force fu decision date

import { DAY } from './variables.js'
import { holidays, working_saturdays } from "./objects/allDates"

export function findInForceFuDay(date) {

  let j = 0;
  let k = 0;
  let misteryDays = 0;

  while (j != 10) {
    misteryDays++;

    //Если день не приходится на рабочую субботу
    if (!working_saturdays.includes(date + DAY * misteryDays)) {
      //Если день не является субботой или воскресеньем и не праздничным
      if (new Date(date + DAY * misteryDays ).getDay() != 6 &&
          new Date(date + DAY * misteryDays ).getDay() != 0 &&
          !holidays.includes(date + DAY * misteryDays)) {
        j++;
      }
    } else {
      j++;
    }
  }
  date = date + DAY * (misteryDays + 1);
  return date;
}

export function findLastDayForPayFu(date) {
  return findInForceFuDay(date) - DAY;
}
