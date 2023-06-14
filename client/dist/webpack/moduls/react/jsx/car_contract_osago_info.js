import React, { useState } from "react";
import { validationCheck, validationCheckUpdate } from "../validationCheck"

export const Car_contract_osago_info = () => {
  const [count, setCount] = useState(1);

  return (
    <div id={"car_contract_osago_info_" + count} className="car_contract_osago_infos" style={{display:'none'}}>
        <div className="form-row">
            <div className="form-group col-md-9">
                <h6>Общие сведения о договоре страхования ОСАГО</h6>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-6">
                <div className="autocomplete">
                    <input id={"car_contract_osago_fo_name_" + count} type="text" placeholder="Введите наименование ФО" size="40" required />
                </div>
            </div>
            <div className="form-group col-md-6">
                <input id={"car_contract_osago_fo_number_" + count} placeholder="серия и № полиса" type="text" size="8" required />
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-3">
                <input id={"car_contract_osago_fo_date_conclusion_" + count} className = "datepicker-here" aria-describedby={"car_contract_osago_fo_date_conclusion_help_block_" + count} placeholder="Дата" type="text" size="10" required />
                <small id={"car_contract_osago_fo_date_conclusion_help_block_" + count} className="form-text">
                    Заключение дговора
                </small>
            </div>
            <div className="form-group col-md-3">
                <input id={"car_contract_osago_fo_date_start_" + count} className = "datepicker-here" aria-describedby={"car_contract_osago_fo_date_start_help_block_" + count} placeholder="Дата" type="text" size="10" required />
                <small id={"car_contract_osago_fo_date_start_help_block_" + count} className="form-text">
                    Начало срока действия
                </small>
            </div>
            <div className="form-group col-md-3">
                <input id={"car_contract_osago_fo_date_end_" + count} className = "datepicker-here" aria-describedby={"car_contract_osago_fo_date_end_help_block_" + count} placeholder="Дата" type="text" size="10" required />
                <small id={"car_contract_osago_fo_date_end_help_block_" + count} className="form-text">
                    Окончание срока действия
                </small>
            </div>
        </div>
    </div>
  )
}