import { expertiseQuestions } from "../../objects/allExpertiseQuestions"
import { inssurance_agreement_paragraph, 
         fu_expertise_paragraph,
         insurance_case_paragraph,
         conclusion_paragraph } from "../normsOfLaw/normsOfLaw_osagoRefusalSvTrasa";

export function osagoRefusalSvTrasa(fuExpertise, date_dtp) {
    let main_paragraph = ""

    main_paragraph = `${inssurance_agreement_paragraph}
                      ${fu_expertise_paragraph (date_dtp, fuExpertise, expertiseQuestions)}
                      ${insurance_case_paragraph (date_dtp, fuExpertise)}
                      ${conclusion_paragraph (fuExpertise)}`

    return main_paragraph
}