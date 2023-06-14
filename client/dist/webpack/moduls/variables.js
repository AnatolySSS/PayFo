//Количество миллисекунд в одном дне
export let DAY = 24*60*60*1000;
//Дата начала действия лимита для европротокола 100 000₽
export let DATE_EURO_START = Date.parse(new Date(2018, 5, 1, 0));
//Дата вступления в силу ФЗ-123
export let DATE_FZ_123_START = Date.parse(new Date(2019, 5, 1, 0));
//Дата ДТП с которой применяется новая методика
export let DATE_NEW_OSAGO_METHODOKOGY = Date.parse(new Date(2021, 8, 20, 0));

export let COLUMN_NAME_0 = "№";
export let COLUMN_NAME_1 = "Вид выплаты";
export let COLUMN_NAME_2 = "Дата выплаты";
export let COLUMN_NAME_3 = "Сумма выплаты";

export let COLUMN_NAME_4 = "Начало";
export let COLUMN_NAME_5 = "Конец";
export let COLUMN_NAME_6 = "Дней";
export let COLUMN_NAME_7 = "Неустойка";

export let COLUMN_NAME_8 = "Период № ";

export let COLUMN_NAME_20 = "20-й день";
export let COLUMN_NAME_21 = "21-й день";

//Переменные для имени финансовой организации (в разных падежах)
export let holly, fo_name, fo_name_nominative, fo_name_genitive, fo_name_accusative, fo_name_instrumental;
//Для правильного склонения финансовой организации
export let make_a_payment; // "осуществило"/"осуществила"
export let fulfill; // "исполнило"/"исполнила"
export let keep; // "удержало"/"удержала"
//Переменная с тестом всего решения в части неустойки
export let decision;

// //Переменные для canvas
// export var date_sv_penalty_day_x;
//export let max_days_delay; // максимальное количество дней просрочки
// export var space = 10;
// export var pay_summ_y_all = 0; //Сложение всех предыдущих сумм выплат (для определения координат начала очередного прямоугольника)
// export var pay_date_x = [], pay_summ_y = [];


export let claimsContract = [];
export let dtpParticipant = [];
export let appToFo = [];

//переменная для массива добровольных выплат
export let paymentVoluntary = [];
export let paymentFu = [];
export let paymentCourt = [];
export let fuExpertise = []

export let courtPenalty = [];

// export var total_penalty_summ_accrued;
// export var total_penalty_summ_paid;

//Сборка заголовка таблицы (без суда)
export let STR_PAYMENT_DETALED_HEADER = '<tr align="center">' +
  '<th scope="col"><span id="COLUMN_NAME_0">' + COLUMN_NAME_0 + '</span></th>' +
  '<th scope="col"><span id="COLUMN_NAME_1">' + COLUMN_NAME_1 + '</span></th>' +
  '<!-- <th scope="col"><span id="COLUMN_NAME_2"></span></th> -->' +
  '<th scope="col"><span id="COLUMN_NAME_3">' + COLUMN_NAME_3 + '</span></th>' +
  '<th scope="col"><span id="COLUMN_NAME_4">' + COLUMN_NAME_4 + '</span></th>' +
  '<th scope="col"><span id="COLUMN_NAME_5">' + COLUMN_NAME_5 + '</span></th>' +
  '<th scope="col"><span id="COLUMN_NAME_6">' + COLUMN_NAME_6 + '</span></th>' +
  '<th scope="col"><span id="COLUMN_NAME_7">' + COLUMN_NAME_7 + '</span></th>' +
'</tr>';
