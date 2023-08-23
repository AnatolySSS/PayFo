import { ClaimsContract } from "./moduls/mainClaim.js";
import { DtpParticipant } from "./moduls/dtpParticipants.js";
import { AppDate } from './moduls/app_date.js';
import { PaymentVoluntary } from './moduls/payment_voluntary.js';
import { PaymentFu } from './moduls/payment_fu.js';
import { PaymentCourt } from './moduls/payment_court.js';
import { FuExpertise } from "./moduls/fuExpertise.js";
import { COLUMN_NAME_0, COLUMN_NAME_1, COLUMN_NAME_2, COLUMN_NAME_3, COLUMN_NAME_4 } from './moduls/variables.js';
import { COLUMN_NAME_5, COLUMN_NAME_6, COLUMN_NAME_7, COLUMN_NAME_8 } from './moduls/variables.js';
import { COLUMN_NAME_20, COLUMN_NAME_21 } from './moduls/variables.js';
import { DAY, STR_PAYMENT_DETALED_HEADER, STR_PAYMENT_DETALED, DATE_EURO_START } from './moduls/variables.js';
import { paymentVoluntary, paymentFu, paymentCourt, fuExpertise } from './moduls/variables.js';
import { claimsContract, dtpParticipant, appToFo } from "./moduls/variables.js";
import { makeRubText_nominative } from './moduls/makeRubText_nominative.js';
import { makeRubText_genitive } from './moduls/makeRubText_genitive.js';
import { changeDateType } from './moduls/changeDateType.js';
import { declinationDays } from './moduls/declinationDays.js';
import { fillPenaltyGraph } from './moduls/graph.js';
import { makeTextDecision } from './moduls/makeTextDecision.js';
import { decision_check } from './moduls/analyze_fu_decision.js';
import { autocomplete } from './moduls/autocomplete.js';
import { fo_data } from './moduls/objects/foData.js';
import { allCars } from './moduls/objects/allCars.js';
import { allPopovers } from "./moduls/objects/allPopovers.js";
// import { renderDOM } from "./moduls/react/react.js";
import { makeDecisionFile } from './moduls/docx.js';
import { AppToFo } from "./moduls/appToFos.js";
import { changeQuotes } from "./moduls/changeQuotes.js";
import { dragAndDrop } from "./moduls/drag&Drop.js";
import { findLastDay } from './moduls/findLastDay.js';
import { formatDate } from "./moduls/formatDate.js";
import { getMotivations, getData, appDataToJSON, motive_download, motive_delete, show_motivations, show_data, checkIP } from "./moduls/server.js";
import { findMaxSumm } from "./moduls/findMaxSumm.js";
// import { reader } from "xlsx";

// import { total_penalty_summ_accrued, total_penalty_summ_paid } from './moduls/variables.js';

//Формируем DOM bp react файла
// renderDOM()

let total_penalty_summ_accrued; //Общая сумма начисленной неустойки
let total_penalty_summ_paid; //Общая сумма выплаченной неустойки
let total_penalty_summ; //Общая сумма начисленной неустойки с учетом лимита 100 000 или 400 000
let total_penalty; //Общая подлежаащей взысканию неустойки
let max_penalty_period; // Максимальное количество периодов между периодами судебной неутсойки (количество элементов массива)
let number_of_penalty_periods; // Количество периодов для начисления неустойки
let max_days_delay; // максимальное количество дней просрочки
let swg_graph = SVG().addTo('#div_svg').size('100%', '100%');
let count_days = [];
let penalty_day = [];
let count_vol_days = [];
let payment_vol_types = [];
let count_fu_days = [];
let count_court_days = [];
let payment_vol_summs = [];
let payment_fu_summs = [];
let payment_fu_types = [];
let payment_court_summs = [];
let payment_court_types = [];
let date_sv, date_uts, date_ev, date_stor;
let number_of_payments, number_of_fus, number_of_courts;
let fu_claim_set = new Set();
let decision = '';
let europrotocol;
let date_dtp;
let max_summ = findMaxSumm()
let range;
let data_from_db = {}
let totalData = {}

// $('#app_date_1').focusout(function(){
//   date_sv = new AppDate("date_sv")
//   date_sv.fillLastDate();
//   count_days[0] = date_sv.count_days;
//   penalty_day[0] = date_sv.getPenaltyDayFormatted();
// });

// $('#app_date_2').focusout(function(){
//   date_uts = new AppDate("date_uts")
//   date_uts.fillLastDate();
//   count_days[1] = (date_uts.getPenaltyDay() - date_sv.getAppDate()) / DAY;
//   penalty_day[1] = date_uts.getPenaltyDayFormatted();
// });

// $('#app_date_3').focusout(function(){
//   date_ev = new AppDate("date_ev")
//   date_ev.fillLastDate();
//   count_days[2] = (date_ev.getPenaltyDay() - date_sv.getAppDate()) / DAY;
//   penalty_day[2] = date_ev.getPenaltyDayFormatted();
// });

// $('#app_date_4').focusout(function(){
//   date_stor = new AppDate("date_stor")
//   date_stor.fillLastDate();
//   count_days[3] = (date_stor.getPenaltyDay() - date_sv.getAppDate()) / DAY;
//   penalty_day[3] = date_stor.getPenaltyDayFormatted();
// });

//Обработка события потери фокуса даты решения ФУ
$(document).on("focusout", ".fu_dates", function(){
  //Получение массива значений всех переменных решений ФУ
  number_of_fus = $('div.fus').length; //Получение количества строк с выплатами
  var fu_names = $('.fu_names'); //Получение массива ФУ
  var fu_types = $('.fu_types'); //Получение массива дат решений ФУ
  var fu_dates = $('.fu_dates'); //Получение массива дат решений ФУ
  var fu_numbers = $('.fu_numbers'); //Получение массива номеров решений ФУ

  var fu_app_dates = $('.fu_app_dates'); //Получение массива номеров решений ФУ
  var fu_orders = $('.fu_orders'); //Получение массива номеров решений ФУ

  var fu_pay_dates = $('.fu_pay_dates'); //Получение массива дат решений ФУ
  var fu_in_force_dates = $('.fu_in_force_dates'); //Получение массива дат решений ФУ
  var fu_last_day_for_pay_dates = $('.fu_last_day_for_pay_dates'); //Получение массива дат решений ФУ

  var add_fu_info_suspension_types = $('.add_fu_info_suspension_types'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_dates = $('.add_fu_info_suspension_dates'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_numbers = $('.add_fu_info_suspension_numbers'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_names = $('.add_fu_info_suspension_court_names'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_numbers = $('.add_fu_info_suspension_court_numbers'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_results = $('.add_fu_info_suspension_court_results'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_dates = $('.add_fu_info_suspension_court_dates'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_date_end_forms = $('.add_fu_info_suspension_court_date_end_forms'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_date_in_forces = $('.add_fu_info_suspension_court_date_in_forces'); //Получение массива номеров решений ФУ

  //Создание экземпляров решений ФУ
  for (var i = 0; i < number_of_fus; i++) {
    paymentFu[i] = new PaymentFu(i + 1,
                                 fu_names[i],
                                 fu_types[i],
                                 fu_dates[i],
                                 fu_numbers[i],
                                 fu_app_dates[i],
                                 fu_orders[i],
                                 fu_pay_dates[i],
                                 fu_in_force_dates[i],
                                 fu_last_day_for_pay_dates[i],
                                 add_fu_info_suspension_types[i],
                                 add_fu_info_suspension_dates[i],
                                 add_fu_info_suspension_numbers[i],
                                 add_fu_info_suspension_court_names[i],
                                 add_fu_info_suspension_court_numbers[i],
                                 add_fu_info_suspension_court_results[i],
                                 add_fu_info_suspension_court_dates[i],
                                 add_fu_info_suspension_court_date_end_forms[i],
                                 add_fu_info_suspension_court_date_in_forces[i]);
    paymentFu[i].fillDates();
  }
  // paymentFu[$(this).index('.fu_dates')].fillDates();
});

//Обработка события потери фокуса даты решения ФУ
$(document).on("focusout", ".add_fu_info_suspension_court_date_in_forces", function(){
  //Получение массива значений всех переменных решений ФУ
  number_of_fus = $('div.fus').length; //Получение количества строк с выплатами
  var fu_names = $('.fu_names'); //Получение массива ФУ
  var fu_types = $('.fu_types'); //Получение массива дат решений ФУ
  var fu_dates = $('.fu_dates'); //Получение массива дат решений ФУ
  var fu_numbers = $('.fu_numbers'); //Получение массива номеров решений ФУ

  var fu_app_dates = $('.fu_app_dates'); //Получение массива номеров решений ФУ
  var fu_orders = $('.fu_orders'); //Получение массива номеров решений ФУ

  var fu_pay_dates = $('.fu_pay_dates'); //Получение массива дат решений ФУ
  var fu_in_force_dates = $('.fu_in_force_dates'); //Получение массива дат решений ФУ
  var fu_last_day_for_pay_dates = $('.fu_last_day_for_pay_dates'); //Получение массива дат решений ФУ

  var add_fu_info_suspension_types = $('.add_fu_info_suspension_types'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_dates = $('.add_fu_info_suspension_dates'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_numbers = $('.add_fu_info_suspension_numbers'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_names = $('.add_fu_info_suspension_court_names'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_numbers = $('.add_fu_info_suspension_court_numbers'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_results = $('.add_fu_info_suspension_court_results'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_dates = $('.add_fu_info_suspension_court_dates'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_date_end_forms = $('.add_fu_info_suspension_court_date_end_forms'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_date_in_forces = $('.add_fu_info_suspension_court_date_in_forces'); //Получение массива номеров решений ФУ

  //Создание экземпляров решений ФУ
  for (var i = 0; i < number_of_fus; i++) {
    paymentFu[i] = new PaymentFu(i + 1,
                                 fu_names[i],
                                 fu_types[i],
                                 fu_dates[i],
                                 fu_numbers[i],
                                 fu_app_dates[i],
                                 fu_orders[i],
                                 fu_pay_dates[i],
                                 fu_in_force_dates[i],
                                 fu_last_day_for_pay_dates[i],
                                 add_fu_info_suspension_types[i],
                                 add_fu_info_suspension_dates[i],
                                 add_fu_info_suspension_numbers[i],
                                 add_fu_info_suspension_court_names[i],
                                 add_fu_info_suspension_court_numbers[i],
                                 add_fu_info_suspension_court_results[i],
                                 add_fu_info_suspension_court_dates[i],
                                 add_fu_info_suspension_court_date_end_forms[i],
                                 add_fu_info_suspension_court_date_in_forces[i]);
    paymentFu[i].fillDates();
  }
  // paymentFu[$(this).index('.fu_dates')].fillDates();
});

$('#btn_desicion').click(function() {

  date_sv = new AppDate("date_sv")
  count_days[0] = date_sv.count_days;
  penalty_day[0] = date_sv.getPenaltyDayFormatted();

  date_uts = new AppDate("date_uts")
  count_days[1] = (date_uts.getPenaltyDay() - date_sv.getAppDate()) / DAY;
  penalty_day[1] = date_uts.getPenaltyDayFormatted();

  date_ev = new AppDate("date_ev")
  count_days[2] = (date_ev.getPenaltyDay() - date_sv.getAppDate()) / DAY;
  penalty_day[2] = date_ev.getPenaltyDayFormatted();

  date_stor = new AppDate("date_stor")
  count_days[3] = (date_stor.getPenaltyDay() - date_sv.getAppDate()) / DAY;
  penalty_day[3] = date_stor.getPenaltyDayFormatted();

  //Очистка таблицы вывода результатов
  $('#str_payment_dataled').empty();
  $('#str_payment_dataled_header').empty();
  $('#str_payment_dataled_footer').empty();

  //Обнуление значений
  claimsContract.length = 0;
  dtpParticipant.length = 0;
  appToFo.length = 0;
  paymentVoluntary.length = 0;
  paymentFu.length = 0;
  paymentCourt.length = 0;

  total_penalty_summ_accrued = 0;
  total_penalty_summ_paid = 0;
  total_penalty = 0;
  max_penalty_period = 0;
  max_days_delay = 0;
  count_vol_days.length = 0;
  payment_vol_types.length = 0;
  count_fu_days.length = 0;
  count_court_days.length = 0;
  payment_vol_summs.length = 0;
  payment_fu_summs.length = 0;
  payment_fu_types.length = 0;
  payment_court_summs.length = 0;
  payment_court_types.length = 0;
  fu_claim_set.clear();

  if (date_sv.value == "") {
    count_days[0] = NaN;
  }
  if (date_uts.value == "") {
    count_days[1] = NaN;
  }
  if (date_ev.value == "") {
    count_days[2] = NaN;
  }
  if (date_stor.value == "") {
    count_days[3] = NaN;
  }

  //Расчет страховой суммы
  europrotocol = document.querySelector('#europrotocol').checked;
  date_dtp = document.querySelector('#date_dtp').value;
  date_dtp = changeDateType(date_dtp);
  date_dtp = Date.parse(date_dtp + 'T00:00:00');

  // if (date_dtp >= DATE_EURO_START && europrotocol) { // Если дата ДТП после 01.06.2018 И Европротокол
  //   max_summ = 100000;
  //   // document.querySelector('#max_summ').innerHTML = "Страховая сумма: 100 000₽";
  // } else if (date_dtp >= DATE_EURO_START && !europrotocol){ // Если дата ДТП после 01.06.2018 И НЕ Европротокол
  //   max_summ = 400000;
  //   // document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  // } else if (date_dtp < DATE_EURO_START && europrotocol) { // Если дата ДТП до 01.06.2018 И Европротокол
  //   max_summ = 50000;
  //   // document.querySelector('#max_summ').innerHTML = "Страховая сумма: 50 000₽";
  // } else if (date_dtp < DATE_EURO_START && !europrotocol) { // Если дата ДТП до 01.06.2018 И НЕ Европротокол
  //   max_summ = 400000;
  //   // document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  // } else if (europrotocol) { //Если Европротокол (без указания даты)
  //   max_summ = 100000;
  //   // document.querySelector('#max_summ').innerHTML = "Страховая сумма: 100 000₽";
  // } else { // остальные случаи
  //   max_summ = 400000;
  //   // document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  // }

  //Получение массива значений всех требований к ФУ
  var number_of_main_claims_contracts = $('.main_claims_contracts').length
  var claims_contract_types = $('.claims_contract_types')
  let claimsContractAll = []
  for (var i = 0; i < number_of_main_claims_contracts; i++) {
    claimsContract[i] = new ClaimsContract(i + 1,
                                           claims_contract_types[i])
    claimsContractAll[i] = claimsContract[i].setObject()
  }

  //Получение объекта с требованиями к ФУ
  let claimsToFuData = {
    name : "claimsToFuData",
    claimsContractAll : claimsContractAll
  }

  let app_type = document.querySelector("#app_type").value
  let app_name, app_inn, app_passport, app_registration_address, app_post_address, app_registration_date

  app_name = document.querySelector("#app_name")
  app_inn = document.querySelector("#app_inn_ip")
  app_registration_date = document.querySelector("#app_registration_date_ip")
  app_passport = document.querySelector("#app_passport")
  app_registration_address = document.querySelector("#app_registration_address")
  app_post_address = document.querySelector("#app_post_address")

  switch (app_type) {
    case "ФЛ":
      app_name = document.querySelector("#app_name")
      app_passport = document.querySelector("#app_passport")
      app_registration_address = document.querySelector("#app_registration_address")
      app_post_address = document.querySelector("#app_post_address")
      break
    case "ИП":
      app_name = document.querySelector("#app_name_ip")
      app_inn = document.querySelector("#app_inn_ip")
      app_registration_date = document.querySelector("#app_registration_date_ip")
      app_registration_address = document.querySelector("#app_registration_address_ip")
      app_post_address = document.querySelector("#app_post_address_ip")
      break
    case "ЮЛ":
      app_name = document.querySelector("#app_name_ul")
      app_inn = document.querySelector("#app_inn_ul")
      app_registration_date = document.querySelector("#app_registration_date_ul")
      app_registration_address = document.querySelector("#app_registration_address_ul")
      app_post_address = document.querySelector("#app_post_address_ul")
      break
    default:
      break
  }

  //Получение объекта с данными для преамбулы
  let preambulaData = {
    name : "preambulaData",
    fu_name : document.querySelector("#fu_name").value,
    date_appeal : document.querySelector("#date_appeal").value,
    appeal_number : document.querySelector("#appeal_number").value,

    fo_name : document.querySelector("#fo_name").value,
    fo_inn : document.querySelector("#fo_inn").value,
    fo_registration_date : document.querySelector("#fo_registration_date").value,
    fo_registration_address : document.querySelector("#fo_registration_address").value,
    fo_post_address : document.querySelector("#fo_post_address").value,

    app_type : document.querySelector("#app_type").value,
    app_status : document.querySelector("#app_status").value,
    app_name : app_name.value,
    app_passport : app_passport.value,
    app_inn : app_inn.value,
    app_registration_date : app_registration_date.value,
    app_registration_address : app_registration_address.value,
    app_post_address : app_post_address.value,
  }

  let mainRequestData = {
    name : "mainRequestData",
    date_main_request : document.querySelector("#date_main_request").value,
    number_main_request : document.querySelector("#number_main_request").value,
    main_answer_type : document.querySelector("#main_answer_type").value,
    date_main_answer : document.querySelector("#date_main_answer").value,
    number_main_answer : document.querySelector("#number_main_answer").value,
  }

  //Получение массива значений всех участников ДТП
  var number_of_dtp_participants = $('.dtp_participants').length
  var car_brand = $('.car_brands')
  var car_model = $('.car_models')
  var car_reg_number = $('.car_reg_numbers')
  var car_vin_number = $('.car_vin_numbers')
  var car_year = $('.car_years')
  var car_type = $('.car_types')
  var car_weight = $('.car_weights')
  var driver_name = $('.driver_names')
  var owner_name = $('.owner_names')
  var is_guilty = $('.is_guilties')
  let dtpParticipantAll = []
  for (var i = 0; i < number_of_dtp_participants; i++) {
    dtpParticipant[i] = new DtpParticipant(i + 1,
                                          car_brand[i],
                                          car_model[i],
                                          car_reg_number[i],
                                          car_vin_number[i],
                                          car_year[i],
                                          car_type[i],
                                          car_weight[i],
                                          driver_name[i],
                                          owner_name[i],
                                          is_guilty[i])
      dtpParticipantAll[i] = dtpParticipant[i].setObject()
  }
  let dtpData = {
    name : "dtpData",
    europrotocol : document.querySelector('#europrotocol').checked,
    date_dtp : document.querySelector('#date_dtp').value,
    place_dtp : document.querySelector('#place_dtp').value,
    dtpParticipants : dtpParticipantAll
  }

  //Получение массива обращений в ФО
  var number_of_apps_to_fo = $('.apps_to_fos').length
  var apps_to_fo_date = $('.apps_to_fo_dates')
  var apps_to_fo_types = $('.apps_to_fo_types')
  var apps_to_fo_procedures = $('.apps_to_fo_procedures')
  var apps_to_fo_type_of_claims = $('.apps_to_fo_type_of_claims')
  var apps_to_fo_methods = $('.apps_to_fo_methods')
  var apps_to_fo_forms = $('.apps_to_fo_forms')
  var apps_to_fo_claims_contract_info = $('.apps_to_fo_claims_contract_infos')
  var apps_to_fo_expertise_app_info = $('.apps_to_fo_expertise_app_infos')
  var apps_to_fo_agreement_phone_info = $('.apps_to_fo_agreement_phone_infos')
  var apps_to_fo_request_info = $('.apps_to_fo_request_infos')
  var apps_to_fo_inspection_info = $('.apps_to_fo_inspection_infos')
  var apps_to_fo_expertise_info = $('.apps_to_fo_expertise_infos')
  var apps_to_fo_answer_fo_infos = $('.apps_to_fo_answer_fo_infos')
  var apps_to_fo_answer_fos = $('.apps_to_fo_answer_fos')
  let appToFoAll = []
  for (let i = 0; i < number_of_apps_to_fo; i++) {
    appToFo[i] = new AppToFo(i + 1,
                             apps_to_fo_date[i],
                             apps_to_fo_types[i],
                             apps_to_fo_procedures[i],
                             apps_to_fo_type_of_claims[i],
                             apps_to_fo_methods[i],
                             apps_to_fo_forms[i],
                             apps_to_fo_claims_contract_info[i],
                             apps_to_fo_expertise_app_info[i],
                             apps_to_fo_agreement_phone_info[i],
                             apps_to_fo_request_info[i],
                             apps_to_fo_inspection_info[i],
                             apps_to_fo_expertise_info[i],
                             apps_to_fo_answer_fo_infos[i],
                             apps_to_fo_answer_fos[i])
      appToFoAll[i] = appToFo[i].setObject()
  }
  let appToFoData = {
    name : "appToFoData",
    appToFoAll : appToFoAll
  }

  //Получение массива значений всех переменных добровольных выплат
  number_of_payments = $('.payments').length; //Получение количества строк с выплатами
  var payments_names = $('.payments_names'); //Получение массива видов выплат
  var payments_dates = $('.payments_dates'); //Получение массива дат выплат
  var payments_orders = $('.payments_orders'); //Получение массива номеров ПП
  var payments_summs = $('.payments_summs'); //Получение массива сумм выплат
  var penalty_ndfls = $('.penalty_ndfls'); //Получение массива выплат неустойки с НДФЛ
  var penalty_ndfl_summs = $('.penalty_ndfl_summs'); //Получение массива сумм удержанного НДФЛ
  var penalty_ndfl_persents = $('.penalty_ndfl_persents'); //Получение массива процентов НДФЛ
  var payment_ev_routes = $(`.payment_ev_routes`); //Получение массива маршрутов эвакуации ТС
  let paymentVoluntaryAll = []
  //Создание экземпляров добровольных выплат
  for (var i = 0; i < number_of_payments; i++) {
    paymentVoluntary[i] = new PaymentVoluntary(1,
                                               i + 1,
                                               payments_names[i],
                                               payments_dates[i],
                                               payments_orders[i],
                                               payments_summs[i],
                                               penalty_ndfls[i],
                                               penalty_ndfl_summs[i],
                                               payment_ev_routes[i]);
    paymentVoluntaryAll[i] = paymentVoluntary[i].setObject()

    count_vol_days[i] = paymentVoluntary[i].count_days;
    payment_vol_types[i] = paymentVoluntary[i].type.options.selectedIndex;
    payment_vol_summs[i] = paymentVoluntary[i].summ / 1000;
    if (paymentVoluntary[i].penalty_period.length > max_penalty_period) {
      max_penalty_period = paymentVoluntary[i].penalty_period.length
    }
    if (paymentVoluntary[i].days_delay > max_days_delay) {
      max_days_delay = paymentVoluntary[i].count_days; //Получение значения самой большой задержки
    }
  }

  let paymentVoluntaryData = {
    name : "paymentVoluntaryData",
    paymentVoluntaryAll : paymentVoluntaryAll
  }

  //Получение массива значений всех переменных решений ФУ
  number_of_fus = $('div.fus').length; //Получение количества строк с выплатами
  var fu_names = $('.fu_names'); //Получение массива ФУ
  var fu_types = $('.fu_types'); //Получение массива дат решений ФУ
  var fu_dates = $('.fu_dates'); //Получение массива дат решений ФУ
  var fu_numbers = $('.fu_numbers'); //Получение массива номеров решений ФУ

  var fu_app_dates = $('.fu_app_dates'); //Получение массива номеров решений ФУ
  var fu_orders = $('.fu_orders'); //Получение массива номеров решений ФУ

  var fu_pay_dates = $('.fu_pay_dates'); //Получение массива дат решений ФУ
  var fu_in_force_dates = $('.fu_in_force_dates'); //Получение массива дат решений ФУ
  var fu_last_day_for_pay_dates = $('.fu_last_day_for_pay_dates'); //Получение массива дат решений ФУ

  var add_fu_info_suspension_types = $('.add_fu_info_suspension_types'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_dates = $('.add_fu_info_suspension_dates'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_numbers = $('.add_fu_info_suspension_numbers'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_names = $('.add_fu_info_suspension_court_names'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_numbers = $('.add_fu_info_suspension_court_numbers'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_results = $('.add_fu_info_suspension_court_results'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_dates = $('.add_fu_info_suspension_court_dates'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_date_end_forms = $('.add_fu_info_suspension_court_date_end_forms'); //Получение массива номеров решений ФУ
  var add_fu_info_suspension_court_date_in_forces = $('.add_fu_info_suspension_court_date_in_forces'); //Получение массива номеров решений ФУ

  let paymentFuAll = []

  //Создание экземпляров решений ФУ
  for (var i = 0; i < number_of_fus; i++) {
    paymentFu[i] = new PaymentFu(i + 1,
                                 fu_names[i],
                                 fu_types[i],
                                 fu_dates[i],
                                 fu_numbers[i],
                                 fu_app_dates[i],
                                 fu_orders[i],
                                 fu_pay_dates[i],
                                 fu_in_force_dates[i],
                                 fu_last_day_for_pay_dates[i],
                                 add_fu_info_suspension_types[i],
                                 add_fu_info_suspension_dates[i],
                                 add_fu_info_suspension_numbers[i],
                                 add_fu_info_suspension_court_names[i],
                                 add_fu_info_suspension_court_numbers[i],
                                 add_fu_info_suspension_court_results[i],
                                 add_fu_info_suspension_court_dates[i],
                                 add_fu_info_suspension_court_date_end_forms[i],
                                 add_fu_info_suspension_court_date_in_forces[i]);
    paymentFuAll[i] = paymentFu[i].setObject()
    count_fu_days[i] = paymentFu[i].count_days;
    // payment_fu_last_days[i] = (paymentFu[i].getLastDayForPayFu() - date_sv.getAppDate()) / DAY;
    payment_fu_summs[i] = [];
    payment_fu_types[i] = [];
    for (var j = 0; j < paymentFu[i].claim.length; j++) {
      if (paymentFu[i].claim[j].name.options.selectedIndex == 1 ||
          paymentFu[i].claim[j].name.options.selectedIndex == 2 ||
          paymentFu[i].claim[j].name.options.selectedIndex == 3 ||
          paymentFu[i].claim[j].name.options.selectedIndex == 4) {
        payment_fu_summs[i][j] = paymentFu[i].claim[j].summ / 1000;
        payment_fu_types[i][j] = paymentFu[i].claim[j].name.options.selectedIndex;
      }
    }

    if (paymentFu[i].max_penalty_period > max_penalty_period) {
     max_penalty_period = paymentFu[i].max_penalty_period;
    }
    if (paymentFu[i].count_days > max_days_delay) {
      max_days_delay = paymentFu[i].count_days; //Получение значения самой большой задержки
    }
  }

  let paymentFuData = {
    name : "paymentFuData",
    paymentFuAll : paymentFuAll
  }

  //Получение массива значений всех переменных решений судов
  number_of_courts = $('.courts').length; //Получение количества строк с выплатами
  var court_names = $('.court_names'); //Получение массива наименований судов
  var court_types = $('.court_types'); //Получение массива номеров решений судов
  var court_numbers = $('.court_numbers'); //Получение массива наименований судов
  var court_dates = $('.court_dates'); //Получение массива дат решений судов
  var court_date_end_forms = $('.court_date_end_forms'); //Получение массива дат решений судов
  var court_in_force_dates = $('.court_in_force_dates'); //Получение массива дат решений судов
  var court_pay_dates = $('.court_pay_dates'); //Получение массива дат решений судов
  var court_orders = $('.court_orders'); //Получение массива дат решений судов

  let paymentCourtAll = []

  //Создание экземпляров решений судов
  for (var i = 0; i < number_of_courts; i++) {
    paymentCourt[i] = new PaymentCourt(i + 1,
                                 court_names[i],
                                 court_types[i],
                                 court_numbers[i],
                                 court_dates[i],
                                 court_date_end_forms[i],
                                 court_in_force_dates[i],
                                 court_pay_dates[i],
                                 court_orders[i])
    paymentCourtAll[i] = paymentCourt[i].setObject()

    count_court_days[i] = paymentCourt[i].count_days;
    // payment_court_in_force_dates[i] = (paymentCourt[i].getInForceDate() - date_sv.getAppDate()) / DAY;
    fu_claim_set = paymentCourt[i].fu_claim_set;
    payment_court_summs[i] = [];
    payment_court_types[i] = [];
    for (var j = 0; j < paymentCourt[i].claim.length; j++) {
      if (paymentCourt[i].claim[j].name.options.selectedIndex == 1 ||
          paymentCourt[i].claim[j].name.options.selectedIndex == 2 ||
          paymentCourt[i].claim[j].name.options.selectedIndex == 3 ||
          paymentCourt[i].claim[j].name.options.selectedIndex == 4) {
        payment_court_summs[i][j] = paymentCourt[i].claim[j].summ / 1000;
        payment_court_types[i][j] = paymentCourt[i].claim[j].name.options.selectedIndex;
      }
    }

    if (paymentCourt[i].max_penalty_period > max_penalty_period) {
      max_penalty_period = paymentCourt[i].max_penalty_period;
    }
    if (paymentCourt[i].count_days > max_days_delay) {
      max_days_delay = paymentCourt[i].count_days; //Получение значения самой большой задержки
    }
  }

  let paymentCourtData = {
    name : "paymentCourtData",
    paymentCourtAll : paymentCourtAll
  }

  //Создание экземпляров класса Экспертиз ФУ
  var number_of_fu_expertises = $(`.fu_expertises`).length
  var fu_expertise_dates = $(`.fu_expertise_dates`)
  var fu_expertise_numbers = $(`.fu_expertise_numbers`)
  var fu_expertise_organizations = $(`.fu_expertise_organizations`)
  var fu_expertise_summ_withouts = $(`.fu_expertise_summ_withouts`)
  var fu_expertise_summ_withs = $(`.fu_expertise_summ_withs`)
  var fu_expertise_summ_markets = $(`.fu_expertise_summ_markets`)
  var fu_expertise_summ_leftovers = $(`.fu_expertise_summ_leftovers`)
  var fu_expertise_summ_uts = $(`.fu_expertise_summ_uts`)
  var fu_expertise_trasas = $(`.fu_expertise_trasas`)
  var fu_expertise_trasa_results = $(`.fu_expertise_trasa_results`)
  var fu_expertise_technicians = $(`.fu_expertise_technicians`)
  var fu_expertise_typical_questions = $(`.fu_expertise_typical_questions`)
  var fu_expertise_questions = $(`.fu_expertise_questions`)

  let fuExpertiseAll = []

  for (let i = 0; i < number_of_fu_expertises; i++) {
      fuExpertise[i] = new FuExpertise(i + 1,
                                      fu_expertise_dates[i],
                                      fu_expertise_numbers[i],
                                      fu_expertise_organizations[i],
                                      fu_expertise_summ_withouts[i],
                                      fu_expertise_summ_withs[i],
                                      fu_expertise_summ_markets[i],
                                      fu_expertise_summ_leftovers[i],
                                      fu_expertise_summ_uts[i],
                                      fu_expertise_trasas[i],
                                      fu_expertise_trasa_results[i],
                                      fu_expertise_technicians[i],
                                      fu_expertise_typical_questions[i],
                                      fu_expertise_questions[i])
        fuExpertiseAll[i] = fuExpertise[i].setObject()
  }

  let fuExpertiseData = {
    name : "fuExpertiseData",
    fuExpertiseAll : fuExpertiseAll
  }

  //Проверка по чек-листу
  document.getElementById('check_list').onclick = function check_list(){
    if ($('#check_list').html() == "Показать чек-лист") {
      $('#check_list_div').show()
      $('#check_list').html("Скрыть чек-лист");

      //Проверка 3-летнего срока на обращения к ФУ
      let date_appeal = $('#date_appeal').val()
      date_appeal = changeDateType(date_appeal)
      date_appeal = Date.parse(date_appeal + 'T00:00:00')
      let last_day_for_pay_fu = new Date(findLastDay(appToFo[0].appDate.value))
      let year = last_day_for_pay_fu.getFullYear()
      let month = last_day_for_pay_fu.getMonth()
      let day = last_day_for_pay_fu.getDate()
      let last_day_for_fu_app = new Date(year + 3, month, day + 1, 0);
      last_day_for_fu_app = Date.parse(last_day_for_fu_app)
      if (date_appeal > last_day_for_fu_app) {
        $('#check_three_years .card').html(`Прошло больше 3х лет с момента когда Заявитель узнал о нарушении своего права:<br>
        * дата первоначального обращения в ФО: ${appToFo[0].appDate.value}<br>
        * дата окончания 20-дневного срока: ${formatDate(last_day_for_pay_fu)}<br>
        * дата истечения 3-летнего срока для обращения к ФУ: ${formatDate(new Date(last_day_for_fu_app))}<br>
        * дата обращения к ФУ: ${formatDate(new Date(date_appeal))}`)
        
        $('#check_three_years').find('i').removeClass('fa-check-square-o')
        $('#check_three_years').find('i').removeClass('fa-question-circle-o')
        $('#check_three_years').find('i').addClass('fa-exclamation-circle')
        $('#check_three_years').find('i').css("color", "#dc3545")

      } else if (date_appeal <= last_day_for_fu_app) {
        $('#check_three_years .card').html(`Прошло менее 3х лет с момента когда Заявитель узнал о нарушении своего права:<br>
        * дата первоначального обращения в ФО: ${appToFo[0].appDate.value}<br>
        * дата окончания 20-дневного срока: ${formatDate(last_day_for_pay_fu)}<br>
        * дата истечения 3-летнего срока для обращения к ФУ: ${formatDate(new Date(last_day_for_fu_app))}\<br>
        * дата обращения к ФУ: ${formatDate(new Date(date_appeal))}`)
        
        $('#check_three_years').find('i').removeClass('fa-exclamation-circle')
        $('#check_three_years').find('i').removeClass('fa-question-circle-o')
        $('#check_three_years').find('i').addClass('fa-check-square-o')
        $('#check_three_years').find('i').css("color", "#28a745")

      } else {
        $('#check_three_years .card').html(`Необходимо заполнить следующие данные:<br>
        * дата первоначального обращения в ФО<br>
        * дата обращения к ФУ`)
        
        $('#check_three_years').find('i').removeClass('fa-exclamation-circle')
        $('#check_three_years').find('i').removeClass('fa-check-square-o')
        $('#check_three_years').find('i').addClass('fa-question-circle-o')
        $('#check_three_years').find('i').css("color", "#ffc107")
      }

      //Проверка статуса Заявителя
      if ($('#app_name').val() != "" && $('#owner_name_deactivate_1').is(':checked')) {
        $('#check_app_owner .card').html(`Заявитель является собственником ТС`)

        $('#check_app_owner').find('i').removeClass('fa-exclamation-circle')
        $('#check_app_owner').find('i').removeClass('fa-question-circle-o')
        $('#check_app_owner').find('i').addClass('fa-check-square-o')
        $('#check_app_owner').find('i').css("color", "#28a745")

      } else if ($('#app_name').val() == "" && $('#owner_name_1').val() != "") {
        $('#check_app_owner .card').html(`Необходимо заполнить данные:<br>
        * ФИО Заявителя<br>
        * Собственник ТС - ${$('#owner_name_1').val()}`)

        $('#check_app_owner').find('i').removeClass('fa-exclamation-circle')
        $('#check_app_owner').find('i').removeClass('fa-check-square-o')
        $('#check_app_owner').find('i').addClass('fa-question-circle-o')
        $('#check_app_owner').find('i').css("color", "#ffc107")

      } else if ($('#app_name').val() != "" && $('#owner_name_1').val() == "" && !$('#owner_name_deactivate_1').is(':checked')) {
        $('#check_app_owner .card').html(`Необходимо заполнить данные:<br>
        * Заявитель - ${$('#app_name').val()}<br>
        * ФИО Собственника ТС`)

        $('#check_app_owner').find('i').removeClass('fa-exclamation-circle')
        $('#check_app_owner').find('i').removeClass('fa-check-square-o')
        $('#check_app_owner').find('i').addClass('fa-question-circle-o')
        $('#check_app_owner').find('i').css("color", "#ffc107")

      } else if ($('#app_name').val() != "" && $('#owner_name_1').val() != "" && !$('#owner_name_deactivate_1').is(':checked')) {
        $('#check_app_owner .card').html(`Заявитель не является собственником ТС<br>
        * Заявитель - ${$('#app_name').val()}<br>
        * Собственник ТС - ${$('#owner_name_1').val()}`)

        $('#check_app_owner').find('i').removeClass('fa-check-square-o')
        $('#check_app_owner').find('i').removeClass('fa-question-circle-o')
        $('#check_app_owner').find('i').addClass('fa-exclamation-circle')
        $('#check_app_owner').find('i').css("color", "#dc3545")

      } else {
        $('#check_app_owner .card').html(`Необходимо заполнить данные:<br>
        * ФИО Заявителя<br>
        * ФИО Собственника ТС`)
        $('#check_app_owner').find('i').removeClass('fa-exclamation-circle')
        $('#check_app_owner').find('i').removeClass('fa-check-square-o')
        $('#check_app_owner').find('i').addClass('fa-question-circle-o')
        $('#check_app_owner').find('i').css("color", "#ffc107")
      }
      
    } else {
      $('#check_list_div').hide();
      $('#check_list').html("Показать чек-лист");
    }
  }

  //Выведение заголовка таблицы на экран
  if (max_penalty_period > 0) {
    fillHeader(max_penalty_period);
  } else {
    $('#str_payment_dataled_header').append(STR_PAYMENT_DETALED_HEADER);
    max_penalty_period = 1;
  }

  //Заполнение строк в таблице (добровольные выплаты)
  for (var i = 0; i < number_of_payments; i++) {
    if (paymentVoluntary[i].type.options.selectedIndex != 5) {
      paymentVoluntary[i].fillPayments();
      total_penalty_summ_accrued = total_penalty_summ_accrued + paymentVoluntary[i].penalty_summ;
    }
  }

  //Заполнение строк в таблице (решения ФУ)
  for (var i = 0; i < number_of_fus; i++) {
    paymentFu[i].fillPayments();
    total_penalty_summ_accrued = total_penalty_summ_accrued + paymentFu[i].total_penalty_summ_fu;
  }

  //Заполнение строк в таблице (решения суда)
  for (var i = 0; i < number_of_courts; i++) {
    paymentCourt[i].fillPayments();
    total_penalty_summ_accrued = total_penalty_summ_accrued + paymentCourt[i].total_penalty_summ_court;
  }

  //Строка с общим размером начисленной неутсойки
  let total_penalty_summ_accrued_row = '<tr class="table-danger">' +
    '<th scope="row" colspan="' + (max_penalty_period * 4 + 2) + '"><span>Общий размер начисленной неустойки</span></th>' +
    '<td scope="row"><span><b>' + makeRubText_nominative(total_penalty_summ_accrued) + '</b></span></td>' +
  '</tr>';
  $('#str_payment_dataled').append(total_penalty_summ_accrued_row);


  for (var i = 0; i < number_of_payments; i++) {
    if (paymentVoluntary[i].type.options.selectedIndex == 5) {
      paymentVoluntary[i].fillPayments();
      total_penalty_summ_paid = total_penalty_summ_paid + paymentVoluntary[i].summ;
    }
  }

  let total_penalty_summ_paid_row = '<tr class="table-success">' +
    '<th scope="row" colspan="' + (max_penalty_period * 4 + 2) + '"><span>Общий размер выплаченной неустойки</span></th>' +
    '<td scope="row"><span><b>' + makeRubText_nominative(total_penalty_summ_paid) + '</b></span></td>' +
  '</tr>';

  $('#str_payment_dataled').append(total_penalty_summ_paid_row);

  if (total_penalty_summ_accrued > max_summ) {
    total_penalty_summ = max_summ;
  } else {
    total_penalty_summ = total_penalty_summ_accrued;
  }

  total_penalty = total_penalty_summ - total_penalty_summ_paid; 

  let total_penalty_row = '<tr>' +
    '<th scope="row" colspan="' + (max_penalty_period * 4 + 2) + '"><span>Общий размер подлежащей взысканию неустойки (' + makeRubText_nominative(total_penalty_summ) + ' - ' + makeRubText_nominative(total_penalty_summ_paid) + ')</span></th>' +
    '<td scope="row"><span><b>' + makeRubText_nominative(total_penalty) + '</b></span></td>' +
  '</tr>';

  $('#str_payment_dataled_footer').append(total_penalty_row);

  totalData = {
    preambulaData : preambulaData,
    claimsToFuData : claimsToFuData,
    mainRequestData : mainRequestData,
    dtpData : dtpData,
    appToFoData : appToFoData,
    paymentVoluntaryData : paymentVoluntaryData,
    paymentFuData : paymentFuData,
    paymentCourtData : paymentCourtData,
    fuExpertiseData : fuExpertiseData,
  }
  
  console.log(totalData);
  //Получение данных из таблицы motivations
  let motivationsPromise = getMotivations(totalData)
  motivationsPromise.then(result => {
    data_from_db = result
    console.log("data_from_db1")
    //Получение данных из таблицы data
    let dataPromise = getData(totalData)
    dataPromise.then(result => {
      data_from_db.data = result
      console.log("data_from_db2")
      console.log(claimsContract);
      decision = makeTextDecision(
        dtpData,
        claimsContract,
        dtpParticipant,
        appToFo,
        paymentVoluntary,
        paymentFu,
        paymentCourt,
        fuExpertise,
        total_penalty_summ_accrued,
        total_penalty_summ_paid,
        max_summ,
        totalData,
        data_from_db);
        
        let ip = checkIP()
        ip.then(result => console.log("IP: " + result))
    })
  })
})

function fillHeader(length){
  var str_payment_dataled_header = '';
  var str_payment_dataled_header_1 = '';
  var str_payment_dataled_header_2 = '';
  for (var i = 0; i < length; i++) {
    str_payment_dataled_header_1 = str_payment_dataled_header_1 + '<th colspan="4" scope="col"><span id="COLUMN_NAME_3">' + COLUMN_NAME_8 + (i + 1) + '</span></th>'
    str_payment_dataled_header_2 = str_payment_dataled_header_2 +
    '<th scope="col"><span id="COLUMN_NAME_4">' + COLUMN_NAME_4 + '</span></th>' +
    '<th scope="col"><span id="COLUMN_NAME_5">' + COLUMN_NAME_5 + '</span></th>' +
    '<th scope="col"><span id="COLUMN_NAME_6">' + COLUMN_NAME_6 + '</span></th>' +
    '<th scope="col"><span id="COLUMN_NAME_7">' + COLUMN_NAME_7 + '</span></th>';
  }
  str_payment_dataled_header = '<tr align="center" class="table-bordered">' +
    '<th rowspan="2" scope="col" style="vertical-align: middle;"><span id="COLUMN_NAME_0">' + COLUMN_NAME_0 + '</span></th>' +
    '<th rowspan="2" scope="col" style="vertical-align: middle;"><span id="COLUMN_NAME_1">' + COLUMN_NAME_1 + '</span></th>' +
    '<th rowspan="2" scope="col" style="vertical-align: middle;"><span id="COLUMN_NAME_3">' + COLUMN_NAME_3 + '</span></th>' +
    str_payment_dataled_header_1 +
  '</tr>' +
  '<tr align="center" class="table-bordered">' +
    str_payment_dataled_header_2 +
  '</tr>';
  //Выведение заголовка таблицы на экран
  $('#str_payment_dataled_header').append(str_payment_dataled_header);
}

//Форматирование даты
$('.datepicker-here').toArray().forEach(function(field){
  new Cleave(field, {
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y']
  })
});

//Форматирование суммы
$('.input-numeral').toArray().forEach(function(field){
  new Cleave(field, {
      numeral: true,
      delimiter: ' ',
      //numeralThousandsGroupStyle: 'none',
      numeralPositiveOnly: true,
      numeralIntegerScale: 8
  })
});

//Форматирование ИНН ФО
$('.inn').toArray().forEach(function(field){
  new Cleave(field, {
      numeral: true,
      numeralThousandsGroupStyle: 'none',
      numeralPositiveOnly: true,
      numeralIntegerScale: 10
  })
});

//Форматирование номера решения ФУ
// $('.input-number-fu').toArray().forEach(function(field){
//   new Cleave(field, {
//       prefix: 'У-'
//   })
// });

//Функция добавление всплывающей подсказки 20-й и 21-й дни
$(function () { $('[data-toggle="tooltip"]').tooltip(); })

//Показать текст решения ФУ
document.getElementById('show_decision').onclick = function show_decision(){
  if ($('#show_decision').html() == "Показать текст решения") {
    $('#decision').show();
    $('#show_decision').html("Скрыть текст решения");
    // try {
      // decision = makeTextDecision(claimsContract,
      //                             dtpParticipant,
      //                             appToFo,
      //                             paymentVoluntary,
      //                             paymentFu,
      //                             paymentCourt,
      //                             fuExpertise,
      //                             total_penalty_summ_accrued,
      //                             total_penalty_summ_paid,
      //                             max_summ,
      //                             totalData,
      //                             data_from_db);
    // } catch (error) {
    //   alert("Ошибка в коде, позвоните Анатолию!")
    // }
    
    
    decision = decision.replace("ОСАГО", "обязательного страхования гражданской ответственности владельцев транспортных средств (далее – ОСАГО)")
    decision = decision.replace("Закона № 40-ФЗ", "Федерального закона от 25.04.2002 № 40-ФЗ «Об обязательном страховании гражданской ответственности владельцев транспортных средств» (далее – Закон № 40-ФЗ)")
    decision = decision.replace("Закона № 123-ФЗ", "Федерального закона от 04.06.2018 № 123-ФЗ «Об уполномоченном по правам потребителей финансовых услуг» (далее – Закон № 123-ФЗ)")
    decision = decision.replace("Законом № 123-ФЗ", "Федеральным законом от 04.06.2018 № 123-ФЗ «Об уполномоченном по правам потребителей финансовых услуг» (далее – Закон № 123-ФЗ)")
    decision = decision.replace("ГК РФ", "Гражданского кодекса Российской Федерации (далее – ГК РФ)")
    decision = decision.replace("Постановления Пленума ВС РФ № 58", "Постановления Пленума Верховного Суда Российской Федерации от 26.12.2017 № 58 «О применении судами законодательства об обязательном страховании гражданской ответственности владельцев транспортных средств» (далее – Постановление Пленума ВС РФ № 58)")
    decision = decision.replace("Постановления Пленума ВС РФ № 31", "Постановления Пленума Верховного Суда Российской Федерации от 08.11.2022 № 31 «О применении судами законодательства об обязательном страховании гражданской ответственности владельцев транспортных средств» (далее – Постановление Пленума ВС РФ № 31)")

    while (decision.indexOf("  ") != -1) {
      decision = decision.replaceAll("  ", " ")
    }

    document.querySelector('#decision').innerHTML = decision;
    // $('#decision_text_text_area').show();
    // document.querySelector('#decision_text_text_area').value = decision;
    selectText('decision');
  } else {
    $('#decision').hide();
    // $('#decision_text_text_area').hide();
    $('#show_decision').html("Показать текст решения");
  }
  dragAndDrop()
}

//Отслеживает нажатие кнопки "Копировать текст решения"
// document.getElementById('copy_text_decision').onclick = function (){
//   copy_text_decision('decision')
// }

//Отслеживает нажатие кнопки "Сформировать файл решения"
document.getElementById('make_decision_file').onclick = function (){

  if (document.querySelector('#decision').innerHTML == "") {

    // try {
      // decision = makeTextDecision(claimsContract,
      //                             dtpParticipant,
      //                             appToFo,
      //                             paymentVoluntary,
      //                             paymentFu,
      //                             paymentCourt,
      //                             fuExpertise,
      //                             total_penalty_summ_accrued,
      //                             total_penalty_summ_paid,
      //                             max_summ,
      //                             totalData,
      //                             data_from_db);
    // } catch (error) {
    //   alert("Ошибка в коде, позвоните Анатолию!")
    // }
    
    decision = decision.replace("ОСАГО", "обязательного страхования гражданской ответственности владельцев транспортных средств (далее – ОСАГО)")
    decision = decision.replace("Закона № 40-ФЗ", "Федерального закона от 25.04.2002 № 40-ФЗ «Об обязательном страховании гражданской ответственности владельцев транспортных средств» (далее – Закон № 40-ФЗ)")
    decision = decision.replace("Закона № 123-ФЗ", "Федерального закона от 04.06.2018 № 123-ФЗ «Об уполномоченном по правам потребителей финансовых услуг» (далее – Закон № 123-ФЗ)")
    decision = decision.replace("Законом № 123-ФЗ", "Федеральным законом от 04.06.2018 № 123-ФЗ «Об уполномоченном по правам потребителей финансовых услуг» (далее – Закон № 123-ФЗ)")
    decision = decision.replace("ГК РФ", "Гражданского кодекса Российской Федерации (далее – ГК РФ)")
    decision = decision.replace("Постановления Пленума ВС РФ № 58", "Постановления Пленума Верховного Суда Российской Федерации от 26.12.2017 № 58 «О применении судами законодательства об обязательном страховании гражданской ответственности владельцев транспортных средств» (далее – Постановление Пленума ВС РФ № 58)")
    decision = decision.replace("Постановления Пленума ВС РФ № 31", "Постановления Пленума Верховного Суда Российской Федерации от 08.11.2022 № 31 «О применении судами законодательства об обязательном страховании гражданской ответственности владельцев транспортных средств» (далее – Постановление Пленума ВС РФ № 31)")
    
    while (decision.indexOf("  ") != -1) {
      decision = decision.replaceAll("  ", " ")
    }

    document.querySelector('#decision').innerHTML = decision;
  }

  let decision_paragraphs = []

  $(`#decision`).find('p').each(function(index){
    decision_paragraphs[index] = $(this).text()
  })

  iziToast.show({
    timeout: 3000,
    messageColor: 'white',
    color: '#17a2b8',
    //title: 'Hey',
    message: 'Файл решения сгенерирован',
  });

  makeDecisionFile($('#appeal_number').val(), decision_paragraphs)

}

//Показать график неустоек
document.getElementById('show_graph').onclick = function show_graph(){
  if ($('#show_graph').html() == "Показать график неустоек") {
    $('#div_svg').show();
    $('#show_graph').html("Скрыть график неустоек");
      fillPenaltyGraph(swg_graph,
                       max_days_delay,
                       count_days,
                       penalty_day,
                       count_vol_days,
                       payment_vol_types,
                       payment_vol_summs,
                       count_fu_days,
                       payment_fu_summs,
                       payment_fu_types,
                       count_court_days,
                       payment_court_summs,
                       payment_court_types,
                       fu_claim_set,
                       date_sv,
                       paymentVoluntary,
                       paymentFu,
                       paymentCourt);
    iziToast.show({
      timeout: 3000,
      messageColor: 'white',
      color: '#28a745',
      message: 'График неустоек отображен',
    })
  } else {
    $('#div_svg').hide();
    $('#show_graph').html("Показать график неустоек");
  }
}

document.getElementById('close_modal').onclick = function (){
  $('#div_svg').hide();
  $('#show_graph').html("Показать график неустоек");
  $('#decision').hide();
  $('#show_decision').html("Показать текст решения");
  $('#check_list_div').hide();
  $('#check_list').html("Показать чек-лист");
}

//Скрыть все разделы модуля при закрытии модуля
$('#exampleModal').on('hidden.bs.modal', function (event) {
  $('#div_svg').hide();
  $('#show_graph').html("Показать график неустоек");
  $('#decision').hide();
  $('#show_decision').html("Показать текст решения");
  $('#check_list_div').hide();
  $('#check_list').html("Показать чек-лист");
  $('#check_list_div .collapse').collapse('hide')
})

//Анализ решения ФУ (в работе)
document.getElementById('btn_fu_decision_analyze').onclick = function (){
    let files = document.getElementById("fu_decision_file").files;
    decision_check(files);
}

//Написание имени файла
$('#fu_motive_file').change(() => {
  let file = $('#fu_motive_file')[0].files[0];
  $('#fu_motive_file').next().text(file.name)
})

//Загрузка таблицы с мотивировками в базу
document.getElementById('btn_fu_motive_download').onclick = function (){
  let file = document.getElementById("fu_motive_file").files[0];
  if (file) {
    let something = prompt('Введите пароль для загрузки файла', '');
    if (something == "sodfu2019") {
      let fileReader = new FileReader()
      fileReader.readAsBinaryString(file)
      fileReader.onload = (event) => {
        let data = event.target.result
        motive_download(data)
        alert("Данные успешно загружены")
      }
    } else {
      alert("Пароль указан неверно!")
    }
  } else {
    alert("Необходимо выбрать файл для загрузки")
  }
}

//Показать таблицу с мотивировками
document.getElementById('btn_fu_show_motivations').onclick = function (){
  show_motivations()
}

//Показать таблицу с абзацами
document.getElementById('btn_fu_show_data').onclick = function (){
  show_data()
}

//Удаление таблицы с мотивировками из базы
document.getElementById('btn_fu_motive_delete').onclick = function (){
  let something = prompt('Введите пароль для удаления базы данных', '');
  if (something == "sodfu2019") {
    motive_delete()
  } else {
    alert("Пароль указан неверно!")
  }
  
}

//Выбор и копирование текста в буфер обмена
function copy_text_decision(containerid) {

  let decision_paragraphs = []

  $(`#${containerid}`).find('p').each(function(index){
    decision_paragraphs[index] = $(this).text()
  })

  let full_text_decision = ""
  for (let i = 0; i < decision_paragraphs.length; i++) {
    full_text_decision = `${full_text_decision} ${decision_paragraphs[i]} \r\n`
  }

  navigator.clipboard.writeText(full_text_decision)

  iziToast.show({
    timeout: 3000,
    messageColor: 'white',
    color: '#007bff',
    //title: 'Hey',
    message: 'Текст решения скопирован c учетом изменений',
  });
}

//Выбор и копирование текста в буфер обмена
function selectText(containerid) {
  if (document.selection) { // IE
    range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select();
  } else if (window.getSelection) {
    range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
  document.execCommand('copy');

  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else { // старый IE
    document.selection.empty();
  }

  iziToast.show({
      timeout: 3000,
      color: '#ffc107',
      //title: 'Hey',
      message: 'Текст решения скопирован',
  });
}

//Автопоиск наименований ФО
var fo = []
fo_data.fo_data.forEach(element => {
  fo.push(element.fo_name)
});

$('.autocomplete input').toArray().forEach(element => {
  autocomplete(element, fo)
});

//Автозаполнение данных в формах из базы данных (из таблицы preambulaData)
// $('#appeal_number').focusout(function(){
//   let data = {
//     data : $(this).val()
//   }
//   appDataToJSON(data)
// })

//Автопоиск марок ТС
var car_brands = []
car_brands = Object.keys(allCars)
$('.car_brands').toArray().forEach(element => {
  autocomplete(element, car_brands)
})

//Автопоиск моделей ТС
var car_models = []
$('.car_brands').focusout(function () {
  car_models = allCars[$(this).val()]
  $('.car_models').toArray().forEach(element => {
    autocomplete(element, car_models)
  })
})

//Заменяет кавычки "палочки" на кавычки «елочки»
$(document).on( "mouseenter", '.li-quotes', function( event ) {
  $('.li-quotes').focusout(function () {
    $(this).val(changeQuotes($(this).val()))
  })
})

//По клику на любую клавишу вызов функции автозаполнения
$(document).on("click", "button", function (event) {
  $('.autocomplete input').toArray().forEach(element => {
    autocomplete(element, fo)
  });
  $('.car_brands').toArray().forEach(element => {
    autocomplete(element, car_brands)
  })
  $('.car_brands').focusout(function () {
    car_models = allCars[$(this).val()]
    $('.car_models').toArray().forEach(element => {
      autocomplete(element, car_models)
    })
  })
})

//Увеличивает картинку-пример документа
$(document).on( "click", '.popover img', function( event ) {
  console.log($(this)[0].src)
  $("#module_for_img").append(`
    <div id="myModal" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img src="${$(this)[0].src}" width=100% />
          </div>
        </div>
      </div>
    </div>
  `)
  $('#myModal').modal('show')
  $('#myModal').on('hidden.bs.modal', function (e) {
    $("#myModal").remove();
    console.log("modal removed");
})
})

//Изменение галочки европротокол (выведение страховой суммы)
$('#europrotocol').change(function() {
  //Расчет страховой суммы
  europrotocol = document.querySelector('#europrotocol').checked;
  date_dtp = document.querySelector('#date_dtp').value;
  date_dtp = changeDateType(date_dtp);
  date_dtp = Date.parse(date_dtp + 'T00:00:00');

  if (date_dtp >= DATE_EURO_START && europrotocol) { // Если дата ДТП после 01.06.2018 И Европротокол
    max_summ = 100000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 100 000₽";
  } else if (date_dtp >= DATE_EURO_START && !europrotocol){ // Если дата ДТП после 01.06.2018 И НЕ Европротокол
    max_summ = 400000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  } else if (date_dtp < DATE_EURO_START && europrotocol) { // Если дата ДТП до 01.06.2018 И Европротокол
    max_summ = 50000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 50 000₽";
  } else if (date_dtp < DATE_EURO_START && !europrotocol) { // Если дата ДТП до 01.06.2018 И НЕ Европротокол
    max_summ = 400000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  } else if (europrotocol) { //Если Европротокол (без указания даты)
    max_summ = 100000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 100 000₽";
  } else { // остальные случаи
    max_summ = 400000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  }
})

//Потеря фокуса даты ДТП (выведение страховой суммы)
$('#date_dtp').focusout(function() {
  //Расчет страховой суммы
  europrotocol = document.querySelector('#europrotocol').checked;
  date_dtp = document.querySelector('#date_dtp').value;
  date_dtp = changeDateType(date_dtp);
  date_dtp = Date.parse(date_dtp + 'T00:00:00');

  if (date_dtp >= DATE_EURO_START && europrotocol) { // Если дата ДТП после 01.06.2018 И Европротокол
    max_summ = 100000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 100 000₽";
  } else if (date_dtp >= DATE_EURO_START && !europrotocol){ // Если дата ДТП после 01.06.2018 И НЕ Европротокол
    max_summ = 400000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  } else if (date_dtp < DATE_EURO_START && europrotocol) { // Если дата ДТП до 01.06.2018 И Европротокол
    max_summ = 50000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 50 000₽";
  } else if (date_dtp < DATE_EURO_START && !europrotocol) { // Если дата ДТП до 01.06.2018 И НЕ Европротокол
    max_summ = 400000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  } else if (europrotocol) { //Если Европротокол (без указания даты)
    max_summ = 100000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 100 000₽";
  } else { // остальные случаи
    max_summ = 400000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  }
})

//Деактивирует формы с деактиватором
$(document).on("click", ".deactivator", function (event) {
  if ($(this).prop('checked')) {
    $(this).parent().parent().parent().find('.deactivation').attr('disabled', true)
    $(this).parent().parent().parent().find('.deactivation').val('')
  } else {
    $(this).parent().parent().parent().find('.deactivation').attr('disabled', false)
  }
})

//Изменяет картинку валидации
function validationCheck(className) {
  $(`.${className} .form-control`).focusout(function(){
    validationCheckUpdate(className)
  })
}

//Обновлет сведения о валидации инпутов
function validationCheckUpdate(className) {
  setTimeout(() => {
    var isOk = true
    $(`.${className} .form-control`).each(function() {
      if ($(this).css('border-color') == 'rgb(220, 53, 69)') {
        isOk = false
      }
    })
    if (isOk) {
      $(`#${className}`).children().first().children().first().children().first().next().html(`<i class="fa fa-check-square-o fa-2x" aria-hidden="true" style="color: #28a745;"></i>`)
    } else {
      $(`#${className}`).children().first().children().first().children().first().next().html(`<i class="fa fa-exclamation-circle fa-2x" aria-hidden="true" style="color: #dc3545;"></i>`)
    }
  }, 300); 
}

$(document).on( "mouseenter", '[data-toggle="popover"]', function( event ) {
  $(this).css("cursor", "pointer")
  allPopovers.popovers.forEach(element => {
    if ($(this).parent().parent().prev().hasClass(`${element.type}`)) {
      $(function () {
          $(`.${element.type} + small [data-toggle="popover"]`).popover({
          html: true,
          title: element.title,
          content: function () {
              return element.content()
          },
        })
      })
    }
  })
});

$(document).on("click", "input[type=checkbox]", function (event) {
  validationCheckUpdate('preambula')
  validationCheckUpdate('main-claims-all')
  validationCheckUpdate('main-request')
  validationCheckUpdate('dtp-description')
  validationCheckUpdate('apps-to-fo')
  validationCheckUpdate('fus-all')
  validationCheckUpdate('courts-all')
  validationCheckUpdate('fu-expertise-all')
})

$(document).on("click", "button", function (event) {
  validationCheckUpdate('preambula')
  validationCheckUpdate('main-claims-all')
  validationCheckUpdate('main-request')
  validationCheckUpdate('dtp-description')
  validationCheckUpdate('apps-to-fo')
  validationCheckUpdate('fus-all')
  validationCheckUpdate('courts-all')
  validationCheckUpdate('fu-expertise-all')
})

$(document).on("change", "select", function (event) {
  validationCheckUpdate('preambula')
  validationCheckUpdate('main-claims-all')
  validationCheckUpdate('main-request')
  validationCheckUpdate('dtp-description')
  validationCheckUpdate('apps-to-fo')
  validationCheckUpdate('fus-all')
  validationCheckUpdate('courts-all')
  validationCheckUpdate('fu-expertise-all')
})

$(document).on( "mouseenter", '.form-control', function( event ) {
  validationCheck('preambula')
  validationCheck('main-claims-all')
  validationCheck('main-request')
  validationCheck('dtp-description')
  validationCheck('apps-to-fo')
  validationCheck('fus-all')
  validationCheck('courts-all')
  validationCheck('fu-expertise-all')
})