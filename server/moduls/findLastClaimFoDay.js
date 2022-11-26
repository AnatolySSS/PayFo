//Function for find last day for answer to applicant claim

import { DAY } from './variables.js'
import { holidays, working_saturdays } from "./objects/allDates"

export function findLastClaimFoDay(date, number_fo_days) {

    let j = 0
    let misteryDays = 0

    if (number_fo_days == 30) {
        date = date + DAY * number_fo_days

        //Перенос даты, если последний день попал на нерабочую субботу, воскресенье или выходной
        //Если день не приходится на рабочую субботу
        if (!working_saturdays.includes(date)) {
            //Если день не является субботой или воскресеньем и не праздничным
            while (new Date(date).getDay() == 6 ||
                    new Date(date).getDay() == 0 ||
                    holidays.includes(date)) {
                date = date + DAY
            }
        }
    } else if (number_fo_days == 15) {
        while (j != number_fo_days) {
            misteryDays++
        
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
        date = date + DAY * (misteryDays)
    }

  return date
}