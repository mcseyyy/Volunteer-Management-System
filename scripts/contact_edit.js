$(document).ready(function()
{
	setInterval(function() 
	{
		var text = $("#email").val();
		if (text != "")
		{
			$("#first").hide();
		}
		else
		{
			$("#first").show();
		}
	},25);
		
	setInterval(function() 
	{
		var text = $("#phone").val();
		if (text != "")
		{
			$("#second").hide();
		}
		else
		{
			$("#second").show();
		}
	},25);
		
	setInterval(function() 
	{
		var text = $("#website").val();
		if (text != "")
		{
			$("#third").hide();
		}
		else
		{
			$("#third").show();
		}
	},25);
	
	$("#email").focus(function()
	{
		$("#first").animate({
			color: '#ddd'
		}, 250);
	});

	$("#phone").focus(function()
	{
		$("#second").animate({
			color: '#ddd'
		}, 250);
	});

	$("#website").focus(function()
	{
		$("#third").animate({
			color: '#ddd'
		}, 250);
	});
	
	$("#email").blur(function()
	{
		$("#first").animate({
			color: '#999'
		}, 250);
	});
	$("#phone").blur(function()
	{
		$("#second").animate({
			color: '#999'
		}, 250);
	});
	
	$("#website").blur(function()
	{
		$("#third").animate({
			color: '#999'
		}, 250);
	});

	$("form").submit(function()
	{
		if( $("#email").val() == "" 
		&& $("#phone").val() == "" 
		&& $("#website").val() == "")
			return false;
	});
});