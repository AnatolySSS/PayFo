//Меняет поля в зависимости от типа Заявителя (ФЛ / ИП / ЮЛ)
$(document).on("change", ".app_type", function (event) {
	if ($(this).find(':selected').text() == "ФЛ") {
        $(this).parent().parent().parent().find('.fl').show('fast')
        $(this).parent().parent().parent().find('.fl').find('input[type=text]').addClass('form-control')

        $(this).parent().parent().parent().find('.ip').hide('fast')
        $(this).parent().parent().parent().find('.ul').hide('fast')
        setTimeout(() => {
            $(this).parent().parent().parent().find('.ip').find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().parent().find('.ul').find('input[type=text]').removeClass('form-control')
        }, 200)
	} else if ($(this).find(':selected').text() == "ИП") {
        $(this).parent().parent().parent().find('.ip').show('fast')
        $(this).parent().parent().parent().find('.ip').find('input[type=text]').addClass('form-control')

        $(this).parent().parent().parent().find('.fl').hide('fast')
        $(this).parent().parent().parent().find('.ul').hide('fast')
        setTimeout(() => {
            $(this).parent().parent().parent().find('.fl').find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().parent().find('.ul').find('input[type=text]').removeClass('form-control')
        }, 200)
	} else if ($(this).find(':selected').text() == "ЮЛ") {
        $(this).parent().parent().parent().find('.ul').show('fast')
        $(this).parent().parent().parent().find('.ul').find('input[type=text]').addClass('form-control')

        $(this).parent().parent().parent().find('.fl').hide('fast')
        $(this).parent().parent().parent().find('.ip').hide('fast')
        setTimeout(() => {
            $(this).parent().parent().parent().find('.fl').find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().parent().find('.ip').find('input[type=text]').removeClass('form-control')
        }, 200)
    } else {
        $(this).parent().parent().parent().find('.fl').hide('fast')
        $(this).parent().parent().parent().find('.ip').hide('fast')
        $(this).parent().parent().parent().find('.ul').hide('fast')
        setTimeout(() => {
            $(this).parent().parent().parent().find('.fl').find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().parent().find('.ip').find('input[type=text]').removeClass('form-control')
            $(this).parent().parent().parent().find('.ul').find('input[type=text]').removeClass('form-control')
        }, 200)
    }
    // validationCheckUpdate('preambula')
    // validationCheck('preambula')
});