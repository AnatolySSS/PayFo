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

// switch (new Date(date).getDay()) {
//   case 6:
//     if (date != Date.parse(new Date(2016, 1, 20, 0)) &&
//         date != Date.parse(new Date(2018, 3, 28, 0)) &&
//         date != Date.parse(new Date(2018, 5, 9, 0)) &&
//         date != Date.parse(new Date(2018, 11, 29, 0)) &&
//         date != Date.parse(new Date(2021, 1, 20, 0)) &&
//         date != Date.parse(new Date(2022, 2, 5, 0))
//       ) {

//       off_days[k] = date;
//       k++;
//       off_days[k] = date + DAY;
//       k++;
//       date = date + DAY * 2;
//       holly_boolen = true;
//       break;
//     }
//     break;
//   case 0:
//     off_days[k] = date;
//     k++;

//     date = date + DAY;
//     holly_boolen = true;
//     break;
//   default:
// }

// while (date == Date.parse(new Date(2015, 0, 1, 0)) ||
//    date == Date.parse(new Date(2015, 0, 2, 0)) ||
//    date == Date.parse(new Date(2015, 0, 3, 0)) ||
//    date == Date.parse(new Date(2015, 0, 4, 0)) ||
//    date == Date.parse(new Date(2015, 0, 5, 0)) ||
//    date == Date.parse(new Date(2015, 0, 6, 0)) ||
//    date == Date.parse(new Date(2015, 0, 7, 0)) ||
//    date == Date.parse(new Date(2015, 0, 8, 0)) ||
//    date == Date.parse(new Date(2015, 0, 9, 0)) ||
//    date == Date.parse(new Date(2015, 1, 23, 0)) ||
//    date == Date.parse(new Date(2015, 2, 9, 0)) ||
//    date == Date.parse(new Date(2015, 4, 1, 0)) ||
//    date == Date.parse(new Date(2015, 4, 4, 0)) ||
//    date == Date.parse(new Date(2015, 4, 11, 0)) ||
//    date == Date.parse(new Date(2015, 5, 12, 0)) ||
//    date == Date.parse(new Date(2015, 10, 4, 0)) ||
//    date == Date.parse(new Date(2016, 0, 1, 0)) ||
//    date == Date.parse(new Date(2016, 0, 2, 0)) ||
//    date == Date.parse(new Date(2016, 0, 3, 0)) ||
//    date == Date.parse(new Date(2016, 0, 4, 0)) ||
//    date == Date.parse(new Date(2016, 0, 5, 0)) ||
//    date == Date.parse(new Date(2016, 0, 6, 0)) ||
//    date == Date.parse(new Date(2016, 0, 7, 0)) ||
//    date == Date.parse(new Date(2016, 0, 8, 0)) ||
//    date == Date.parse(new Date(2016, 1, 22, 0)) ||
//    date == Date.parse(new Date(2016, 1, 23, 0)) ||
//    date == Date.parse(new Date(2016, 2, 7, 0)) ||
//    date == Date.parse(new Date(2016, 2, 8, 0)) ||
//    date == Date.parse(new Date(2016, 4, 2, 0)) ||
//    date == Date.parse(new Date(2016, 4, 3, 0)) ||
//    date == Date.parse(new Date(2016, 4, 9, 0)) ||
//    date == Date.parse(new Date(2016, 5, 13, 0)) ||
//    date == Date.parse(new Date(2016, 10, 4, 0)) ||
//    date == Date.parse(new Date(2017, 0, 1, 0)) ||
//    date == Date.parse(new Date(2017, 0, 2, 0)) ||
//    date == Date.parse(new Date(2017, 0, 3, 0)) ||
//    date == Date.parse(new Date(2017, 0, 4, 0)) ||
//    date == Date.parse(new Date(2017, 0, 5, 0)) ||
//    date == Date.parse(new Date(2017, 0, 6, 0)) ||
//    date == Date.parse(new Date(2017, 0, 7, 0)) ||
//    date == Date.parse(new Date(2017, 0, 8, 0)) ||
//    date == Date.parse(new Date(2017, 1, 23, 0)) ||
//    date == Date.parse(new Date(2017, 1, 24, 0)) ||
//    date == Date.parse(new Date(2017, 2, 8, 0)) ||
//    date == Date.parse(new Date(2017, 4, 1, 0)) ||
//    date == Date.parse(new Date(2017, 4, 8, 0)) ||
//    date == Date.parse(new Date(2017, 4, 9, 0)) ||
//    date == Date.parse(new Date(2017, 5, 12, 0)) ||
//    date == Date.parse(new Date(2017, 10, 6, 0)) ||
//    date == Date.parse(new Date(2018, 0, 1, 0)) ||
//    date == Date.parse(new Date(2018, 0, 2, 0)) ||
//    date == Date.parse(new Date(2018, 0, 3, 0)) ||
//    date == Date.parse(new Date(2018, 0, 4, 0)) ||
//    date == Date.parse(new Date(2018, 0, 5, 0)) ||
//    date == Date.parse(new Date(2018, 0, 6, 0)) ||
//    date == Date.parse(new Date(2018, 0, 7, 0)) ||
//    date == Date.parse(new Date(2018, 0, 8, 0)) ||
//    date == Date.parse(new Date(2018, 1, 23, 0)) ||
//    date == Date.parse(new Date(2018, 2, 8, 0)) ||
//    date == Date.parse(new Date(2018, 2, 9, 0)) ||
//    date == Date.parse(new Date(2018, 3, 30, 0)) ||
//    date == Date.parse(new Date(2018, 4, 1, 0)) ||
//    date == Date.parse(new Date(2018, 4, 2, 0)) ||
//    date == Date.parse(new Date(2018, 4, 9, 0)) ||
//    date == Date.parse(new Date(2018, 5, 11, 0)) ||
//    date == Date.parse(new Date(2018, 5, 12, 0)) ||
//    date == Date.parse(new Date(2018, 10, 5, 0)) ||
//    date == Date.parse(new Date(2018, 11, 31, 0)) ||
//    date == Date.parse(new Date(2019, 0, 1, 0)) ||
//    date == Date.parse(new Date(2019, 0, 2, 0)) ||
//    date == Date.parse(new Date(2019, 0, 3, 0)) ||
//    date == Date.parse(new Date(2019, 0, 4, 0)) ||
//    date == Date.parse(new Date(2019, 0, 5, 0)) ||
//    date == Date.parse(new Date(2019, 0, 6, 0)) ||
//    date == Date.parse(new Date(2019, 0, 7, 0)) ||
//    date == Date.parse(new Date(2019, 0, 8, 0)) ||
//    date == Date.parse(new Date(2019, 2, 8, 0)) ||
//    date == Date.parse(new Date(2019, 4, 1, 0)) ||
//    date == Date.parse(new Date(2019, 4, 2, 0)) ||
//    date == Date.parse(new Date(2019, 4, 3, 0)) ||
//    date == Date.parse(new Date(2019, 4, 9, 0)) ||
//    date == Date.parse(new Date(2019, 4, 10, 0)) ||
//    date == Date.parse(new Date(2019, 5, 12, 0)) ||
//    date == Date.parse(new Date(2019, 10, 4, 0)) ||
//    date == Date.parse(new Date(2020, 0, 1, 0)) ||
//    date == Date.parse(new Date(2020, 0, 2, 0)) ||
//    date == Date.parse(new Date(2020, 0, 3, 0)) ||
//    date == Date.parse(new Date(2020, 0, 4, 0)) ||
//    date == Date.parse(new Date(2020, 0, 5, 0)) ||
//    date == Date.parse(new Date(2020, 0, 6, 0)) ||
//    date == Date.parse(new Date(2020, 0, 7, 0)) ||
//    date == Date.parse(new Date(2020, 0, 8, 0)) ||
//    date == Date.parse(new Date(2020, 1, 24, 0)) ||
//    date == Date.parse(new Date(2020, 2, 9, 0)) ||
//    date == Date.parse(new Date(2020, 4, 1, 0)) ||
//    date == Date.parse(new Date(2020, 4, 4, 0)) ||
//    date == Date.parse(new Date(2020, 4, 5, 0)) ||
//    date == Date.parse(new Date(2020, 4, 11, 0)) ||
//    date == Date.parse(new Date(2020, 5, 12, 0)) ||
//    date == Date.parse(new Date(2020, 5, 24, 0)) ||
//    date == Date.parse(new Date(2020, 6, 1, 0)) ||
//    date == Date.parse(new Date(2020, 10, 4, 0)) ||
//    date == Date.parse(new Date(2021, 0, 1, 0)) ||
//    date == Date.parse(new Date(2021, 0, 2, 0)) ||
//    date == Date.parse(new Date(2021, 0, 3, 0)) ||
//    date == Date.parse(new Date(2021, 0, 4, 0)) ||
//    date == Date.parse(new Date(2021, 0, 5, 0)) ||
//    date == Date.parse(new Date(2021, 0, 6, 0)) ||
//    date == Date.parse(new Date(2021, 0, 7, 0)) ||
//    date == Date.parse(new Date(2021, 0, 8, 0)) ||
//    date == Date.parse(new Date(2021, 0, 9, 0)) ||
//    date == Date.parse(new Date(2021, 0, 10, 0)) ||
//    date == Date.parse(new Date(2021, 1, 22, 0)) ||
//    date == Date.parse(new Date(2021, 1, 23, 0)) ||
//    date == Date.parse(new Date(2021, 2, 8, 0)) ||
//    date == Date.parse(new Date(2021, 4, 3, 0)) ||
//    date == Date.parse(new Date(2021, 4, 10, 0)) ||
//    date == Date.parse(new Date(2021, 5, 14, 0)) ||
//    date == Date.parse(new Date(2021, 10, 4, 0)) ||
//    date == Date.parse(new Date(2021, 10, 5, 0)) ||
//    date == Date.parse(new Date(2021, 11, 31, 0)) ||
//    date == Date.parse(new Date(2022, 0, 1, 0)) ||
//    date == Date.parse(new Date(2022, 0, 2, 0)) ||
//    date == Date.parse(new Date(2022, 0, 3, 0)) ||
//    date == Date.parse(new Date(2022, 0, 4, 0)) ||
//    date == Date.parse(new Date(2022, 0, 5, 0)) ||
//    date == Date.parse(new Date(2022, 0, 6, 0)) ||
//    date == Date.parse(new Date(2022, 0, 7, 0)) ||
//    date == Date.parse(new Date(2022, 0, 8, 0)) ||
//    date == Date.parse(new Date(2022, 1, 23, 0)) ||
//    date == Date.parse(new Date(2022, 2, 7, 0)) ||
//    date == Date.parse(new Date(2022, 2, 8, 0)) ||
//    date == Date.parse(new Date(2022, 4, 2, 0)) ||
//    date == Date.parse(new Date(2022, 4, 3, 0)) ||
//    date == Date.parse(new Date(2022, 4, 9, 0)) ||
//    date == Date.parse(new Date(2022, 4, 10, 0)) ||
//    date == Date.parse(new Date(2022, 5, 13, 0)) ||
//    date == Date.parse(new Date(2022, 10, 4, 0))
//  ) {
//      off_days[k] = date;
//      k++;
//      date = date + DAY;
//      holly_boolen = true;
// }

// switch (new Date(date).getDay()) {
//   case 6:
//     if (date != Date.parse(new Date(2016, 1, 20, 0)) &&
//         date != Date.parse(new Date(2018, 3, 28, 0)) &&
//         date != Date.parse(new Date(2018, 5, 9, 0)) &&
//         date != Date.parse(new Date(2018, 11, 29, 0)) &&
//         date != Date.parse(new Date(2021, 1, 20, 0)) &&
//         date != Date.parse(new Date(2022, 2, 5, 0))
//       ) {

//       off_days[k] = date;
//       k++;
//       off_days[k] = date + DAY;
//       k++;
//       date = date + DAY * 2;
//       holly_boolen = true;
//       break;
//     }
//     break;
//   case 0:
//     off_days[k] = date;
//     k++;

//     date = date + DAY;
//     holly_boolen = true;
//     break;
//   default:
// }

  j = 0
  misteryDays = 0
  return date
}
