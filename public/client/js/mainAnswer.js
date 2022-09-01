//Обновление картинки валидации в разделе запроса ФО
$('#main_answer_type').change(() => {
    if ($('#main_answer_type').find(':selected').text() == "Ответ получен") {
        $('#main_answer_type').parent().parent().find('#date_main_answer').addClass('form-control')
        $('#main_answer_type').parent().parent().find('#number_main_answer').addClass('form-control')
        $('#main_answer_type').parent().next().show('fast');
        $('#main_answer_type').parent().next().next().show('fast');
        $('#main_answer_type').parent().parent().parent().children().first().children().first().next().show('fast');
        $('#main_answer_type').parent().parent().parent().children().first().children().first().next().next().show('fast');
    } else {
        $('#main_answer_type').parent().next().hide('fast');
        $('#main_answer_type').parent().next().next().hide('fast');
        $('#main_answer_type').parent().parent().parent().children().first().children().first().next().hide('fast');
        $('#main_answer_type').parent().parent().parent().children().first().children().first().next().next().hide('fast');
        setTimeout(() => {
            $('#main_answer_type').parent().parent().find('#date_main_answer').removeClass('form-control')
            $('#main_answer_type').parent().parent().find('#number_main_answer').removeClass('form-control')
        }, 100);
    }
})

//Изменяет картинку валидации
function validationCheck(className) {
  $(`.${className} .form-control`).focusout(function(){
  })
}