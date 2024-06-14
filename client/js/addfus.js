var fuId = 1
var claimFuId = 1
var fu_claim_types = ""

function addFu() {
	fuId++;
  var str = `<!-- BEGIN fu_${fuId} -->
			<div id="fu_${fuId}" class="fus">
				<hr>
				<div id="fu_form_row_${fuId}" class="fu_form_rows form-row">
					<div class="form-group col-md-3 form-inline">
						<select id="fu_name_${fuId}" class="fu_names custom-select col-md-12 form-control" required>
							<option value="">Выберите подписанта</option>
							<option>Воронин Ю.В.</option>
							<option>Климов В.В.</option>
							<option>Никитина С.В.</option>
							<option>Писаревский Е.Л.</option>
							<option>Савицкая Т.М.</option>
						</select>
					</div>
					<div class="form-group col-md-3">
						<select id="fu_type_${fuId}" class="fu_types custom-select col-md-12 form-control" required>
							<option value="">Тип решения</option>
							<option>Об удовлетворении</option>
							<option>Об отказе</option>
							<option>О прекращении</option>
						</select>
					</div>
					<div class="form-group col-md-4">
						<div class="input-group">
							<input id="fu_number_${fuId}" class = "fu_numbers form-control input-number-fu" placeholder="Номер" type="text" size="10" required>
							<div class="input-group-append">
								<span class="input-group-text">&#8470;</span>
							</div>
						</div>
					</div>
					<div class="form-group col-ms-1">
						<button id="add_fu_info_btn_${fuId}" class="add_fu_info_btns btn btn-outline-warning add_info">
							<i class="fa fa-chevron-down toggle"></i>
						</button>
					</div>
					<div class="form-group col-ms-1">
						<button id="fu_btn_${fuId}" class="fu_btns btn btn-outline-danger" onclick="removeFu()">×</button>
					</div>
				</div>

				<!-- BEGIN add_fu_info_${fuId} -->
				<div id="add_fu_info_${fuId}" style="display:none">
					<div class="add_fu_info_dates">
						<div class="form-row">
							<div class="form-group col-md-3">
								<input id = "fu_date_${fuId}" class = "fu_dates datepicker-here form-control" aria-describedby="fu_date_help_block_${fuId}" placeholder="Дата" type="text" size="10" required>
								<small id="fu_date_help_block_${fuId}" class="form-text">
									Дата решения
								</small>
							</div>
							<div class="form-group col-md-3">
								<input id = "fu_in_force_date_${fuId}" class = "fu_in_force_dates datepicker-here form-control" aria-describedby="fu_in_force_date_help_block_${fuId}" placeholder="Дата" type="text" size="10" required>
								<small id="fu_in_force_date_help_block_${fuId}" class="form-text">
									Дата вступления в силу
								</small>
							</div>
							<div class="form-group col-md-3">
								<input id = "fu_last_day_for_pay_date_${fuId}" class = "fu_last_day_for_pay_dates datepicker-here form-control" aria-describedby="fu_last_day_for_pay_date_help_block_${fuId}" placeholder="Дата" type="text" size="10" required>
								<small id="fu_last_day_for_pay_date_help_block_${fuId}" class="form-text">
									Дата окончания срока исполнения / обжалования
								</small>
							</div>
							<div class="form-group col-md-3" style="display:none">
								<input id = "fu_pay_date_${fuId}" class = "fu_pay_dates datepicker-here form-control" aria-describedby="fu_pay_date_help_block_${fuId}" placeholder="Дата" type="text" size="10" required>
								<small id="fu_pay_date_help_block_${fuId}" class="form-text">
									Дата исполнения
								</small>
							</div>
							<div class="form-group col-md-3">
								<input id = "fu_app_date_${fuId}" class = "fu_app_dates datepicker-here form-control" aria-describedby="fu_app_date_help_block_${fuId}" placeholder="Дата" type="text" size="10" required>
								<small id="fu_app_date_help_block_${fuId}" class="form-text">
									Дата обращения
								</small>
							</div>
							<div class="form-group col-md-3" style="display:none">
								<input id = "fu_order_${fuId}" class="fu_orders form-control" aria-describedby="fu_order_help_block_${fuId}" placeholder="№ ПП" type="text" size="8" required>
								<small id="fu_order_help_block_${fuId}" class="form-text">
									№ ПП об исполнении решения ФУ
								</small>
							</div>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<h6>Требования</h6>
						</div>
					</div>

					<!-- BEGIN add_fu_info_row_${fuId} -->
                    <div class="add_fu_info_row_${fuId} add_fu_info_rows">
						<div id="add_fu_info_row_${fuId}_1" class="add_fu_info_${fuId} add_fu_infos form-row">
							<div class="form-group col-md-4">
								<select id="fu_claim_${fuId}_1" class="fu_claim_${fuId} fu_claims custom-select col-md-12 form-control" required>
									<option value="">Выберите требование</option>
									<option>Страховое возмещение</option>
									<option>УТС</option>
									<option>Эвакуатор</option>
									<option>Хранение</option>
									<option>Неустойка</option>
									<option>Финансовая санкция</option>
									<option>Организация ремонта</option>
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
								<select id="fu_claim_type_${fuId}_1" class="fu_claim_type_${fuId} fu_claim_types custom-select col-md-12 form-control" required>
									<option value="">Результат рассмотрения</option>
									<option>Удовлетворено</option>
									<option>Отказано</option>
									<option>Без рассмотрения</option>
								</select>
							</div>
							<div class="form-group col-md-3">
								<div class="input-group">
									<input id="fu_claim_summ_${fuId}_1" class = "fu_claim_summ_${fuId} fu_claim_summs input-numeral form-control deactivation" aria-describedby="fu_claim_summ_help_block_${fuId}_1" placeholder="Сумма" type="text" size="10" required>
									<div class="input-group-append">
										<span class="input-group-text">&#8381;</span>
									</div>
								</div>
								<small id="fu_claim_summ_help_block_${fuId}_1" class="form-text">
									<div class="form-inline">
										<input id="fu_claim_summ_deactivate_${fuId}_1" class="deactivator" type="checkbox">
										<label for="fu_claim_summ_deactivate_${fuId}_1" class="ml-2 form-check-label">Сведений не имеется</label>
									</div>
								</small>
							</div>
							<div class="form-group col-ms-1">
								<button id="fu_claim_btn_${fuId}_1" class="fu_claim_btn_${fuId} btn btn-outline-warning" onclick="addFuClaim(${fuId}, 1)">+</button>
							</div>
						</div>
						<div id="add_fu_claim_info_${fuId}_1" class="add_fu_claim_info_${fuId} form-group ml-3" style="display:none">
							<div class="form-group">
								<h6>Период неустойки</h6>
							</div>
							<div class="form-group form-inline">
								<label for="date_fu_from_${fuId}_1">c</label>
								<input id = "date_fu_from_${fuId}_1" class = "date_fu_penalty_from_${fuId} date_fu_froms ml-2 datepicker-here" placeholder="Дата" type="text" size="10" required>
								<label for="date_fu_to_${fuId}_1" class="ml-2">по</label>
								<input id = "date_fu_to_${fuId}_1" class = "date_fu_penalty_to_${fuId} date_fu_tos ml-2 datepicker-here" placeholder="Дата" type="text" size="10" required>
								<input id="fu_without_period_${fuId}_1" class="fu_without_period_${fuId} fu_without_periods ml-2" type="checkbox" onclick="block_fu_date(${fuId}, 1)">
								<label for="fu_without_period_${fuId}_1" class="ml-2 form-check-label">Период не указан</label>
							</div>
						</div>
					</div>
					<!-- END add_fu_info_row_${fuId} -->

					<!-- BEGIN add_fu_info_suspension_${fuId} -->
                    <div class="add_fu_info_suspension_${fuId}">
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <h6>Решение ФУ о приостановлении сроков</h6>
                        </div>
                      </div>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <select id="add_fu_info_suspension_type_${fuId}" class="add_fu_info_suspension_types custom-select form-control" required>
                            <option value="">Сведения о приостановлении решения ФУ</option>
                            <option>Решение ФУ было приостановлено</option>
                            <option>Решение ФУ не было приостановлено</option>
                          </select>
                        </div>

                        <!-- BEGIN add_fu_info_suspension_add_info_first -->
                        <div class="add_fu_info_suspension_add_info_first form-group col-md-6" style="display:none">
                          <div class="form-row">
                            <div class="form-group col-md-6">
                              <input id = "add_fu_info_suspension_date_${fuId}" class = "add_fu_info_suspension_dates datepicker-here" aria-describedby="add_fu_info_suspension_date_help_block_${fuId}" placeholder="Дата" type="text" size="10" required>
                              <small id="add_fu_info_suspension_date_help_block_${fuId}" class="form-text">
                                Дата решения о приостановлении
                              </small>
                            </div>
                            <div class="form-group col-md-6">
                              <div class="input-group">
                                <input id="add_fu_info_suspension_number_${fuId}" class = "add_fu_info_suspension_numbers" aria-describedby="add_fu_info_suspension_number_help_block_${fuId}" placeholder="Номер" type="text" size="10" required>
                                <div class="input-group-append">
                                  <span class="input-group-text">&#8470;</span>
                                </div>
                              </div>
                              <small id="add_fu_info_suspension_number_help_block_${fuId}" class="form-text">
                                № решения о приостановлении
                              </small>
                            </div>
                          </div>
                        </div>
                        <!-- END add_fu_info_suspension_add_info_first -->
                      </div>

                      <!-- BEGIN add_fu_info_suspension_add_info_second -->
                      <div class="add_fu_info_suspension_add_info_second" style="display:none">
                        <div class="form-row">
                          <div class="form-group col-md-6">
                            <input id="add_fu_info_suspension_court_name_${fuId}" class="add_fu_info_suspension_court_names" type="text" placeholder="Наименование суда" size="40" required>
                          </div>
                          <div class="form-group col-md-3">
                            <div class="input-group">
                              <input id="add_fu_info_suspension_court_number_${fuId}" class = "add_fu_info_suspension_court_numbers" aria-describedby="add_fu_info_suspension_court_number_help_block_${fuId}" placeholder="Номер" type="text" size="10" required>
                              <div class="input-group-append">
                                <span class="input-group-text">&#8470;</span>
                              </div>
                            </div>
                            <small id="add_fu_info_suspension_court_number_help_block_${fuId}" class="form-text">
                              № судебного дела
                            </small>
                          </div>
                        </div>
                        <div class="form-row">
                          <div class="form-group col-md-3">
                            <select id="add_fu_info_suspension_court_result_${fuId}" class="add_fu_info_suspension_court_results custom-select" required>
                              <option value="">Результат суда</option>
                              <option>Решение ФУ отменено</option>
                              <option>Решение ФУ без изменения</option>
                            </select>
                          </div>
                          <div class="form-group col-md-3">
                            <input id = "add_fu_info_suspension_court_date_${fuId}" class = "add_fu_info_suspension_court_dates datepicker-here" aria-describedby="add_fu_info_suspension_court_date_help_block_${fuId}" placeholder="Дата" type="text" size="10" required>
                            <small id="add_fu_info_suspension_court_date_help_block_${fuId}" class="form-text">
                              Дата решения
                            </small>
                          </div>
                          <div class="form-group col-md-3">
                            <input id = "add_fu_info_suspension_court_date_end_form_${fuId}" class = "add_fu_info_suspension_court_date_end_forms datepicker-here" aria-describedby="add_fu_info_suspension_court_date_end_form_help_block_${fuId}" placeholder="Дата" type="text" size="10" required>
                            <small id="add_fu_info_suspension_court_date_end_form_help_block_${fuId}" class="form-text">
                              Дата изготовления в окончательной форме
                            </small>
                          </div>
                          <div class="form-group col-md-3">
                            <input id = "add_fu_info_suspension_court_date_in_force_${fuId}" class = "add_fu_info_suspension_court_date_in_forces datepicker-here" aria-describedby="add_fu_info_suspension_court_date_in_force_help_block_${fuId}" placeholder="Дата" type="text" size="10" required>
                            <small id="add_fu_info_suspension_court_date_in_force_help_block_${fuId}" class="form-text">
                              Дата вступления в силу
                            </small>
                          </div>
                        </div>
                      </div>
                      <!-- END add_fu_info_suspension_add_info_second -->
                    </div>
                    <!-- END add_fu_info_suspension_${fuId} -->

				</div>
				<!-- END add_fu_info_${fuId} -->
			</div>
			<!-- END fu_${fuId} -->`

	$('#fus').append(str);
	$(`#fu_${fuId} .datepicker-here`).datepicker()

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

function removeFu() {
	$('#fu_' + fuId).remove();
	fuId--
}

function addFuClaim(id) {
	if ($(`#fu_type_${id}`).find(':selected').text() == "Об удовлетворении" ||
		$(`#fu_type_${id}`).find(':selected').text() == "Тип решения") {
		fu_claim_types = "<option>Удовлетворено</option>"
	} else {
		fu_claim_types = ""
	}
	if ($(`#fu_type_${id}`).find(':selected').text() == "О прекращении") {
		display_none = `style="display:none"`
	} else {
		display_none = ""
	}
	claimFuId++;
  var str = `<div id="add_fu_info_row_${id}_${claimFuId}" class="add_fu_info_${id} add_fu_infos form-row">
				<div class="form-group col-md-4">
					<select id="fu_claim_${id}_${claimFuId}" class="fu_claim_${id} fu_claims custom-select col-md-12 form-control" required>
						<option value="">Выберите требование</option>
						<option>Страховое возмещение</option>
						<option>УТС</option>
						<option>Эвакуатор</option>
						<option>Хранение</option>
						<option>Неустойка</option>
						<option>Финансовая санкция</option>
						<option>Организация ремонта</option>
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
				<div class="form-group col-md-3" ${display_none}>
					<select id="fu_claim_type_${id}_${claimFuId}" class="fu_claim_type_${id} fu_claim_types custom-select col-md-12 form-control" required>
						<option value="">Результат рассмотрения</option>
						${fu_claim_types}
						<option>Отказано</option>
						<option>Без рассмотрения</option>
					</select>
				</div>
				<div class="form-group col-md-3">
					<div class="input-group">
						<input id="fu_claim_summ_${id}_${claimFuId}" class = "fu_claim_summ_${id} fu_claim_summs input-numeral form-control deactivation" aria-describedby="fu_claim_summ_help_block_${id}_${claimFuId}" placeholder="Сумма" type="text" size="10" required>
						<div class="input-group-append">
							<span class="input-group-text">&#8381;</span>
						</div>
					</div>
					<small id="fu_claim_summ_help_block_${id}_${claimFuId}" class="form-text">
						<div class="form-inline">
							<input id="fu_claim_summ_deactivate_${id}_${claimFuId}" class="deactivator" type="checkbox">
							<label for="fu_claim_summ_deactivate_${id}_${claimFuId}" class="ml-2 form-check-label">Сведений не имеется</label>
						</div>
					</small>
				</div>
				<div class="form-group col-ms-1">
					<button id="fu_claim_btn_${id}_${claimFuId}" class="fu_claim_btn_${id} btn btn-outline-danger" onclick="removeFuClaim(${id}, ${claimFuId})">×</button>
				</div>
			</div>
			<div id="add_fu_claim_info_${id}_${claimFuId}" class="add_fu_claim_info_${id} form-group ml-3" style="display:none">
				<div class="form-group">
					<h6>Период неустойки</h6>
				</div>
				<div class="form-group form-inline">
					<label for="date_fu_from_${id}_${claimFuId}">c</label>
					<input id = "date_fu_from_${id}_${claimFuId}" class = "date_fu_penalty_from_${id} date_fu_froms ml-2 datepicker-here" placeholder="Дата" type="text" size="10" required>
					<label for="date_fu_to_${id}_${claimFuId}" class="ml-2">по</label>
					<input id = "date_fu_to_${id}_${claimFuId}" class = "date_fu_penalty_to_${id} date_fu_tos ml-2 datepicker-here" placeholder="Дата" type="text" size="10" required>
					<input id="fu_without_period_${id}_${claimFuId}" class="fu_without_period_${id} fu_without_periods ml-2" type="checkbox" onclick="block_fu_date(${id}, ${claimFuId})">
					<label for="fu_without_period_${id}_${claimFuId}" class="ml-2 form-check-label">Период не указан</label>
				</div>
			</div>`

	$('.add_fu_info_row_' + id).append(str);
	$('#date_fu_from_' + id + '_' + claimFuId).datepicker();
	$('#date_fu_to_' + id + '_' + claimFuId).datepicker();

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

function removeFuClaim(id, claimFuId) {
	$('#add_fu_info_row_' + id + '_' + claimFuId).remove();
	$('#add_fu_claim_info_' + id + '_' + claimFuId).remove();
}

//Показывает сведения о решении ФУ
$(document).on("change", ".fus_info", function (event) {
	if ($(this).find(':selected').text() == "Сведения имеются") {
		$(this).parent().parent().next().show('fast')
		//Добавление класса form-control в группе fu_form_rows
		$(this).parent().parent().next().find('.fu_form_rows').find('input[type=text]').addClass('form-control')
		$(this).parent().parent().next().find('.fu_form_rows').find('select').addClass('form-control')
		//Добавление класса form-control в группе add_fu_info_dates
		$(this).parent().parent().next().find('.add_fu_info_dates').find('input[type=text]').addClass('form-control')
		$(this).parent().parent().next().find('.add_fu_info_dates').find('select').addClass('form-control')
		//Добавление класса form-control для всех input в группе fu_form_rows кроме суммы НДФЛ (т.к. для него данный класс добавляется при клике на checkbox)
        $(this).parent().parent().next().find('.add_fu_info_rows').find('input[type=text]').each(function(index){
            if (!$(this).hasClass('date_fu_froms') && !$(this).hasClass('date_fu_tos')) {
                $(this).addClass('form-control')
            }
        })
		$(this).parent().parent().next().find('.add_fu_info_rows').find('select').addClass('form-control')
		//Добавление класса form-control к select с вариантом приостановления сроков
		$(this).parent().parent().next().find('.add_fu_info_suspension_types').addClass('form-control')
		
	} else {
    	$(this).parent().parent().next().hide('fast')
		setTimeout(() => {
            $(this).parent().parent().next().find('input[type=text]').removeClass('form-control')
			$(this).parent().parent().next().find('select').removeClass('form-control')
        }, 200)
	}
});

//Показать дополнительную информацию по решению ФУ
$(document).on("click", ".add_fu_info_btns", function (event) {
	if (!($(this).find(".toggle").hasClass("rotate"))) {
		$(this).parent().parent().next().show('fast'); //Показывает .add_fu_info
		$(this).find(".toggle").addClass("rotate");
  	} else {
		$(this).parent().parent().next().hide('fast'); //Скрывает .add_fu_info
		$(this).find(".toggle").removeClass("rotate");
  	}
});

//Добавляет даты fu_pay_dates и fu_orders
$(document).on("change", ".fu_types", function (event) {
	if ($(this).find(':selected').text() == "Об удовлетворении") {
		$(this).parent().parent().next().find('.fu_pay_dates').parent().show('fast')
		$(this).parent().parent().next().find('.fu_orders').parent().show('fast')
		$(this).parent().parent().next().find('.fu_pay_dates').addClass('form-control')
		$(this).parent().parent().next().find('.fu_orders').addClass('form-control')
	} else {
		$(this).parent().parent().next().find('.fu_pay_dates').parent().hide('fast')
		$(this).parent().parent().next().find('.fu_orders').parent().hide('fast')
		setTimeout(() => {
			$(this).parent().parent().next().find('.fu_pay_dates').removeClass('form-control')
			$(this).parent().parent().next().find('.fu_orders').removeClass('form-control')
        }, 200)
	}
});

//Добавляет период взыскания неустойки ФУ
$(document).on("change", ".fu_claims", function (event) {
	if ($(this).find(':selected').text() == "Неустойка") {
		$(this).parent().parent().next().show('fast')
		$(this).parent().parent().next().find('.date_fu_froms').addClass('form-control')
		$(this).parent().parent().next().find('.date_fu_tos').addClass('form-control')
	} else {
    	$(this).parent().parent().next().hide('fast')
		setTimeout(() => {
            $(this).parent().parent().next().find('.date_fu_froms').removeClass('form-control')
			$(this).parent().parent().next().find('.date_fu_tos').removeClass('form-control')
        }, 200)
	}
});

//Блокировать даты неустойки,взысканной ФУ при проставленной галочке "Период не указан"
function block_fu_date(id, claimFuId){
  if ($("#fu_without_period_" + id + "_" + claimFuId).prop('checked')) {
    $("#date_fu_from_" + id + "_" + claimFuId).prop('disabled', true);
    $("#date_fu_to_" + id + "_" + claimFuId).prop('disabled', true);
    $("#date_fu_from_" + id + "_" + claimFuId).val('');
    $("#date_fu_to_" + id + "_" + claimFuId).val('');
  } else {
    $("#date_fu_from_" + id + "_" + claimFuId).prop('disabled', false);
    $("#date_fu_to_" + id + "_" + claimFuId).prop('disabled', false);
  }
}

// //Скрывает суммы, в случае отказа или БР
// $(document).on("change", ".fu_claim_types", function (event) {
// 	if ($(this).find(':selected').text() == "Удовлетворено") {
// 		$(this).parent().next().show('fast')
// 		$(this).parent().next().find('.fu_claim_summs').addClass('form-control')
// 	} else {
//     	$(this).parent().next().hide('fast')
// 		$(this).parent().next().find('.fu_claim_summs').val('');
// 		setTimeout(() => {
//             $(this).parent().next().find('.fu_claim_summs').removeClass('form-control')
//         }, 200)
// 	}
// })

//Удаляет тип требования, в случае, если тип решения - отказ или прекращение
$(document).on("change", ".fu_types", function (event) {
	if ($(this).find(':selected').text() == "Об удовлетворении") {
		$(this).parent().parent().parent().find('.fu_claim_types').parent().show('fast')
		$(this).parent().parent().parent().find('.fu_claim_types').addClass('form-control')
		//Добавляем тип требования (Удовлетворено)
		if (!$(this).parent().parent().parent().find('.fu_claim_types option:contains("Удовлетворено")').length) {
			$(this).parent().parent().parent().find('.fu_claim_types').each(function(){
				$(this).children().first().after('<option>Удовлетворено</option>')
			})
        }
	} else if ($(this).find(':selected').text() == "Об отказе") {
		$(this).parent().parent().parent().find('.fu_claim_types').parent().show('fast')
		$(this).parent().parent().parent().find('.fu_claim_types').addClass('form-control')

		//Добавляем тип требования (Удовлетворено)
		if ($(this).parent().parent().parent().find('.fu_claim_types option:contains("Удовлетворено")').length) {
            $(this).parent().parent().parent().find('.fu_claim_types option:contains("Удовлетворено")').remove()
        }
	} else if ($(this).find(':selected').text() == "О прекращении") {
		$(this).parent().parent().parent().find('.fu_claim_types').parent().hide('fast')

		setTimeout(() => {
            $(this).parent().parent().parent().find('.fu_claim_types').removeClass('form-control')
        }, 200)
	} else {
		$(this).parent().parent().parent().find('.fu_claim_types').parent().show('fast')
		$(this).parent().parent().parent().find('.fu_claim_types').addClass('form-control')
		//Добавляем тип требования (Удовлетворено)
		if (!$(this).parent().parent().parent().find('.fu_claim_types option:contains("Удовлетворено")').length) {
			$(this).parent().parent().parent().find('.fu_claim_types').each(function(){
				$(this).children().first().after('<option>Удовлетворено</option>')
			})
        }
	}
})

//Скрывает данные о приостановке решения ФУ
$(document).on("change", ".add_fu_info_suspension_types", function (event) {
	if ($(this).find(':selected').text() == "Решение ФУ было приостановлено") {
		$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_first').show('fast')
		$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_first').find('input[type=text]').addClass('form-control')
		$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_first').find('select').addClass('form-control')
		$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_first').find('textarea').addClass('form-control')

		$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_second').show('fast')
		$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_second').find('input[type=text]').addClass('form-control')
		$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_second').find('select').addClass('form-control')
		$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_second').find('textarea').addClass('form-control')

	} else {
    	$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_first').hide('fast')
		$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_second').hide('fast')
		setTimeout(() => {
            $(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_first').find('input[type=text]').removeClass('form-control')
			$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_first').find('select').removeClass('form-control')
			$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_first').find('textarea').removeClass('form-control')

			$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_second').find('input[type=text]').removeClass('form-control')
			$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_second').find('select').removeClass('form-control')
			$(this).parent().parent().parent().find('.add_fu_info_suspension_add_info_second').find('textarea').removeClass('form-control')
        }, 200)
	}
})