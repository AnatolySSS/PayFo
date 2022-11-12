import React, { useState } from "react";
import { validationCheck, validationCheckUpdate } from "../validationCheck"

export const Car_contract_casco_insurance_inspection_information = () => {
  const [count, setCount] = useState(1);

  return (
    <div className="car_contract_casco_insurance_inspection_information">
        <div className="form-row">
            <div className="form-group col-md-9">
                <h6>Сведения о предстраховом осмотре</h6>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-6">
                <select id={"car_contract_casco_insurance_inspection_information_" + count} className="car_contract_casco_insurance_inspection_informations custom-select " required>
                    <option value="">Наличие сведений</option>
                    <option>Сведения имеются</option>
                    <option>Сведений не имеется</option>
                </select>
            </div>
            <div className="form-group col-md-3" style={{display:'none'}}>
                <input id={"car_contract_casco_insurance_inspection_date_" + count} className = "datepicker-here" placeholder="Дата" type="text" size="10" required />
            </div>
        </div>
        <div className="form-row" style={{display:'none'}}>
            <div className="form-group col-md-12">
                <textarea id={"car_contract_casco_insurance_inspection_damaged_parts_" + count} className="" aria-describedby={"car_contract_casco_insurance_inspection_damaged_parts_help_block_" + count} placeholder="Перечень поврежденных деталей" type="text" size="8" required></textarea>
                <small id={"car_contract_casco_insurance_inspection_damaged_parts_help_block_" + count} className="form-text">
                    Введите через запятую наименования элементов и деталей, а также их повреждения
                </small>
            </div>
        </div>
    </div>
  )
}

//Добавляет информацию о проведении предстрахового осмотра
$(document).on("change", ".car_contract_casco_insurance_inspection_informations", function (event) {
	if ($(this).find(':selected').text() == "Сведения имеются") {
		$(this).parent().next().show('fast')
        $(this).parent().parent().next().show('fast')
        $(this).parent().next().find('input').addClass('')
        $(this).parent().parent().next().find('textarea').addClass('')
	} else {
        $(this).parent().next().hide('fast')
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().next().find('input').removeClass('')
            $(this).parent().parent().next().find('textarea').removeClass('')
        }, 200);
        
	}

    validationCheckUpdate('.dtp-description')

});