var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState } from "react";
import { validationCheck, validationCheckUpdate } from "../validationCheck";

export var Car_contract_osago_info = function Car_contract_osago_info() {
    var _useState = useState(1),
        _useState2 = _slicedToArray(_useState, 2),
        count = _useState2[0],
        setCount = _useState2[1];

    return React.createElement(
        "div",
        { id: "car_contract_osago_info_" + count, className: "car_contract_osago_infos", style: { display: 'none' } },
        React.createElement(
            "div",
            { className: "form-row" },
            React.createElement(
                "div",
                { className: "form-group col-md-9" },
                React.createElement(
                    "h6",
                    null,
                    "\u041E\u0431\u0449\u0438\u0435 \u0441\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u043E \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0435 \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u0438\u044F \u041E\u0421\u0410\u0413\u041E"
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
                    "div",
                    { className: "autocomplete" },
                    React.createElement("input", { id: "car_contract_osago_fo_name_" + count, type: "text", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u0424\u041E", size: "40", required: true })
                )
            ),
            React.createElement(
                "div",
                { className: "form-group col-md-6" },
                React.createElement("input", { id: "car_contract_osago_fo_number_" + count, placeholder: "\u0441\u0435\u0440\u0438\u044F \u0438 \u2116 \u043F\u043E\u043B\u0438\u0441\u0430", type: "text", size: "8", required: true })
            )
        ),
        React.createElement(
            "div",
            { className: "form-row" },
            React.createElement(
                "div",
                { className: "form-group col-md-3" },
                React.createElement("input", { id: "car_contract_osago_fo_date_conclusion_" + count, className: "datepicker-here", "aria-describedby": "car_contract_osago_fo_date_conclusion_help_block_" + count, placeholder: "\u0414\u0430\u0442\u0430", type: "text", size: "10", required: true }),
                React.createElement(
                    "small",
                    { id: "car_contract_osago_fo_date_conclusion_help_block_" + count, className: "form-text" },
                    "\u0417\u0430\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0434\u0433\u043E\u0432\u043E\u0440\u0430"
                )
            ),
            React.createElement(
                "div",
                { className: "form-group col-md-3" },
                React.createElement("input", { id: "car_contract_osago_fo_date_start_" + count, className: "datepicker-here", "aria-describedby": "car_contract_osago_fo_date_start_help_block_" + count, placeholder: "\u0414\u0430\u0442\u0430", type: "text", size: "10", required: true }),
                React.createElement(
                    "small",
                    { id: "car_contract_osago_fo_date_start_help_block_" + count, className: "form-text" },
                    "\u041D\u0430\u0447\u0430\u043B\u043E \u0441\u0440\u043E\u043A\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F"
                )
            ),
            React.createElement(
                "div",
                { className: "form-group col-md-3" },
                React.createElement("input", { id: "car_contract_osago_fo_date_end_" + count, className: "datepicker-here", "aria-describedby": "car_contract_osago_fo_date_end_help_block_" + count, placeholder: "\u0414\u0430\u0442\u0430", type: "text", size: "10", required: true }),
                React.createElement(
                    "small",
                    { id: "car_contract_osago_fo_date_end_help_block_" + count, className: "form-text" },
                    "\u041E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0435 \u0441\u0440\u043E\u043A\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F"
                )
            )
        )
    );
};