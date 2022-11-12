//Function for find in force fu decision date

import { DAY } from './variables.js'
import { holidays, working_saturdays } from "./objects/allDates"

export function findLastDayForPayFuSuspension(date, suspension_date, suspension_court_date_in_force) {
  let j = 0
  let k = 0
  let misteryDays = 0

  //Подсчет количества рабочих дней с даты начала течения срока на исполнение решения ФУ до даты приостановки сроков
  while ((date + DAY * misteryDays) != suspension_date) {
    misteryDays++
    console.log(!working_saturdays.includes(date + DAY * misteryDays));
    //Если день не приходится на рабочую субботу
    if (!working_saturdays.includes(date + DAY * misteryDays)) {
      //Если день не является субботой или воскресеньем и не праздничным
      if (new Date(date + DAY * misteryDays ).getDay() != 6 &&
        new Date(date + DAY * misteryDays ).getDay() != 0 &&
        !holidays.includes(date + DAY * misteryDays)) {
          j++
      }
    } else {
        j++
    }
}

misteryDays = 0

//Подсчет количества оставшихся рабочих дней с даты вступления в силу решения суда до даты окончания срока на исполнение решения ФУ
while (k != (10 - j)) {
    misteryDays++
    //Если день не приходится на рабочую субботу
    if (!working_saturdays.includes(suspension_court_date_in_force + DAY * misteryDays)) {
      //Если день не является субботой или воскресеньем и не праздничным
       if (new Date(suspension_court_date_in_force + DAY * misteryDays ).getDay() != 6 &&
           new Date(suspension_court_date_in_force + DAY * misteryDays ).getDay() != 0 &&
           !holidays.includes(suspension_court_date_in_force + DAY * misteryDays)) {
          k++
        }
    } else {
      k++
    }
  }

  date = suspension_court_date_in_force + DAY * (misteryDays)
  return date;
}
