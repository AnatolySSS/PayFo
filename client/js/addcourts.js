var courtId = 1;
var claimId = 1;

function addCourt() {
	courtId++;

	var str = `<!-- BEGIN court_${courtId} -->
				<div id="court_${courtId}" class="courts">
					<hr>
					<div id="court_form_row_${courtId}" class="court_form_rows form-row">
						<div class="form-group col-md-4">
							<input id="court_name_${courtId}" class="court_names form-control" type="text" placeholder="Наименование суда" size="40" required>
						</div>
						<div class="form-group col-md-3">
							<select id="court_type_${courtId}" class="court_types custom-select form-control" required>
								<option value="">Результат суда</option>
								<option>Иск удовлетворен</option>
								<option>В иске отказано</option>
							</select>
						</div>
						<div class="form-group col-md-3">
							<div class="input-group">
								<input id="court_number_${courtId}" class = "court_numbers form-control" placeholder="Номер" type="text" size="10" required>
								<div class="input-group-append">
									<span class="input-group-text">&#8470;</span>
								</div>
							</div>
						</div>
						<div class="form-group col-ms-1">
							<button id="add_court_info_btn_${courtId}" class="add_court_info_btns btn btn-outline-warning add_info">
								<i class="fa fa-chevron-down toggle"></i>
							</button>
						</div>
						<div class="form-group col-ms-1">
							<button id="court_btn_${courtId}" class="court_btns btn btn-outline-danger" onclick="removeCourt(${courtId})">×</button>
						</div>
					</div>

					<!-- BEGIN add_court_info_${courtId} -->
					<div id="add_court_info_${courtId}" class="add_court_infos" style="display:none">

						<!-- BEGIN add_court_info_dates -->
						<div class="add_court_info_dates">
							<div class="form-row">
								<div class="form-group col-md-3">
									<input id = "court_date_${courtId}" class = "court_dates datepicker-here form-control" aria-describedby="court_date_help_block_${courtId}" placeholder="Дата" type="text" size="10" required>
									<small id="court_date_help_block_${courtId}" class="form-text">
										Дата решения
									</small>
								</div>
								<div class="form-group col-md-3">
									<input id = "court_date_end_form_${courtId}" class = "court_date_end_forms datepicker-here form-control" aria-describedby="court_date_end_form_help_block_${courtId}" placeholder="Дата" type="text" size="10" required>
									<small id="court_date_end_form_help_block_${courtId}" class="form-text">
										Дата изготовления в окончательной форме
									</small>
								</div>
								<div class="form-group col-md-3">
									<input id = "court_in_force_date_${courtId}" class = "court_in_force_dates datepicker-here form-control" aria-describedby="court_in_force_date_help_block_${courtId}" placeholder="Дата" type="text" size="10" required>
									<small id="court_in_force_date_help_block_${courtId}" class="form-text">
										Дата вступления в силу
									</small>
								</div>
								<div class="form-group col-md-3">
									<input id = "court_pay_date_${courtId}" class = "court_pay_dates datepicker-here form-control" aria-describedby="court_pay_date_help_block_${courtId}" placeholder="Дата" type="text" size="10" required>
									<small id="court_pay_date_help_block_${courtId}" class="form-text">
										Дата исполнения
									</small>
								</div>
							</div>
							<div class="form-row">
								<div class="form-group col-md-3">
									<input id = "court_order_${courtId}" class="court_orders form-control" aria-describedby="court_order_help_block_${courtId}" placeholder="№ ПП" type="text" size="8" required>
									<small id="court_order_help_block_${courtId}" class="form-text">
										№ ПП об исполнении решения суда
									</small>
								</div>
							</div>
						</div>
						<!-- END add_court_info_dates -->

						<div class="form-row">
							<div class="form-group col-md-6">
								<h6>Требования</h6>
							</div>
						</div>

						<!-- BEGIN add_court_info_row_${courtId} -->
						<div class="add_court_info_row_${courtId} add_court_info_rows">
							<div id="add_court_info_row_${courtId}_1" class="add_court_info_${courtId} add_court_infos form-row ">
								<div class="form-group col-md-4">
									<select id="court_claim_${courtId}_1" class="court_claim_${courtId} court_claims custom-select col-md-12 form-control" required>
										<option value="">Выберите требование</option>
										<option>Страховое возмещение</option>
										<option>УТС</option>
										<option>Эвакуатор</option>
										<option>Хранение</option>
										<option>Неустойка</option>
										<option>Финансовая санкция</option>
										<option>Экспертиза</option>
										<option>Юрист</option>
										<option>Составление претензии</option>
										<option>Нотариус</option>
										<option>Почта</option>
										<option>Курьер</option>
										<option>Телеграмма</option>
										<option>Дефектовка</option>
										<option>Диагностика</option>
										<option>Моральный вред</option>
										<option>Штраф</option>
										<option>Аварком</option>
										<option>Здоровье</option>
										<option>Жизнь</option>
										<option>Иные расходы</option>
									</select>
								</div>
								<div class="form-group col-md-3">
									<div class="input-group">
										<select id="court_claim_type_${courtId}_1" class="court_claim_type_${courtId} court_claim_types custom-select col-md-12 form-control" required>
											<option value="">Результат рассмотрения</option>
											<option>Удовлетворено</option>
											<option>Отказано</option>
											<option>Без рассмотрения</option>
										</select>
									</div>
								</div>
								<div class="form-group col-md-3">
									<div class="input-group">
										<input id="court_claim_summ_${courtId}_1" class = "court_claim_summ_${courtId} court_claim_summs input-numeral form-control deactivation" aria-describedby="court_claim_summ_help_block_${courtId}_1" placeholder="Сумма" type="text" size="10" required>
										<div class="input-group-append">
											<span class="input-group-text">&#8381;</span>
										</div>
									</div>
									<small id="court_claim_summ_help_block_${courtId}_1" class="form-text">
										<div class="form-inline">
											<input id="court_claim_summ_deactivate_${courtId}_1" class="deactivator" type="checkbox">
											<label for="court_claim_summ_deactivate_${courtId}_1" class="ml-2 form-check-label">Сведений не имеется</label>
										</div>
									</small>
								</div>
								<div class="form-group col-ms-1">
									<button id="court_claim_btn_${courtId}_1" class="court_claim_btn_${courtId} btn btn-outline-warning" onclick="addClaim(${courtId})">+</button>
								</div>
							</div>
							<div id="add_court_claim_info_${courtId}_1" class="add_court_claim_info_${courtId} form-group ml-3" style="display:none">
								<div class="form-group">
									<h6>Период неустойки</h6>
								</div>
								<div class="form-group form-inline">
									<label for="date_court_from_${courtId}_1">c</label>
									<input id = "date_court_from_${courtId}_1" class = "date_court_penalty_from_${courtId} date_court_froms ml-2 datepicker-here" placeholder="Дата" type="text" size="10" required>
									<label for="date_court_to_${courtId}_1" class="ml-2">по</label>
									<input id = "date_court_to_${courtId}_1" class = "date_court_penalty_to_${courtId} date_court_tos ml-2 datepicker-here" placeholder="Дата" type="text" size="10" required>
									<input id="court_without_period_${courtId}_1" class="court_without_period_${courtId} court_without_periods ml-2" type="checkbox" onclick="block_court_date(${courtId}, 1)">
									<label for="court_without_period_${courtId}_1" class="ml-2 form-check-label">Период не указан</label>
								</div>
							</div>
						</div>
						<!-- END add_court_info_row_${courtId} -->
					</div>
					<!-- END add_court_info_${courtId} -->
				</div>
				<!-- END court_${courtId} -->`

	$('#courts').append(str);
	$(`#court_${courtId} .datepicker-here`).datepicker()

  $('.datepicker-here').toArray().forEach(function(field){
    new Cleave(field, {
      date: true,
      delimiter: '.',
      datePattern: ['d', 'm', 'Y']
    })
  });

  //Форматирование суммы
  $('.input-numeral').toArray().forEach(function(field){
    new Cleave(field, {
        numeral: true,
        delimiter: ' ',
        //numeralThousandsGroupStyle: 'none',
        numeralPositiveOnly: true,
        numeralIntegerScale: 8
    })
  });
}

function addClaim(id) {
	if ($(`#court_type_${id}`).find(':selected').text() == "Иск удовлетворен" ||
		$(`#court_type_${id}`).find(':selected').text() == "Результат суда") {
		court_claim_types = "<option>Удовлетворено</option>"
	} else {
		court_claim_types = ""
	}
	claimId++;
	var str = `<div id="add_court_info_row_${id}_${claimId}" class="add_court_info_${id} add_court_infos form-row">
					<div class="form-group col-md-4">
						<select id="court_claim_${id}_${claimId}" class="court_claim_${id} court_claims custom-select col-md-12 form-control" required>
							<option value="">Выберите требование</option>
							<option>Страховое возмещение</option>
							<option>УТС</option>
							<option>Эвакуатор</option>
							<option>Хранение</option>
							<option>Неустойка</option>
							<option>Финансовая санкция</option>
							<option>Экспертиза</option>
							<option>Юрист</option>
							<option>Составление претензии</option>
							<option>Нотариус</option>
							<option>Почта</option>
							<option>Курьер</option>
							<option>Телеграмма</option>
							<option>Дефектовка</option>
							<option>Диагностика</option>
							<option>Моральный вред</option>
							<option>Штраф</option>
							<option>Аварком</option>
							<option>Здоровье</option>
							<option>Жизнь</option>
							<option>Иные расходы</option>
						</select>
					</div>
					<div class="form-group col-md-3">
						<div class="input-group">
							<select id="court_claim_type_${id}_${claimId}" class="court_claim_type_${id} court_claim_types custom-select col-md-12 form-control" required>
								<option value="">Результат рассмотрения</option>
								${court_claim_types}
								<option>Отказано</option>
								<option>Без рассмотрения</option>
							</select>
						</div>
					</div>
					<div class="form-group col-md-3">
						<div class="input-group">
							<input id="court_claim_summ_${id}_${claimId}" class = "court_claim_summ_${id} court_claim_summs input-numeral form-control deactivation" aria-describedby="court_claim_summ_help_block_${id}_${claimId}" placeholder="Сумма" type="text" size="10" required>
							<div class="input-group-append">
								<span class="input-group-text">&#8381;</span>
							</div>
						</div>
						<small id="court_claim_summ_help_block_${id}_${claimId}" class="form-text">
							<div class="form-inline">
								<input id="court_claim_summ_deactivate_${id}_${claimId}" class="deactivator" type="checkbox">
								<label for="court_claim_summ_deactivate_${id}_${claimId}" class="ml-2 form-check-label">Сведений не имеется</label>
							</div>
						</small>
					</div>
					<div class="form-group col-ms-1">
						<button id="court_claim_btn_${id}_${claimId}" class="court_claim_btn_${id} btn btn-outline-danger" onclick="removeClaim(${id}, ${claimId})">×</button>
					</div>
				</div>
				<div id="add_court_claim_info_${id}_${claimId}" class="add_court_claim_info_${id} form-group ml-3" style="display:none">
					<div class="form-group">
						<h6>Период неустойки</h6>
					</div>
					<div class="form-group form-inline">
						<label for="date_court_from_${id}_${claimId}">c</label>
						<input id = "date_court_from_${id}_${claimId}" class = "date_court_penalty_from_${id} date_court_froms ml-2 datepicker-here" placeholder="Дата" type="text" size="10" required>
						<label for="date_court_to_${id}_${claimId}" class="ml-2">по</label>
						<input id = "date_court_to_${id}_${claimId}" class = "date_court_penalty_to_${id} date_court_tos ml-2 datepicker-here" placeholder="Дата" type="text" size="10" required>
						<input id="court_without_period_${id}_${claimId}" class="court_without_period_${id} court_without_periods ml-2" type="checkbox" onclick="block_court_date(${id}, ${claimId})">
						<label for="court_without_period_${id}_${claimId}" class="ml-2 form-check-label">Период не указан</label>
					</div>
				</div>`

	$('.add_court_info_row_' + id).append(str);
	$('#date_court_from_' + id + '_' + claimId).datepicker();
	$('#date_court_to_' + id + '_' + claimId).datepicker();

  $('.datepicker-here').toArray().forEach(function(field){
    new Cleave(field, {
      date: true,
      delimiter: '.',
      datePattern: ['d', 'm', 'Y']
    })
  });

  //Форматирование суммы
  $('.input-numeral').toArray().forEach(function(field){
    new Cleave(field, {
        numeral: true,
        delimiter: ' ',
        //numeralThousandsGroupStyle: 'none',
        numeralPositiveOnly: true,
        numeralIntegerScale: 8
    })
  });
}


function removeCourt(id) {
	$('#court_' + id).remove();
	courtId--;
  if ($("#add_court_info_btn_" + id).find(".toggle").hasClass("rotate")) {
    $("#add_court_info_btn_" + id).find(".toggle").removeClass("rotate");
  }
}

function removeClaim(id, claimId) {
	$('#add_court_info_row_' + id + '_' + claimId).remove();
  $('#add_court_claim_info_' + id + '_' + claimId).remove();
}

//Показывает сведения о решении суда
$(document).on("change", ".courts_info", function (event) {
	if ($(this).find(':selected').text() == "Сведения имеются") {
		$(this).parent().parent().next().show('fast')
		//Добавление класса form-control в группе fu_form_rows
		$(this).parent().parent().next().find('.court_form_rows').find('input[type=text]').addClass('form-control')
		$(this).parent().parent().next().find('.court_form_rows').find('select').addClass('form-control')
		//Добавление класса form-control в группе add_fu_info_dates
		$(this).parent().parent().next().find('.add_court_info_dates').find('input[type=text]').addClass('form-control')
		$(this).parent().parent().next().find('.add_court_info_dates').find('select').addClass('form-control')
		//Добавление класса form-control для всех input в группе fu_form_rows кроме суммы НДФЛ (т.к. для него данный класс добавляется при клике на checkbox)
        $(this).parent().parent().next().find('.add_court_info_rows').find('input[type=text]').each(function(index){
            if (!$(this).hasClass('date_court_froms') && !$(this).hasClass('date_court_tos')) {
                $(this).addClass('form-control')
            }
        })
		$(this).parent().parent().next().find('.add_court_info_rows').find('select').addClass('form-control')
		//Добавление класса form-control к select с вариантом приостановления сроков
		
	} else {
    	$(this).parent().parent().next().hide('fast')
		setTimeout(() => {
            $(this).parent().parent().next().find('input[type=text]').removeClass('form-control')
			$(this).parent().parent().next().find('select').removeClass('form-control')
        }, 200)
	}
});

//Показать дополнительную информацию по суду
$(document).on("click", ".add_court_info_btns", function (event) {
	if (!($(this).find(".toggle").hasClass("rotate"))) {
    $(this).parent().parent().next().show('fast'); //Показывает .add_court_info
    $(this).find(".toggle").addClass("rotate");
  } else {
    $(this).parent().parent().next().hide('fast'); //Скрывает .add_court_info
    $(this).find(".toggle").removeClass("rotate");
  }
});

//Добавляет период взыскания неустойки судом
$(document).on("change", ".court_claims", function (event) {
	if ($(this).find(':selected').text() == "Неустойка") {
		$(this).parent().parent().next().show('fast');
		$(this).parent().parent().next().find('.date_court_froms').addClass('form-control')
		$(this).parent().parent().next().find('.date_court_tos').addClass('form-control')
	} else {
    	$(this).parent().parent().next().hide('fast')
		setTimeout(() => {
            $(this).parent().parent().next().find('.date_court_froms').removeClass('form-control')
			$(this).parent().parent().next().find('.date_court_tos').removeClass('form-control')
        }, 200)
	}
});

//Блокировать даты судебной неустойки при проставленной галочке "Период не указан"
function block_court_date(id, claimId){
  if ($("#court_without_period_" + id + "_" + claimId).prop('checked')) {
    $("#date_court_from_" + id + "_" + claimId).prop('disabled', true);
    $("#date_court_to_" + id + "_" + claimId).prop('disabled', true);
    $("#date_court_from_" + id + "_" + claimId).val('');
    $("#date_court_to_" + id + "_" + claimId).val('');
  } else {
    $("#date_court_from_" + id + "_" + claimId).prop('disabled', false);
    $("#date_court_to_" + id + "_" + claimId).prop('disabled', false);
  }
}

// //Блокирует суммы, в случае отказа
// $(document).on("change", ".court_claim_types", function (event) {
// 	if ($(this).find(':selected').text() == "Удовлетворено") {
// 		$(this).parent().parent().next().children().first().children().first().prop('disabled', false);
// 	} else {
//     $(this).parent().parent().next().children().first().children().first().prop('disabled', true);
// 		$(this).parent().parent().next().children().first().children().first().val('');
// 	}
// });

//Удаляет тип требования, в случае, если тип решения - отказ или прекращение
$(document).on("change", ".court_types", function (event) {
	if ($(this).find(':selected').text() == "Иск удовлетворен") {
		//Добавляем тип требования (Удовлетворено)
		if (!$(this).parent().parent().parent().find('.court_claim_types option:contains("Удовлетворено")').length) {
			$(this).parent().parent().parent().find('.court_claim_types').each(function(){
				$(this).children().first().after('<option>Удовлетворено</option>')
			})
        }
	} else if ($(this).find(':selected').text() == "В иске отказано") {
		//Добавляем тип требования (Удовлетворено)
		if ($(this).parent().parent().parent().find('.court_claim_types option:contains("Удовлетворено")').length) {
            $(this).parent().parent().parent().find('.court_claim_types option:contains("Удовлетворено")').remove()
        }
	} else {
		//Добавляем тип требования (Удовлетворено)
		if (!$(this).parent().parent().parent().find('.court_claim_types option:contains("Удовлетворено")').length) {
			$(this).parent().parent().parent().find('.court_claim_types').each(function(){
				$(this).children().first().after('<option>Удовлетворено</option>')
			})
        }
	}
})