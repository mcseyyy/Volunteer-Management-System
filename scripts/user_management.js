$(document).ready(function()
{
	$('#helpManagement').qtip({ 
		content: {
			text: "There are two different permissions:<BR><b>1. Full volunteer access permission </b>- An admin with this permission is given access to all volunteers' information, i.e. all volunteers are shown in the browse database page and all information about those volunteers is accessible. An admin without this permission cannot access any volunteers by default. This can be changed by clicking the 'Edit' link in the 'Group permission' column. After clicking the link, a new page is shown. On the new page, it is possible to select the groups of volunteers that the admin can see. It is also possible to select the categories of information that the admin should NOT be able to see.<BR><b>2. Management permission</b> - An admin with this permission is given unlimited access to the whole website. This includes accessing this 'Manage users' page, the 'Manage registration form' page, Groups page, Stats page, 'Manage backups' page and Changelog page. The permission also allows an admin to manage events and edit the contact details in the contact us page, as well as the details of any volunteer."
		},
		style: {
			classes: 'qtip-light'
		},
		position: {
			my: 'top right',  // Position my top left...
			at: 'bottom left', // at the bottom right of...
			target: $('#helpManagement') // my target
		}
	});
	
	var counter = 1;
	$( "#volunteerButton" ).click(function() {
		$(" form ").hide();
		$(" .table ").hide();
		$(" #volunteerForm ").show();
        $("#band").css('border-bottom','none');
	});
	
	$( "#adminButton" ).click(function() {
		$(" form ").hide();
		$(" .table ").hide();
		$(" #adminForm ").show();
        $("#band").css('border-bottom','none');
	});
	
	$( "#adminListButton" ).click(function() {
		$(" form ").hide();
		$(" .table ").hide();
		$(" #adminTable ").show();
        $("#band").css('border-bottom','solid #F0F0F0 10px');
	});
	
	$( "#pendingButton" ).click(function() {
		$(" form ").hide();
		$(" .table ").hide();
		$(" #pendingRegistrations ").show();
        $("#band").css('border-bottom','solid #F0F0F0 10px');
	});
	
	$( "#addNewImg" ).click(function() {
		$(" #input"+counter).after('<div class="input"> <span>E-mail</span> <input type="text" id="input'+(counter+1)+'" class="someTextShouldGoHereInputTypeInput" name="volunteer_email'+(counter+1)+'"> </div>');
		counter = counter +1;
	});		
	
	$("#chkbxLabel1").click(function()
	{
		$("#checkBoxThing1").prop("checked", !$("#checkBoxThing1").prop("checked"));
	});
	
	$("#chkbxLabel2").click(function()
	{
		$("#checkBoxThing2").prop("checked", !$("#checkBoxThing2").prop("checked"));
	});
	
	$("#chkbxLabel3").click(function()
	{
		$("#checkBoxThing3").prop("checked", !$("#checkBoxThing3").prop("checked"));
	});

	$('#volunteerForm').submit(function(e)
	{
		$('#volunteerForm input.someTextShouldGoHereInputTypeInput').each(function() {
			if($(this).val().length>0)
			{
				$("#volunteerForm").submit();
				return;
			}
		});
		e.preventDefault(e);
	});
	
	$('#volunteerForm').submit(function(e)
	{
		var empty = 0;
		$('#volunteerForm input.someTextShouldGoHereInputTypeInput').each(function() {
			if($(this).val().length==0)
				e.preventDefault(e);
		});
	});
	
	$("#alert").hide().show(1000).delay(5000).hide(1000);
		
});