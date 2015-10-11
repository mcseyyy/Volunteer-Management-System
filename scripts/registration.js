$(document).ready(function () {
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
-			e.preventDefault();
			$('html, body').animate({
				scrollTop: $("#password").offset().top
			}, 1, function(){$("#passwordError").show();});
			
		}
		
		if($("#password").val().length<6)
		{
			e.preventDefault();
			$("#minLength").show();
		}
	});
			
});