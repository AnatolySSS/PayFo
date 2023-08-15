var appsToFoId = 1
var appsToFoContractId = 1
var appsToFoClaimsContractId = 1
var appsToFoExpertise = 1
var paymentId = 1
var inspectionNotice = 1
var appsToFoExpertiseApp = 1

function addAppToFo() {
    appsToFoId++
    var str = `
    <!-- BEGIN apps_to_fo_${appsToFoId} -->
    <div id="apps_to_fo_${appsToFoId}" class="apps_to_fos">
        <hr>
        <div class="form-row ">
            <div class="form-group col-md-3">
                <select id="apps_to_fo_type_${appsToFoId}" class="apps_to_fo_types custom-select form-control" required>
                    <option value="">Тип обращения в ФО</option>
                    <option>Заявление о страховом случае</option>
                    <option>Претензия</option>
                </select>
            </div>
            <div class="form-group col-md-3" style="display:none">
                <select id="apps_to_fo_procedure_${appsToFoId}" class="apps_to_fo_procedures custom-select" required>
                    <option value="">Процедура обращения в ФО</option>
                    <option>ПВУ</option>
                    <option>В ФО виновника</option>
                </select>
            </div>
            <div class="form-group col-md-3" style="display:none">
                <select id="apps_to_fo_type_of_claim_${appsToFoId}" class="apps_to_fo_type_of_claims custom-select" required>
                    <option value="">Тип претензии</option>
                    <option>Несогласие с размером выплаты</option>
                    <option>Несогласие с отказом в выплате</option>
                </select>
            </div>
            <div class="form-group col-md-2">
                <select id="apps_to_fo_method_${appsToFoId}" class="apps_to_fo_methods custom-select form-control" required>
                    <option value="">Способ обращения в ФО</option>
                    <option>Лично</option>
                    <option>По почте</option>
                </select>
            </div>
            <div class="form-group col-md-2">
                <input id = "apps_to_fo_date_${appsToFoId}" class = "apps_to_fo_dates datepicker-here form-control" placeholder="Дата" type="text" size="10" required>
            </div>
            <div class="form-group col-ms-1">
                <button id="apps_to_fo_info_btn_${appsToFoId}" class="apps_to_fo_info_btns btn btn-outline-warning add_info">
                    <i class="fa fa-chevron-down toggle"></i>
                </button>
            </div>
            <div class="form-group col-ms-1">
                <button id="apps_to_fo_btn_${appsToFoId}" class="apps_to_fo_btns btn btn-outline-danger" onclick="removeAppToFo()">×</button>
            </div>
        </div>

        <!-- BEGIN apps_to_fo_add_info_${appsToFoId} -->
        <div class="apps_to_fo_add_info_${appsToFoId}" style="display:none">

            <!-- BEGIN apps-to-fo-form -->
            <div class="apps-to-fo-form">
                <div class="form-row">
                    <div class="form-group col-md-12">
                        <h6>Сведения о форме страхового возмещения, выбранной Заявителем</h6>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <select id="apps_to_fo_form_${appsToFoId}" class="apps_to_fo_forms custom-select form-control col-md-12" required>
                            <option value="">Форма страхового возмещения</option>
                            <option>Выплата денежных средств безналичным расчетом</option>
                            <option>Направление на СТОА по выбору ФО</option>
                            <option>Направление на СТОА по выбору Заявителя</option>
                            <option>Не выбрана</option>
                        </select>
                    </div>
                </div>
            </div>
            <!-- END apps-to-fo-form -->

            <!-- BEGIN apps-to-fo-contract -->
            <div id="apps_to_fo_claims_contract_${appsToFoId}">
                <div class="form-row">
                    <div class="form-group col-md-8">
                        <h6>Сведения о заявленных требованиях</h6>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <select id="apps_to_fo_claims_contract_info_${appsToFoId}" class="apps_to_fo_claims_contract_infos custom-select form-control col-md-12" required>
                            <option value="">Наличие сведений</option>
                            <option>Дополнительные требования заявлены</option>
                            <option>Дополнительные требования не заявлены</option>
                        </select>
                    </div>
                </div>
                <div id="apps_to_fo_claims_contract_${appsToFoId}_1" class="apps_to_fo_claims_contract_${appsToFoId} apps_to_fo_claims_contracts" style="display:none">
                    <div id="claims_contract_${appsToFoId}_1" class="form-row">
                        <div class="form-group col-md-5">
                            <select id="apps_to_fo_claims_contract_type_${appsToFoId}_1" class="apps_to_fo_claims_contract_type_${appsToFoId} apps_to_fo_contract_types custom-select form-control col-md-12" required>
                                <option value="">Выберите тип договора</option>
                                <option>ОСАГО</option>
                                <option>КАСКО</option>
                                <option>ДСАГО</option>
                            </select>
                        </div>
                        <div class="form-group col-ms-1">
                            <button id="add_apps_to_fo_claims_info_btn_${appsToFoId}_1" class="add_apps_to_fo_claims_info_btn_${appsToFoId} add_apps_to_fo_claims_info_btns btn btn-outline-warning add_info">
                                <i class="fa fa-chevron-down toggle"></i>
                            </button>
                        </div>
                        <div class="form-group col-ms-1">
                            <button id="apps_to_fo_claims_contract_btn_${appsToFoId}_1" class="apps_to_fo_claims_contract_btn_${appsToFoId} apps_to_fo_claims_contract_btns btn btn-outline-warning" onclick="addAppsToFoContract(${appsToFoId})">+</button>
                        </div>
                    </div>
                    <div id="apps_to_fo_claims_${appsToFoId}_1" style="display:none">
                        <div id="apps_to_fo_claim_${appsToFoId}_1_1" class="apps_to_fo_claim_${appsToFoId}_1 apps_to_fo_claim_${appsToFoId} apps_to_fo_claims form-row ">
                            <div class="form-group col-md-5">
                                <select id="apps_to_fo_claim_type_${appsToFoId}_1_1" class="apps_to_fo_claim_type_${appsToFoId}_1 apps_to_fo_claim_type_${appsToFoId} apps_to_fo_claim_types custom-select col-md-12 form-control" required>
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
                                    <input id="apps_to_fo_claim_summ_${appsToFoId}_1_1" class = "apps_to_fo_claim_summ_${appsToFoId}_1 apps_to_fo_claim_summ_${appsToFoId} apps_to_fo_claim_summs input-numeral form-control deactivation" aria-describedby="apps_to_fo_claim_summ_help_block_${appsToFoId}_1" placeholder="Сумма" type="text" size="10" required>
                                    <div class="input-group-append">
                                        <span class="input-group-text">&#8381;</span>
                                    </div>
                                </div>
                                <small id="apps_to_fo_claim_summ_help_block_${appsToFoId}_1" class="form-text">
                                    <div class="form-inline">
                                        <input id="apps_to_fo_claim_summ_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                        <label for="apps_to_fo_claim_summ_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">Сведений не имеется</label>
                                    </div>
                                </small>
                            </div>
                            <div class="form-group col-ms-1">
                                <button id="apps_to_fo_claim_btn_${appsToFoId}_1_1" class="apps_to_fo_claim_btn_${appsToFoId}_1 apps_to_fo_claim_btn_${appsToFoId} apps_to_fo_claim_btns btn btn-outline-warning" onclick="addAppsToFoClaim(${appsToFoId}, 1)">+</button>
                            </div>
                        </div>
                        <div id="add_apps_to_fo_claim_info_${appsToFoId}_1_1" class="add_apps_to_fo_claim_info_${appsToFoId}_1 add_apps_to_fo_claim_info_${appsToFoId} add_apps_to_fo_claim_infos form-group " style="display:none">
                            <div class="form-group">
                                <h6>Период неустойки</h6>
                            </div>
                            <div class="form-group form-inline">
                                <label for="date_apps_to_fo_claim_from_${appsToFoId}_1_1">c</label>
                                <input id = "date_apps_to_fo_claim_from_${appsToFoId}_1_1" class = "date_apps_to_fo_claim_from_${appsToFoId}_1 date_apps_to_fo_claim_from_${appsToFoId} date_apps_to_fo_claim_froms ml-2 datepicker-here col-md-3" placeholder="Дата" type="text" size="10" required>
                                <label for="date_apps_to_fo_claim_to_${appsToFoId}_1_1" class="ml-2">по</label>
                                <input id = "date_apps_to_fo_claim_to_${appsToFoId}_1_1" class = "date_apps_to_fo_claim_to_${appsToFoId}_1 date_apps_to_fo_claim_to_${appsToFoId} date_apps_to_fo_claim_tos ml-2 datepicker-here col-md-3" placeholder="Дата" type="text" size="10" required>
                            </div>
                            <div class="form-group">
                                <input id="apps_to_fo_claim_without_period_${appsToFoId}_1_1" class="apps_to_fo_claim_without_period_${appsToFoId}_1 apps_to_fo_claim_without_period_${appsToFoId} apps_to_fo_claim_without_periods ml-2" type="checkbox" onclick="block_apps_to_fo_claim_date(${appsToFoId}, 1, 1)">
                                <label for="apps_to_fo_claim_without_period_${appsToFoId}_1_1" class="ml-2 form-check-label">Период не указан</label>
                                <input id="apps_to_fo_claim_pdf_${appsToFoId}_1_1" class="apps_to_fo_claim_pdf_${appsToFoId}_1 apps_to_fo_claim_pdf_${appsToFoId} apps_to_fo_claim_pdfs ml-2" type="checkbox">
                                <label for="apps_to_fo_claim_pdf_${appsToFoId}_1_1" class="ml-2 form-check-label">По день факта</label>
                            </div>
                        </div>
                        <div id="apps_to_fo_claim_ev_${appsToFoId}_1_1" class="apps_to_fo_claim_ev_${appsToFoId}_1 apps_to_fo_claim_ev_${appsToFoId} apps_to_fo_claim_evs" style="display:none">
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <h6>Маршрут эвакуации</h6>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <select id="apps_to_fo_claim_ev_route_${appsToFoId}_1_1" class="apps_to_fo_claim_ev_route_${appsToFoId}_1 apps_to_fo_claim_ev_route_${appsToFoId} apps_to_fo_claim_ev_routes custom-select deactivation col-md-12" aria-describedby="apps_to_fo_claim_ev_route_help_block_${appsToFoId}_1_1" required>
                                        <option value="">Выберите вариант</option>
                                        <option>ДТП - СТОА</option>
                                        <option>ДТП - Хранение</option>
                                        <option>Хранение - СТОА</option>
                                    </select>
                                    <small id="apps_to_fo_claim_ev_route_help_block_${appsToFoId}_1_1" class="form-text">
                                        <div class="form-inline">
                                            <input id="apps_to_fo_claim_ev_route_deactivate_${appsToFoId}_1_1" class="deactivator" type="checkbox">
                                            <label for="apps_to_fo_claim_ev_route_deactivate_${appsToFoId}_1_1" class="ml-2 form-check-label">Сведений не имеется</label>
                                        </div>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END apps-to-fo-contract -->

            <!-- BEGIN apps-to-fo-expertise-app -->
            <div class="apps-to-fo-expertise-app">
                <div class="form-row">
                    <div class="form-group col-md-8">
                        <h6>Сведения об экспертизе Заявителя</h6>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <select id="apps_to_fo_expertise_app_info_${appsToFoId}" class="apps_to_fo_expertise_app_infos custom-select form-control col-md-12" required>
                            <option value="">Наличие сведений</option>
                            <option>Сведения имеются</option>
                            <option>Сведений не имеется</option>
                        </select>
                    </div>
                </div>
                <div id="apps_to_fo_expertises_app_${appsToFoId}" class="apps_to_fo_expertise_apps" style="display:none">
                    <div id="apps_to_fo_expertise_app_${appsToFoId}_1" class="apps_to_fo_expertise_apps_${appsToFoId}">
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <input id = "apps_to_fo_expertise_app_date_${appsToFoId}_1" class = "apps_to_fo_expertise_app_date_${appsToFoId} apps_to_fo_expertise_app_dates datepicker-here" placeholder="Дата" type="text" size="10" required>
                            </div>
                            <div class="form-group col-md-3">
                                <input id = "apps_to_fo_expertise_app_number_${appsToFoId}_1" class="apps_to_fo_expertise_app_number_${appsToFoId} apps_to_fo_expertise_app_numbers" placeholder="№ заключения" type="text" size="8" required>
                            </div>
                            <div class="form-group col-md-4">
                                <input id = "apps_to_fo_expertise_app_organization_${appsToFoId}_1" class="apps_to_fo_expertise_app_organization_${appsToFoId} apps_to_fo_expertise_app_organizations li-quotes" placeholder="Наименование экспертной организации" type="text" size="8" required>
                            </div>
                            <div class="form-group col-ms-1">
                                <button id="add_apps_to_fo_expertise_app_info_btn_${appsToFoId}_1" class="add_apps_to_fo_expertise_app_info_btn_${appsToFoId} add_apps_to_fo_expertise_app_info_btns btn btn-outline-warning add_info">
                                    <i class="fa fa-chevron-down toggle"></i>
                                </button>
                            </div>
                            <div class="form-group col-ms-1">
                                <button id="apps_to_fo_expertise_app_btn_${appsToFoId}_1" class="apps_to_fo_expertise_app_btn_${appsToFoId} apps_to_fo_expertise_app_btns btn btn-outline-warning" onclick="addExpertizeApp(${appsToFoId})">+</button>
                            </div>
                        </div>
                        <div class="apps_to_fo_expertise_app_add_infos" style="display:none">
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <div class="input-group">
                                        <input id="apps_to_fo_expertise_app_summ_without_${appsToFoId}_1" class = "apps_to_fo_expertise_app_summ_without_${appsToFoId} apps_to_fo_expertise_app_summ_withouts input-numeral deactivation" aria-describedby="apps_to_fo_expertise_app_summ_without_help_block_${appsToFoId}_1" placeholder="Сумма" type="text" size="10" required>
                                        <div class="input-group-append">
                                            <span class="input-group-text">&#8381;</span>
                                        </div>
                                    </div>
                                    <small id="apps_to_fo_expertise_app_summ_without_help_block_${appsToFoId}_1" class="form-text">
                                        <div class="form-inline">
                                            <input id="apps_to_fo_expertise_app_summ_without_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                            <label for="apps_to_fo_expertise_app_summ_without_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">Без износа</label>
                                        </div>
                                    </small>
                                </div>
                                <div class="form-group col-md-3">
                                    <div class="input-group">
                                        <input id="apps_to_fo_expertise_app_summ_with_${appsToFoId}_1" class = "apps_to_fo_expertise_app_summ_with_${appsToFoId} apps_to_fo_expertise_app_summ_withs input-numeral deactivation" aria-describedby="apps_to_fo_expertise_app_summ_with_help_block_${appsToFoId}_1" placeholder="Сумма" type="text" size="10" required>
                                        <div class="input-group-append">
                                            <span class="input-group-text">&#8381;</span>
                                        </div>
                                    </div>
                                    <small id="apps_to_fo_expertise_app_summ_with_help_block_${appsToFoId}_1" class="form-text">
                                        <div class="form-inline">
                                            <input id="apps_to_fo_expertise_app_summ_with_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                            <label for="apps_to_fo_expertise_app_summ_with_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">С износом</label>
                                        </div>
                                    </small>
                                </div>
                                <div class="form-group col-md-3">
                                    <div class="input-group">
                                        <input id="apps_to_fo_expertise_app_summ_market_${appsToFoId}_1" class = "apps_to_fo_expertise_app_summ_market_${appsToFoId} apps_to_fo_expertise_app_summ_markets input-numeral deactivation" aria-describedby="apps_to_fo_expertise_app_summ_market_help_block_${appsToFoId}_1" placeholder="Сумма" type="text" size="10" required>
                                        <div class="input-group-append">
                                            <span class="input-group-text">&#8381;</span>
                                        </div>
                                    </div>
                                    <small id="apps_to_fo_expertise_app_summ_market_help_block_${appsToFoId}_1" class="form-text">
                                        <div class="form-inline">
                                            <input id="apps_to_fo_expertise_app_summ_market_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                            <label for="apps_to_fo_expertise_app_summ_market_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">Рыночная стоимость</label>
                                        </div>
                                    </small>
                                </div>
                                <div class="form-group col-md-3">
                                    <div class="input-group">
                                        <input id="apps_to_fo_expertise_app_summ_leftovers_${appsToFoId}_1" class = "apps_to_fo_expertise_app_summ_leftovers_${appsToFoId} apps_to_fo_expertise_app_summ_leftovers input-numeral deactivation" aria-describedby="apps_to_fo_expertise_app_summ_leftovers_help_block_${appsToFoId}_1" placeholder="Сумма" type="text" size="10" required>
                                        <div class="input-group-append">
                                            <span class="input-group-text">&#8381;</span>
                                        </div>
                                    </div>
                                    <small id="apps_to_fo_expertise_app_summ_leftovers_help_block_${appsToFoId}_1" class="form-text">
                                        <div class="form-inline">
                                            <input id="apps_to_fo_expertise_app_summ_leftovers_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                            <label for="apps_to_fo_expertise_app_summ_leftovers_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">Годные остатки</label>
                                        </div>
                                    </small>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <div class="input-group">
                                        <input id="apps_to_fo_expertise_app_summ_uts_${appsToFoId}_1" class = "apps_to_fo_expertise_app_summ_uts_${appsToFoId} apps_to_fo_expertise_app_summ_uts input-numeral deactivation" aria-describedby="apps_to_fo_expertise_app_summ_uts_help_block_${appsToFoId}_1" placeholder="Сумма" type="text" size="10" required>
                                        <div class="input-group-append">
                                            <span class="input-group-text">&#8381;</span>
                                        </div>
                                    </div>
                                    <small id="apps_to_fo_expertise_app_summ_uts_help_block_${appsToFoId}_1" class="form-text">
                                        <div class="form-inline">
                                            <input id="apps_to_fo_expertise_app_summ_uts_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                            <label for="apps_to_fo_expertise_app_summ_uts_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">УТС</label>
                                        </div>
                                    </small>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-12">
                                    <textarea id = "apps_to_fo_expertise_app_trasa_${appsToFoId}_1" class="apps_to_fo_expertise_app_trasa_${appsToFoId} apps_to_fo_expertise_app_trasas deactivation" aria-describedby="apps_to_fo_expertise_app_trasa_help_block_${appsToFoId}_1" placeholder="Выводы трасологической экспертизы" type="text" size="8" required></textarea>
                                    <small id="apps_to_fo_expertise_app_trasa_help_block_${appsToFoId}_1" class="form-text">
                                        <div class="form-inline">
                                            <input id="apps_to_fo_expertise_app_trasa_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                            <label for="apps_to_fo_expertise_app_trasa_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">Трасология</label>
                                        </div>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END apps-to-fo-expertise-app -->

            <!-- BEGIN apps-to-fo-inspection -->
            <div class="apps-to-fo-inspection">
                <div class="form-row ">
                    <div class="form-group col-md-8">
                        <h6>Сведения о проведении осмотра ТС</h6>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <select id="apps_to_fo_inspection_info_${appsToFoId}" class="apps_to_fo_inspection_infos custom-select form-control col-md-12" required>
                            <option value="">Наличие сведений</option>
                            <option>Сведения имеются</option>
                            <option>Сведений не имеется</option>
                        </select>
                    </div>
                </div>
                <div id="apps_to_fo_inspection_${appsToFoId}" class="apps_to_fo_inspections" style="display:none">
                    <div id="apps_to_fo_inspection_${appsToFoId}_1" class="apps_to_fo_inspections_${appsToFoId}">
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <input id = "apps_to_fo_inspection_date_${appsToFoId}" class = "apps_to_fo_inspection_date_${appsToFoId} apps_to_fo_inspection_dates datepicker-here deactivation" aria-describedby="apps_to_fo_inspection_date_help_block_${appsToFoId}_1" placeholder="Дата" type="text" size="10" required>
                                <small id="apps_to_fo_inspection_date_help_block_${appsToFoId}_1" class="form-text">
                                    <div class="form-inline">
                                        <input id="apps_to_fo_inspection_date_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                        <label for="apps_to_fo_inspection_date_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">Сведений не имеется</label>
                                    </div>
                                </small>
                            </div>
                            <div class="form-group col-md-3">
                                <input id = "apps_to_fo_inspection_number_${appsToFoId}" class="apps_to_fo_inspection_number_${appsToFoId} apps_to_fo_inspection_numbers deactivation" aria-describedby="apps_to_fo_inspection_number_help_block_${appsToFoId}_1" placeholder="№ акта" type="text" size="8" required>
                                <small id="apps_to_fo_inspection_number_help_block_${appsToFoId}_1" class="form-text">
                                    <div class="form-inline">
                                        <input id="apps_to_fo_inspection_number_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                        <label for="apps_to_fo_inspection_number_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">Сведений не имеется</label>
                                    </div>
                                </small>
                            </div>
                            <div class="form-group col-md-6">
                                <input id = "apps_to_fo_inspection_organization_${appsToFoId}" class="apps_to_fo_inspection_organization_${appsToFoId} apps_to_fo_inspection_organizations deactivation li-quotes" aria-describedby="apps_to_fo_inspection_organization_help_block_${appsToFoId}_1" placeholder="Наименование экспертной организации" type="text" size="8" required>
                                <small id="apps_to_fo_inspection_organization_help_block_${appsToFoId}_1" class="form-text">
                                    <div class="form-inline">
                                        <input id="apps_to_fo_inspection_organization_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                        <label for="apps_to_fo_inspection_organization_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">Сведений не имеется</label>
                                    </div>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END apps-to-fo-inspection -->

            <!-- BEGIN apps-to-fo-expertise -->
            <div class="apps-to-fo-expertise">
                <div class="form-row ">
                    <div class="form-group col-md-8">
                        <h6>Сведения об экспертизе ФО</h6>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <select id="apps_to_fo_expertise_info_${appsToFoId}" class="apps_to_fo_expertise_infos custom-select form-control col-md-12" required>
                            <option value="">Наличие сведений</option>
                            <option>Сведения имеются</option>
                            <option>Сведений не имеется</option>
                        </select>
                    </div>
                </div>
                <div id="apps_to_fo_expertises_${appsToFoId}" class="apps_to_fo_expertises" style="display:none">
                    <div id="apps_to_fo_expertise_${appsToFoId}_1" class="apps_to_fo_expertises_${appsToFoId}">
                        <div class="form-row ">
                            <div class="form-group col-md-3">
                                <input id = "apps_to_fo_expertise_date_${appsToFoId}_1" class = "apps_to_fo_expertise_date_${appsToFoId} apps_to_fo_expertise_dates datepicker-here" placeholder="Дата" type="text" size="10" required>
                            </div>
                            <div class="form-group col-md-3">
                                <input id = "apps_to_fo_expertise_number_${appsToFoId}_1" class="apps_to_fo_expertise_number_${appsToFoId} apps_to_fo_expertise_numbers" placeholder="№ заключения" type="text" size="8" required>
                            </div>
                            <div class="form-group col-md-4">
                                <input id = "apps_to_fo_expertise_organization_${appsToFoId}_1" class="apps_to_fo_expertise_organization_${appsToFoId} apps_to_fo_expertise_organizations li-quotes" placeholder="Наименование экспертной организации" type="text" size="8" required>
                            </div>
                            <div class="form-group col-ms-1">
                                <button id="add_apps_to_fo_expertise_info_btn_${appsToFoId}_1" class="add_apps_to_fo_expertise_info_btn_${appsToFoId} add_apps_to_fo_expertise_info_btns btn btn-outline-warning add_info">
                                    <i class="fa fa-chevron-down toggle"></i>
                                </button>
                            </div>
                            <div class="form-group col-ms-1">
                                <button id="apps_to_fo_expertise_btn_${appsToFoId}_1" class="apps_to_fo_expertise_btn_${appsToFoId} apps_to_fo_expertise_btns btn btn-outline-warning" onclick="addExpertize(${appsToFoId})">+</button>
                            </div>
                        </div>
                        <div class="apps_to_fo_expertise_add_infos" style="display:none">
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <div class="input-group">
                                        <input id="apps_to_fo_expertise_summ_without_${appsToFoId}_1" class = "apps_to_fo_expertise_summ_without_${appsToFoId} apps_to_fo_expertise_summ_withouts input-numeral deactivation" aria-describedby="apps_to_fo_expertise_summ_without_help_block_${appsToFoId}_1" placeholder="Сумма" type="text" size="10" required>
                                        <div class="input-group-append">
                                            <span class="input-group-text">&#8381;</span>
                                        </div>
                                    </div>
                                    <small id="apps_to_fo_expertise_summ_without_help_block_${appsToFoId}_1" class="form-text">
                                        <div class="form-inline">
                                            <input id="apps_to_fo_expertise_summ_without_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                            <label for="apps_to_fo_expertise_summ_without_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">Без износа</label>
                                        </div>
                                    </small>
                                </div>
                                <div class="form-group col-md-3">
                                    <div class="input-group">
                                        <input id="apps_to_fo_expertise_summ_with_${appsToFoId}_1" class = "apps_to_fo_expertise_summ_with_${appsToFoId} apps_to_fo_expertise_summ_withs input-numeral deactivation" aria-describedby="apps_to_fo_expertise_summ_with_help_block_${appsToFoId}_1" placeholder="Сумма" type="text" size="10" required>
                                        <div class="input-group-append">
                                            <span class="input-group-text">&#8381;</span>
                                        </div>
                                    </div>
                                    <small id="apps_to_fo_expertise_summ_with_help_block_${appsToFoId}_1" class="form-text">
                                        <div class="form-inline">
                                            <input id="apps_to_fo_expertise_summ_with_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                            <label for="apps_to_fo_expertise_summ_with_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">С износом</label>
                                        </div>
                                    </small>
                                </div>
                                <div class="form-group col-md-3">
                                    <div class="input-group">
                                        <input id="apps_to_fo_expertise_summ_market_${appsToFoId}_1" class = "apps_to_fo_expertise_summ_market_${appsToFoId} apps_to_fo_expertise_summ_markets input-numeral deactivation" aria-describedby="apps_to_fo_expertise_summ_market_help_block_${appsToFoId}_1" placeholder="Сумма" type="text" size="10" required>
                                        <div class="input-group-append">
                                            <span class="input-group-text">&#8381;</span>
                                        </div>
                                    </div>
                                    <small id="apps_to_fo_expertise_summ_market_help_block_${appsToFoId}_1" class="form-text">
                                        <div class="form-inline">
                                            <input id="apps_to_fo_expertise_summ_market_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                            <label for="apps_to_fo_expertise_summ_market_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">Рыночная стоимость</label>
                                        </div>
                                    </small>
                                </div>
                                <div class="form-group col-md-3">
                                    <div class="input-group">
                                        <input id="apps_to_fo_expertise_summ_leftovers_${appsToFoId}_1" class = "apps_to_fo_expertise_summ_leftovers_${appsToFoId} apps_to_fo_expertise_summ_leftovers input-numeral deactivation" aria-describedby="apps_to_fo_expertise_summ_leftovers_help_block_${appsToFoId}_1" placeholder="Сумма" type="text" size="10" required>
                                        <div class="input-group-append">
                                            <span class="input-group-text">&#8381;</span>
                                        </div>
                                    </div>
                                    <small id="apps_to_fo_expertise_summ_leftovers_help_block_${appsToFoId}_1" class="form-text">
                                        <div class="form-inline">
                                            <input id="apps_to_fo_expertise_summ_leftovers_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                            <label for="apps_to_fo_expertise_summ_leftovers_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">Годные остатки</label>
                                        </div>
                                    </small>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <div class="input-group">
                                        <input id="apps_to_fo_expertise_summ_uts_${appsToFoId}_1" class = "apps_to_fo_expertise_summ_uts_${appsToFoId} apps_to_fo_expertise_summ_uts input-numeral deactivation" aria-describedby="apps_to_fo_expertise_summ_uts_help_block_${appsToFoId}_1" placeholder="Сумма" type="text" size="10" required>
                                        <div class="input-group-append">
                                            <span class="input-group-text">&#8381;</span>
                                        </div>
                                    </div>
                                    <small id="apps_to_fo_expertise_summ_uts_help_block_${appsToFoId}_1" class="form-text">
                                        <div class="form-inline">
                                            <input id="apps_to_fo_expertise_summ_uts_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                            <label for="apps_to_fo_expertise_summ_uts_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">УТС</label>
                                        </div>
                                    </small>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-12">
                                    <textarea id = "apps_to_fo_expertise_trasa_${appsToFoId}_1" class="apps_to_fo_expertise_trasa_${appsToFoId} apps_to_fo_expertise_trasas deactivation" aria-describedby="apps_to_fo_expertise_trasa_help_block_${appsToFoId}_1" placeholder="Выводы трасологической экспертизы" type="text" size="8" required></textarea>
                                    <small id="apps_to_fo_expertise_trasa_help_block_${appsToFoId}_1" class="form-text">
                                        <div class="form-inline">
                                            <input id="apps_to_fo_expertise_trasa_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                            <label for="apps_to_fo_expertise_trasa_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">Трасология</label>
                                        </div>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END apps-to-fo-expertise -->

            <!-- BEGIN apps-to-fo-answer-fo -->
            <div class="apps-to-fo-answer-fo">
                <div class="form-row ">
                    <div class="form-group col-md-8">
                        <h6>Сведения об ответе ФО на обращение</h6>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <select id="apps_to_fo_answer_fo_info_${appsToFoId}" class="apps_to_fo_answer_fo_infos custom-select form-control col-md-12" required>
                            <option value="">Наличие сведений</option>
                            <option>Сведения имеются</option>
                            <option>Сведений не имеется</option>
                        </select>
                    </div>
                </div>
                <div id="apps_to_fo_answer_fos_${appsToFoId}" style="display:none">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <select id="apps_to_fo_answer_fo_${appsToFoId}" class="apps_to_fo_answer_fos custom-select col-md-12" required>
                                <option value="">Ответ ФО</option>
                                <option>Возврат документов</option>
                                <option>Осуществление выплаты</option>
                                <option>Выдача направления на ремонт</option>
                                <option>Отказ в выплате</option>
                            </select>
                        </div>
                    </div>

                    <!-- BEGIN payments -->
                    <div id="payment_${appsToFoId}" style="display:none">
                        <div class="payments_colunm_names form-row">
                            <div class="form-group col-md-3">
                                <h6>Вид выплаты</h6>
                            </div>
                            <div class="form-group col-md-3">
                                <h6>Дата выплаты</h6>
                            </div>
                            <div class="form-group col-md-2">
                                <h6>№ ПП</h6>
                            </div>
                            <div class="form-group col-md-3">
                                <h6>Сумма выплаты</h6>
                            </div>
                        </div>
                        <div id="payment_${appsToFoId}_1" class="payment_${appsToFoId} payments">
                          <div class="form-row">
                            <div class="form-group col-md-3 form-inline">
                              <select id="payments_name_${appsToFoId}_1" class="payments_name_${appsToFoId} payments_names custom-select col-md-12" required>
                                <option value="">Вид выплаты</option>
                                <option>Страховое возмещение</option>
                                <option>УТС</option>
                                <option>Эвакуатор</option>
                                <option>Хранение</option>
                                <option>Неустойка</option>
                              </select>
                            </div>
                            <div class="form-group col-md-3">
                              <input id = "payments_date_${appsToFoId}_1" class = "payments_date_${appsToFoId} payments_dates datepicker-here" placeholder="Дата" type="text" size="10" required>
                            </div>
                            <div class="form-group col-md-2">
                              <input id = "payments_order_${appsToFoId}_1" class="payments_order_${appsToFoId} payments_orders" placeholder="№ ПП" type="text" size="8" required>
                            </div>
                            <div class="form-group col-md-3">
                              <div class="input-group">
                                <input id="payments_summ_${appsToFoId}_1" class = "payments_summ_${appsToFoId} payments_summs input-numeral" placeholder="Сумма" type="text" size="10" required>
                                <div class="input-group-append">
                                  <span class="input-group-text">&#8381;</span>
                                </div>
                              </div>
                            </div>
                            <div class="form-group col-ms-1">
                              <button id="payments_btn_${appsToFoId}_1" class="payments_btn_${appsToFoId} payments_btns btn btn-outline-warning" onclick="addPayment(${appsToFoId})">+</button>
                            </div>
                          </div>
                          <div class="form-row" style="display:none">
                            <div class="form-group col-md-4 form-inline">
                              <div class="form-check">
                                <input id="penalty_ndfl_${appsToFoId}_1" class="penalty_ndfl_${appsToFoId} penalty_ndfls form-check-input" type="checkbox">
                                <label for="penalty_ndfl_${appsToFoId}_1" class="ml-2 form-check-label">удержан НДФЛ в размере</label>
                              </div>
                            </div>
                            <div class="form-group col-md-3" style="display:none">
                              <div class="input-group">
                                <input id="penalty_ndfl_summ_${appsToFoId}_1" class = "penalty_ndfl_summ_${appsToFoId} penalty_ndfl_summs input-numeral" placeholder="Сумма НДФЛ" type="text" size="10" required>
                                <div class="input-group-append">
                                  <span class="input-group-text">&#8381;</span>
                                </div>
                              </div>
                            </div>
                            <div class="form-group col-md-3 form-inline">
                              <span id="penalty_ndfl_persent_${appsToFoId}_1" class="penalty_ndfl_persent_${appsToFoId} penalty_ndfl_persents"></span>
                            </div>
                          </div>
                          <div id="payment_ev_${appsToFoId}_1" class="payment_ev_${appsToFoId} payment_evs" style="display:none">
                            <div class="form-row">
                              <div class="form-group col-md-3">
                                <h6>Маршрут эвакуации</h6>
                              </div>
                            </div>
                            <div class="form-row">
                              <div class="form-group col-md-3">
                                <select id="payment_ev_route_${appsToFoId}_1" class="payment_ev_route_${appsToFoId} payment_ev_routes custom-select deactivation col-md-12" aria-describedby="payment_ev_route_help_block_${appsToFoId}_1" required>
                                  <option value="">Выберите вариант</option>
                                  <option>ДТП - СТОА</option>
                                  <option>ДТП - Хранение</option>
                                  <option>Хранение - СТОА</option>
                                </select>
                                <small id="payment_ev_route_help_block_${appsToFoId}_1" class="form-text">
                                  <div class="form-inline">
                                    <input id="payment_ev_route_deactivate_${appsToFoId}_1" class="deactivator" type="checkbox">
                                    <label for="payment_ev_route_deactivate_${appsToFoId}_1" class="ml-2 form-check-label">Сведений не имеется</label>
                                  </div>
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <!-- END payments -->

                    <!-- BEGIN stor -->
                    <div id="apps_to_fo_stor_${appsToFoId}" class="apps_to_fo_stors" style="display:none">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <h6>Наименование СТОА</h6>
                            </div>
                            <div class="form-group col-md-3">
                                <h6>Дата направления</h6>
                            </div>
                            <div class="form-group col-md-3">
                                <h6>№ направления</h6>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <input id = "apps_to_fo_stor_name_${appsToFoId}" class="apps_to_fo_stor_names" placeholder="Наименование СТОА" type="text" size="8" required>
                            </div>
                            <div class="form-group col-md-3">
                                <input id = "apps_to_fo_stor_date_${appsToFoId}" class = "apps_to_fo_stor_dates datepicker-here" placeholder="Дата" type="text" size="10" required>
                            </div>
                            <div class="form-group col-md-2">
                                <input id = "apps_to_fo_stor_number_${appsToFoId}" class="apps_to_fo_stor_numbers" placeholder="№" type="text" size="8" required>
                            </div>
                            <div class="form-group col-ms-1">
                                <button id="apps_to_fo_add_stor_info_btn_${appsToFoId}" class="apps_to_fo_add_stor_info_btns btn btn-outline-warning add_info">
                                    <i class="fa fa-chevron-down toggle"></i>
                                </button>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-9">
                                <h6>Получение направления на СТОА подтверждает</h6>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <select id="apps_to_fo_stor_confirmation_${appsToFoId}" class="apps_to_fo_stor_confirmations custom-select" required>
                                    <option value="">Выберите вариант</option>
                                    <option>Собственноручная подпись</option>
                                    <option>Почтовая квитанция</option>
                                    <option>Опись вложения</option>
                                    <option>Список почтовых отправлений</option>
                                    <option>Реестр почтовых отправлений</option>
                                    <option>Почтовый идентификатор</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <input id = "apps_to_fo_stor_confirmation_date_${appsToFoId}" class = "apps_to_fo_stor_confirmation_dates datepicker-here" placeholder="Дата" type="text" size="10" required>
                            </div>
                            <div class="form-group col-md-4">
                                <input id = "apps_to_fo_stor_confirmation_number_${appsToFoId}" class="apps_to_fo_stor_confirmation_numbers" placeholder="трек номер" type="text" size="8" required>
                            </div>
                        </div>
                    </div>
                    <!-- END stor -->

                    <!-- BEGIN refusal -->
                    <div id="apps_to_fo_refusal_${appsToFoId}" class="apps_to_fo_refusal_${appsToFoId} apps_to_fo_refusals" style="display:none">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <select id="apps_to_fo_refusal_type_${appsToFoId}" class="apps_to_fo_refusal_type_${appsToFoId} apps_to_fo_refusal_types custom-select col-md-12" required>
                                    <option value="">Основание для отказа</option>
                                    <option>Трасология</option>
                                    <option>Выплата в полном объеме</option>
                                    <option>Немотивированный отказ</option>
                                    <option>Позиция не изменилась</option>
                                    <option>Иное</option>
                                </select>
                            </div>
                            <div class="form-group col-md-3">
                                <input id = "apps_to_fo_refusal_date_${appsToFoId}" class = "apps_to_fo_refusal_date_${appsToFoId} apps_to_fo_refusal_dates datepicker-here" placeholder="Дата" type="text" size="10" required>
                            </div>
                            <div class="form-group col-md-3">
                                <input id = "apps_to_fo_refusal_number_${appsToFoId}" class="apps_to_fo_refusal_number_${appsToFoId} apps_to_fo_refusal_numbers" placeholder="№" type="text" size="8" required>
                            </div>
                        </div>
                        <div id="apps_to_fo_refusal_type_trasa_${appsToFoId}" class="apps_to_fo_refusal_type_trasa_${appsToFoId} apps_to_fo_refusal_type_trasas" style="display:none">
                            <div class="form-row">
                                <div class="form-group col-md-12">
                                    <textarea id = "apps_to_fo_refusal_type_trasa_text_${appsToFoId}" class="apps_to_fo_refusal_type_trasa_text_${appsToFoId} apps_to_fo_refusal_type_trasa_texts deactivation" aria-describedby="apps_to_fo_refusal_type_trasa_text_help_block_${appsToFoId}" placeholder="Дословный текст мотивированного отказа (продолжить фразу: ФО направила Заявителю письмо, в котором сообщалось, что ...)" type="text" size="8" required></textarea>
                                    <small id="apps_to_fo_refusal_type_trasa_text_help_block_${appsToFoId}" class="form-text">
                                        <div class="form-inline">
                                            <input id="apps_to_fo_refusal_type_trasa_text_deactivate_${appsToFoId}" class="deactivator" type="checkbox">
                                            <label for="apps_to_fo_refusal_type_trasa_text_deactivate_${appsToFoId}" class="ml-2 form-check-label">Стандартная мотивировка</label>
                                        </div>
                                    </small>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <select id="apps_to_fo_refusal_type_trasa_stor_posibility_${appsToFoId}" class="apps_to_fo_refusal_type_trasa_stor_posibility_${appsToFoId} apps_to_fo_refusal_type_trasa_stor_posibilities custom-select col-md-12" required>
                                        <option value="">Наличие у ФО договоров со СТОА</option>
                                        <option>Договоры имеются</option>
                                        <option>Договоров не имеется</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-9">
                                <h6>Направление письма подтверждает</h6>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <select id="apps_to_fo_refusal_confirmation_${appsToFoId}" class="apps_to_fo_refusal_confirmation_${appsToFoId} apps_to_fo_refusal_confirmations custom-select" required>
                                    <option value="">Выберите вариант</option>
                                    <option>Почтовая квитанция</option>
                                    <option>Опись вложения</option>
                                    <option>Список почтовых отправлений</option>
                                    <option>Реестр почтовых отправлений</option>
                                    <option>Почтовый идентификатор</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <input id = "apps_to_fo_refusal_confirmation_date_${appsToFoId}" class = "apps_to_fo_refusal_confirmation_date_${appsToFoId} apps_to_fo_refusal_confirmation_dates datepicker-here deactivation" aria-describedby="apps_to_fo_refusal_confirmation_date_help_block_${appsToFoId}" placeholder="Дата" type="text" size="10" required>
                                <small id="apps_to_fo_refusal_confirmation_date_help_block_${appsToFoId}" class="form-text">
                                    <div class="form-inline">
                                        <input id="apps_to_fo_refusal_confirmation_date_deactivate_${appsToFoId}" class="deactivator" type="checkbox">
                                        <label for="apps_to_fo_refusal_confirmation_date_deactivate_${appsToFoId}" class="ml-2 form-check-label">Сведений не имеется</label>
                                    </div>
                                </small>
                            </div>
                            <div class="form-group col-md-3">
                                <input id = "apps_to_fo_refusal_confirmation_number_${appsToFoId}" class="apps_to_fo_refusal_confirmation_number_${appsToFoId} apps_to_fo_refusal_confirmation_numbers deactivation" aria-describedby="apps_to_fo_refusal_confirmation_number_help_block_${appsToFoId}" placeholder="№" type="text" size="8" required>
                                <small id="apps_to_fo_refusal_confirmation_number_help_block_${appsToFoId}" class="form-text">
                                    <div class="form-inline">
                                        <input id="apps_to_fo_refusal_confirmation_number_deactivate_${appsToFoId}" class="deactivator" type="checkbox">
                                        <label for="apps_to_fo_refusal_confirmation_number_deactivate_${appsToFoId}" class="ml-2 form-check-label">Сведений не имеется</label>
                                    </div>
                                </small>
                            </div>
                            <div class="form-group col-md-6">
                                <input id = "apps_to_fo_refusal_confirmation_post_number_${appsToFoId}" class="apps_to_fo_refusal_confirmation_post_number_${appsToFoId} apps_to_fo_refusal_confirmation_post_numbers deactivation" aria-describedby="apps_to_fo_refusal_confirmation_post_number_help_block_${appsToFoId}" placeholder="почтовый идентификатор" type="text" size="8" required>
                                <small id="apps_to_fo_refusal_confirmation_post_number_help_block_${appsToFoId}" class="form-text">
                                    <div class="form-inline">
                                        <input id="apps_to_fo_refusal_confirmation_post_number_deactivate_${appsToFoId}" class="deactivator" type="checkbox">
                                        <label for="apps_to_fo_refusal_confirmation_post_number_deactivate_${appsToFoId}" class="ml-2 form-check-label">Сведений не имеется</label>
                                    </div>
                                </small>
                            </div>
                        </div>
                    </div>
                    <!-- END refusal -->
                </div>
            </div>
            <!-- END apps-to-fo-answer-fo -->

            <!-- BEGIN apps-to-fo-additional-circumstances -->
            <div class="apps-to-fo-additional-circumstances">
                <div class="form-row">
                    <div class="form-group col-md-8">
                        <h6>Дополнительные обстоятельства</h6>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <select id="apps_to_fo_additional_circumstances_1" class="apps_to_fo_additional_circumstances custom-select form-control col-md-12" required>
                            <option value="">Наличие дополнительных обстоятельств</option>
                            <option>Есть</option>
                            <option>Нет</option>
                        </select>
                    </div>
                </div>
            
                <!-- BEGIN apps-to-fo-additional-circumstances-add-infos -->
                <div class="apps-to-fo-additional-circumstances-add-infos" style="display:none">

                    <!-- BEGIN apps-to-fo-agreement -->
                    <div class="apps-to-fo-agreement" style="display:none">
                        <div class="form-row ">
                            <div class="form-group col-md-8">
                                <h6>Сведения о способе уведомления о ходе рассмотрения заявления</h6>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <select id="apps_to_fo_agreement_phone_info_${appsToFoId}" class="apps_to_fo_agreement_phone_infos custom-select col-md-12" required>
                                    <option value="">Наличие сведений</option>
                                    <option>Сведения имеются</option>
                                    <option>Сведений не имеется</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row" style="display:none">
                            <div class="form-group col-md-6">
                                <select id="apps_to_fo_agreement_phone_${appsToFoId}" class="apps_to_fo_agreement_phone_${appsToFoId} apps_to_fo_agreement_phones custom-select col-md-12" required>
                                    <option value="">Согласие на уведомление по телефону</option>
                                    <option>Дано</option>
                                    <option>Не дано</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6" style="display:none">
                                <input id = "apps_to_fo_phone_number_${appsToFoId}" class="apps_to_fo_phone_number_${appsToFoId} apps_to_fo_phone_numbers" placeholder="№ телефона" type="text" size="8" required>
                            </div>
                        </div>
                    </div>
                    <!-- END apps-to-fo-agreement -->

                    <!-- BEGIN apps-to-fo-request -->
                    <div class="apps-to-fo-request">
                        <div class="form-row">
                            <div class="form-group col-md-8">
                                <h6>Сведения о запросе документов</h6>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <select id="apps_to_fo_request_info_${appsToFoId}" class="apps_to_fo_request_infos custom-select col-md-12" required>
                                    <option value="">Наличие сведений</option>
                                    <option>Сведения имеются</option>
                                    <option>Сведений не имеется</option>
                                </select>
                            </div>
                        </div>
                        <div id="apps_to_fo_request_${appsToFoId}" class="apps_to_fo_requests" style="display:none">
                            <div id="apps_to_fo_request_${appsToFoId}_1" class="apps_to_fo_requests_${appsToFoId}">
                                <div class="form-row">
                                    <div class="form-group col-md-3">
                                        <input id = "apps_to_fo_request_date_${appsToFoId}_1" class = "apps_to_fo_request_date_${appsToFoId} apps_to_fo_request_dates datepicker-here" aria-describedby="apps_to_fo_request_date_help_block_${appsToFoId}_1" placeholder="Дата" type="text" size="10" required>
                                        <small id="apps_to_fo_request_date_help_block_${appsToFoId}_1" class="form-text">
                                            Дата запроса
                                        </small>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <input id = "apps_to_fo_request_number_${appsToFoId}_1" class="apps_to_fo_request_number_${appsToFoId} apps_to_fo_request_numbers" aria-describedby="apps_to_fo_request_number_help_block_${appsToFoId}_1" placeholder="№ письма" type="text" size="8" required>
                                        <small id="apps_to_fo_request_number_help_block_${appsToFoId}_1" class="form-text">
                                            № письма
                                        </small>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-12">
                                        <textarea id = "apps_to_fo_request_documents_${appsToFoId}_1" class="apps_to_fo_request_documents_${appsToFoId} apps_to_fo_request_documents" aria-describedby="apps_to_fo_request_documents_help_block_${appsToFoId}_1" placeholder="Перечень запрошенных документов" type="text" size="8" required></textarea>
                                        <small id="apps_to_fo_request_documents_help_block_${appsToFoId}_1" class="form-text">
                                            Введите через запятую запрошенные документы
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END apps-to-fo-request -->

                    <!-- BEGIN apps-to-fo-inspection-notice -->
                    <div class="apps-to-fo-inspection-notice">
                        <div class="form-row">
                            <div class="form-group col-md-8">
                                <h6>Сведения о направлении уведомления о вызове на осмотр ТС</h6>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <select id="apps_to_fo_inspection_notice_info_${appsToFoId}" class="apps_to_fo_inspection_notice_infos custom-select col-md-12" required>
                                    <option value="">Наличие сведений</option>
                                    <option>Сведения имеются</option>
                                    <option>Сведений не имеется</option>
                                </select>
                            </div>
                        </div>
                        <div id="apps_to_fo_inspection_notice_${appsToFoId}" class="apps_to_fo_inspections_notices" style="display:none">
                            <div id="apps_to_fo_inspection_notice_${appsToFoId}_1" class="apps_to_fo_inspections_notice_${appsToFoId}">
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <select id="apps_to_fo_inspection_notice_type_${appsToFoId}_1" class="apps_to_fo_inspection_notice_type_${appsToFoId} apps_to_fo_inspection_notice_types custom-select col-md-12" required>
                                            <option value="">Способ уведомления</option>
                                            <option>Телеграмма</option>
                                            <option>Письмо</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-ms-1">
                                        <button id="apps_to_fo_inspection_notice_info_btn_${appsToFoId}_1" class="apps_to_fo_inspection_notice_info_btn_${appsToFoId} apps_to_fo_inspection_notice_info_btns btn btn-outline-warning add_info">
                                            <i class="fa fa-chevron-down toggle"></i>
                                        </button>
                                    </div>
                                    <div class="form-group col-ms-1">
                                        <button id="apps_to_fo_inspection_notice_btn_${appsToFoId}_1" class="apps_to_fo_inspection_notice_btn_${appsToFoId} apps_to_fo_inspection_notice_btns btn btn-outline-warning" onclick="addInspectionNotice(${appsToFoId})">+</button>
                                    </div>
                                </div>
                                <div id="apps_to_fo_inspection_notice_telegram_${appsToFoId}_1" class="apps_to_fo_inspection_notice_telegram_${appsToFoId} apps_to_fo_inspection_notice_telegrams" style="display:none">
                                    <div class="form-row">
                                        <div class="form-group col-md-3">
                                            <input id = "apps_to_fo_inspection_notice_telegram_date_${appsToFoId}_1" class = "apps_to_fo_inspection_notice_telegram_date_${appsToFoId} apps_to_fo_inspection_notice_telegram_dates datepicker-here" aria-describedby="apps_to_fo_inspection_notice_telegram_date_help_block_${appsToFoId}_1" placeholder="Дата" type="text" size="10" required>
                                            <small id="apps_to_fo_inspection_notice_telegram_date_help_block_${appsToFoId}_1" class="form-text">
                                                Дата телеграммы
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                        <div class="form-group col-md-3">
                                            <input id = "apps_to_fo_inspection_notice_telegram_number_${appsToFoId}_1" class="apps_to_fo_inspection_notice_telegram_number_${appsToFoId} apps_to_fo_inspection_notice_telegram_numbers" aria-describedby="apps_to_fo_inspection_notice_telegram_number_help_block_${appsToFoId}_1" placeholder="№ телеграммы" type="text" size="8" required>
                                            <small id="apps_to_fo_inspection_notice_telegram_number_help_block_${appsToFoId}_1" class="form-text">
                                                № телеграммы
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                        <div class="form-group col-md-3">
                                            <input id = "apps_to_fo_inspection_notice_telegram_date_of_inspection_${appsToFoId}_1" class = "apps_to_fo_inspection_notice_telegram_date_of_inspection_${appsToFoId} apps_to_fo_inspection_notice_telegram_date_of_inspections datepicker-here" aria-describedby="apps_to_fo_inspection_notice_telegram_date_of_inspection_help_block_${appsToFoId}_1" placeholder="Дата" type="text" size="10" required>
                                            <small id="apps_to_fo_inspection_notice_telegram_date_of_inspection_help_block_${appsToFoId}_1" class="form-text">
                                                Дата проведения осмотра
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <textarea id = "apps_to_fo_inspection_notice_telegram_place_of_inspection_${appsToFoId}_1" class="apps_to_fo_request_documents_${appsToFoId} apps_to_fo_request_documents" aria-describedby="apps_to_fo_inspection_notice_telegram_place_of_inspection_help_block_${appsToFoId}_1" placeholder="Адрес места осмотра ТС" type="text" size="8" required></textarea>
                                            <small id="apps_to_fo_inspection_notice_telegram_place_of_inspection_help_block_${appsToFoId}_1" class="form-text">
                                                Введите адрес места осмотра ТС
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <select id="apps_to_fo_inspection_notice_telegram_notice_of_delivery_type_${appsToFoId}_1" class="apps_to_fo_inspection_notice_telegram_notice_of_delivery_type_${appsToFoId} apps_to_fo_inspection_notice_telegram_notice_of_delivery_types custom-select col-md-12" required>
                                                <option value="">Факт получения телеграммы</option>
                                                <option>Телеграмма получена</option>
                                                <option>Телеграмма не получена</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-3">
                                            <input id = "apps_to_fo_inspection_notice_telegram_notice_of_delivery_date_${appsToFoId}_1" class = "apps_to_fo_inspection_notice_telegram_notice_of_delivery_date_${appsToFoId} apps_to_fo_inspection_notice_telegram_notice_of_delivery_dates datepicker-here" aria-describedby="apps_to_fo_inspection_notice_telegram_notice_of_delivery_date_help_block_${appsToFoId}_1" placeholder="Дата" type="text" size="10" required>
                                            <small id="apps_to_fo_inspection_notice_telegram_notice_of_delivery_date_help_block_${appsToFoId}_1" class="form-text">
                                                Дата уведомления о вручении
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                        <div class="form-group col-md-3">
                                            <input id = "apps_to_fo_inspection_notice_telegram_notice_of_delivery_number_${appsToFoId}_1" class="apps_to_fo_inspection_notice_telegram_notice_of_delivery_number_${appsToFoId} apps_to_fo_inspection_notice_telegram_notice_of_delivery_numbers" aria-describedby="apps_to_fo_inspection_notice_telegram_notice_of_delivery_number_help_block_${appsToFoId}_1" placeholder="№ уведомления" type="text" size="8" required>
                                            <small id="apps_to_fo_inspection_notice_telegram_notice_of_delivery_number_help_block_${appsToFoId}_1" class="form-text">
                                                № уведомления о вручении
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div id="apps_to_fo_inspection_notice_letter_${appsToFoId}_1" class="apps_to_fo_inspection_notice_letter_${appsToFoId} apps_to_fo_inspection_notice_letters" style="display:none">
                                    <div class="form-row">
                                        <div class="form-group col-md-3">
                                            <input id = "apps_to_fo_inspection_notice_letter_number_${appsToFoId}_1" class="apps_to_fo_inspection_notice_letter_number_${appsToFoId} apps_to_fo_inspection_notice_letter_numbers" aria-describedby="apps_to_fo_inspection_notice_letter_number_help_block_${appsToFoId}_1" placeholder="№ письма" type="text" size="8" required>
                                            <small id="apps_to_fo_inspection_notice_letter_number_help_block_${appsToFoId}_1" class="form-text">
                                                № письма
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                        <div class="form-group col-md-3">
                                            <input id = "apps_to_fo_inspection_notice_letter_date_${appsToFoId}_1" class = "apps_to_fo_inspection_notice_letter_date_${appsToFoId} apps_to_fo_inspection_notice_letter_dates datepicker-here" aria-describedby="apps_to_fo_inspection_notice_letter_date_help_block_${appsToFoId}_1" placeholder="Дата" type="text" size="10" required>
                                            <small id="apps_to_fo_inspection_notice_letter_date_help_block_${appsToFoId}_1" class="form-text">
                                                Дата Направления на осмотр
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                        <div class="form-group col-md-3">
                                            <input id = "apps_to_fo_inspection_notice_letter_direction_number_${appsToFoId}_1" class="apps_to_fo_inspection_notice_letter_direction_number_${appsToFoId} apps_to_fo_inspection_notice_letter_direction_numbers" aria-describedby="apps_to_fo_inspection_notice_letter_direction_number_help_block_${appsToFoId}_1" placeholder="№ Направления" type="text" size="8" required>
                                            <small id="apps_to_fo_inspection_notice_letter_direction_number_help_block_${appsToFoId}_1" class="form-text">
                                                № Направления на осмотр
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <input id = "apps_to_fo_inspection_notice_letter_organization_${appsToFoId}_1" class="apps_to_fo_inspection_notice_letter_organization_${appsToFoId} apps_to_fo_inspection_notice_letter_organizations li-quotes" aria-describedby="apps_to_fo_inspection_notice_letter_organization_help_block_${appsToFoId}_1" placeholder="Наименование организации" type="text" size="8" required>
                                            <small id="apps_to_fo_inspection_notice_letter_organization_help_block_${appsToFoId}_1" class="form-text">
                                                Наименование организации
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <select id="apps_to_fo_inspection_notice_letter_confirmation_of_delivery_type_${appsToFoId}_1" class="apps_to_fo_inspection_notice_letter_confirmation_of_delivery_type_${appsToFoId} apps_to_fo_inspection_notice_letter_confirmation_of_delivery_types custom-select col-md-12" required>
                                                <option value="">Подтверждение выдачи Направления</option>
                                                <option>Список внутренних почтовых отправлений</option>
                                                <option>Опись вложения</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-3">
                                            <input id = "apps_to_fo_inspection_notice_letter_confirmation_of_delivery_date_${appsToFoId}_1" class = "apps_to_fo_inspection_notice_letter_confirmation_of_delivery_date_${appsToFoId} apps_to_fo_inspection_notice_letter_confirmation_of_delivery_dates datepicker-here" aria-describedby="apps_to_fo_inspection_notice_letter_confirmation_of_delivery_date_help_block_${appsToFoId}_1" placeholder="Дата" type="text" size="10" required>
                                            <small id="apps_to_fo_inspection_notice_letter_confirmation_of_delivery_date_help_block_${appsToFoId}_1" class="form-text">
                                                Дата списка
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                        <div class="form-group col-md-3">
                                            <input id = "apps_to_fo_inspection_notice_letter_confirmation_of_delivery_number_${appsToFoId}_1" class="apps_to_fo_inspection_notice_letter_confirmation_of_delivery_number_${appsToFoId} apps_to_fo_inspection_notice_letter_confirmation_of_delivery_numbers" aria-describedby="apps_to_fo_inspection_notice_letter_confirmation_of_delivery_number_help_block_${appsToFoId}_1" placeholder="№ списка" type="text" size="8" required>
                                            <small id="apps_to_fo_inspection_notice_letter_confirmation_of_delivery_number_help_block_${appsToFoId}_1" class="form-text">
                                                № списка
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                        <div class="form-group col-md-3">
                                            <input id = "apps_to_fo_inspection_notice_letter_post_number_${appsToFoId}_1" class="apps_to_fo_inspection_notice_letter_post_number_${appsToFoId} apps_to_fo_inspection_notice_letter_post_numbers" aria-describedby="apps_to_fo_inspection_notice_letter_post_number_help_block_${appsToFoId}_1" placeholder="№ идентификатора" type="text" size="8" required>
                                            <small id="apps_to_fo_inspection_notice_letter_post_number_help_block_${appsToFoId}_1" class="form-text">
                                                № почтового идентификатора
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-3">
                                            <input id = "apps_to_fo_inspection_notice_letter_post_date1_${appsToFoId}_1" class = "apps_to_fo_inspection_notice_letter_post_date1_${appsToFoId} apps_to_fo_inspection_notice_letter_post_date1 datepicker-here" aria-describedby="apps_to_fo_inspection_notice_letter_post_date1_help_block_${appsToFoId}_1" placeholder="Дата" type="text" size="10" required>
                                            <small id="apps_to_fo_inspection_notice_letter_post_date1_help_block_${appsToFoId}_1" class="form-text">
                                                Дата передачи в отделение связи
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                        <div class="form-group col-md-3">
                                            <input id = "apps_to_fo_inspection_notice_letter_post_date2_${appsToFoId}_1" class = "apps_to_fo_inspection_notice_letter_post_date2_${appsToFoId} apps_to_fo_inspection_notice_letter_post_date2 datepicker-here" aria-describedby="apps_to_fo_inspection_notice_letter_post_date2_help_block_${appsToFoId}_1" placeholder="Дата" type="text" size="10" required>
                                            <small id="apps_to_fo_inspection_notice_letter_post_date2_help_block_${appsToFoId}_1" class="form-text">
                                                Дата доставки в место вручения
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                        <div class="form-group col-md-3">
                                            <input id = "apps_to_fo_inspection_notice_letter_post_date3_${appsToFoId}_1" class = "apps_to_fo_inspection_notice_letter_post_date3_${appsToFoId} apps_to_fo_inspection_notice_letter_post_date3 datepicker-here" aria-describedby="apps_to_fo_inspection_notice_letter_post_date3_help_block_${appsToFoId}_1" placeholder="Дата" type="text" size="10" required>
                                            <small id="apps_to_fo_inspection_notice_letter_post_date3_help_block_${appsToFoId}_1" class="form-text">
                                                Дата вручения адресату
                                                <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END apps-to-fo-inspection-notice -->
                </div>
                <!-- END apps-to-fo-additional-circumstances-add-infos -->
            </div>
            <!-- END apps-to-fo-additional-circumstances -->
        </div>
        <!-- END apps_to_fo_add_info_${appsToFoId} -->
    </div>
    <!-- END apps_to_fo_${appsToFoId} -->
    `
    $(`.apps-to-fo`).append(str);
    $(`#apps_to_fo_${appsToFoId} .datepicker-here`).datepicker()

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
    
    addPopover('apps_to_fo_inspection_notice_telegram_dates')

}

function removeAppToFo() {
    $(`#apps_to_fo_${appsToFoId}`).remove();
    if ($(`#apps_to_fo_info_btn_${appsToFoId}`).find(".toggle").hasClass("rotate")) {
      $(`#apps_to_fo_info_btn_${appsToFoId}`).find(".toggle").removeClass("rotate");
    }
    // validationCheckUpdate('apps-to-fo')
    // validationCheck('apps-to-fo')
    appsToFoId--
}

//Добавляет информацию о наличии дополнительной информации
$(document).on("change", ".apps_to_fo_additional_circumstances", function (event) {
	if ($(this).find(':selected').text() == "Есть") {
        $(this).parent().parent().parent().find('.apps-to-fo-additional-circumstances-add-infos').show('fast')
        $(this).parent().parent().parent().find('.apps-to-fo-additional-circumstances-add-infos').find('input[type=text]').addClass('form-control')
        $(this).parent().parent().parent().find('.apps-to-fo-additional-circumstances-add-infos').find('select').addClass('form-control')
        $(this).parent().parent().parent().find('.apps-to-fo-additional-circumstances-add-infos').find('textarea').addClass('form-control')
	} else {
        $(this).parent().parent().parent().find('.apps-to-fo-additional-circumstances-add-infos').hide('fast')
        setTimeout(() => {
            $(this).parent().parent().parent().find('.apps-to-fo-additional-circumstances-add-infos').find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().parent().find('.apps-to-fo-additional-circumstances-add-infos').find('select').removeClass('form-control')
            $(this).parent().parent().parent().find('.apps-to-fo-additional-circumstances-add-infos').find('textarea').removeClass('form-control')
        }, 200)
	}
    // validationCheckUpdate('apps-to-fo')
    // validationCheck('apps-to-fo')
});

//Добавляет способ обращения в ФО или тип претензии
$(document).on("change", ".apps_to_fo_types", function (event) {
	if ($(this).find(':selected').text() == "Заявление о страховом случае") {
        $(this).parent().next().next().hide('fast') // Скрыть тип претензии (несогласие с размером или отказом)

        $(this).parent().next().find('select').addClass('form-control')
        setTimeout(() => {
            $(this).parent().next().show('fast') // Показать процедуру обращения (ПВУ / в ФО виновника)
            $(this).parent().next().next().find('select').removeClass('form-control')
        }, 200)
        //Удаляем способ обращения, в случае его наличия
        if ($(this).parent().parent().find('.apps_to_fo_methods option:contains("В электронной форме по стандартной форме")').length) {
            $(this).parent().parent().find('.apps_to_fo_methods option:last').remove()
        }
	} else if ($(this).find(':selected').text() == "Претензия") {
        $(this).parent().next().hide('fast') // Скрыть процедуру обращения (ПВУ / в ФО виновника)

        $(this).parent().next().next().find('select').addClass('form-control')
        setTimeout(() => {
            $(this).parent().next().next().show('fast') // Показать тип претензии (несогласие с размером или отказом)
            $(this).parent().next().find('select').removeClass('form-control')
        }, 200)
        //Добавляем способ обращения, в случае его отсутствия
        if (!$(this).parent().parent().find('.apps_to_fo_methods option:contains("В электронной форме по стандартной форме")').length) {
            $(this).parent().parent().find('.apps_to_fo_methods').append('<option>В электронной форме по стандартной форме</option>')
        }
	} else {
        $(this).parent().next().hide('fast') // Скрыть процедуру обращения (ПВУ / в ФО виновника)
        $(this).parent().next().next().hide('fast') // Скрыть тип претензии (несогласие с размером или отказом)

        setTimeout(() => {
            $(this).parent().next().find('select').removeClass('form-control')
            $(this).parent().next().next().find('select').removeClass('form-control')
        }, 200)
        //Удаляем способ обращения, в случае его наличия
        if ($(this).parent().parent().find('.apps_to_fo_methods option:contains("В электронной форме по стандартной форме")').length) {
            $(this).parent().parent().find('.apps_to_fo_methods option:last').remove()
        }
    }
    // validationCheckUpdate('apps-to-fo')
    // validationCheck('apps-to-fo')
});

//Добавляет информацию о дополнительно заявленных требованиях
$(document).on("change", ".apps_to_fo_claims_contract_infos", function (event) {
	if ($(this).find(':selected').text() == "Дополнительные требования заявлены") {
        $(this).parent().parent().next().show('fast')
        $(this).parent().parent().next().find('.apps_to_fo_contract_types').addClass('form-control')
	} else {
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().find('.apps_to_fo_contract_types').removeClass('form-control')
            $(this).parent().parent().next().find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().next().find('select').removeClass('form-control')
        }, 200)
	}
});

//Добавляет текстовое описание для отказа по трасе
$(document).on("change", ".apps_to_fo_refusal_types", function (event) {
	if ($(this).find(':selected').text() == "Трасология") {
        $(this).parent().parent().next().show('fast')
        $(this).parent().parent().next().find('textarea').addClass('form-control')
        $(this).parent().parent().next().find('select').addClass('form-control')
	} else {
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().find('textarea').removeClass('form-control')
            $(this).parent().parent().next().find('select').removeClass('form-control')
        }, 200)
	}
});

//Добавляет информацию о способе уведомления о ходе рассмотрения заявления (если заявитель обращается с заявлением, а не с претензией)
$(document).on("change", ".apps_to_fo_types", function (event) {
	if ($(this).find(':selected').text() == "Заявление о страховом случае") {
        $(this).parent().parent().next().find('.apps-to-fo-agreement').show('fast')

        $(this).parent().parent().next().find('.apps-to-fo-agreement').find('input[type=text]').addClass('form-control')
        $(this).parent().parent().next().find('.apps-to-fo-agreement').find('select').addClass('form-control')
        $(this).parent().parent().next().find('.apps-to-fo-agreement').find('textarea').addClass('form-control')
	} else {
        $(this).parent().parent().next().find('.apps-to-fo-agreement').hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().find('.apps-to-fo-agreement').find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().next().find('.apps-to-fo-agreement').find('select').removeClass('form-control')
            $(this).parent().parent().next().find('.apps-to-fo-agreement').find('textarea').removeClass('form-control')
        }, 200)
	}
    // validationCheckUpdate('apps-to-fo')
    // validationCheck('apps-to-fo')
});

//Показать дополнительную информацию по заявлению / претензии
$(document).on("click", ".apps_to_fo_info_btns", function (event) {
    if (!($(this).find(".toggle").hasClass("rotate"))) {
        $(this).parent().parent().next().show('fast'); //Показывает .add_main_claims_info
        $(this).find(".toggle").addClass("rotate");
    } else {
        $(this).parent().parent().next().hide('fast'); //Скрывает .add_main_claims_info
        $(this).find(".toggle").removeClass("rotate");
    }
});

//Добавляет договор, по которому заявлены требования
function addAppsToFoContract(id) {
    appsToFoContractId++;
    var str = `
            <div id="apps_to_fo_claims_contract_${id}_${appsToFoContractId}" class="apps_to_fo_claims_contract_${id} apps_to_fo_claims_contracts">
                <hr>
                <div id="claims_contract_${id}_${appsToFoContractId}" class="form-row">
                    <div class="form-group col-md-5">
                        <select id="apps_to_fo_claims_contract_type_${id}_${appsToFoContractId}" class="apps_to_fo_claims_contract_type_${id} apps_to_fo_contract_types custom-select form-control col-md-12" required>
                            <option value="">Выберите тип договора</option>
                            <option>ОСАГО</option>
                            <option>КАСКО</option>
                            <option>ДСАГО</option>
                        </select>
                    </div>
                    <div class="form-group col-ms-1">
                        <button id="add_apps_to_fo_claims_info_btn_${id}_${appsToFoContractId}" class="add_apps_to_fo_claims_info_btn_${id} add_apps_to_fo_claims_info_btns btn btn-outline-warning add_info">
                            <i class="fa fa-chevron-down toggle"></i>
                        </button>
                    </div>
                    <div class="form-group col-ms-1">
                        <button id="apps_to_fo_claims_contract_btn_${id}_${appsToFoContractId}" class="apps_to_fo_claims_contract_btn_${id} apps_to_fo_claims_contract_btns btn btn-outline-danger" onclick="removeAppsToFoContract(${id}, ${appsToFoContractId})">×</button>
                    </div>
                </div>
                <div id="apps_to_fo_claims_${id}_${appsToFoContractId}" style="display:none">
                    <div id="apps_to_fo_claim_${id}_${appsToFoContractId}_1" class="apps_to_fo_claim_${id}_${appsToFoContractId} apps_to_fo_claim_${id} apps_to_fo_claims form-row ">
                        <div class="form-group col-md-5">
                            <select id="apps_to_fo_claim_type_${id}_${appsToFoContractId}_1" class="apps_to_fo_claim_type_${id}_${appsToFoContractId} apps_to_fo_claim_type_${id} apps_to_fo_claim_types custom-select form-control col-md-12" required>
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
                                <input id="apps_to_fo_claim_summ_${id}_${appsToFoContractId}_1" class = "apps_to_fo_claim_summ_${id}_${appsToFoContractId} apps_to_fo_claim_summ_1 apps_to_fo_claim_summs input-numeral form-control deactivation" aria-describedby="apps_to_fo_claim_summ_help_block_${id}_${appsToFoContractId}" placeholder="Сумма" type="text" size="10" required>
                                <div class="input-group-append">
                                    <span class="input-group-text">&#8381;</span>
                                </div>
                            </div>
                            <small id="apps_to_fo_claim_summ_help_block_${id}_${appsToFoContractId}" class="form-text">
                                <div class="form-inline">
                                    <input id="apps_to_fo_claim_summ_deactivate_${id}_${appsToFoContractId}" class="deactivator" type="checkbox">
                                    <label for="apps_to_fo_claim_summ_deactivate_${id}_${appsToFoContractId}" class="ml-2 form-check-label">Сведений не имеется</label>
                                </div>
                            </small>
                        </div>
                        <div class="form-group col-ms-1">
                            <button id="apps_to_fo_claim_btn_${id}_${appsToFoContractId}_1" class="apps_to_fo_claim_btn_${id}_${appsToFoContractId} apps_to_fo_claim_btn_1 apps_to_fo_claim_btns btn btn-outline-warning" onclick="addAppsToFoClaim(${id}, ${appsToFoContractId})">+</button>
                        </div>
                    </div>
                    <div id="add_apps_to_fo_claim_info_${id}_${appsToFoContractId}_1" class="add_apps_to_fo_claim_info_${id}_${appsToFoContractId} add_apps_to_fo_claim_info_1 add_apps_to_fo_claim_infos form-group " style="display:none">
                        <div class="form-group">
                            <h6>Период неустойки</h6>
                        </div>
                        <div class="form-group form-inline">
                            <label for="date_apps_to_fo_claim_from_${id}_${appsToFoContractId}_1">c</label>
                            <input id = "date_apps_to_fo_claim_from_${id}_${appsToFoContractId}_1" class = "date_apps_to_fo_claim_from_${id}_${appsToFoContractId} date_apps_to_fo_claim_from_${id} date_apps_to_fo_claim_froms ml-2 datepicker-here col-md-3" placeholder="Дата" type="text" size="10" required>
                            <label for="date_apps_to_fo_claim_to_${id}_${appsToFoContractId}_1" class="ml-2">по</label>
                            <input id = "date_apps_to_fo_claim_to_${id}_${appsToFoContractId}_1" class = "date_apps_to_fo_claim_to_${id}_${appsToFoContractId} date_apps_to_fo_claim_to_${id} date_apps_to_fo_claim_tos ml-2 datepicker-here col-md-3" placeholder="Дата" type="text" size="10" required>
                        </div>
                        <div class="form-group">
                            <input id="apps_to_fo_claim_without_period_${id}_${appsToFoContractId}_1" class="apps_to_fo_claim_without_period_${id}_${appsToFoContractId} apps_to_fo_claim_without_period_${id} apps_to_fo_claim_without_periods ml-2" type="checkbox" onclick="block_apps_to_fo_claim_date(${id}, ${appsToFoContractId}, 1)">
                            <label for="apps_to_fo_claim_without_period_${id}_${appsToFoContractId}_1" class="ml-2 form-check-label">Период не указан</label>
                            <input id="apps_to_fo_claim_pdf_${id}_${appsToFoContractId}_1" class="apps_to_fo_claim_pdf_${id}_${appsToFoContractId} apps_to_fo_claim_pdf_${id} apps_to_fo_claim_pdfs ml-2" type="checkbox">
                            <label for="apps_to_fo_claim_pdf_${id}_${appsToFoContractId}_1" class=" form-check-label">По день факта</label>
                        </div>
                    </div>
                    <div id="apps_to_fo_claim_ev_${id}_${appsToFoContractId}_1" class="apps_to_fo_claim_ev_${id}_${appsToFoContractId} apps_to_fo_claim_ev_1 apps_to_fo_claim_evs" style="display:none">
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <h6>Маршрут эвакуации</h6>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <select id="apps_to_fo_claim_ev_route_${id}_${appsToFoContractId}_1" class="apps_to_fo_claim_ev_route_${id}_${appsToFoContractId} apps_to_fo_claim_ev_route_1 apps_to_fo_claim_ev_routes custom-select deactivation col-md-12" aria-describedby="apps_to_fo_claim_ev_route_help_block_${id}_${appsToFoContractId}_1" required>
                                    <option value="">Выберите вариант</option>
                                    <option>ДТП - СТОА</option>
                                    <option>ДТП - Хранение</option>
                                    <option>Хранение - СТОА</option>
                                </select>
                                <small id="apps_to_fo_claim_ev_route_help_block_${id}_${appsToFoContractId}_1" class="form-text">
                                    <div class="form-inline">
                                        <input id="apps_to_fo_claim_ev_route_deactivate_${id}_${appsToFoContractId}_1" class="deactivator" type="checkbox">
                                        <label for="apps_to_fo_claim_ev_route_deactivate_${id}_${appsToFoContractId}_1" class="ml-2 form-check-label">Сведений не имеется</label>
                                    </div>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
  
    $(`#apps_to_fo_claims_contract_${id}`).append(str);
    $(`#date_apps_to_fo_claim_from_${id}_${appsToFoContractId}_1`).datepicker();
    $(`#date_apps_to_fo_claim_to_${id}_${appsToFoContractId}_1`).datepicker();
  
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
  });

  //Вызывает функцию, изменяющую общую картинку валидации
//   validationCheck('apps-to-fo')
//   validationCheckUpdate('apps-to-fo')

}

//Удаляет договор, по которому заявлены требования
function removeAppsToFoContract(id, appsToFoContractId) {
	$(`#apps_to_fo_claims_contract_${id}_${appsToFoContractId}`).remove();
  if ($(`#add_apps_to_fo_claims_info_btn_${id}_${appsToFoContractId}`).find(".toggle").hasClass("rotate")) {
    $(`#add_apps_to_fo_claims_info_btn_${id}_${appsToFoContractId}`).find(".toggle").removeClass("rotate");
  }
//   validationCheck('apps-to-fo')
//   validationCheckUpdate('apps-to-fo')
}

//Показать требования, заявленные в рамках договора
$(document).on("click", ".add_apps_to_fo_claims_info_btns", function (event) {
	if (!($(this).find(".toggle").hasClass("rotate"))) {
    $(this).parent().parent().next().show('fast'); //Показывает .add_main_claims_info
    $(this).find(".toggle").addClass("rotate");

		if ($(this).parent().parent().next().children().first().find(':selected').text() == "Неустойка"){
			$(this).parent().parent().next().children().first().next().show('fast'); //Показывает .add_main_claims_info
		}
  } else {
    $(this).parent().parent().next().hide('fast'); //Скрывает .add_main_claims_info
    $(this).find(".toggle").removeClass("rotate");
  }
});

//Показать требования, заявленные в рамках договора
$(document).on("change", ".apps_to_fo_contract_types", function (event) {
	if (!($(this).parent().next().find(".toggle").hasClass("rotate"))) {
        $(this).parent().next().find(".toggle").addClass("rotate");
    } else {
        $(this).parent().next().find(".toggle").removeClass("rotate");
    }
    if ($(this).find(':selected').text() != "Выберите тип договора") {
        $(this).parent().parent().next().show('fast'); //Показывает .add_main_claims_info
        $(this).parent().next().find(".toggle").addClass("rotate");
        $(this).parent().parent().next().find('.apps_to_fo_claim_types').addClass('form-control')
        $(this).parent().parent().next().find('.apps_to_fo_claim_summs').addClass('form-control')

		if ($(this).parent().parent().next().children().first().find(':selected').text() == "Неустойка"){
			$(this).parent().parent().next().children().first().next().show('fast'); //Показывает .add_main_claims_info
		} else if ($(this).parent().parent().next().children().first().find(':selected').text() == "Эвакуатор") {
            $(this).parent().parent().next().children().first().next().next().show('fast'); //Показывает .add_main_claims_info
        }
    } else {
        $(this).parent().parent().next().hide('fast'); //Скрывает .add_main_claims_info
        $(this).parent().next().find(".toggle").removeClass("rotate");
        $(this).parent().parent().next().find('.apps_to_fo_claim_types').removeClass('form-control')
        $(this).parent().parent().next().find('.apps_to_fo_claim_summs').removeClass('form-control')
    }
});

//Добавляет требования, заявленные в рамках договора
function addAppsToFoClaim(id, conrtactId) {
	appsToFoClaimsContractId++;
  var str = `
  <div id="apps_to_fo_claim_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="apps_to_fo_claim_${id}_${conrtactId} apps_to_fo_claim_${id} apps_to_fo_claims form-row ">
    <div class="form-group col-md-5">
        <select id="apps_to_fo_claim_type_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="apps_to_fo_claim_type_${id}_${conrtactId} apps_to_fo_claim_type_${id} apps_to_fo_claim_types custom-select form-control col-md-12" required>
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
            <input id="apps_to_fo_claim_summ_${id}_${conrtactId}_${appsToFoClaimsContractId}" class = "apps_to_fo_claim_summ_${id}_${conrtactId} apps_to_fo_claim_summ_${id} apps_to_fo_claim_summs input-numeral form-control deactivation" aria-describedby="apps_to_fo_claim_summ_help_block_${id}_${conrtactId}_${appsToFoClaimsContractId}" placeholder="Сумма" type="text" size="10" required>
            <div class="input-group-append">
                <span class="input-group-text">&#8381;</span>
            </div>
        </div>
        <small id="apps_to_fo_claim_summ_help_block_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="form-text">
            <div class="form-inline">
                <input id="apps_to_fo_claim_summ_deactivate_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="deactivator" type="checkbox">
                <label for="apps_to_fo_claim_summ_deactivate_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="ml-2 form-check-label">Сведений не имеется</label>
            </div>
        </small>
    </div>
    <div class="form-group col-ms-1">
        <button id="apps_to_fo_claim_btn_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="apps_to_fo_claim_btn_${id}_${conrtactId} apps_to_fo_claim_btn_${id} apps_to_fo_claim_btns btn btn-outline-danger" onclick="removeAppsToFoClaim(${id}, ${conrtactId}, ${appsToFoClaimsContractId})">×</button>
    </div>
</div>
<div id="add_apps_to_fo_claim_info_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="add_apps_to_fo_claim_info_${id}_${conrtactId} add_apps_to_fo_claim_info_${id} add_apps_to_fo_claim_infos form-group " style="display:none">
    <div class="form-group">
        <h6>Период неустойки</h6>
    </div>
    <div class="form-group form-inline">
        <label for="date_apps_to_fo_claim_from_${id}_${conrtactId}_${appsToFoClaimsContractId}">c</label>
        <input id = "date_apps_to_fo_claim_from_${id}_${conrtactId}_${appsToFoClaimsContractId}" class = "date_apps_to_fo_claim_from_${id}_${conrtactId} date_apps_to_fo_claim_from_${id} date_apps_to_fo_claim_froms ml-2 datepicker-here col-md-3" placeholder="Дата" type="text" size="10" required>
        <label for="date_apps_to_fo_claim_to_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="ml-2">по</label>
        <input id = "date_apps_to_fo_claim_to_${id}_${conrtactId}_${appsToFoClaimsContractId}" class = "date_apps_to_fo_claim_to_${id}_${conrtactId} date_apps_to_fo_claim_to_${id} date_apps_to_fo_claim_tos ml-2 datepicker-here col-md-3" placeholder="Дата" type="text" size="10" required>
    </div>
    <div class="form-group">
        <input id="apps_to_fo_claim_without_period_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="apps_to_fo_claim_without_period_${id}_${conrtactId} apps_to_fo_claim_without_period_${id} apps_to_fo_claim_without_periods ml-2" type="checkbox" onclick="block_apps_to_fo_claim_date(${id}, ${conrtactId}, ${appsToFoClaimsContractId})">
        <label for="apps_to_fo_claim_without_period_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="ml-2 form-check-label">Период не указан</label>
        <input id="apps_to_fo_claim_pdf_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="apps_to_fo_claim_pdf_${id}_${conrtactId} apps_to_fo_claim_pdf_${id} apps_to_fo_claim_pdfs ml-2" type="checkbox">
        <label for="apps_to_fo_claim_pdf_${id}_${conrtactId}_${appsToFoClaimsContractId}" class=" form-check-label">По день факта</label>
    </div>
</div>
<div id="apps_to_fo_claim_ev_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="apps_to_fo_claim_ev_${id}_${conrtactId} apps_to_fo_claim_ev_${id} apps_to_fo_claim_evs" style="display:none">
    <div class="form-row">
        <div class="form-group col-md-3">
            <h6>Маршрут эвакуации</h6>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-3">
            <select id="apps_to_fo_claim_ev_route_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="apps_to_fo_claim_ev_route_${id}_${conrtactId} apps_to_fo_claim_ev_route_${id} apps_to_fo_claim_ev_routes custom-select deactivation col-md-12" aria-describedby="apps_to_fo_claim_ev_route_help_block_${id}_${conrtactId}_${appsToFoClaimsContractId}" required>
                <option value="">Выберите вариант</option>
                <option>ДТП - СТОА</option>
                <option>ДТП - Хранение</option>
                <option>Хранение - СТОА</option>
            </select>
            <small id="apps_to_fo_claim_ev_route_help_block_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="form-text">
                <div class="form-inline">
                    <input id="apps_to_fo_claim_ev_route_deactivate_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="deactivator" type="checkbox">
                    <label for="apps_to_fo_claim_ev_route_deactivate_${id}_${conrtactId}_${appsToFoClaimsContractId}" class="ml-2 form-check-label">Сведений не имеется</label>
                </div>
            </small>
        </div>
    </div>
</div>`

	$(`#apps_to_fo_claims_${id}_${conrtactId}`).append(str);
	$(`#date_apps_to_fo_claim_from_${id}_${conrtactId}_${appsToFoClaimsContractId}`).datepicker();
	$(`#date_apps_to_fo_claim_to_${id}_${conrtactId}_${appsToFoClaimsContractId}`).datepicker();

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

  //Вызывает функцию, изменяющую общую картинку валидации
//   validationCheck('apps-to-fo')
//   validationCheckUpdate('apps-to-fo')

}

//Удаляет требования, заявленные в рамках договора
function removeAppsToFoClaim(id, claimContractId, appsToFoClaimsContractId) {
    $(`#apps_to_fo_claim_${id}_${claimContractId}_${appsToFoClaimsContractId}`).remove();
    $(`#add_apps_to_fo_claim_info_${id}_${claimContractId}_${appsToFoClaimsContractId}`).remove();
    $(`#apps_to_fo_claim_ev_${id}_${claimContractId}_${appsToFoClaimsContractId}`).remove();
    // validationCheckUpdate('apps-to-fo')
}

//Добавляет период неустойки
$(document).on("change", ".apps_to_fo_claim_types", function (event) {
	if ($(this).find(':selected').text() == "Неустойка") {
		$(this).parent().parent().next().show('fast');
        $(this).parent().parent().next().find('.date_apps_to_fo_claim_froms').addClass('form-control')
        $(this).parent().parent().next().find('.date_apps_to_fo_claim_tos').addClass('form-control')
	} else {
        $(this).parent().parent().next().hide('fast');
        $(this).parent().parent().next().find('.date_apps_to_fo_claim_froms').removeClass('form-control')
        $(this).parent().parent().next().find('.date_apps_to_fo_claim_tos').removeClass('form-control')
	}
});

//Добавляет маршрут эвакуации
$(document).on("change", ".apps_to_fo_claim_types", function (event) {
	if ($(this).find(':selected').text() == "Эвакуатор") {
		$(this).parent().parent().next().next().show('fast');
        $(this).parent().parent().next().next().find('.apps_to_fo_claim_ev_routes').addClass('form-control')
	} else {
        $(this).parent().parent().next().next().hide('fast');
        $(this).parent().parent().next().next().find('.apps_to_fo_claim_ev_routes').removeClass('form-control')
	}
});

//Добавляет маршрут эвакуации ТС
$(document).on("change", ".apps_to_fo_claim_types", function (event) {
	if ($(this).find(':selected').text() == "Эвакуатор") {
		$(this).parent().parent().next().next().show('fast');
        $(this).parent().parent().next().next().find('.apps_to_fo_claim_ev_routes').addClass('form-control')
	} else {
        $(this).parent().parent().next().next().hide('fast');
        $(this).parent().parent().next().next().find('.apps_to_fo_claim_ev_routes').removeClass('form-control')
	}
});

//Блокировать даты судебной неустойки при проставленной галочке "Период не указан"
function block_apps_to_fo_claim_date(id, claimContractId, appsToFoClaimsContractId){
  if ($(`#apps_to_fo_claim_without_period_${id}_${claimContractId}_${appsToFoClaimsContractId}`).prop('checked')) {
    $(`#date_apps_to_fo_claim_from_${id}_${claimContractId}_${appsToFoClaimsContractId}`).prop('disabled', true);
    $(`#date_apps_to_fo_claim_to_${id}_${claimContractId}_${appsToFoClaimsContractId}`).prop('disabled', true);
    $(`#apps_to_fo_claim_pdf_${id}_${claimContractId}_${appsToFoClaimsContractId}`).prop('disabled', true);
    $(`#apps_to_fo_claim_pdf_${id}_${claimContractId}_${appsToFoClaimsContractId}`).prop('checked', false);

    $(`#date_apps_to_fo_claim_from_${id}_${claimContractId}_${appsToFoClaimsContractId}`).val('');
    $(`#date_apps_to_fo_claim_to_${id}_${claimContractId}_${appsToFoClaimsContractId}`).val('');
  } else {
    $(`#date_apps_to_fo_claim_from_${id}_${claimContractId}_${appsToFoClaimsContractId}`).prop('disabled', false);
    $(`#date_apps_to_fo_claim_to_${id}_${claimContractId}_${appsToFoClaimsContractId}`).prop('disabled', false);
    $(`#apps_to_fo_claim_pdf_${id}_${claimContractId}_${appsToFoClaimsContractId}`).prop('disabled', false);
  }
    // validationCheckUpdate('apps-to-fo')
}

//Блокирует дату "по" в периоде взыскания неустойки ПДФ
$(document).on("click", ".apps_to_fo_claim_pdfs", function (event) {
  if ($(this).prop('checked')) {
    $(this).parent().prev().find('.date_apps_to_fo_claim_tos').prop('disabled', true);
    $(this).parent().prev().find('.date_apps_to_fo_claim_tos').val('');
  } else {
    $(this).parent().prev().find('.date_apps_to_fo_claim_tos').prop('disabled', false);
  }
    // validationCheckUpdate('apps-to-fo')
})

function addExpertizeApp(appsToFoId) {
    appsToFoExpertiseApp++
    var str =`
    <div id="apps_to_fo_expertise_app_${appsToFoId}_${appsToFoExpertiseApp}" class="apps_to_fo_expertise_apps_${appsToFoId}">
        <div class="form-row">
            <div class="form-group col-md-3">
                <input id = "apps_to_fo_expertise_app_date_${appsToFoId}_${appsToFoExpertiseApp}" class = "apps_to_fo_expertise_app_date_${appsToFoId} apps_to_fo_expertise_app_dates datepicker-here form-control" placeholder="Дата" type="text" size="10" required>
            </div>
            <div class="form-group col-md-3">
                <input id = "apps_to_fo_expertise_app_number_${appsToFoId}_${appsToFoExpertiseApp}" class="apps_to_fo_expertise_app_number_${appsToFoId} apps_to_fo_expertise_app_numbers form-control" placeholder="№ заключения" type="text" size="8" required>
            </div>
            <div class="form-group col-md-4">
                <input id = "apps_to_fo_expertise_app_organization_${appsToFoId}_${appsToFoExpertiseApp}" class="apps_to_fo_expertise_app_organization_${appsToFoId} apps_to_fo_expertise_app_organizations form-control li-quotes" placeholder="Наименование экспертной организации" type="text" size="8" required>
            </div>
            <div class="form-group col-ms-1">
                <button id="add_apps_to_fo_expertise_app_info_btn_${appsToFoId}_${appsToFoExpertiseApp}" class="add_apps_to_fo_expertise_app_info_btn_${appsToFoId} add_apps_to_fo_expertise_app_info_btns btn btn-outline-warning add_info">
                    <i class="fa fa-chevron-down toggle"></i>
                </button>
            </div>
            <div class="form-group col-ms-1">
                <button id="apps_to_fo_expertise_app_btn_${appsToFoId}_${appsToFoExpertiseApp}" class="apps_to_fo_expertise_app_btn_${appsToFoId} apps_to_fo_expertise_app_btns btn btn-outline-danger" onclick="removeExpertizeApp(${appsToFoId}, ${appsToFoExpertiseApp})">×</button>
            </div>
        </div>
        <div class="apps_to_fo_expertise_app_add_infos" style="display:none">
            <div class="form-row">
                <div class="form-group col-md-3">
                    <div class="input-group">
                        <input id="apps_to_fo_expertise_app_summ_without_${appsToFoId}_${appsToFoExpertiseApp}" class = "apps_to_fo_expertise_app_summ_without_${appsToFoId} apps_to_fo_expertise_app_summ_withouts input-numeral form-control deactivation" aria-describedby="apps_to_fo_expertise_app_summ_without_help_block_${appsToFoId}_${appsToFoExpertiseApp}" placeholder="Сумма" type="text" size="10" required>
                        <div class="input-group-append">
                            <span class="input-group-text">&#8381;</span>
                        </div>
                    </div>
                    <small id="apps_to_fo_expertise_app_summ_without_help_block_${appsToFoId}_${appsToFoExpertiseApp}" class="form-text">
                        <div class="form-inline">
                            <input id="apps_to_fo_expertise_app_summ_without_deactivate_${appsToFoId}_${appsToFoExpertiseApp}" class="deactivator" type="checkbox">
                            <label for="apps_to_fo_expertise_app_summ_without_deactivate_${appsToFoId}_${appsToFoExpertiseApp}" class="ml-2 form-check-label">Без износа</label>
                        </div>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <div class="input-group">
                        <input id="apps_to_fo_expertise_app_summ_with_${appsToFoId}_${appsToFoExpertiseApp}" class = "apps_to_fo_expertise_app_summ_with_${appsToFoId} apps_to_fo_expertise_app_summ_withs input-numeral form-control deactivation" aria-describedby="apps_to_fo_expertise_app_summ_with_help_block_${appsToFoId}_${appsToFoExpertiseApp}" placeholder="Сумма" type="text" size="10" required>
                        <div class="input-group-append">
                            <span class="input-group-text">&#8381;</span>
                        </div>
                    </div>
                    <small id="apps_to_fo_expertise_app_summ_with_help_block_${appsToFoId}_${appsToFoExpertiseApp}" class="form-text">
                        <div class="form-inline">
                            <input id="apps_to_fo_expertise_app_summ_with_deactivate_${appsToFoId}_${appsToFoExpertiseApp}" class="deactivator" type="checkbox">
                            <label for="apps_to_fo_expertise_app_summ_with_deactivate_${appsToFoId}_${appsToFoExpertiseApp}" class="ml-2 form-check-label">С износом</label>
                        </div>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <div class="input-group">
                        <input id="apps_to_fo_expertise_app_summ_market_${appsToFoId}_${appsToFoExpertiseApp}" class = "apps_to_fo_expertise_app_summ_market_${appsToFoId} apps_to_fo_expertise_app_summ_markets input-numeral form-control deactivation" aria-describedby="apps_to_fo_expertise_app_summ_market_help_block_${appsToFoId}_${appsToFoExpertiseApp}" placeholder="Сумма" type="text" size="10" required>
                        <div class="input-group-append">
                            <span class="input-group-text">&#8381;</span>
                        </div>
                    </div>
                    <small id="apps_to_fo_expertise_app_summ_market_help_block_${appsToFoId}_${appsToFoExpertiseApp}" class="form-text">
                        <div class="form-inline">
                            <input id="apps_to_fo_expertise_app_summ_market_deactivate_${appsToFoId}_${appsToFoExpertiseApp}" class="deactivator" type="checkbox">
                            <label for="apps_to_fo_expertise_app_summ_market_deactivate_${appsToFoId}_${appsToFoExpertiseApp}" class="ml-2 form-check-label">Рыночная стоимость</label>
                        </div>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <div class="input-group">
                        <input id="apps_to_fo_expertise_app_summ_leftovers_${appsToFoId}_${appsToFoExpertiseApp}" class = "apps_to_fo_expertise_app_summ_leftovers_${appsToFoId} apps_to_fo_expertise_app_summ_leftovers input-numeral form-control deactivation" aria-describedby="apps_to_fo_expertise_app_summ_leftovers_help_block_${appsToFoId}_${appsToFoExpertiseApp}" placeholder="Сумма" type="text" size="10" required>
                        <div class="input-group-append">
                            <span class="input-group-text">&#8381;</span>
                        </div>
                    </div>
                    <small id="apps_to_fo_expertise_app_summ_leftovers_help_block_${appsToFoId}_${appsToFoExpertiseApp}" class="form-text">
                        <div class="form-inline">
                            <input id="apps_to_fo_expertise_app_summ_leftovers_deactivate_${appsToFoId}_${appsToFoExpertiseApp}" class="deactivator" type="checkbox">
                            <label for="apps_to_fo_expertise_app_summ_leftovers_deactivate_${appsToFoId}_${appsToFoExpertiseApp}" class="ml-2 form-check-label">Годные остатки</label>
                        </div>
                    </small>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <div class="input-group">
                        <input id="apps_to_fo_expertise_app_summ_uts_${appsToFoId}_${appsToFoExpertiseApp}" class = "apps_to_fo_expertise_app_summ_uts_${appsToFoId} apps_to_fo_expertise_app_summ_uts input-numeral form-control deactivation" aria-describedby="apps_to_fo_expertise_app_summ_uts_help_block_${appsToFoId}_${appsToFoExpertiseApp}" placeholder="Сумма" type="text" size="10" required>
                        <div class="input-group-append">
                            <span class="input-group-text">&#8381;</span>
                        </div>
                    </div>
                    <small id="apps_to_fo_expertise_app_summ_uts_help_block_${appsToFoId}_${appsToFoExpertiseApp}" class="form-text">
                        <div class="form-inline">
                            <input id="apps_to_fo_expertise_app_summ_uts_deactivate_${appsToFoId}_${appsToFoExpertiseApp}" class="deactivator" type="checkbox">
                            <label for="apps_to_fo_expertise_app_summ_uts_deactivate_${appsToFoId}_${appsToFoExpertiseApp}" class="ml-2 form-check-label">УТС</label>
                        </div>
                    </small>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <textarea id = "apps_to_fo_expertise_app_trasa_${appsToFoId}_${appsToFoExpertiseApp}" class="apps_to_fo_expertise_app_trasa_${appsToFoId} apps_to_fo_expertise_app_trasas form-control deactivation" aria-describedby="apps_to_fo_expertise_app_trasa_help_block_${appsToFoId}_${appsToFoExpertiseApp}" placeholder="Выводы трасологической экспертизы" type="text" size="8" required></textarea>
                    <small id="apps_to_fo_expertise_app_trasa_help_block_${appsToFoId}_${appsToFoExpertiseApp}" class="form-text">
                        <div class="form-inline">
                            <input id="apps_to_fo_expertise_app_trasa_deactivate_${appsToFoId}_${appsToFoExpertiseApp}" class="deactivator" type="checkbox">
                            <label for="apps_to_fo_expertise_app_trasa_deactivate_${appsToFoId}_${appsToFoExpertiseApp}" class="ml-2 form-check-label">Трасология</label>
                        </div>
                    </small>
                </div>
            </div>
        </div>
    </div>
    `

    $(`#apps_to_fo_expertises_app_${appsToFoId}`).append(str);
	$(`#apps_to_fo_expertise_app_${appsToFoId}_${appsToFoExpertiseApp} .datepicker-here`).datepicker()

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

  //Вызывает функцию, изменяющую общую картинку валидации
//   validationCheck('apps-to-fo')
//   validationCheckUpdate('apps-to-fo')

}

function removeExpertizeApp(appsToFoId, appsToFoExpertiseApp) {
    $(`#apps_to_fo_expertise_app_${appsToFoId}_${appsToFoExpertiseApp}`).remove();
    // validationCheckUpdate('apps-to-fo')
}

//Добавляет информацию о проведении экспертизы Заявителя
$(document).on("change", ".apps_to_fo_expertise_app_infos", function (event) {
	if ($(this).find(':selected').text() == "Сведения имеются") {
        $(this).parent().parent().next().show('fast')

        $(this).parent().parent().next().find('input[type=text]').addClass('form-control')
        $(this).parent().parent().next().find('textarea').addClass('form-control')
	} else {
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().next().find('textarea').removeClass('form-control')
        }, 200)
	}
    // validationCheckUpdate('apps-to-fo')
    // validationCheck('apps-to-fo')
});

//Показать дополнительную информацию о проведении экспертизы Заявителя
$(document).on("click", ".add_apps_to_fo_expertise_app_info_btns", function (event) {
    if (!($(this).find(".toggle").hasClass("rotate"))) {
        $(this).parent().parent().next().show('fast'); //Показывает .add_main_claims_info
        $(this).find(".toggle").addClass("rotate");
    } else {
        $(this).parent().parent().next().hide('fast'); //Скрывает .add_main_claims_info
        $(this).find(".toggle").removeClass("rotate");
    }
});

//Добавляет информацию о способе уведомления о ходе рассмотрения обращения
$(document).on("change", ".apps_to_fo_agreement_phone_infos", function (event) {
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
    // validationCheckUpdate('apps-to-fo')
    // validationCheck('apps-to-fo')
});

//Добавляет поле для ввода номера телефона
$(document).on("change", ".apps_to_fo_agreement_phones", function (event) {
	if ($(this).find(':selected').text() == "Дано") {
        $(this).parent().next().show('fast')
        $(this).parent().next().find('input[type=text]').addClass('form-control')
	} else {
        $(this).parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().next().find('input[type=text]').removeClass('form-control')
        }, 200)
	}
    // validationCheckUpdate('apps-to-fo')
    // validationCheck('apps-to-fo')
});

//Добавляет информацию о запросе документов
$(document).on("change", ".apps_to_fo_request_infos", function (event) {
	if ($(this).find(':selected').text() == "Сведения имеются") {
        $(this).parent().parent().next().show('fast')

        $(this).parent().parent().next().find('input[type=text]').addClass('form-control')
        $(this).parent().parent().next().find('textarea').addClass('form-control')
	} else {
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().next().find('textarea').removeClass('form-control')
        }, 200)
	}
    // validationCheckUpdate('apps-to-fo')
    // validationCheck('apps-to-fo')
});

//Добавляет уведомление о вызове на осмотр
function addInspectionNotice(appsToFoId) {
    inspectionNotice++
    var str = `
    <div id="apps_to_fo_inspection_notice_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspections_notice_${appsToFoId}">
        <div class="form-row">
            <div class="form-group col-md-6">
                <select id="apps_to_fo_inspection_notice_type_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspection_notice_type_${appsToFoId} apps_to_fo_inspection_notice_types custom-select form-control col-md-12" required>
                    <option value="">Способ уведомления</option>
                    <option>Телеграмма</option>
                    <option>Письмо</option>
                </select>
            </div>
            <div class="form-group col-ms-1">
                <button id="apps_to_fo_inspection_notice_info_btn_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspection_notice_info_btn_${appsToFoId} apps_to_fo_inspection_notice_info_btns btn btn-outline-warning add_info">
                    <i class="fa fa-chevron-down toggle"></i>
                </button>
            </div>
            <div class="form-group col-ms-1">
                <button id="apps_to_fo_inspection_notice_btn_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspection_notice_btn_${appsToFoId} apps_to_fo_inspection_notice_btns btn btn-outline-danger" onclick="removeInspectionNotice(${appsToFoId}, ${inspectionNotice})">×</button>
            </div>
        </div>
        <div id="apps_to_fo_inspection_notice_telegram_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspection_notice_telegram_${appsToFoId} apps_to_fo_inspection_notice_telegrams" style="display:none">
            <div class="form-row">
                <div class="form-group col-md-3">
                    <input id = "apps_to_fo_inspection_notice_telegram_date_${appsToFoId}_${inspectionNotice}" class = "apps_to_fo_inspection_notice_telegram_date_${appsToFoId} apps_to_fo_inspection_notice_telegram_dates datepicker-here form-control" aria-describedby="apps_to_fo_inspection_notice_telegram_date_help_block_${appsToFoId}_${inspectionNotice}" placeholder="Дата" type="text" size="10" required>
                    <small id="apps_to_fo_inspection_notice_telegram_date_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        Дата телеграммы
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <input id = "apps_to_fo_inspection_notice_telegram_number_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspection_notice_telegram_number_${appsToFoId} apps_to_fo_inspection_notice_telegram_numbers form-control" aria-describedby="apps_to_fo_inspection_notice_telegram_number_help_block_${appsToFoId}_${inspectionNotice}" placeholder="№ телеграммы" type="text" size="8" required>
                    <small id="apps_to_fo_inspection_notice_telegram_number_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        № телеграммы
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <input id = "apps_to_fo_inspection_notice_telegram_date_of_inspection_${appsToFoId}_${inspectionNotice}" class = "apps_to_fo_inspection_notice_telegram_date_of_inspection_${appsToFoId} apps_to_fo_inspection_notice_telegram_date_of_inspections datepicker-here form-control" aria-describedby="apps_to_fo_inspection_notice_telegram_date_of_inspection_help_block_${appsToFoId}_${inspectionNotice}" placeholder="Дата" type="text" size="10" required>
                    <small id="apps_to_fo_inspection_notice_telegram_date_of_inspection_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        Дата проведения осмотра
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <textarea id = "apps_to_fo_inspection_notice_telegram_place_of_inspection_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_request_documents_${appsToFoId} apps_to_fo_request_documents form-control" aria-describedby="apps_to_fo_inspection_notice_telegram_place_of_inspection_help_block_${appsToFoId}_${inspectionNotice}" placeholder="Адрес места осмотра ТС" type="text" size="8" required></textarea>
                    <small id="apps_to_fo_inspection_notice_telegram_place_of_inspection_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        Введите адрес места осмотра ТС
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <select id="apps_to_fo_inspection_notice_telegram_notice_of_delivery_type_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspection_notice_telegram_notice_of_delivery_type_${appsToFoId} apps_to_fo_inspection_notice_telegram_notice_of_delivery_types custom-select form-control col-md-12" required>
                        <option value="">Выберите вариант</option>
                        <option>Телеграмма получена</option>
                        <option>Телеграмма не получена</option>
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <input id = "apps_to_fo_inspection_notice_telegram_notice_of_delivery_date_${appsToFoId}_${inspectionNotice}" class = "apps_to_fo_inspection_notice_telegram_notice_of_delivery_date_${appsToFoId} apps_to_fo_inspection_notice_telegram_notice_of_delivery_dates datepicker-here form-control" aria-describedby="apps_to_fo_inspection_notice_telegram_notice_of_delivery_date_help_block_${appsToFoId}_${inspectionNotice}" placeholder="Дата" type="text" size="10" required>
                    <small id="apps_to_fo_inspection_notice_telegram_notice_of_delivery_date_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        Дата уведомления о вручении
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <input id = "apps_to_fo_inspection_notice_telegram_notice_of_delivery_number_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspection_notice_telegram_notice_of_delivery_number_${appsToFoId} apps_to_fo_inspection_notice_telegram_notice_of_delivery_numbers form-control" aria-describedby="apps_to_fo_inspection_notice_telegram_notice_of_delivery_number_help_block_${appsToFoId}_${inspectionNotice}" placeholder="№ уведомления" type="text" size="8" required>
                    <small id="apps_to_fo_inspection_notice_telegram_notice_of_delivery_number_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        № уведомления о вручении
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
            </div>
        </div>
        <div id="apps_to_fo_inspection_notice_letter_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspection_notice_letter_${appsToFoId} apps_to_fo_inspection_notice_letters" style="display:none">
            <div class="form-row">
                <div class="form-group col-md-3">
                    <input id = "apps_to_fo_inspection_notice_letter_number_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspection_notice_letter_number_${appsToFoId} apps_to_fo_inspection_notice_letter_numbers form-control" aria-describedby="apps_to_fo_inspection_notice_letter_number_help_block_${appsToFoId}_${inspectionNotice}" placeholder="№ письма" type="text" size="8" required>
                    <small id="apps_to_fo_inspection_notice_letter_number_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        № письма
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <input id = "apps_to_fo_inspection_notice_letter_date_${appsToFoId}_${inspectionNotice}" class = "apps_to_fo_inspection_notice_letter_date_${appsToFoId} apps_to_fo_inspection_notice_letter_dates datepicker-here form-control" aria-describedby="apps_to_fo_inspection_notice_letter_date_help_block_${appsToFoId}_${inspectionNotice}" placeholder="Дата" type="text" size="10" required>
                    <small id="apps_to_fo_inspection_notice_letter_date_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        Дата Направления на осмотр
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <input id = "apps_to_fo_inspection_notice_letter_direction_number_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspection_notice_letter_direction_number_${appsToFoId} apps_to_fo_inspection_notice_letter_direction_numbers form-control" aria-describedby="apps_to_fo_inspection_notice_letter_direction_number_help_block_${appsToFoId}_${inspectionNotice}" placeholder="№ Направления" type="text" size="8" required>
                    <small id="apps_to_fo_inspection_notice_letter_direction_number_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        № Направления на осмотр
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <input id = "apps_to_fo_inspection_notice_letter_organization_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspection_notice_letter_organization_${appsToFoId} apps_to_fo_inspection_notice_letter_organizations form-control li-quotes" aria-describedby="apps_to_fo_inspection_notice_letter_organization_help_block_${appsToFoId}_${inspectionNotice}" placeholder="Наименование организации" type="text" size="8" required>
                    <small id="apps_to_fo_inspection_notice_letter_organization_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        Наименование организации
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <select id="apps_to_fo_inspection_notice_letter_confirmation_of_delivery_type_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspection_notice_letter_confirmation_of_delivery_type_${appsToFoId} apps_to_fo_inspection_notice_letter_confirmation_of_delivery_types custom-select form-control col-md-12" required>
                        <option value="">Подтверждение выдачи Направления</option>
                        <option>Список внутренних почтовых отправлений</option>
                        <option>Опись вложения</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <input id = "apps_to_fo_inspection_notice_letter_confirmation_of_delivery_date_${appsToFoId}_${inspectionNotice}" class = "apps_to_fo_inspection_notice_letter_confirmation_of_delivery_date_${appsToFoId} apps_to_fo_inspection_notice_letter_confirmation_of_delivery_dates datepicker-here form-control" aria-describedby="apps_to_fo_inspection_notice_letter_confirmation_of_delivery_date_help_block_${appsToFoId}_${inspectionNotice}" placeholder="Дата" type="text" size="10" required>
                    <small id="apps_to_fo_inspection_notice_letter_confirmation_of_delivery_date_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        Дата списка
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <input id = "apps_to_fo_inspection_notice_letter_confirmation_of_delivery_number_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspection_notice_letter_confirmation_of_delivery_number_${appsToFoId} apps_to_fo_inspection_notice_letter_confirmation_of_delivery_numbers form-control" aria-describedby="apps_to_fo_inspection_notice_letter_confirmation_of_delivery_number_help_block_${appsToFoId}_${inspectionNotice}" placeholder="№ списка" type="text" size="8" required>
                    <small id="apps_to_fo_inspection_notice_letter_confirmation_of_delivery_number_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        № списка
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <input id = "apps_to_fo_inspection_notice_letter_post_number_${appsToFoId}_${inspectionNotice}" class="apps_to_fo_inspection_notice_letter_post_number_${appsToFoId} apps_to_fo_inspection_notice_letter_post_numbers form-control" aria-describedby="apps_to_fo_inspection_notice_letter_post_number_help_block_${appsToFoId}_${inspectionNotice}" placeholder="№ идентификатора" type="text" size="8" required>
                    <small id="apps_to_fo_inspection_notice_letter_post_number_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        № почтового идентификатора
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <input id = "apps_to_fo_inspection_notice_letter_post_date1_${appsToFoId}_${inspectionNotice}" class = "apps_to_fo_inspection_notice_letter_post_date1_${appsToFoId} apps_to_fo_inspection_notice_letter_post_date1 datepicker-here form-control" aria-describedby="apps_to_fo_inspection_notice_letter_post_date1_help_block_${appsToFoId}_${inspectionNotice}" placeholder="Дата" type="text" size="10" required>
                    <small id="apps_to_fo_inspection_notice_letter_post_date1_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        Дата передачи в отделение связи
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <input id = "apps_to_fo_inspection_notice_letter_post_date2_${appsToFoId}_${inspectionNotice}" class = "apps_to_fo_inspection_notice_letter_post_date2_${appsToFoId} apps_to_fo_inspection_notice_letter_post_date2 datepicker-here form-control" aria-describedby="apps_to_fo_inspection_notice_letter_post_date2_help_block_${appsToFoId}_${inspectionNotice}" placeholder="Дата" type="text" size="10" required>
                    <small id="apps_to_fo_inspection_notice_letter_post_date2_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        Дата доставки в место вручения
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <input id = "apps_to_fo_inspection_notice_letter_post_date3_${appsToFoId}_${inspectionNotice}" class = "apps_to_fo_inspection_notice_letter_post_date3_${appsToFoId} apps_to_fo_inspection_notice_letter_post_date3 datepicker-here form-control" aria-describedby="apps_to_fo_inspection_notice_letter_post_date3_help_block_${appsToFoId}_${inspectionNotice}" placeholder="Дата" type="text" size="10" required>
                    <small id="apps_to_fo_inspection_notice_letter_post_date3_help_block_${appsToFoId}_${inspectionNotice}" class="form-text">
                        Дата вручения адресату
                        <i class="fa fa-question-circle" aria-hidden="true" tabindex="0" data-trigger="focus" data-toggle="popover"></i>
                    </small>
                </div>
            </div>
        </div>
    </div>
    `

    $(`#apps_to_fo_inspection_notice_${appsToFoId}`).append(str);
	$(`#apps_to_fo_inspection_notice_${appsToFoId}_${inspectionNotice} .datepicker-here`).datepicker()

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

    //Вызывает функцию, изменяющую общую картинку валидации
    // validationCheck('apps-to-fo')
    // validationCheckUpdate('apps-to-fo')

}

//Удаляет уведомление о вызове на осмотр
function removeInspectionNotice(appsToFoId, inspectionNotice) {
    $(`#apps_to_fo_inspection_notice_${appsToFoId}_${inspectionNotice}`).remove();
    // validationCheckUpdate('apps-to-fo')
}

//Добавляет информацию о направлении уведомления о вызове на осмотр
$(document).on("change", ".apps_to_fo_inspection_notice_infos", function (event) {
	if ($(this).find(':selected').text() == "Сведения имеются") {
        
        $(this).parent().parent().next().show('fast')
        $(this).parent().parent().next().find('.apps_to_fo_inspection_notice_types').addClass('form-control')
	} else {
        if (($(this).parent().parent().next().find(".toggle").hasClass("rotate"))) {
            $(this).parent().parent().next().find(".toggle").removeClass("rotate")
        }
        $(this).parent().parent().next().hide('fast')
        $(this).parent().parent().next().find('.apps_to_fo_inspection_notice_telegrams').hide('fast')
        $(this).parent().parent().next().find('.apps_to_fo_inspection_notice_letters').hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().next().find('select').removeClass('form-control')
            $(this).parent().parent().next().find('textarea').removeClass('form-control')
        }, 200)
	}
    // validationCheckUpdate('apps-to-fo')
    // validationCheck('apps-to-fo')
});

//Показать дополнительную информацию о способах направления ведомления о вызове на осмотр
$(document).on("click", ".apps_to_fo_inspection_notice_info_btns", function (event) {
    if (!($(this).find(".toggle").hasClass("rotate"))) {

        $(this).find(".toggle").addClass("rotate")

        if ($(this).parent().prev().children().first().find(':selected').text() == "Телеграмма") {
            //Показываем сведения по телеграмме
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').show('fast')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').find('input[type=text]').addClass('form-control')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').find('select').addClass('form-control')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').find('textarea').addClass('form-control')
            //Скрываем сведения по письму
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').hide('fast')
        } else if ($(this).parent().prev().children().first().find(':selected').text() == "Письмо") {
            //Показываем сведения по письму
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').show('fast')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').find('input[type=text]').addClass('form-control')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').find('select').addClass('form-control')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').find('textarea').addClass('form-control')
            //Скрываем сведения по телеграмме
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').hide('fast')
        } else {
            //Скрываем сведения по телеграмме
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').hide('fast')
            //Скрываем сведения по письму
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').hide('fast')
        }
    } else {
        $(this).find(".toggle").removeClass("rotate");
        //Скрываем сведения по телеграмме
        $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').hide('fast')
        //Скрываем сведения по письму
        $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').hide('fast')
    }
  
    // validationCheckUpdate('apps-to-fo')
    // validationCheck('apps-to-fo')
  
})

//Добавляет информацию о способах направления ведомления о вызове на осмотр
$(document).on("change", ".apps_to_fo_inspection_notice_types", function (event) {

    if (!($(this).parent().next().find(".toggle").hasClass("rotate"))) {
        $(this).parent().next().find(".toggle").addClass("rotate");
    }

	if ($(this).find(':selected').text() == "Телеграмма") {
        //Показываем сведения по телеграмме
        $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').show('fast')
        $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').find('input[type=text]').addClass('form-control')
        $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').find('select').addClass('form-control')
        $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').find('textarea').addClass('form-control')

        //Скрываем сведения по письму
        $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').hide('fast')
        setTimeout(() => {
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').find('select').removeClass('form-control')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').find('textarea').removeClass('form-control')
        }, 200)
	} else if ($(this).find(':selected').text() == "Письмо") {
        //Показываем сведения по письму
        $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').show('fast')
        $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').find('input[type=text]').addClass('form-control')
        $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').find('select').addClass('form-control')
        $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').find('textarea').addClass('form-control')

        //Скрываем сведения по телеграмме
        $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').hide('fast')
        setTimeout(() => {
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').find('select').removeClass('form-control')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').find('textarea').removeClass('form-control')
        }, 200)
	} else {
        $(this).parent().next().find(".toggle").removeClass("rotate")
        //Скрываем сведения по телеграмме и письму
        $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').hide('fast')
        $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').hide('fast')

        setTimeout(() => {
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').find('select').removeClass('form-control')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_letters').find('textarea').removeClass('form-control')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').find('select').removeClass('form-control')
            $(this).parent().parent().parent().find('.apps_to_fo_inspection_notice_telegrams').find('textarea').removeClass('form-control')
        }, 200)
    }
    // validationCheckUpdate('apps-to-fo')
    // validationCheck('apps-to-fo')
});

//Добавляет информацию о проведении осмотра ТС
$(document).on("change", ".apps_to_fo_inspection_infos", function (event) {
	if ($(this).find(':selected').text() == "Сведения имеются") {
        $(this).parent().parent().next().show('fast')

        $(this).parent().parent().next().find('input[type=text]').addClass('form-control')
	} else {
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().find('input[type=text]').removeClass('form-control')
        }, 200)
	}
    // validationCheckUpdate('apps-to-fo')
    // validationCheck('apps-to-fo')
});

function addExpertize(appsToFoId) {
    appsToFoExpertise++
    var str =`
    <div id="apps_to_fo_expertise_${appsToFoId}_${appsToFoExpertise}" class="apps_to_fo_expertises_${appsToFoId}">
        <div class="form-row">
            <div class="form-group col-md-3">
                <input id = "apps_to_fo_expertise_date_${appsToFoId}_${appsToFoExpertise}" class = "apps_to_fo_expertise_date_${appsToFoId} apps_to_fo_expertise_dates datepicker-here form-control" placeholder="Дата" type="text" size="10" required>
            </div>
            <div class="form-group col-md-3">
                <input id = "apps_to_fo_expertise_number_${appsToFoId}_${appsToFoExpertise}" class="apps_to_fo_expertise_number_${appsToFoId} apps_to_fo_expertise_numbers form-control" placeholder="№ заключения" type="text" size="8" required>
            </div>
            <div class="form-group col-md-4">
                <input id = "apps_to_fo_expertise_organization_${appsToFoId}_${appsToFoExpertise}" class="apps_to_fo_expertise_organization_${appsToFoId} apps_to_fo_expertise_organizations form-control li-quotes" placeholder="Наименование экспертной организации" type="text" size="8" required>
            </div>
            <div class="form-group col-ms-1">
                <button id="add_apps_to_fo_expertise_info_btn_${appsToFoId}_${appsToFoExpertise}" class="add_apps_to_fo_expertise_info_btn_${appsToFoId} add_apps_to_fo_expertise_info_btns btn btn-outline-warning add_info">
                    <i class="fa fa-chevron-down toggle"></i>
                </button>
            </div>
            <div class="form-group col-ms-1">
                <button id="apps_to_fo_expertise_btn_${appsToFoId}_${appsToFoExpertise}" class="apps_to_fo_expertise_btn_${appsToFoId} apps_to_fo_expertise_btns btn btn-outline-danger" onclick="removeExpertize(${appsToFoId}, ${appsToFoExpertise})">×</button>
            </div>
        </div>
        <div class="apps_to_fo_expertise_add_infos" style="display:none">
            <div class="form-row">
                <div class="form-group col-md-3">
                    <div class="input-group">
                        <input id="apps_to_fo_expertise_summ_without_${appsToFoId}_${appsToFoExpertise}" class = "apps_to_fo_expertise_summ_without_${appsToFoId} apps_to_fo_expertise_summ_withouts input-numeral form-control deactivation" aria-describedby="apps_to_fo_expertise_summ_without_help_block_${appsToFoId}_${appsToFoExpertise}" placeholder="Сумма" type="text" size="10" required>
                        <div class="input-group-append">
                            <span class="input-group-text">&#8381;</span>
                        </div>
                    </div>
                    <small id="apps_to_fo_expertise_summ_without_help_block_${appsToFoId}_${appsToFoExpertise}" class="form-text">
                        <div class="form-inline">
                            <input id="apps_to_fo_expertise_summ_without_deactivate_${appsToFoId}_${appsToFoExpertise}" class="deactivator" type="checkbox">
                            <label for="apps_to_fo_expertise_summ_without_deactivate_${appsToFoId}_${appsToFoExpertise}" class="ml-2 form-check-label">Без износа</label>
                        </div>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <div class="input-group">
                        <input id="apps_to_fo_expertise_summ_with_${appsToFoId}_${appsToFoExpertise}" class = "apps_to_fo_expertise_summ_with_${appsToFoId} apps_to_fo_expertise_summ_withs input-numeral form-control deactivation" aria-describedby="apps_to_fo_expertise_summ_with_help_block_${appsToFoId}_${appsToFoExpertise}" placeholder="Сумма" type="text" size="10" required>
                        <div class="input-group-append">
                            <span class="input-group-text">&#8381;</span>
                        </div>
                    </div>
                    <small id="apps_to_fo_expertise_summ_with_help_block_${appsToFoId}_${appsToFoExpertise}" class="form-text">
                        <div class="form-inline">
                            <input id="apps_to_fo_expertise_summ_with_deactivate_${appsToFoId}_${appsToFoExpertise}" class="deactivator" type="checkbox">
                            <label for="apps_to_fo_expertise_summ_with_deactivate_${appsToFoId}_${appsToFoExpertise}" class="ml-2 form-check-label">С износом</label>
                        </div>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <div class="input-group">
                        <input id="apps_to_fo_expertise_summ_market_${appsToFoId}_${appsToFoExpertise}" class = "apps_to_fo_expertise_summ_market_${appsToFoId} apps_to_fo_expertise_summ_markets input-numeral form-control deactivation" aria-describedby="apps_to_fo_expertise_summ_market_help_block_${appsToFoId}_${appsToFoExpertise}" placeholder="Сумма" type="text" size="10" required>
                        <div class="input-group-append">
                            <span class="input-group-text">&#8381;</span>
                        </div>
                    </div>
                    <small id="apps_to_fo_expertise_summ_market_help_block_${appsToFoId}_${appsToFoExpertise}" class="form-text">
                        <div class="form-inline">
                            <input id="apps_to_fo_expertise_summ_market_deactivate_${appsToFoId}_${appsToFoExpertise}" class="deactivator" type="checkbox">
                            <label for="apps_to_fo_expertise_summ_market_deactivate_${appsToFoId}_${appsToFoExpertise}" class="ml-2 form-check-label">Рыночная стоимость</label>
                        </div>
                    </small>
                </div>
                <div class="form-group col-md-3">
                    <div class="input-group">
                        <input id="apps_to_fo_expertise_summ_leftovers_${appsToFoId}_${appsToFoExpertise}" class = "apps_to_fo_expertise_summ_leftovers_${appsToFoId} apps_to_fo_expertise_summ_leftovers input-numeral form-control deactivation" aria-describedby="apps_to_fo_expertise_summ_leftovers_help_block_${appsToFoId}_${appsToFoExpertise}" placeholder="Сумма" type="text" size="10" required>
                        <div class="input-group-append">
                            <span class="input-group-text">&#8381;</span>
                        </div>
                    </div>
                    <small id="apps_to_fo_expertise_summ_leftovers_help_block_${appsToFoId}_${appsToFoExpertise}" class="form-text">
                        <div class="form-inline">
                            <input id="apps_to_fo_expertise_summ_leftovers_deactivate_${appsToFoId}_${appsToFoExpertise}" class="deactivator" type="checkbox">
                            <label for="apps_to_fo_expertise_summ_leftovers_deactivate_${appsToFoId}_${appsToFoExpertise}" class="ml-2 form-check-label">Годные остатки</label>
                        </div>
                    </small>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <div class="input-group">
                        <input id="apps_to_fo_expertise_summ_uts_${appsToFoId}_${appsToFoExpertise}" class = "apps_to_fo_expertise_summ_uts_${appsToFoId} apps_to_fo_expertise_summ_uts input-numeral form-control deactivation" aria-describedby="apps_to_fo_expertise_summ_uts_help_block_${appsToFoId}_${appsToFoExpertise}" placeholder="Сумма" type="text" size="10" required>
                        <div class="input-group-append">
                            <span class="input-group-text">&#8381;</span>
                        </div>
                    </div>
                    <small id="apps_to_fo_expertise_summ_uts_help_block_${appsToFoId}_${appsToFoExpertise}" class="form-text">
                        <div class="form-inline">
                            <input id="apps_to_fo_expertise_summ_uts_deactivate_${appsToFoId}_${appsToFoExpertise}" class="deactivator" type="checkbox">
                            <label for="apps_to_fo_expertise_summ_uts_deactivate_${appsToFoId}_${appsToFoExpertise}" class="ml-2 form-check-label">УТС</label>
                        </div>
                    </small>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-12">
                    <textarea id = "apps_to_fo_expertise_trasa_${appsToFoId}_${appsToFoExpertise}" class="apps_to_fo_expertise_trasa_${appsToFoId} apps_to_fo_expertise_trasas form-control deactivation" aria-describedby="apps_to_fo_expertise_trasa_help_block_${appsToFoId}_${appsToFoExpertise}" placeholder="Выводы трасологической экспертизы" type="text" size="8" required></textarea>
                    <small id="apps_to_fo_expertise_trasa_help_block_${appsToFoId}_${appsToFoExpertise}" class="form-text">
                        <div class="form-inline">
                            <input id="apps_to_fo_expertise_trasa_deactivate_${appsToFoId}_${appsToFoExpertise}" class="deactivator" type="checkbox">
                            <label for="apps_to_fo_expertise_trasa_deactivate_${appsToFoId}_${appsToFoExpertise}" class="ml-2 form-check-label">Трасология</label>
                        </div>
                    </small>
                </div>
            </div>
        </div>
    </div>
    `

    $(`#apps_to_fo_expertises_${appsToFoId}`).append(str);
	$(`#apps_to_fo_expertise_${appsToFoId}_${appsToFoExpertise} .datepicker-here`).datepicker()

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

  //Вызывает функцию, изменяющую общую картинку валидации
//   validationCheck('apps-to-fo')
//   validationCheckUpdate('apps-to-fo')

}

function removeExpertize(appsToFoId, appsToFoExpertise) {
    $(`#apps_to_fo_expertise_${appsToFoId}_${appsToFoExpertise}`).remove();
    // validationCheckUpdate('apps-to-fo')
}

//Добавляет информацию о проведении экспертизы
$(document).on("change", ".apps_to_fo_expertise_infos", function (event) {
	if ($(this).find(':selected').text() == "Сведения имеются") {
        $(this).parent().parent().next().show('fast')

        $(this).parent().parent().next().find('input[type=text]').addClass('form-control')
        $(this).parent().parent().next().find('textarea').addClass('form-control')
	} else {
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().next().find('textarea').removeClass('form-control')
        }, 200)
	}
    // validationCheckUpdate('apps-to-fo')
    // validationCheck('apps-to-fo')
});

//Показать дополнительную информацию о проведении экспертизы
$(document).on("click", ".add_apps_to_fo_expertise_info_btns", function (event) {
    if (!($(this).find(".toggle").hasClass("rotate"))) {
        $(this).parent().parent().next().show('fast'); //Показывает .add_main_claims_info
        $(this).find(".toggle").addClass("rotate");
    } else {
        $(this).parent().parent().next().hide('fast'); //Скрывает .add_main_claims_info
        $(this).find(".toggle").removeClass("rotate");
    }
});

//Добавляет информацию об ответе ФО
$(document).on("change", ".apps_to_fo_answer_fo_infos", function (event) {
	if ($(this).find(':selected').text() == "Сведения имеются") {
        $(this).parent().parent().next().show('fast')

        //Добавление класса form-control для всех input кроме суммы НДФЛ (т.к. для него данный класс добавляется при клике на checkbox)
        $(this).parent().parent().next().find('input[type=text]').each(function(index){
            if (!$(this).hasClass('penalty_ndfl_summs')) {
                $(this).addClass('form-control')
            }
        })
        $(this).parent().parent().next().find('select').addClass('form-control')
	} else {
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().next().find('select').removeClass('form-control')
        }, 200)
	}
    // validationCheckUpdate('apps-to-fo')
    // validationCheck('apps-to-fo')
});

//Добавляет информацию об ответе ФО на заявление или претензию
$(document).on("change", ".apps_to_fo_answer_fos", function (event) {
	if ($(this).find(':selected').text() == "Осуществление выплаты") {
        $(this).parent().parent().next().show('fast')
        //Добавление класса form-control для всех input кроме суммы НДФЛ (т.к. для него данный класс добавляется при клике на checkbox)
        $(this).parent().parent().next().find('input[type=text]').each(function(index){
            if (!$(this).hasClass('penalty_ndfl_summs')) {
                $(this).addClass('form-control')
            }
        })

        $(this).parent().parent().next().find('select').addClass('form-control')
        
	} else {
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().next().find('select').removeClass('form-control')
        }, 200)
	}
    if ($(this).find(':selected').text() == "Выдача направления на ремонт") {
        $(this).parent().parent().next().next().show('fast')

        $(this).parent().parent().next().next().find('input[type=text]').addClass('form-control')
        $(this).parent().parent().next().next().find('select').addClass('form-control')
        
	} else {
        $(this).parent().parent().next().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().next().find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().next().next().find('select').removeClass('form-control')
        }, 200)
	}
    if ($(this).find(':selected').text() == "Отказ в выплате") {
        $(this).parent().parent().parent().find('.apps_to_fo_refusals').show('fast')

        $(this).parent().parent().parent().find('.apps_to_fo_refusals').find('input[type=text]').addClass('form-control')
        $(this).parent().parent().parent().find('.apps_to_fo_refusals').find('select').addClass('form-control')
        // $(this).parent().parent().parent().find('.apps_to_fo_refusals').find('textarea').addClass('form-control')
        
	} else {
        $(this).parent().parent().parent().find('.apps_to_fo_refusals').hide('fast')
        setTimeout(() => {
            $(this).parent().parent().parent().find('.apps_to_fo_refusals').find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().parent().find('.apps_to_fo_refusals').find('select').removeClass('form-control')
            // $(this).parent().parent().parent().find('.apps_to_fo_refusals').find('textarea').removeClass('form-control')
        }, 200)
	}
});

function addPayment(appsToFoId) {
	paymentId++;
  var str = `
  <div id="payment_${appsToFoId}_${paymentId}" class="payment_${appsToFoId} payments">
        <div class="form-row">
            <div class="form-group col-md-3 form-inline">
                <select id="payments_name_${appsToFoId}_${paymentId}" class="payments_name_${appsToFoId} payments_names custom-select col-md-12 form-control" required>
                    <option value="">Вид выплаты</option>
                    <option>Страховое возмещение</option>
                    <option>УТС</option>
                    <option>Эвакуатор</option>
                    <option>Хранение</option>
                    <option>Неустойка</option>
                </select>
            </div>
            <div class="form-group col-md-3">
                <input id = "payments_date_${appsToFoId}_${paymentId}" class = "payments_date_${appsToFoId} payments_dates datepicker-here form-control" placeholder="Дата" type="text" size="10" required>
            </div>
            <div class="form-group col-md-2">
                <input id = "payments_order_${appsToFoId}_${paymentId}" class="payments_order_${appsToFoId} payments_orders form-control" placeholder="№ ПП" type="text" size="8" required>
            </div>
            <div class="form-group col-md-3">
                <div class="input-group">
                    <input id="payments_summ_${appsToFoId}_${paymentId}" class = "payments_summ_${appsToFoId} payments_summs input-numeral form-control" placeholder="Сумма" type="text" size="10" required>
                    <div class="input-group-append">
                        <span class="input-group-text">&#8381;</span>
                    </div>
                </div>
            </div>
            <div class="form-group col-ms-1">
                <button id="payments_btn_${appsToFoId}_${paymentId}" class="payments_btn_${appsToFoId} payments_btns btn btn-outline-danger" onclick="removePayment(${appsToFoId}, ${paymentId})">×</button>
            </div>
        </div>
        <div class="form-row" style="display:none">
            <div class="form-group col-md-4 form-inline">
                <div class="form-check">
                    <input id="penalty_ndfl_${appsToFoId}_${paymentId}" class="penalty_ndfl_${appsToFoId} penalty_ndfls form-check-input" type="checkbox">
                    <label for="penalty_ndfl_${appsToFoId}_${paymentId}" class="ml-2 form-check-label">удержан НДФЛ в размере</label>
                </div>
            </div>
            <div class="form-group col-md-3" style="display:none">
                <div class="input-group">
                    <input id="penalty_ndfl_summ_${appsToFoId}_${paymentId}" class = "penalty_ndfl_summ_${appsToFoId} penalty_ndfl_summs input-numeral" placeholder="Сумма НДФЛ" type="text" size="10" required>
                    <div class="input-group-append">
                        <span class="input-group-text">&#8381;</span>
                    </div>
                </div>
            </div>
            <div class="form-group col-md-3 form-inline">
                <span id="penalty_ndfl_persent_${appsToFoId}_${paymentId}" class="penalty_ndfl_persent_${appsToFoId} penalty_ndfl_persents"></span>
            </div>
        </div>
        <div id="payment_ev_${appsToFoId}_${paymentId}" class="payment_ev_1 payment_evs" style="display:none">
            <div class="form-row">
                <div class="form-group col-md-3">
                    <h6>Маршрут эвакуации</h6>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <select id="payment_ev_route_${appsToFoId}_${paymentId}" class="payment_ev_route_${appsToFoId} payment_ev_routes custom-select deactivation col-md-12" aria-describedby="payment_ev_route_help_block_${appsToFoId}_${paymentId}" required>
                        <option value="">Выберите вариант</option>
                        <option>ДТП - СТОА</option>
                        <option>ДТП - Хранение</option>
                        <option>Хранение - СТОА</option>
                    </select>
                    <small id="payment_ev_route_help_block_${appsToFoId}_${paymentId}" class="form-text">
                        <div class="form-inline">
                            <input id="payment_ev_route_deactivate_${appsToFoId}_${paymentId}" class="deactivator" type="checkbox">
                            <label for="payment_ev_route_deactivate_${appsToFoId}_${paymentId}" class="ml-2 form-check-label">Сведений не имеется</label>
                        </div>
                    </small>
                </div>
            </div>
        </div>
  </div>
  `

    $(`#payment_${appsToFoId}`).append(str);
    $(`#payment_${appsToFoId}_${paymentId} .datepicker-here`).datepicker()

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

    //Вызывает функцию, изменяющую общую картинку валидации
    // validationCheck('apps-to-fo')
    // validationCheckUpdate('apps-to-fo')

}

function removePayment(appsToFoId, paymentId) {
    $(`#payment_${appsToFoId}_${paymentId}`).remove();
    // validationCheckUpdate('apps-to-fo')
}

//Добавляет галочку НДФЛ
$(document).on("change", ".payments_names", function (event) {
	if ($(this).find(':selected').text() == "Неустойка") {
		$(this).parent().parent().next().show('fast');
	} else {
        $(this).parent().parent().next().hide('fast');
	}
});

//Добавляет поле ввода величины НДФЛ
$(document).on("change", ".penalty_ndfls", function (event) {
	if ($(this).is(':checked')) {
		$(this).parent().parent().next().show('fast')
        $(this).parent().parent().next().find('input[type=text]').addClass('form-control')
	} else {
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().find('input[type=text]').removeClass('form-control')
        }, 200)
	}
});

//Добавляет маршрут эвакуации ТС
$(document).on("change", ".payments_names", function (event) {
	if ($(this).find(':selected').text() == "Эвакуатор") {
		$(this).parent().parent().next().next().show('fast');
        $(this).parent().parent().next().next().find('.payment_ev_routes').addClass('form-control')
	} else {
        $(this).parent().parent().next().next().hide('fast');
        $(this).parent().parent().next().next().find('.payment_ev_routes').removeClass('form-control')
	}
});

//Изменяет картинку валидации
// function validationCheck(className) {
// $(`.${className} .form-control`).focusout(function(){
//     validationCheckUpdate(className)
// })
// }

//Обновлет сведения о валидации инпутов
// function validationCheckUpdate(className) {
// setTimeout(() => {
//     var isOk = true
//     $(`.${className} .form-control`).each(function() {
//     if ($(this).css('border-color') == 'rgb(220, 53, 69)') {
//         isOk = false
//     }
//     })
//     if (isOk) {
//     $(`#${className}`).children().first().children().first().children().first().next().html(`<i class="fa fa-check-square-o fa-2x" aria-hidden="true" style="color: #28a745;"></i>`)
//     } else {
//     $(`#${className}`).children().first().children().first().children().first().next().html(`<i class="fa fa-exclamation-circle fa-2x" aria-hidden="true" style="color: #dc3545;"></i>`)
//     }
// }, 200); 
// }

//Добавляет подсказки к полям
function addPopover(className) {
    $(function () {
      $(`.${className} + small [data-toggle="popover"]`).popover({
        html: true,
        title: "Заполнение даты телеграммы",
        content: function () {
          return `Укажите дату телеграммы, как показано на картинке: <img src="img/logo.png" />`
        }
      })
    })
    $('[data-toggle="popover"]').css("cursor", "pointer")
}