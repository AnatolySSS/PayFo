//Function for find 20th day from start day without hollidays (14 days from 112 labor code article)

import { changeDateType } from './changeDateType.js';
import { DAY } from './variables.js';
import { holidays, working_saturdays, holidays_for_20 } from "./objects/allDates"

export let holly_boolen;
//Нерабочие выходные дни, вычисленные калькулятором
export let off_days = [];

export function findLastDay(date) {
  holly_boolen = false;
  off_days.length = 0;
  let j = 0;
  let k = 0;
  let misteryDays = 0;

  date = changeDateType(date);
  date = Date.parse(date + 'T00:00:00');

  while (j != 20) {
    misteryDays++;
     if (!holidays_for_20.includes(date + DAY * misteryDays)) {
          j++;
    } else {
      off_days[k] = date + DAY * misteryDays;
      k++;
    }
  }
  date = date + DAY * misteryDays;

  //Перенос даты, если последний день попал на нерабочую субботу, воскресенье или выходной
  //Если день не приходится на рабочую субботу
  if (!working_saturdays.includes(date)) {
    //Если день не является субботой или воскресеньем и не праздничным
    while (new Date(date).getDay() == 6 ||
      new Date(date).getDay() == 0 ||
      holidays.includes(date)) {
        date = date + DAY
        off_days[k] = date
        k++
        holly_boolen = true
    }
  }

  j = 0
  misteryDays = 0
  return date
}
