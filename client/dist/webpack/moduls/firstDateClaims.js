import { changeDateType } from './changeDateType.js';
import { formatDate } from "./formatDate";


class ClaimToFo {

    id

    type
    summ
    from
    to
    without
    pdf

    constructor (id, type, summ, from, to, without, pdf){
        this.id = id
        this.type = type
        this.summ = Number(summ.value.replace(/\s+/g, ''))
        this.from = from
        this.to = to
        this.without = without
        this.pdf = pdf
    }

    getFromDate() {return Date.parse(changeDateType(this.from.value) + 'T00:00:00');}
    getFromDateFormatted() { return formatDate(new Date(this.getFromDate())); }
    getToDate() {return Date.parse(changeDateType(this.to.value) + 'T00:00:00');}
    getToDateFormatted() { return formatDate(new Date(this.getToDate())); }
}

class ClaimsContractToFo {

    app_id
    contract_id

    type
    claim = []

    constructor (app_id, contract_id, type) {

        this.app_id = app_id;
        this.contract_id = contract_id;
        this.type = type.value

        var number_of_claims = $(`.apps_to_fo_claim_${app_id}_${contract_id}`).length;
        var types = $(`.apps_to_fo_claim_type_${app_id}_${contract_id}`)
        var summs = $(`.apps_to_fo_claim_summ_${app_id}_${contract_id}`)
        var froms = $(`.date_apps_to_fo_claim_from_${app_id}_${contract_id}`)
        var tos = $(`.date_apps_to_fo_claim_to_${app_id}_${contract_id}`)
        var without_periods = $(`.apps_to_fo_claim_without_period_${app_id}_${contract_id}`)
        var pdfs = $(`.apps_to_fo_claim_pdf_${app_id}_${contract_id}`)
        for (let i = 0; i < number_of_claims; i++) {
            this.claim[i] = new ClaimToFo(i + 1,
                                          types[i],
                                          summs[i],
                                          froms[i],
                                          tos[i],
                                          without_periods[i],
                                          pdfs[i])
        }
    }
}

export class FirstDateClaim {

    id
    appDate

    claimsContractToFoInfo
    claimsContractToFo = []

    constructor (id, appDate, claimsContractToFoInfo) {
        this.id = id
        this.appDate = appDate

        this.claimsContractToFoInfo = claimsContractToFoInfo

        var number_of_apps_to_fo_claims_contracts = $(`.apps_to_fo_claims_contract_${id}`).length
        var apps_to_fo_claims_contract_type = $(`.apps_to_fo_claims_contract_type_${id}`)

        for (var i = 0; i < number_of_apps_to_fo_claims_contracts; i++) {
            this.claimsContractToFo[i] = new ClaimsContractToFo(id,
                                                           i + 1,
                                                           apps_to_fo_claims_contract_type[i])
        }
    }

    getAppDate() {return Date.parse(changeDateType(this.appDate.value) + 'T00:00:00');}
    getAppDateFormatted() { return formatDate(new Date(this.getAppDate())); }

    toString() {
        return `${this.id}`
    }

}