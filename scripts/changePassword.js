$(document).ready(function () {
	$("#changePassButton").click(
		function() 
		{
			if ($("#changePassword").css('display')=='none')
			{
				$("#changePassword").show(500);
				$("#changePassButton").attr("value","Cancel Password");
			}
			else
			{
				$("#changePassword").hide(500);
				$("#changePassButton").attr("value","Change Password");
			}
		});
		
	$("#passwordVerify").keyup(	function () {
		if($("#password").val()!=$("#passwordVerify").val())
			$("#passwordError").show();
		else
			$("#passwordError").hide();
	});
	
	$("#password").keyup(	function () {
		if($("#password").val()!=$("#passwordVerify").val())
			$("#passwordError").show();
		else
			$("#passwordError").hide();
	});
	
	$("#myForm").submit( 	function(e) {
		if($("#password").val()!=$("#passwordVerify").val())
		{		
			e.preventDefault();
			
			$('html, body').animate({
				scrollTop: $("#password").offset().top
			}, 1, function(){$("#passwordError").show();});
			
		}
	});
});