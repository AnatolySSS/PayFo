import { allPopovers } from "./objects/allPopovers";

//Добавляет popover
$(document).on("click", '[data-toggle="popover"]', function (event) {
    allPopovers.popovers.forEach(element => {
        if ($(this).parent().prev().hasClass(`.${element.type}`)) {
            $(function () {
                $(`.${className} + small [data-toggle="popover"]`).popover({
                html: true,
                title: element.title,
                content: function () {
                    return element.content
                }
                })
            })
            $('[data-toggle="popover"]').css("cursor", "pointer")
        }
    })
})