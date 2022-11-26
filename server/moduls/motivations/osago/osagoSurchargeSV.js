import { expertiseQuestions } from "../../objects/allExpertiseQuestions"
import { conclusive_agreement_paragraph, 
         fu_expertise_paragraph, 
         with_parts_wear_paragraph, 
         ten_percent_paragraph,
         total_paragraph,
         form_choice_paragraph,
         form_change_paragraph,
         max_summ_paragraph,
         form_change_conclusion_paragraph,
         total_count_paragraph,
         ten_percent_motive_paragraph,
         conclusion_paragraph } from "../normsOfLaw/normsOfLaw_osagoSurchargeSV";

export function osagoSurchargeSV(main_claim_osago_sv, appToFo, paymentVoluntary, fuExpertise, max_summ, date_dtp) {
    let main_paragraph = ""

    //Определение общей суммы выплаты ФО
    let total_summ_payment = 0
    for (let i = 0; i < paymentVoluntary.length; i++) {
        if (paymentVoluntary[i].type.options.selectedIndex == 1) {
            total_summ_payment = total_summ_payment + paymentVoluntary[i].summ
        }
    }

    //Определение суммы страхового возмещения на основании НТЭ ФУ
    let satisfaction_summ = 0
    //Если произошла тотальная гибель ТС
    if (fuExpertise[0].summ_without > fuExpertise[0].summ_market) {
        satisfaction_summ = fuExpertise[0].summ_market = fuExpertise[0].summ_leftovers
    //Если полной гибели не было
    } else {
        satisfaction_summ = fuExpertise[0].summ_with
    }

    //Определение процента
    let percentage = 0
    percentage = Math.round((satisfaction_summ - total_summ_payment) / total_summ_payment * 100)
    if (percentage < 0) {
        percentage = 0
    }

    //Если нет ни тотала, ни превышения над страховой суммой
    if (fuExpertise[0].summ_without <= max_summ && fuExpertise[0].summ_market > fuExpertise[0].summ_without) {
        // console.log("Если нет ни тотала, ни превышения над страховой суммой")
        main_paragraph = `${conclusive_agreement_paragraph}
                          ${fu_expertise_paragraph (date_dtp, fuExpertise, expertiseQuestions)}
                          ${with_parts_wear_paragraph}
                          ${ten_percent_paragraph(percentage)}
                          ${ten_percent_motive_paragraph (date_dtp, fuExpertise, percentage, total_summ_payment)}
                          ${conclusion_paragraph (fuExpertise, percentage, total_summ_payment, main_claim_osago_sv, satisfaction_summ)}`
    //Если превышения над страховой суммой нет, но есть тотал
    } else if (fuExpertise[0].summ_without <= max_summ && fuExpertise[0].summ_market <= fuExpertise[0].summ_without) {
        // console.log("Если превышения над страховой суммой нет, но есть тотал")
        main_paragraph = `${fu_expertise_paragraph (date_dtp, fuExpertise, expertiseQuestions)}
                          ${ten_percent_paragraph (percentage)}
                          ${total_paragraph}
                          ${form_choice_paragraph (appToFo)}
                          ${form_change_paragraph (fuExpertise, max_summ)}
                          ${form_change_conclusion_paragraph (fuExpertise, max_summ)}
                          ${total_count_paragraph (fuExpertise, total_summ_payment)}
                          ${ten_percent_motive_paragraph (date_dtp, fuExpertise, percentage, total_summ_payment)}
                          ${conclusion_paragraph (fuExpertise, percentage, total_summ_payment, main_claim_osago_sv, satisfaction_summ)}`
    //Если есть превышение над страховой суммой, но тотала нет
    } else if (fuExpertise[0].summ_without > max_summ && fuExpertise[0].summ_market > fuExpertise[0].summ_without) {
        // console.log("Если есть превышение над страховой суммой, но тотала нет")
        main_paragraph = `${fu_expertise_paragraph (date_dtp, fuExpertise, expertiseQuestions)}
                          ${with_parts_wear_paragraph}
                          ${ten_percent_paragraph (percentage)}
                          ${form_choice_paragraph (appToFo)}
                          ${form_change_paragraph (fuExpertise, max_summ)}
                          ${max_summ_paragraph ()}
                          ${form_change_conclusion_paragraph (fuExpertise, max_summ)}
                          ${ten_percent_motive_paragraph (date_dtp, fuExpertise, percentage, total_summ_payment)}
                          ${conclusion_paragraph (fuExpertise, percentage, total_summ_payment, main_claim_osago_sv, satisfaction_summ)}`
    //Если есть превышение над страховой суммой, и тотал тоже
    } else if (fuExpertise[0].summ_without > max_summ && fuExpertise[0].summ_market <= fuExpertise[0].summ_without) {
        // console.log("Если есть превышение над страховой суммой, и тотал тоже")
        main_paragraph = `${fu_expertise_paragraph (date_dtp, fuExpertise, expertiseQuestions)}
                          ${ten_percent_paragraph (percentage)}
                          ${total_paragraph}
                          ${form_choice_paragraph (appToFo)}
                          ${form_change_paragraph (fuExpertise, max_summ)}
                          ${max_summ_paragraph ()}
                          ${form_change_conclusion_paragraph (fuExpertise, max_summ)}
                          ${total_count_paragraph (fuExpertise, total_summ_payment)}
                          ${ten_percent_motive_paragraph (date_dtp, fuExpertise, percentage, total_summ_payment)}
                          ${conclusion_paragraph (fuExpertise, percentage, total_summ_payment, main_claim_osago_sv, satisfaction_summ)}`
    }

    return main_paragraph
}