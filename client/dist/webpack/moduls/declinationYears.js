//склонение дней
export function declinationYears (count_years) {
  let m = String(count_years).length;
  m = String(count_years).slice(m - 2, m);

  if (Number(m) == 11) {
    count_years = count_years + " лет";
  } else {
    let m = String(count_years).length - 1;
    m = String(count_years).charAt(m);
    switch (m) {
      case "1":
        count_years = count_years + " года";
        break;
      default:
        count_years = count_years + " лет";
    }
  }
  return count_years;
}
