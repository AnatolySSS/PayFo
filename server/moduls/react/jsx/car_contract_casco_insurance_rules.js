import React, { useState } from "react";
import { validationCheck, validationCheckUpdate } from "../validationCheck"

export const Car_contract_casco_insurance_rules = () => {
  const [count, setCount] = useState(1);

  return (
    <div className="car_contract_casco_insurance_rules">
        <div className="form-row">
        <div className="form-group col-md-6">
            <h6>Сведения о правилах страхования</h6>
        </div>
        </div>
        <div className="form-row">
        <div className="form-group col-md-12">
            <input id={"car_contract_casco_insurance_rules_" + count} className="" placeholder="Наименование правил страхования" type="text" size="8" required />
        </div>
        </div>
        <div className="form-row">
        <div className="form-group col-md-6">
            <input id={"car_contract_casco_insurance_rules_approver_name_" + count} className="" placeholder="ФИО утвердившего" type="text" size="8" required />
        </div>
        <div className="form-group col-md-6">
            <input id={"car_contract_casco_insurance_rules_approver_post_" + count}className="" placeholder="Должность утвердившего" type="text" size="8" required />
        </div>
        </div>
        <div className="form-row">
        <div className="form-group col-md-3">
            <input id={"car_contract_casco_insurance_rules_date_" + count} className = "datepicker-here " placeholder="Дата" type="text" size="10" required />
        </div>
        <div className="form-group col-md-3">
            <input id={"car_contract_casco_insurance_rules_number_" + count} className="" placeholder="№" type="text" size="8" required />
        </div>
        </div>
    </div>
  )
}