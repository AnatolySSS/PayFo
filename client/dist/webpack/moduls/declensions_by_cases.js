export function declensions_by_cases(name_of_claim) {
  switch (name_of_claim) {
    case "Страховое возмещение":
      return "страхового возмещения";
      break;
    case "УТС":
      return "УТС";
      break;
    case "Эвакуатор":
      return "расходов на оказание услуг по эвакуации Транспортного средства";
      break;
    case "Хранение":
      return "расходов на оказание услуг по хранению Транспортного средства";
      break;
    default:

  }
}
