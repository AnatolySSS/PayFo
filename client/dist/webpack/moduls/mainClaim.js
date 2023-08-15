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

    constructor (id, type, summ, from, to, without, pdf, ev_date, ev_route, ev_ground, ev_number){
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
                                          ev_numbers[i])
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
                    this.claim[i].type_text_full = this.claim[i].type_text + this.claim[i].ev_route_text + " " + current_claim_summ
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