// склонение сумм в родительном падеже
import { convert as numberToWordsRu } from 'number-to-words-ru';

export function makeRubText_genitive(sum, type = "number"){
  let sumText;
  let rub, kop;
  let rub_string_payment, kop_string_payment;

  rub = Math.floor(sum);
  kop = sum - rub;
  kop = Math.round(kop * 100);
  if (kop == 100) {
    kop = 0;
    rub = rub + 1;
  }
  if (kop == 0) {
    kop = "00";
  } else if (kop < 10) {
    kop = "0" + kop;
  }

  //Склонение рублей/рубля
  let m = String(rub).length;
  m = String(rub).slice(m - 2, m);
  if (m  == "11") {
    rub_string_payment = " рублей ";
  } else {
    let m = String(rub).length - 1;
    m = String(rub).charAt(m);
    switch (m) {
      case "1":
        rub_string_payment = " рубля ";
        break;
      default:
        rub_string_payment = " рублей ";
    }
  }

  let rubString = ""

  if (type == "string") {
    rubString =
    " (" +
    numberToWordsRu(rub, {
      showNumberParts: {
        fractional: false,
      },
      showCurrency: {
        integer: false,
      },
    }) +
    ")";
  }

  //Склонение копеек/копейки
  if (kop == "11") {
    kop_string_payment = " копеек";
  } else {
    m = String(kop).length - 1;
    m = String(kop).charAt(m);
    switch (m) {
      case "1":
        kop_string_payment = " копейки";
        break;
      default:
        kop_string_payment = " копеек";
    }
  }

  sumText = new Intl.NumberFormat('ru-RU').format(rub) + rubString + rub_string_payment + kop + kop_string_payment;

  return sumText;
}
