import { formatDate } from '../../formatDate';

export let inssurance_agreement_paragraph = `<p>Согласно абзацу восьмому пункта 1 статьи 1 Закона № 40-ФЗ договор обязательного 
страхования гражданской ответственности владельцев транспортных средств – договор страхования, по которому страховщик 
обязуется за обусловленную договором плату (страховую премию) при наступлении предусмотренного в договоре события 
(страхового случая) возместить потерпевшим причиненный вследствие этого события вред их жизни, здоровью или имуществу 
(осуществить страховое возмещение в форме страховой выплаты или путем организации и (или) оплаты восстановительного ремонта 
поврежденного транспортного средства) в пределах определенной договором суммы (страховой суммы).</p>`

//Абзац для экспертизы ФУ
export function fu_expertise_paragraph (date_dtp, fuExpertise, expertiseQuestions) {
    let text = ""
    let paragraphs = []

    let date_dtp_formatted = formatDate(new Date(date_dtp))

    paragraphs[0] = `<p>Согласно части 10 статьи 20 Закона № 123-ФЗ финансовый уполномоченный вправе организовывать проведение независимой 
    экспертизы (оценки) по предмету спора для решения вопросов, связанных с рассмотрением обращения.</p>`

    //Определение выводов эксперта ФУ
    let question_paragraph = ""
    let expertises_summ_paragraph = ""
    let expertises_summ_paragraph_helper = ""
    for (let i = 0; i < fuExpertise.length; i++) {

        //Определение вопросов эксперту ФУ
        expertiseQuestions.questions.forEach(element => {
            if (fuExpertise[i].typical_question.value == element.type) {
                question_paragraph = element.question
            }
        })

        //Определение выводов эксперта ФУ
        expertises_summ_paragraph_helper = ""
        //Если повреждения не соответствуют ДТП
        if (fuExpertise[i].trasa_results.options.selectedIndex == 3) {
            //Если в текстовом поле занесены результаты вручную
            if (fuExpertise[i].trasa.value != "") {
                expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `${fuExpertise[i].trasa.value}, `
            //Если в текстовом поле ничего не занесено, добавляется стандартная мотивировка
            } else {
                expertises_summ_paragraph_helper = `повреждения Транспортного средства не соответствуют заявленным обстоятельствам 
                ДТП, произошедшего ${date_dtp_formatted}, `
            }
        } else {
            
        }
        
        if (fuExpertise[i].summ_without != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость восстановительного ремонта 
            Транспортного средства Заявителя без учета износа составила ${fuExpertise[i].summ_without_text}, `
        }
        if (fuExpertise[i].summ_without != 0) {
            if (fuExpertise[i].summ_with != 0) {
                expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `c учетом износа – ${fuExpertise[i].summ_with_text}, `
            }
        } else {
            if (fuExpertise[i].summ_with != 0) {
                expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость восстановительного ремонта 
                Транспортного средства Заявителя с учетом износа составила ${fuExpertise[i].summ_with_text}, `
            }
        }
        
        if (fuExpertise[i].summ_market != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `средняя рыночная стоимость 
            Транспортного средства до повреждения по состоянию на дату ДТП составляла ${fuExpertise[i].summ_market_text}, `
        }
        if (fuExpertise[i].summ_leftovers != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость годных остатков – ${fuExpertise[i].summ_leftovers_text}, `
        }
        if (fuExpertise[i].summ_uts != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `сумма УТС составила ${fuExpertise[i].summ_uts_text}, `
        }
        expertises_summ_paragraph_helper = expertises_summ_paragraph_helper.slice(0, -2)

        expertises_summ_paragraph = `<p>Согласно выводам заключения эксперта ${fuExpertise[i].organization.value} от 
        ${fuExpertise[i].getFuExpertiseDateFormatted()} № ${fuExpertise[i].number.value} (далее – Заключение эксперта) 
        ${expertises_summ_paragraph_helper}.</p>`

        paragraphs[i + 1] = `<p>Для решения вопросов, связанных с рассмотрением Обращения, Финансовым уполномоченным 
        в соответствии с пунктом 10 статьи 20 Закона № 123-ФЗ назначено проведение независимой транспортно - трасологической экспертизы в 
        ${fuExpertise[i].organization.value} (эксперт-техник ${fuExpertise[i].technician.value}).</p>
        <p>Вопросы, подлежащие разрешению экспертом в рамках проводимого им исследования:</p>
        ${question_paragraph}
        ${expertises_summ_paragraph}`
    }

    paragraphs.forEach(element => {
        text = text + element
    })

    return text
}

//Абзац про вывод о наступлении или ненаступлении страхового случая
export function insurance_case_paragraph (date_dtp, fuExpertise) {
    let text = ""
    let date_dtp_formatted = formatDate(new Date(date_dtp))

    if (fuExpertise[0].trasa_results.options.selectedIndex == 3) {
        text = `<p>Таким образом, Финансовый уполномоченный приходит к выводу о ненаступлении страхового случая по Договору ОСАГО 
        вследствие ДТП от ${date_dtp_formatted}.<p>`
    } else {
        text = `<p>Таким образом, Финансовый уполномоченный приходит к выводу о наступлении страхового случая по Договору ОСАГО 
        вследствие ДТП от ${date_dtp_formatted}.<p>`
    }

    return text
}

//Абзац про вывод о наступлении или ненаступлении страхового случая
export function conclusion_paragraph (fuExpertise) {
    let text = ""

    if (fuExpertise[0].trasa_results.options.selectedIndex == 3) {
        text = `<p>Учитывая указанные выводы Заключения эксперта, а также при отсутствии иных доказательств, требование 
        Заявителя о взыскании страхового возмещения по Договору ОСАГО удовлетворению не подлежит.<p>`
    } else {
        
    }

    return text
}