import { changeDateType } from './changeDateType.js';
import { DATE_EURO_START } from './variables.js';

//Расчет страховой суммы
export function findMaxSumm() {
    let europrotocol = document.querySelector('#europrotocol').checked;
    let date_dtp = document.querySelector('#date_dtp').value;
    date_dtp = changeDateType(date_dtp);
    date_dtp = Date.parse(date_dtp + 'T00:00:00');
    let max_summ

    if (date_dtp >= DATE_EURO_START && europrotocol) { // Если дата ДТП после 01.06.2018 И Европротокол
        max_summ = 100000;
    } else if (date_dtp >= DATE_EURO_START && !europrotocol){ // Если дата ДТП после 01.06.2018 И НЕ Европротокол
        max_summ = 400000;
    } else if (date_dtp < DATE_EURO_START && europrotocol) { // Если дата ДТП до 01.06.2018 И Европротокол
        max_summ = 50000;
    } else if (date_dtp < DATE_EURO_START && !europrotocol) { // Если дата ДТП до 01.06.2018 И НЕ Европротокол
        max_summ = 400000;
    } else if (europrotocol) { //Если Европротокол (без указания даты)
        max_summ = 100000;
    } else { // остальные случаи
        max_summ = 400000;
    }
    return max_summ
}
