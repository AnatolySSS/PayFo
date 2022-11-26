var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState } from "react";
import { validationCheck, validationCheckUpdate } from "../validationCheck";

export var Car_contract_select = function Car_contract_select() {
    var _useState = useState(1),
        _useState2 = _slicedToArray(_useState, 2),
        count = _useState2[0],
        setCount = _useState2[1];

    return React.createElement(
        "div",
        { id: "car_contract_select_" + count, className: "form-row" },
        React.createElement(
            "div",
            { className: "form-group col-md-5" },
            React.createElement(
                "select",
                { id: "car_contract_type_" + count, className: "car_contract_types custom-select form-control col-md-12", required: true },
                React.createElement(
                    "option",
                    { value: "" },
                    "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043F \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430"
                ),
                React.createElement(
                    "option",
                    null,
                    "\u041E\u0421\u0410\u0413\u041E"
                ),
                React.createElement(
                    "option",
                    null,
                    "\u041A\u0410\u0421\u041A\u041E"
                ),
                React.createElement(
                    "option",
                    null,
                    "\u0414\u0421\u0410\u0413\u041E"
                ),
                React.createElement(
                    "option",
                    null,
                    "\u041D\u0435 \u0437\u0430\u0441\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D"
                )
            )
        ),
        React.createElement(
            "div",
            { className: "form-group col-ms-1" },
            React.createElement(
                "button",
                { id: "add_car_contract_info_btn_" + count, className: "add_car_contract_info_btns btn btn-outline-warning add_info" },
                React.createElement("i", { className: "fa fa-chevron-down toggle" })
            )
        ),
        React.createElement(Add_Button, { count: count })
    );
};

var Add_Button = function Add_Button(props) {
    if (props.count == 1) {
        return React.createElement(
            "div",
            { className: "form-group col-ms-1" },
            React.createElement(
                "button",
                { id: "car_contract_btn_" + props.count, className: "car_contract_btns btn btn-outline-warning", onClick: addCarContract() },
                "+"
            )
        );
    } else {
        return React.createElement(
            "div",
            { className: "form-group col-ms-1" },
            React.createElement(
                "button",
                { id: "car_contract_btn_" + props.count, className: "car_contract_btns btn btn-outline-danger", onClick: removeCarContract() },
                "\xD7"
            )
        );
    }
};

var addCarContract = function addCarContract() {};
var removeCarContract = function removeCarContract() {};

// //Добавляет период взыскания неустойки судом
// $(document).on("change", ".car_contract_casco_insurance_inspection_informations", function (event) {
//     var _this = this;

//     if ($(this).find(':selected').text() == "Сведения имеются") {
//         $(this).parent().next().show('fast');
//         $(this).parent().parent().next().show('fast');
//         $(this).parent().next().find('input').addclassName('form-control');
//         $(this).parent().parent().next().find('textarea').addclassName('form-control');
//     } else {
//         $(this).parent().next().hide('fast');
//         $(this).parent().parent().next().hide('fast');
//         setTimeout(function () {
//             $(_this).parent().next().find('input').removeclassName('form-control');
//             $(_this).parent().parent().next().find('textarea').removeclassName('form-control');
//         }, 200);
//     }

//     validationCheckUpdate('.dtp-description');
// });