var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState } from "react";
import { validationCheck, validationCheckUpdate } from "../validationCheck";

export var Car_contract_casco_insurance_rules = function Car_contract_casco_insurance_rules() {
    var _useState = useState(1),
        _useState2 = _slicedToArray(_useState, 2),
        count = _useState2[0],
        setCount = _useState2[1];

    return React.createElement(
        "div",
        { className: "car_contract_casco_insurance_rules" },
        React.createElement(
            "div",
            { className: "form-row" },
            React.createElement(
                "div",
                { className: "form-group col-md-6" },
                React.createElement(
                    "h6",
                    null,
                    "\u0421\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u043E \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u0445 \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u0438\u044F"
                )
            )
        ),
        React.createElement(
            "div",
            { className: "form-row" },
            React.createElement(
                "div",
                { className: "form-group col-md-12" },
                React.createElement("input", { id: "car_contract_casco_insurance_rules_" + count, className: "", placeholder: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0430\u0432\u0438\u043B \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u0438\u044F", type: "text", size: "8", required: true })
            )
        ),
        React.createElement(
            "div",
            { className: "form-row" },
            React.createElement(
                "div",
                { className: "form-group col-md-6" },
                React.createElement("input", { id: "car_contract_casco_insurance_rules_approver_name_" + count, className: "", placeholder: "\u0424\u0418\u041E \u0443\u0442\u0432\u0435\u0440\u0434\u0438\u0432\u0448\u0435\u0433\u043E", type: "text", size: "8", required: true })
            ),
            React.createElement(
                "div",
                { className: "form-group col-md-6" },
                React.createElement("input", { id: "car_contract_casco_insurance_rules_approver_post_" + count, className: "", placeholder: "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C \u0443\u0442\u0432\u0435\u0440\u0434\u0438\u0432\u0448\u0435\u0433\u043E", type: "text", size: "8", required: true })
            )
        ),
        React.createElement(
            "div",
            { className: "form-row" },
            React.createElement(
                "div",
                { className: "form-group col-md-3" },
                React.createElement("input", { id: "car_contract_casco_insurance_rules_date_" + count, className: "datepicker-here ", placeholder: "\u0414\u0430\u0442\u0430", type: "text", size: "10", required: true })
            ),
            React.createElement(
                "div",
                { className: "form-group col-md-3" },
                React.createElement("input", { id: "car_contract_casco_insurance_rules_number_" + count, className: "", placeholder: "\u2116", type: "text", size: "8", required: true })
            )
        )
    );
};