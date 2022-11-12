import { changeDateType } from './changeDateType.js';
import { makeRubText_genitive } from "./makeRubText_genitive";
import { formatDate } from "./formatDate";

export class FuExpertise {

    id
    date
    number
    organization

    summ_without
    summ_with
    summ_market
    summ_leftovers
    summ_uts
    trasa
    trasa_results

    summ_without_text
    summ_with_text
    summ_market_text
    summ_leftovers_text
    summ_uts_text

    technician
    typical_question
    question

    constructor (id, date, number, organization, 
                 summ_without, summ_with, summ_market, summ_leftovers, summ_uts, trasa, trasa_results,
                 technician, typical_question, question) {
        this.id = id
        this.date = date
        this.number = number
        this.organization = organization
        this.summ_without = Number(summ_without.value.replace(/\s+/g, ''))
        this.summ_without_text = makeRubText_genitive(this.summ_without)
        this.summ_with = Number(summ_with.value.replace(/\s+/g, ''))
        this.summ_with_text = makeRubText_genitive(this.summ_with)
        this.summ_market = Number(summ_market.value.replace(/\s+/g, ''))
        this.summ_market_text = makeRubText_genitive(this.summ_market)
        this.summ_leftovers = Number(summ_leftovers.value.replace(/\s+/g, ''))
        this.summ_leftovers_text = makeRubText_genitive(this.summ_leftovers)
        this.summ_uts = Number(summ_uts.value.replace(/\s+/g, ''))
        this.summ_uts_text = makeRubText_genitive(this.summ_uts)
        this.trasa = trasa
        this.trasa_results = trasa_results
        this.technician = technician
        this.typical_question = typical_question
        this.question = question
    }

    getFuExpertiseDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
    getFuExpertiseDateFormatted() { return formatDate(new Date(this.getFuExpertiseDate())); }

    setObject() {
        return {
            date : this.date.value,
            number : this.number.value,
            organization : this.organization.value,

            summ_without : this.summ_without,
            summ_with : this.summ_with,
            summ_market : this.summ_market,
            summ_leftovers : this.summ_leftovers,
            summ_uts : this.summ_uts,
            trasa : this.trasa.value,
            trasa_results : this.trasa_results.value,
            technician : this.technician.value,
            typical_question : this.typical_question.value,
            question : this.question.value,
        }
    }
}