var fieldNames = new Array();
var fieldTypes = new Array();
var enumNames = new Array();
var enumOffsets = new Array();
var enumValues = new Array();
var setNames = new Array();
var setOffsets = new Array();
var setValues = new Array();
var setPrettyValues = new Array();
var fieldsSize = 0;
var enumNamesSize = 0;
var enumValuesSize = 0;
var setNamesSize = 0;
var setValuesSize = 0;
var fieldRowsSize = 1;

$(document).ready(function () {
	$('#help').qtip({ 
		content: {
			text: 'First, one must choose a criteria with which to filter volunteers by, the drop-down menu eases this process by listing all the fields with which one may view. Then the value is to be entered; depending on the chosen criteria-field, this may be done in one of several ways.<br>\
<br>\
<b>Date</b>: One may type in the date manually, following the hinted syntax of dd/mm/yyyy, or if their browser supports it, they may use the graphical calendar display to select the date, at which point, the text representation of the date will populate the value field<br>\
<br>\
<b>Text</b>: One types in the text they wish to filter with, depending on the field type (‘big text’ or ‘small text’), this may query for an exact match or one where the inputted word is searched within the database entries for the field.<br>\
<br>\
<b>Number</b>: This can, and most likely will, be entered as text; there is however, the option to use arrows to increment and decrement the currently entered number; furthermore, there is numerical validation applied.<br>\
<br>\
<b>Email</b>: Like text, but validated to ensure it follows the standard email format.<br>\
<br>\
<b>Checkboxes</b>: Here, one may simply check the predefined options that they would want volunteers to have included in the field that is being used for filtering; resulting volunteers will have at least one of the checked values.<br>\
<br>\
<b>Drop-down menu</b>: This is similar to choosing the field with which to filter by; one chooses an option, and only those volunteers who have that particular option will be in the result.<br>\
<br>\
One may add a criterion at any point; if one adds too many, there is nothing to worry about, any values left blank will be ignored in the filtering process. One may specify the order by which to sort the resulting volunteers, and by which field; one may also sort the volunteers by any displayed field after generating the results by clicking on the column header in question. If no volunteers match the necessary criteria, a pop-up is displayed quoting “No results found”, and the Browse Database page returned to.<br>\
<br>\
By checking specific volunteers, further operations may be performed. Having checked some volunteers, one may click ‘show all’, where volunteers can be explored to further depth. One may click ‘add to group’, which will cause a list of groups to appear at the bottom of the page; from here, one may choose to make a new group to put these volunteers in, or one can choose from the list of existing groups via the now-familiar checkbox system.<br>\
<br>\
If one clicks ‘export database’, a CSV file of the entire volunteers table will be generated and become available for download by the admin.'
		},
		style: {
			classes: 'qtip-light'
		},
		position: {
			my: 'top right',  // Position my top left...
			at: 'bottom left', // at the bottom right of...
			target: $('#help') // my target
		}
	});
});
	
function insertAfter(node, referenceNode)
{
    if (referenceNode.nextSibling != null)
        referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
    else
        referenceNode.parentNode.appendChild(node);
	return;
}

function allignTable(id)
{
	var rowNo=document.getElementById(id).rows.length;
	if (rowNo>1)
	{
		var length = document.getElementById(id).rows[1].cells.length;
		
		var widthses = new Array();
		for (var i=0; i<length; i++)
		{
			widthses[i] = document.getElementById(id).rows[1].cells[i].offsetWidth;
		}
		
		return widthses;
	}
	
	return 1;
}

function insertGroupRow(node, refNode)
{
    var input = document.getElementById(node);
    var newRow = document.createElement("tr");
    var tbody = document.getElementById(refNode);
    //var ID = refNode.lastChild.childNodes[0].
    var ID = 8;
    innerHTML = "<td class=unchecked><input type=checkbox checked name=checkAllGroups_"+ID+"></td><td>"+input.value+"</td>";
    newRow.innerHTML = innerHTML;
    tbody.appendChild(newRow);
}

function AddField()
{
    // I'm just gonna hardcode the default value for now
    var lastField = document.getElementById("lastFieldRow");
    lastField.id = "";
    var newField = document.createElement("tr");
    newField.id = "lastFieldRow";
    
    ++fieldRowsSize;
    // I'm writing to innerHTML first, as otherwise javascript will try to be 'clever' and prematurely close the HTML tags
    var innerHTML = "<td>Criteria</td><td><select id=field_"+fieldRowsSize+" name=field_"+fieldRowsSize+" onchange=SetValueInput(this.value,this.id,'input');>";
    for (var i = 0; i < fieldsSize; ++i)
    {
        if (fieldNames[i] == "First name")
            innerHTML += "<option selected>" + fieldNames[i] + "</option>";
        else
            innerHTML += "<option>" + fieldNames[i] + "</option>";
    }
    innerHTML += "</select></td><td>Value</td><td><input id=value_"+fieldRowsSize+" name=value_"+fieldRowsSize+" type=text value=''></td>";
    newField.innerHTML = innerHTML;
    insertAfter(newField, lastField);
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
        if (inputs[i].name.substring(0,id.length) == id)
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
        if (inputs[i].name.substring(0,id.length) == id)
			inputs[i].checked = false;
}

function SetValueInput(field, id, oldType)
{
    var enumIndex = enumNames.indexOf(field);
    var setIndex = setNames.indexOf(field);
    id = id.substring(id.lastIndexOf('_')+1);
    
    // Input type is currently a simple text box
    if (oldType == "input")
    {
        // Find the value input box
        var input = document.getElementById("value_"+id);
        // If selected field is an enum
        if (enumIndex != -1)
        {
            // Change the field selection's onchange w.r.t. 'select'
            document.getElementById("field_"+id).attributes.getNamedItem("onchange").textContent = "SetValueInput(this.value,this.id,'select');";

            // Create the new select-option dropdown box for the value
            var select = document.createElement("select");
            select.name = "value_"+id;
            select.id = "value_"+id;
            select.innerHTML = "";
            var enumOffset = enumOffsets[enumIndex];
            var enumOffset_end = enumIndex+1 == enumNamesSize ? enumValuesSize : enumOffsets[enumIndex+1];
            for (var ii = enumOffset; ii < enumOffset_end; ++ii)
                select.innerHTML += "<option>" + enumValues[ii] + "</option>";

            // Replace the current input box with new dropdown box
            input.parentNode.insertBefore(select, input);
            input.parentNode.removeChild(input);
            return;
        }
        
        // If selected field is a set
        if (setIndex != -1)
        {
            // Change the field selection's onchange w.r.t. 'checkbox'
            document.getElementById("field_"+id).attributes.getNamedItem("onchange").textContent = "SetValueInput(this.value,this.id,'checkbox');";

            // Create the new checkbox table for the value
            var table = document.createElement("div");
            table.className = "chkbxs";
            table.id = "value_"+id;
            var innerHTML = "<table>";
            var setOffset = setOffsets[setIndex];
            var setOffset_end = setIndex+1 == setNamesSize ? setValuesSize : setOffsets[setIndex+1];
            for (var ii = setOffset; ii < setOffset_end; ++ii)
                innerHTML += "<tr><td><input type=checkbox name=value_"+id+"_" + setValues[ii] + ">" + setPrettyValues[ii] + "</td></tr>";
            innerHTML += "</table>";
            table.innerHTML = innerHTML;
            // Replace the current input box with new checkbox table
            insertAfter(table, input);
            input.parentNode.removeChild(input);
            return;
        }
        
        // Selected field is neither an enum nor a set
        input.type = fieldTypes[fieldNames.indexOf(field)];
        return;
    }
    
    // Input type is currently a list of checkboxes
    else if (oldType == "checkbox")
    {
        // Find the value input box
        var table = document.getElementById("value_"+id);
        // If selected field is a set
        if (setIndex != -1)
        {
            // Replace the entries of the table
            innerHTML = "<table>";
            var setOffset = setOffsets[setIndex];
            var setOffset_end = setIndex+1 == setNamesSize ? setValuesSize : setOffsets[setIndex+1];
            for (var ii = setOffset; ii < setOffset_end; ++ii)
                innerHTML += "<tr><td><input type=checkbox name=value_"+id+"_" + setValues[ii] + ">" + setPrettyValues[ii] + "</td></tr>";
            innerHTML += "</table>";
            table.innerHTML = innerHTML;

            return;
        }
        
        // If selected field an enum
        if (enumIndex != -1)
        {
            // Change the field selection's onchange w.r.t. 'select'
            document.getElementById("field_"+id).attributes.getNamedItem("onchange").textContent = "SetValueInput(this.value,this.id,'select');";

            // Create the new select-option dropdown box for the value
            var select = document.createElement("select");
            select.name = "value_"+id;
            select.id = "value_"+id;
            select.innerHTML = "";
            var enumOffset = enumOffsets[enumIndex];
            var enumOffset_end = enumIndex+1 == enumNamesSize ? enumValuesSize : enumOffsets[enumIndex+1];
            for (var ii = enumOffset; ii < enumOffset_end; ++ii)
                select.innerHTML += "<option>" + enumValues[ii] + "</option>";

            // Replace the current input box with new dropdown box
            table.parentNode.insertBefore(select, table);
            table.parentNode.removeChild(table);
            return;
        }

        // Selected field is neither an enum nor a set
        // Change the field selection's onchange w.r.t. 'input'
        document.getElementById("field_"+id).attributes.getNamedItem("onchange").textContent = "SetValueInput(this.value,this.id,'input');";

        // Create the new input text box for the value
        var input = document.createElement("input");
        input.name = "value_"+id;
        input.id = "value_"+id;
        input.type = fieldTypes[fieldNames.indexOf(field)];

        // Replace the current input box with the new text box
        table.parentNode.insertBefore(input, table);
        table.parentNode.removeChild(table);
        return;
    }
    
    // Input type is currently a select-option dropdown box
    else if (oldType == "select")
    {
        // Find the value input box
        var select = document.getElementById("value_"+id);
        // If selected field is an enum
        if (enumIndex != -1)
        {
            // Replace the entries of the dropdown box
            select.innerHTML = "";
            var enumOffset = enumOffsets[enumIndex];
            var enumOffset_end = enumIndex+1 == enumNamesSize ? enumValuesSize : enumOffsets[enumIndex+1];
            for (var ii = enumOffset; ii < enumOffset_end; ++ii)
                select.innerHTML += "<option>" + enumValues[ii] + "</option>";

            return;
        }
        
        // If selected field a set
        if (setIndex != -1)
        {
            // Change the field selection's onchange w.r.t. 'checkbox'
            
            document.getElementById("field_"+id).attributes.getNamedItem("onchange").textContent = "SetValueInput(this.value,this.id,'checkbox');";
            // Create the new select-option dropdown box for the value
            var table = document.createElement("div");
            table.id = "value_"+id;
            table.className = "chkbxs";
            var innerHTML = "<table>";
            var setOffset = setOffsets[setIndex];
            var setOffset_end = setIndex+1 == setNamesSize ? setValuesSize : setOffsets[setIndex+1];
            for (var ii = setOffset; ii < setOffset_end; ++ii)
                innerHTML += "<tr><td><input type=checkbox name=value_"+id+"_" + setValues[ii] + ">" + setPrettyValues[ii] + "</td></tr>";
            innerHTML += "</table>";
            table.innerHTML = innerHTML;
            // Replace the current input box with new dropdown box
            select.parentNode.insertBefore(table, select);
            select.parentNode.removeChild(select);
            return;
        }

        // Selected field is neither an enum nor a set
        // Change the field selection's onchange w.r.t. 'input'
        document.getElementById("field_"+id).attributes.getNamedItem("onchange").textContent = "SetValueInput(this.value,this.id,'input');";
                
        // Create the new input text box for the value
        var input = document.createElement("input");
        input.name = "value_"+id;
        input.id = "value_"+id;
        input.type = fieldTypes[fieldNames.indexOf(field)];

        // Replace the current input box with the new text box
        select.parentNode.insertBefore(input, select);
        select.parentNode.removeChild(select);
        return;
    }
}

function AddToFieldTypes(name, type)
{
    fieldNames[fieldsSize] = name;
    fieldTypes[fieldsSize] = type;
    ++fieldsSize;
}

function AddEnum(name, value)
{
    if (name != enumNames[enumNamesSize-1] || !enumValuesSize)
    {
        enumNames[enumNamesSize] = name;
        enumOffsets[enumNamesSize] = enumValuesSize;
        ++enumNamesSize;
    }
    enumValues[enumValuesSize] = value;
    ++enumValuesSize;
}

function AddSet(name, value, prettyValue)
{
    if (name != setNames[setNamesSize-1] || !setValuesSize)
    {
        setNames[setNamesSize] = name;
        setOffsets[setNamesSize] = setValuesSize;
        ++setNamesSize;
    }
    setValues[setValuesSize] = value;
    setPrettyValues[setValuesSize] = prettyValue;
    ++setValuesSize;
}

function submitForm(action)
{
	document.getElementById('form1').action = action;
    var output = '';
    $('#dataTable tbody tr td:nth-child(4)').each(function() {
        if($(this).parent().children().eq(0).children().eq(0).is(":checked"))
        {
            output += $(this).text()+", ";
        }
    });
    var input = $("<input>", { type: "hidden", name: "emailList", value: output.slice(0,-2) }); 
    $('#form1').append($(input));
	document.getElementById('form1').submit();
}

function submitFormGroups(action)
{
	document.getElementById('form1').action = action;
    var output = '';
    $('#dataTable tbody tr td:nth-child(4)').each(function() {
        if($(this).parent().children().eq(0).children().eq(0).is(":checked"))
        {
            output += $(this).text()+", ";
        }
    });
    var input = $("<input>", { type: "hidden", name: "emailList", value: output.slice(0,-2) });
    $('#form1').append($(input));
	//var sbmt = (output!='');
	if (output=='')
	{
		alert("Please choose at least one user.");
		return false;
	}
	output='';
	$('#groupsTable tbody tr td:nth-child(2)').each(function() {
        if($(this).parent().children().eq(0).children().eq(0).is(":checked"))
        {
            output += $(this).text()+", ";
        }
    });
	if (output!='')
	{
		input = $("<input>", { type: "hidden", name: "groupList", value: output.slice(0,-2) });
		$('#form1').append($(input));
		document.getElementById('form1').submit();
		return true;
	}
	else
	{
		alert ("Please choose at least one group.");
		return false;
	}
}

function submitFormMore(action)
{
	document.getElementById('form1').action = action;
	if (action.indexOf("email") != -1)
	{
		var output = '';
		$('#dataTable tbody tr td:nth-child(6)').each(function() {
			if($(this).parent().children().eq(0).children().eq(0).is(":checked"))
			{
				output += $(this).text()+", ";
			}
		});
		var input = $("<input>", { type: "hidden", name: "emailList", value: output.slice(0,-2) }); 
		$('#form1').append($(input)); 
	}
	document.getElementById('form1').submit();
}

function sortByField(field)
{
    var list = document.getElementById(field);

    var items = list.childNodes;
    var itemsArr = [];
    for (var i in items) {
        if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
            itemsArr.push(items[i]);
        }
    }

    itemsArr.sort(function(a, b){
        return a.innerHTML == b.innerHTML
            ? 0
            : (a.innerHTML > b.innerHTML ? 1 : -1);
    });

    for (i = 0; i < itemsArr.length; ++i)
      list.appendChild(itemsArr[i]);
}