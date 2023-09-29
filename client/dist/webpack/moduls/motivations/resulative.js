import { makeRubText_genitive } from '../makeRubText_genitive.js';
import { allClaims } from "../objects/allClaims.js";
import { DATE_FZ_123_START } from "../variables";
import { changeDateType } from '../changeDateType.js';
import { evacuation_route_helper } from '../objects/helpers.js';

export function make_resulative_paragraph(total_penalty_summ_accrued,
                                          total_penalty_summ_paid,
                                          max_summ,
                                          totalData,
                                          data_from_db,
                                          result,
                                          all_found_claims,
                                          total_penalty_summ,
                                          app_name,
                                          main_claims_all_paragraph) {

    let resulative_part = ""
    let partly = ""
    let partly_boolean = false
    let all_not_found_claims = []
    let found_claims_boolean
    //Перебор всех договоров, по которым заявлены требования к ФУ
    for (let i = 0; i < totalData.claimsToFuData.claimsContractAll.length; i++) {
        //Перебор всех требований, заявленных к ФУ
        for (let j = 0; j < totalData.claimsToFuData.claimsContractAll[i].claim.length; j++) {
            //Проверка на соблюдение досудебного порядка
            totalData.claimsToFuData.claimsContractAll[i].claim[j].order = false
            let count_claim = 0
            let order_boolean = false
            //Подсчет количества обращений с требованиями о выплате УТС? Эвакуатора и Хранения
            if (totalData.claimsToFuData.claimsContractAll[i].claim[j].type == "УТС" ||
                totalData.claimsToFuData.claimsContractAll[i].claim[j].type == "Эвакуатор" ||
                totalData.claimsToFuData.claimsContractAll[i].claim[j].type == "Хранение") {
                for (let k = 0; k < totalData.appToFoData.appToFoAll.length; k++) {
                    for (let l = 0; l < totalData.appToFoData.appToFoAll[k].claimsContractToFo.length; l++) {
                        if (totalData.appToFoData.appToFoAll[k].claimsContractToFo[l].type == totalData.claimsToFuData.claimsContractAll[i].type) {
                            for (let m = 0; m < totalData.appToFoData.appToFoAll[k].claimsContractToFo[l].claim.length; m++) {
                                if (totalData.appToFoData.appToFoAll[k].claimsContractToFo[l].claim[m].type == totalData.claimsToFuData.claimsContractAll[i].claim[j].type) {
                                    count_claim++
                                }
                            }
                        }
                    }
                }
            }
            
            //Определения обращения с требованием после 01.06.2019
            for (let k = 1; k < totalData.appToFoData.appToFoAll.length; k++) {
                let date = Date.parse(changeDateType(totalData.appToFoData.appToFoAll[k].appDate) + 'T00:00:00')
                if (totalData.appToFoData.appToFoAll[k].type == "Претензия" &&
                    date >= DATE_FZ_123_START) {
                    for (let l = 0; l < totalData.appToFoData.appToFoAll[k].claimsContractToFo.length; l++) {
                        if (totalData.appToFoData.appToFoAll[k].claimsContractToFo[l].type == totalData.claimsToFuData.claimsContractAll[i].type) {
                            for (let m = 0; m < totalData.appToFoData.appToFoAll[k].claimsContractToFo[l].claim.length; m++) {
                                if (totalData.appToFoData.appToFoAll[k].claimsContractToFo[l].claim[m].type == totalData.claimsToFuData.claimsContractAll[i].claim[j].type) {
                                    order_boolean = true
                                }
                            }
                        }
                    }
                }
            }

            //Если УТС, Эвакуатор и хранение, то нужно обратиться 2 раза и более и один раз после 01.06.2019
            if (totalData.claimsToFuData.claimsContractAll[i].claim[j].type == "УТС" ||
                totalData.claimsToFuData.claimsContractAll[i].claim[j].type == "Эвакуатор" ||
                totalData.claimsToFuData.claimsContractAll[i].claim[j].type == "Хранение") {
                if (count_claim > 1 && order_boolean) {
                    totalData.claimsToFuData.claimsContractAll[i].claim[j].order = true
                } 
            } else if (order_boolean) {
                totalData.claimsToFuData.claimsContractAll[i].claim[j].order = true
            }
        }
    }

    let claims_order_helper = ""
    let claims_refuse_helper = ""
    let claims_refuse_boolean = false
    let claims_order_boolean = false
    //Перебор всех договоров, по которым заявлены требования к ФУ
    for (let i = 0; i < totalData.claimsToFuData.claimsContractAll.length; i++) {
        //Перебор всех требований, заявленных к ФУ
        for (let j = 0; j < totalData.claimsToFuData.claimsContractAll[i].claim.length; j++) {
            if (totalData.claimsToFuData.claimsContractAll[i].claim[j].order == false) {
                for (let k = 0; k < all_found_claims.length; k++) {
                    if (totalData.claimsToFuData.claimsContractAll[i].type == all_found_claims[k].contract &&
                        totalData.claimsToFuData.claimsContractAll[i].claim[j].type == all_found_claims[k].name) {
                            all_found_claims[k].result = "ПРЕКРАТИТЬ"
                    }
                }
                allClaims.claims.forEach(element => {
                    if (totalData.claimsToFuData.claimsContractAll[i].claim[j].type == element.claim) {
                        claims_order_helper = claims_order_helper + `${element.short}, `
                    }
                })
                claims_order_boolean = true
            } else {
                found_claims_boolean = false
                //Перебор всех требований, которые алгоритм смог идентифицировать и прописать мотивировочную часть
                for (let k = 0; k < all_found_claims.length; k++) {
                    if (totalData.claimsToFuData.claimsContractAll[i].type == all_found_claims[k].contract &&
                        totalData.claimsToFuData.claimsContractAll[i].claim[j].type == all_found_claims[k].name) {
                        if (all_found_claims[k].result == "ОТКАЗАТЬ") {
                            allClaims.claims.forEach(element => {
                                if (all_found_claims[k].name == element.claim) {
                                    claims_refuse_helper = claims_refuse_helper + `${element.short}, `
                                }
                            })
                            claims_refuse_boolean = true
                        }
                        //Если взыскано больше, чем заявлялось
                        if (totalData.claimsToFuData.claimsContractAll[i].claim[j].summ > all_found_claims[k].summ) {
                            partly_boolean = true
                        }
                        found_claims_boolean = true
                        break
                    }
                }
            }
            //Создание массива объектов требований, которые не были идентифицированы алгоритмом
            // if (!found_claims_boolean) {
            //     all_not_found_claims.push({
            //         result : "unknown",
            //         contract : totalData.claimsToFuData.claimsContractAll[i].type,
            //         name : totalData.claimsToFuData.claimsContractAll[i].claim[j].type,
            //         summ: totalData.claimsToFuData.claimsContractAll[i].claim[j].summ,
            //     })
            // }
        }
    }

    if (result == "УДОВЛЕТВОРИТЬ") {
        if (claims_refuse_boolean || partly_boolean || claims_order_boolean) {
            partly = " частично"
        }
        let claim_count = "требование"
        if (all_found_claims > 1) {
            claim_count = "требования"
        }
        resulative_part = resulative_part + `<p>${claim_count} ${app_name} о взыскании с Финансовой организации 
        ${main_claims_all_paragraph} удовлетворить${partly}.</p>`

        let claims_satisfied_helper = ""
        //Добавление фразы про взыскание страхового возмещения
        for (let i = 0; i < all_found_claims.length; i++) {
            if (all_found_claims[i].name == "Страховое возмещение" && all_found_claims[i].result == "УДОВЛЕТВОРИТЬ") {
                claims_satisfied_helper = `страховое возмещение по Договору ОСАГО в размере 
                ${makeRubText_genitive(all_found_claims[i].summ)}, `
            }
        }
        //Добавление фразы про взыскание неустойки
        if (total_penalty_summ > 0) {
            claims_satisfied_helper = claims_satisfied_helper + `неустойку за несоблюдение срока выплаты страхового возмещения 
            по Договору ОСАГО в размере ${makeRubText_genitive(total_penalty_summ)}, `
        }
        
        let ev_route_text = "";
        let ev_route
         //Добавление фразы про взыскание остальных удовлетворенных требований
        for (let i = 0; i < all_found_claims.length; i++) {
            if (all_found_claims[i].name != "Страховое возмещение" && 
                all_found_claims[i].name != "Неустойка" && 
                all_found_claims[i].result == "УДОВЛЕТВОРИТЬ") {
                allClaims.claims.forEach(element => {
                    if (all_found_claims[i].name == element.claim) {
                        //Добавление маршрута эвакуации ТС
                        if (all_found_claims[i].name == "Эвакуатор") {
                            for (let j = 0; j < totalData.claimsToFuData.claimsContractAll.length; j++) {
                                if (totalData.claimsToFuData.claimsContractAll[j].type == "ОСАГО") {
                                    for (let k = 0; k < totalData.claimsToFuData.claimsContractAll[j].claim.length; k++) {
                                        if (totalData.claimsToFuData.claimsContractAll[j].claim[k].type == "Эвакуатор") {
                                            ev_route = totalData.claimsToFuData.claimsContractAll[j].claim[k].ev_route
                                        }
                                    }
                                }
                            }
                            evacuation_route_helper.evacuation_route_helper.forEach((element) => {
                                if (ev_route == element.evacuation_route) {
                                ev_route_text = " " + element.evacuation_route_genitive;
                                }
                            });
                        } else {
                            ev_route_text = ""
                        }
                        claims_satisfied_helper = claims_satisfied_helper + `${element.res}${ev_route_text} в размере 
                        ${makeRubText_genitive(all_found_claims[i].summ)}, `
                    }
                })
            }
        }

        if (claims_order_boolean) {
            claims_order_helper = claims_order_helper.slice(0, -2)
            claims_order_helper = `<p>Требование ${app_name} о взыскании с Финансовой организации 
            ${claims_order_helper} оставить без рассмотрения.</p>`
        }

        //Формирование абзаца про отказ в удовлетворении требований
        if (claims_refuse_boolean) {
            claims_refuse_helper = claims_refuse_helper.slice(0, -2)
            claims_refuse_helper = `<p>В удовлетворении требования ${app_name} о взыскании с Финансовой организации 
            ${claims_refuse_helper} отказать.</p>`
        } else if (partly) {
            claims_refuse_helper = `<p>В удовлетворении остальных требований ${app_name} отказать.</p>`
        }

        claims_satisfied_helper = claims_satisfied_helper.slice(0, -2)

        resulative_part = resulative_part + `<p>Взыскать с Финансовой организации в пользу ${app_name} 
        ${claims_satisfied_helper}.</p>${claims_order_helper}${claims_refuse_helper}`
    } else if (result == "ОТКАЗАТЬ") {

        if (claims_order_boolean) {
            claims_order_helper = claims_order_helper.slice(0, -2)
            claims_order_helper = `<p>Требование ${app_name} о взыскании с Финансовой организации 
            ${claims_order_helper} оставить без рассмотрения.</p>`
        }

        resulative_part = resulative_part + `<p>в удовлетворении требования ${app_name} о взыскании с Финансовой организации 
        ${main_claims_all_paragraph} отказать.</p>${claims_order_helper}`
    } else if (result == "ПРЕКРАТИТЬ") {
        resulative_part = resulative_part + `<p>прекратить рассмотрение Обращения ${app_name} на основании пункта 1 части 1 
        статьи 27 Закона № 123-ФЗ.</p>`
    }

    resulative_part = resulative_part + `<p>Решение вступает в силу по истечении десяти рабочих дней после даты его подписания.</p>`

    if (result == "УДОВЛЕТВОРИТЬ") {
        resulative_part = resulative_part + `<p>Решение подлежит исполнению Финансовой организацией в течение 10 рабочих дней после дня вступления в силу.</p>`
    }

    resulative_part = resulative_part + `<p>В случае несогласия с решением Финансового уполномоченного в соответствии с частью 1 
    статьи 26 Закона № 123-ФЗ Финансовая организация вправе в течение десяти рабочих дней после дня вступления в силу решения 
    Финансового уполномоченного обратиться в суд в порядке, установленном законодательством Российской Федерации. В случае 
    обращения финансовой организации в суд копия заявления подлежит направлению финансовому уполномоченному, рассматривавшему 
    дело, и потребителю финансовых услуг, в отношении обращения которого принято решение Финансового уполномоченного, в течение 
    одного дня со дня подачи указанного заявления.</p>`

    if (result == "УДОВЛЕТВОРИТЬ") {
        resulative_part = resulative_part + `<p>В соответствии с частью 2 статьи 26 Закона № 123-ФЗ финансовая организация при 
        обращении в суд вправе направить финансовому уполномоченному ходатайство о приостановлении исполнения его решения. 
        При получении ходатайства финансовый уполномоченный выносит решение о приостановлении исполнения решения, которое 
        оспаривается финансовой организацией, до вынесения решения судом.</p>`
    }

    resulative_part = resulative_part + `<p>В случае несогласия с вступившим в силу решением Финансового уполномоченного Заявитель 
    в соответствии с частью 3 статьи 25 Закона № 123-ФЗ вправе в течение тридцати дней после дня вступления указанного 
    решения обратиться в суд и заявить требования к финансовой организации по предмету, содержащемуся в обращении, в порядке, 
    установленном законодательством Российской Федерации. Копия обращения в суд подлежит направлению Финансовому уполномоченному.</p>`

    if (result == "ПРЕКРАТИТЬ") {
        resulative_part = resulative_part + `<p>В соответствии с частью 7 статьи 16 Закона № 123-ФЗ потребитель финансовых услуг 
        вправе повторно направить обращение финансовому уполномоченному в порядке, предусмотренном Законом № 123-ФЗ.</p>`
    }

    resulative_part = resulative_part.replaceAll("\r\n", "")
    resulative_part = resulative_part.replaceAll("\r", "")
    resulative_part = resulative_part.replaceAll("\n", "")

    return resulative_part

}