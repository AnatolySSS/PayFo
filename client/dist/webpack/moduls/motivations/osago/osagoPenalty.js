import { holly_boolen } from '../../findLastDay';
import { makeRubText_nominative } from '../../makeRubText_nominative.js';
import { makeRubText_genitive } from '../../makeRubText_genitive.js';
import { declinationDays } from '../../declinationDays.js';
import { declensions_by_cases } from '../../declensions_by_cases.js';
import { formatDate } from '../../formatDate';


//ФОРМИРОВАНИЕ МОТИВИРОВКИ ПО ТРЕБОВАНИЮ О НЕУСТОЙКЕ
export function osagoPenaltyParagraph(paymentVoluntary,
                                      paymentFu,
                                      paymentCourt,
                                      total_penalty_summ_accrued,
                                      total_penalty_summ_paid,
                                      max_summ) {
    let out_data = {}  
    var total_ndfl = 0;
    var article_193;
    var claim_name = [];
    var claim_name_short = [];
    var claim_add_motivation = [];

    var claim_fu_name = [];
    var claim_fu_name_short = [];
    var claim_fu_add_motivation = [];
    var analize_fu_period_paragraf = [];
    var payment_fu_execution_paragraf = [];
    var payment_fu_conclusion_paragraf = [];
    var payment_fu_claims_paragraf = [];

    var claim_court_name = [];
    var claim_court_name_short = [];
    var claim_court_add_motivation = [];
    var analize_court_period_paragraf = [];
    var payment_court_execution_paragraf = [];
    var payment_court_conclusion_paragraf = [];
    var payment_court_claims_paragraf = [];
    var payment_court_claims_paragraf_without_analize = [];

    var fo_name_nominative;
    var fo_name_genitive;
    var fo_name_accusative;
    var fo_name_instrumental;
    var make_a_payment, fulfill, keep;
    var main_penalty_paragraph = ""
    var analize_period_paragraf_help_str = ""
    var analize_period_paragraf = [];
    var payment_paragraf = [];
    var payment_penalty_paragraf = [];
    var payment_conclusion_paragraf = [];
    var payment_fu_decision = [];
    var payment_court_decision = [];
    var payment_voluntary_paragraf = "";
    var payment_fu_paragraf = "";
    var payment_court_paragraf = "";
    var max_summ_paragraf = "";
    var total_payment_penalty_paragraf = "";
    var total_penalty_summ_accrued_paragraf = "";
    var total_penalty_summ_paid_paragraf = "";
    var total_penalty_summ_accrued_string = "";
    var total_penalty_summ_paid_string = "";
    var summary_paragraf = "";
    var fu_claims_satisfied_string = "";
    var fu_claims_satisfied_string_help = "";
    var court_claims_satisfied_string = "";
    var court_claims_satisfied_paragraph = [];
    var court_claims_satisfied_paragraph_help = "";
    var court_claims_satisfied_paragraph_all = "";
    var ndfl_motivation = "";
    var court_set = new Set();
    court_set.clear();
    court_set.add(1); //Добавляестя для того, чтобы первая строка не разбивалась на символы
    
    fo_name_nominative = "Финансовая организация";
    fo_name_genitive = "Финансовой организации";
    fo_name_accusative = "Финансовую организацию";
    fo_name_instrumental = "Финансовой организацией";
    make_a_payment = " осуществила";
    fulfill = " исполнила";
    keep = " удержала";

    var first_paragraf = `<p>Рассмотрев требование Заявителя о взыскании с ${fo_name_genitive} неустойки 
    за несоблюдение срока выплаты страхового возмещения по договору ОСАГО, 
    Финансовый уполномоченный приходит к следующему.</p>`

    var standart_motivation = `<p>Согласно статье 12 ГК РФ 
    взыскание неустойки является одним из способов защиты нарушенного гражданского права.</p>
    <p>По смыслу статьи 330 ГК РФ неустойкой (штрафом, пеней) признается определенная 
    законом или договором денежная сумма, которую должник обязан уплатить кредитору 
    в случае неисполнения или ненадлежащего исполнения обязательства, в частности 
    в случае просрочки исполнения. По требованию об уплате неустойки кредитор не обязан 
    доказывать причинение ему убытков.</p>
    <p>Пунктом 21 статьи 12 Закона № 40-ФЗ установлено, что в течение 20 календарных дней, 
    за исключением нерабочих праздничных дней, а в случае, предусмотренном пунктом 15.3 
    статьи 12 Закона № 40-ФЗ, 30 календарных дней, за исключением нерабочих праздничных дней, 
    со дня принятия к рассмотрению заявления потерпевшего о страховом возмещении или прямом 
    возмещении убытков и приложенных к нему документов, предусмотренных Правилами ОСАГО, 
    страховщик обязан произвести страховую выплату потерпевшему или после осмотра и (или) 
    независимой технической экспертизы поврежденного транспортного средства выдать 
    потерпевшему направление на ремонт транспортного средства с указанием станции 
    технического обслуживания, на которой будет отремонтировано его транспортное 
    средство и которой страховщик оплатит восстановительный ремонт поврежденного 
    транспортного средства, и срока ремонта либо направить потерпевшему мотивированный 
    отказ в страховом возмещении.</p>
    <p>При несоблюдении срока осуществления страховой выплаты или срока выдачи потерпевшему 
    направления на ремонт транспортного средства страховщик за каждый день просрочки 
    уплачивает потерпевшему неустойку (пеню) в размере одного процента от определенного 
    в соответствии с Законом № 40-ФЗ размера страхового возмещения по виду причиненного 
    вреда каждому потерпевшему.</p>
    <p>В пункте 76 Постановления Пленума ВС РФ № 31 указано, что неустойка 
    исчисляется со дня, следующего за днем, установленным для принятия решения о выплате страхового 
    возмещения, то есть с 21-го дня после получения страховщиком заявления потерпевшего о страховой 
    выплате и документов, предусмотренных Правилами, и до дня фактического исполнения страховщиком 
    обязательства по договору включительно. </p>`

    var article_191 = `<p>Статьей 191 ГК РФ установлено, что течение срока, определённого периодом времени, 
    начинается на следующий день после календарной даты или наступления события, 
    которыми определено его начало.</p>`

    if (holly_boolen) {
    article_193 = `<p>В соответствии со статьей 193 ГК РФ если последний день срока 
    приходится на нерабочий день, днем окончания срока считается ближайший следующий за ним рабочий день.</p>`
    } else {
    article_193 = '';
    }

    var ndfl_motivation_on = `<p>Пунктом 1 статьи 210 Налогового кодекса Российской Федерации (далее – НК РФ) 
    установлено, что при определении налоговой базы учитываются все доходы налогоплательщика, 
    полученные им как в денежной, так и в натуральной формах или право на распоряжение которыми 
    у него возникло, а также доходы в виде материальной выгоды.</p>
    <p>Согласно статье 41 НК РФ доходом признается экономическая выгода в денежной или натуральной 
    форме, учитываемая в случае возможности ее оценки и в той мере, в которой такую выгоду можно 
    оценить, и определяемая в соответствии с главой 23 НК РФ.</p>
    <p>В соответствии с подпунктом 10 пункта 1 статьи 208 НК РФ налогообложению подлежат иные доходы, 
    получаемые налогоплательщиком в результате осуществления им деятельности в Российской Федерации.</p>
    Сумма выплачиваемых штрафов, пени, неустоек не является компенсацией реального физического или 
    морального вреда физического лица и не входит в перечень выплат, освобожденных от налогообложения 
    на основании статьи 217 НК РФ.</p>
    <p>Указанная выше позиция содержится в Письме Минфина России от 28.10.2015 № 03-04-07/62079, а также 
    в Обзоре практики рассмотрения судами дел, связанных с применением главы 23 Налогового кодекса 
    Российской Федерации, утвержденном Президиумом Верховного Суда Российской Федерации 21.10.2015 (далее – Обзор практики).</p>
    <p>В частности, в пункте 7 Обзора практики указано, что предусмотренные законодательством о защите прав 
    потребителей санкции носят исключительно штрафной характер. Их взыскание не преследует цель компенсации 
    потерь (реального ущерба) потребителя. Поскольку выплата сумм таких санкций приводит к образованию 
    имущественной выгоды у потребителя, они включаются в доход гражданина на основании положений 
    статей 41, 209 НК РФ вне зависимости от того, что получение данных сумм обусловлено нарушением 
    прав физического лица.</p>
    <p>В связи с этим, сумма неустойки, выплаченная Страховщиком потерпевшему в случае нарушения 
    предусмотренного договором ОСАГО срока выплаты страхового возмещения в соответствии 
    с пунктом 21 статьи 12 Закона № 40-ФЗ, отвечает вышеуказанным признакам экономической 
    выгоды и являются его доходом, подлежащим обложению налогом на доходы физических лиц.</p>
    <p>Пунктом 1 статьи 226 НК РФ установлено, что российские организации, от которых или 
    в результате отношений с которыми налогоплательщик получил доходы, подлежащие налогообложению, 
    обязаны исчислить, удержать у налогоплательщика и уплатить сумму налога на доходы физических лиц, 
    исчисленную в соответствии со статьей 224 НК РФ с учетом особенностей, предусмотренных статьей 226 НК РФ.</p>
    <p>Указанные организации признаются налоговыми агентами и обязаны исполнять обязанности, 
    предусмотренные для налоговых агентов, в частности, статьей 226 НК РФ.</p>
    <p>В соответствии с пунктом 4 статьи 226 НК РФ налоговые агенты обязаны удержать начисленную 
    сумму налога непосредственно из доходов налогоплательщика при их фактической выплате.</p>`

    //Собирание абзацев с добровольными выплатами
    for (var i = 0; i < paymentVoluntary.length; i++) {
    if (paymentVoluntary[i].type.options.selectedIndex != 0) {
        switch (paymentVoluntary[i].type.options.selectedIndex) {
        case 1:
            claim_name[i] = ' с заявлением о выплате страхового возмещения '
            claim_name_short[i] = ' страхового возмещения '
            claim_add_motivation[i] = ''
            break;
        case 2:
            claim_name[i] = ' с заявлением о выплате УТС '
            claim_name_short[i] = ' УТС '
            claim_add_motivation[i] = `<p>Согласно пункту 20 Постановление Пленума № 
            58 при наступлении страхового случая потерпевший обязан не только уведомить 
            страховщика о его наступлении в сроки, установленные Правилами ОСАГО, 
            но и направить страховщику заявление о страховом возмещении и документы, 
            предусмотренные Правилами ОСАГО. В заявлении о страховом возмещении потерпевший 
            должен также сообщить о другом известном ему на момент подачи заявления ущербе, 
            кроме расходов на восстановление поврежденного имущества, который подлежит 
            возмещению  (например, об утрате товарной стоимости, о расходах на эвакуацию 
            транспортного средства с места дорожно-транспортного происшествия и т.п.).</p>
            <p>Согласно пункту 37 Постановление Пленума № 58 к реальному ущербу, возникшему 
            в результате дорожно-транспортного происшествия, наряду со стоимостью ремонта 
            и запасных частей относится также утрата товарной стоимости, которая представляет 
            собой уменьшение стоимости транспортного средства, вызванное преждевременным 
            ухудшением товарного (внешнего) вида транспортного средства и его эксплуатационных 
            качеств в результате снижения прочности и долговечности отдельных деталей, узлов 
            и агрегатов, соединений и защитных покрытий вследствие дорожно-транспортного 
            происшествия и последующего ремонта.</p>`
            break;
        case 3:
            claim_name[i] = ' с заявлением о выплате расходов на эвакуацию Транспортного средства '
            claim_name_short[i] = ' расходов на эвакуацию Транспортного средства '
            claim_add_motivation[i] = `<p>Согласно абзацу 2 пункта 4.12 Правил ОСАГО, 
            при причинении вреда имуществу потерпевшего возмещению в пределах страховой 
            суммы подлежат иные расходы, произведенные потерпевшим в связи с причиненным 
            вредом (в том числе эвакуация транспортного средства с места дорожно-транспортного 
            происшествия, хранение поврежденного транспортного средства, доставка пострадавших 
            в медицинскую организацию).</p>
            Учитывая изложенное, Финансовый уполномоченный 
            приходит к выводу о том, что расходы на эвакуацию Транспортного средства относятся 
            к страховому возмещению, в силу чего неустойка за несоблюдение сроков выплаты страхового 
            возмещения подлежит начислению на сумму расходов на эвакуацию Транспортного средства.</p>`
            break;
        case 4:
            claim_name[i] = ' с заявлением о выплате расходов на хранение Транспортного средства '
            claim_name_short[i] = ' расходов на хранение Транспортного средства '
            claim_add_motivation[i] = `<p>Согласно абзацу 2 пункта 4.12 Правил ОСАГО, 
            при причинении вреда имуществу потерпевшего возмещению в пределах страховой 
            суммы подлежат иные расходы, произведенные потерпевшим в связи с причиненным 
            вредом (в том числе эвакуация транспортного средства с места дорожно-транспортного 
            происшествия, хранение поврежденного транспортного средства, доставка пострадавших 
            в медицинскую организацию).</p>
            Учитывая изложенное, Финансовый уполномоченный 
            приходит к выводу о том, что расходы на хранение Транспортного средства относятся 
            к страховому возмещению, в силу чего неустойка за несоблюдение сроков выплаты страхового 
            возмещения подлежит начислению на сумму расходов на хранение Транспортного средства.</p>`
            break;
        case 5:
            claim_name_short[i] = ' неустойки за несоблюдение сроков выплаты страхового возмещения по договору ОСАГО ';
            break;
        default:
        }

        if (paymentVoluntary[i].type.options.selectedIndex != 5) {
        //"Собираем" абзац про анализ сроков 20 и 21 дней
        analize_period_paragraf_help_str = `${claim_add_motivation[i]}
        <p>Заявитель обратился в ${fo_name_accusative} ${claim_name[i]} 
        ${paymentVoluntary[i].app_day_form}, следовательно, последним днем срока осуществления 
        выплаты ${claim_name_short[i]} является ${paymentVoluntary[i].last_day_form}, а неустойка подлежит начислению с 
        ${paymentVoluntary[i].penalty_day_form}.</p>`

        //Анализ наличия ранее сформированного абзаца про анализ сроков 20 и 21 дней (и удаление, если уже сформирован)
        if (!court_set.has(analize_period_paragraf_help_str)) {
            court_set.add(analize_period_paragraf_help_str);
            analize_period_paragraf[i] = analize_period_paragraf_help_str;
        } else {
            analize_period_paragraf[i] = "";
        }

        //"Собираем" абзац про выплату
        payment_paragraf[i] = `<p>${paymentVoluntary[i].getDateFormatted()} ${fo_name_nominative} ${make_a_payment} выплату ${claim_name_short[i]} в размере 
        ${makeRubText_genitive(paymentVoluntary[i].summ)}.</p>`
        //, что подтверждается платежным поручением от ${formatDate(new Date(pay_date[i]))} № ${payment_order[i]}

        //"Собираем" абзац с выводами по каждому платежу
        if (paymentVoluntary[i].days_delay <= 0) {
            payment_conclusion_paragraf[i] = `<p>Таким образом, выплата в размере ${makeRubText_genitive(paymentVoluntary[i].summ)} произведена в установленный 
            Законом № 40-ФЗ срок, в силу чего неустойка на указанную сумму не начисляется.</p>`
        } else {
            payment_conclusion_paragraf[i] = `<p>Таким образом, неустойка на сумму ${makeRubText_nominative(paymentVoluntary[i].summ)} подлежит расчету за период с 
            ${paymentVoluntary[i].penalty_day_form} по ${paymentVoluntary[i].getDateFormatted()} (${declinationDays(paymentVoluntary[i].days_delay)}).</p>
            <p>В соответствии с требованиями, установленными пунктом 21 статьи 12 Закона № 40-ФЗ, 
            размер неустойки, подлежащей выплате за период с ${paymentVoluntary[i].penalty_day_form} по ${paymentVoluntary[i].getDateFormatted()}, 
            составляет ${makeRubText_nominative(paymentVoluntary[i].penalty_summ)} (${makeRubText_nominative(paymentVoluntary[i].summ)} × 
            ${declinationDays(paymentVoluntary[i].days_delay)} × 1%).</p>`
        }
        payment_penalty_paragraf[i] = "";
        } else {
        analize_period_paragraf[i] = "";
        payment_paragraf[i] = "";
        payment_conclusion_paragraf[i] = "";

        if (paymentVoluntary[i].ndfl.checked) {
            payment_penalty_paragraf[i] = `<p>${paymentVoluntary[i].getDateFormatted()} ${fo_name_nominative} ${make_a_payment} выплату ${claim_name_short[i]} исходя из суммы 
            ${makeRubText_genitive(paymentVoluntary[i].summ)} (с учетом удержания 13% НДФЛ), в связи с чем Заявителю было перечислено 
            ${makeRubText_genitive(paymentVoluntary[i].summ - paymentVoluntary[i].ndfl_summ)}.</p>
            <p>${paymentVoluntary[i].getDateFormatted()} ${fo_name_nominative} ${fulfill} свою обязанность как налогового агента по перечислению налога на доход физического лица (НДФЛ) в размере 
            ${makeRubText_genitive(paymentVoluntary[i].ndfl_summ)}.</p>`

            total_ndfl = total_ndfl + paymentVoluntary[i].ndfl_summ;
        } else {
            payment_penalty_paragraf[i] = `<p>${paymentVoluntary[i].getDateFormatted()} ${fo_name_nominative} ${make_a_payment} выплату ${claim_name_short[i]} в размере 
            ${makeRubText_genitive(paymentVoluntary[i].summ)}.</p>`
            // ', что подтверждается платежным поручением от ' + formatDate(new Date(pay_date[i])) + ' № ' + payment_order[i] +
        }
        }

        payment_voluntary_paragraf = payment_voluntary_paragraf + analize_period_paragraf[i] + payment_paragraf[i] + payment_conclusion_paragraf[i];
        total_payment_penalty_paragraf = total_payment_penalty_paragraf + payment_penalty_paragraf[i];
    }
    }

    //Собирание абзацев с выплатами по решению ФУ
    for (var i = 0; i < paymentFu.length; i++) {
    //Если есть решение ФУ
    if (!isNaN(paymentFu[i].getDate())) {
        //Если решение ФУ о взыскании
        if (paymentFu[i].type.options.selectedIndex == 1) {
        //Для первого требования
        fu_claims_satisfied_string_help = `указанную сумму`
        //Если данное требование было удовлетыорено ФУ
        if (paymentFu[i].claim[0].type.options.selectedIndex == 1) {
            //Создание вспомогальной текстовой переменной, содержащей перечисление всех видов страхового возмещения, взысканных решением ФУ
            fu_claims_satisfied_string = `суммы ${declensions_by_cases(paymentFu[i].claim[0].name.value)} 
                                        в размере ${makeRubText_genitive(paymentFu[i].claim[0].summ)}`
            //Создание вспомогальной текстовой переменной, содержащей перечисление всех видов страхового возмещения, взысканных решением ФУ
            //для судебной неустойки, в случае взыскания судом суммы большей, чем взыскал ФУ
            court_claims_satisfied_paragraph_help = `${declensions_by_cases(paymentFu[i].claim[0].name.value)} в размере 
            ${makeRubText_genitive(paymentFu[i].claim[0].summ)}`
        }
        //Для остальных требований (кроме первого)
        for (var j = 1; j < paymentFu[i].claim.length; j++) {
            if (paymentFu[i].claim[j].name.options.selectedIndex == 1 ||
                paymentFu[i].claim[j].name.options.selectedIndex == 2 ||
                paymentFu[i].claim[j].name.options.selectedIndex == 3 ||
                paymentFu[i].claim[j].name.options.selectedIndex == 4) {

                fu_claims_satisfied_string_help = `указанные суммы`
                //Если данное требование было удовлетыорено ФУ
                if (paymentFu[i].claim[j].type.options.selectedIndex == 1) {
                    //Создание вспомогальной текстовой переменной, содержащей перечисление всех видов страхового возмещения, взысканных решением ФУ
                    fu_claims_satisfied_string = `${fu_claims_satisfied_string}, суммы ${declensions_by_cases(paymentFu[i].claim[j].name.value)} 
                                                в размере ${makeRubText_genitive(paymentFu[i].claim[j].summ)}`
                    //Создание вспомогальной текстовой переменной, содержащей перечисление всех видов страхового возмещения, взысканных решением ФУ
                    //для судебной неустойки, в случае взыскания судом суммы большей, чем взыскал ФУ
                    court_claims_satisfied_paragraph_help = `${court_claims_satisfied_paragraph_help}, 
                                                            ${declensions_by_cases(paymentFu[i].claim[j].name.value)} 
                                                            в размере ${makeRubText_genitive(paymentFu[i].claim[j].summ)}`
                }
            }
        }

        //Формирование абзаца для судебной неустойки, в случае взыскания судом суммы большей, чем взыскал ФУ
        court_claims_satisfied_paragraph[i] = `<p>Принимая Решение финансового уполномоченного от ${paymentFu[i].getDateFormatted()} о взыскании с 
            ${fo_name_genitive} в пользу Заявителя ${court_claims_satisfied_paragraph_help}, 
            Финансовый уполномоченный исходил из отсутствия у ${fo_name_genitive} 
            обязательства по выплате страхового возмещения в большем размере.</p>
            <p>Учитывая, что Решение финансового уполномоченного от ${paymentFu[i].getDateFormatted()} вынесено 
            официальным должностным лицом в рамках предоставленных ему публичных полномочий, 
            финансовая организация была вправе разумно полагаться на содержащиеся в нем выводы 
            и ссылаться на них в своих взаимоотношениях с потребителем финансовых услуг.</p>
            <p>При таких обстоятельствах Финансовый уполномоченный приходит к выводу, 
            что в рассматриваемом случае взыскание неустойки в связи с частичной выплатой 
            Заявителю страхового возмещения не основано на законе.</p>`
        court_claims_satisfied_paragraph_all = court_claims_satisfied_paragraph_all + court_claims_satisfied_paragraph[i]

        //Формирование дополнительных абзацев в случае приостановления срока исполнения решения ФУ
        var payment_fu_decision_suspension_paragraph = ""
        if (paymentFu[i].suspension_type.options.selectedIndex == 1) {
            payment_fu_decision_suspension_paragraph = `${paymentFu[i].fu_decision_paragraph_motivation}
            ${paymentFu[i].fu_suspension_paragraph_motivation}${paymentFu[i].fu_court_paragraph_motivation}
            ${paymentFu[i].fu_analize_period_paragraph_motivation}${paymentFu[i].fu_execution_paragraph_motivation}`
        } else if (paymentFu[i].suspension_type.options.selectedIndex == 2) {
            payment_fu_decision_suspension_paragraph = `${paymentFu[i].fu_decision_paragraph_motivation}
            ${paymentFu[i].fu_analize_period_paragraph_motivation}${paymentFu[i].fu_execution_paragraph_motivation}`
        }

        //Если решение ФУ исполнено в срок
        if (paymentFu[i].getPayDate() <= paymentFu[i].getLastDayForPayFu()) {

            payment_fu_decision[i] = `<p>В соответствии с пунктом 1 статьи 23 Закона № 123-ФЗ решение финансового уполномоченного 
            вступает в силу по истечении десяти рабочих дней после даты его подписания финансовым уполномоченным. 
            В соответствии с пунктом 2 статьи 23 Закона № 123-ФЗ решение финансового уполномоченного подлежит исполнению 
            финансовой организацией не позднее срока, указанного в данном решении, за исключением случаев приостановления 
            исполнения данного решения, предусмотренных настоящим Федеральным законом. Срок исполнения решения финансового уполномоченного 
            устанавливается данным решением с учетом особенностей правоотношений, участником которых является потребитель финансовых услуг, 
            направивший обращение, не может быть менее десяти рабочих дней после дня вступления в силу данного решения 
            и не может превышать тридцать дней после дня вступления в силу данного решения.</p>
            ${payment_fu_decision_suspension_paragraph}
            <p>В силу статьи 24 Закона № 123-ФЗ, исполнение финансовой организацией вступившего в силу решения финансового уполномоченного признается 
            надлежащим исполнением финансовой организацией обязанностей по соответствующему договору с потребителем финансовых услуг об оказании 
            ему или в его пользу финансовой услуги.</p>
            <p>Согласно части 5 статьи 16.1 Закона № 40-ФЗ страховщик освобождается от обязанности уплаты неустойки (пени), суммы финансовой санкции и (или) 
            штрафа, если обязательства страховщика были исполнены в порядке и в сроки, которые установлены Законом № 40-ФЗ, 
            Законом № 123-ФЗ, а также если страховщик докажет, что нарушение сроков произошло вследствие непреодолимой силы или по вине потерпевшего.</p>
            <p>${paymentFu[i].getPayDateFormatted()} ${fo_name_nominative} в добровольном порядке, в полном объеме и в установленный срок исполнило 
            Решение финансового уполномоченного от ${paymentFu[i].getDateFormatted()} в части выплаты ${fu_claims_satisfied_string}, 
            в связи с чем неустойка на ${fu_claims_satisfied_string_help} не подлежит начислению и взысканию Финансовым уполномоченным.</p>`
        } else {
            claim_fu_name[i] = [];
            claim_fu_name_short[i] = [];
            claim_fu_add_motivation[i] = [];
            analize_fu_period_paragraf[i] = [];
            payment_fu_execution_paragraf[i] = [];
            payment_fu_conclusion_paragraf[i] = [];
            payment_fu_claims_paragraf[i] = "";
            for (var j = 0; j < paymentFu[i].claim.length; j++) {
                if ((paymentFu[i].claim[j].name.options.selectedIndex == 1 ||
                    paymentFu[i].claim[j].name.options.selectedIndex == 2 ||
                    paymentFu[i].claim[j].name.options.selectedIndex == 3 ||
                    paymentFu[i].claim[j].name.options.selectedIndex == 4) &&
                    paymentFu[i].claim[j].type.options.selectedIndex == 1) {
                        switch (paymentFu[i].claim[j].name.options.selectedIndex) {
                        case 1:
                            claim_fu_name[i][j] = ' с заявлением о выплате страхового возмещения '
                            claim_fu_name_short[i][j] = ' страхового возмещения '
                            claim_fu_add_motivation[i][j] = ''
                            break;
                        case 2:
                            claim_fu_name[i][j] = ' с заявлением о выплате УТС '
                            claim_fu_name_short[i][j] = ' УТС '
                            claim_fu_add_motivation[i][j] = `<p>Согласно пункту 20 Постановление Пленума № 
                            58 при наступлении страхового случая потерпевший обязан не только уведомить 
                            страховщика о его наступлении в сроки, установленные Правилами ОСАГО, 
                            но и направить страховщику заявление о страховом возмещении и документы, 
                            предусмотренные Правилами ОСАГО. В заявлении о страховом возмещении потерпевший 
                            должен также сообщить о другом известном ему на момент подачи заявления ущербе, 
                            кроме расходов на восстановление поврежденного имущества, который подлежит 
                            возмещению  (например, об утрате товарной стоимости, о расходах на эвакуацию 
                            транспортного средства с места дорожно-транспортного происшествия и т.п.).</p>
                            <p>Согласно пункту 37 Постановление Пленума № 58 к реальному ущербу, возникшему 
                            в результате дорожно-транспортного происшествия, наряду со стоимостью ремонта 
                            и запасных частей относится также утрата товарной стоимости, которая представляет 
                            собой уменьшение стоимости транспортного средства, вызванное преждевременным 
                            ухудшением товарного (внешнего) вида транспортного средства и его эксплуатационных 
                            качеств в результате снижения прочности и долговечности отдельных деталей, узлов 
                            и агрегатов, соединений и защитных покрытий вследствие дорожно-транспортного 
                            происшествия и последующего ремонта.</p>`
                            break;
                        case 3:
                            claim_fu_name[i][j] = ' с заявлением о выплате расходов на эвакуацию Транспортного средства '
                            claim_fu_name_short[i][j] = ' расходов на эвакуацию Транспортного средства '
                            claim_fu_add_motivation[i][j] = `<p>Согласно абзацу 2 пункта 4.12 Правил ОСАГО, 
                            при причинении вреда имуществу потерпевшего возмещению в пределах страховой 
                            суммы подлежат иные расходы, произведенные потерпевшим в связи с причиненным 
                            вредом (в том числе эвакуация транспортного средства с места дорожно-транспортного 
                            происшествия, хранение поврежденного транспортного средства, доставка пострадавших 
                            в медицинскую организацию).</p>
                            <p>Учитывая изложенное, Финансовый уполномоченный 
                            приходит к выводу о том, что расходы на эвакуацию Транспортного средства относятся 
                            к страховому возмещению, в силу чего неустойка за несоблюдение сроков выплаты страхового 
                            возмещения подлежит начислению на сумму расходов на эвакуацию Транспортного средства.</p>`
                            break;
                        case 4:
                            claim_fu_name[i][j] = ' с заявлением о выплате расходов на хранение Транспортного средства '
                            claim_fu_name_short[i][j] = ' расходов на хранение Транспортного средства '
                            claim_fu_add_motivation[i][j] = `<p>Согласно абзацу 2 пункта 4.12 Правил ОСАГО, 
                            при причинении вреда имуществу потерпевшего возмещению в пределах страховой 
                            суммы подлежат иные расходы, произведенные потерпевшим в связи с причиненным 
                            вредом (в том числе эвакуация транспортного средства с места дорожно-транспортного 
                            происшествия, хранение поврежденного транспортного средства, доставка пострадавших 
                            в медицинскую организацию).</p>
                            <p>Учитывая изложенное, Финансовый уполномоченный 
                            приходит к выводу о том, что расходы на хранение Транспортного средства относятся 
                            к страховому возмещению, в силу чего неустойка за несоблюдение сроков выплаты страхового 
                            возмещения подлежит начислению на сумму расходов на хранение Транспортного средства.</p>`
                            break;
                        case 5:
                            claim_fu_name_short[i][j] = ' неустойки за несоблюдение сроков выплаты страхового возмещения по договору ОСАГО '
                            break;
                        default:
                        }
                        //"Собираем" абзац про анализ сроков 20 и 21 дней
                        analize_period_paragraf_help_str = `${claim_fu_add_motivation[i][j]}
                        <p>Заявитель обратился в ${fo_name_accusative} ${claim_fu_name[i][j]} 
                        ${paymentFu[i].claim[j].app_day_form}, следовательно, 
                        последним днем срока осуществления выплаты ${claim_fu_name_short[i][j]} является 
                        ${paymentFu[i].claim[j].last_day_form}, а неустойка подлежит начислению 
                        с ${paymentFu[i].claim[j].penalty_day_form}.</p>`

                        //Анализ наличия ранее сформированного абзаца про анализ сроков 20 и 21 дней (и удаление, если уже сформирован)
                        if (!court_set.has(analize_period_paragraf_help_str)) {
                            court_set.add(analize_period_paragraf_help_str);
                            analize_fu_period_paragraf[i][j] = analize_period_paragraf_help_str;
                        } else {
                            analize_fu_period_paragraf[i][j] = "";
                        }

                        //"Собираем" абзац про выплату
                        payment_fu_execution_paragraf[i][j] = `<p>${paymentFu[i].getPayDateFormatted()} 
                        ${fo_name_instrumental} исполнено Решение финансового уполномоченного от ${paymentFu[i].getDateFormatted()} 
                        в части ${declensions_by_cases(paymentFu[i].claim[j].name.value)} в размере 
                        ${makeRubText_genitive(paymentFu[i].claim[j].summ)}.</p>`
                        // ', что подтверждается платежным поручением от ' + ${formatDate(new Date(pay_date[i]))} + ' № ' + ${payment_order[i]} +
                        
                        //Собираем абзац с расчетом неустойки
                        payment_fu_conclusion_paragraf[i][j] = `<p>Таким образом, неустойка на сумму 
                        ${makeRubText_nominative(paymentFu[i].claim[j].summ)} подлежит расчету за период с 
                        ${paymentFu[i].claim[j].penalty_day_form} по ${paymentFu[i].getPayDateFormatted()} 
                        (${declinationDays(paymentFu[i].claim[j].days_delay)}).</p>
                        <p>В соответствии с требованиями, установленными пунктом 21 статьи 12 Закона № 40-ФЗ, 
                        размер неустойки, подлежащей выплате за период с ${paymentFu[i].claim[j].penalty_day_form} по 
                        ${paymentFu[i].getPayDateFormatted()}, составляет ${makeRubText_nominative(paymentFu[i].claim[j].penalty_summ)} 
                        (${makeRubText_nominative(paymentFu[i].claim[j].summ)} × ${declinationDays(paymentFu[i].claim[j].days_delay)} 
                        × 1%).</p>`

                        payment_fu_claims_paragraf[i] = payment_fu_claims_paragraf[i] + analize_fu_period_paragraf[i][j] + payment_fu_execution_paragraf[i][j] + payment_fu_conclusion_paragraf[i][j];
                }
            }

            payment_fu_decision[i] = `<p>В соответствии с пунктом 1 статьи 23 Закона № 123-ФЗ решение финансового уполномоченного 
            вступает в силу по истечении десяти рабочих дней после даты его подписания финансовым уполномоченным. 
            В соответствии с пунктом 2 статьи 23 Закона № 123-ФЗ решение финансового уполномоченного подлежит исполнению 
            финансовой организацией не позднее срока, указанного в данном решении, за исключением случаев приостановления 
            исполнения данного решения, предусмотренных настоящим Федеральным законом. Срок исполнения решения финансового уполномоченного 
            устанавливается данным решением с учетом особенностей правоотношений, участником которых является потребитель финансовых услуг, 
            направивший обращение, не может быть менее десяти рабочих дней после дня вступления в силу данного решения 
            и не может превышать тридцать дней после дня вступления в силу данного решения.</p>
            ${payment_fu_decision_suspension_paragraph}
            <p>Согласно части 5 статьи 16.1 Закона № 40-ФЗ страховщик освобождается от обязанности уплаты неустойки (пени), суммы финансовой санкции и (или) 
            штрафа, если обязательства страховщика были исполнены в порядке и в сроки, которые установлены Законом № 40-ФЗ, 
            Законом № 123-ФЗ, а также если страховщик докажет, что нарушение сроков произошло вследствие непреодолимой силы или по вине потерпевшего.</p>
            <p> ${fo_name_nominative} исполнило Решение финансового уполномоченного от ${paymentFu[i].getDateFormatted()} с нарушением срока, установленного Законом № 123-ФЗ, в связи 
            с чем, Финансовый уполномоченный приходит к выводу об отсутствии оснований, предусмотренных частью 5 статьи 16.1 Закона № 40-ФЗ в части освобождения 
            ${fo_name_genitive} от обязанности уплаты неустойки.</p>${payment_fu_claims_paragraf[i]}`
        }
        payment_fu_paragraf = payment_fu_paragraf + payment_fu_decision[i];
        }
    }
    }

    //Собирание абзацев с выплатами по решению судов
    for (var i = 0; i < paymentCourt.length; i++) {
        //Если есть решение суда
        if (!isNaN(paymentCourt[i].getDate())) {
            claim_court_name[i] = [];
            claim_court_name_short[i] = [];
            claim_court_add_motivation[i] = [];
            analize_court_period_paragraf[i] = [];
            payment_court_execution_paragraf[i] = [];
            payment_court_conclusion_paragraf[i] = [];
            payment_court_claims_paragraf[i] = "";
            payment_court_claims_paragraf_without_analize[i] = "";

            court_claims_satisfied_string = declensions_by_cases(paymentCourt[i].claim[0].name.value) +
                                        " в размере " +
                                        makeRubText_genitive(paymentCourt[i].claim[0].summ);

            for (var j = 1; j < paymentCourt[i].claim.length; j++) {
            if ((paymentCourt[i].claim[j].name.options.selectedIndex == 1 ||
                paymentCourt[i].claim[j].name.options.selectedIndex == 2 ||
                paymentCourt[i].claim[j].name.options.selectedIndex == 3 ||
                paymentCourt[i].claim[j].name.options.selectedIndex == 4) &&
                paymentCourt[i].claim[j].type.options.selectedIndex == 1) {
                    court_claims_satisfied_string = court_claims_satisfied_string + ", сумма " + declensions_by_cases(paymentCourt[i].claim[j].name.value) +
                                                " в размере " +
                                                makeRubText_genitive(paymentCourt[i].claim[j].summ);
            }
            }

            for (var j = 0; j < paymentCourt[i].claim.length; j++) {
            if ((paymentCourt[i].claim[j].name.options.selectedIndex == 1 ||
                paymentCourt[i].claim[j].name.options.selectedIndex == 2 ||
                paymentCourt[i].claim[j].name.options.selectedIndex == 3 ||
                paymentCourt[i].claim[j].name.options.selectedIndex == 4) &&
                paymentCourt[i].claim[j].type.options.selectedIndex == 1) {
                    switch (paymentCourt[i].claim[j].name.options.selectedIndex) {
                    case 1:
                        claim_court_name[i][j] = ' с заявлением о выплате страхового возмещения '
                        claim_court_name_short[i][j] = ' страхового возмещения '
                        claim_court_add_motivation[i][j] = ''
                        break;
                    case 2:
                        claim_court_name[i][j] = ' с заявлением о выплате УТС '
                        claim_court_name_short[i][j] = ' УТС '
                        claim_court_add_motivation[i][j] = `<p>Согласно пункту 20 Постановление Пленума № 
                        58 при наступлении страхового случая потерпевший обязан не только уведомить 
                        страховщика о его наступлении в сроки, установленные Правилами ОСАГО, 
                        но и направить страховщику заявление о страховом возмещении и документы, 
                        предусмотренные Правилами ОСАГО. В заявлении о страховом возмещении потерпевший 
                        должен также сообщить о другом известном ему на момент подачи заявления ущербе, 
                        кроме расходов на восстановление поврежденного имущества, который подлежит 
                        возмещению  (например, об утрате товарной стоимости, о расходах на эвакуацию 
                        транспортного средства с места дорожно-транспортного происшествия и т.п.).</p>
                        <p>Согласно пункту 37 Постановление Пленума № 58 к реальному ущербу, возникшему 
                        в результате дорожно-транспортного происшествия, наряду со стоимостью ремонта 
                        и запасных частей относится также утрата товарной стоимости, которая представляет 
                        собой уменьшение стоимости транспортного средства, вызванное преждевременным 
                        ухудшением товарного (внешнего) вида транспортного средства и его эксплуатационных 
                        качеств в результате снижения прочности и долговечности отдельных деталей, узлов 
                        и агрегатов, соединений и защитных покрытий вследствие дорожно-транспортного 
                        происшествия и последующего ремонта.</p>`
                        break;
                    case 3:
                        claim_court_name[i][j] = ' с заявлением о выплате расходов на эвакуацию Транспортного средства '
                        claim_court_name_short[i][j] = ' расходов на эвакуацию Транспортного средства '
                        claim_court_add_motivation[i][j] = `<p>Согласно абзацу 2 пункта 4.12 Правил ОСАГО, 
                        при причинении вреда имуществу потерпевшего возмещению в пределах страховой 
                        суммы подлежат иные расходы, произведенные потерпевшим в связи с причиненным 
                        вредом (в том числе эвакуация транспортного средства с места дорожно-транспортного 
                        происшествия, хранение поврежденного транспортного средства, доставка пострадавших 
                        в медицинскую организацию).</p>
                        <p>Учитывая изложенное, Финансовый уполномоченный 
                        приходит к выводу о том, что расходы на эвакуацию Транспортного средства относятся 
                        к страховому возмещению, в силу чего неустойка за несоблюдение сроков выплаты страхового 
                        возмещения подлежит начислению на сумму расходов на эвакуацию Транспортного средства.</p>`
                        break;
                    case 4:
                        claim_court_name[i][j] = ' с заявлением о выплате расходов на хранение Транспортного средства '
                        claim_court_name_short[i][j] = ' расходов на хранение Транспортного средства '
                        claim_court_add_motivation[i][j] = `<p>Согласно абзацу 2 пункта 4.12 Правил ОСАГО, 
                        при причинении вреда имуществу потерпевшего возмещению в пределах страховой 
                        суммы подлежат иные расходы, произведенные потерпевшим в связи с причиненным 
                        вредом (в том числе эвакуация транспортного средства с места дорожно-транспортного 
                        происшествия, хранение поврежденного транспортного средства, доставка пострадавших 
                        в медицинскую организацию).</p>
                        <p>Учитывая изложенное, Финансовый уполномоченный 
                        приходит к выводу о том, что расходы на хранение Транспортного средства относятся 
                        к страховому возмещению, в силу чего неустойка за несоблюдение сроков выплаты страхового 
                        возмещения подлежит начислению на сумму расходов на хранение Транспортного средства.</p>`
                        break;
                    case 5:
                        claim_court_name_short[i][j] = ` неустойки за несоблюдение сроков выплаты страхового возмещения по 
                        договору ОСАГО `
                        break;
                    default:
                    }
                    //"Собираем" абзац про анализ сроков 20 и 21 дней
                    analize_period_paragraf_help_str = `${claim_court_add_motivation[i][j]}
                    <p>Заявитель обратился в ${fo_name_accusative} ${claim_court_name[i][j]} 
                    ${paymentCourt[i].claim[j].app_day_form}, следовательно, последним днем срока осуществления 
                    выплаты ${claim_court_name_short[i][j]} является ${paymentCourt[i].claim[j].last_day_form}, а неустойка подлежит 
                    начислению с ${paymentCourt[i].claim[j].penalty_day_form}.</p>`

                    //Анализ наличия ранее сформированного абзаца про анализ сроков 20 и 21 дней (и удаление, если уже сформирован)
                    if (!court_set.has(analize_period_paragraf_help_str)) {
                    court_set.add(analize_period_paragraf_help_str)
                    analize_court_period_paragraf[i][j] = analize_period_paragraf_help_str
                    } else {
                    analize_court_period_paragraf[i][j] = ""
                    }

                    //"Собираем" абзац про выплату
                    payment_court_execution_paragraf[i][j] = `<p>${paymentCourt[i].getPayDateFormatted()} ${fo_name_instrumental} 
                    исполнено Решение суда от ${paymentCourt[i].getDateFormatted()} в части 
                    ${declensions_by_cases(paymentCourt[i].claim[j].name.value)} в размере 
                    ${makeRubText_genitive(paymentCourt[i].claim[j].summ)}.</p>`
                    // ', что подтверждается платежным поручением от ' + formatDate(new Date(pay_date[i])) + ' № ' + payment_order[i] +

                    //Собираем абзац с расчетом неустойки
                    payment_court_conclusion_paragraf[i][j] = `<p>Таким образом, неустойка на сумму 
                    ${makeRubText_nominative(paymentCourt[i].claim[j].summ)} подлежит расчету за период с 
                    ${paymentCourt[i].claim[j].penalty_day_form} по ${paymentCourt[i].getPayDateFormatted()} 
                    (${declinationDays(paymentCourt[i].claim[j].days_delay)}).</p>
                    <p>В соответствии с требованиями, установленными пунктом 21 статьи 12 Закона № 40-ФЗ, 
                    размер неустойки, подлежащей выплате за период с ${paymentCourt[i].claim[j].penalty_day_form} по 
                    ${paymentCourt[i].getPayDateFormatted()}, составляет ${makeRubText_nominative(paymentCourt[i].claim[j].penalty_summ)} 
                    (${makeRubText_nominative(paymentCourt[i].claim[j].summ)} × 
                    ${declinationDays(paymentCourt[i].claim[j].days_delay)} × 1%).</p>`

                    payment_court_claims_paragraf[i] = payment_court_claims_paragraf[i] + analize_court_period_paragraf[i][j] + payment_court_execution_paragraf[i][j] + payment_court_conclusion_paragraf[i][j];
                    payment_court_claims_paragraf_without_analize[i] = payment_court_claims_paragraf_without_analize[i] + payment_court_execution_paragraf[i][j] + payment_court_conclusion_paragraf[i][j];
            }
            }

            if (paymentCourt[i].fu_claim_set_type == 0) {
                payment_court_decision[i] = payment_court_claims_paragraf[i];
            } else {
                payment_court_decision[i] = `<p>Неустойка является мерой гражданско-правовой ответственности, которая при наличии условий, 
                необходимых для наступления гражданско-правовой ответственности, подлежит взысканию в случае неисполнения или 
                ненадлежащего исполнения обязательства, то есть при наличии противоправного поведения.</p>
                <p>В силу части 1 статьи 2 Закона № 123-ФЗ должность финансового уполномоченного учреждена для рассмотрения обращений 
                потребителей финансовых услуг об удовлетворении требований имущественного характера, предъявляемых к финансовым 
                организациям, оказавшим им финансовые услуги.</p>
                <p>Финансовая организация, являясь участником обязательного взаимодействия с финансовым уполномоченным, в силу пункта 4 
                части 3 статьи 28 Закона № 123-ФЗ обязана добровольно исполнять решения финансового уполномоченного, основываясь 
                на принятом им решении при установлении объема своих обязательств перед потребителем финансовых услуг.</p>
                <p>В силу статьи 24 Закона № 123-ФЗ исполнение финансовой организацией вступившего в силу решения финансового 
                уполномоченного признается надлежащим исполнением финансовой организацией обязанностей по соответствующему договору 
                с потребителем финансовых услуг об оказании ему или в его пользу финансовой услуги.</p>
                <p>В случае неисполнения финансовой организацией вступившего в силу решения финансового уполномоченного либо условий 
                соглашения финансовый уполномоченный выдает потребителю финансовых услуг удостоверение, являющееся исполнительным 
                документом, форма которого устанавливается Правительством Российской Федерации (часть 3 статьи 23 Закона № 123-ФЗ).</p>
                ${court_claims_satisfied_paragraph_all} 
                <p>Вместе с тем, Решением Суда от ${paymentCourt[i].getDateFormatted()} с ${fo_name_genitive} в пользу Заявителя взыскана, 
                в том числе, сумма ${court_claims_satisfied_string}. Решение Суда вступило в законную силу 
                ${paymentCourt[i].getInForceDateFormatted()}.</p>
                <p>Согласно части 2 статьи 13 Гражданского процессуального кодекса Российской Федерации (далее – ГПК РФ), вступившие 
                в законную силу судебные постановления, а также законные распоряжения, требования, поручения, вызовы и обращения судов 
                являются обязательными для всех без исключения органов государственной власти, органов местного самоуправления, 
                общественных объединений, должностных лиц, граждан, организаций и подлежат неукоснительному исполнению на всей 
                территории Российской Федерации.</p>
                <p>Таким образом, обязанность ${fo_name_genitive} по выплате суммы ${court_claims_satisfied_string}, 
                на основании Решения Суда от ${paymentCourt[i].getDateFormatted()}, возникла с момента вступления решения суда 
                в законную силу – ${paymentCourt[i].getInForceDateFormatted()}.</p>
                ${payment_court_claims_paragraf_without_analize[i]}`
            }
            payment_court_paragraf = payment_court_paragraf + payment_court_decision[i];
        }
    }

    //Формирование вспомогательной подстроки строки со сложением нескольких НАЧИСЛЕННЫХ неустоек
    //добавление открывающейся скобки и первой выплаты, в случае, если количество выплат больше 1
    let stop_ind_1 = 0;
    let fu_index = 0;
    let fu_claim_index = 0;
    let court_index = 0;
    let court_claim_index = 0;
    let stop_ind_2 = false;
    for (var i = 0; i < paymentVoluntary.length; i++) {
        if (paymentVoluntary[i].penalty_summ > 0) {
            total_penalty_summ_accrued_string = ' (' + makeRubText_nominative(paymentVoluntary[i].penalty_summ);
            stop_ind_1 = i + 1;
            break;
        }
    }

    // добавление выплат, в случае, если их было больше 1
    for (var i = stop_ind_1; i < paymentVoluntary.length; i++) {
        if (paymentVoluntary[i].penalty_summ > 0) {
            total_penalty_summ_accrued_string = total_penalty_summ_accrued_string + ' + ' + makeRubText_nominative(paymentVoluntary[i].penalty_summ);
            stop_ind_2 = true;
        }
    }

    //Добавление выплат на оснвоании решения ФУ
    if (stop_ind_1 > 0) {
        for (var i = 0; i < paymentFu.length; i++) {
            for (var j = 0; j < paymentFu[i].claim.length; j++) {
                if (paymentFu[i].claim[j].penalty_summ > 0) {
                    total_penalty_summ_accrued_string = total_penalty_summ_accrued_string + ' + ' + makeRubText_nominative(paymentFu[i].claim[j].penalty_summ);
                    stop_ind_2 = true;
                }
            }
        }
    } else {
        for (var i = 0; i < paymentFu.length; i++) {
            for (var j = 0; j < paymentFu[i].claim.length; j++) {
                if (paymentFu[i].claim[j].penalty_summ > 0) {
                    total_penalty_summ_accrued_string = ' (' + makeRubText_nominative(paymentFu[i].claim[j].penalty_summ);
                    fu_index = i;
                    fu_claim_index = j + 1;
                    stop_ind_1 = i + 1;
                    break;
                }
            }
            if (stop_ind_1 > 0) {
                break;
            }
        }

        for (var i = fu_index; i < paymentFu.length; i++) {
            for (var j = fu_claim_index; j < paymentFu[i].claim.length; j++) {
                if (paymentFu[i].claim[j].penalty_summ > 0) {
                    total_penalty_summ_accrued_string = total_penalty_summ_accrued_string + ' + ' + makeRubText_nominative(paymentFu[i].claim[j].penalty_summ);
                    stop_ind_2 = true;
                }
            }
        }
    }

    //Добавление выплат на основании решения суда
    if (stop_ind_1 > 0) {
        for (var i = 0; i < paymentCourt.length; i++) {
            for (var j = 0; j < paymentCourt[i].claim.length; j++) {
                if (paymentCourt[i].claim[j].penalty_summ > 0) {
                    total_penalty_summ_accrued_string = total_penalty_summ_accrued_string + ' + ' + makeRubText_nominative(paymentCourt[i].claim[j].penalty_summ);
                    stop_ind_2 = true;
                }
            }
        }
    } else {
    for (var i = 0; i < paymentCourt.length; i++) {
        for (var j = 0; j < paymentCourt[i].claim.length; j++) {
            if (paymentCourt[i].claim[j].penalty_summ > 0) {
                total_penalty_summ_accrued_string = ' (' + makeRubText_nominative(paymentCourt[i].claim[j].penalty_summ);
                court_index = i;
                court_claim_index = j + 1;
                break;
            }
        }
        if (stop_ind_1 > 0) {
            break;
        }
    }

    for (var i = court_index; i < paymentCourt.length; i++) {
        for (var j = court_claim_index; j < paymentCourt[i].claim.length; j++) {
            if (paymentCourt[i].claim[j].penalty_summ > 0) {
                total_penalty_summ_accrued_string = total_penalty_summ_accrued_string + ' + ' + makeRubText_nominative(paymentCourt[i].claim[j].penalty_summ);
                stop_ind_2 = true;
            }
        }
    }
    }

    //добавление закрывающейся скобки, если количество выплат больше 1
    if (stop_ind_2) {
        total_penalty_summ_accrued_string = total_penalty_summ_accrued_string + ')'
    } else {
        total_penalty_summ_accrued_string = '';
    }

    //Формирование вспомогательной подстроки строки со сложением нескольких ВЫПЛАЧЕННЫХ неустоек
    //добавление открывающейся скобки и первой выплаты, в случае, если количество выплат больше 1
    stop_ind_1 = 0;
    stop_ind_2 = false;
    for (var i = 0; i < paymentVoluntary.length; i++) {
        if (paymentVoluntary[i].type.options.selectedIndex == 5) {
            total_penalty_summ_paid_string = ' (' + makeRubText_nominative(paymentVoluntary[i].summ);
            stop_ind_1 = i + 1;
            break
        }
    }

    // добавление выплат, в случае, если их было больше 1
    for (var i = stop_ind_1; i < paymentVoluntary.length; i++) {
        if (paymentVoluntary[i].type.options.selectedIndex == 5) {
            total_penalty_summ_paid_string = total_penalty_summ_paid_string + ' + ' + makeRubText_nominative(paymentVoluntary[i].summ);
            stop_ind_2 = true;
        }
    }

    //добавление закрывающейся скобки, если количество выплат больше 1
    if (stop_ind_2) {
        total_penalty_summ_paid_string = total_penalty_summ_paid_string + ')'
    } else {
        total_penalty_summ_paid_string = '';
    }

    //Абзац про общий размер начисленной неустойки
    if (total_penalty_summ_accrued > 0) {
        total_penalty_summ_accrued_paragraf = `<p>Следовательно, общий размер начисленной неустойки составляет 
        ${makeRubText_genitive(total_penalty_summ_accrued)}${total_penalty_summ_accrued_string}.</p>`
    } else {
        total_penalty_summ_accrued_paragraf = '';
    }

    //Абзац про общий размер выплаченной неустойки
    if (total_penalty_summ_paid > 0) {
        total_penalty_summ_paid_paragraf = `<p>Следовательно, общий размер неустойки, добровольно выплаченной 
        ${fo_name_instrumental}, составляет 
        ${makeRubText_genitive(total_penalty_summ_paid)} ${total_penalty_summ_paid_string}.</p>`
    } else {
        total_penalty_summ_paid_paragraf = '';
    }

    if (total_penalty_summ_accrued > max_summ) {
        total_penalty_summ_accrued = max_summ;
    if (max_summ == 400000) {
        max_summ_paragraf = `<p>В силу пункта 6 статьи 16.1 Закона № 40-ФЗ общий размер неустойки (пени), 
        суммы финансовой санкции, которые подлежат выплате потерпевшему – физическому лицу, не может 
        превышать размер страховой суммы по виду причиненного вреда, установленный Законом № 40-ФЗ.</p>
        <p>Согласно статье 7 Закона № 40-ФЗ страховая сумма, в пределах которой страховщик при наступлении 
        каждого страхового случая (независимо от их числа в течение срока действия договора обязательного 
        страховая) обязуется возместить потерпевшим причиненный вред, составляет: в части возмещения вреда, 
        причиненного имуществу каждого потерпевшего, ${makeRubText_nominative(max_summ)}.</p>`
    } else {
        max_summ_paragraf = `<p>В силу пункта 6 статьи 16.1 Закона № 40-ФЗ общий размер неустойки (пени), 
        суммы финансовой санкции, которые подлежат выплате потерпевшему – физическому лицу, не может 
        превышать размер страховой суммы по виду причиненного вреда, установленный Законом № 40-ФЗ.</p>
        <p>Согласно статье 7 Закона № 40-ФЗ страховая сумма, в пределах которой страховщик при наступлении 
        каждого страхового случая (независимо от их числа в течение срока действия договора обязательного 
        страховая) обязуется возместить потерпевшим причиненный вред, составляет: в части возмещения вреда, 
        причиненного имуществу каждого потерпевшего, 400 000 рублей 00 копеек.</p>
        <p>В соответствии с пунктом 4 статьи 11.1 Закона № 40-ФЗ в случае оформления документов 
        о дорожно-транспортном происшествии без участия уполномоченных на то сотрудников полиции 
        размер страхового возмещения, причитающегося потерпевшему в счет возмещения вреда, 
        причиненного его транспортному средству, не может превышать ${makeRubText_nominative(max_summ)}.</p>`
    }
    }

    if ((total_penalty_summ_accrued > total_penalty_summ_paid) && (total_penalty_summ_paid > 0)) {
        summary_paragraf = `<p>Учитывая вышеизложенное, требование Заявителя о взыскании 
        неустойки за несоблюдение срока выплаты страхового возмещения подлежит удовлетворению в размере 
        ${makeRubText_genitive(total_penalty_summ_accrued - total_penalty_summ_paid)} 
        (${makeRubText_nominative(total_penalty_summ_accrued)} - ${makeRubText_nominative(total_penalty_summ_paid)}).</p>`
    } else if (total_penalty_summ_accrued > total_penalty_summ_paid) {
        summary_paragraf = `<p>Учитывая вышеизложенное, требование Заявителя о взыскании 
        неустойки за несоблюдение срока выплаты страхового возмещения подлежит удовлетворению в размере 
        ${makeRubText_genitive(total_penalty_summ_accrued)}.</p>`
    } else {
        summary_paragraf = `<p>Учитывая вышеизложенное, требование Заявителя о взыскании 
        неустойки за несоблюдение срока выплаты страхового возмещения не подлежит удовлетворению.</p>`
    }

    if (total_ndfl > 0) {
        ndfl_motivation = ndfl_motivation_on + `<p>Следовательно, ${fo_name_nominative} при выплате 
        неустойки в связи с нарушением срока выплаты страхового возмещения в рамках договора ОСАГО 
        обоснованно ${keep} сумму НДФЛ в размере ${makeRubText_genitive(total_ndfl)}, 
        рассчитанную следующим образом: (${makeRubText_genitive(total_penalty_summ_paid)} 
        × 13%).</p>`
    }

    main_penalty_paragraph = first_paragraf +
                             standart_motivation +
                             article_191 + article_193 +
                             payment_voluntary_paragraf +
                             payment_fu_paragraf +
                             payment_court_paragraf +
                             total_penalty_summ_accrued_paragraf +
                             max_summ_paragraf +
                             total_payment_penalty_paragraf +
                             ndfl_motivation +
                             total_penalty_summ_paid_paragraf +
                             summary_paragraf

    main_penalty_paragraph = main_penalty_paragraph.replaceAll("\r\n", "")
    main_penalty_paragraph = main_penalty_paragraph.replaceAll("\r", "")
    main_penalty_paragraph = main_penalty_paragraph.replaceAll("\n", "")

    out_data = {
        main_penalty_paragraph : main_penalty_paragraph,
        total_penalty_summ : (total_penalty_summ_accrued - total_penalty_summ_paid),
    }
    
    return out_data
}