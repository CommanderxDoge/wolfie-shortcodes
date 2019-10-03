jQuery(document).ready(function($){ 
$('.wolfie-color-picker').wpColorPicker();

$('body').on('click', '.color-picker-save', function(e){
	e.preventDefault();
	var backgroundColor = $(this).css('backgroundColor');
	$(this).next().val(backgroundColor);
});


});