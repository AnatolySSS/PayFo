import React, { useState } from "react";
import { validationCheck, validationCheckUpdate } from "../validationCheck"

import { Car_contract_casco_insurance_premium } from "./car_contract_casco_insurance_premium";
import { Car_contract_casco_insurance_summ } from "./car_contract_casco_insurance_summ";
import { Car_contract_casco_insurance_inspection_information } from "./car_contract_casco_insurance_inspection_information";
import { Car_contract_casco_insurance_rules } from "./car_contract_casco_insurance_rules";
import { Car_contract_casco_general_info } from "./car_contract_casco_general_info";

export const Car_contract_casco_info = () => {
    const [count, setCount] = useState(1);

    return (
        <div id={"car_contract_casco_info_" + count} className="car_contract_casco_infos" style={{display:'none'}}>
            <Car_contract_casco_general_info />
            <Car_contract_casco_insurance_rules />
            <Car_contract_casco_insurance_inspection_information />
            <Car_contract_casco_insurance_summ />
            <Car_contract_casco_insurance_premium />
        </div>
    )
}