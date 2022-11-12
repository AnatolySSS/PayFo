//Скорытие левого меню
$(document).ready(function(){
	// Toggle plus minus icon on show hide of collapse element
	$(".collapse").on('show.bs.collapse', function(){
		$(this).parent(".card").find(".toggle").addClass("rotate");
	}).on('hide.bs.collapse', function(){
		$(this).parent(".card").find(".toggle").removeClass("rotate");
	});
});

//Сокрытие выплат
$(document).on("click", ".accordion_right", function (event) {
	/* Toggle between adding and removing the "active" class,
	to highlight the button that controls the panel */
	this.classList.toggle("active");

	/* Toggle between hiding and showing the active panel */
	var panel = this.nextElementSibling;
	if (panel.style.display === "block") {
		panel.style.display = "none";
		$(this).find(".toggle").removeClass("rotate");
	} else {
		panel.style.display = "block";
		$(this).find(".toggle").addClass("rotate");
	}
});
