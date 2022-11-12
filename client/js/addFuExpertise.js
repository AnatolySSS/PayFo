var fuExpertiseId = 1

function addFuExpertise() {
    fuExpertiseId++
    var str = `<div id="fu_expertise_${fuExpertiseId}" class="fu_expertises">
	<div class="form-row">
	  <div class="form-group col-md-3">
		<input id = "fu_expertise_date_${fuExpertiseId}" class = "fu_expertise_dates datepicker-here form-control" placeholder="Дата" type="text" size="10" required>
	  </div>
	  <div class="form-group col-md-3">
		<input id = "fu_expertise_number_${fuExpertiseId}" class="fu_expertise_numbers form-control" placeholder="№ заключения" type="text" size="8" required>
	  </div>
	  <div class="form-group col-md-4">
		<input id = "fu_expertise_organization_${fuExpertiseId}" class="fu_expertise_organizations li-quotes form-control" placeholder="Наименование экспертной организации" type="text" size="8" required>
	  </div>
	  <div class="form-group col-ms-1">
		<button id="fu_expertise_info_btn_${fuExpertiseId}" class="fu_expertise_info_btns btn btn-outline-warning add_info">
		  <i class="fa fa-chevron-down toggle"></i>
		</button>
	  </div>
	  <div class="form-group col-ms-1">
		<button id="fu_expertise_btn_${fuExpertiseId}" class="fu_expertise_btns btn btn-outline-danger" onclick="removeFuExpertise()">×</button>
	  </div>
	</div>
	<div class="fu_expertise_add_infos" style="display:none">
	  <div class="form-row">
		<div class="form-group col-md-3">
		  <div class="input-group">
			<input id="fu_expertise_summ_without_${fuExpertiseId}" class = "fu_expertise_summ_withouts input-numeral deactivation form-control" aria-describedby="fu_expertise_summ_without_help_block_${fuExpertiseId}" placeholder="Сумма" type="text" size="10" required>
			<div class="input-group-append">
			  <span class="input-group-text">&#8381;</span>
			</div>
		  </div>
		  <small id="fu_expertise_summ_without_help_block_${fuExpertiseId}" class="form-text">
			<div class="form-inline">
			  <input id="fu_expertise_summ_without_deactivate_${fuExpertiseId}" class="deactivator" type="checkbox">
			  <label for="fu_expertise_summ_without_deactivate_${fuExpertiseId}" class="ml-2 form-check-label">Без износа</label>
			</div>
		  </small>
		</div>
		<div class="form-group col-md-3">
		  <div class="input-group">
			<input id="fu_expertise_summ_with_${fuExpertiseId}" class = "fu_expertise_summ_withs input-numeral deactivation form-control" aria-describedby="fu_expertise_summ_with_help_block_${fuExpertiseId}" placeholder="Сумма" type="text" size="10" required>
			<div class="input-group-append">
			  <span class="input-group-text">&#8381;</span>
			</div>
		  </div>
		  <small id="fu_expertise_summ_with_help_block_${fuExpertiseId}" class="form-text">
			<div class="form-inline">
			  <input id="fu_expertise_summ_with_deactivate_${fuExpertiseId}" class="deactivator" type="checkbox">
			  <label for="fu_expertise_summ_with_deactivate_${fuExpertiseId}" class="ml-2 form-check-label">С износом</label>
			</div>
		  </small>
		</div>
		<div class="form-group col-md-3">
		  <div class="input-group">
			<input id="fu_expertise_summ_market_${fuExpertiseId}" class = "fu_expertise_summ_markets input-numeral deactivation form-control" aria-describedby="fu_expertise_summ_market_help_block_${fuExpertiseId}" placeholder="Сумма" type="text" size="10" required>
			<div class="input-group-append">
			  <span class="input-group-text">&#8381;</span>
			</div>
		  </div>
		  <small id="fu_expertise_summ_market_help_block_${fuExpertiseId}" class="form-text">
			<div class="form-inline">
			  <input id="fu_expertise_summ_market_deactivate_${fuExpertiseId}" class="deactivator" type="checkbox">
			  <label for="fu_expertise_summ_market_deactivate_${fuExpertiseId}" class="ml-2 form-check-label">Рыночная стоимость</label>
			</div>
		  </small>
		</div>
		<div class="form-group col-md-3">
		  <div class="input-group">
			<input id="fu_expertise_summ_leftovers_${fuExpertiseId}" class = "fu_expertise_summ_leftovers input-numeral deactivation form-control" aria-describedby="fu_expertise_summ_leftovers_help_block_${fuExpertiseId}" placeholder="Сумма" type="text" size="10" required>
			<div class="input-group-append">
			  <span class="input-group-text">&#8381;</span>
			</div>
		  </div>
		  <small id="fu_expertise_summ_leftovers_help_block_${fuExpertiseId}" class="form-text">
			<div class="form-inline">
			  <input id="fu_expertise_summ_leftovers_deactivate_${fuExpertiseId}" class="deactivator" type="checkbox">
			  <label for="fu_expertise_summ_leftovers_deactivate_${fuExpertiseId}" class="ml-2 form-check-label">Годные остатки</label>
			</div>
		  </small>
		</div>
	  </div>
	  <div class="form-row">
		<div class="form-group col-md-3">
		  <div class="input-group">
			<input id="fu_expertise_summ_uts_${fuExpertiseId}" class = "fu_expertise_summ_uts input-numeral deactivation form-control" aria-describedby="fu_expertise_summ_uts_help_block_${fuExpertiseId}" placeholder="Сумма" type="text" size="10" required>
			<div class="input-group-append">
			  <span class="input-group-text">&#8381;</span>
			</div>
		  </div>
		  <small id="fu_expertise_summ_uts_help_block_${fuExpertiseId}" class="form-text">
			<div class="form-inline">
			  <input id="fu_expertise_summ_uts_deactivate_${fuExpertiseId}" class="deactivator" type="checkbox">
			  <label for="fu_expertise_summ_uts_deactivate_${fuExpertiseId}" class="ml-2 form-check-label">УТС</label>
			</div>
		  </small>
		</div>
		<div class="form-group col-md-4">
		  <input id = "fu_expertise_technician_${fuExpertiseId}" class="fu_expertise_technicians deactivation li-quotes form-control" aria-describedby="fu_expertise_technician_help_block_${fuExpertiseId}" placeholder="Эксперт-техник" type="text" size="8" required>
		  <small id="fu_expertise_technician_help_block_${fuExpertiseId}" class="form-text">
			<div class="form-inline">
			  <input id="fu_expertise_technician_deactivate_${fuExpertiseId}" class="deactivator" type="checkbox">
			  <label for="fu_expertise_technician_deactivate_${fuExpertiseId}" class="ml-2 form-check-label">Сведений не имеется</label>
			</div>
		  </small>
		</div>
		<div class="form-group col-md-4">
		  <select id="fu_expertise_typical_question_${fuExpertiseId}" class="fu_expertise_typical_questions custom-select form-control col-md-12" required>
			<option value="">Вопросы для эксперта</option>
			<option>Комплексная экспертиза</option>
			<option>Трасологическая экспертиза</option>
			<option>Иное</option>
		  </select>
		</div>
	  </div>
	  <div class="form-row" style="display:none">
		<div class="form-group col-md-12">
		  <textarea id = "fu_expertise_question_${fuExpertiseId}" class="fu_expertise_questions deactivation" placeholder="Вопросы, поставленные перед экспертом" type="text" size="8" required></textarea>
		</div>
	  </div>
	  <div class="form-row">
			<div class="form-group col-md-6">
				<select id="fu_expertise_trasa_result_${fuExpertiseId}" class="fu_expertise_trasa_results custom-select col-md-12" required>
					<option value="">Результаты трасологической экспертизы</option>
					<option>Повреждения ТС полностью соответствуют ДТП</option>
					<option>Повреждения ТС частично соответствуют ДТП</option>
					<option>Повреждения ТС не соответствуют ДТП</option>
					<option>Трасологическая экспертиза не проводилась</option>
				</select>
			</div>
	  </div>
	  <div class="form-row">
		<div class="form-group col-md-12">
		  <textarea id = "fu_expertise_trasa_${fuExpertiseId}" class="fu_expertise_trasas deactivation form-control" aria-describedby="fu_expertise_trasa_help_block_${fuExpertiseId}" placeholder="Выводы трасологической экспертизы" type="text" size="8" required></textarea>
		  <small id="fu_expertise_trasa_help_block_${fuExpertiseId}" class="form-text">
			<div class="form-inline">
			  <input id="fu_expertise_trasa_deactivate_${fuExpertiseId}" class="deactivator" type="checkbox">
			  <label for="fu_expertise_trasa_deactivate_${fuExpertiseId}" class="ml-2 form-check-label">Трасология</label>
			</div>
		  </small>
		</div>
	  </div>
	</div>
  </div>`

  	$('#fu_expertises').append(str);
	$(`#fu_expertise_${fuExpertiseId} .datepicker-here`).datepicker()

	$('.datepicker-here').toArray().forEach(function(field){
		new Cleave(field, {
		  date: true,
		  delimiter: '.',
		  datePattern: ['d', 'm', 'Y']
		})
	  })
	
	//Форматирование суммы
	$('.input-numeral').toArray().forEach(function(field){
	new Cleave(field, {
		numeral: true,
		delimiter: ' ',
		//numeralThousandsGroupStyle: 'none',
		numeralPositiveOnly: true,
		numeralIntegerScale: 8
	})
	})
}

function removeFuExpertise() {
	$(`#fu_expertise_${fuExpertiseId}`).remove();
	fuExpertiseId--
}

//Показывает сведения об экспертизах ФУ
$(document).on("change", ".fu_expertise_info", function (event) {
	if ($(this).find(':selected').text() == "Сведения имеются") {
		$(this).parent().parent().next().show('fast')
        $(this).parent().parent().next().find('input[type=text]').addClass('form-control')
        $(this).parent().parent().next().find('select').addClass('form-control')
        $(this).parent().parent().next().find('textarea').addClass('form-control')
	} else {
    	$(this).parent().parent().next().hide('fast')
		setTimeout(() => {
            $(this).parent().parent().next().find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().next().find('select').removeClass('form-control')
            $(this).parent().parent().next().find('textarea').removeClass('form-control')
        }, 200)
	}
});

//Показать дополнительную информацию по решению ФУ
$(document).on("click", ".fu_expertise_info_btns", function (event) {
	if (!($(this).find(".toggle").hasClass("rotate"))) {
		$(this).parent().parent().next().show('fast'); //Показывает .add_fu_info
		$(this).find(".toggle").addClass("rotate");
  	} else {
		$(this).parent().parent().next().hide('fast'); //Скрывает .add_fu_info
		$(this).find(".toggle").removeClass("rotate");
  	}
});

$(document).on("change", ".fu_expertise_typical_questions", function (event) {
	if ($(this).find(':selected').text() == "Иное") {
		$(this).parent().parent().next().show('fast')
		$(this).parent().parent().next().find('textarea').addClass('form-control')
	} else {
		$(this).parent().parent().next().hide('fast')
		setTimeout(() => {
			$(this).parent().parent().next().find('textarea').removeClass('form-control')
		}, 200)
	}
})