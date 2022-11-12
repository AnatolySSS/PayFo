$(document).ready(function(){

	$("#preambula").on('click', function(){
		$(".preambula").show();
		$(this).css("background", "#ffc107");
		$(this).find("a").css("color", "#fff");
		$(this).parent().find('li').each(function(index){
            if ($(this).attr('id') != "preambula") {
                $(this).css("background", "#d6dbe0");
				$(this).find("a").css("color", "#61656b");

				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#d6dbe0");})
            } else {
				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#ffc107");})
			}
        })
		$(".btn-desicion").show();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".apps-to-fo").hide();
		$(".payments_all").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".fu-decision-analyze").hide();
		$(".fu-motive-download").hide();
	})

	$("#main-claims-all").on('click', function(){
		$(this).css("background", "#ffc107");
		$(this).find("a").css("color", "#fff");
		$(this).parent().find('li').each(function(index){
            if ($(this).attr('id') != "main-claims-all") {
                $(this).css("background", "#d6dbe0");
				$(this).find("a").css("color", "#61656b");

				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#d6dbe0");})
            } else {
				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#ffc107");})
			}
        })
		$(".main-claims-all").show();
		$(".btn-desicion").show();
		$(".preambula").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".apps-to-fo").hide();
		$(".payments_all").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".fu-decision-analyze").hide();
		$(".fu-motive-download").hide();
	})

	$("#main-request").on('click', function(){
		$(this).css("background", "#ffc107");
		$(this).find("a").css("color", "#fff");
		$(this).parent().find('li').each(function(index){
            if ($(this).attr('id') != "main-request") {
                $(this).css("background", "#d6dbe0");
				$(this).find("a").css("color", "#61656b");

				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#d6dbe0");})
            } else {
				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#ffc107");})
			}
        })
		$(".main-request").show();
		$(".btn-desicion").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".dtp-description").hide();
		$(".apps-to-fo").hide();
		$(".payments_all").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".fu-decision-analyze").hide();
		$(".fu-motive-download").hide();
	})

	$("#dtp-description").on('click', function(){
		$(this).css("background", "#ffc107");
		$(this).find("a").css("color", "#fff");
		$(this).parent().find('li').each(function(index){
            if ($(this).attr('id') != "dtp-description") {
                $(this).css("background", "#d6dbe0");
				$(this).find("a").css("color", "#61656b");

				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#d6dbe0");})
            } else {
				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#ffc107");})
			}
        })
		$(".dtp-description").show();
		$(".btn-desicion").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".apps-to-fo").hide();
		$(".payments_all").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".fu-decision-analyze").hide();
		$(".fu-motive-download").hide();
	})

	$("#apps-to-fo").on('click', function(){
		$(this).css("background", "#ffc107");
		$(this).find("a").css("color", "#fff");
		$(this).parent().find('li').each(function(index){
            if ($(this).attr('id') != "apps-to-fo") {
                $(this).css("background", "#d6dbe0");
				$(this).find("a").css("color", "#61656b");

				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#d6dbe0");})
            } else {
				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#ffc107");})
			}
        })
		$(".apps-to-fo").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".payments_all").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".fu-decision-analyze").hide();
		$(".fu-motive-download").hide();
	})

	$("#fus-all").on('click', function(){
		$(this).css("background", "#ffc107");
		$(this).find("a").css("color", "#fff");
		$(this).parent().find('li').each(function(index){
            if ($(this).attr('id') != "fus-all") {
                $(this).css("background", "#d6dbe0");
				$(this).find("a").css("color", "#61656b");

				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#d6dbe0");})
            } else {
				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#ffc107");})
			}
        })
		$(".fus-all").show();
		$(".btn-desicion").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".payments_all").hide();
		$(".apps-to-fo").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".fu-decision-analyze").hide();
		$(".fu-motive-download").hide();
	})

	$("#courts-all").on('click', function(){
		$(this).css("background", "#ffc107");
		$(this).find("a").css("color", "#fff");
		$(this).parent().find('li').each(function(index){
            if ($(this).attr('id') != "courts-all") {
                $(this).css("background", "#d6dbe0");
				$(this).find("a").css("color", "#61656b");

				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#d6dbe0");})
            } else {
				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#ffc107");})
			}
        })
		$(".courts-all").show();
		$(".btn-desicion").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".payments_all").hide();
		$(".apps-to-fo").hide();
		$(".fus-all").hide();
		$(".fu-expertise-all").hide();
		$(".fu-decision-analyze").hide();
		$(".fu-motive-download").hide();
	})

	$("#fu-expertise-all").on('click', function(){
		$(this).css("background", "#ffc107");
		$(this).find("a").css("color", "#fff");
		$(this).parent().find('li').each(function(index){
            if ($(this).attr('id') != "fu-expertise-all") {
                $(this).css("background", "#d6dbe0");
				$(this).find("a").css("color", "#61656b");

				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#d6dbe0");})
            } else {
				$(this).mouseenter(function() {$(this).css("background", "#ffc107");})
				$(this).mouseleave(function() {$(this).css("background", "#ffc107");})
			}
        })
		$(".fu-expertise-all").show();
		$(".btn-desicion").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".payments_all").hide();
		$(".apps-to-fo").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-decision-analyze").hide();
		$(".fu-motive-download").hide();
	})

	$("#menu_fu_decision_analyze").on('click', function(){
		$(".fu-decision-analyze").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".payments_all").hide();
		$(".apps-to-fo").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".btn-desicion").hide();
		$(".fu-motive-download").hide();
	})

	$("#menu_fu_motive_download").on('click', function(){
		$(".fu-motive-download").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".payments_all").hide();
		$(".apps-to-fo").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".btn-desicion").hide();
		$(".fu-decision-analyze").hide();
	})
})
