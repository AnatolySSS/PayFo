// склонение сумм в родительном падеже
export function makePercentageText_genitive(sum){
    let sumText
    let percent_string
  
    //Склонение рублей/рубля
    let m = String(sum).length;
    m = String(sum).slice(m - 2, m);
    if (m  == "11" ||
        m  == "12" ||
        m  == "13" ||
        m  == "14" ||
        m  == "15" ||
        m  == "16" ||
        m  == "17" ||
        m  == "18" ||
        m  == "19") {
      percent_string = " процентов";
    } else {
      let m = String(sum).length - 1;
      m = String(sum).charAt(m);
      switch (m) {
        case "1":
          percent_string = " процент";
          break;
        case "2":
          percent_string = "  процента";
          break;
        case "3":
          percent_string = "  процента";
          break;
        case "4":
          percent_string = "  процента";
          break;
        default:
          percent_string = " процентов";
      }
    }
  
    sumText = sum + percent_string
  
    return sumText;
  }
