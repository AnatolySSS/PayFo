import { changeDateType } from './changeDateType.js';
import { makeRubText_genitive } from "./makeRubText_genitive";
import { formatDate } from "./formatDate";
import { inclineFirstname, inclineLastname, inclineMiddlename, getLastnameGender } from 'lvovich';

export class DtpParticipantContract {

    id

    type
    fo_name
    number
    date_conclusion
    date_start
    date_end

    insurance_rules
    insurance_rules_approver_name
    insurance_rules_approver_post
    insurance_rules_date
    insurance_rules_number

    insurance_inspection_information
    insurance_inspection_date
    insurance_inspection_damaged_parts

    insurance_summ_summ
    insurance_summ_index
    insurance_summ_aggregate
    insurance_summ_risks

    insurance_premium_information
    insurance_premium_summ
    insurance_premium_date
    insurance_premium_number
    insurance_premium_risks

    beneficiary_subject
    beneficiary_subject_bank_name
    beneficiary_risks

    franchise_presence
    franchise_type
    franchise_summ
    franchise_risks

    contract_paragraph

    constructor (id, type, fo_name, number, date_conclusion, date_start, date_end,
                 insurance_rules, insurance_rules_approver_name, insurance_rules_approver_post,
                 insurance_rules_date, insurance_rules_number,
                 insurance_inspection_information, insurance_inspection_date, insurance_inspection_damaged_parts,
                 insurance_summ_summ, insurance_summ_index, insurance_summ_aggregate, insurance_summ_risks,
                 insurance_premium_information, insurance_premium_summ, insurance_premium_date,
                 insurance_premium_number, insurance_premium_risks,
                 beneficiary_subject, beneficiary_subject_bank_name, beneficiary_risks,
                 franchise_presence, franchise_type, franchise_summ, franchise_risks){

        this.id = id
        this.type = type
        this.fo_name = fo_name
        this.number = number
        this.date_conclusion = date_conclusion
        this.date_start = date_start
        this.date_end = date_end

        this.insurance_rules = insurance_rules
        this.insurance_rules_approver_name = insurance_rules_approver_name
        this.insurance_rules_approver_post = insurance_rules_approver_post
        this.insurance_rules_date = insurance_rules_date
        this.insurance_rules_number = insurance_rules_number

        this.insurance_inspection_information = insurance_inspection_information
        this.insurance_inspection_date = insurance_inspection_date
        this.insurance_inspection_damaged_parts = insurance_inspection_damaged_parts

        this.insurance_summ_summ = Number(insurance_summ_summ.value.replace(/\s+/g, ''))
        this.insurance_summ_index = insurance_summ_index
        this.insurance_summ_aggregate = insurance_summ_aggregate
        this.insurance_summ_risks = insurance_summ_risks

        this.insurance_premium_information = insurance_premium_information
        this.insurance_premium_summ = Number(insurance_premium_summ.value.replace(/\s+/g, ''))
        this.insurance_premium_date = insurance_premium_date
        this.insurance_premium_number = insurance_premium_number
        this.insurance_premium_risks = insurance_premium_risks

        this.beneficiary_subject = beneficiary_subject
        this.beneficiary_subject_bank_name = beneficiary_subject_bank_name
        this.beneficiary_risks = beneficiary_risks

        this.franchise_presence = franchise_presence
        this.franchise_type = franchise_type
        this.franchise_summ = Number(franchise_summ.value.replace(/\s+/g, ''))
        this.franchise_risks = franchise_risks

        this.contract_paragraph = ""

    }

    getConclusionDate() {return Date.parse(changeDateType(this.date_conclusion.value) + 'T00:00:00');}
    getConclusionDateFormatted() { return formatDate(new Date(this.getConclusionDate())); }
    getStartDate() {return Date.parse(changeDateType(this.date_start.value) + 'T00:00:00');}
    getStartDateFormatted() { return formatDate(new Date(this.getStartDate())); }
    getEndDate() {return Date.parse(changeDateType(this.date_end.value) + 'T00:00:00');}
    getEndDateFormatted() { return formatDate(new Date(this.getEndDate())); }
    getInsuranceRulesDate() {return Date.parse(changeDateType(this.insurance_rules_date.value) + 'T00:00:00');}
    getInsuranceRulesDateFormatted() { return formatDate(new Date(this.getInsuranceRulesDate())); }
    getInsuranceInspectionsDate() {return Date.parse(changeDateType(this.insurance_inspection_date.value) + 'T00:00:00');}
    getInsuranceInspectionsDateFormatted() { return formatDate(new Date(this.getInsuranceInspectionsDate())); }
    getInsurancePremiumDate() {return Date.parse(changeDateType(this.insurance_premium_date.value) + 'T00:00:00');}
    getInsurancePremiumDateFormatted() { return formatDate(new Date(this.getInsurancePremiumDate())); }

    setObject() {
        return {
            id : this.id,
            type : this.type.value,
            fo_name : this.fo_name.value,
            number : this.number.value,
            date_conclusion : this.date_conclusion.value,
            date_start : this.date_start.value,
            date_end : this.date_end.value,

            insurance_rules : this.insurance_rules.value,
            insurance_rules_approver_name : this.insurance_rules_approver_name.value,
            insurance_rules_approver_post : this.insurance_rules_approver_post.value,
            insurance_rules_date : this.insurance_rules_date.value,
            insurance_rules_number : this.insurance_rules_number.value,

            insurance_inspection_information : this.insurance_inspection_information.value,
            insurance_inspection_date : this.insurance_inspection_date.value,
            insurance_inspection_damaged_parts : this.insurance_inspection_damaged_parts.value,

            insurance_summ_summ : this.insurance_summ_summ.value,
            insurance_summ_index : this.insurance_summ_index.value,
            insurance_summ_aggregate : this.insurance_summ_aggregate.value,
            insurance_summ_risks : this.insurance_summ_risks.value,

            insurance_premium_information : this.insurance_premium_information.value,
            insurance_premium_summ : this.insurance_premium_summ.value,
            insurance_premium_date : this.insurance_premium_date.value,
            insurance_premium_number : this.insurance_premium_number.value,
            insurance_premium_risks : this.insurance_premium_risks.value,

            beneficiary_subject : this.beneficiary_subject.value,
            beneficiary_subject_bank_name : this.beneficiary_subject_bank_name.value,
            beneficiary_risks : this.beneficiary_risks.value,

            franchise_presence : this.franchise_presence.value,
            franchise_type : this.franchise_type.value,
            franchise_summ : this.franchise_summ.value,
            franchise_risks : this.franchise_risks.value,
        }
    }
}

export class DtpParticipant {

    id

    car_brand
    car_model
    car_reg_number
    car_vin_number
    car_year
    car_type
    car_weight
    driver_name
    driver_name_genitive
    driver_gender
    driver_declination
    owner_name
    owner_name_genitive
    owner_gender
    owner_declination
    is_guilty

    full_car_name
    contract_paragraph_all

    car_contracts = []
    car_contractsObjects = []

    constructor (id, car_brand, car_model, car_reg_number, car_vin_number,
                 car_year, car_type, car_weight, driver_name, owner_name, is_guilty) {

        this.id = id;
        this.car_brand = car_brand
        this.car_model = car_model
        this.car_reg_number = car_reg_number
        this.car_vin_number = car_vin_number
        this.car_year = car_year
        this.car_type = car_type
        this.car_weight = car_weight
        this.driver_name = driver_name
        this.driver_gender = getLastnameGender(this.driver_name.value.split(" ")[0])
        this.driver_name_genitive = `${inclineLastname(this.driver_name.value.split(" ")[0], 'genitive')} 
                                ${this.driver_name.value.split(" ")[1]}`
        if (this.driver_gender == 'male') {
            this.driver_declination = "управлявшего"
        } else if (this.driver_gender == 'female') {
            this.driver_declination = "управлявшей"
        } else {
            this.driver_declination = "управлявшего"
        }
        this.owner_name = owner_name
        this.owner_gender = getLastnameGender(this.owner_name.value.split(" ")[0])
        this.owner_name_genitive = `${inclineLastname(this.owner_name.value.split(" ")[0], 'genitive')} 
                                ${this.owner_name.value.split(" ")[1]}`
        if (this.owner_gender == 'male') {
            this.owner_declination = "управлявшего"
        } else if (this.owner_gender == 'female') {
            this.owner_declination = "управлявшей"
        } else {
            this.owner_declination = "управлявшего"
        }
        this.is_guilty = is_guilty

        var car_model_helper = ""
        if (this.car_model.value != "") {
            car_model_helper = ` ${this.car_model.value}`
        }

        this.full_car_name = `${this.car_brand.value}${car_model_helper}, государственный регистрационный номер 
        ${this.car_reg_number.value}`
        
        if (this.id == 1) {
            var vin = ""
            if (this.car_vin_number.value != "") {
                vin = `, VIN ${this.car_vin_number.value}`
            }
            var year = ""
            if (this.car_year.value != "") {
                year = `, год выпуска ${this.car_year.value}`
            }
            var car_type_helper = ""
            if (this.car_type.options.selectedIndex == 5) {
                car_type_helper = "мотоцикл "
            } else if (this.car_type.options.selectedIndex == 6) {
                car_type_helper = "велосипед "
            }
            this.full_car_name = `${car_type_helper}${this.car_brand.value}${car_model_helper}, государственный регистрационный номер 
            ${this.car_reg_number.value}${vin}${year} (далее – Транспортное средство)`
        }

        this.contract_paragraph_all = ""

        //Создание экземпляров договоров страхования
        var number_of_contracts = $('.car_contract_' + id).length;
        var types = $('.car_contract_type_' + id); //Получение массива требований

        var fo_name = $('.car_contract_osago_fo_name_' + id)
        var number = $('.car_contract_osago_fo_number_' + id)
        var date_conclusion = $('.car_contract_osago_fo_date_conclusion_' + id)
        var date_start = $('.car_contract_osago_fo_date_start_' + id)
        var date_end = $('.car_contract_osago_fo_date_end_' + id)

        var insurance_rules = $('.car_contract_casco_insurance_rules_' + id)
        var insurance_rules_approver_name = $('.car_contract_casco_insurance_rules_approver_name_' + id)
        var insurance_rules_approver_post = $('.car_contract_casco_insurance_rules_approver_post_' + id)
        var insurance_rules_date = $('.car_contract_casco_insurance_rules_date_' + id)
        var insurance_rules_number = $('.car_contract_casco_insurance_rules_number_' + id)

        var insurance_inspection_information = $('.car_contract_casco_insurance_inspection_information_' + id)
        var insurance_inspection_date = $('.car_contract_casco_insurance_inspection_date_' + id)
        var insurance_inspection_damaged_parts = $('.car_contract_casco_insurance_inspection_damaged_parts_' + id)

        var insurance_summ_summ = $('.car_contract_casco_insurance_summ_summ_' + id)
        var insurance_summ_index = $('.car_contract_casco_insurance_summ_index_' + id)
        var insurance_summ_aggregate = $('.car_contract_casco_insurance_summ_aggregate_' + id)
        var insurance_summ_risks = $('.car_contract_casco_insurance_summ_risks_' + id)

        var insurance_premium_information = $('.car_contract_casco_insurance_premium_information_' + id)
        var insurance_premium_summ = $('.car_contract_casco_insurance_premium_summ_' + id)
        var insurance_premium_date = $('.car_contract_casco_insurance_premium_date_' + id)
        var insurance_premium_number = $('.car_contract_casco_insurance_premium_number_' + id)
        var insurance_premium_risks = $('.car_contract_casco_insurance_premium_risks_' + id)

        var beneficiary_subject = $('.car_contract_casco_beneficiary_subject_' + id)
        var beneficiary_subject_bank_name = $('.car_contract_casco_beneficiary_subject_bank_name_' + id)
        var beneficiary_risks = $('.car_contract_casco_beneficiary_risks_' + id)

        var franchise_presence = $('.car_contract_casco_franchise_presence_' + id)
        var franchise_type = $('.car_contract_casco_franchise_type_' + id)
        var franchise_summ = $('.car_contract_casco_franchise_summ_' + id)
        var franchise_risks = $('.car_contract_casco_franchise_risks_' + id)

        for (let i = 0; i < number_of_contracts; i++) {

            switch (types[i].options.selectedIndex) {
                case 1:
                    fo_name = $('.car_contract_osago_fo_name_' + id)
                    number = $('.car_contract_osago_fo_number_' + id)
                    date_conclusion = $('.car_contract_osago_fo_date_conclusion_' + id)
                    date_start = $('.car_contract_osago_fo_date_start_' + id)
                    date_end = $('.car_contract_osago_fo_date_end_' + id)
                    break;
                case 2:
                    fo_name = $('.car_contract_casco_fo_name_' + id)
                    number = $('.car_contract_casco_fo_number_' + id)
                    date_conclusion = $('.car_contract_casco_fo_date_conclusion_' + id)
                    date_start = $('.car_contract_casco_fo_date_start_' + id)
                    date_end = $('.car_contract_casco_fo_date_end_' + id)
                    break;
            
                default:
                    break;
            }

            this.car_contracts[i] = new DtpParticipantContract(i + 1,
                types[i],
                fo_name[i],
                number[i],
                date_conclusion[i],
                date_start[i],
                date_end[i],
                insurance_rules[i],
                insurance_rules_approver_name[i],
                insurance_rules_approver_post[i],
                insurance_rules_date[i],
                insurance_rules_number[i],
                insurance_inspection_information[i],
                insurance_inspection_date[i],
                insurance_inspection_damaged_parts[i],
                insurance_summ_summ[i],
                insurance_summ_index[i],
                insurance_summ_aggregate[i],
                insurance_summ_risks[i],
                insurance_premium_information[i],
                insurance_premium_summ[i],
                insurance_premium_date[i],
                insurance_premium_number[i],
                insurance_premium_risks[i],
                beneficiary_subject[i],
                beneficiary_subject_bank_name[i],
                beneficiary_risks[i],
                franchise_presence[i],
                franchise_type[i],
                franchise_summ[i],
                franchise_risks[i])
            this.car_contractsObjects[i] = this.car_contracts[i].setObject()
            
            var main_fo_name = document.querySelector("#fo_name").value
            let fo_name_nominative = this.car_contracts[i].fo_name.value
            let fo_name_genitive = this.car_contracts[i].fo_name.value
            let fo_name_accusative = this.car_contracts[i].fo_name.value
            let fo_name_instrumental = this.car_contracts[i].fo_name.value
            var osago_def = ""
            var casco_def = ""

            if (main_fo_name == fo_name_instrumental) {
                osago_def = " (далее – Договор ОСАГО)"
                casco_def = " (далее – Договор КАСКО)"
                fo_name_nominative = "Финансовая организация"
                fo_name_genitive = "Финансовой организации"
                fo_name_instrumental = "Финансовой организацией"
                fo_name_accusative = "Финансовую организацию"
            }

            if (this.id == 1) {
                switch (this.car_contracts[i].type.options.selectedIndex) {
                    case 1:
                        let date_conclusion_helper = "Между"
                        if (this.car_contracts[i].date_conclusion.value != "") {
                            date_conclusion_helper = `${this.car_contracts[i].getConclusionDateFormatted()} между`
                        }
                        let contract_period_helper = ""
                        if (this.car_contracts[i].date_start.value != "" && this.car_contracts[i].date_end.value != "") {
                            contract_period_helper = ` со сроком страхования с ${this.car_contracts[i].getStartDateFormatted()} 
                            по ${this.car_contracts[i].getEndDateFormatted()}`
                        }
                        this.car_contracts[i].contract_paragraph = `<p>${date_conclusion_helper} Заявителем и ${fo_name_instrumental} 
                        заключен договор ОСАГО серии ${this.car_contracts[i].number.value}${contract_period_helper}${osago_def}.</p>`
                        break
                    case 2:
                        //Формирование параграфа про предстраховой осмотр
                        var insurance_inspection_paragraph = ""
                        if (this.car_contracts[i].insurance_inspection_information.options.selectedIndex == 1) {
                            insurance_inspection_paragraph = `<p>${this.car_contracts[i].getInsuranceInspectionsDateFormatted()} 
                            ${fo_name_instrumental} проведен предстраховой осмотр принадлежащего Заявителю 
                            Транспортного средства. В результате осмотра выявлены повреждения следующих элементов и деталей 
                            Транспортного средства: ${this.car_contracts[i].insurance_inspection_damaged_parts.value}, что подтверждается 
                            актом осмотра Транспортного средства от ${this.car_contracts[i].getInsuranceInspectionsDateFormatted()}, 
                            подписанным Заявителем и представителем ${this.car_contracts[i].fo_name.value}.</p>`
                        } else if (this.car_contracts[i].insurance_inspection_information.options.selectedIndex == 2) {
                            insurance_inspection_paragraph = `<p>Сведений о проведении ${fo_name_instrumental} 
                            предстрахового осмотра Транспортного средства не имеется.</p>`
                        }
                        //Добавление "не" к типу страховой суммы индексируемыя, агрегатная
                        var insurance_summ_index_helper = ""
                        var insurance_summ_aggregate_helper = ""
                        if (this.car_contracts[i].insurance_summ_index.options.selectedIndex == 2) {
                            insurance_summ_index_helper = "не"
                        }
                        if (this.car_contracts[i].insurance_summ_aggregate.options.selectedIndex == 2) {
                            insurance_summ_aggregate_helper = "не"
                        }
                        //Изменение числа рисков страховой суммы
                        var insurance_summ_risks_helper = ""
                        if (this.car_contracts[i].insurance_summ_risks.value.indexOf(",") == -1) {
                            insurance_summ_risks_helper = "риску"
                        } else {
                            insurance_summ_risks_helper = "рискам"
                        }
                        //Изменение числа рисков страховой премии
                        var insurance_premium_risks_helper = ""
                        if (this.car_contracts[i].insurance_premium_risks.value.indexOf(",") == -1) {
                            insurance_premium_risks_helper = "риску"
                        } else {
                            insurance_premium_risks_helper = "рискам"
                        }
                        var insurance_premium_paragraph = ""
                        if (this.car_contracts[i].insurance_premium_information.options.selectedIndex == 1) {
                            insurance_premium_paragraph = `<p>Страховая премия по ${insurance_premium_risks_helper} 
                            ${this.car_contracts[i].insurance_premium_risks.value} составила 
                            ${makeRubText_genitive(this.car_contracts[i].insurance_premium_summ)} и была оплачена Заявителем 
                            ${this.car_contracts[i].getInsurancePremiumDateFormatted()}, что подтверждается квитанцией 
                            на получение страховой премии (взноса) № ${this.car_contracts[i].insurance_premium_number.value}.</p>`
                        } else if (this.car_contracts[i].insurance_premium_information.options.selectedIndex == 2) {
                            insurance_premium_paragraph = `<p>Сведения об оплате Заявителем страховой премии Финансовому 
                            уполномоченную предоставлены не были.</p>`
                        } else if (this.car_contracts[i].insurance_premium_information.options.selectedIndex == 3) {
                            insurance_premium_paragraph = `<p>Факт оплаты страховой премии не оспаривается Заявителем.</p>`
                        }
                        //Изменение числа рисков выгодоприобретателя
                        var beneficiary_risks_helper = ""
                        if (this.car_contracts[i].beneficiary_risks.value.indexOf(",") == -1) {
                            beneficiary_risks_helper = "риску"
                        } else {
                            beneficiary_risks_helper = "рискам"
                        }
                        //Формирование параграфа про выгодоприобретателя
                        var beneficiary_paragraph = ""
                        if (this.car_contracts[i].beneficiary_subject.options.selectedIndex == 1) {
                            beneficiary_paragraph = `<p>Выгодоприобретателем по Договору КАСКО по ${beneficiary_risks_helper} 
                            ${this.car_contracts[i].beneficiary_risks.value} является Заявитель.</p>`
                        } else if (this.car_contracts[i].beneficiary_subject.options.selectedIndex == 2) {
                            beneficiary_paragraph = `<p>Выгодоприобретателем по Договору КАСКО по ${beneficiary_risks_helper} 
                            ${this.car_contracts[i].beneficiary_risks.value} 
                            является ${this.car_contracts[i].beneficiary_subject_bank_name.value} (далее – Банк), 
                            в размере неисполненных обязательств собственника Транспортного средства перед Банком 
                            по кредитному договору, существующих на момент выплаты страхового возмещения, а в оставшейся 
                            части страхового возмещения выгодоприобретателем является Заявитель.</p>`
                        }

                        //Формирование параграфа про франшизу
                        var franchise_type_helper = ""
                        if (this.car_contracts[i].franchise_type.options.selectedIndex == 1) {
                            franchise_type_helper = "условная"
                        } else if (this.car_contracts[i].franchise_type.options.selectedIndex == 2) {
                            franchise_type_helper = "безусловная"
                        }
                        //Изменение числа рисков франшизы
                        var franchise_risks_helper = ""
                        if (this.car_contracts[i].franchise_risks.value.indexOf(",") == -1) {
                            franchise_risks_helper = "риску"
                        } else {
                            franchise_risks_helper = "рискам"
                        }
                        var franchise_paragraph = ""
                        if (this.car_contracts[i].franchise_presence.options.selectedIndex == 1) {
                            franchise_paragraph = `<p>Договором КАСКО установлена ${franchise_type_helper} франшиза 
                            по ${franchise_risks_helper} ${this.car_contracts[i].franchise_risks.value} 
                            в размере ${makeRubText_genitive(this.car_contracts[i].franchise_summ)}.</p>`
                        } else if (this.car_contracts[i].franchise_presence.options.selectedIndex == 2) {
                            franchise_paragraph = `<p>Договором КАСКО франшиза не установлена.</p>`
                        }

                        this.car_contracts[i].contract_paragraph = `<p>${this.car_contracts[i].getConclusionDateFormatted()} между Заявителем и ${fo_name_instrumental} 
                        заключен договор добровольного страхования серии ${this.car_contracts[i].number.value}  со сроком страхования с ${this.car_contracts[i].getStartDateFormatted()} 
                        по ${this.car_contracts[i].getEndDateFormatted()}${casco_def}, неотъемлемой частью которого являются ${this.car_contracts[i].insurance_rules.value} 
                        № ${this.car_contracts[i].insurance_rules_number.value} от ${this.car_contracts[i].getInsuranceRulesDateFormatted()}, утвержденные 
                        ${this.car_contracts[i].insurance_rules_approver_post.value} ${fo_name_genitive} ${this.car_contracts[i].insurance_rules_approver_name.value} 
                        (далее – Правила страхования).</p>
                        <p>По Договору КАСКО застрахованы имущественные интересы Заявителя, связанные, в том числе, с риском утраты (гибели) или повреждения принадлежащего Заявителю 
                        на праве собственности транспортного средства ${this.full_car_name}.</p>
                        ${insurance_inspection_paragraph}
                        <p>Страховая сумма по ${insurance_summ_risks_helper} ${this.car_contracts[i].insurance_summ_risks.value} составила ${makeRubText_genitive(this.car_contracts[i].insurance_summ_summ)} 
                        на дату заключения Договора КАСКО. Страховая сумма по Договору КАСКО является ${insurance_summ_index_helper}индексируемой, ${insurance_summ_aggregate_helper}агрегатной.</p>
                        ${insurance_premium_paragraph}
                        ${beneficiary_paragraph}
                        ${franchise_paragraph}`
                        break
                    case 4:
                        this.car_contracts[i].contract_paragraph = `<p>Сведений о заключении Заявителем Договора ОСАГО 
                        Финансовому уполномоченному не предоставлено.</p>`
                        break
                    default:
                        break
                }
            } else {
                switch (this.car_contracts[i].type.options.selectedIndex) {
                    case 1:
                        let contract_period_helper = ""
                        if (this.car_contracts[i].date_start.value != "" && 
                            this.car_contracts[i].date_end.value != "") {
                                contract_period_helper = ` со сроком страхования с ${this.car_contracts[i].getStartDateFormatted()}
                            по ${this.car_contracts[i].getEndDateFormatted()}`
                        }
                        this.car_contracts[i].contract_paragraph = `<p>Гражданская ответственность ${this.driver_name_genitive} 
                        застрахована в ${fo_name_genitive} в рамках договора ОСАГО серии 
                        ${this.car_contracts[i].number.value}${contract_period_helper}${osago_def}.</p>`
                        break
                    case 2:
        
                        break
                    case 4:
                        this.car_contracts[i].contract_paragraph = `<p>Гражданская ответственность ${this.driver_name_genitive} 
                        на момент ДТП застрахована не была.</p>`
                        break
                    default:
                        break
                }
            }
            this.contract_paragraph_all = this.contract_paragraph_all + this.car_contracts[i].contract_paragraph
        }
    }

    setObject() {
        return {
            id : this.id,
            car_brand : this.car_brand.value,
            car_model : this.car_model.value,
            car_reg_number : this.car_reg_number.value,
            car_vin_number : this.car_vin_number.value,
            car_year : parseInt(this.car_year.value),
            car_type : this.car_type.value,
            car_weight : this.car_weight.value,
            driver_name : this.driver_name.value,
            driver_gender : this.driver_gender,
            owner_name : this.owner_name.value,
            owner_gender : this.owner_gender,
            is_guilty : this.is_guilty.value,
            car_contractsObjects : this.car_contractsObjects,
        }
    }
}