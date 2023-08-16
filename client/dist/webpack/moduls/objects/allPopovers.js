export const allPopovers = {
    popovers: [
        {
            id: 0,
            type: "apps_to_fo_inspection_notice_telegram_dates",
            title: "Заполнение даты телеграммы",
            content: function () {
                return `Укажите дату телеграммы. Пример: <img src="img/logo.png" width=100% />`
            },
        },
        {
            id: 1,
            type: "apps_to_fo_inspection_notice_telegram_numbers",
            title: "Заполнение номера телеграммы",
            content: function () {
                return `Укажите номер телеграммы. Пример: <img src="img/logo.png" width=100% />`
            },
        },
        {
            id: 2,
            type: "apps_to_fo_inspection_notice_telegram_date_of_inspections",
            title: "Заполнение даты проведения осмотра",
            content: function () {
                return `Укажите дату проведения осмотра. Пример: <img src="img/logo.png" width=100% />`
            },
        },
        {
            id: 3,
            type: "add_main_claim_info_ev_dates",
            title: "Заполнение даты оплаты услуг по эвакуации ТС",
            content: function () {
                return `Укажите дату оплаты услуг по эвакуации ТС. Пример: <img src="img/${this.type}.png" width=100% />`
            },
        },
        {
            id: 4,
            type: "add_main_claim_info_ev_routes",
            title: "Заполнение маршрута эвакуации",
            content: function () {
                return `Выберите маршрут эвакуации: (с места ДТП до СТОА, с места ДТП до места хранения или с места хранения до СТОА)`
            },
        },
        {
            id: 5,
            type: "add_main_claim_info_ev_grounds",
            title: "Заполнение типа документа-основания",
            content: function () {
                return `Выберите тип документа, которым подтверждается оплата расходов на эвакуацию ТС. Пример: <img src="img/${this.type}.png" width=100% />`
            },
        },
        {
            type: "add_main_claim_info_ev_numbers",
            title: "Заполнение номера документа-основания",
            content: function () {
                return `Укажите номер документа-основания. Пример: <img src="img/${this.type}.png" width=100% />`
            },
        },
    ],
}