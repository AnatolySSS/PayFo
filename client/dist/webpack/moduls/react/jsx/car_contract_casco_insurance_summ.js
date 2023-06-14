import React, { useState } from "react";

export const Car_contract_casco_insurance_summ = () => {
  const [count, setCount] = useState(1);

  return (
    <div className="car_contract_casco_insurance_summ">
        <div className="form-row">
            <div className="form-group col-md-6">
                <h6>Сведения о страховой сумме</h6>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-3">
                <div className="input-group">
                <input id={"car_contract_casco_insurance_summ_summ_" + count} className = "input-numeral " placeholder="Сумма" type="text" size="10" required />
                    <div className="input-group-append">
                        <span className="input-group-text">&#8381;</span>
                    </div>
                </div>
            </div>
            <div className="form-group col-md-3">
                <select id={"car_contract_casco_insurance_summ_index_" + count} className="car_contract_casco_insurance_summ_indexes custom-select " required>
                    <option value="">Вид суммы</option>
                    <option>Индексируемая</option>
                    <option>Не индексируемая</option>
                </select>
            </div>
            <div className="form-group col-md-3">
                <select id={"car_contract_casco_insurance_summ_aggregate_" + count} className="car_contract_casco_insurance_summ_aggregates custom-select " required>
                    <option value="">Тип суммы</option>
                    <option>Агрегатная</option>
                    <option>Не агрегатная</option>
                </select>
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-12">
                <textarea id={"car_contract_casco_insurance_summ_risks_" + count} className="" aria-describedby={"car_contract_casco_insurance_summ_risks_help_block_" + count} placeholder="Перечень рисков" type="text" size="8" required></textarea>
                <small id={"car_contract_casco_insurance_summ_risks_help_block_" + count} className="form-text">
                Перечислите риски, покрываемые страховой суммой
                </small>
            </div>
        </div>
    </div>
  )
}