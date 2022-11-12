import React, { useState } from "react";

export const Car_contract_casco_general_info = () => {
  const [count, setCount] = useState(1);

  return (
    <div className="car_contract_casco_general_info">
        <div className="form-row">
        <div className="form-group col-md-9">
            <h6>Общие сведения о договоре страхования КАСКО</h6>
        </div>
        </div>
        <div className="form-row">
        <div className="form-group col-md-6">
            <div className="autocomplete">
            <input id={"car_contract_casco_fo_name_" + count} className="" type="text" placeholder="Введите наименование ФО" size="40" required />
            </div>
        </div>
        <div className="form-group col-md-6">
            <input id = {"car_contract_casco_fo_number_" + count} className="" placeholder="серия и № полиса" type="text" size="8" required />
        </div>
        </div>
        <div className="form-row">
        <div className="form-group col-md-3">
            <input id = {"car_contract_casco_fo_date_conclusion_" + count} className = "datepicker-here " aria-describedby={"car_contract_casco_fo_date_conclusion_help_block_" + count} placeholder="Дата" type="text" size="10" required />
            <small id={"car_contract_casco_fo_date_conclusion_help_block_" + count} className="form-text">
            Заключение договора
            </small>
        </div>
        <div className="form-group col-md-3">
            <input id = {"car_contract_casco_fo_date_start_" + count} className = "datepicker-here " aria-describedby={"car_contract_casco_fo_date_start_help_block_" + count} placeholder="Дата" type="text" size="10" required />
            <small id={"car_contract_casco_fo_date_start_help_block_" + count} className="form-text">
            Начало срока действия
            </small>
        </div>
        <div className="form-group col-md-3">
            <input id = {"car_contract_casco_fo_date_end_" + count} className = "datepicker-here " aria-describedby={"car_contract_casco_fo_date_end_help_block_" + count} placeholder="Дата" type="text" size="10" required />
            <small id={"car_contract_casco_fo_date_end_help_block_" + count} className="form-text">
            Окончание срока действия
            </small>
        </div>
        </div>
    </div>
  )
}