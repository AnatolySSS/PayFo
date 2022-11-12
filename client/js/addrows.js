function addrows(e) {

  let target = e.target || e.srcElement;

  if (target == app_btn_1) {
    $("#app_form_row_2").show('fast');
    $("#app_form_row_3").show('fast');
    $("#app_form_row_4").show('fast');
  } else if (target == app_btn_2) {
    $("#app_form_row_2").hide('fast');
    document.getElementById('app_date_2').value = "";
    document.querySelector('#date_uts_last_day').removeAttribute('tooltip');
    document.querySelector('#date_uts_last_day').innerHTML = "";
    document.querySelector('#date_uts_penalty_day').innerHTML = "";
    document.querySelector('#date_uts_last_day').style.color = '#595b5e';
  } else if (target == app_btn_3) {
    $("#app_form_row_3").hide('fast');
    document.getElementById('app_date_3').value = "";
    document.querySelector('#date_ev_last_day').removeAttribute('tooltip');
    document.querySelector('#date_ev_last_day').innerHTML = "";
    document.querySelector('#date_ev_penalty_day').innerHTML = "";
    document.querySelector('#date_ev_last_day').style.color = '#595b5e';
  } else if (target == app_btn_4) {
    $("#app_form_row_4").hide('fast');
    document.getElementById('app_date_4').value = "";
    document.querySelector('#date_stor_last_day').removeAttribute('tooltip');
    document.querySelector('#date_stor_last_day').innerHTML = "";
    document.querySelector('#date_stor_penalty_day').innerHTML = "";
    document.querySelector('#date_stor_last_day').style.color = '#595b5e';
  }
}

$(document).on("click", ".app_form_rows", addrows);

// var paymentId = 1;

// function addPayment() {
// 	paymentId++;
//   var str = `
//   <div id="payment_1_1" class="payment_1">
//     <div class="form-row">
//       <div class="form-group col-md-3 form-inline">
//         <select id="payments_name_1_1" class="payments_name_1 payments_names custom-select col-md-12" required>
//           <option value="">Вид выплаты</option>
//           <option>Страховое возмещение</option>
//           <option>УТС</option>
//           <option>Эвакуатор</option>
//           <option>Хранение</option>
//           <option>Неустойка</option>
//         </select>
//       </div>
//       <div class="form-group col-md-3">
//         <input id = "payments_date_1_1" class = "payments_date_1 payments_dates datepicker-here form-control" placeholder="Дата" type="text" size="10" required>
//       </div>
//       <div class="form-group col-md-2">
//         <input id = "payments_order_1_1" class="payments_order_1 payments_orders form-control" placeholder="№ ПП" type="text" size="8" required>
//       </div>
//       <div class="form-group col-md-3">
//         <div class="input-group">
//           <input id="payments_text_1_1" class = "payments_text_1 payments_summs input-numeral form-control" placeholder="Сумма" type="text" size="10" required>
//           <div class="input-group-append">
//             <span class="input-group-text">&#8381;</span>
//           </div>
//         </div>
//       </div>
//       <div class="form-group col-ms-1">
//         <button id="payments_btn_1_1" class="payments_btn_1 payments_btns btn btn-outline-warning" onclick="addPay(1)">+</button>
//       </div>
//     </div>
//     <div class="form-row" style="display:none">
//       <div class="form-group col-md-4 form-inline">
//         <div class="form-check">
//           <input id="penalty_ndfl_1_1" class="penalty_ndfl_1 penalty_ndfls form-check-input" type="checkbox" onclick="addPenalty_ndfl_summ_form(1)" required>
//           <label for="penalty_ndfl_1_1" class="ml-2 form-check-label">удержан НДФЛ в размере</label>
//         </div>
//       </div>
//       <div class="form-group col-md-3" style="display:none">
//         <div class="input-group">
//           <input id="penalty_ndfl_summ_1_1" class = "penalty_ndfl_summ_1 penalty_ndfl_summs input-numeral form-control" placeholder="Сумма НДФЛ" type="text" size="10" required>
//           <div class="input-group-append">
//             <span class="input-group-text">&#8381;</span>
//           </div>
//         </div>
//       </div>
//       <div class="form-group col-md-3 form-inline">
//         <span id="penalty_ndfl_persent_1_1" class="penalty_ndfl_persent_1 penalty_ndfl_persents"></span>
//       </div>
//     </div>
//   </div>
//   `

// 	$('#pays').append(str);
// 	$('#pay' + payId + '_date').datepicker();

//   $('.datepicker-here').toArray().forEach(function(field){
//     new Cleave(field, {
//       date: true,
//       delimiter: '.',
//       datePattern: ['d', 'm', 'Y']
//     })
//   });

//   //Форматирование суммы
//   $('.input-numeral').toArray().forEach(function(field){
//     new Cleave(field, {
//         numeral: true,
//         delimiter: ' ',
//         //numeralThousandsGroupStyle: 'none',
//         numeralPositiveOnly: true,
//         numeralIntegerScale: 8
//     })
//   });
// }

// function removePay(id) {
// 	$('#pay_form_row_' + id).remove();
//   $('#add_info_pay_form_row_' + id).remove();
//   $('#add_info_penalty_form_row_' + id).remove();
//   if ($("#add_info_btn_" + id).find(".toggle").hasClass("rotate")) {
//     $("#add_info_btn_" + id).find(".toggle").removeClass("rotate");
//   }
// }

// //Добавляет период взыскания неустойки ФУ
// $(document).on("change", ".payments_names", function (event) {
// 	if ($(this).find(':selected').text() == "Неустойка") {
// 		$(this).parent().parent().next().show('fast');
// 	} else {
//     $(this).parent().parent().next().hide('fast');
// 	}
// });

// function addPenalty_ndfl_summ_form(id) {
//   if ($('#penalty_ndfl_' + id).is(':checked')) {
//     $('#penalty_ndfl_summ_form_' + id).show();
//   } else {
//     $('#penalty_ndfl_summ_form_' + id).hide();
//     $('#penalty_ndfl_summ_' + id).val('');
//   }
// }
