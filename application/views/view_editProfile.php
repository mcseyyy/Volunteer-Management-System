<!doctype html>
<html>
<head>
 <link rel="stylesheet" href="/styles/registration.css"/>
 <script src="/scripts/jquery-1.10.2.js"></script>
 <script src="/scripts/jquery.validate.js"></script>
 <script src="/scripts/additional-methods.js"></script>
 <script>
	$(document).ready(function () {
		$("#myForm").validate({
		
			// Specify the validation rules
			rules: {
				
				randomRule: {} //Do not delete this (it is needed for COMMA reasons)
				<?php
					foreach ($fields as $field)
					{
						if ($field->fieldType=="smallText" || $field->fieldType=="bigText" || $field->fieldType=="date")
						{
							$comma=false;
							echo ",".$field->ID.": {";		
							if ($field->required==true)
							{
								echo "required: true";
								$comma=true;
							}
							
							if ($field->fieldType=='smallText')
								{
									if ($comma)
									echo ",";
									echo "minlength: ".$field->minLength;
									echo ", maxlength: ".$field->maxLength;
									
									if ($field->options=='Phone Number')
										echo ",phoneNumber: true";
									else if ($field->options=='Postcode')
										echo ",UKpostcode: true";
									else if ($field->options=='Name')
										echo ",letterswithbasicpunc: true ";
									else if ($field->options=='Email')
										echo ", email: true ";
										
									$comma=true;										
								}
							else if ($field->fieldType=='bigText')
								{
									if ($comma)
									echo ",";
									echo "minWords: ".$field->minLength;
									echo ", maxWength: ".$field->maxLength;
									
									if ($field->options=='Phone Number')
										echo ",phoneNumber: true";
									else if ($field->options=='Postcode')
										echo ",UKpostcode: true";
									else if ($field->options=='Name')
										echo ",letterswithbasicpunc: true ";
									else if ($field->options=='Email')
										echo ", email: true ";
										
									$comma=true;	
								}
							
							else if ($field->fieldType=='date')
							{
								if ($comma)
									echo ",";
								echo "dateyyyymmdd: true";
								$comma=true;
							}
							echo "}";
						}
					}
					
					

				
				?>
			}
			/*,			
			messages: {
				passwordVerify: "Please enter the same password.";
				termsConditions: "Please accept the terms and conditions";
			}*/
			
		});

	});
 
 </script>
 <title><?php echo $user['firstName']." ".$user['surname']." Edit"?></title>
</head>
<body>
	<div class="outBox">
	<h1 id=h1><?php echo $user['firstName']." ".$user['surname']." - Edit profile"?></h1><br>
	<div class="fieldsBox">
		<form id="myForm" method="post" action="../../editProfile/submitEdit?user=<?php echo $_GET['user'];?>">
		

		<?php
			echo '<div class="categoryBox">';
			echo '<div class="headerBox"><h2>'.$categoryName.'</h2></div>';
			echo '<div class="insideFields">';
			$table=false;
			foreach ($fields as $field)
			{			
				if ($field->fieldType=='smallText')
				{
					if ($table==false)
					{
						echo '<table>';

						$table=true;
					}
					echo '<tr>';
					echo '<td><span>'.$field->name;
					if ($field->required==true)
						echo"<font color='red'>*</font>";
					echo '</span></td>';
					echo '<td><input type="text", size="16", name="'.$field->ID.'", value="'.$user['field'.$field->ID].'"></td>';
					echo '</tr>';						
				}
				
				else if ($field->fieldType=='text')
				{
					if ($table==true)
					{
						echo '</table>';
						$table=false;
					}
					echo '<li><span style="font-size:';
					if ($field->options=='Normal')
						echo '1em">';
					else if ($field->options=="Small")
						echo '0.8em">';
					else
						echo '1.4em">';
					echo $field->name;
					echo '</span></li>';
				}
				
				else if ($field->fieldType=='bigText')
				{
					if ($table==true)
					{
						echo '</table>';
						$table=false;
					}
					echo '<li><span>'.$field->name;
					if ($field->required==true)
						echo"<font color='red'>*</font>";
					echo '</span></li>';
					echo '<textarea cols="100%" rows="12" name="'.$field->ID.'">'.$user['field'.$field->ID].'</textarea>';
				}
				
				else if ($field->fieldType=='DropDown')
				{
					echo '<br><span>'.$field->name.'</span><br>';
					$options = explode(",",$field->options);
					echo '<select name='.$field->ID.'>';
					foreach ($options as $option)
						if ($user['field'.$field->ID]==$option)
							echo '<option selected="selected">'.$option.'</option>';
						else
							echo '<option>'.$option.'</option>';
					echo '</select><br><br>';
				}
				
				else if ($field->fieldType=='date')
				{
					if ($table==false)
					{
						echo '<table>';
						$table=true;
					}
					echo '<tr>';
					echo '<td><span>'.$field->name;
					if ($field->required==true)
						echo"<font color='red'>*</font>";
					echo '<br>(yyyy-mm-dd)</span></td>';
					echo '<td><input type="text" size="16" name="'.$field->ID.'", value="'.$user['field'.$field->ID].'"></td>';
					echo '</tr>';
				}
				else if ($field->fieldType=='checkbox')
				{
					if ($table==true)
					{
						echo '</table>';
						$table=false;
					}
					echo '<span>'.$field->name.'</span><br>';
					$checkboxes=explode(",",$field->options);
					echo '<table>';
					echo '<col width="45%">
					<col width="40%">';
				
					for ($i=0;$i<sizeOf($checkboxes);$i=$i+2)
					{
						echo '<tr>';  
						echo '<td><input type="checkbox" name="checkbox'.$field->ID.'[]" value="'.$checkboxes[$i].'"';
						if (strpos($user['field'.$field->ID],$checkboxes[$i])!==false)
								echo "checked";
						echo '><span>'.$checkboxes[$i].'</span><br></td>';
						if ($i+1 < sizeOf($checkboxes)) 
						{
							echo '<td><input type="checkbox" name="checkbox'.$field->ID.'[]" value="'.$checkboxes[$i+1].'"';
							if (strpos($user['field'.$field->ID],$checkboxes[$i+1])!==false)
								echo "checked";
							echo '><span>'.$checkboxes[$i+1].'</span><br></td>';
						}
						echo '</tr>';
					}
					
					
					
					echo '</table>';
				}
				
				
			}
			if ($table==true)
				echo '</table>';
		?>
		<br>
		<div style=text-align:right><input class=butSave type=submit value="SAVE"></div>
		</div></div>
		</form>
	</div>
	</div>

</body>
</html>
