var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState } from "react";
import { validationCheck, validationCheckUpdate } from "../validationCheck";

export var Car_contract_casco_insurance_inspection_information = function Car_contract_casco_insurance_inspection_information() {
    var _useState = useState(1),
        _useState2 = _slicedToArray(_useState, 2),
        count = _useState2[0],
        setCount = _useState2[1];

    return React.createElement(
        "div",
        { className: "car_contract_casco_insurance_inspection_information" },
        React.createElement(
            "div",
            { className: "form-row" },
            React.createElement(
                "div",
                { className: "form-group col-md-9" },
                React.createElement(
                    "h6",
                    null,
                    "\u0421\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u043E \u043F\u0440\u0435\u0434\u0441\u0442\u0440\u0430\u0445\u043E\u0432\u043E\u043C \u043E\u0441\u043C\u043E\u0442\u0440\u0435"
                )
            )
        ),
        React.createElement(
            "div",
            { className: "form-row" },
            React.createElement(
                "div",
                { className: "form-group col-md-6" },
                React.createElement(
                    "select",
                    { id: "car_contract_casco_insurance_inspection_information_" + count, className: "car_contract_casco_insurance_inspection_informations custom-select ", required: true },
                    React.createElement(
                        "option",
                        { value: "" },
                        "\u041D\u0430\u043B\u0438\u0447\u0438\u0435 \u0441\u0432\u0435\u0434\u0435\u043D\u0438\u0439"
                    ),
                    React.createElement(
                        "option",
                        null,
                        "\u0421\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0438\u043C\u0435\u044E\u0442\u0441\u044F"
                    ),
                    React.createElement(
                        "option",
                        null,
                        "\u0421\u0432\u0435\u0434\u0435\u043D\u0438\u0439 \u043D\u0435 \u0438\u043C\u0435\u0435\u0442\u0441\u044F"
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "form-group col-md-3", style: { display: 'none' } },
                React.createElement("input", { id: "car_contract_casco_insurance_inspection_date_" + count, className: "datepicker-here", placeholder: "\u0414\u0430\u0442\u0430", type: "text", size: "10", required: true })
            )
        ),
        React.createElement(
            "div",
            { className: "form-row", style: { display: 'none' } },
            React.createElement(
                "div",
                { className: "form-group col-md-12" },
                React.createElement("textarea", { id: "car_contract_casco_insurance_inspection_damaged_parts_" + count, className: "", "aria-describedby": "car_contract_casco_insurance_inspection_damaged_parts_help_block_" + count, placeholder: "\u041F\u0435\u0440\u0435\u0447\u0435\u043D\u044C \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u043D\u044B\u0445 \u0434\u0435\u0442\u0430\u043B\u0435\u0439", type: "text", size: "8", required: true }),
                React.createElement(
                    "small",
                    { id: "car_contract_casco_insurance_inspection_damaged_parts_help_block_" + count, className: "form-text" },
                    "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0447\u0435\u0440\u0435\u0437 \u0437\u0430\u043F\u044F\u0442\u0443\u044E \u043D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u044F \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432 \u0438 \u0434\u0435\u0442\u0430\u043B\u0435\u0439, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0438\u0445 \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u044F"
                )
            )
        )
    );
};

// //Добавляет период взыскания неустойки судом
// $(document).on("change", ".car_contract_casco_insurance_inspection_informations", function (event) {
//     var _this = this;

//     if ($(this).find(':selected').text() == "Сведения имеются") {
//         $(this).parent().next().show('fast');
//         $(this).parent().parent().next().show('fast');
//         $(this).parent().next().find('input').addClass('');
//         $(this).parent().parent().next().find('textarea').addClass('');
//     } else {
//         $(this).parent().next().hide('fast');
//         $(this).parent().parent().next().hide('fast');
//         setTimeout(function () {
//             $(_this).parent().next().find('input').removeClass('');
//             $(_this).parent().parent().next().find('textarea').removeClass('');
//         }, 200);
//     }

//     validationCheckUpdate('.dtp-description');
// });