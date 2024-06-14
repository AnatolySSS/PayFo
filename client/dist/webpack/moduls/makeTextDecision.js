import { holly_boolen } from './findLastDay.js';
import { makeRubText_nominative } from './makeRubText_nominative.js';
import { declinationDays } from './declinationDays.js';
import { declensions_by_cases } from './declensions_by_cases.js';
import { inclineFirstname, inclineLastname, inclineMiddlename, getLastnameGender } from 'lvovich';
import { formatDate } from './formatDate';
import { changeDateType } from './changeDateType.js';
import { DATE_FZ_123_START } from "./variables";
import { osagoPenaltyParagraph } from "./motivations/osago/osagoPenalty";
import { osagoSurchargeSV } from "./motivations/osago/osagoSurchargeSV";
import { osagoRefusalSvTrasa } from "./motivations/osago/osagoRefusalSvTrasa";
import { make_motivation_paragraph } from "./motivations/motivation";
import { make_resulative_paragraph } from "./motivations/resulative";
import { fu_data } from './objects/fuData'

export var all_paragraphs =[]

// Формирование текста решения ФУ
export function makeTextDecision(dtpData,
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
                                 data_from_db) {

  var fo_name;
  var fo_inn, fo_ogrn, fo_registration_date, fo_registration_address, fo_post_address;
  var app_name, app_passport, app_inn, app_registration_date, app_registration_address, app_post_address;
  var fo_name_nominative;
  var fo_name_genitive;
  var fo_name_accusative;
  var fo_name_instrumental;
  let motivation_part = {}
  let resulative_part = ""
  var make_a_payment, fulfill, keep;
  // var osago_penalty_paragraph = {}
  var osago_surcharge_sv = ""
  var osago_refusal_sv_trasa = ""
  var main_claims_all_paragraph = "";
  var court_set = new Set();
  court_set.clear();
  court_set.add(1); //Добавляестя для того, чтобы первая строка не разбивалась на символы

  //ФОРМИРОВАНИЕ ПРЕАМБУЛЫ РЕШЕНИЯ
  //Получение значения наименования ФО
  fo_name = document.querySelector("#fo_name").value;
  fo_name_nominative = "Финансовая организация";
  fo_name_genitive = "Финансовой организации";
  fo_name_accusative = "Финансовую организацию";
  fo_name_instrumental = "Финансовой организацией";
  make_a_payment = " осуществила";
  fulfill = " исполнила";
  keep = " удержала";

  fo_inn = document.querySelector("#fo_inn").value;
  fo_registration_date = document.querySelector("#fo_registration_date").value;
  fo_registration_date = Date.parse(changeDateType(fo_registration_date) + 'T00:00:00')
  fo_registration_date = formatDate(new Date(fo_registration_date));
  fo_registration_address = document.querySelector("#fo_registration_address").value;
  fo_post_address = document.querySelector("#fo_post_address").value;

  app_name = ""
  var app_helper = ""
  switch (document.querySelector("#app_type").value) {
    case "ФЛ":
      app_name = document.querySelector("#app_name").value

      if (app_name != "") {
        var app_name_nominative = app_name
        var app_firstName = app_name.split(" ")[1]
        var app_middleName = app_name.split(" ")[2]
        var app_lastName = app_name.split(" ")[0]
        app_name = `
          ${ (typeof app_lastName != "undefined") ? inclineLastname(app_lastName, 'genitive') : app_lastName = ""} 
          ${ (typeof app_firstName != "undefined") ? inclineFirstname(app_firstName, 'genitive') : app_firstName = ""} 
          ${ (typeof app_middleName != "undefined") ? inclineMiddlename(app_middleName, 'genitive') : app_middleName = ""}
        `
      }
      
      app_passport = document.querySelector("#app_passport").value;
      app_passport = `серии ${app_passport.split(' ')[0]} № ${app_passport.split(' ')[1]}`
      app_registration_address = document.querySelector("#app_registration_address").value;
      app_post_address = document.querySelector("#app_post_address").value;
      app_helper = `${app_name} (паспорт ${app_passport}; 
        место жительства: ${app_registration_address}; почтовый адрес: ${app_post_address})`
      break

    case "ИП":
      app_name = document.querySelector("#app_name_ip").value

      if (app_name != "") {
        var app_name_nominative = app_name
        var app_firstName = app_name.split(" ")[1]
        var app_middleName = app_name.split(" ")[2]
        var app_lastName = app_name.split(" ")[0]
        app_name = `
          ${ (typeof app_lastName != "undefined") ? inclineLastname(app_lastName, 'genitive') : app_lastName = ""} 
          ${ (typeof app_firstName != "undefined") ? inclineFirstname(app_firstName, 'genitive') : app_firstName = ""} 
          ${ (typeof app_middleName != "undefined") ? inclineMiddlename(app_middleName, 'genitive') : app_middleName = ""}
        `
        app_name = "ИП " + app_name
      }
      
      app_inn = document.querySelector("#app_inn_ip").value;
      app_registration_date = document.querySelector("#app_registration_date_ip").value;
      app_registration_address = document.querySelector("#app_registration_address_ip").value;
      app_post_address = document.querySelector("#app_post_address_ip").value;
      app_helper = `${app_name} (место нахождения: ${app_registration_address}; почтовый адрес: ${app_post_address}; 
        дата государственной регистрации: ${app_registration_date}; 
        идентификационный номер налогоплательщика: ${app_inn})`
      break
      break

    case "ЮЛ":
      app_name = document.querySelector("#app_name_ul").value
      app_inn = document.querySelector("#app_inn_ul").value;
      app_registration_date = document.querySelector("#app_registration_date_ul").value;
      app_registration_address = document.querySelector("#app_registration_address_ul").value;
      app_post_address = document.querySelector("#app_post_address_ul").value;
      app_helper = `${app_name} (место нахождения: ${app_registration_address}; почтовый адрес: ${app_post_address}; 
        дата государственной регистрации: ${app_registration_date}; 
        идентификационный номер налогоплательщика: ${app_inn})`
      break
      break
    
    default:
      break
  }
  
  var fu_name
  var fu_post
  var date_appeal = document.querySelector("#date_appeal").value;
  date_appeal = Date.parse(changeDateType(date_appeal) + 'T00:00:00')
  date_appeal = formatDate(new Date(date_appeal));
  var appeal_number = document.querySelector("#appeal_number").value;

  fu_data.fu_data.forEach(element => {
    if (document.querySelector("#fu_name").value == element.fu_name_select) {
      fu_name = element.fu_name
      fu_post = element.fu_post
    }
  })

  var installed = ""
  var preambula = ""
  //В случае заполнения всех необходимых полей формируется абзац преамбулы
  if ($('#preambula .fa-2x').css('color') == 'rgb(40, 167, 69)') {
    installed = "<p class='text-center'><b>УСТАНОВИЛ:</b></p>"
    preambula = `<p>${fu_post} ${fu_name} (далее – Финансовый уполномоченный) по результатам рассмотрения обращения от 
                  ${date_appeal} № ${appeal_number} (далее – Обращение) ${app_helper} 
                  (далее – Заявитель) в отношении ${fo_name} (место нахождения: ${fo_registration_address}; 
                  почтовый адрес: ${fo_post_address}; дата государственной регистрации: ${fo_registration_date}; 
                  идентификационный номер налогоплательщика: ${fo_inn}) (далее – Финансовая организация)</p>`

    preambula = preambula.replaceAll("\r\n", "")
    preambula = preambula.replaceAll("\r", "")
    preambula = preambula.replaceAll("\n", "")
    preambula = `${preambula}${installed}`
  }

  //Создание таблицы с логотипом
  let table_fu = ""
  if (preambula != "") {
    table_fu = `<table class="table table-borderless">
                <tr align="center">
                  <td colspan="2">
                    <img src="./img/logo_empty.png">
                    <br><br>
                    <h5><b>СЛУЖБА ФИНАНСОВОГО УПОЛНОМОЧЕННОГО</b></h5>
                    <h5><b>Р Е Ш Е Н И Е</b></h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    «_____» _______________20____ г.
                    <br>
                    дата подписания
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                      №<br>
                      г. Москва
                  </td>
                  <td></td>
                </tr>
              <table>
              <br>`
  }

  // ФОРМИРОВАНИЕ АБЗАЦА С ТРЕБОВАНИЯМИ К ФУ
  for (var i = 0; i < claimsContract.length; i++) {
    main_claims_all_paragraph = main_claims_all_paragraph + claimsContract[i].claims_all
  }

  //Обрезание последней запятой
  main_claims_all_paragraph = main_claims_all_paragraph.slice(0, -1)

  //Получение количества заявленных требований
  let claim_helper = ""
  let number_of_claims = $('.main_claims').length
  if (number_of_claims > 1) {
    claim_helper = "требованиями"
  } else {
    claim_helper = "требованием"
  }

  var main_claims_paragraf = ""
  //В случае заполнения всех необходимых полей формируется абзац с требованиями к ФУ
  if ($('#main-claims-all .fa-2x').css('color') == 'rgb(40, 167, 69)') {
    main_claims_paragraf = `<p>Финансовому уполномоченному на рассмотрение поступило Обращение в отношении ${fo_name_genitive} 
    с ${claim_helper} ${main_claims_all_paragraph}.</p>`
  }

  main_claims_paragraf = main_claims_paragraf.replaceAll("\r\n", "")
  main_claims_paragraf = main_claims_paragraf.replaceAll("\r", "")
  main_claims_paragraf = main_claims_paragraf.replaceAll("\n", "")

  //ФОРМИРОВАНИЕ АБЗАЦА С ЗАПРОСОМ В АДРЕС ФО
  var date_main_request = document.querySelector("#date_main_request").value;
  date_main_request = Date.parse(changeDateType(date_main_request) + 'T00:00:00')
  date_main_request = formatDate(new Date(date_main_request));
  var number_main_request = document.querySelector("#number_main_request").value;

  var main_answer_type = document.querySelector("#main_answer_type").options.selectedIndex
  var date_main_answer = document.querySelector("#date_main_answer").value
  date_main_answer = Date.parse(changeDateType(date_main_answer) + 'T00:00:00')
  date_main_answer = formatDate(new Date(date_main_answer))
  var number_main_answer = document.querySelector("#number_main_answer").value

  var main_answer_helper = ""
  if (date_main_answer != "NaN.NaN.NaN" && number_main_answer != "") {
    main_answer_helper = ` письмом от ${date_main_answer} № ${number_main_answer}`
  } else if (date_main_answer != "NaN.NaN.NaN" && number_main_answer == "") {
    main_answer_helper = ` письмом от ${date_main_answer}`
  } else if (date_main_answer == "NaN.NaN.NaN" && number_main_answer != "") {
    main_answer_helper = ` письмом № ${number_main_answer}`
  }
  var main_answer = ""
  if (main_answer_type == 1) {
    main_answer = `${fo_name_instrumental}${main_answer_helper} запрошенные сведения и документы предоставлены`
  } else {
    main_answer = `${fo_name_instrumental} запрошенные сведения и документы не предоставлены`
  }

  var main_request_paragraph = ""
  var transitional_to_description_paragraph = ""
  //В случае заполнения всех необходимых полей формируется абзац с запросом в ФО
  if ($('#main-request .fa-2x').css('color') == 'rgb(40, 167, 69)') {
    main_request_paragraph = `<p>В рамках рассмотрения Обращения в адрес ${fo_name_genitive} направлено уведомление о принятии 
    Обращения к рассмотрению от ${date_main_request} № ${number_main_request}, содержащее требование о предоставлении 
    сведений и документов по предмету спора, указанному в Обращении.</p>
    <p>${main_answer}.</p>`

    transitional_to_description_paragraph = `<p>Рассмотрев имеющиеся в деле документы, Финансовый уполномоченный установил следующее.</p>`
  }

  main_request_paragraph = main_request_paragraph.replaceAll("\r\n", "")
  main_request_paragraph = main_request_paragraph.replaceAll("\r", "")
  main_request_paragraph = main_request_paragraph.replaceAll("\n", "")



  //ФОРМИРОВАНИЕ АБЗАЦА С ОПИСАНИЕМ ДТП
  var date_dtp = document.querySelector('#date_dtp').value;
  date_dtp = changeDateType(date_dtp);
  date_dtp = Date.parse(date_dtp + 'T00:00:00');
  var date_dtp_formatted = formatDate(new Date(date_dtp));
  var dtp_description_paragraph = ""
  var all_innocent_participants = ""
  var contracts_except_app = ""
  var app_driver_name = ""
  var administrative_documents_parahraph = ""
  var all_innocent_participants_names = ""

  //Если один участник ДТП
  if (dtpParticipant.length == 1) {
  
  //Если участников двое
  } else if (dtpParticipant.length == 2) {

    //Если Заявитель не является виновником, а второй участник виновник
    if (dtpParticipant[0].is_guilty.options.selectedIndex == 2 &&
        dtpParticipant[1].is_guilty.options.selectedIndex == 1) {
      //Фомрирование абзаца с описанием ДТП
      dtp_description_paragraph = `<p>В результате дорожно-транспортного происшествия, произошедшего ${date_dtp_formatted} 
      (далее – ДТП) вследствие действий ${dtpParticipant[1].driver_name_genitive}, ${dtpParticipant[1].driver_declination} 
      транспортным средством ${dtpParticipant[1].full_car_name}, был причинен ущерб принадлежащему Заявителю 
      транспортному средству ${dtpParticipant[0].full_car_name}.</p>`
    
    //Если оба участника виновники
    } else if (dtpParticipant[0].is_guilty.options.selectedIndex == 1 &&
      dtpParticipant[1].is_guilty.options.selectedIndex == 1) {
    
    //Если вина обоих участников не установлена
    } else if (dtpParticipant[0].is_guilty.options.selectedIndex == 3 &&
      dtpParticipant[1].is_guilty.options.selectedIndex == 3) {
        //Присвоение значения для водителя ТС Заявителя
        if (app_name_nominative.split(" ")[0] == dtpParticipant[0].driver_name.value.split(" ")[0]) {
          app_driver_name = `Заявителя`
        } else {
          app_driver_name = dtpParticipant[0].driver_name_genitive
        }
        //Фомрирование абзаца с описанием ДТП
        dtp_description_paragraph = `<p>${date_dtp_formatted} произошло дорожно-транспортного происшествия (далее – ДТП), 
        с участием транспортного средства ${dtpParticipant[1].full_car_name}, под управлением 
        ${dtpParticipant[1].driver_name_genitive} и транспортного средства ${dtpParticipant[1].full_car_name} 
        (далее – Транспортное средство), принадлежащего Заявителю на праве собственности, под управлением 
        ${app_driver_name}, в результате которого Транспортному средству был причинен ущерб.</p>
        <p>Документов, подтверждающих наличие вины в ДТП ${app_driver_name} и ${dtpParticipant[1].driver_name_genitive} 
        Финансовому уполномоченному не предоставлено.</p>`
    }
  //Если участников больше чем двое
  } else if (dtpParticipant.length > 2) {
    //Определение количества виновников, невиновных и участников с неустановленной степенью вины
    var dpt_number_of_culpits = 0
    var dpt_number_of_innocents = 0
    var dpt_number_of_fault_not_established = 0
    var dtp_culpit_one_number

    for (let i = 0; i < dtpParticipant.length; i++) {
      switch (dtpParticipant[i].is_guilty.options.selectedIndex) {
        case 1:
          dpt_number_of_culpits++
          break;
        case 2:
          dpt_number_of_innocents++
          break;
        case 3:
          dpt_number_of_fault_not_established++
          break;
        default:
          break;
      }
    }

    //Если Заявитель не является виновником ДТП
    if (dtpParticipant[0].is_guilty.options.selectedIndex == 2) {
      //Если виновник в ДТП только один
      if (dpt_number_of_culpits == 1) {
        //Определение виновника ДТП (за исключением Заявителя, т.к. он не является виновником в данной ветке)
        for (let i = 1; i < dtpParticipant.length; i++) {
          if (dtpParticipant[i].is_guilty.options.selectedIndex == 1) {
            dtp_culpit_one_number = i
          } else {
            all_innocent_participants = `${all_innocent_participants} транспортного средства
            ${dtpParticipant[i].full_car_name}, под управлением ${dtpParticipant[i].driver_name_genitive},`
          }
        }
        //Фомрирование абзаца с описанием ДТП
        dtp_description_paragraph = `<p>В результате дорожно-транспортного происшествия, произошедшего ${date_dtp_formatted} 
        (далее – ДТП), вследствие действий ${dtpParticipant[dtp_culpit_one_number].driver_name_genitive}, 
        ${dtpParticipant[1].driver_declination} транспортным средством ${dtpParticipant[dtp_culpit_one_number].full_car_name}, 
        с участием ${all_innocent_participants} был причинен ущерб принадлежащему Заявителю транспортному средству 
        ${dtpParticipant[0].full_car_name}.</p>`
      //Если виновников в ДТП не имеется
      } else if (dpt_number_of_culpits == 0) {
        //Присвоение значения для водителя ТС Заявителя
        if (app_name_nominative.split(" ")[0] == dtpParticipant[0].driver_name.value.split(" ")[0] ||
             dtpParticipant[0].driver_name.value == "") {
          app_driver_name = `Заявителя`
        } else {
          app_driver_name = dtpParticipant[0].driver_name_genitive
        }
        //Собирание абзаца с остальными участникам ДТП (кроме Заявителя)
        for (let i = 1; i < dtpParticipant.length; i++) {
          all_innocent_participants = `${all_innocent_participants} транспортного средства
          ${dtpParticipant[i].full_car_name}, под управлением ${dtpParticipant[i].driver_name_genitive},`

          all_innocent_participants_names = all_innocent_participants_names + `, ${dtpParticipant[i].driver_name_genitive}`
        }
        all_innocent_participants_names = all_innocent_participants_names.slice(0,
                                                                                all_innocent_participants_names.lastIndexOf(", ")) +
                                                                                " и " +
                                          all_innocent_participants_names.slice(all_innocent_participants_names.lastIndexOf(",") + 1)


        //Фомрирование абзаца об отсутствии документов, подтверждающих наличии вины участников ДТП 
        administrative_documents_parahraph = `<p>Документов, подтверждающих наличие вины в ДТП 
        ${app_driver_name}${all_innocent_participants_names} Финансовому уполномоченному не предоставлено.</p>`

        //Обрезание последней запятой
        all_innocent_participants = all_innocent_participants.slice(0, -1)
        
        //Фомрирование абзаца с описанием ДТП
        dtp_description_paragraph = `<p>${date_dtp_formatted} произошло дорожно-транспортного происшествия (далее – ДТП), с участием 
        ${all_innocent_participants} и транспортного средства ${dtpParticipant[0].full_car_name}, принадлежащего Заявителю 
        на праве собственности, под управлением ${app_driver_name}, в результате которого Транспортному средству был причинен ущерб.</p>
        ${administrative_documents_parahraph}`

        
      }
    } else {
      
    }
  }

  //Добавление абзаца с европротоколом
  var europrotocol = document.querySelector("#europrotocol")
  var europrotocol_paragraph = ""
  if (europrotocol.checked) {
    europrotocol_paragraph = `<p>ДТП было оформлено в соответствии с пунктом 1 статьи 11.1 Закона № 40-ФЗ 
    без участия уполномоченных на то сотрудников полиции.</p>`
  }
  dtp_description_paragraph = dtp_description_paragraph + europrotocol_paragraph

  for (let i = 1; i < dtpParticipant.length; i++) {
    contracts_except_app = contracts_except_app + dtpParticipant[i].contract_paragraph_all
  }

  //Добавление абзацев с договорами ОСАГО, КАСКО и ДСАГО
  var dtp_description_with_contracts_paragraph = ""
  //В случае заполнения всех необходимых полей формируется абзац с требованиями к ФУ
  if ($('#dtp-description .fa-2x').css('color') == 'rgb(40, 167, 69)') {
    dtp_description_with_contracts_paragraph = dtpParticipant[0].contract_paragraph_all + 
                                              dtp_description_paragraph +
                                              contracts_except_app
  }

  dtp_description_with_contracts_paragraph = dtp_description_with_contracts_paragraph.replaceAll("\r\n", "")
  dtp_description_with_contracts_paragraph = dtp_description_with_contracts_paragraph.replaceAll("\r", "")
  dtp_description_with_contracts_paragraph = dtp_description_with_contracts_paragraph.replaceAll("\n", "")

  //ФОРМИРОВАНИЕ АБЗАЦЕВ С ОБРАЩЕНИЯМИ В ФО
  var appToFo_paragraph_all = ""
  var appToFo_paragraph_no_claim_123 = `<p>Сведений о направлении Заявителем в адрес ${fo_name_genitive} заявления (претензии) 
  о досудебном урегулировании спора в порядке, установленным статьей 16 Закона № 123-ФЗ в материалах обращения не имеется.</p>`
  if ($('#apps-to-fo .fa-2x').css('color') == 'rgb(40, 167, 69)') {
    //Определение соблюден ли досудебный порядок
    for (let i = 1; i < appToFo.length; i++) {
      if (appToFo[i].getAppDate() >= DATE_FZ_123_START &&
          appToFo[i].type.options.selectedIndex == 2) {
            appToFo_paragraph_no_claim_123 = ""
      }
    }
    for (let i = 0; i < appToFo.length; i++) {
      appToFo_paragraph_all = appToFo_paragraph_all + appToFo[i].main_paragraph
    }
    appToFo_paragraph_all = appToFo_paragraph_all + appToFo_paragraph_no_claim_123
  }

  appToFo_paragraph_all = appToFo_paragraph_all.replaceAll("\r\n", "")
  appToFo_paragraph_all = appToFo_paragraph_all.replaceAll("\r", "")
  appToFo_paragraph_all = appToFo_paragraph_all.replaceAll("\n", "")

  //ФОРМИРОВАНИЕ АБЗАЦЕВ С РЕШЕНИЯМИ ФУ
  var payment_fu_paragraph_all = ""
  if ($('#fus_info').find(':selected').text() == "Сведения имеются") {
    if ($('#fus-all .fa-2x').css('color') == 'rgb(40, 167, 69)') {
      for (let i = 0; i < paymentFu.length; i++) {
        payment_fu_paragraph_all = payment_fu_paragraph_all + paymentFu[i].main_paragraph
      }
    }
  }

  payment_fu_paragraph_all = payment_fu_paragraph_all.replaceAll("\r\n", "")
  payment_fu_paragraph_all = payment_fu_paragraph_all.replaceAll("\r", "")
  payment_fu_paragraph_all = payment_fu_paragraph_all.replaceAll("\n", "")


  //ФОРМИРОВАНИЕ АБЗАЦЕВ С РЕШЕНИЯМИ СУДА
  var payment_court_paragraph_all = ""
  if ($('#courts_info').find(':selected').text() == "Сведения имеются") {
    if ($('#courts-all .fa-2x').css('color') == 'rgb(40, 167, 69)') {
      for (let i = 0; i < paymentCourt.length; i++) {
        payment_court_paragraph_all = payment_court_paragraph_all + paymentCourt[i].main_paragraph
      }
    }
  }

  payment_court_paragraph_all = payment_court_paragraph_all.replaceAll("\r\n", "")
  payment_court_paragraph_all = payment_court_paragraph_all.replaceAll("\r", "")
  payment_court_paragraph_all = payment_court_paragraph_all.replaceAll("\n", "")
  


  //Вызов функции формирования мотивировочной части решения ФУ
  motivation_part = make_motivation_paragraph(dtpData,
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
                                              data_from_db,
                                              totalData)

  let decision_name = ""
  if (motivation_part.result == "УДОВЛЕТВОРИТЬ") {
    decision_name = `<p class='text-center'><b>ОБ УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ</b></p>`
  } else if (motivation_part.result == "ОТКАЗАТЬ") {
    decision_name = `<p class='text-center'><b>ОБ ОТКАЗЕ В УДОВЛЕТВОРЕНИИ ТРЕБОВАНИЙ</b></p>`
  } else if (motivation_part.result == "ПРЕКРАТИТЬ") {
    decision_name = `<p class='text-center'><b>О ПРЕКРАЩЕНИИ РАССМОТРЕНИЯ ОБРАЩЕНИЯ</b></p>`
  }
  //Формирование мотивировочной части с неустойкой по ОСАГО
  //Перебор всех договоров, по которым заявлены требования
  // for (let i = 0; i < claimsContract.length; i++) {
  //   //Если есть требования по договору ОСАГО
  //   if (claimsContract[i].type.options.selectedIndex == 1) {
  //     // Перебор всех требований, заявленных в рамках договора ОСАГО
  //     for (let j = 0; j < claimsContract[i].claim.length; j++) {
  //       //Если среди заявленных требований есть требование о взыскании неустойки
  //       if (claimsContract[i].claim[j].type.options.selectedIndex == 5) {
  //         osago_penalty_paragraph = osagoPenaltyParagraph(paymentVoluntary,
  //           paymentFu,
  //           paymentCourt,
  //           total_penalty_summ_accrued,
  //           total_penalty_summ_paid,
  //           max_summ)
  //       }
  //     }
  //   }
  // }

  // osago_penalty_paragraph = osago_penalty_paragraph.replaceAll("\r\n", "")
  // osago_penalty_paragraph = osago_penalty_paragraph.replaceAll("\r", "")
  // osago_penalty_paragraph = osago_penalty_paragraph.replaceAll("\n", "")

  //Переход к мотивировочной части
  let transitional_to_motivation_paragraph = ""
  if (motivation_part.motivation_part != "") {
    transitional_to_motivation_paragraph = `<p>Рассмотрев представленные Заявителем и Финансовой организацией документы, Финансовый уполномоченный 
  приходит к следующим выводам.</p>`
  }
  
  transitional_to_motivation_paragraph = transitional_to_motivation_paragraph.replaceAll("\r\n", "")
  transitional_to_motivation_paragraph = transitional_to_motivation_paragraph.replaceAll("\r", "")
  transitional_to_motivation_paragraph = transitional_to_motivation_paragraph.replaceAll("\n", "")

  //Переход к резолютивной части
  let transitional_to_resulative_paragraph = ""
  if (motivation_part.result == "УДОВЛЕТВОРИТЬ") {
    transitional_to_resulative_paragraph = `<p>Руководствуясь статьей 22 Закона № 123-ФЗ, Финансовый уполномоченный</p>`
  } else if (motivation_part.result == "ОТКАЗАТЬ") {
    transitional_to_resulative_paragraph = `<p>Руководствуясь статьей 22 Закона № 123-ФЗ, Финансовый уполномоченный</p>`
  } else if (motivation_part.result == "ПРЕКРАТИТЬ") {
    transitional_to_resulative_paragraph = `<p>Руководствуясь пунктом 1 части 1 статьи 27 Закона № 123-ФЗ, Финансовый уполномоченный</p>`
  }
  
  transitional_to_resulative_paragraph = transitional_to_resulative_paragraph.replaceAll("\r\n", "")
  transitional_to_resulative_paragraph = transitional_to_resulative_paragraph.replaceAll("\r", "")
  transitional_to_resulative_paragraph = transitional_to_resulative_paragraph.replaceAll("\n", "")
  let decided = ""
  if (motivation_part.motivation_part != "") {
    decided = "<p class='text-center'><b>РЕШИЛ:</b></p>"
  }
  
  transitional_to_resulative_paragraph =  transitional_to_resulative_paragraph + decided

  if (motivation_part.motivation_part != "") {
    resulative_part = make_resulative_paragraph(total_penalty_summ_accrued,
                                                total_penalty_summ_paid,
                                                max_summ,
                                                totalData,
                                                data_from_db,
                                                motivation_part.result,
                                                motivation_part.all_found_claims,
                                                motivation_part.osago_penalty_paragraph.total_penalty_summ,
                                                app_name,
                                                main_claims_all_paragraph,
                                                paymentVoluntary,
                                                paymentFu,
                                                paymentCourt,
                                                fuExpertise,
                                                motivation_part.total_summ,)
  }
  
  let table_signing = ""
  let fu_name_table = ""
  fu_data.fu_data.forEach(element => {
    if (document.getElementById('fu_name').value == element.fu_name_select) {
      fu_name_table = element.fu_name
    }
  })
  if (resulative_part != "") {
    table_signing = `<br><br>
                      <table class="table table-borderless">
                        <tr>
                          <td>Финансовый уполномоченный</td>
                          <td></td>
                          <td align="right">${fu_name_table}</td>
                         </tr>
                       <table>`
  }

  //Формирование мотивировочной части с недоплатой по ОСАГО
  //Перебор всех договоров, по которым заявлены требования
  // for (let i = 0; i < claimsContract.length; i++) {
  //   //Если есть требования по договору ОСАГО
  //   if (claimsContract[i].type.options.selectedIndex == 1) {
  //     // Перебор всех требований, заявленных в рамках договора ОСАГО
  //     for (let j = 0; j < claimsContract[i].claim.length; j++) {
  //       //Если среди заявленных требований есть требование о взыскании страхового возмещения
  //       if (claimsContract[i].claim[j].type.options.selectedIndex == 1) {
  //         let main_claim_osago_sv = claimsContract[i].claim[j].summ
  //         //Если ФО была осуществлена выплата
  //         if (total_summ_payment > 0) {
  //           osago_surcharge_sv =  osagoSurchargeSV(main_claim_osago_sv, appToFo, paymentVoluntary, fuExpertise, max_summ, date_dtp)
  //         //Если был отказ по трасе в первом обращении
  //         } else if (appToFo[0].refusal[0].type.options.selectedIndex == 1) {
  //           osago_refusal_sv_trasa = osagoRefusalSvTrasa(fuExpertise, date_dtp)
  //         }
  //       }
  //     }
  //   }
  // }

  // osago_surcharge_sv = osago_surcharge_sv.replaceAll("\r\n", "")
  // osago_surcharge_sv = osago_surcharge_sv.replaceAll("\r", "")
  // osago_surcharge_sv = osago_surcharge_sv.replaceAll("\n", "")

  // osago_refusal_sv_trasa = osago_refusal_sv_trasa.replaceAll("\r\n", "")
  // osago_refusal_sv_trasa = osago_refusal_sv_trasa.replaceAll("\r", "")
  // osago_refusal_sv_trasa = osago_refusal_sv_trasa.replaceAll("\n", "")
  // if (osago_penalty_paragraph.main_penalty_paragraph == undefined) {
  //   osago_penalty_paragraph.main_penalty_paragraph = ""
  // }
  motivation_part = motivation_part.motivation_part

  return table_fu + 
         decision_name +
         preambula + 
         main_claims_paragraf +
         main_request_paragraph +
         transitional_to_description_paragraph + 
         dtp_description_with_contracts_paragraph +
         appToFo_paragraph_all +
         payment_fu_paragraph_all +
         payment_court_paragraph_all +
         transitional_to_motivation_paragraph +
         motivation_part + 
         transitional_to_resulative_paragraph +
         resulative_part +
         table_signing
}
