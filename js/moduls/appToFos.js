import { changeDateType } from './changeDateType.js';
import { makeRubText_genitive } from "./makeRubText_genitive";
import { formatDate } from "./formatDate";
import { inclineFirstname, inclineLastname, inclineMiddlename, getLastnameGender } from 'lvovich';
import { PaymentVoluntary } from "./payment_voluntary";
import { allClaims } from './objects/allClaims';
import { ClaimsContract } from "./mainClaim";
import { DATE_FZ_123_START } from "./variables";
import { findLastClaimFoDay } from "./findLastClaimFoDay";
import { confirmation_type_helper } from "./objects/helpers";

class ClaimToFo {

    id

    type
    type_text
    type_text_full
    summ
    summ_text
    from
    to
    without
    pdf

    constructor (id, type, summ, from, to, without, pdf){
        this.id = id
        this.type = type
        this.summ = Number(summ.value.replace(/\s+/g, ''))
        this.summ_text = makeRubText_genitive(this.summ)
        this.from = from
        this.to = to
        this.without = without
        this.pdf = pdf

        allClaims.claims.forEach(element => {
            
            if (this.type.value == element.claim) {
                this.type_text = element.short
            }
        })
    }

    getFromDate() {return Date.parse(changeDateType(this.from.value) + 'T00:00:00');}
    getFromDateFormatted() { return formatDate(new Date(this.getFromDate())); }
    getToDate() {return Date.parse(changeDateType(this.to.value) + 'T00:00:00');}
    getToDateFormatted() { return formatDate(new Date(this.getToDate())); }

    setObject() {
        return {
            type : this.type.value,
            summ : this.summ,
            from : this.from.value,
            to : this.to.value,
            without : this.without.checked,
            pdf : this.pdf.checked,
        }
    }
}

class ClaimsContractToFo {

    app_id
    contract_id

    type
    claim = []
    claimObjects = []
    claims_all

    constructor (app_id, contract_id, type) {

        this.app_id = app_id;
        this.contract_id = contract_id;
        this.type = type.value
        this.claims_all = ""

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
            this.claimObjects[i] = this.claim[i].setObject()
            
            var current_claim_summ = ""
            if (this.claim[i].summ != 0) {
                current_claim_summ = " в размере " + this.claim[i].summ_text
            } else {
                current_claim_summ = ""
            }

            switch (this.claim[i].type.options.selectedIndex) {
                case 2:
                    this.claim[i].type_text_full = "страхового возмещения" + " по договору " + this.type + " " + this.claim[i].type_text + current_claim_summ
                    break;
                case 1:
                    this.claim[i].type_text_full = this.claim[i].type_text + " по договору " + this.type + current_claim_summ
                    break;
                case 5:
                    if (this.claim[i].without.checked) {
                        this.claim[i].type_text_full = this.claim[i].type_text + " по договору " + this.type + current_claim_summ
                    } else if (this.claim[i].pdf.checked) {
                        this.claim[i].type_text_full = this.claim[i].type_text + " по договору " + this.type + " за период с " + this.claim[i].getFromDateFormatted() + " по день фактического исполнения обязательств" + current_claim_summ
                    } else {
                        this.claim[i].type_text_full = this.claim[i].type_text + " по договору " + this.type + " за период с " + this.claim[i].getFromDateFormatted() + " по " + this.claim[i].getToDateFormatted() + current_claim_summ
                    }
                    break;
                default:
                    this.claim[i].type_text_full = this.claim[i].type_text + current_claim_summ
                    break;
            }
            this.claims_all = this.claims_all + " " + this.claim[i].type_text_full + ","
        }
    }

    setObject() {
        return {
            type : this.type,
            claim : this.claimObjects,
        }
    }
}

class ExpertiseApp {

    app_id
    expertise_id
    date
    number
    organization

    summ_without
    summ_with
    summ_market
    summ_leftovers
    summ_uts
    trasa

    summ_without_text
    summ_with_text
    summ_market_text
    summ_leftovers_text
    summ_uts_text

    constructor (app_id, expertise_id, date, number, organization, summ_without, summ_with, summ_market, summ_leftovers, summ_uts, trasa) {
        this.app_id = app_id
        this.expertise_id = expertise_id
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
    }

    getExpertiseDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
    getExpertiseDateFormatted() { return formatDate(new Date(this.getExpertiseDate())); }

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
        }
    }
}

class Agreement {

    app_id
    agreement_phone
    phone_number

    constructor (app_id, agreement_phone, phone_number) {
        this.app_id = app_id
        this.agreement_phone = agreement_phone
        this.phone_number = phone_number
    }
    setObject() {
        return {
            agreement_phone : this.agreement_phone.value,
            phone_number : this.phone_number.value,
        }
    }
}

class Request {

    app_id
    inspection_id
    date
    number
    documents

    constructor (app_id, inspection_id, date, number, documents) {
        this.app_id = app_id
        this.inspection_id = inspection_id
        this.date = date
        this.number = number
        this.documents = documents
    }

    getRequestDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
    getRequestDateFormatted() { return formatDate(new Date(this.getRequestDate())); }

    setObject() {
        return {
            date : this.date.value,
            number : this.number.value,
            documents : this.documents.value,
        }
    }
}

class Inspection {

    app_id
    inspection_id
    date
    number
    organization

    constructor (app_id, inspection_id, date, number, organization) {
        this.app_id = app_id
        this.inspection_id = inspection_id
        this.date = date
        this.number = number
        this.organization = organization
    }

    getInspectionDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
    getInspectionDateFormatted() { return formatDate(new Date(this.getInspectionDate())); }

    setObject() {
        return {
            date : this.date.value,
            number : this.number.value,
            organization : this.organization.value,
        }
    }
}

class Expertise {

    app_id
    expertise_id
    date
    number
    organization

    summ_without
    summ_with
    summ_market
    summ_leftovers
    summ_uts
    trasa

    summ_without_text
    summ_with_text
    summ_market_text
    summ_leftovers_text
    summ_uts_text

    constructor (app_id, expertise_id, date, number, organization, summ_without, summ_with, summ_market, summ_leftovers, summ_uts, trasa) {
        this.app_id = app_id
        this.expertise_id = expertise_id
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
    }

    getExpertiseDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
    getExpertiseDateFormatted() { return formatDate(new Date(this.getExpertiseDate())); }

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
        }
    }
}

class Refusal {

    app_id
    type
    date
    number
    text
    confirmation_type
    confirmation_date
    confirmation_number
    confirmation_post_number

    constructor (app_id, type, date, number, text, confirmation_type, confirmation_date, confirmation_number, confirmation_post_number) {
        this.app_id = app_id
        this.type = type
        this.date = date
        this.number = number
        this.text = text
        this.confirmation_type = confirmation_type
        this.confirmation_date = confirmation_date
        this.confirmation_number = confirmation_number
        this.confirmation_post_number = confirmation_post_number
    }

    getRefusalDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
    getRefusalDateFormatted() { return formatDate(new Date(this.getRefusalDate())); }
    getRefusalConfirmationDate() {return Date.parse(changeDateType(this.confirmation_date.value) + 'T00:00:00');}
    getRefusalConfirmationDateFormatted() { return formatDate(new Date(this.getRefusalConfirmationDate())); }

    setObject() {
        return {
            type : this.type.value,
            date : this.date.value,
            number : this.number.value,
            text : this.text.value,
            confirmation_type : this.confirmation_type.value,
            confirmation_date : this.confirmation_date.value,
            confirmation_number : this.confirmation_number.value,
            confirmation_post_number : this.confirmation_post_number.value,
        }
    }
}

export class AppToFo {

    id
    appDate
    type //Заявление о страховом случае, претензия
    procedure //По ПВУ, в ФО виновника
    type_of_claim //Несогласие с размером, несогласие с отказом в выплате
    method //Лично, по почте
    form
    claim_answer_time_count_days

    app_paragraph
    expertise_apps_paragraph
    app_claim_answer_time_paragraph
    form_paragraph
    agreement_paragraph
    requests_paragraph
    inspections_paragraph
    expertises_paragraph
    answerFo_paragraph

    main_paragraph

    claimsContractToFoInfo
    claimsContractToFo = []
    claimsContractToFoObjects = []

    expertiseAppInfo
    expertiseApps = []
    expertiseAppsObjects = []

    agreementInfo
    agreement
    agreementObjects

    requestInfo
    requests = []
    requestsObjects = []

    inspectionInfo
    inspections = []
    inspectionsObjects = []

    expertiseInfo
    expertises = []
    expertiseObjects = []

    answerFoInfo
    answerFo
    paymentVoluntary = []
    refusal = []
    refusalObjects = []

    claimsContract = []

    constructor (id, 
                appDate,
                type,
                procedure,
                type_of_claim,
                method,
                form,
                claimsContractToFoInfo,
                expertiseAppInfo,
                agreementInfo,
                requestInfo,
                inspectionInfo, 
                expertiseInfo, 
                answerFoInfo,
                answerFo) {

        this.id = id
        this.appDate = appDate

        this.type = type
        this.procedure = procedure
        this.type_of_claim = type_of_claim
        this.method = method
        this.form = form

        this.app_paragraph = ""
        this.expertise_apps_paragraph = ""
        this.app_claim_answer_time_paragraph = ""
        this.agreement_paragraph = ""
        this.form_paragraph = ""
        this.requests_paragraph = ""
        this.inspections_paragraph = ""
        this.expertises_paragraph = ""
        this.main_paragraph = ""
        this.answerFo_paragraph = ""

        this.claimsContractToFoInfo = claimsContractToFoInfo
        this.expertiseAppInfo = expertiseAppInfo
        this.agreementInfo = agreementInfo
        this.requestInfo = requestInfo
        this.inspectionInfo = inspectionInfo
        this.expertiseInfo = expertiseInfo
        this.answerFoInfo = answerFoInfo
        this.answerFo = answerFo
        
        //Создание экземпляров класса Требований, заявленных в данном уведомлении
        var number_of_apps_to_fo_claims_contracts = $(`.apps_to_fo_claims_contract_${id}`).length
        var apps_to_fo_claims_contract_type = $(`.apps_to_fo_claims_contract_type_${id}`)

        for (var i = 0; i < number_of_apps_to_fo_claims_contracts; i++) {
            this.claimsContractToFo[i] = new ClaimsContractToFo(id,
                                                           i + 1,
                                                           apps_to_fo_claims_contract_type[i])
            this.claimsContractToFoObjects[i] = this.claimsContractToFo[i].setObject()
        }

        //Создание экземпляров класса Экспертиз Заявителя
        var number_of_apps_to_fo_expertise_apps = $(`.apps_to_fo_expertise_apps_${id}`).length
        var apps_to_fo_expertise_app_dates = $(`.apps_to_fo_expertise_app_date_${id}`)
        var apps_to_fo_expertise_app_numbers = $(`.apps_to_fo_expertise_app_number_${id}`)
        var apps_to_fo_expertise_app_organizations = $(`.apps_to_fo_expertise_app_organization_${id}`)
        var apps_to_fo_expertise_app_summ_withouts = $(`.apps_to_fo_expertise_app_summ_without_${id}`)
        var apps_to_fo_expertise_app_summ_withs = $(`.apps_to_fo_expertise_app_summ_with_${id}`)
        var apps_to_fo_expertise_app_summ_markets = $(`.apps_to_fo_expertise_app_summ_market_${id}`)
        var apps_to_fo_expertise_app_summ_leftovers = $(`.apps_to_fo_expertise_app_summ_leftovers_${id}`)
        var apps_to_fo_expertise_app_summ_uts = $(`.apps_to_fo_expertise_app_summ_uts_${id}`)
        var apps_to_fo_expertise_app_trasa = $(`.apps_to_fo_expertise_app_trasa_${id}`)

        for (let i = 0; i < number_of_apps_to_fo_expertise_apps; i++) {
            this.expertiseApps[i] = new ExpertiseApp(id,
                                            i + 1,
                                            apps_to_fo_expertise_app_dates[i],
                                            apps_to_fo_expertise_app_numbers[i],
                                            apps_to_fo_expertise_app_organizations[i],
                                            apps_to_fo_expertise_app_summ_withouts[i],
                                            apps_to_fo_expertise_app_summ_withs[i],
                                            apps_to_fo_expertise_app_summ_markets[i],
                                            apps_to_fo_expertise_app_summ_leftovers[i],
                                            apps_to_fo_expertise_app_summ_uts[i],
                                            apps_to_fo_expertise_app_trasa[i])
            this.expertiseAppsObjects[i] = this.expertiseApps[i].setObject()
        }

        //Создание экземпляра класса Согласия на уведомление по СМС
        var apps_to_fo_agreement_phone = $(`.apps_to_fo_agreement_phone_${id}`)
        var apps_to_fo_phone_number = $(`.apps_to_fo_phone_number_${id}`)

        this.agreement = new Agreement(id,
                                       apps_to_fo_agreement_phone[0],
                                       apps_to_fo_phone_number[0])
        this.agreementObjects = this.agreement.setObject()


        //Создание экземпляров класса Осмотров
        var number_of_apps_to_fo_request = $(`.apps_to_fo_requests_${id}`).length
        var apps_to_fo_request_dates = $(`.apps_to_fo_request_date_${id}`)
        var apps_to_fo_request_numbers = $(`.apps_to_fo_request_number_${id}`)
        var apps_to_fo_request_organizations = $(`.apps_to_fo_request_documents_${id}`)

        for (let i = 0; i < number_of_apps_to_fo_request; i++) {
            this.requests[i] = new Request(id,
                                            i + 1,
                                            apps_to_fo_request_dates[i],
                                            apps_to_fo_request_numbers[i],
                                            apps_to_fo_request_organizations[i])
            this.requestsObjects[i] = this.requests[i].setObject()
        }

        //Создание экземпляров класса Осмотров
        var number_of_apps_to_fo_inspection = $(`.apps_to_fo_inspections_${id}`).length
        var apps_to_fo_inspection_dates = $(`.apps_to_fo_inspection_date_${id}`)
        var apps_to_fo_inspection_numbers = $(`.apps_to_fo_inspection_number_${id}`)
        var apps_to_fo_inspection_organizations = $(`.apps_to_fo_inspection_organization_${id}`)

        for (let i = 0; i < number_of_apps_to_fo_inspection; i++) {
            this.inspections[i] = new Inspection(id,
                                            i + 1,
                                            apps_to_fo_inspection_dates[i],
                                            apps_to_fo_inspection_numbers[i],
                                            apps_to_fo_inspection_organizations[i])
            this.inspectionsObjects[i] = this.inspections[i].setObject()
        }
        
        //Создание экземпляров класса Экспертиз
        var number_of_apps_to_fo_expertises = $(`.apps_to_fo_expertises_${id}`).length
        var apps_to_fo_expertise_dates = $(`.apps_to_fo_expertise_date_${id}`)
        var apps_to_fo_expertise_numbers = $(`.apps_to_fo_expertise_number_${id}`)
        var apps_to_fo_expertise_organizations = $(`.apps_to_fo_expertise_organization_${id}`)
        var apps_to_fo_expertise_summ_withouts = $(`.apps_to_fo_expertise_summ_without_${id}`)
        var apps_to_fo_expertise_summ_withs = $(`.apps_to_fo_expertise_summ_with_${id}`)
        var apps_to_fo_expertise_summ_markets = $(`.apps_to_fo_expertise_summ_market_${id}`)
        var apps_to_fo_expertise_summ_leftovers = $(`.apps_to_fo_expertise_summ_leftovers_${id}`)
        var apps_to_fo_expertise_summ_uts = $(`.apps_to_fo_expertise_summ_uts_${id}`)
        var apps_to_fo_expertise_trasa = $(`.apps_to_fo_expertise_trasa_${id}`)

        for (let i = 0; i < number_of_apps_to_fo_expertises; i++) {
            this.expertises[i] = new Expertise(id,
                                            i + 1,
                                            apps_to_fo_expertise_dates[i],
                                            apps_to_fo_expertise_numbers[i],
                                            apps_to_fo_expertise_organizations[i],
                                            apps_to_fo_expertise_summ_withouts[i],
                                            apps_to_fo_expertise_summ_withs[i],
                                            apps_to_fo_expertise_summ_markets[i],
                                            apps_to_fo_expertise_summ_leftovers[i],
                                            apps_to_fo_expertise_summ_uts[i],
                                            apps_to_fo_expertise_trasa[i])
            this.expertiseObjects[i] = this.expertises[i].setObject()
        }

        //Получение массива значений всех переменных добровольных выплат
        var number_of_payments = $(`.payment_${id}`).length; //Получение количества строк с выплатами
        var payments_names = $(`.payments_name_${id}`); //Получение массива видов выплат
        var payments_dates = $(`.payments_date_${id}`); //Получение массива дат выплат
        var payments_orders = $(`.payments_order_${id}`); //Получение массива номеров ПП
        var payments_summs = $(`.payments_summ_${id}`); //Получение массива сумм выплат
        var penalty_ndfls = $(`.penalty_ndfl_${id}`); //Получение массива выплат неустойки с НДФЛ
        var penalty_ndfl_summs = $(`.penalty_ndfl_summ_${id}`); //Получение массива сумм удержанного НДФЛ
        var penalty_ndfl_persents = $(`.penalty_ndfl_persent_${id}`); //Получение массива процентов НДФЛ
        //Создание экземпляров добровольных выплат
        for (var i = 0; i < number_of_payments; i++) {
            this.paymentVoluntary[i] = new PaymentVoluntary(id,
                                                            i + 1,
                                                            payments_names[i],
                                                            payments_dates[i],
                                                            payments_orders[i],
                                                            payments_summs[i],
                                                            penalty_ndfls[i],
                                                            penalty_ndfl_summs[i])
        }

        //Создание экземпляра класса Согласия на уведомление по СМС
        var number_of_apps_to_fo_refusals = $(`.apps_to_fo_refusal_${id}`).length
        var apps_to_fo_refusal_type = $(`.apps_to_fo_refusal_type_${id}`)
        var apps_to_fo_refusal_date = $(`.apps_to_fo_refusal_date_${id}`)
        var apps_to_fo_refusal_number = $(`.apps_to_fo_refusal_number_${id}`)
        var apps_to_fo_refusal_type_trasa_text = $(`.apps_to_fo_refusal_type_trasa_text_${id}`)
        var apps_to_fo_refusal_confirmation = $(`.apps_to_fo_refusal_confirmation_${id}`)
        var apps_to_fo_refusal_confirmation_date = $(`.apps_to_fo_refusal_confirmation_date_${id}`)
        var apps_to_fo_refusal_confirmation_number = $(`.apps_to_fo_refusal_confirmation_number_${id}`)
        var apps_to_fo_refusal_confirmation_post_number = $(`.apps_to_fo_refusal_confirmation_post_number_${id}`)

        for (var i = 0; i < number_of_apps_to_fo_refusals; i++) {
            this.refusal[i] = new Refusal(id,
                                    apps_to_fo_refusal_type[i],
                                    apps_to_fo_refusal_date[i],
                                    apps_to_fo_refusal_number[i],
                                    apps_to_fo_refusal_type_trasa_text[i],
                                    apps_to_fo_refusal_confirmation[i],
                                    apps_to_fo_refusal_confirmation_date[i],
                                    apps_to_fo_refusal_confirmation_number[i],
                                    apps_to_fo_refusal_confirmation_post_number[i])
            this.refusalObjects[i] = this.refusal[i].setObject()
        }

        //Получение массива значений всех требований к ФУ
        var number_of_main_claims_contracts = $('.main_claims_contracts').length
        var claims_contract_types = $('.claims_contract_types')

        for (var i = 0; i < number_of_main_claims_contracts; i++) {
            this.claimsContract[i] = new ClaimsContract(i + 1,
                                                claims_contract_types[i])
        }

        var main_fo_name = document.querySelector("#fo_name").value
        let fo_name_nominative = "Финансовая организация";
        let fo_name_genitive = "Финансовой организации";
        let fo_name_accusative = "Финансовую организацию";
        let fo_name_instrumental = "Финансовой организацией";
        let make_a_payment = " осуществила";
        let fulfill = " исполнила";
        let keep = " удержала";
        let request = "запросила"
        let send = "направила"
        let deny = "отказала"
        let must = "должна"
        let notify = "уведомила"

        //Если ФУ заявлено требований только по одному договору
        if (number_of_main_claims_contracts == 1) {
            //Если ФУ заявлено требование по договору ОСАГО
            if (this.claimsContract[0].type.options.selectedIndex == 1) {
                //Если заявитель обратился с заявлением о страховом возмещении
                if (this.type.options.selectedIndex == 1) {
                    
                    //Формирование процедуры обращения в ФО
                    var procedure_helper = ""
                    if (this.procedure.options.selectedIndex == 1) {
                        procedure_helper = "о прямом возмещении убытков"
                    } else if (this.procedure.options.selectedIndex == 2) {
                        procedure_helper = "о страховом возмещении по Договору ОСАГО"
                    }

                    //Формирование первого параграфа заявления в ФО
                    this.app_paragraph = `<p>${this.getAppDateFormatted()} Заявитель обратился в ${fo_name_accusative} с заявлением 
                    ${procedure_helper}, предоставив все документы, предусмотренные Правилами обязательного 
                    страхования гражданской ответственности владельцев транспортных средств, утвержденными 
                    Положением Банка России от 19.09.2014 № 431-П (далее – Правила ОСАГО).</p>`

                    //Формирование абзаца с формой страхового возмещения
                    if (this.form.options.selectedIndex == 1) {
                        // this.form_paragraph = `<p>В Заявлении указано о выплате безналичным расчетом на банковские реквизиты при 
                        // наличии условий, предусмотренных пунктом 16.1 статьи 12 Закона № 40-ФЗ. К Заявлению приложены банковские 
                        // реквизиты Заявителя.</p>`
                        this.form_paragraph = `<p>В заявлении Заявителем выбрана форма выплаты страхового возмещения – путем 
                        перечисления денежных средств безналичным расчетом.</p>`
                    } else if (this.form.options.selectedIndex == 2) {
                        this.form_paragraph = `<p>В заявлении Заявителем выбрана форма выплаты страхового возмещения – путем 
                        организации и оплаты стоимости восстановительного ремонта на СТОА, с которой у Финансовой организации 
                        заключен договор на проведение восстановительного ремонта.</p>`
                    } else if (this.form.options.selectedIndex == 3) {
                        this.form_paragraph = `<p>В заявлении Заявителем выбрана форма выплаты страхового возмещения – путем 
                        организации и оплаты стоимости восстановительного ремонта на СТОА, выбранной Заявителем.</p>`
                    }

                    //Формирование параграфа с согласием на уведомление по СМС
                    if (this.agreementInfo.options.selectedIndex == 1) {
                        if (this.agreement.agreement_phone.options.selectedIndex == 1) {
                            this.agreement_paragraph = `<p>В заявлении ${procedure_helper} Заявитель дал свое согласие 
                            на получение уведомлений о ходе рассмотрения заявления путем смс-сообщений на номер 
                            телефона ${this.agreement.phone_number.value}.</p>`
                        } else {
                            
                        }
                    }

                    //Формирование параграфа о проведении экспертиз ТС Заявителя
                    if (this.expertiseAppInfo.options.selectedIndex == 1) {
                        var expertiseApps_paragraph_one = ""
                        var expertiseApps_paragraph_helper = ""
                        var expertiseApps_summ_paragraph
                        for (let i = 0; i < this.expertiseApps.length; i++) {

                            if (i == 0) {
                                expertiseApps_paragraph_helper = `К заявлению было приложено`
                            } else if (i == 1) {
                                expertiseApps_paragraph_helper = `Кроме того, Заявитель предоставил`
                            } else {
                                expertiseApps_paragraph_helper = `Также Заявителем предоставлено`
                            }
                            expertiseApps_summ_paragraph = ""
                            if (this.expertiseApps[i].trasa.value != "") {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `${this.expertiseApps[i].trasa.value}, `
                            }
                            if (this.expertiseApps[i].summ_without != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `стоимость восстановительного ремонта 
                                Транспортного средства без учета износа составила ${this.expertiseApps[i].summ_without_text}, `
                            }
                            if (this.expertiseApps[i].summ_with != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `стоимость восстановительного ремонта 
                                Транспортного средства с учетом износа составила ${this.expertiseApps[i].summ_with_text}, `
                            }
                            if (this.expertiseApps[i].summ_market != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `средняя рыночная стоимость 
                                Транспортного средства до повреждения по состоянию на дату ДТП составляла ${this.expertiseApps[i].summ_market_text}, `
                            }
                            if (this.expertiseApps[i].summ_leftovers != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `стоимость годных остатков поврежденного 
                                Транспортного средства составила ${this.expertiseApps[i].summ_leftovers_text}, `
                            }
                            if (this.expertiseApps[i].summ_uts != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `сумма УТС составила ${this.expertiseApps[i].summ_uts_text}, `
                            }
                            expertiseApps_summ_paragraph = expertiseApps_summ_paragraph.slice(0, -2)
                            expertiseApps_paragraph_one = `<p>${expertiseApps_paragraph_helper} экспертное заключение  
                            ${this.expertiseApps[i].organization.value} от ${this.expertiseApps[i].getExpertiseDateFormatted()} 
                            № ${this.expertiseApps[i].number.value}, в соответствии с которым ${expertiseApps_summ_paragraph}.</p>`

                            this.expertise_apps_paragraph = this.expertise_apps_paragraph + expertiseApps_paragraph_one
                        }
                    }

                    //Формирование параграфа о запросе документов
                    if (this.requestInfo.options.selectedIndex == 1) {
                        var request_helper = ` письмом от ${this.requests[0].getRequestDateFormatted()} № ${this.requests[0].number.value}`
                        this.requests_paragraph = `<p>${this.requests[0].getRequestDateFormatted()} 
                        ${fo_name_nominative} в ответ на заявление от ${this.getAppDateFormatted()} ${request_helper} 
                        ${request} у Заявителя ${this.requests[0].documents.value}.</p>`
                    }

                    //Формирование параграфа о проведении осмотра ТС
                    if (this.inspectionInfo.options.selectedIndex == 1) {
                        var inspections_data_helper_1 = ""
                        if (this.inspections[0].date.value != "") {
                            inspections_data_helper_1 = `${this.inspections[0].getInspectionDateFormatted()}`
                        }
                        var inspections_data_helper_2 = ""
                        if (this.inspections[0].date.value != "") {
                            inspections_data_helper_2 = ` от ${this.inspections[0].getInspectionDateFormatted()}`
                        }
                        var inspections_organization_helper = ""
                        if (this.inspections[0].organization.value != "") {
                            inspections_organization_helper = ` с привлечением независимой экспертной организации ${this.inspections[0].organization.value}`
                        }
                        var inspections_number_helper = ""
                        if (this.inspections[0].number.value != "") {
                            inspections_number_helper = `, о чем составлен акт осмотра № ${this.inspections[0].number.value}${inspections_data_helper_2}`
                        }
                        this.inspections_paragraph = `<p>${inspections_data_helper_1} 
                        ${fo_name_instrumental} проведен осмотр принадлежащего Заявителю 
                        Транспортного средства${inspections_organization_helper}${inspections_number_helper}.</p>`
                    }

                    //Формирование параграфа о проведении экспертиз ТС ФО
                    if (this.expertiseInfo.options.selectedIndex == 1) {
                        var expertises_paragraph_one = ""
                        var expertises_paragraph_helper = ""
                        var expertises_summ_paragraph
                        if (this.inspectionInfo.options.selectedIndex == 1) {
                            expertises_paragraph_helper = `На основании результатов осмотра от ${this.inspections[0].getInspectionDateFormatted()}`
                        } else {
                            expertises_paragraph_helper = `По инициативе ${fo_name_genitive}`
                        }
                        for (let i = 0; i < this.expertises.length; i++) {
                            expertises_summ_paragraph = ""
                            if (this.expertises[i].trasa.value != "") {
                                expertises_summ_paragraph = expertises_summ_paragraph + `${this.expertises[i].trasa.value}, `
                            }
                            if (this.expertises[i].summ_without != 0) {
                                expertises_summ_paragraph = expertises_summ_paragraph + `стоимость восстановительного ремонта 
                                Транспортного средства без учета износа составила ${this.expertises[i].summ_without_text}, `
                            }
                            if (this.expertises[i].summ_with != 0) {
                                expertises_summ_paragraph = expertises_summ_paragraph + `стоимость восстановительного ремонта 
                                Транспортного средства с учетом износа составила ${this.expertises[i].summ_with_text}, `
                            }
                            if (this.expertises[i].summ_market != 0) {
                                expertises_summ_paragraph = expertises_summ_paragraph + `средняя рыночная стоимость 
                                Транспортного средства до повреждения по состоянию на дату ДТП составляла ${this.expertises[i].summ_market_text}, `
                            }
                            if (this.expertises[i].summ_leftovers != 0) {
                                expertises_summ_paragraph = expertises_summ_paragraph + `стоимость годных остатков поврежденного 
                                Транспортного средства составила ${this.expertises[i].summ_leftovers_text}, `
                            }
                            if (this.expertises[i].summ_uts != 0) {
                                expertises_summ_paragraph = expertises_summ_paragraph + `сумма УТС составила ${this.expertises[i].summ_uts_text}, `
                            }
                            expertises_summ_paragraph = expertises_summ_paragraph.slice(0, -2)
                            expertises_paragraph_one = `<p>${expertises_paragraph_helper} независимой экспертной организацией 
                            ${this.expertises[i].organization.value} подготовлено экспертное заключение от ${this.expertises[i].getExpertiseDateFormatted()} 
                            № ${this.expertises[i].number.value}, согласно которому ${expertises_summ_paragraph}.</p>`

                            this.expertises_paragraph = this.expertises_paragraph + expertises_paragraph_one
                        }
                    }

                    //Формирование абзаца ответом ФО на заявление
                    if (this.answerFoInfo.options.selectedIndex == 1) {
                        if (this.answerFo.options.selectedIndex == 1) {
                            
                        } else if (this.answerFo.options.selectedIndex == 2) {
                            var answerFo_paragraph_one = ""
                            if (this.paymentVoluntary.length == 1) {
                                answerFo_paragraph_one = `<p>${this.paymentVoluntary[0].getDateFormatted()} ${fo_name_instrumental} 
                                на расчетный счет Заявителя была произведена выплата ${this.paymentVoluntary[0].type_text} 
                                в размере ${makeRubText_genitive(this.paymentVoluntary[0].summ)}, что подтверждается 
                                платежным поручением от ${this.paymentVoluntary[0].getDateFormatted()} № ${this.paymentVoluntary[0].order.value}.</p>`
                            } else if (this.paymentVoluntary.length > 1) {
                                var paymentVoluntary_total_summ = 0
                                var paymentVoluntary_summ_helper = ""
                                for (let i = 0; i < this.paymentVoluntary.length; i++) {
                                    paymentVoluntary_total_summ = paymentVoluntary_total_summ + this.paymentVoluntary[i].summ
                                    paymentVoluntary_summ_helper = paymentVoluntary_summ_helper + `${makeRubText_genitive(this.paymentVoluntary[i].summ)} – 
                                    в счет ${this.paymentVoluntary[i].type_text}, `
                                }
                                paymentVoluntary_summ_helper = paymentVoluntary_summ_helper.slice(0, -2)
                                for (let i = 0; i < this.paymentVoluntary.length; i++) {
                                    answerFo_paragraph_one = `<p>${this.paymentVoluntary[i].getDateFormatted()} ${fo_name_instrumental} 
                                    на расчетный счет Заявителя была произведена выплата в размере 
                                    ${makeRubText_genitive(paymentVoluntary_total_summ)} (${paymentVoluntary_summ_helper}), 
                                    что подтверждается платежным поручением от ${this.paymentVoluntary[i].getDateFormatted()} № 
                                    ${this.paymentVoluntary[i].order.value}.</p>`
                                }
                                answerFo_paragraph_one = answerFo_paragraph_one.replaceAll("расходов", "возмещения расходов")
                            }
                            
                            this.answerFo_paragraph = this.answerFo_paragraph + answerFo_paragraph_one
                        } else if (this.answerFo.options.selectedIndex == 3) {
                            
                        } else if (this.answerFo.options.selectedIndex == 4) {

                            let confirmation_type = ""
                            let confirmation_date_helper = ""
                            let confirmation_number_helper = ""
                            let confirmation_post_number_helper = ""

                            let text_helper = ""

                            if (this.refusal[0].text.value != "") {
                                text_helper = this.refusal[0].text.value
                            }

                            confirmation_type_helper.confirmation_type_helper.forEach(element => {
                                if (this.refusal[0].confirmation_type.value == element.confirmation_type) {
                                    confirmation_type = element.confirmation_type_genitive
                                }
                            })
                            if (this.refusal[0].confirmation_date.value != "" && this.refusal[0].confirmation_type.value != "Почтовый идентификатор") {
                                confirmation_date_helper = ` от ${this.refusal[0].getRefusalConfirmationDateFormatted()}`
                            }
                            if (this.refusal[0].confirmation_number.value != "" && this.refusal[0].confirmation_type.value != "Почтовый идентификатор") {
                                confirmation_number_helper = ` № ${this.refusal[0].confirmation_number.value}`
                            } else if (this.refusal[0].confirmation_type.value == "Почтовый идентификатор") {
                                confirmation_number_helper = ` № ${this.refusal[0].confirmation_post_number.value}`
                            }
                            if (this.refusal[0].confirmation_post_number.value != "" && this.refusal[0].confirmation_type.value != "Почтовый идентификатор") {
                                confirmation_post_number_helper = `. Номер почтового идентификатора ${this.refusal[0].confirmation_post_number.value}`
                            }

                            if (this.refusal[0].type.options.selectedIndex == 1) {
                                if (text_helper == "") {
                                    text_helper = `согласно выводам проведенной экспертизы, все повреждения Транспортного средства Заявителя 
                                    не могли образоваться при заявленных обстоятельствах ДТП, в связи с чем, правовых оснований 
                                    для урегулирования данного убытка у ${fo_name_genitive} не имеется.`
                                }
                                this.answerFo_paragraph = `<p>${fo_name_nominative} ${send} Заявителю письмо от 
                                ${this.refusal[0].getRefusalDateFormatted()} № ${this.refusal[0].number.value}, в котором сообщалось 
                                что ${text_helper} Направление письма подтверждается 
                                ${confirmation_type}${confirmation_date_helper}${confirmation_number_helper}${confirmation_post_number_helper}.</p>`
                            } else if (this.refusal[0].type.options.selectedIndex == 2) {
                                
                            } else if (this.refusal[0].type.options.selectedIndex == 3) {
                                this.answerFo_paragraph = `<p>${this.refusal[0].getRefusalDateFormatted()} ${fo_name_nominative} 
                                в ответ на заявление от ${this.getAppDateFormatted()} письмом № ${this.refusal[0].number.value} 
                                ${deny} Заявителю в удовлетворении заявленных требований. Направление письма подтверждается 
                                ${confirmation_type}${confirmation_date_helper}${confirmation_number_helper}${confirmation_post_number_helper}.</p>`
                            } else if (this.refusal[0].type.options.selectedIndex == 4) {
                                
                            } else if (this.refusal[0].type.options.selectedIndex == 5) {
                                this.answerFo_paragraph = `<p>${fo_name_nominative} ${send} Заявителю письмо от 
                                ${this.refusal[0].getRefusalDateFormatted()} № ${this.refusal[0].number.value}, в котором сообщалось 
                                что ${text_helper} Направление письма подтверждается 
                                ${confirmation_type}${confirmation_date_helper}${confirmation_number_helper}${confirmation_post_number_helper}.</p>`
                            }
                        }
                    } else if (this.answerFoInfo.options.selectedIndex == 2) {
                        this.answerFo_paragraph = `<p>Сведений об осуществлении выплаты страхового возмещения или 
                        направлении Заявителю мотивированного отказа на заявление от ${this.getAppDateFormatted()} 
                        ${fo_name_instrumental} не предоставлено.</p>`
                    }

                //Если заявитель обратился с претензией
                } else if (this.type.options.selectedIndex == 2) {
                    //Формирование процедуры обращения в ФО
                    var procedure_helper = ""
                    var procedure_helper_2 = ""
                    var procedure_helper_3 = ""
                    if (this.getAppDate() >= DATE_FZ_123_START) {
                        procedure_helper = "заявлением (претензией)"
                        procedure_helper_2 = "содержащим"
                        procedure_helper_3 = "заявление (претензию)"
                    } else {
                        procedure_helper = "претензией"
                        procedure_helper_2 = "содержащей"
                        procedure_helper_3 = "претензию"
                    }
                    var type_of_claim_helper_1 = ""
                    var type_of_claim_helper_2 = ""
                    if (this.type_of_claim.options.selectedIndex == 1) {
                        type_of_claim_helper_1 = `размером выплаченного ${fo_name_instrumental}`
                        type_of_claim_helper_2 = "доплате"
                    } else {
                        type_of_claim_helper_1 = `отказом ${fo_name_genitive} в выплате`
                        type_of_claim_helper_2 = "выплате"
                    }
                    var app_claims_paragraph_helper = ""
                    for (let i = 0; i < this.claimsContractToFo.length; i++) {
                        app_claims_paragraph_helper = app_claims_paragraph_helper + this.claimsContractToFo[i].claims_all
                    }
                    app_claims_paragraph_helper = app_claims_paragraph_helper.slice(0, -1)

                    //Формирование первого параграфа заявления в ФО
                    this.app_paragraph = `<p>${this.getAppDateFormatted()} Заявитель обратился в ${fo_name_accusative} с 
                    ${procedure_helper} о несогласии с ${type_of_claim_helper_1} страхового возмещения, ${procedure_helper_2} требование о 
                    ${type_of_claim_helper_2} ${app_claims_paragraph_helper}.</p>`

                    //Формирование параграфа о проведении экспертиз ТС Заявителя
                    if (this.expertiseAppInfo.options.selectedIndex == 1) {
                        var expertiseApps_paragraph_one = ""
                        var expertiseApps_paragraph_helper = ""
                        var expertiseApps_summ_paragraph
                        for (let i = 0; i < this.expertiseApps.length; i++) {
                            if (i == 0) {
                                expertiseApps_paragraph_helper = `В обоснование заявленных требований Заявитель предоставил`
                            } else if (i == 1) {
                                expertiseApps_paragraph_helper = `Кроме того, Заявитель предоставил`
                            } else {
                                expertiseApps_paragraph_helper = `Также Заявителем предоставлено`
                            }
                            expertiseApps_summ_paragraph = ""
                            if (this.expertiseApps[i].summ_without != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `стоимость восстановительного ремонта 
                                Транспортного средства без учета износа составила ${this.expertiseApps[i].summ_without_text}, `
                            }
                            if (this.expertiseApps[i].summ_with != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `стоимость восстановительного ремонта 
                                Транспортного средства с учетом износа составила ${this.expertiseApps[i].summ_with_text}, `
                            }
                            if (this.expertiseApps[i].summ_market != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `средняя рыночная стоимость 
                                Транспортного средства до повреждения по состоянию на дату ДТП составляла ${this.expertiseApps[i].summ_market_text}, `
                            }
                            if (this.expertiseApps[i].summ_leftovers != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `стоимость годных остатков поврежденного 
                                Транспортного средства составила ${this.expertiseApps[i].summ_leftovers_text}, `
                            }
                            if (this.expertiseApps[i].summ_uts != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `сумма УТС составила ${this.expertiseApps[i].summ_uts_text}, `
                            }
                            expertiseApps_summ_paragraph = expertiseApps_summ_paragraph.slice(0, -2)
                            expertiseApps_paragraph_one = `<p>${expertiseApps_paragraph_helper} экспертное заключение  
                            ${this.expertiseApps[i].organization.value} от ${this.expertiseApps[i].getExpertiseDateFormatted()} 
                            № ${this.expertiseApps[i].number.value}, в соответствии с которым ${expertiseApps_summ_paragraph}.</p>`

                            this.expertise_apps_paragraph = this.expertise_apps_paragraph + expertiseApps_paragraph_one
                        }
                    }
                    //Формирование параграфа со сроком ответа на претензию
                    if (this.method.options.selectedIndex == 3) {
                        this.claim_answer_time_count_days = 15
                    } else {
                        this.claim_answer_time_count_days = 30
                    }
                    if (this.getAppDate() >= DATE_FZ_123_START) {
                        this.app_claim_answer_time_paragraph = `<p>В соответствии со статьей 16 Закона № 123-ФЗ ${fo_name_nominative} 
                        ${must} рассмотреть заявление (претензию) и направить Заявителю ответ не позднее ${this.getLastClaimFoDayFormatted()}.</p>`
                    }

                    //Формирование абзаца с ответом ФО на Заявление
                    if (this.answerFoInfo.options.selectedIndex == 1) {
                        if (this.answerFo.options.selectedIndex == 1) {
                            
                        } else if (this.answerFo.options.selectedIndex == 2) {
                            var answerFo_paragraph_one = ""
                            if (this.paymentVoluntary.length == 1) {
                                answerFo_paragraph_one = `<p>${this.paymentVoluntary[0].getDateFormatted()} ${fo_name_instrumental} 
                                на расчетный счет Заявителя была произведена выплата ${this.paymentVoluntary[0].type_text} 
                                в размере ${makeRubText_genitive(this.paymentVoluntary[0].summ)}, что подтверждается 
                                платежным поручением от ${this.paymentVoluntary[0].getDateFormatted()} № ${this.paymentVoluntary[0].order.value}.</p>`
                            } else if (this.paymentVoluntary.length > 1) {
                                var paymentVoluntary_total_summ = 0
                                var paymentVoluntary_summ_helper = ""
                                for (let i = 0; i < this.paymentVoluntary.length; i++) {
                                    paymentVoluntary_total_summ = paymentVoluntary_total_summ + this.paymentVoluntary[i].summ
                                    paymentVoluntary_summ_helper = paymentVoluntary_summ_helper + `${makeRubText_genitive(this.paymentVoluntary[i].summ)} – 
                                    в счет ${this.paymentVoluntary[i].type_text}, `
                                }
                                paymentVoluntary_summ_helper = paymentVoluntary_summ_helper.slice(0, -2)
                                for (let i = 0; i < this.paymentVoluntary.length; i++) {
                                    answerFo_paragraph_one = `<p>${this.paymentVoluntary[i].getDateFormatted()} ${fo_name_instrumental} 
                                    на расчетный счет Заявителя была произведена выплата в размере 
                                    ${makeRubText_genitive(paymentVoluntary_total_summ)} (${paymentVoluntary_summ_helper}), 
                                    что подтверждается платежным поручением от ${this.paymentVoluntary[i].getDateFormatted()} № 
                                    ${this.paymentVoluntary[i].order.value}.</p>`
                                }
                                answerFo_paragraph_one = answerFo_paragraph_one.replaceAll("расходов", "возмещения расходов")
                            }
                            
                            this.answerFo_paragraph = this.answerFo_paragraph + answerFo_paragraph_one
                        } else if (this.answerFo.options.selectedIndex == 3) {
                            
                        } else if (this.answerFo.options.selectedIndex == 4) {

                            let confirmation_type = ""
                            let confirmation_date_helper = ""
                            let confirmation_number_helper = ""
                            let confirmation_post_number_helper = ""

                            let text_helper = ""

                            if (this.refusal[0].text.value != "") {
                                text_helper = this.refusal[0].text.value
                            }

                            confirmation_type_helper.confirmation_type_helper.forEach(element => {
                                if (this.refusal[0].confirmation_type.value == element.confirmation_type) {
                                    confirmation_type = element.confirmation_type_genitive
                                }
                            })
                            if (this.refusal[0].confirmation_date.value != "" && this.refusal[0].confirmation_type.value != "Почтовый идентификатор") {
                                confirmation_date_helper = ` от ${this.refusal[0].getRefusalConfirmationDateFormatted()}`
                            }
                            if (this.refusal[0].confirmation_number.value != "" && this.refusal[0].confirmation_type.value != "Почтовый идентификатор") {
                                confirmation_number_helper = ` № ${this.refusal[0].confirmation_number.value}`
                            } else if (this.refusal[0].confirmation_type.value == "Почтовый идентификатор") {
                                confirmation_number_helper = ` № ${this.refusal[0].confirmation_post_number.value}`
                            }
                            if (this.refusal[0].confirmation_post_number.value != "" && this.refusal[0].confirmation_type.value != "Почтовый идентификатор") {
                                confirmation_post_number_helper = `. Номер почтового идентификатора ${this.refusal[0].confirmation_post_number.value}`
                            }

                            if (this.refusal[0].type.options.selectedIndex == 1) {
                                if (text_helper == "") {
                                    text_helper = `согласно выводам проведенной экспертизы, все повреждения Транспортного средства Заявителя 
                                    не могли образоваться при заявленных обстоятельствах ДТП, в связи с чем, правовых оснований 
                                    для урегулирования данного убытка у ${fo_name_genitive} не имеется.`
                                }
                                this.answerFo_paragraph = `<p>${fo_name_nominative} ${send} Заявителю письмо от 
                                ${this.refusal[0].getRefusalDateFormatted()} № ${this.refusal[0].number.value}, в котором сообщалось 
                                что ${text_helper} Направление письма подтверждается 
                                ${confirmation_type}${confirmation_date_helper}${confirmation_number_helper}${confirmation_post_number_helper}.</p>`
                            } else if (this.refusal[0].type.options.selectedIndex == 2) {
                                
                            } else if (this.refusal[0].type.options.selectedIndex == 3) {
                                this.answerFo_paragraph = `<p>${this.refusal[0].getRefusalDateFormatted()} ${fo_name_nominative} 
                                в ответ на заявление от ${this.getAppDateFormatted()} письмом № ${this.refusal[0].number.value} 
                                ${deny} Заявителю в удовлетворении заявленных требований. Направление письма подтверждается 
                                ${confirmation_type}${confirmation_date_helper}${confirmation_number_helper}${confirmation_post_number_helper}.</p>`
                            } else if (this.refusal[0].type.options.selectedIndex == 4) {
                                this.answerFo_paragraph = `<p>${fo_name_nominative} в ответ на ${procedure_helper_3} от 
                                ${this.getAppDateFormatted()} письмом от ${this.refusal[0].getRefusalDateFormatted()} № 
                                ${this.refusal[0].number.value} ${notify} Заявителя о том, что позиция ${fo_name_genitive} по 
                                данному вопросу не изменилась. Направление письма подтверждается 
                                ${confirmation_type}${confirmation_date_helper}${confirmation_number_helper}${confirmation_post_number_helper}.</p>`
                            } else if (this.refusal[0].type.options.selectedIndex == 5) {
                                this.answerFo_paragraph = `<p>${fo_name_nominative} ${send} Заявителю письмо от 
                                ${this.refusal[0].getRefusalDateFormatted()} № ${this.refusal[0].number.value}, в котором сообщалось 
                                что ${text_helper} Направление письма подтверждается 
                                ${confirmation_type}${confirmation_date_helper}${confirmation_number_helper}${confirmation_post_number_helper}.</p>`
                            }
                        }
                    } else if (this.answerFoInfo.options.selectedIndex == 2) {
                        this.answerFo_paragraph = `<p>Сведений об осуществлении выплаты страхового возмещения или 
                        направлении Заявителю мотивированного отказа на ${procedure_helper_3} от ${this.getAppDateFormatted()} 
                        ${fo_name_instrumental} не предоставлено.</p>`
                    }
                    
                }
            } else if (this.claimsContract[0].type.options.selectedIndex == 2) {
                
            }
            
        } else {
            
        }
        this.main_paragraph = this.app_paragraph + 
                              this.expertise_apps_paragraph +
                              this.app_claim_answer_time_paragraph +
                              this.agreement_paragraph + 
                              this.form_paragraph +
                              this.requests_paragraph + 
                              this.inspections_paragraph + 
                              this.expertises_paragraph +
                              this.answerFo_paragraph

    }

    getAppDate() {return Date.parse(changeDateType(this.appDate.value) + 'T00:00:00');}
    getAppDateFormatted() { return formatDate(new Date(this.getAppDate())); }
    getLastClaimFoDay() { return findLastClaimFoDay(this.getAppDate(), this.claim_answer_time_count_days) }
    getLastClaimFoDayFormatted() { return formatDate(new Date(this.getLastClaimFoDay())); }
    setObject() {
        return {
            id : this.id,
            appDate : this.appDate.value,
            type : this.type.value,
            procedure : this.procedure.value,
            type_of_claim : this.type_of_claim.value,
            method : this.method.value,
            form : this.form.value,
            claimsContractToFoInfo : this.claimsContractToFoInfo.value,
            claimsContractToFo : this.claimsContractToFoObjects,
            expertiseAppInfo : this.expertiseAppInfo.value,
            expertiseAppsObjects : this.expertiseAppsObjects,
            agreementInfo : this.agreementInfo.value,
            agreementObjects : this.agreementObjects,
            requestInfo : this.requestInfo.value,
            requestsObjects : this.requestsObjects,
            inspectionInfo : this.inspectionInfo.value,
            inspectionsObjects : this.inspectionsObjects,
            expertiseInfo : this.expertiseInfo.value,
            expertiseObjects : this.expertiseObjects,
            answerFoInfo : this.answerFoInfo.value,
            answerFo : this.answerFo.value,
            refusalObjects : this.refusalObjects,
        }
    }
}