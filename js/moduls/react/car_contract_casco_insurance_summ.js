var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState } from "react";

export var Car_contract_casco_insurance_summ = function Car_contract_casco_insurance_summ() {
    var _useState = useState(1),
        _useState2 = _slicedToArray(_useState, 2),
        count = _useState2[0],
        setCount = _useState2[1];

    return React.createElement(
        "div",
        { className: "car_contract_casco_insurance_summ" },
        React.createElement(
            "div",
            { className: "form-row" },
            React.createElement(
                "div",
                { className: "form-group col-md-6" },
                React.createElement(
                    "h6",
                    null,
                    "\u0421\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u043E \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u043E\u0439 \u0441\u0443\u043C\u043C\u0435"
                )
            )
        ),
        React.createElement(
            "div",
            { className: "form-row" },
            React.createElement(
                "div",
                { className: "form-group col-md-3" },
                React.createElement(
                    "div",
                    { className: "input-group" },
                    React.createElement("input", { id: "car_contract_casco_insurance_summ_summ_" + count, className: "input-numeral ", placeholder: "\u0421\u0443\u043C\u043C\u0430", type: "text", size: "10", required: true }),
                    React.createElement(
                        "div",
                        { className: "input-group-append" },
                        React.createElement(
                            "span",
                            { className: "input-group-text" },
                            "\u20BD"
                        )
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "form-group col-md-3" },
                React.createElement(
                    "select",
                    { id: "car_contract_casco_insurance_summ_index_" + count, className: "car_contract_casco_insurance_summ_indexes custom-select ", required: true },
                    React.createElement(
                        "option",
                        { value: "" },
                        "\u0412\u0438\u0434 \u0441\u0443\u043C\u043C\u044B"
                    ),
                    React.createElement(
                        "option",
                        null,
                        "\u0418\u043D\u0434\u0435\u043A\u0441\u0438\u0440\u0443\u0435\u043C\u0430\u044F"
                    ),
                    React.createElement(
                        "option",
                        null,
                        "\u041D\u0435 \u0438\u043D\u0434\u0435\u043A\u0441\u0438\u0440\u0443\u0435\u043C\u0430\u044F"
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "form-group col-md-3" },
                React.createElement(
                    "select",
                    { id: "car_contract_casco_insurance_summ_aggregate_" + count, className: "car_contract_casco_insurance_summ_aggregates custom-select ", required: true },
                    React.createElement(
                        "option",
                        { value: "" },
                        "\u0422\u0438\u043F \u0441\u0443\u043C\u043C\u044B"
                    ),
                    React.createElement(
                        "option",
                        null,
                        "\u0410\u0433\u0440\u0435\u0433\u0430\u0442\u043D\u0430\u044F"
                    ),
                    React.createElement(
                        "option",
                        null,
                        "\u041D\u0435 \u0430\u0433\u0440\u0435\u0433\u0430\u0442\u043D\u0430\u044F"
                    )
                )
            )
        ),
        React.createElement(
            "div",
            { className: "form-row" },
            React.createElement(
                "div",
                { className: "form-group col-md-12" },
                React.createElement("textarea", { id: "car_contract_casco_insurance_summ_risks_" + count, className: "", "aria-describedby": "car_contract_casco_insurance_summ_risks_help_block_" + count, placeholder: "\u041F\u0435\u0440\u0435\u0447\u0435\u043D\u044C \u0440\u0438\u0441\u043A\u043E\u0432", type: "text", size: "8", required: true }),
                React.createElement(
                    "small",
                    { id: "car_contract_casco_insurance_summ_risks_help_block_" + count, className: "form-text" },
                    "\u041F\u0435\u0440\u0435\u0447\u0438\u0441\u043B\u0438\u0442\u0435 \u0440\u0438\u0441\u043A\u0438, \u043F\u043E\u043A\u0440\u044B\u0432\u0430\u0435\u043C\u044B\u0435 \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u043E\u0439 \u0441\u0443\u043C\u043C\u043E\u0439"
                )
            )
        )
    );
};