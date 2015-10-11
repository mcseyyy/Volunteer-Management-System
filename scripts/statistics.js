$(document).ready(function(){
	function1();
	function2();
	$(".fieldList").change(function()
	{
		function1();
	});
	$(".fieldList").change(function()
	{
		function2();
	});	
	
	$('#helpStats').qtip({ 
		content: {
			text: '<b>Date</b><br>Select <i>Start Date</i>,<i>End Date</i> and <i>Interval</i>.<br>If you want statistics for each month between the dates selected set Interval to month. If you want statistics for each year set interval to year.<br><b>Checkbox and Drop-down List</b><br>Statistics will be generated for each option.<br><b>Text</b><br>Select the keywords you want to generate statistics for.<br><b>Chart Type</b><br>Select how you want to visualize the result.<br>Line Chart is only available for date fields.<br><br> To view results press <i>Generate</i>.'
		},
		style: {
			classes: 'qtip-light'
		},
		position: {
			my: 'top right',  // Position my top left...
			at: 'bottom left', // at the bottom right of...
			target: $('#helpStats') // my target
		}
	});
});


function function2()
{
	$type = $(".fieldList option:selected").attr('class');
	if ($type == "date")
	{
		$(".chartList").append('<option class="line" value="line">Line Chart</option>');
		$(".line").attr("selected",true);
		
	}
	else
	{
		$(".line").remove();
	}
}

function function1()
{
	$type = $(".fieldList option:selected").attr('class');
	if($type == "smallText" || $type =="bigText")
	{
		$(".textType").show(400);
		$(".dateType").hide();
		$('#band').animate({'height':'240px'}, 250);
		$('#stats').animate({'margin-top':'250px'}, 250);
		
	}
	else if($type == "date")
	{
		$(".textType").hide();
		$(".dateType").show(400);
		$('#band').animate({'height':'268px'}, 250);
		$('#stats').animate({'margin-top':'278px'}, 250); 
	}
	else
	{
		$(".textType").hide();
		$(".dateType").hide();
		$('#band').animate({'height':'180px'}, 250);
		$('#stats').animate({'margin-top':'190px'}, 250);
	}
}