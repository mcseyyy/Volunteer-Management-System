$(document).ready(function()
{
	setInterval(function() 
		{
			var text = $(".someTextShouldGoHereInputTypeInput").first().val();
			if (text != "")
			{
				$("span").first().hide();
			}
			else
			{
				$("span").first().show();
			}
		},25);
		
	setInterval(function() 
		{
			var text = $(".someTextShouldGoHereInputTypeInput").last().val();
			if (text != "")
			{
				$("span").last().hide();
			}
			else
			{
				$("span").last().show();
			}
		},25);
		
	$("#alert").hide().show(1000).delay(5000).hide(1000);
	
	$(".someTextShouldGoHereInputTypeInput").first().focus(function()
	{
		$("span").first().animate({
			color: '#ddd'
		}, 250);
	});

	$(".someTextShouldGoHereInputTypeInput").last().focus(function()
	{
		$("span").last().animate({
			color: '#ddd'
		}, 250);
	});

	$(".someTextShouldGoHereInputTypeInput").first().blur(function()
	{
		$("span").first().animate({
			color: '#999'
		}, 250);
	});
	$(".someTextShouldGoHereInputTypeInput").last().blur(function()
	{
		$("span").last().animate({
			color: '#999'
		}, 250);
	});
	/*
	$(".someTextShouldGoHereInputTypeInput").first().keydown(function()
	{
		setTimeout(function() 
		{
			var text = $(".someTextShouldGoHereInputTypeInput").first().val();
			if (text != "")
			{
				$("span").first().hide();
			}
			else
			{
				$("span").first().show();
			}
		},1);
	});*/

	$("#chkbxLabel").click(function()
	{
		$("#checkBoxThing").prop("checked", !$("#checkBoxThing").prop("checked"));
	});

	$("form").submit(function()
	{
		if( $(".someTextShouldGoHereInputTypeInput").first().val() == "" 
		|| $(".someTextShouldGoHereInputTypeInput").last().val() == "" )
			return false;
	});
});