//Изменяет картинку валидации
export function validationCheck(className) {
$(`${className} .form-control`).focusout(function(){
    validationCheckUpdate(className)
})
}
  
  //Обновлет сведения о валидации инпутов
export  function validationCheckUpdate(className) {
    setTimeout(() => {
        var isOk = true
        $(`${className} .form-control`).each(function() {
        if ($(this).css('border-color') == 'rgb(220, 53, 69)') {
            isOk = false
        }
        })
        if (isOk) {
        $(`${className}`).children().first().next().html(`<i class="fa fa-check-square-o fa-2x" aria-hidden="true" style="color: #28a745;"></i>`)
        } else {
        $(`${className}`).children().first().next().html(`<i class="fa fa-exclamation-circle fa-2x" aria-hidden="true" style="color: #dc3545;"></i>`)
        }
    }, 200); 
}