import { changeDateType } from './changeDateType.js';
import { allClaims } from './objects/allClaims';
import { makeRubText_genitive } from "./makeRubText_genitive";
import { formatDate } from "./formatDate";
import { evacuation_route_helper } from './objects/helpers.js';

export class MainClaim {

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

    ev_date
    ev_route
    ev_route_text
    ev_ground
    ev_number

    storage_date
    storage_organization
    storage_ground
    storage_number
    storage_from
    storage_to
    storage_without

    constructor (id, 
                type, 
                summ, 
                from, 
                to, 
                without, 
                pdf, 
                ev_date, 
                ev_route, 
                ev_ground, 
                ev_number,
                storage_date,
                storage_organization,
                storage_ground,
                storage_number,
                storage_from,
                storage_to,
                storage_without){
        this.id = id
        this.type = type
        this.summ = Number(summ.value.replace(/\s+/g, ''))
        this.summ_text = makeRubText_genitive(this.summ)
        this.from = from
        this.to = to
        this.without = without
        this.pdf = pdf
        this.ev_date = ev_date
        this.ev_route = ev_route
        this.ev_ground = ev_ground
        this.ev_number = ev_number

        this.storage_date = storage_date
        this.storage_organization = storage_organization
        this.storage_ground = storage_ground
        this.storage_number = storage_number
        this.storage_from = storage_from
        this.storage_to = storage_to
        this.storage_without = storage_without

        allClaims.claims.forEach(element => {
            if (this.type.value == element.claim) {
                this.type_text = element.short
            }
        })

        this.ev_route_text = ""
        evacuation_route_helper.evacuation_route_helper.forEach(element => {
            if (this.ev_route.value == element.evacuation_route) {
                this.ev_route_text = " " + element.evacuation_route_genitive
            }
        })

    }

    getFromDate() {return Date.parse(changeDateType(this.from.value) + 'T00:00:00');}
    getFromDateFormatted() { return formatDate(new Date(this.getFromDate())); }
    getToDate() {return Date.parse(changeDateType(this.to.value) + 'T00:00:00');}
    getToDateFormatted() { return formatDate(new Date(this.getToDate())); }
    getEvDate() {return Date.parse(changeDateType(this.ev_date.value) + 'T00:00:00');}
    getEvDateFormatted() { return formatDate(new Date(this.getEvDate())); }

    getStorageDate() {return Date.parse(changeDateType(this.storage_date.value) + 'T00:00:00');}
    getStorageDateFormatted() { return formatDate(new Date(this.getStorageDate())); }
    getStorageFromDate() {return Date.parse(changeDateType(this.storage_from.value) + 'T00:00:00');}
    getStorageFromDateFormatted() { return formatDate(new Date(this.getStorageFromDate())); }
    getStorageToDate() {return Date.parse(changeDateType(this.storage_to.value) + 'T00:00:00');}
    getStorageToDateFormatted() { return formatDate(new Date(this.getStorageToDate())); }

    setObject() {
        return {
            type : this.type.value,
            summ : this.summ,
            from : this.from.value,
            to : this.to.value,
            without : this.without.checked,
            pdf : this.pdf.checked,
            ev_date : this.ev_date.value,
            ev_route : this.ev_route.value,
            ev_ground : this.ev_ground.value,
            ev_number : this.ev_number.value,

            storage_date : this.storage_date.value,
            storage_organization : this.storage_organization.value,
            storage_ground : this.storage_ground.value,
            storage_number : this.storage_number.value,
            storage_from : this.storage_from.value,
            storage_to : this.storage_to.value,
            storage_without : this.storage_without.checked,
        }
    }
}

export class ClaimsContract {

    id

    type
    claim = []
    claimObjects = []
    claims_all

    constructor (id, type) {

        this.id = id;
        this.type = type
        this.claims_all = ""

        var number_of_claims = $('.main_claim_' + id).length;
        var types = $('.main_claim_type_' + id); //Получение массива требований
        var summs = $('.main_claim_summ_' + id); //Получение массива дат решений
        var froms = $('.date_main_claim_from_' + id); //Получение массива дат начала периода судебных неустоек
        var tos = $('.date_main_claim_to_' + id); //Получение массива дат конца периода судебных неустоек
        var without_periods = $('.main_claim_without_period_' + id); //Получение массива неустоек без периода
        var pdfs = $('.main_claim_pdf_' + id); //Получение массива неустоек по день факта
        var ev_dates = $('.add_main_claim_info_ev_date_' + id); //Получение массива дат оплаты расходов на эвакуацию
        var ev_routes = $('.add_main_claim_info_ev_route_' + id); //Получение массива маршрутов эвакуации ТС
        var ev_grounds = $('.add_main_claim_info_ev_ground_' + id); //Получение массива оснований для оплаты расходов на эвакуацию ТС
        var ev_numbers = $('.add_main_claim_info_ev_number_' + id); //Получение массива номеров документов-оснований для оплаты расходов на эвакуацию ТС
        
        var storage_dates = $('.add_main_claim_info_storage_date_' + id); //Получение массива дат оплаты расходов на хранение
        var storage_organizations = $('.add_main_claim_info_storage_organization_' + id); //Получение массива маршрутов хранение ТС
        var storage_grounds = $('.add_main_claim_info_storage_ground_' + id); //Получение массива оснований для оплаты расходов на хранение ТС
        var storage_numbers = $('.add_main_claim_info_storage_number_' + id); //Получение массива номеров документов-оснований для оплаты расходов на хранение ТС
        var storage_froms = $('.add_main_claim_info_storage_from_' + id); //Получение массива номеров документов-оснований для оплаты расходов на хранение ТС
        var storage_tos = $('.add_main_claim_info_storage_to_' + id); //Получение массива номеров документов-оснований для оплаты расходов на хранение ТС
        var storage_without_periods = $('.add_main_claim_info_storage_without_period_' + id); //Получение массива номеров документов-оснований для оплаты расходов на хранение ТС
        for (let i = 0; i < number_of_claims; i++) {
            this.claim[i] = new MainClaim(i + 1,
                                          types[i],
                                          summs[i],
                                          froms[i],
                                          tos[i],
                                          without_periods[i],
                                          pdfs[i],
                                          ev_dates[i],
                                          ev_routes[i],
                                          ev_grounds[i],
                                          ev_numbers[i],
                                          storage_dates[i],
                                          storage_organizations[i],
                                          storage_grounds[i],
                                          storage_numbers[i],
                                          storage_froms[i],
                                          storage_tos[i],
                                          storage_without_periods[i])
            this.claimObjects[i] = this.claim[i].setObject()
            
            var current_claim_summ = ""
            if (this.claim[i].summ != 0) {
                current_claim_summ = " в размере " + this.claim[i].summ_text
            } else {
                current_claim_summ = ""
            }

            switch (this.claim[i].type.options.selectedIndex) {
                case 2:
                    this.claim[i].type_text_full = "страхового возмещения" + " по договору " + this.type.value + " " + this.claim[i].type_text + current_claim_summ
                    break;
                case 1:
                    this.claim[i].type_text_full = this.claim[i].type_text + " по договору " + this.type.value + current_claim_summ
                    break;
                case 5:
                    if (this.claim[i].without.checked) {
                        this.claim[i].type_text_full = this.claim[i].type_text + " по договору " + this.type.value + current_claim_summ
                    } else if (this.claim[i].pdf.checked) {
                        this.claim[i].type_text_full = this.claim[i].type_text + " по договору " + this.type.value + " за период с " + this.claim[i].getFromDateFormatted() + " по день фактического исполнения обязательств" + current_claim_summ
                    } else {
                        this.claim[i].type_text_full = this.claim[i].type_text + " по договору " + this.type.value + " за период с " + this.claim[i].getFromDateFormatted() + " по " + this.claim[i].getToDateFormatted() + current_claim_summ
                    }
                    break;
                case 3:
                    this.claim[i].type_text_full = this.claim[i].type_text + this.claim[i].ev_route_text + " по договору " + this.type.value + current_claim_summ
                    break;
                case 4:
                    if (this.claim[i].storage_without.checked) {
                        this.claim[i].type_text_full = this.claim[i].type_text + " по договору " + this.type.value + current_claim_summ
                    } else {
                        this.claim[i].type_text_full = this.claim[i].type_text + " по договору " + this.type.value + " за период с " + this.claim[i].getStorageFromDateFormatted() + " по " + this.claim[i].getStorageToDateFormatted() + current_claim_summ
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
            type : this.type.value,
            claim : this.claimObjects,
        }
    }
}