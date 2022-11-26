//склонение дней
export function declinationDays (count_days) {
  let m = String(count_days).length;
  m = String(count_days).slice(m - 2, m);

  if (Number(m) >= 11 && Number(m) <= 19) {
    count_days = count_days + " дней";
  } else {
    let m = String(count_days).length - 1;
    m = String(count_days).charAt(m);
    switch (m) {
      case "1":
        count_days = count_days + " день";
        break;
      case "2":
      case "3":
      case "4":
        count_days = count_days + " дня";
        break;
      default:
        count_days = count_days + " дней";
    }
  }
  return count_days;
}
