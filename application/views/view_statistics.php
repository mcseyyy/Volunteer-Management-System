<!doctype html>
<html>
<head>
	<!--<link rel=stylesheet href="/styles/registration.css">-->
	<link rel=stylesheet href="/styles/statistics.css">	
	<link rel=stylesheet href=/styles/jquery.qtip.min.css>
	<!--<link rel="stylesheet" href="/styles/newCategory.css">-->
	<script src="/scripts/jquery-latest.js"></script>
	<script src=/scripts/jquery.qtip.min.js></script>
	<script src="/scripts/statistics.js"></script>
		
	
	<meta charset="utf-8">
	<link rel="stylesheet" href="/styles/jquery-ui.css">
	<script src="/scripts/jquery-ui.js"></script>
	<script>
		$(function() {
			$( "#datepicker" ).datepicker({ dateFormat: "yy-mm-dd" });;
			$( "#datepicker1" ).datepicker({ dateFormat: "yy-mm-dd" });;
		});
	</script>
		
	<title>Statistics</title>
</head>

<div class=container>
    <div id="band">
		<div id=helpStats ></div>
	</div>
	<span id="wrapper">
		<div class="fieldsBox">
            <h1 id=h1> Statistics </h1>			
			<h4 id=h4>Select the criterion you want to generate statistics for.</h4>
        	<form id="myForm" method="post" action="../../statistics/submit">
            <table><tr>
			<td>Criterion</td>
            <td><select class="fieldList" name="fieldId">
			<option class="dropDown" value="title">Title</option>
			<option class="smallText" value="fname">First Name</option>
			<option class="smallText" value="sname">Surname</option>
			<option class="smallText" value="email">Email</option>
			<option class="date" value="rdate">Registration Date</option>
			<?php 
				foreach($fields as $field)
				{
					echo '<option class='.$field->fieldType.' value='.$field->ID.'>'.$field->name.'</option>';
				}
			?>
			</select></td></tr>
			
            <tbody class="textType">
			<tr>
                <td colspan='2'><span>Please separate the text fragments you are looking for by commas.</span><br></td>
            </tr>
			<tr>
                <td><span>Keywords:</span></td>
				<td><input type="text" size="58" name="search"></td>
			</tr>
            </tbody>
			
            <tbody class="dateType">
			<tr>
                <td>Start Date</td>
                <td><input type="text" id="datepicker" size="16" name="startDate"></td>
            </tr>
            <tr>
                <td>End Date</td>
                <td><input type="text" id="datepicker1" size="16" name="endDate"></td>
            </tr>
            <tr>
                <td>Interval</td>
                <td><select name="interval">
                    <option>Month</option>
                    <option>Year</option>
                </select></td>
            </tr>
            </tbody>
            
            <tr><td>Chart Type</td>
			<td><select class="chartList" name="chartType">				
				<option class="pie" value="pie"> Pie Chart</option>
				<option class="bar" value="bar">Bar chart</option>
			</select></td></tr></table>
			
			<b><div id=butgen>
			<input class=butSearch type=submit value="Generate"></div></b>
			
			</form>
		</div>
	</span>
</div>
</html>