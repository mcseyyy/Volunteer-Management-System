<!doctype html>
<html><head>
	<!--<link rel="stylesheet" href="/styles/registration.css"/>--> 
    <link rel="stylesheet" href="/styles/newCategory.css"/>
	<link rel=stylesheet href=/styles/jquery.qtip.min.css>
	<script src="/scripts/jquery-1.10.2.js"></script>
	<script src=/scripts/jquery.qtip.min.js></script>
	<script src="/scripts/jquery.validate.js"></script>
	<link rel="stylesheet" href="/styles/newField.css"/>
	<script src="/scripts/additional-methods.js"></script>
	<script src="/scripts/newField.js"></script>
    <script src=/scripts/browse_database.js></script>
    <script src=/scripts/jquery.tablesorter.js></script>
	<title><?php echo $tableName;?></title>
</head>
<body>
    <div id=band>
		<div id=helpRegEdit ></div>
	</div>
	<div class="wrapper">
		
	<div class="headerBox">
        <h2 id=h1><?php echo $tableName;?></h2>
        <input class="butSave" type="button" value="+ New field" id="newFieldButton">
    </div>
		<div class="fieldsBox">			
			<!--   div for insertin a new caegory       -->
			<div id="newField">
				<h2>Type of field</h2>
				<form id="myForm" method="post" onsubmit="return checkForm(this)" action="submitField?cat=<?php echo $_GET['category'];?>">
				
				<select name="fieldType" id="fieldType">
					<option></option>
					<option>Dropdown Menu</option>
					<option>Small Text Box</option>
					<option>Big Text Box</option>
					<option>Text</option>
					<option>Checkbox</option>
					<option>Date</option>
				</select>
				
				<div id="tableName">
					<span>Name of the field in Browse Database</span>
					<input type="text" name="tableName"><br>
				</div>
				
				<div class="default">
					<h3>Please select field type.</h3>
				</div>
				<div class="dropDown">
					<span>Name of the field in the registration form:</span>
					<input type="text" name="dropdownname"><br>
					<span>Please insert the options (separated by a comma)</span><br>
					<textarea cols="61%" rows="5" name="dropdownoptions"></textarea><br>
				</div>
				<div class="smallText">
					<table>
					<tr>
						<td><span>Name of the text box:</span></td>
						<td><input type="text" name="smalltextname"></td>
					</tr>
					<tr>
						<td><span>Is the field required?</span></td>
						<td><select name="smalltextrequired">
								<option>No</option>
								<option>Yes</option>
							</select></td>
					</tr>
					<tr>
						<td><span>Minimum input length(characters):</span></td>
						<td><input type="text" name="smalltextminLength" value="0"></td>
					</tr>
					<tr>
						<td><span>Maximum input length(characters):</span></td>
						<td><input type="text" name="smalltextmaxLength" value="40"></td>
					</tr>
					<tr>
						<td><span>Text type:</span></td>
						<td><select name="smalltextoptions">
							<option>Just text</option>
							<option>Phone Number</option>
							<option>Postcode</option>
							<option>Name</option>
							<option>Email</option>
						</select></td>
					</tr>							
					</table>
				</div>
				<div class="bigText">
					<table>
					<tr>
						<td><span>Question for the text box:</span></td>
						<td><input type="text" name="bigtextname"></td>
					</tr>
					<tr>
						<td><span>Is the field required?</span></td>
						<td><select name="bigtextrequired">
								<option>No</option>
								<option>Yes</option>
							</select></td>
					</tr>
					<tr>
						<td><span>Minimum input length(words):</span></td>
						<td><input type="text" name="bigtextminLength" value="0"></td>
					</tr>
					<tr>
						<td><span>Maximum input length(words):</span></td>
						<td><input type="text" name="bigtextmaxLength" value="500"></td>
					</tr>
					<tr>
						<td><span>Text type:</span></td>
						<td><select name="bigtextoptions">
							<option>Just text</option>
							<option>Phone Number</option>
							<option>Postcode</option>
							<option>Name</option>
							<option>Email</option>
						</select></td>
					</tr>
					</table>
				</div>
				<div class="text">
					<span>What text would you like to be displayed in the registration form?</span><br><br>
					<textarea cols="60%" rows="7" name="textname"></textarea> <br>
					<span>Text size</span>
					<select name="textSize">
						<option>Normal</option>
						<option>Small</option>
						<option>Big</option>
					</select>
					
				</div>
				<div class="checkBox">
					<span>Name of the field:</span>
					<input type="text" name="checkboxname"><br>
					<span>Please insert the options (separated by a comma)</span><br>
					<textarea cols="61%" rows="5" name="checkboxoptions"></textarea><br>
				</div>
				<div class="date">
					<table>
					<tr>
						<td><span>Name:</span></td>
						<td><input type="text" name="datename"></td>
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
						<td><select name="daterequired">
								<option>No</option>
								<option>Yes</option>
							</select></td>
					</tr>
					</table>
				</div>
				<input class=butSave type="submit" value="Save Field">
				</form>
			</div>
			
			<form id="myForm" method="post" action="moveTo?category=<?php echo $_GET['category']?>">
			<table id="categories">
                <thead class=head>
				<tr>
					<th>Field Name</td>
					<th>Field Type</td>
					<th>Required? </td>
					<th>Minimum Length </td>
					<th>Maximum Length </td>
					<th>Options </td>
					<th id=del>Move to different category: </td>
                    <th id=del></th>
                    <th id=del></th>
                    <th id=del></th>
                    <th id=del></th>
                    <th id=del>DELETE</th>
				</tr>
                </thead>
                <tbody id=bode>
				<?php 
					foreach ($fields as $field)
					{
						echo "<tr>";
						echo "<td><a href='fieldEdit?field=".$field['ID']."'>".$field['name']."</a></td>\n";
						//echo "<td>".$field['name']."</td>";
						echo "<td>";
						if ($field['fieldType']=="smallText")
							echo "Small Text Box";
						else if ($field['fieldType']=="bigText")
							echo "Big Text Box";
						else if ($field['fieldType']=="DropDown")
							echo "Dropdown Menu";
						else if ($field['fieldType']=="text")
							echo "Text";
						else if ($field['fieldType']=="checkbox")
							echo "Checkbox";
						else if ($field['fieldType']=="date")
							echo "Date";
						echo "</td>";
						if ($field['fieldType']=='smallText'||$field['fieldType']=='bigText'||$field['fieldType']=='date')
						{
							if ($field['required'])
								echo "<td>Yes</td>";
							else
								echo "<td>No</td>";
						}
						else
							echo "<td></td>";
						if ($field['fieldType']=='smallText'||$field['fieldType']=='bigText')
							echo "<td>".$field['minLength']."</td>";
						else
							echo "<td></td>";
						if ($field['fieldType']=='smallText'||$field['fieldType']=='bigText')
							echo "<td>".$field['maxLength']."</td>";
						else
							echo "<td></td>";
						echo "<td>".$field['options']."</td>";
						echo '<td><select name="'.$field['ID'].'">';
							foreach ($categories as $category)
								if ($category->name!==$tableName)
									echo "<option>".$category->name."</option>";
								else
									echo '<option selected="selected">'.$category->name."</option>";
						
						echo "</select></td>";
						echo "<td><a href='fieldEdit?field=".$field['ID']."'>Edit</a></td>\n";
						if ($field['show']==true)
							echo "<td><a href='hideField?field=".$field['ID']."&category=".$field['category']."'>Hide</a></td>\n";
						else
							echo "<td><a href='showField?field=".$field['ID']."&category=".$field['category']."'>Show</a></td>\n";
						echo "<td><a href='upField?field=".$field['ID']."&category=".$field['category']."'>Move Up</a></td>\n";
						echo "<td><a href='downField?field=".$field['ID']."&category=".$field['category']."'>Move Down</a></td>\n";
						echo "<td class='delField'><a href='deleteField?field=".$field['ID']."&category=".$field['category']."' style=color:#FFFFFF>Delete</a></td>\n";
						
						echo "</tr>";
						
					}
				?>
                    <tr class=nohover><td class="nostyle"></td><td class="nostyle"></td><td class="nostyle"></td><td class="nostyle"></td>
                    <td class="nostyle"></td><td class="nostyle"></td>
                    <td class="nostyle"><input class="butSaveMove" type=submit value="SAVE movements"></td></tr>
                </tbody>	
			</table></form>
		</div>
	</div>
<script>
    $(document).ready(function(){       
        var $widths = allignTable('categories');
        for (var i=0; i<32; i++)
        {
            $('th').eq(i).css('min-width', $widths[i]-10);
            $('th').eq(i).css('max-width', $widths[i]-10);
        }      
    });
    
    $(window).resize(function(){
        var $widths = allignTable('categories');
        for (var i=0; i<32; i++)
        {
            $('th').eq(i).css('min-width', $widths[i]-10);
            $('th').eq(i).css('max-width', $widths[i]-10);
        }
    });
	
	$(window).scroll(function(){
        $('.head').css('left', -$(window).scrollLeft() + 10);
    });
</script>

</html>