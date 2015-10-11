$(document).ready(function () {

	$('#helpRegEdit').qtip({ 
		content: {
			text: '<u>Create/edit fields</u> <br><br><br> Click on a field\'s name or Edit to edit it <br><br>Move Up/Down affects the registration page <br><br>They can be hidden from the registration page without any information being lost. <br><br> <b>DELETING A FIELD WILL PERMANENTLY DELETE ALL INFORMATION ABOUT IT</b>'
		},
		style: {
			classes: 'qtip-light'
		},
		position: {
			my: 'top right',  // Position my top right...
			at: 'bottom left', // at the bottom left of...
			target: $('#helpRegEdit') // my target
		}
	});
	
	$('#helpFieldEdit').qtip({ 
		content: {
			text: 'The name of the field in Browse Database is not visible to volunteers; however, a descriptive name would be helpful to the admins for viewing purposes'
		},
		style: {
			classes: 'qtip-light'
		},
		position: {
			my: 'top right',  // Position my top right...
			at: 'bottom left', // at the bottom left of...
			target: $('#helpFieldEdit') // my target
		}
	});
	
	
	$("#fieldType").change(function() {		
		var type=$("#fieldType").val();
		hideAll();
		if (type=="Dropdown Menu")
		{
			$(".dropDown").show(500);
			$("#myForm").validate({
				rules:{
				tableName: {required:true},
				dropdownname: {required:true},
				dropdownoptions: {required:true}
				}
			});
		}
		else if (type=="Small Text Box")
		{
			$(".smallText").show(500);
			$("#myForm").validate({
				rules:{
				tableName: {required:true},
				smalltextname: {required:true}
				}
			});
			
		}
		else if (type=="Big Text Box")
		{
			$(".bigText").show(500);
			$("#myForm").validate({
				rules:{
				tableName: {required:true},
				bigtextname: {required:true}
				}
			});
		}
		else if (type=="Text")
		{
			$(".text").show(500);
			$("#myForm").validate({
				rules:{
				tableName: {required:true},
				textname: {required:true}
				}
			});
		}
		else if (type=="Checkbox")
		{
			$(".checkBox").show(500);
			$("#myForm").validate({
				rules:{
				tableName: {required:true},
				checkboxname: {required:true},
				checkboxoptions: {required:true}
				}
			});
		}
		else if (type=="Date")
		{
			$(".date").show(500);
			$("#myForm").validate({
				rules:{
				tableName: {required:true},
				minimum: {number:true},
				maximum: {number:true},
				datename: {required:true}
				}
			});
		}
		else
		{
			//alert(type);
			$(".default").show(500);
		}
		
		if (type==""||type=="Text")
		{
			$("#tableName").hide(500);
		}
		else 
		{
			$("#tableName").show(500);
		}	
	});
    
	$("#newFieldButton").click(function() {
		if ($("#newField").css('display')=='none')
		{
			$("#newField").show(500);
			$("#newFieldButton").attr('value', 'Cancel');
            $("#categories").animate({'marginTop':'0px'}, 10);
            document.getElementById("bode").style.position="fixed";
		}
		else
		{
			$("#newField").hide(250);
			$("#newFieldButton").attr('value', '+ New field');
            $("#categories").animate({'marginTop':'116px'}, 1100);
            document.getElementById("bode").style.position="static";
		}
	})}
	

);

function hideAll()
{
	$(".default").hide(500);	
	$(".dropDown").hide(500);	
	$(".smallText").hide(500);	
	$(".bigText").hide(500);	
	$(".text").hide(500);	
	$(".checkBox").hide(500);	
	$(".date").hide(500);
}


function checkForm(form)
{
	if ((form.tableName.value=="" && form.fieldType.value!=="Text") || form.fieldType.value=="")
		return false;
	return true;
}