var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState } from "react";
import { validationCheck, validationCheckUpdate } from "../validationCheck";

export var Car_contract_casco_insurance_premium = function Car_contract_casco_insurance_premium() {
  var _useState = useState(1),
      _useState2 = _slicedToArray(_useState, 2),
      count = _useState2[0],
      setCount = _useState2[1];

  return React.createElement(
    "div",
    { className: "car_contract_casco_insurance_premium" },
    React.createElement(
      "div",
      { className: "form-row" },
      React.createElement(
        "div",
        { className: "form-group col-md-6" },
        React.createElement(
          "h6",
          null,
          "\u0421\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u043E \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u043E\u0439 \u043F\u0440\u0435\u043C\u0438\u0438"
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
          { id: "car_contract_casco_insurance_premium_information_" + count, className: "car_contract_casco_insurance_premium_informations custom-select ", required: true },
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
          ),
          React.createElement(
            "option",
            null,
            "\u0424\u0430\u043A\u0442 \u043E\u043F\u043B\u0430\u0442\u044B \u043D\u0435 \u043E\u0441\u043F\u0430\u0440\u0438\u0432\u0430\u0435\u0442\u0441\u044F"
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: "form-row", style: { display: 'none' } },
      React.createElement(
        "div",
        { className: "form-group col-md-3" },
        React.createElement(
          "div",
          { className: "input-group" },
          React.createElement("input", { id: "car_contract_casco_insurance_premium_summ_" + count, className: "input-numeral ", "aria-describedby": "car_contract_casco_insurance_premium_summ_help_block_" + count, placeholder: "\u0421\u0443\u043C\u043C\u0430", type: "text", size: "10", required: true }),
          React.createElement(
            "div",
            { className: "input-group-append" },
            React.createElement(
              "span",
              { className: "input-group-text" },
              "\u20BD"
            )
          )
        ),
        React.createElement(
          "small",
          { id: "car_contract_casco_insurance_premium_summ_help_block_" + count, className: "form-text" },
          "\u0420\u0430\u0437\u043C\u0435\u0440 \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u043E\u0439 \u043F\u0440\u0435\u043C\u0438\u0438"
        )
      ),
      React.createElement(
        "div",
        { className: "form-group col-md-3" },
        React.createElement("input", { id: "car_contract_casco_insurance_premium_date_" + count, className: "datepicker-here ", "aria-describedby": "car_contract_casco_insurance_premium_date_help_block_" + count, placeholder: "\u0414\u0430\u0442\u0430", type: "text", size: "10", required: true }),
        React.createElement(
          "small",
          { id: "car_contract_casco_insurance_premium_date_help_block_" + count, className: "form-text" },
          "\u0414\u0430\u0442\u0430 \u043E\u043F\u043B\u0430\u0442\u044B"
        )
      ),
      React.createElement(
        "div",
        { className: "form-group col-md-3" },
        React.createElement("input", { id: "car_contract_casco_insurance_premium_number_" + count, className: "", "aria-describedby": "car_contract_casco_insurance_premium_number_help_block_" + count, placeholder: "\u2116", type: "text", size: "8", required: true }),
        React.createElement(
          "small",
          { id: "car_contract_casco_insurance_premium_number_help_block_" + count, className: "form-text" },
          "\u2116 \u043A\u0432\u0438\u0442\u0430\u043D\u0446\u0438\u0438"
        )
      )
    ),
    React.createElement(
      "div",
      { className: "form-row", style: { display: 'none' } },
      React.createElement(
        "div",
        { className: "form-group col-md-12" },
        React.createElement("textarea", { id: "car_contract_casco_insurance_premium_risks_" + count, className: "", "aria-describedby": "car_contract_casco_insurance_premium_risks_help_block_" + count, placeholder: "\u041F\u0435\u0440\u0435\u0447\u0435\u043D\u044C \u0440\u0438\u0441\u043A\u043E\u0432", type: "text", size: "8", required: true }),
        React.createElement(
          "small",
          { id: "car_contract_casco_insurance_premium_risks_help_block_" + count, className: "form-text" },
          "\u041F\u0435\u0440\u0435\u0447\u0438\u0441\u043B\u0438\u0442\u0435 \u0440\u0438\u0441\u043A\u0438, \u043F\u043E\u043A\u0440\u044B\u0432\u0430\u0435\u043C\u044B\u0435 \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u043E\u0439 \u043F\u0440\u0435\u043C\u0438\u0435\u0439"
        )
      )
    )
  );
};

// //Добавляет период взыскания неустойки судом
// $(document).on("change", ".car_contract_casco_insurance_premium_informations", function (event) {
//   var _this = this;

//   if ($(this).find(':selected').text() == "Сведения имеются") {
//     $(this).parent().parent().next().show('fast');
//     $(this).parent().parent().next().next().show('fast');
//     $(this).parent().parent().next().find('input').addClass('');
//     $(this).parent().parent().next().next().find('textarea').addClass('');
//   } else {
//     $(this).parent().parent().next().hide('fast');
//     $(this).parent().parent().next().next().hide('fast');
//     setTimeout(function () {
//       $(_this).parent().parent().next().find('input').removeClass('');
//       $(_this).parent().parent().next().next().find('textarea').removeClass('');
//     }, 200);
//   }

//   validationCheckUpdate('.dtp-description');
// });