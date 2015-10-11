<!doctype html>
<html><head>
    <link rel="stylesheet" href="/styles/newCategory.css"/>
	<link rel=stylesheet href=/styles/jquery.qtip.min.css>
	<script src="/scripts/jquery-1.10.2.js"></script>
	<script src=/scripts/jquery.qtip.min.js></script>
	<script src="/scripts/jquery.validate.js"></script>	
	<!--<link rel="stylesheet" href="/styles/newField.css"/>-->
	<script src="/scripts/additional-methods.js"></script>
	<script src="/scripts/newField.js"></script>
	<title>New category</title>
</head>
<body>
    <div id=band3><div id=helpFieldEdit ></div></div>
	<div class="wrapper">
        <form id="myForm" method="post" action="fieldEditSubmit?field=<?php echo $ID;?>">
        <div class="headerBox"><h2 id=h1><?php if ($fieldType!='text') echo $tableName; else echo 'Text'; ?></h2>
        <input class="butSave" type="submit" value="Save Field"></div>
        
            <div class="fieldsBox">	
			<?php if ($fieldType!='text')
				echo '
				<div>
					<span>Name of the field in Browse Database</span>
					<input type="text" name="tableName" value="'.$tableName.'"><br>
				</div>';
				if ($fieldType=='DropDown')
				echo'
					<div class="dropDown">
						<span>Name of the field in the registration form:</span>
						<input type="text" name="dropdownname" value="'.$name.'"><br>
						<span>Please insert the options (separated by a comma)</span>
						<textarea cols="61%" rows="5" name="dropdownoptions">'.$options.'</textarea><br>
					</div>';
				
				else if ($fieldType=='smallText') {
				echo '
					<div class="smallText">
						<table id="fieldEditTab">
						<tr>
							<td><span>Name of the text box:</span></td>
							<td><input type="text" name="smalltextname" value="'.$name.'"></td>
						</tr>
						<tr>
							<td><span>Is the field required?</span></td>
							<td><select name="smalltextrequired">';
							if ($required)
							echo	'<option>No</option>
									<option selected>Yes</option>';
							else echo '<option selected>No</option>
									<option>Yes</option>';
							echo '	</select></td>
						</tr>
						<tr>
							<td><span>Minimum input length(characters):</span></td>
							<td><input type="text" name="smalltextminLength" value="'.$minLength.'"></td>
						</tr>
						<tr>
							<td><span>Maximum input length(characters):</span></td>
							<td><input type="text" name="smalltextmaxLength" value="'.$maxLength.'"></td>
						</tr>
						<tr>
							<td><span>Text type:</span></td>
							<td><select name="smalltextoptions">
								<option'; if ($options=='Just text') echo ' selected'; echo'>Just text</option>
								<option'; if ($options=='Phone Number') echo ' selected'; echo'>Phone Number</option>
								<option'; if ($options=='Postcode') echo ' selected'; echo'>Postcode</option>
								<option'; if ($options=='Name') echo ' selected'; echo'>Name</option>
								<option'; if ($options=='Email') echo ' selected'; echo'>Email</option>
							</select></td>
						</tr>							
						</table>
					</div>';
				}
				else if ($fieldType=='bigText') {
				echo '
					<div class="bigText">
						<table>
						<tr>
							<td><span>Question for the text box:</span></td>
							<td><input type="text" name="bigtextname"></td>
						</tr>
						<tr>
							<td><span>Is the field required?</span></td>
							<td><select name="bigtextrequired">';
						if ($required)
							echo	'<option>No</option>
									<option selected>Yes</option>';
						else echo '<option selected>No</option>
									<option>Yes</option>';
						echo '</select></td>
						</tr>
						<tr>
							<td><span>Minimum number of words:</span></td>
							<td><input type="text" name="bigtextminLength" value="'.$minLength.'"></td>
						</tr>
						<tr>
							<td><span>Maximum number of words:</span></td>
							<td><input type="text" name="bigtextmaxLength" value="'.$maxLength.'"></td>
						</tr>
						<tr>
							<td><span>Text type:</span></td>
							<td><select name="bigtextoptions">
								<option'; if ($options=='Just text') echo ' selected'; echo'>Just text</option>
								<option'; if ($options=='Phone Number') echo ' selected'; echo'>Phone Number</option>
								<option'; if ($options=='Postcode') echo ' selected'; echo'>Postcode</option>
								<option'; if ($options=='Name') echo ' selected'; echo'>Name</option>
								<option'; if ($options=='Email') echo ' selected'; echo'>Email</option>
							</select></td>
						</tr>
						</table>
					</div>';
				}
				else if ($fieldType=='text') {
				echo'
					<div class="text">
						<span>What text would you like to be displayed in the registration form?</span><br><br>
						<textarea cols="60%" rows="7" name="textname">'.$name.'</textarea> <br>
						<span>Text size</span>
						<select name="textSize">
							<option'; if ($options=='Normal') echo ' selected';echo'>Normal</option>
							<option'; if ($options=='Small') echo ' selected'; echo'>Small</option>
							<option'; if ($options=='Big') echo ' selected'; echo'>Big</option>
						</select>
						
					</div>';
				}	
				else if ($fieldType=='checkbox') {
				echo '
					<div class="checkBox">
						<span>Name of the field:</span>
						<input type="text" name="checkboxname" value ="'.$name.'"><br>
						<span>Please insert the options (separated by a comma)</span>
						<textarea cols="61%" rows="5" name="checkboxoptions">'.$options.'</textarea><br>
					</div>';
				}
				else if ($fieldType=='date') {
					echo '<div class="date">
						<table>
						<tr>
							<td><span>Name:</span></td>
							<td><input type="text" name="datename" value="'.$name.'"></td>
						</tr>
						<tr>
							<td><span>Minimum years ago:<br>(from current date)</span></td>
							<td><input type="text" name="minimum"></td>
						</tr>
						<tr>
							<td><span>Maximum years ago:<br>(from current date)</span></td>
							<td><input type="text" name="maximum"></td>
						</tr>
						<tr>
							<td><span>Is the field required?</span></td>
							<td><select name="daterequired">';
						if ($required)
							echo	'<option>No</option>
									<option selected>Yes</option>';
							else echo '<option selected>No</option>
									<option>Yes</option>';
							echo '	</select></td>
								
						</tr>
						</table>
					</div>';
				}
					
			?>
			</form>	
			</div>
			
		</div>
	</div>


</html>