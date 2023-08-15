import { changeDateType } from '../changeDateType';
import { DATE_NEW_OSAGO_METHODOKOGY, DATE_FZ_123_START } from "../variables";
import { findMaxSumm } from "../findMaxSumm.js";
import { findLastDay } from '../findLastDay.js';
import { expertiseQuestions } from "../objects/allExpertiseQuestions"
import { makePercentageText_genitive } from "../makePercentageText_genitive"
import { makeRubText_genitive } from '../makeRubText_genitive.js';
import { osagoPenaltyParagraph } from "./osago/osagoPenalty";
import { evacuation_pay_order_ground_helper } from '../objects/helpers';

export function check_signs(totalData, signs) {
    let signs_filled = signs
    signs_filled['Форма страхового возмещения, выбранная Заявителем'] = totalData.appToFoData.appToFoAll[0].form
    signs_filled['Тип Заявителя'] = totalData.preambulaData.app_type
    signs_filled['Статус Заявителя'] = totalData.preambulaData.app_status

    let dpt_number_of_culpits = 0
    for (let i = 0; i < totalData.dtpData.dtpParticipants.length; i++) {
        if (totalData.dtpData.dtpParticipants[i].is_guilty == "виновен") {
            dpt_number_of_culpits++

            if (totalData.dtpData.dtpParticipants[i].car_contractsObjects[0].type == "ОСАГО") {
                signs_filled['ГО виновника застрахована'] = "ДА"
            } else if (totalData.dtpData.dtpParticipants[i].car_contractsObjects[0].type == "Не застрахован") {
                signs_filled['ГО виновника застрахована'] = "НЕТ"
            }
        }
    }
    if (dpt_number_of_culpits == 1) {
        signs_filled['Единственный виновник ДТП'] = "ДА"
    } else if (dpt_number_of_culpits > 1) {
        signs_filled['Единственный виновник ДТП'] = "НЕТ"
    }

    if (dpt_number_of_culpits > 0) {
        signs_filled['Виновник ДТП установлен'] = "ДА"
    } else {
        signs_filled['Виновник ДТП установлен'] = "НЕТ"
    }

    if (totalData.dtpData.dtpParticipants[0].is_guilty != "") {
        if (totalData.dtpData.dtpParticipants[0].is_guilty == "виновен") {
            signs_filled['Заявитель является виновником ДТП'] = "ДА"
        } else {
            signs_filled['Заявитель является виновником ДТП'] = "НЕТ"
        }
    }
    
    if (totalData.dtpData.dtpParticipants[0].car_type != "") {
        if (totalData.dtpData.dtpParticipants[0].car_type == "грузовой") {
            signs_filled['ТС является грузовым'] = "ДА"
        } else {
            signs_filled['ТС является грузовым'] = "НЕТ"
        }
    }
    
    if (totalData.dtpData.dtpParticipants[0].car_type != "") {
        if (totalData.dtpData.dtpParticipants[0].car_type == "такси") {
            signs_filled['ТС является такси'] = "ДА"
        } else {
            signs_filled['ТС является такси'] = "НЕТ"
        }
    }
    if (totalData.dtpData.date_dtp != "") {
        if (totalData.dtpData.europrotocol) {
            signs_filled['ДТП оформлено путем составления европротокола'] = "ДА"
        } else {
            signs_filled['ДТП оформлено путем составления европротокола'] = "НЕТ"
        }
    }

    if (Date.parse(changeDateType(totalData.dtpData.date_dtp) + 'T00:00:00') > DATE_NEW_OSAGO_METHODOKOGY) {
        signs_filled['ДТП произошло после 20/09/2021'] = "ДА"
    } else if (Date.parse(changeDateType(totalData.dtpData.date_dtp) + 'T00:00:00') <= DATE_NEW_OSAGO_METHODOKOGY) {
        signs_filled['ДТП произошло после 20/09/2021'] = "НЕТ"
    }

    if (document.getElementById('owner_name_deactivate_1').checked) {
        signs_filled['Заявитель является собственником ТС'] = "ДА"
    } else {
        signs_filled['Заявитель является собственником ТС'] = "НЕТ"
    }
    

    if (totalData.mainRequestData.main_answer_type == "Ответ получен") {
        signs_filled['ФО предоставлены документы по запросу ФУ'] = "ДА"
    } else {
        signs_filled['ФО предоставлены документы по запросу ФУ'] = "НЕТ"
    }
    
    signs_filled['Соблюдение претензионного порядка Заявителем'] = "НЕТ"
    for (let i = 1; i < totalData.appToFoData.appToFoAll.length; i++) {
        if (Date.parse(changeDateType(totalData.appToFoData.appToFoAll[i].appDate) + 'T00:00:00') >= DATE_FZ_123_START &&
            totalData.appToFoData.appToFoAll[i].type == "Претензия") {
                signs_filled['Соблюдение претензионного порядка Заявителем'] = "ДА"
        }
    }

    signs_filled['Ответ ФО на первоначальное заявление'] = totalData.appToFoData.appToFoAll[0].answerFo

    signs_filled['Основание для отказа'] = totalData.appToFoData.appToFoAll[0].refusalObjects[0].type

    if (totalData.appToFoData.appToFoAll[0].inspectionInfo == "Сведения имеются") {
        signs_filled['Проведение осмотра ТС ФО'] = "ДА"
    } else {
        signs_filled['Проведение осмотра ТС ФО'] = "НЕТ"
    }
    
    signs_filled['Договор страхования'] = []
    for (const contract of totalData.claimsToFuData.claimsContractAll) {
        signs_filled['Договор страхования'].push(contract.type)
    }

    signs_filled['Требование к ФУ'] = []
    for (let i = 0; i < totalData.claimsToFuData.claimsContractAll.length; i++) {
        signs_filled['Требование к ФУ'][i] = []
        for (let j = 0; j < totalData.claimsToFuData.claimsContractAll[i].claim.length; j++) {
            signs_filled['Требование к ФУ'][i][j] = totalData.claimsToFuData.claimsContractAll[i].claim[j].type
        }
    }

    //Определение общей суммы выплаты ФО
    let total_summ_payment = 0
    for (let i = 0; i < totalData.paymentVoluntaryData.paymentVoluntaryAll.length; i++) {
        if (totalData.paymentVoluntaryData.paymentVoluntaryAll[i].type == "Страховое возмещение") {
            total_summ_payment = total_summ_payment + totalData.paymentVoluntaryData.paymentVoluntaryAll[i].summ
        }
    }

    //Определение суммы страхового возмещения на основании НТЭ ФУ
    let satisfaction_summ = 0
    if (totalData.fuExpertiseData.fuExpertiseAll[0].date != "") {
        //Если полной гибели не было
        signs_filled['Контруктивная гибель ТС Заявителя наступила'] = "НЕТ"
        satisfaction_summ = totalData.fuExpertiseData.fuExpertiseAll[0].summ_with
        //Если произошла тотальная гибель ТС
        if (totalData.fuExpertiseData.fuExpertiseAll[0].summ_without > totalData.fuExpertiseData.fuExpertiseAll[0].summ_market && 
            totalData.fuExpertiseData.fuExpertiseAll[0].summ_market != 0) {
            satisfaction_summ = totalData.fuExpertiseData.fuExpertiseAll[0].summ_market - totalData.fuExpertiseData.fuExpertiseAll[0].summ_leftovers
            signs_filled['Контруктивная гибель ТС Заявителя наступила'] = "ДА"
        }
    }

    //Определение результатов трасологической экспертизы на основании НТЭ ФУ
    if (totalData.fuExpertiseData.fuExpertiseAll[0].date != "") {
        if (totalData.fuExpertiseData.fuExpertiseAll[0].trasa_results == "Повреждения ТС полностью соответствуют ДТП" ||
            totalData.fuExpertiseData.fuExpertiseAll[0].trasa_results == "Повреждения ТС частично соответствуют ДТП") {
            signs_filled['По НТЭ ФУ повреждения ТС соответствуют ДТП'] = "ДА"
        } else if (totalData.fuExpertiseData.fuExpertiseAll[0].trasa_results == "Повреждения ТС не соответствуют ДТП") {
            signs_filled['По НТЭ ФУ повреждения ТС соответствуют ДТП'] = "НЕТ"
        }
    }

    //Определение наличия у ФО договоров со СТОА
    if (totalData.fuExpertiseData.fuExpertiseAll[0].date != "") {
        if (totalData.appToFoData.appToFoAll[0].refusalObjects[0].stor_posibility == "Договоры имеются") {
            signs_filled['У Финансовой организации имеются договоры со СТОА'] = "ДА"
        } else if (totalData.appToFoData.appToFoAll[0].refusalObjects[0].stor_posibility == "Договоров не имеется") {
            signs_filled['У Финансовой организации имеются договоры со СТОА'] = "НЕТ"
        }
    } 

    //Определение процента
    let percentage = 0
    percentage = Math.round((satisfaction_summ - total_summ_payment) / total_summ_payment * 100)
    if (percentage < 0) {
        percentage = 0
    }

    if (totalData.fuExpertiseData.fuExpertiseAll[0].date != "") {
        if (percentage > 10) {
            signs_filled['Разница превышает 10%'] = "ДА"
        } else {
            signs_filled['Разница превышает 10%'] = "НЕТ"
        }
    }
    
    //Определение максимальной суммы по ОСАГО
    let max_summ = findMaxSumm()
    if (totalData.fuExpertiseData.fuExpertiseAll[0].date != "") {
        if (totalData.fuExpertiseData.fuExpertiseAll[0].summ_without > max_summ) {
            signs_filled['Ущерб превышает установленную Законом № 40-ФЗ страховую сумму'] = "ДА"
        } else {
            signs_filled['Ущерб превышает установленную Законом № 40-ФЗ страховую сумму'] = "НЕТ"
        }
    }

    if (totalData.fuExpertiseData.fuExpertiseAll[0].date != "") {
        if (satisfaction_summ > total_summ_payment) {
            signs_filled['По экспертизе ФУ больше, чем по экспертизе ФО'] = "ДА"
        } else if (satisfaction_summ <= total_summ_payment) {
            signs_filled['По экспертизе ФУ больше, чем по экспертизе ФО'] = "НЕТ"
        }
    }

    //Проверка 3-летнего срока на обращения к ФУ
    let date_appeal = $('#date_appeal').val()
    date_appeal = changeDateType(date_appeal)
    date_appeal = Date.parse(date_appeal + 'T00:00:00')
    let last_day_for_pay_fu = new Date(findLastDay(totalData.appToFoData.appToFoAll[0].appDate))
    let year = last_day_for_pay_fu.getFullYear()
    let month = last_day_for_pay_fu.getMonth()
    let day = last_day_for_pay_fu.getDate()
    let last_day_for_fu_app = new Date(year + 3, month, day + 1, 0);
    last_day_for_fu_app = Date.parse(last_day_for_fu_app)
    if (date_appeal > last_day_for_fu_app) {
        signs_filled['Срок для обращения к ФУ пропущен'] = "ДА"
    } else if (date_appeal <= last_day_for_fu_app) {
        signs_filled['Срок для обращения к ФУ пропущен'] = "НЕТ"
    }



    return signs_filled
}

export function make_motivation_paragraph(dtpData,
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
                                          data_from_db) {
    let out_data = {}
    let all_found_claims = []
    let all_not_found_claims = []
    let all_found_claims_result_helper = []
    let all_found_claims_helper = {}
    let osago_penalty_paragraph = {}
    
    let total_result = ""
    let motivation_part = ""
    let motivation_part_max = ""
    //Алгоритм поиска подходящей мотивировки
    //Получение общего количества признаков, занесенных в таблицу Мотивировки
    let total_sign_count = Object.keys(data_from_db.fact_signs).length

    //Текущее значение количества совпадающих признаков
    let right_sign_count
    //Индекс строки, подходящей под все признаки
    let right_motive_index
    //Максимальное значение верных индексов
    let right_sign_max = 0
    //Массив с найденными признаками
    let right_sign_array = []
    //Массив с ненайденными признаками
    let wrong_sign_array = []
    //Индекс строки, подходящей под максимальное количество совпадающих признаков
    let right_sign_max_index = 0
    //Перебор договоров
    for (let contract_number = 0; contract_number < claimsContract.length; contract_number++) {
        //Перебор требований к ФУ
        for (let claim_number = 0; claim_number < claimsContract[contract_number].claim.length; claim_number++) {
            right_motive_index = 0
            //Перебор все строк из таблицы Мотивировки (варианты со всеми возможными комбинациями признаков)
            for (let i = 1; i < data_from_db.total_data.length; i++) {
                right_sign_count = 0
                //Перебор всех ключей в таблице Мотивировки
                for (let j = 0; j < Object.keys(data_from_db.total_data[i]).length; j++) {
                    //Если в ключ является признаком
                    if (Object.keys(data_from_db.total_data[i])[j].indexOf("sign") >= 0) {
                        //Перебор всех данных, заполненных сотрудником
                        for (let k = 0; k < Object.keys(data_from_db.fact_signs).length; k++) {
                            //Нахождение соответствия между ключами из таблицы Мотивировки и ключами, заполненными сотрудниками
                            if (Object.values(data_from_db.total_data[0])[j] == Object.keys(data_from_db.fact_signs)[k]) {
                                //Если соответствуют ключи "Договор страхования" (тогда проверяется каждый договор)
                                if (Object.keys(data_from_db.fact_signs)[k] == 'Договор страхования') {
                                    if (Object.values(data_from_db.total_data[i])[j] == claimsContract[contract_number].type.value) {
                                        right_sign_count++
                                    }
                                    // console.log("Таблица : " + Object.values(data_from_db.total_data[0])[j] + " : " + Object.values(data_from_db.total_data[i])[j]);
                                    // console.log("Факт : " + Object.keys(data_from_db.fact_signs)[k] + " : " + Object.values(data_from_db.fact_signs)[k][l] + "\n\n");
                                //Если соответствуют ключи "Требование к ФУ" (тогда проверяется каждое требование)
                                } else if (Object.keys(data_from_db.fact_signs)[k] == 'Требование к ФУ') {
                                    if (Object.values(data_from_db.total_data[i])[j] == claimsContract[contract_number].claim[claim_number].type.value) {
                                        right_sign_count++
                                    }
                                    // console.log("Таблица : " + Object.values(data_from_db.total_data[0])[j] + " : " + Object.values(data_from_db.total_data[i])[j]);
                                    // console.log("Факт : " + Object.keys(data_from_db.fact_signs)[k] + " : " + Object.values(data_from_db.fact_signs)[k][l] + "\n\n");
                                } else {
                                    //Проверка значения одинакого ключа
                                    if (Object.values(data_from_db.total_data[i])[j] == Object.values(data_from_db.fact_signs)[k]) {
                                        right_sign_count++
                                        // console.log("Таблица : " + Object.values(data_from_db.total_data[0])[j] + " : " + Object.values(data_from_db.total_data[i])[j]);
                                        // console.log("Факт : " + Object.keys(data_from_db.fact_signs)[k] + " : " + Object.values(data_from_db.fact_signs)[k] + "\n\n");
                                    } else if (Object.values(data_from_db.total_data[i])[j] == "НЕ ПРИМЕНИМО") {
                                        right_sign_count++
                                    }
                                }
                            }
                        }
                    }
                }
                //Определение номера строки с максимальным количеством совпадений ключей
                if (right_sign_count > right_sign_max) {
                    //За исключением требования о взыскании неустойки
                    if (data_from_db.total_data[i].sign_4 != "Неустойка") {
                        right_sign_max = right_sign_count
                        right_sign_max_index = i
                    }
                }
                //Определение номера строки совпадения в случае если количество верных ключей совпадает в общим количеством ключей
                if (total_sign_count == right_sign_count) {
                    right_motive_index = i
                    break
                }
            }

            //Заполнение массива найденных значений (ключей)
            //Перебор всех ключей в таблице Мотивировки
            for (let j = 0; j < Object.keys(data_from_db.total_data[right_sign_max_index]).length; j++) {
                //Если в ключ является признаком
                if (Object.keys(data_from_db.total_data[right_sign_max_index])[j].indexOf("sign") >= 0) {
                    //Перебор всех данных, заполненных сотрудником
                    for (let k = 0; k < Object.keys(data_from_db.fact_signs).length; k++) {
                        //Нахождение соответствия между ключами из таблицы Мотивировки и ключами, заполненными сотрудниками
                        if (Object.values(data_from_db.total_data[0])[j] == Object.keys(data_from_db.fact_signs)[k]) {
                            //Если соответствуют ключи "Договор страхования" (тогда проверяется каждый договор)
                            if (Object.keys(data_from_db.fact_signs)[k] == 'Договор страхования') {
                                if (Object.values(data_from_db.total_data[right_sign_max_index])[j] == claimsContract[contract_number].type.value) {
                                    right_sign_array.push({
                                        sign : Object.values(data_from_db.total_data[0])[j],
                                        value : claimsContract[contract_number].type.value
                                    })
                                } else {
                                    wrong_sign_array.push({
                                        sign : Object.values(data_from_db.total_data[0])[j],
                                        value : Object.values(data_from_db.total_data[right_sign_max_index])[j]
                                    })
                                }
                            //Если соответствуют ключи "Требование к ФУ" (тогда проверяется каждое требование)
                            } else if (Object.keys(data_from_db.fact_signs)[k] == 'Требование к ФУ') {
                                if (Object.values(data_from_db.total_data[right_sign_max_index])[j] == claimsContract[contract_number].claim[claim_number].type.value) {
                                    right_sign_array.push({
                                        sign : Object.values(data_from_db.total_data[0])[j],
                                        value : claimsContract[contract_number].claim[claim_number].type.value
                                    })
                                } else {
                                    wrong_sign_array.push({
                                        sign : Object.values(data_from_db.total_data[0])[j],
                                        value : Object.values(data_from_db.total_data[right_sign_max_index])[j]
                                    })
                                }
                            } else {
                                //Проверка значения одинакого ключа
                                if (Object.values(data_from_db.total_data[right_sign_max_index])[j] == Object.values(data_from_db.fact_signs)[k]) {
                                    right_sign_array.push({
                                        sign : Object.values(data_from_db.total_data[0])[j],
                                        value : Object.values(data_from_db.fact_signs)[k]
                                    })
                                } else if (Object.values(data_from_db.total_data[right_sign_max_index])[j] == "НЕ ПРИМЕНИМО") {
                                    right_sign_array.push({
                                        sign : Object.values(data_from_db.total_data[0])[j],
                                        value : "НЕ ПРИМЕНИМО"
                                    })
                                } else {
                                    wrong_sign_array.push({
                                        sign : Object.values(data_from_db.total_data[0])[j],
                                        value : Object.values(data_from_db.fact_signs)[k]
                                    })
                                }
                            }
                        }
                    }
                }
            }

            console.log(right_sign_array);
            console.log(wrong_sign_array);

            //Заполнение массива найденных требований (максимальное число совпадений)
            for (let i = 0; i < Object.values(data_from_db.total_data[right_sign_max_index]).length; i++) {
                if (Object.keys(data_from_db.total_data[right_sign_max_index])[i].indexOf("motiv") >= 0) {
                    if (Object.values(data_from_db.total_data[right_sign_max_index])[i] != null) {
                        let paragraphs = Object.values(data_from_db.total_data[right_sign_max_index])[i]
                        paragraphs = fillMotiveParagraph(dtpData,
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
                                                            Object.values(data_from_db.total_data[0])[i],
                                                            paragraphs)

                            paragraphs = paragraphs.split(String.fromCharCode(10))
                            for (const iterator of paragraphs) {
                                motivation_part_max = `${motivation_part_max}<p>${iterator}</p>`
                        }
                    }
                }
            }

            //Редактирование изменяемых частей мотивировочной части
            motivation_part_max = motivation_part_max.replaceAll("<p></p>", "")
            motivation_part_max = motivation_part_max.replaceAll("</p></p>", "")

            motivation_part_max = motivation_part_max.replaceAll("\r\n", "")
            motivation_part_max = motivation_part_max.replaceAll("\r", "")
            motivation_part_max = motivation_part_max.replaceAll("\n", "")
            motivation_part_max = motivation_part_max.replaceAll("  ", " ")

            console.log("Всего совпадений найдено: " + right_sign_max + " из " + total_sign_count);
            console.log("Строка с наибольшим количеством совпадений: " + right_sign_max_index);
            console.log("Строка с полным совпадением: " + right_motive_index);

            //Формирование вспомогальных логов
            if (right_motive_index == 0) {
                console.log("Договор " + (contract_number + 1) + ". Требование " + (claim_number + 1) + ". Совпадения не найдены");
            } else {
                console.log("Договор " + (contract_number + 1) + ". Требование " + (claim_number + 1) + ". Совпадение найдено в строке " + right_motive_index);
            }

            //Формирование текста мотивировочной части
            if (right_motive_index != 0) {
                for (let i = 0; i < Object.values(data_from_db.total_data[right_motive_index]).length; i++) {
                    if (Object.keys(data_from_db.total_data[right_motive_index])[i].indexOf("motiv") >= 0) {
                        if (Object.values(data_from_db.total_data[right_motive_index])[i] != null) {
                            let paragraphs = Object.values(data_from_db.total_data[right_motive_index])[i]
                            paragraphs = fillMotiveParagraph(dtpData,
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
                                                             Object.values(data_from_db.total_data[0])[i],
                                                             paragraphs)

                                paragraphs = paragraphs.split(String.fromCharCode(10))
                            for (const iterator of paragraphs) {
                                motivation_part = `${motivation_part}<p>${iterator}</p>`
                            }
                        }
                    }
                }

                //Формирование мотивировки по неустойке по ОСАГО
                let osago_penalty_result = ""
                if (claimsContract[contract_number].type.value == "ОСАГО") {
                    if (claimsContract[contract_number].claim[claim_number].type.value == "Неустойка") {
                        osago_penalty_paragraph = osagoPenaltyParagraph(paymentVoluntary,
                                                                        paymentFu,
                                                                        paymentCourt,
                                                                        total_penalty_summ_accrued,
                                                                        total_penalty_summ_paid,
                                                                        max_summ)

                        
                        if (osago_penalty_paragraph.total_penalty_summ > 0) {
                            osago_penalty_result = "УДОВЛЕТВОРИТЬ"
                        } else {
                            osago_penalty_result = "ОТКАЗАТЬ"
                        }

                        motivation_part = motivation_part + osago_penalty_paragraph.main_penalty_paragraph
                    }
                }
                //Формирование массива объектов найденных требований в таблице Мотивировок
                all_found_claims.push({
                    result : osago_penalty_result != "" ? osago_penalty_result : data_from_db.total_data[right_motive_index].Result,
                    contract : claimsContract[contract_number].type.value,
                    name : claimsContract[contract_number].claim[claim_number].type.value,
                    summ: osago_penalty_paragraph.total_penalty_summ,
                })
            } else {
                all_not_found_claims.push({
                    result : "unknown",
                    contract : claimsContract[contract_number].type.value,
                    name : claimsContract[contract_number].claim[claim_number].type.value,
                    summ: claimsContract[contract_number].claim[claim_number].summ,
                })
            }
        }
    }

    //Редактирование изменяемых частей мотивировочной части
    motivation_part = motivation_part.replaceAll("<p></p>", "")
    motivation_part = motivation_part.replaceAll("</p></p>", "")

    motivation_part = motivation_part.replaceAll("\r\n", "")
    motivation_part = motivation_part.replaceAll("\r", "")
    motivation_part = motivation_part.replaceAll("\n", "")
    motivation_part = motivation_part.replaceAll("  ", " ")
    
    //Определение общей суммы выплаты ФО
    let total_summ_payment = 0
    for (let i = 0; i < paymentVoluntary.length; i++) {
        if (paymentVoluntary[i].type.options.selectedIndex == 1) {
            total_summ_payment = total_summ_payment + paymentVoluntary[i].summ
        }
    }

    //Определение суммы страхового возмещения на основании НТЭ ФУ
    let satisfaction_summ = 0
    for (let i = 0; i < fuExpertise.length; i++) {
        if (fuExpertise[i].summ_without != "") {
            //Если полной гибели не было
            satisfaction_summ = fuExpertise[i].summ_with
            //Если произошла тотальная гибель ТС
            if (fuExpertise[i].summ_without > fuExpertise[i].summ_market && 
                fuExpertise[i].summ_market != 0) {
                    satisfaction_summ = fuExpertise[i].summ_market - fuExpertise[i].summ_leftovers
            }
        }
    }

     //Если размер ущерба превышает страховую сумму
     if (satisfaction_summ > max_summ) {
        satisfaction_summ = max_summ
    }

    //Определение суммы расходов на эвакуацию ТС
    let satisfaction_ev_summ
    for (let i = 0; i < claimsContract.length; i++) {
        if (claimsContract[i].type.value == "ОСАГО") {
            for (let j = 0; j < claimsContract[i].claimObjects.length; j++) {
                if (claimsContract[i].claimObjects[j].type == "Эвакуатор") {
                    satisfaction_ev_summ = claimsContract[i].claimObjects[j].summ
                }
            }
        }
    }

     //Формирование объекта найденных требований и удовлетворенных сумм для резолютивной части
     for (let i = 0; i < all_found_claims.length; i++) {
        if (all_found_claims[i].name == "Страховое возмещение") {
            if (all_found_claims[i].result == "УДОВЛЕТВОРИТЬ") {
                all_found_claims[i].summ = (satisfaction_summ - total_summ_payment)
            } else {
                all_found_claims[i].summ = 0
            }
        } else if (all_found_claims[i].name == "Эвакуатор") {
            if (all_found_claims[i].result == "УДОВЛЕТВОРИТЬ") {
                all_found_claims[i].summ = satisfaction_ev_summ
            } else {
                all_found_claims[i].summ = 0
            }
        }
        all_found_claims_result_helper.push(all_found_claims[i].result)
    }

    //Определение общего результата рассмотрения Обращения
    if (all_found_claims_result_helper.length > 0) {
        if (all_found_claims_result_helper.includes("УДОВЛЕТВОРИТЬ")) {
            total_result = "УДОВЛЕТВОРИТЬ"
        } else if (all_found_claims_result_helper.includes("ОТКАЗАТЬ")) {
            total_result = "ОТКАЗАТЬ"
        } else {
            total_result = "ПРЕКРАТИТЬ"
        }
    }

    out_data = {
        motivation_part : motivation_part,
        motivation_part_max : motivation_part_max,
        result : total_result,
        all_found_claims : all_found_claims,
        all_not_found_claims : all_not_found_claims,
        osago_penalty_paragraph : osago_penalty_paragraph
    }
    console.log(out_data);
    return out_data
}

//Редактирование изменяемых частей мотивировочной части
function fillMotiveParagraph(dtpData,
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
                             total_data_keys,
                             paragraph) {

    let result_paragraph = ""
    
    //Определение суммы страхового возмещения на основании НТЭ ФУ
    let satisfaction_summ = 0
    for (let i = 0; i < fuExpertise.length; i++) {
        if (fuExpertise[i].summ_without != "") {
            //Если полной гибели не было
            satisfaction_summ = fuExpertise[i].summ_with
            //Если произошла тотальная гибель ТС
            if (fuExpertise[i].summ_without > fuExpertise[i].summ_market && 
                fuExpertise[i].summ_market != 0) {
                    satisfaction_summ = fuExpertise[i].summ_market - fuExpertise[i].summ_leftovers
            }
        }
    }

     //Определение общей суммы выплаты ФО
     let total_summ_payment = 0
     for (let i = 0; i < paymentVoluntary.length; i++) {
         if (paymentVoluntary[i].type.options.selectedIndex == 1) {
             total_summ_payment = total_summ_payment + paymentVoluntary[i].summ
         }
     }

    //Определение размера требования страхового возмещения
    //Перебор всех договоров, по которым заявлены требования
    let claim_to_fu_summ = 0
    for (let i = 0; i < claimsContract.length; i++) {
      //Если есть требования по договору ОСАГО
      if (claimsContract[i].type.options.selectedIndex == 1) {
        // Перебор всех требований, заявленных в рамках договора ОСАГО
        for (let j = 0; j < claimsContract[i].claim.length; j++) {
          //Если среди заявленных требований есть требование о взыскании страхового возмещения
          if (claimsContract[i].claim[j].type.options.selectedIndex == 1) {
            claim_to_fu_summ = claimsContract[i].claim[j].summ
          }
          //Если среди заявленных требований есть требование о взыскании расходов на аваркома
          if (claimsContract[i].claim[j].type.options.selectedIndex == 18) {
            claim_to_fu_summ = claimsContract[i].claim[j].summ
          }
        }
      }
    }

    //Определение процентов
    let percentage = 0
    percentage = Math.round((satisfaction_summ - total_summ_payment) / total_summ_payment * 100)
    if (percentage < 0) {
        percentage = 0
    }


    //Изменение текста параграфа из таблицы motivations на соответствующий текст из таблицы data
    for (let i = 0; i < data_from_db.data.length; i++) {
        if (data_from_db.data[i]['Наименование'] == paragraph) {
            total_data_keys = data_from_db.data[i]['Наименование']
            paragraph = data_from_db.data[i]['Текст']
            break
        }
    }

    if (total_data_keys == "Для решения вопросов, связанных с рассмотрением Обращения, Финансовым уполномоченным назначена экспертиза 1 (Комплекс)") {

        let organization = fuExpertise[0].organization.value
        result_paragraph = paragraph.replaceAll("organization", organization)
        let technician = fuExpertise[0].technician.value
        result_paragraph = result_paragraph.replaceAll("technician", technician)
    
    } else if (total_data_keys == "Для решения вопросов, связанных с рассмотрением Обращения, Финансовым уполномоченным назначена экспертиза 1 (Траса)") {
        
        let organization = fuExpertise[0].organization.value
        result_paragraph = paragraph.replaceAll("organization", organization)
        let technician = fuExpertise[0].technician.value
        result_paragraph = result_paragraph.replaceAll("technician", technician)
    
    } else if (total_data_keys == "Для решения вопросов, связанных с рассмотрением Обращения, Финансовым уполномоченным назначена экспертиза 2") {

        let organization = fuExpertise[1].organization.value
        result_paragraph = paragraph.replaceAll("organization", organization)
        let technician = fuExpertise[1].technician.value
        result_paragraph = result_paragraph.replaceAll("technician", technician)

    } else if (total_data_keys == "Вопросы для эксперта ФУ 1 (Комплекс)") {
        
        let question_paragraph = ""
        expertiseQuestions.questions.forEach(element => {
            if (fuExpertise[0].typical_question.value == element.type) {
                question_paragraph = element.question
            }
        })
        result_paragraph = paragraph.replaceAll("question", question_paragraph)

        result_paragraph = result_paragraph.replaceAll("<p></p>", "")
        result_paragraph = result_paragraph.replaceAll("</p></p>", "")

        result_paragraph = result_paragraph.replaceAll("\r\n", "")
        result_paragraph = result_paragraph.replaceAll("\r", "")
        result_paragraph = result_paragraph.replaceAll("\n", "")
    
    } else if (total_data_keys == "Вопросы для эксперта ФУ 1 (Траса)") {
        
        let question_paragraph = ""
        expertiseQuestions.questions.forEach(element => {
            if (fuExpertise[0].typical_question.value == element.type) {
                question_paragraph = element.question
            }
        })
        result_paragraph = paragraph.replaceAll("question", question_paragraph)

        result_paragraph = result_paragraph.replaceAll("<p></p>", "")
        result_paragraph = result_paragraph.replaceAll("</p></p>", "")

        result_paragraph = result_paragraph.replaceAll("\r\n", "")
        result_paragraph = result_paragraph.replaceAll("\r", "")
        result_paragraph = result_paragraph.replaceAll("\n", "")
    
    } else if (total_data_keys == "Вопросы для эксперта ФУ 2") {

        let question_paragraph = ""
        expertiseQuestions.questions.forEach(element => {
            if (fuExpertise[1].typical_question.value == element.type) {
                question_paragraph = element.question
            }
        })
        result_paragraph = paragraph.replaceAll("question", question_paragraph)

        result_paragraph = result_paragraph.replaceAll("<p></p>", "")
        result_paragraph = result_paragraph.replaceAll("</p></p>", "")

        result_paragraph = result_paragraph.replaceAll("\r\n", "")
        result_paragraph = result_paragraph.replaceAll("\r", "")
        result_paragraph = result_paragraph.replaceAll("\n", "")

    } else if (total_data_keys == "Выводы эксперта ФУ 1 (Комплекс)") {
        
        let expertises_summ_paragraph_helper = ""
        if (fuExpertise[0].trasa.value != "") {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `${fuExpertise[0].trasa.value}, `
        }
        if (fuExpertise[0].summ_without != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость восстановительного ремонта 
            Транспортного средства Заявителя без учета износа составила ${fuExpertise[0].summ_without_text}, `
        }
        if (fuExpertise[0].summ_without != 0) {
            if (fuExpertise[0].summ_with != 0) {
                expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `c учетом износа – ${fuExpertise[0].summ_with_text}, `
            }
        } else {
            if (fuExpertise[0].summ_with != 0) {
                expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость восстановительного ремонта 
                Транспортного средства Заявителя с учетом износа составила ${fuExpertise[0].summ_with_text}, `
            }
        }
        if (fuExpertise[0].summ_market != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `средняя рыночная стоимость 
            Транспортного средства до повреждения по состоянию на дату ДТП составляла ${fuExpertise[0].summ_market_text}, `
        }
        if (fuExpertise[0].summ_leftovers != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость годных остатков – ${fuExpertise[0].summ_leftovers_text}, `
        }
        if (fuExpertise[0].summ_uts != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `сумма УТС составила ${fuExpertise[0].summ_uts_text}, `
        }
        expertises_summ_paragraph_helper = expertises_summ_paragraph_helper.slice(0, -2)
        expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + "."
        result_paragraph = paragraph.replaceAll("result", expertises_summ_paragraph_helper)

        let organization = fuExpertise[0].organization.value
        result_paragraph = result_paragraph.replaceAll("organization", organization)
        let date_nte = fuExpertise[0].date.value
        result_paragraph = result_paragraph.replaceAll("date_nte", date_nte)
        let number = fuExpertise[0].number.value
        result_paragraph = result_paragraph.replaceAll("number", number)

        result_paragraph = result_paragraph.replaceAll("\r\n", "")
        result_paragraph = result_paragraph.replaceAll("\r", "")
        result_paragraph = result_paragraph.replaceAll("\n", "")
    
    } else if (total_data_keys == "Выводы эксперта ФУ 1 (Траса)") {
        
        let expertises_summ_paragraph_helper = ""
        if (fuExpertise[0].trasa.value != "") {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `${fuExpertise[0].trasa.value}, `
        }
        if (fuExpertise[0].summ_without != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость восстановительного ремонта 
            Транспортного средства Заявителя без учета износа составила ${fuExpertise[0].summ_without_text}, `
        }
        if (fuExpertise[0].summ_without != 0) {
            if (fuExpertise[0].summ_with != 0) {
                expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `c учетом износа – ${fuExpertise[0].summ_with_text}, `
            }
        } else {
            if (fuExpertise[0].summ_with != 0) {
                expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость восстановительного ремонта 
                Транспортного средства Заявителя с учетом износа составила ${fuExpertise[0].summ_with_text}, `
            }
        }
        if (fuExpertise[0].summ_market != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `средняя рыночная стоимость 
            Транспортного средства до повреждения по состоянию на дату ДТП составляла ${fuExpertise[0].summ_market_text}, `
        }
        if (fuExpertise[0].summ_leftovers != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость годных остатков – ${fuExpertise[0].summ_leftovers_text}, `
        }
        if (fuExpertise[0].summ_uts != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `сумма УТС составила ${fuExpertise[0].summ_uts_text}, `
        }
        expertises_summ_paragraph_helper = expertises_summ_paragraph_helper.slice(0, -2)
        expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + "."
        result_paragraph = paragraph.replaceAll("result", expertises_summ_paragraph_helper)

        let organization = fuExpertise[0].organization.value
        result_paragraph = result_paragraph.replaceAll("organization", organization)
        let date_nte = fuExpertise[0].date.value
        result_paragraph = result_paragraph.replaceAll("date_nte", date_nte)
        let number = fuExpertise[0].number.value
        result_paragraph = result_paragraph.replaceAll("number", number)

        result_paragraph = result_paragraph.replaceAll("\r\n", "")
        result_paragraph = result_paragraph.replaceAll("\r", "")
        result_paragraph = result_paragraph.replaceAll("\n", "")
    
    } else if (total_data_keys == "Выводы эксперта ФУ 2") {

        let expertises_summ_paragraph_helper = ""
        if (fuExpertise[1].trasa.value != "") {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `${fuExpertise[1].trasa.value}, `
        }
        if (fuExpertise[1].summ_without != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость восстановительного ремонта 
            Транспортного средства Заявителя без учета износа составила ${fuExpertise[1].summ_without_text}, `
        }
        if (fuExpertise[1].summ_without != 0) {
            if (fuExpertise[1].summ_with != 0) {
                expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `c учетом износа – ${fuExpertise[1].summ_with_text}, `
            }
        } else {
            if (fuExpertise[1].summ_with != 0) {
                expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость восстановительного ремонта 
                Транспортного средства Заявителя с учетом износа составила ${fuExpertise[1].summ_with_text}, `
            }
        }
        if (fuExpertise[1].summ_market != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `средняя рыночная стоимость 
            Транспортного средства до повреждения по состоянию на дату ДТП составляла ${fuExpertise[1].summ_market_text}, `
        }
        if (fuExpertise[1].summ_leftovers != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость годных остатков – ${fuExpertise[1].summ_leftovers_text}, `
        }
        if (fuExpertise[1].summ_uts != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `сумма УТС составила ${fuExpertise[1].summ_uts_text}, `
        }
        expertises_summ_paragraph_helper = expertises_summ_paragraph_helper.slice(0, -2)
        expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + "."
        result_paragraph = paragraph.replaceAll("result", expertises_summ_paragraph_helper)

        let organization = fuExpertise[1].organization.value
        result_paragraph = result_paragraph.replaceAll("organization", organization)
        let date_nte = fuExpertise[1].date.value
        result_paragraph = result_paragraph.replaceAll("date_nte", date_nte)
        let number = fuExpertise[1].number.value
        result_paragraph = result_paragraph.replaceAll("number", number)

        result_paragraph = result_paragraph.replaceAll("\r\n", "")
        result_paragraph = result_paragraph.replaceAll("\r", "")
        result_paragraph = result_paragraph.replaceAll("\n", "")

    } else if (total_data_keys == "Таким образом, сумма страхового возмещения при полной гибели ТС составляет") {

        let summ_market_text = fuExpertise[0].summ_market_text
        result_paragraph = paragraph.replaceAll("summ_market", summ_market_text)
        let summ_leftovers_text = fuExpertise[0].summ_leftovers_text
        result_paragraph = result_paragraph.replaceAll("summ_leftovers", summ_leftovers_text)
        result_paragraph = result_paragraph.replaceAll("satisfaction_summ", makeRubText_genitive(satisfaction_summ))

    } else if (total_data_keys == "Стоимость ремонта по экспертизе ФУ превышает размер страхового возмещения, выплаченного ФО, на") {

        result_paragraph = paragraph.replaceAll("percent", makePercentageText_genitive(percentage))
        result_paragraph = result_paragraph.replaceAll("satisfaction_summ", makeRubText_genitive(satisfaction_summ))
        result_paragraph = result_paragraph.replaceAll("total_summ_payment", makeRubText_genitive(total_summ_payment))

    } else if (total_data_keys == "Размер страхового возмещения при полной гибели по экспертизе ФУ превышает размер страхового возмещения, выплаченного ФО, на") {

        result_paragraph = paragraph.replaceAll("percent", makePercentageText_genitive(percentage))
        result_paragraph = result_paragraph.replaceAll("satisfaction_summ", makeRubText_genitive(satisfaction_summ))
        result_paragraph = result_paragraph.replaceAll("total_summ_payment", makeRubText_genitive(total_summ_payment))

    } else if (total_data_keys == "Поскольку указанное расхождение превышает 10%") {
        
        //Если размер ущерба превышает страховую сумму
        if (satisfaction_summ > max_summ) {
            satisfaction_summ = max_summ
        }
        result_paragraph = paragraph.replaceAll("satisfaction_summ", makeRubText_genitive(satisfaction_summ))

    } else if (total_data_keys == "Поскольку указанное расхождение не превышает 10%") {
        
        //Если размер ущерба превышает страховую сумму
        if (satisfaction_summ > max_summ) {
            satisfaction_summ = max_summ
        }
        result_paragraph = paragraph.replaceAll("satisfaction_summ", makeRubText_genitive(satisfaction_summ))

    } else if (total_data_keys == "Таким образом, Финансовый уполномоченный приходит к выводу о наступлении страхового случая") {
        
        //Определение даты ДТП
        let date_dtp = $('#date_dtp').val()
        result_paragraph = paragraph.replaceAll("date_dtp", date_dtp)

    } else if (total_data_keys == "Таким образом, Финансовый уполномоченный приходит к выводу о ненаступлении страхового случая") {
        
        //Определение даты ДТП
        let date_dtp = $('#date_dtp').val()
        result_paragraph = paragraph.replaceAll("date_dtp", date_dtp)

    } else if (total_data_keys == "Таким образом, требование Заявителя подлежит удовлетворению (недоплата)") {
        
        //Если размер ущерба превышает страховую сумму
        if (satisfaction_summ > max_summ) {
            satisfaction_summ = max_summ
        }

        //Определение суммы, подлежащей ко взысканию
        let total_summ = satisfaction_summ - total_summ_payment

        let partly_helper = ""
        if (claim_to_fu_summ > total_summ) {
            partly_helper = " частичному"
        }

        result_paragraph = paragraph.replaceAll("partly_helper", partly_helper)
        result_paragraph = result_paragraph.replaceAll("total_summ_payment", makeRubText_genitive(total_summ_payment))
        result_paragraph = result_paragraph.replaceAll("satisfaction_summ", makeRubText_genitive(satisfaction_summ))
        result_paragraph = result_paragraph.replaceAll("total_summ", makeRubText_genitive(total_summ))

    } else if (total_data_keys == "Таким образом, требование Заявителя не подлежит удовлетворению (выплата в надлежащем размере)") {

        result_paragraph = paragraph.replaceAll("total_summ_payment", makeRubText_genitive(total_summ_payment))

    } else if (total_data_keys == "Таким образом, требование Заявителя не подлежит удовлетворению (выплата в полном объеме)") {

        result_paragraph = paragraph.replaceAll("total_summ_payment", makeRubText_genitive(total_summ_payment))

    } else if (total_data_keys == "Учитывая вышеизложенное, требование Заявителя подлежит удовлетворению (недоплата)") {
        
        //Если размер ущерба превышает страховую сумму
        if (satisfaction_summ > max_summ) {
            satisfaction_summ = max_summ
        }

        //Определение суммы, подлежащей ко взысканию
        let total_summ = satisfaction_summ - total_summ_payment

        let partly_helper = ""
        if (claim_to_fu_summ > total_summ) {
            partly_helper = " частичному"
        }

        result_paragraph = paragraph.replaceAll("partly_helper", partly_helper)
        result_paragraph = result_paragraph.replaceAll("total_summ_payment", makeRubText_genitive(total_summ_payment))
        result_paragraph = result_paragraph.replaceAll("satisfaction_summ", makeRubText_genitive(satisfaction_summ))
        result_paragraph = result_paragraph.replaceAll("total_summ", makeRubText_genitive(total_summ))

    } else if (total_data_keys == "Учитывая вышеизложенное, требование Заявителя подлежит удовлетворению (траса)") {
        
        //Если размер ущерба превышает страховую сумму
        if (satisfaction_summ > max_summ) {
            satisfaction_summ = max_summ
        }

        //Определение суммы, подлежащей ко взысканию
        let total_summ = satisfaction_summ - total_summ_payment

        let partly_helper = ""
        if (claim_to_fu_summ > total_summ) {
            partly_helper = " частичному"
        }

        result_paragraph = paragraph.replaceAll("partly_helper", partly_helper)
        result_paragraph = result_paragraph.replaceAll("total_summ", makeRubText_genitive(total_summ))

    } else if (total_data_keys == "Финансовая организация уведомила Заявителя об отсутствии оснований для признания заявленного случая страховым") {

        let date = appToFo[0].refusal[0].date.value
        result_paragraph = paragraph.replaceAll("date", date)
        let number = appToFo[0].refusal[0].number.value
        result_paragraph = result_paragraph.replaceAll("number", number)

    } else if (total_data_keys == "Согласно сведениям с официального сайта Финансовой организации") {

        let site = $('#fo_site').val()
        result_paragraph = paragraph.replaceAll("site", site)

    } else if (total_data_keys == "Таким образом, Закон № 40-ФЗ и Правила ОСАГО не содержат требований, обязывающих участников ДТП привлекать аварийных комиссаров") {

        result_paragraph = paragraph.replaceAll("avarkom_summ", makeRubText_genitive(claim_to_fu_summ))

    } else if (total_data_keys == "Заявителем понесены расходы на оплату услуг по эвакуации ТС") {
        let evacuation_pay_date, evacuation_pay_summ, evacuation_pay_order_name, evacuation_pay_order_number
        for (let i = 0; i < claimsContract[0].claimObjects.length; i++) {
            if (claimsContract[0].claimObjects[i].type == "Эвакуатор") {
                evacuation_pay_date = claimsContract[0].claimObjects[i].ev_date
                evacuation_pay_summ = makeRubText_genitive(claimsContract[0].claimObjects[i].summ)
                evacuation_pay_order_ground_helper.evacuation_pay_order_ground_helper.forEach(element => {
                    if (claimsContract[0].claimObjects[i].ev_ground == element.evacuation_pay_order_ground) {
                        evacuation_pay_order_name = element.evacuation_pay_order_ground_genitive
                    }
                })
                evacuation_pay_order_number = claimsContract[0].claimObjects[i].ev_number
            }
        }
        result_paragraph = paragraph.replaceAll("place_dtp", dtpData.place_dtp)
        result_paragraph = result_paragraph.replaceAll("evacuation_pay_date", evacuation_pay_date)
        result_paragraph = result_paragraph.replaceAll("evacuation_pay_summ", evacuation_pay_summ)
        result_paragraph = result_paragraph.replaceAll("evacuation_pay_order_name", evacuation_pay_order_name)
        result_paragraph = result_paragraph.replaceAll("evacuation_pay_order_number", evacuation_pay_order_number)

    } else if (total_data_keys == "Учитывая вышеизложенное, требование Заявителя о взыскании расходов на оплату услуг по эвакуации ТС") {
        let evacuation_pay_summ
        for (let i = 0; i < claimsContract[0].claimObjects.length; i++) {
            if (claimsContract[0].claimObjects[i].type == "Эвакуатор") {
                evacuation_pay_summ = makeRubText_genitive(claimsContract[0].claimObjects[i].summ)
            }
        }
        result_paragraph = paragraph.replaceAll("evacuation_pay_summ", evacuation_pay_summ)

    } else {
        result_paragraph = paragraph
    }

    result_paragraph = result_paragraph.replaceAll("  ", " ")

    return result_paragraph
}