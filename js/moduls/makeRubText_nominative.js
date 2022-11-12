//склонение сумм в именительном падеже
export function makeRubText_nominative(sum){
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

  //Склонение рублей/рубль
  let m = String(rub).length;
  m = String(rub).slice(m - 2, m);
  if (Number(m) >= 11 && Number(m) <= 19) {
    rub_string_payment = " рублей ";
  } else {
    let m = String(rub).length - 1;
    m = String(rub).charAt(m);
    switch (m) {
      case "1":
        rub_string_payment = " рубль ";
        break;
      case "2":
      case "3":
      case "4":
        rub_string_payment = " рубля ";
        break;
      default:
        rub_string_payment = " рублей  ";
    }
  }


  //Склонение копеек/копейка/копейки
  if (Number(kop) >= 11 && Number(kop) <= 19) {
    kop_string_payment = " копеек";
  } else {
    m = String(kop).length - 1;
    m = String(kop).charAt(m);
    switch (m) {
      case "1":
        kop_string_payment = " копейка";
        break;
      case "2":
      case "3":
      case "4":
        kop_string_payment = " копейки";
        break;
      default:
        kop_string_payment = " копеек";
    }
  }

  sumText = new Intl.NumberFormat('ru-RU').format(rub) + rub_string_payment + kop + kop_string_payment;

  return sumText;
}
