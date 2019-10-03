jQuery(document).ready(function($){ 
var tabs = $('.wolfie-tabs');
tabs.each(function(){
	var navTabsContainer = $(this).find('.wolfie-tabs-nav');
	var navTabs = $(this).find('.wolfie-tabs-nav > .tab');
	var navTabsActive = $(this).find('.wolfie-tabs-nav > .tab.active');
	var tabContent = $(this).find('.wolfie-tabs-body > .wolfie-tab-content');

	navTabs.on('click', function(e){
		e.preventDefault();
		navTabs.removeClass('active');
		$(this).addClass('active');
		var tabActiveIndex = $(this).parent().find('.tab.active').index();
		//set active class to wolfie-tab-body active
		var activeTabContent = tabContent.eq(tabActiveIndex);
		console.log(activeTabContent);
		tabContent.removeClass('active');
		activeTabContent.addClass('active');

	});
});



});