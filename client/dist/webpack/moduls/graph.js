//Переменные для рисования графика SWG
import { makeRubText_nominative } from './makeRubText_nominative.js';
import { makeRubText_genitive } from './makeRubText_genitive.js';
import { declinationDays } from './declinationDays.js';
import { DAY } from './variables.js';

export function fillPenaltyGraph(swg_graph,
                 max_days_delay,
                 count_days,
                 penalty_day,
                 count_vol_days,
                 payment_vol_types,
                 payment_vol_summs,
                 count_fu_days,
                 payment_fu_summs,
                 payment_fu_types,
                 count_court_days,
                 payment_court_summs,
                 payment_court_types,
                 fu_claim_set,
                 date_sv,
                 paymentVoluntary,
                 paymentFu,
                 paymentCourt) {
  swg_graph.clear();
  var line_svg_payment = [];
  var rect_svg_payment = [];
  var text_svg_payment = [];
  var indent = 40; // отступ от краев
  var time_index = 0.9; // доля от общей длины по горизонтали
  var line_21_day = [];
  var line_fu_day = [];
  var line_court_in_force_day = [];
  var line_payment = [];
  var line_payment_time = [];
  var line_payment_$ = [];
  var rect_payment = [];
  var rect_penalty_court_period = [];
  var rect_court_period_payment = [];
  var text_rect = [];
  var text_rect_court_period_payment = [];
  var text_line = [];
  var line_index = 0;
  var court_period_index = 0;
  var penalty_court_period_index = 0;
  var current_summ = 0;
  var type;
  var last_days_name = [];
  var text_21 = [];
  var vol_pay_date = [];
  var fu_pay_date = [];
  var court_pay_date = [];
  var last_day_for_pay_fu = [];
  var court_in_force_date = [];
  var penalty_day_name = [];
  var text_penalty_court_period = [];
  var penalty_court_period_from = [];
  var penalty_court_period_to = [];
  var line_penalty_court_period_from = [];
  var line_payment_time_from = [];
  var line_payment_time_to = [];
  var penalty_period_from = [];
  var penalty_period_to = [];
  var payment_fu_last_days = [];
  var payment_court_in_force_dates = [];

  var div_svg_width = $('#div_svg').width();
  var div_svg_height = $('#div_svg').height();
  // if (max_days_delay == 0) {
    max_days_delay = 500;
  // }

  //рисование системы координат
  var coordinate_system = swg_graph.polyline([indent, 0, indent, div_svg_height - indent, div_svg_width, div_svg_height - indent])
                                   .fill('none')
                                   .stroke({ color: 'black', width: 2, linecap: 'round', linejoin: 'round' });
  swg_graph.polyline([indent - 5, 20, indent, 0, indent + 5, 20])
           .fill('black')
           .stroke({ color: 'black', width: 2, linecap: 'round', linejoin: 'round' });
  swg_graph.polyline([div_svg_width - 20, div_svg_height - indent - 5, div_svg_width, div_svg_height - indent, div_svg_width - 20, div_svg_height - indent + 5])
           .fill('black')
           .stroke({ color: 'black', width: 4, linecap: 'round', linejoin: 'round' });

  //рисование наименования координатных прямых
  var x_name = swg_graph.text('days');
  x_name.move(div_svg_width - 60, div_svg_height - indent).font({ fill: 'black', family: 'Inconsolata', size: '20pt', weight: 'bold' });
  var y_name = swg_graph.text('₽');
  y_name.move(15,0).font({ fill: 'black', family: 'Inconsolata', size: '20pt', weight: 'bold' })

  for (var i = 0; i < count_days.length; i++) {
    if (count_days[i] > max_days_delay) {
      max_days_delay = count_days[i];
    }
  }

  //Рисование прямоугольников судебных неустоек
  if (paymentCourt != undefined) {
    for (var i = 0; i < paymentCourt[0].penalty_court_period.length; i++) {
      rect_penalty_court_period[court_period_index] = swg_graph.rect(4 + ((paymentCourt[0].penalty_court_period[i].end_date - paymentCourt[0].penalty_court_period[i].start_date) / DAY) * div_svg_width * time_index / max_days_delay,
                                                div_svg_height - indent - 1)
                                          .move(indent - 2 + ((paymentCourt[0].penalty_court_period[i].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                0)
                                          .fill({ color: 'grey', opacity: 0.2 })
                                          .css({ cursor: 'pointer'});

      line_penalty_court_period_from[court_period_index] = swg_graph.line(indent - 2 + ((paymentCourt[0].penalty_court_period[i].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                          div_svg_height - indent,
                                                                          indent - 2 + ((paymentCourt[0].penalty_court_period[i].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                          div_svg_height - indent + 32)
                                                                    .stroke({ color: 'grey', width: 1, opacity: 0 })
                                                                    .css({ border: 'dashed' });

      penalty_court_period_from[court_period_index] = swg_graph.text(paymentCourt[0].penalty_court_period[i].getStartDateFormatted());
      penalty_court_period_from[court_period_index].move(indent + 2 + ((paymentCourt[0].penalty_court_period[i].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                         div_svg_height - indent + 18)
                                                   .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                                                   .css({ opacity: 0 });

      penalty_court_period_to[court_period_index] = swg_graph.text(paymentCourt[0].penalty_court_period[i].getEndDateFormatted());
      penalty_court_period_to[court_period_index].move(indent - 2 + ((paymentCourt[0].penalty_court_period[i].end_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                         div_svg_height - indent)
                                                   .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                                                   .css({ opacity: 0 });

      text_penalty_court_period[court_period_index] = "Период судебной неустойки № " + (i + 1);

      rect_penalty_court_period[court_period_index].mouseover(function() {
        this.animate({ when: 'now' }).fill({ opacity: 0.6 });
        $('#total_count').html(text_penalty_court_period[rect_penalty_court_period.indexOf(this)]);
        penalty_court_period_from[rect_penalty_court_period.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
        penalty_court_period_to[rect_penalty_court_period.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
        line_penalty_court_period_from[rect_penalty_court_period.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
      });
      rect_penalty_court_period[court_period_index].mouseout(function() {
        this.animate({ when: 'now' }).fill({ opacity: 0.2 });
        $('#total_count').html('');
        penalty_court_period_from[rect_penalty_court_period.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
        penalty_court_period_to[rect_penalty_court_period.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
        line_penalty_court_period_from[rect_penalty_court_period.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
      });
      court_period_index = court_period_index + 1;
    }
  }

  //Отрисовка пунктирных прямых (21й день)
  for (var i = 0; i < count_days.length; i++) {
    if (!isNaN(count_days[i])) {
      switch (i) {
        case 0:
          penalty_day_name[i] = penalty_day[0] + ' (21-й день с даты заявления о страховом возмещении)';
          // text_21[i] = "21-й день с даты заявления о страховом возмещении";
          break;
        case 1:
          penalty_day_name[i] = penalty_day[1] + ' (21-й день с даты заявления о выплате УТС)';
          // text_21[i] = "21-й день с даты заявления о выплате УТС";
          break;
        case 2:
          penalty_day_name[i] = penalty_day[2] + ' (21-й день с даты заявления о выплате расходов на эвакуатор)';
          // text_21[i] = "21-й день с даты заявления о выплате расходов на эвакуатор";
          break;
        case 3:
          penalty_day_name[i] = penalty_day[3] + ' (21-й день с даты заявления о выплате расходов на хранение)';
          // text_21[i] = "21-й день с даты заявления о выплате расходов на хранение";
          break;
        default:
          penalty_day_name[i] = penalty_day[0] + ' (21-й день с даты заявления о страховом возмещении)';
      }
      last_days_name[i] = swg_graph.text(penalty_day_name[i]);
      line_21_day[i] = swg_graph.line(indent + (count_days[i] * div_svg_width * time_index / max_days_delay),
                                       0,
                                       indent + (count_days[i] * div_svg_width * time_index / max_days_delay),
                                       div_svg_height - indent - 1)
                                 .stroke({ color: 'blue', width: 2, opacity: 0.1 })
                                 .css({ border: 'dashed' });
     last_days_name[i].move(indent + (count_days[i] * div_svg_width * time_index / max_days_delay),
                            div_svg_height - indent - 1)
                      .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                      .css({ opacity: 0 });

     line_21_day[i].mouseover(function() {
        this.animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
        // last_days_name[line_21_day.indexOf(this)].text(penalty_day[line_21_day.indexOf(this)]);
        // $('#total_count').html(text_21[line_21_day.indexOf(this)]);
        last_days_name[line_21_day.indexOf(this)].css({ opacity: 0.5 });
      });
     line_21_day[i].mouseout(function() {
        this.animate({ duration: 1000, when: 'now'}).stroke({ opacity: 0.1 });
        // last_days_name[line_21_day.indexOf(this)].text(penalty_day_name[line_21_day.indexOf(this)]);
        // $('#total_count').html('');
        last_days_name[line_21_day.indexOf(this)].css({ opacity: 0 });
      });
    }
  }

  //отрисовка добровольных выплат
  for (var i = 0; i < count_vol_days.length; i++) {
    if (!isNaN(count_vol_days[i]) && paymentVoluntary[i].type.options.selectedIndex != 5) {
      switch (payment_vol_types[i]) {
        case 1:
          type = 0;
          break;
        case 2:
          type = 1;
          break;
        case 3:
          type = 2;
          break;
        case 4:
          type = 3;
          break;
        default:
        type = 0;
      }

      vol_pay_date[line_index] = swg_graph.text(paymentVoluntary[i].getDateFormatted() + ' (дата выплаты)');
      vol_pay_date[line_index].move(indent + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                  div_svg_height - indent)
                            .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                            .css({ opacity: 0 });

      if (count_vol_days[i] < count_days[type]) {
        line_payment[line_index] = swg_graph.line(indent - 2 + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                      div_svg_height - indent - 1 - current_summ - payment_vol_summs[i],
                                      indent - 2 + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                      div_svg_height - indent - 1 - current_summ)
                                .stroke({ color: 'green', width: 5, opacity: 0.5 })
                                .css({ cursor: 'pointer'});

        line_payment_time[line_index] = swg_graph.line(indent + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                                       div_svg_height - indent - 1 - current_summ,
                                                       indent + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                                       div_svg_height - indent - 1)
                                                 .stroke({ color: 'green', width: 1, opacity: 0 });
        line_payment_$[line_index] = swg_graph.line(indent + 1,
                                                    div_svg_height - indent - 1 - current_summ - payment_vol_summs[i],
                                                    indent + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                                    div_svg_height - indent - 1 - current_summ - payment_vol_summs[i])
                                              .stroke({ color: 'green', width: 1, opacity: 0 });


        text_line[line_index] = "Добровольная выплата № " + (line_index + 1) + " (" + paymentVoluntary[line_index].type.value + ")" + " в размере " + makeRubText_nominative(payment_vol_summs[i] * 1000) + " осуществлена в срок";

        line_payment[line_index].mouseover(function() {
          this.animate({ when: 'now' }).stroke({ opacity: 1 });
          $('#total_count').html(text_line[line_payment.indexOf(this)]);
          line_payment_time[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
          line_payment_$[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
          vol_pay_date[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
        });
        line_payment[line_index].mouseout(function() {
          this.animate({ when: 'now' }).stroke({ opacity: 0.5 });
          $('#total_count').html('');
          line_payment_time[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
          line_payment_$[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
          vol_pay_date[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
        });
        line_index = line_index + 1;

      } else {
        line_payment[line_index] = swg_graph.line(indent - 2 + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                      div_svg_height - indent - 1 - current_summ - payment_vol_summs[i],
                                      indent - 2 + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                      div_svg_height - indent - 1 - current_summ)
                                .stroke({ color: '#ffca28', width: 5, opacity: 1 });

        line_payment_time[line_index] = swg_graph.line(indent + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                                       div_svg_height - indent - 1 - current_summ,
                                                       indent + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                                       div_svg_height - indent - 1)
                                                 .stroke({ color: '#ffca28', width: 1, opacity: 0 });
        line_payment_$[line_index] = swg_graph.line(indent + 1,
                                                    div_svg_height - indent - 1 - current_summ - payment_vol_summs[i],
                                                    indent + (count_days[type] * div_svg_width * time_index / max_days_delay),
                                                    div_svg_height - indent - 1 - current_summ - payment_vol_summs[i])
                                              .stroke({ color: '#ffca28', width: 1, opacity: 0 });
        rect_payment[line_index] = swg_graph.rect((count_vol_days[i] - count_days[type]) * div_svg_width * time_index / max_days_delay,
                                      payment_vol_summs[i])
                                .move(indent + (count_days[type] * div_svg_width * time_index / max_days_delay),
                                      div_svg_height - indent - 1 - current_summ - payment_vol_summs[i])
                                .fill({ color: '#ffca28', opacity: 0.2 })
                                .stroke({ color: '#ffca28', width: 1, opacity: 1 })
                                .css({ cursor: 'pointer'});

        if (paymentCourt != undefined && paymentCourt[0].penalty_court_period.length == 0) {
          text_rect[line_index] = "Добровольная выплата № " + (line_index + 1) + " (" + paymentVoluntary[line_index].type.value + ")" + " в размере " + makeRubText_nominative(payment_vol_summs[i] * 1000) + " осуществлена с нарушением срока" + "<br>" +
                                  "Расчет неустойки: " + makeRubText_nominative(payment_vol_summs[i] * 1000) + " × " + declinationDays(count_vol_days[i] - count_days[type] + 1) + " × 1% = <b>" + makeRubText_nominative(payment_vol_summs[i] * (count_vol_days[i] - count_days[type] + 1) * 10) + "</b>";
          rect_payment[line_index].mouseover(function() {
            this.animate({ when: 'now' }).fill({ opacity: 1 });
            $('#total_count').html(text_rect[rect_payment.indexOf(this)]);
            line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
            line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
            vol_pay_date[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
          });
          rect_payment[line_index].mouseout(function() {
            this.animate({ when: 'now' }).fill({ opacity: 0.2 });
            $('#total_count').html('');
            line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
            line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
            vol_pay_date[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
          });
        } else {
          for (var k = 0; k < paymentVoluntary[i].penalty_period.length; k++) {
            rect_court_period_payment[penalty_court_period_index] = swg_graph.rect(((paymentVoluntary[i].penalty_period[k].end_date - paymentVoluntary[i].penalty_period[k].start_date) / DAY) * div_svg_width * time_index / max_days_delay,
                                                                                   payment_vol_summs[i])
                                                                             .move(indent + ((paymentVoluntary[i].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                   div_svg_height - indent - 1 - current_summ - payment_vol_summs[i])
                                                                             .fill({ color: '#ffca28', opacity: 0 })
                                                                             .css({ cursor: 'pointer'});
            line_payment_time_from[penalty_court_period_index] = swg_graph.line(indent + ((paymentVoluntary[i].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                div_svg_height - indent - 1 - current_summ,
                                                                                indent + ((paymentVoluntary[i].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                div_svg_height - indent + 32)
                                                                          .stroke({ color: '#ffca28', width: 1, opacity: 0 });

            line_payment_time_to[penalty_court_period_index] = swg_graph.line(indent + ((paymentVoluntary[i].penalty_period[k].end_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                div_svg_height - indent - 1 - current_summ,
                                                                                indent + ((paymentVoluntary[i].penalty_period[k].end_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                div_svg_height - indent - 1)
                                                                          .stroke({ color: '#ffca28', width: 1, opacity: 0 });

            penalty_period_from[penalty_court_period_index] = swg_graph.text(paymentVoluntary[i].penalty_period[k].getStartDateFormatted());
            penalty_period_from[penalty_court_period_index].move(indent + 2 + ((paymentVoluntary[i].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                               div_svg_height - indent + 18)
                                                         .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                                                         .css({ opacity: 0 });

            penalty_period_to[penalty_court_period_index] = swg_graph.text(paymentVoluntary[i].penalty_period[k].getEndDateFormatted());
            penalty_period_to[penalty_court_period_index].move(indent - 2 + ((paymentVoluntary[i].penalty_period[k].end_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                               div_svg_height - indent)
                                                         .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                                                         .css({ opacity: 0 });

            text_rect_court_period_payment[penalty_court_period_index] = "Добровольная выплата № " + (line_index + 1) + " (" + paymentVoluntary[line_index].type.value + ")" + " в размере " + makeRubText_nominative(payment_vol_summs[i] * 1000) + " осуществлена с нарушением срока" + "<br>" +
                                       "Период № " + (k + 1) + ". Расчет неустойки: " + makeRubText_nominative(payment_vol_summs[i] * 1000) + " × " + declinationDays(paymentVoluntary[i].penalty_period[k].days_delay) + " × 1% = <b>" + makeRubText_nominative(paymentVoluntary[i].penalty_period[k].penalty_summ) + "</b>";
            rect_court_period_payment[penalty_court_period_index].mouseover(function() {
              this.animate({ when: 'now' }).fill({ opacity: 1 });
              $('#total_count').html(text_rect_court_period_payment[rect_court_period_payment.indexOf(this)]);
              line_payment_time_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
              line_payment_time_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
              penalty_period_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
              penalty_period_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
            });
            rect_court_period_payment[penalty_court_period_index].mouseout(function() {
              this.animate({ when: 'now' }).fill({ opacity: 0 });
              $('#total_count').html('');
              line_payment_time_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
              line_payment_time_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
              penalty_period_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
              penalty_period_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
            });
            penalty_court_period_index = penalty_court_period_index + 1;
          }
        }
        line_index = line_index + 1;
      }
      current_summ = current_summ + payment_vol_summs[i];
    }
  }

  //Отрисовка выплат по решению ФУ
  for (var i = 0; i < count_fu_days.length; i++) {
    if (!isNaN(count_fu_days[i])) {
      payment_fu_last_days[i] = (paymentFu[i].getLastDayForPayFu() - date_sv.getAppDate()) / DAY;
      for (var j = 0; j < payment_fu_types[i].length; j++) {
        switch (payment_fu_types[i][j]) {
          case 1:
            type = 0;
            break;
          case 2:
            type = 1;
            break;
          case 3:
            type = 2;
            break;
          case 4:
            type = 3;
            break;
          default:
          type = 0;
        }

        line_fu_day[line_index] = swg_graph.line(indent + (payment_fu_last_days[i] * div_svg_width * time_index / max_days_delay),
                                                 0,
                                                 indent + (payment_fu_last_days[i] * div_svg_width * time_index / max_days_delay),
                                                 div_svg_height - indent + 32)
                                           .stroke({ color: 'grey', width: 1, opacity: 0 })
                                           .css({ border: 'dashed' });

        last_day_for_pay_fu[line_index] = swg_graph.text(paymentFu[i].getLastDayForPayFuFormatted() + ' (дата окончания срока исполнения решения ФУ № ' + (i + 1) + ')');
        last_day_for_pay_fu[line_index].move(indent + 2 + (payment_fu_last_days[i] * div_svg_width * time_index / max_days_delay),
                                    div_svg_height - indent + 18)
                              .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                              .css({ opacity: 0 });

        fu_pay_date[line_index] = swg_graph.text(paymentFu[i].getPayDateFormatted() + ' (дата исполнения решения ФУ № ' + (i + 1) + ')');
        fu_pay_date[line_index].move(indent + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                    div_svg_height - indent)
                              .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                              .css({ opacity: 0 });

        if (count_fu_days[i] < payment_fu_last_days[i]) {
          line_payment[line_index] = swg_graph.line(indent - 2 + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                        div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j],
                                        indent - 2 + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                        div_svg_height - indent - 1 - current_summ)
                                  .stroke({ color: 'green', width: 5, opacity: 0.5 })
                                  .css({ cursor: 'pointer'});

          line_payment_time[line_index] = swg_graph.line(indent + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                                         div_svg_height - indent - 1 - current_summ,
                                                         indent + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                                         div_svg_height - indent - 1)
                                                   .stroke({ color: 'green', width: 1, opacity: 0 });
          line_payment_$[line_index] = swg_graph.line(indent + 1,
                                                      div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j],
                                                      indent + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                                      div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j])
                                                .stroke({ color: 'green', width: 1, opacity: 0 });

          text_line[line_index] = "Решение ФУ № " + (i + 1) + " исполнено в срок. " + paymentFu[i].claim[j].name.value + " в размере " + makeRubText_genitive(payment_fu_summs[i][j] * 1000);

          line_payment[line_index].mouseover(function() {
            this.animate({ when: 'now' }).stroke({ opacity: 1 });
            $('#total_count').html(text_line[line_payment.indexOf(this)]);
            line_payment_time[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
            line_payment_$[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
            line_fu_day[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
            last_day_for_pay_fu[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
            fu_pay_date[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
          });
          line_payment[line_index].mouseout(function() {
            this.animate({ when: 'now' }).stroke({ opacity: 0.5 });
            $('#total_count').html('');
            line_payment_time[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
            line_payment_$[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
            line_fu_day[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
            last_day_for_pay_fu[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
            fu_pay_date[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
          });
          line_index = line_index + 1;
        } else {
          line_payment[line_index] = swg_graph.line(indent - 2 + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                        div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j],
                                        indent - 2 + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                        div_svg_height - indent - 1 - current_summ)
                                  .stroke({ color: '#f44336', width: 5, opacity: 1 });

          line_payment_time[line_index] = swg_graph.line(indent + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                                         div_svg_height - indent - 1 - current_summ,
                                                         indent + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                                         div_svg_height - indent - 1)
                                                   .stroke({ color: '#f44336', width: 1, opacity: 0 });
          line_payment_$[line_index] = swg_graph.line(indent + 1,
                                                      div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j],
                                                      indent + (count_days[type] * div_svg_width * time_index / max_days_delay),
                                                      div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j])
                                                .stroke({ color: '#f44336', width: 1, opacity: 0 });


          rect_payment[line_index] = swg_graph.rect((count_fu_days[i] - count_days[type]) * div_svg_width * time_index / max_days_delay,
                                                    payment_fu_summs[i][j])
                                              .move(indent + (count_days[type] * div_svg_width * time_index / max_days_delay),
                                                    div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j])
                                              .fill({ color: '#f44336', opacity: 0.2 })
                                              .stroke({ color: '#f44336', width: 1, opacity: 1 })
                                              .css({ cursor: 'pointer'});

          if (paymentCourt != undefined && paymentCourt[0].penalty_court_period.length == 0) {
            text_rect[line_index] = "Решение ФУ № " + (i + 1) + " исполнено с нарушением срока (" + paymentFu[i].claim[j].name.value + ")<br>" +
                                    "Расчет неустойки: " + makeRubText_nominative(payment_fu_summs[i][j] * 1000) + " × " + declinationDays(count_fu_days[i] - count_days[type] + 1) + " × 1% = <b>" + makeRubText_nominative(payment_fu_summs[i][j] * (count_fu_days[i] - count_days[type] + 1) * 10) + "</b>";
            rect_payment[line_index].mouseover(function() {
              this.animate({ when: 'now' }).fill({ opacity: 1 });
              $('#total_count').html(text_rect[rect_payment.indexOf(this)]);
              line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
              line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
              line_fu_day[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
              last_day_for_pay_fu[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
              fu_pay_date[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
            });
            rect_payment[line_index].mouseout(function() {
              this.animate({ when: 'now' }).fill({ opacity: 0.2 });
              $('#total_count').html('');
              line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
              line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
              line_fu_day[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
              last_day_for_pay_fu[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
              fu_pay_date[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
            });
          } else {
            for (var k = 0; k < paymentFu[i].claim[j].penalty_period.length; k++) {
              rect_court_period_payment[penalty_court_period_index] = swg_graph.rect(((paymentFu[i].claim[j].penalty_period[k].end_date - paymentFu[i].claim[j].penalty_period[k].start_date) / DAY) * div_svg_width * time_index / max_days_delay,
                                                                                     payment_fu_summs[i][j])
                                                                               .move(indent + ((paymentFu[i].claim[j].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                     div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j])
                                                                               .fill({ color: '#f44336', opacity: 0 })
                                                                               .css({ cursor: 'pointer'});
              line_payment_time_from[penalty_court_period_index] = swg_graph.line(indent + ((paymentFu[i].claim[j].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                  div_svg_height - indent - 1 - current_summ,
                                                                                  indent + ((paymentFu[i].claim[j].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                  div_svg_height - indent + 32)
                                                                            .stroke({ color: '#f44336', width: 1, opacity: 0 });

              line_payment_time_to[penalty_court_period_index] = swg_graph.line(indent + ((paymentFu[i].claim[j].penalty_period[k].end_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                  div_svg_height - indent - 1 - current_summ,
                                                                                  indent + ((paymentFu[i].claim[j].penalty_period[k].end_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                  div_svg_height - indent - 1)
                                                                            .stroke({ color: '#f44336', width: 1, opacity: 0 });

              penalty_period_from[penalty_court_period_index] = swg_graph.text(paymentFu[i].claim[j].penalty_period[k].getStartDateFormatted());
              penalty_period_from[penalty_court_period_index].move(indent + 2 + ((paymentFu[i].claim[j].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                 div_svg_height - indent + 18)
                                                           .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                                                           .css({ opacity: 0 });

              penalty_period_to[penalty_court_period_index] = swg_graph.text(paymentFu[i].claim[j].penalty_period[k].getEndDateFormatted());
              penalty_period_to[penalty_court_period_index].move(indent - 2 + ((paymentFu[i].claim[j].penalty_period[k].end_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                 div_svg_height - indent)
                                                           .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                                                           .css({ opacity: 0 });

              text_rect_court_period_payment[penalty_court_period_index] = "Решение ФУ № " + (i + 1) + " исполнено с нарушением срока (" + paymentFu[i].claim[j].name.value + ")<br>" +
                                         "Период № " + (k + 1) + ". Расчет неустойки: " + makeRubText_nominative(payment_fu_summs[i][j] * 1000) + " × " + declinationDays(paymentFu[i].claim[j].penalty_period[k].days_delay) + " × 1% = <b>" + makeRubText_nominative(paymentFu[i].claim[j].penalty_period[k].penalty_summ) + "</b>";
              rect_court_period_payment[penalty_court_period_index].mouseover(function() {
                this.animate({ when: 'now' }).fill({ opacity: 1 });
                $('#total_count').html(text_rect_court_period_payment[rect_court_period_payment.indexOf(this)]);
                line_payment_time_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
                line_payment_time_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
                penalty_period_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
                penalty_period_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
              });
              rect_court_period_payment[penalty_court_period_index].mouseout(function() {
                this.animate({ when: 'now' }).fill({ opacity: 0 });
                $('#total_count').html('');
                line_payment_time_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
                line_payment_time_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
                penalty_period_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
                penalty_period_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
              });
              penalty_court_period_index = penalty_court_period_index + 1;
            }
          }
          line_index = line_index + 1;
        }
        current_summ = current_summ + payment_fu_summs[i][j];
      }
    }
  }

  //Отрисовка выплат по решению суда
  for (var i = 0; i < count_court_days.length; i++) {
    if (!isNaN(count_court_days[i])) {
      payment_court_in_force_dates[i] = (paymentCourt[i].getInForceDate() - date_sv.getAppDate()) / DAY;
      for (var j = 0; j < payment_court_types[i].length; j++) {
        switch (payment_court_types[i][j]) {
          case 1:
            type = 0;
            break;
          case 2:
            type = 1;
            break;
          case 3:
            type = 2;
            break;
          case 4:
            type = 3;
            break;
          default:
          type = 0;
        }

        line_payment[line_index] = swg_graph.line(indent - 2 + (count_court_days[i] * div_svg_width * time_index / max_days_delay),
                                                  div_svg_height - indent - 1 - current_summ - payment_court_summs[i][j],
                                                  indent - 2 + (count_court_days[i] * div_svg_width * time_index / max_days_delay),
                                                  div_svg_height - indent - 1 - current_summ)
                                            .stroke({ color: '#5e35b1', width: 5, opacity: 1 });

        line_court_in_force_day[line_index] = swg_graph.line(indent + (payment_court_in_force_dates[i] * div_svg_width * time_index / max_days_delay),
                                                             0,
                                                             indent + (payment_court_in_force_dates[i] * div_svg_width * time_index / max_days_delay),
                                                             div_svg_height - indent + 32)
                                                       .stroke({ color: 'grey', width: 1, opacity: 0 })
                                                       .css({ border: 'dashed' });

        court_in_force_date[line_index] = swg_graph.text(paymentCourt[i].getInForceDateFormatted() + ' (дата вступления в силу решения суда)');
        court_in_force_date[line_index].move(indent + 2 + (payment_court_in_force_dates[i] * div_svg_width * time_index / max_days_delay),
                                             div_svg_height - indent + 18)
                                       .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                                       .css({ opacity: 0 });
        court_pay_date[line_index] = swg_graph.text(paymentCourt[i].getPayDateFormatted() + ' (дата исполнения решения суда № ' + (i + 1) + ')');
        court_pay_date[line_index].move(indent + (count_court_days[i] * div_svg_width * time_index / max_days_delay),
                                        div_svg_height - indent)
                                  .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                                  .css({ opacity: 0 });

        line_payment_time[line_index] = swg_graph.line(indent + (count_court_days[i] * div_svg_width * time_index / max_days_delay),
                                                       div_svg_height - indent - 1 - current_summ,
                                                       indent + (count_court_days[i] * div_svg_width * time_index / max_days_delay),
                                                       div_svg_height - indent - 1)
                                                 .stroke({ color: '#5e35b1', width: 1, opacity: 0 });
        line_payment_$[line_index] = swg_graph.line(indent + 1,
                                                    div_svg_height - indent - 1 - current_summ - payment_court_summs[i][j],
                                                    indent + (count_court_days[i] * div_svg_width * time_index / max_days_delay),
                                                    div_svg_height - indent - 1 - current_summ - payment_court_summs[i][j])
                                              .stroke({ color: '#5e35b1', width: 1, opacity: 0 });

        if (fu_claim_set.has(payment_court_types[i][j])) {
          rect_payment[line_index] = swg_graph.rect((count_court_days[i] - payment_court_in_force_dates[i]) * div_svg_width * time_index / max_days_delay,
                                                    payment_court_summs[i][j])
                                              .move(indent + (payment_court_in_force_dates[i] * div_svg_width * time_index / max_days_delay),
                                                    div_svg_height - indent - 1 - current_summ - payment_court_summs[i][j])
                                              .fill({ color: '#5e35b1', opacity: 0.2 })
                                              .stroke({ color: '#5e35b1', width: 1, opacity: 1 })
                                              .css({ cursor: 'pointer'});
          if (paymentCourt[0].penalty_court_period.length == 0) {
            text_rect[line_index] = "Расчет неустойки по решению суда № " + (i + 1) + " (" + paymentCourt[i].claim[j].name.value + ")<br>" +
                                    makeRubText_nominative(payment_court_summs[i][j] * 1000) + " × " + declinationDays(count_court_days[i] - payment_court_in_force_dates[i] + 1) + " × 1% = <b>" + makeRubText_nominative(payment_court_summs[i][j] * (count_court_days[i] - payment_court_in_force_dates[i] + 1) * 10) + "</b>";

            rect_payment[line_index].mouseover(function() {
              this.animate({ when: 'now' }).fill({ opacity: 1 });
              $('#total_count').html(text_rect[rect_payment.indexOf(this)]);
              line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
              line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
              line_court_in_force_day[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
              court_in_force_date[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
              court_pay_date[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
            });
            rect_payment[line_index].mouseout(function() {
              this.animate({ when: 'now' }).fill({ opacity: 0.2 });
              $('#total_count').html('');
              line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
              line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
              line_court_in_force_day[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
              court_in_force_date[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
              court_pay_date[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
            });
          } else {
            for (var k = 0; k < paymentCourt[i].claim[j].penalty_period.length; k++) {
              rect_court_period_payment[penalty_court_period_index] = swg_graph.rect(((paymentCourt[i].claim[j].penalty_period[k].end_date - paymentCourt[i].claim[j].penalty_period[k].start_date) / DAY) * div_svg_width * time_index / max_days_delay,
                                                                                     payment_court_summs[i][j])
                                                                               .move(indent + ((paymentCourt[i].claim[j].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                     div_svg_height - indent - 1 - current_summ - payment_court_summs[i][j])
                                                                               .fill({ color: '#5e35b1', opacity: 0 })
                                                                               .css({ cursor: 'pointer'});
              line_payment_time_from[penalty_court_period_index] = swg_graph.line(indent + ((paymentCourt[i].claim[j].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                  div_svg_height - indent - 1 - current_summ,
                                                                                  indent + ((paymentCourt[i].claim[j].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                  div_svg_height - indent + 32)
                                                                            .stroke({ color: '#5e35b1', width: 1, opacity: 0 });

              line_payment_time_to[penalty_court_period_index] = swg_graph.line(indent + ((paymentCourt[i].claim[j].penalty_period[k].end_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                  div_svg_height - indent - 1 - current_summ,
                                                                                  indent + ((paymentCourt[i].claim[j].penalty_period[k].end_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                  div_svg_height - indent - 1)
                                                                            .stroke({ color: '#5e35b1', width: 1, opacity: 0 });

              penalty_period_from[penalty_court_period_index] = swg_graph.text(paymentCourt[i].claim[j].penalty_period[k].getStartDateFormatted());
              penalty_period_from[penalty_court_period_index].move(indent + 2 + ((paymentCourt[i].claim[j].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                 div_svg_height - indent + 18)
                                                           .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                                                           .css({ opacity: 0 });

              penalty_period_to[penalty_court_period_index] = swg_graph.text(paymentCourt[i].claim[j].penalty_period[k].getEndDateFormatted());
              penalty_period_to[penalty_court_period_index].move(indent - 2 + ((paymentCourt[i].claim[j].penalty_period[k].end_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                 div_svg_height - indent)
                                                           .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                                                           .css({ opacity: 0 });

              text_rect_court_period_payment[penalty_court_period_index] = "Расчет неустойки по решению суда № " + (i + 1) + " (" + paymentCourt[i].claim[j].name.value + ")<br>" +
                                         "Период № " + (k + 1) + ". Расчет неустойки: " + makeRubText_nominative(payment_court_summs[i][j] * 1000) + " × " + declinationDays(paymentCourt[i].claim[j].penalty_period[k].days_delay) + " × 1% = <b>" + makeRubText_nominative(paymentCourt[i].claim[j].penalty_period[k].penalty_summ) + "</b>";
              rect_court_period_payment[penalty_court_period_index].mouseover(function() {
                this.animate({ when: 'now' }).fill({ opacity: 1 });
                $('#total_count').html(text_rect_court_period_payment[rect_court_period_payment.indexOf(this)]);
                line_payment_time_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
                line_payment_time_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
                penalty_period_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
                penalty_period_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
              });
              rect_court_period_payment[penalty_court_period_index].mouseout(function() {
                this.animate({ when: 'now' }).fill({ opacity: 0 });
                $('#total_count').html('');
                line_payment_time_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
                line_payment_time_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
                penalty_period_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
                penalty_period_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
              });
              penalty_court_period_index = penalty_court_period_index + 1;
            }
          }
          line_index = line_index + 1;
        } else {
          rect_payment[line_index] = swg_graph.rect((count_court_days[i] - count_days[type]) * div_svg_width * time_index / max_days_delay,
                                                    payment_court_summs[i][j])
                                              .move(indent + (count_days[type] * div_svg_width * time_index / max_days_delay),
                                                    div_svg_height - indent - 1 - current_summ - payment_court_summs[i][j])
                                              .fill({ color: '#5e35b1', opacity: 0.2 })
                                              .stroke({ color: '#5e35b1', width: 1, opacity: 1 })
                                              .css({ cursor: 'pointer'});
          if (paymentCourt[0].penalty_court_period.length == 0) {
            text_rect[line_index] = "Расчет неустойки по решению суда № " + (i + 1) + " (" + paymentCourt[i].claim[j].name.value + ")<br>" +
                                    makeRubText_nominative(payment_court_summs[i][j] * 1000) + " × " + declinationDays(count_court_days[i] - count_days[type] + 1) + " × 1% = <b>" + makeRubText_nominative(payment_court_summs[i][j] * (count_court_days[i] - count_days[type] + 1) * 10) + "</b>";
            rect_payment[line_index].mouseover(function() {
              this.animate({ when: 'now' }).fill({ opacity: 1 });
              $('#total_count').html(text_rect[rect_payment.indexOf(this)]);
              line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
              line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
              court_pay_date[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
            });
            rect_payment[line_index].mouseout(function() {
              this.animate({ when: 'now' }).fill({ opacity: 0.2 });
              $('#total_count').html('');
              line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
              line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
              court_pay_date[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
            });
          } else {
            for (var k = 0; k < paymentCourt[i].claim[j].penalty_period.length; k++) {
              rect_court_period_payment[penalty_court_period_index] = swg_graph.rect(((paymentCourt[i].claim[j].penalty_period[k].end_date - paymentCourt[i].claim[j].penalty_period[k].start_date) / DAY) * div_svg_width * time_index / max_days_delay,
                                                                                     payment_court_summs[i][j])
                                                                               .move(indent + ((paymentCourt[i].claim[j].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                     div_svg_height - indent - 1 - current_summ - payment_court_summs[i][j])
                                                                               .fill({ color: '#5e35b1', opacity: 0 })
                                                                               .css({ cursor: 'pointer'});
              line_payment_time_from[penalty_court_period_index] = swg_graph.line(indent + ((paymentCourt[i].claim[j].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                  div_svg_height - indent - 1 - current_summ,
                                                                                  indent + ((paymentCourt[i].claim[j].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                  div_svg_height - indent + 32)
                                                                            .stroke({ color: '#5e35b1', width: 1, opacity: 0 });

              line_payment_time_to[penalty_court_period_index] = swg_graph.line(indent + ((paymentCourt[i].claim[j].penalty_period[k].end_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                  div_svg_height - indent - 1 - current_summ,
                                                                                  indent + ((paymentCourt[i].claim[j].penalty_period[k].end_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                                  div_svg_height - indent - 1)
                                                                            .stroke({ color: '#5e35b1', width: 1, opacity: 0 });

              penalty_period_from[penalty_court_period_index] = swg_graph.text(paymentCourt[i].claim[j].penalty_period[k].getStartDateFormatted());
              penalty_period_from[penalty_court_period_index].move(indent + 2 + ((paymentCourt[i].claim[j].penalty_period[k].start_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                 div_svg_height - indent + 18)
                                                           .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                                                           .css({ opacity: 0 });

              penalty_period_to[penalty_court_period_index] = swg_graph.text(paymentCourt[i].claim[j].penalty_period[k].getEndDateFormatted());
              penalty_period_to[penalty_court_period_index].move(indent - 2 + ((paymentCourt[i].claim[j].penalty_period[k].end_date - date_sv.getAppDate()) / DAY * div_svg_width * time_index / max_days_delay),
                                                                 div_svg_height - indent)
                                                           .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                                                           .css({ opacity: 0 });

              text_rect_court_period_payment[penalty_court_period_index] = "Расчет неустойки по решению суда № " + (i + 1) + " (" + paymentCourt[i].claim[j].name.value + ")<br>" +
                                         "Период № " + (k + 1) + ". Расчет неустойки: " + makeRubText_nominative(payment_court_summs[i][j] * 1000) + " × " + declinationDays(paymentCourt[i].claim[j].penalty_period[k].days_delay) + " × 1% = <b>" + makeRubText_nominative(paymentCourt[i].claim[j].penalty_period[k].penalty_summ) + "</b>";
              rect_court_period_payment[penalty_court_period_index].mouseover(function() {
                this.animate({ when: 'now' }).fill({ opacity: 1 });
                $('#total_count').html(text_rect_court_period_payment[rect_court_period_payment.indexOf(this)]);
                line_payment_time_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
                line_payment_time_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
                penalty_period_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
                penalty_period_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0.5 });
              });
              rect_court_period_payment[penalty_court_period_index].mouseout(function() {
                this.animate({ when: 'now' }).fill({ opacity: 0 });
                $('#total_count').html('');
                line_payment_time_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
                line_payment_time_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
                penalty_period_from[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
                penalty_period_to[rect_court_period_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).css({ opacity: 0 });
              });
              penalty_court_period_index = penalty_court_period_index + 1;
            }
          }
          line_index = line_index + 1;
        }
        current_summ = current_summ + payment_court_summs[i][j];
      }
    }
  }
}
