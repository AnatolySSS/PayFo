import React, { useState } from "react";
import { validationCheck, validationCheckUpdate } from "../validationCheck"

export const Car_contract_select = () => {
  const [count, setCount] = useState(1);

  return (
    <div id={"car_contract_select_" + count} className="form-row">
        <div className="form-group col-md-5">
            <select id={"car_contract_type_" + count} className="car_contract_types custom-select form-control col-md-12" required>
                <option value="">Выберите тип договора</option>
                <option>ОСАГО</option>
                <option>КАСКО</option>
                <option>ДСАГО</option>
                <option>Не застрахован</option>
            </select>
        </div>
        <div className="form-group col-ms-1">
            <button id={"add_car_contract_info_btn_" + count} className="add_car_contract_info_btns btn btn-outline-warning add_info">
                <i className="fa fa-chevron-down toggle"></i>
            </button>
        </div>
        <Add_Button count={count} />
    </div>
  )
}

const Add_Button = (props) => {
    if (props.count == 1) {
        return (
            <div className="form-group col-ms-1">
                <button id={"car_contract_btn_" + props.count} className="car_contract_btns btn btn-outline-warning" onClick={addCarContract()}>+</button>
            </div>
        )
    } else {
        return (
            <div className="form-group col-ms-1">
                <button id={"car_contract_btn_" + props.count} className="car_contract_btns btn btn-outline-danger" onClick={removeCarContract()}>×</button>
            </div>
        )
    }
}

const addCarContract = () => {
    $('.car-contracts').append(str);
    $('.car-contracts .datepicker-here').toArray().forEach(element => {
        element.datepicker()
    });

    $('.datepicker-here').toArray().forEach(function(field){
        new Cleave(field, {
          date: true,
          delimiter: '.',
          datePattern: ['d', 'm', 'Y']
        })
    });

    //Форматирование суммы
    $('.input-numeral').toArray().forEach(function(field){
        new Cleave(field, {
        numeral: true,
        delimiter: ' ',
        //numeralThousandsGroupStyle: 'none',
        numeralPositiveOnly: true,
        numeralIntegerScale: 8
    })
  });

  //Вызывает функцию, изменяющую общую картинку валидации
  validationCheck('.main-claims-all')
  validationCheckUpdate('.main-claims-all')
}
const removeCarContract = () => {
    
}

//Добавляет период взыскания неустойки судом
$(document).on("change", ".car_contract_casco_insurance_inspection_informations", function (event) {
	if ($(this).find(':selected').text() == "Сведения имеются") {
		$(this).parent().next().show('fast')
        $(this).parent().parent().next().show('fast')
        $(this).parent().next().find('input').addclassName('form-control')
        $(this).parent().parent().next().find('textarea').addclassName('form-control')
	} else {
        $(this).parent().next().hide('fast')
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().next().find('input').removeclassName('form-control')
            $(this).parent().parent().next().find('textarea').removeclassName('form-control')
        }, 200);
        
	}

    validationCheckUpdate('.dtp-description')

});