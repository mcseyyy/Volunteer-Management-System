$(document).ready(function () {
	/*$("#newGroupButton").click(function() {
		if ($("#newGroupDIV").css('display')=='none')
		{
			$("#newGroupDIV").show(500);
			document.getElementById("newGroupDIV").style.marginTop="300px";
			$("#newGroupButton").attr('value', 'Cancel new group');
            document.getElementById("groups").style.marginTop="0px";
		}
		else
		{
			$("#newGroupDIV").hide(500);			
			$("#newGroupButton").attr('value', '+ New group');
            document.getElementById("groups").style.marginTop="123px";
		}
	});*/
	
	$("#newGroupButton").click(function() {
		if ($("#newGroupDIV").css('display')=='none')
		{
			$("#newGroupDIV").show(500);
			$("#groups").animate({'margin-top': '0px'}, 500);
			$("#newGroupButton").attr('value', 'Cancel new group');
		}
		else
		{
			$("#newGroupDIV").hide(500);	
			$("#groups").animate({'margin-top': '123px'}, 500);
			$("#newGroupButton").attr('value', '+ New group');
		}
	});
	
	$('.removeUser').click(function(e)
{
	var c = confirm("Do you really want to remove this user from the group?");
	
	if (c==false)
		e.preventDefault();
});
});

function checkForm(form)
{
	if (form.groupName.value=="")
		return false;
	return true;
}

function CheckAll(id)
{
    // Change the onclick value to CheckNone()
    var selectAll = document.getElementById(id);
    var attr = document.createAttribute("onclick");
    attr.nodeValue = "CheckNone(this.id)";
    selectAll.attributes.setNamedItem(attr);
    // Check all checkboxes (in the list of entries)
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; ++i)
        if (inputs[i].name.substring(0,8) == "checkbox" && inputs[i].name.substring(8,id.length-1) == id.substring(9))
			inputs[i].checked = true;
}

function CheckNone(id)
{
    // Change the onclick value to CheckAll()
    var selectAll = document.getElementById(id);
    var attr = document.createAttribute("onclick");
    attr.nodeValue = "CheckAll(this.id)";
    selectAll.attributes.setNamedItem(attr);
    // Check all checkboxes (in the list of entries)
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; ++i)
        if (inputs[i].name.substring(0,8) == "checkbox" && inputs[i].name.substring(8,id.length-1) == id.substring(9))
			inputs[i].checked = false;
}