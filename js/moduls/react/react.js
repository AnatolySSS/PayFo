import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import { Car_contract_casco_info } from "./car_contract_casco_info";
import { Car_contract_osago_info } from "./car_contract_osago_info";
import { Car_contract_select } from "./car_contract_select";

const Car_contract = () => {
    const [count, setCount] = useState(1);

    return (
        <div id={"car_contract_" + count}>
            <Car_contract_select />
            <Car_contract_osago_info />
            <Car_contract_casco_info />
        </div>
    )
}

const App = () => {
    const [carContracts, setCarContracts] = useState([])

    return (
        carContracts.map((carContract) => {
            return (
                <Car_contract 
                    key={carContract.id}
                />
            )
        })
       
    )
}

export const renderDOM = () => {
    let container = document.querySelector('.car-contracts');
    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    root.render(<App />);
}


// //Показывает информацию по соответствующему полису (ОСАГО, КАСКО. ДСАГО)
// $(document).on("change", ".car_contract_types", function (event) {
// 	if ($(this).find(':selected').text() == "ОСАГО") {
//         //Показываем сведения по полису ОСАГО
// 		$(this).parent().parent().next().show('fast')
//         $(this).parent().parent().next().find('input').addClass('form-control')

//         //Скрываем сведения по полису КАСКО
//         $(this).parent().parent().next().next().hide('fast')
//         setTimeout(() => {
//             $(this).parent().parent().next().next().find('input').removeClass('form-control')
//             $(this).parent().parent().next().next().find('textarea').removeClass('form-control')
//         }, 200);
// 	} else if ($(this).find(':selected').text() == "КАСКО") {
//         //Показываем сведения по полису КАСКО
//         $(this).parent().parent().next().next().show('fast')
//         $(this).parent().parent().next().next().find('input').addClass('form-control')
//         $(this).parent().parent().next().next().find('textarea').addClass('form-control')

//         //Скрываем сведения по полису ОСАГО
//         $(this).parent().parent().next().hide('fast')
//         setTimeout(() => {
//             $(this).parent().parent().next().find('input').removeClass('form-control')
//         }, 200);
// 	} else if ($(this).find(':selected').text() == "ДСАГО") {
//         //Скрываем сведения по полису ОСАГО
//         $(this).parent().parent().next().hide('fast')
//         setTimeout(() => {
//             $(this).parent().parent().next().find('input').removeClass('form-control')
//         }, 200);

//         //Скрываем сведения по полису КАСКО
//         $(this).parent().parent().next().next().hide('fast')
//         setTimeout(() => {
//             $(this).parent().parent().next().next().find('input').removeClass('form-control')
//             $(this).parent().parent().next().next().find('textarea').removeClass('form-control')
//         }, 200);
//     } else {
//         //Скрываем сведения по полису ОСАГО
//         $(this).parent().parent().next().hide('fast')
//         setTimeout(() => {
//             $(this).parent().parent().next().find('input').removeClass('form-control')
//         }, 200);

//         //Скрываем сведения по полису КАСКО
//         $(this).parent().parent().next().next().hide('fast')
//         setTimeout(() => {
//             $(this).parent().parent().next().next().find('input').removeClass('form-control')
//             $(this).parent().parent().next().next().find('textarea').removeClass('form-control')
//         }, 200);
//     }

//     validationCheckUpdate('.dtp-description')

// });