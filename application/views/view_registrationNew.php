<!doctype html>
<html>
<head>
 <link rel="stylesheet" href="/styles/registration.css"/>
 <script src="/scripts/jquery-latest.js"></script>
 <script src="/scripts/jquery.validate.js"></script>
 <script src="/scripts/additional-methods.js"></script>
 
 <meta charset="utf-8">
 <link rel="stylesheet" href="/styles/jquery-ui.css">
 <script src="/scripts/jquery-ui.js"></script>
 
 <?php
	$length = $this->db->query("SELECT minLength,maxLength FROM fields WHERE name='Date of Birth'")->row();
	$min = $length->minLength;
	$max = $length->maxLength;
 ?>
 
 <script>
	$(function() {
		$( "#datepicker" ).datepicker({ dateFormat:"yy-mm-dd", maxDate:"-<?php echo $min?>y", minLength:"<?php echo $max?>y"});;
	});
 </script>
 
 <script src="/scripts/registration.js"></script>
 <script>
	$(document).ready(function () {
		$("#myForm").validate({
		
			// Specify the validation rules
			rules: {
				firstName: {
					required: true,
					minlength: 2,
					lettername: true				
				},			
				surname: {
					required: true,
					minlength: 2,
					lettername: true
				},			
				password: {
					required: true,
					minlength: 6
				},
				passwordVerify: {
					required: true
					//equalTo: "#password"
				},				
				termsConditions: {
					required: true
				}
				<?php
					foreach ($categories as $category)
					{
						if ($category->show==true)
						{
							foreach ($fields[$category->ID] as $field)
							{
								if ($field->show==true && ($field->fieldType=="smallText" || $field->fieldType=="bigText" || $field->fieldType=="date")) 
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
										echo ", maxWords: ".$field->maxLength;
										
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
 <title>Volunteer registration</title>
</head>
<body>
	<div class="outBox">
	<h1>Registration</h1><br>
	<div class="fieldsBox">
		<form id="myForm" method="post" action="../../registrationNew/submit?url=<?php echo $_GET['unique']?>">
		<div class="categoryBox">
			<div class="headerBox"><h2>Personal Details</h2></div>
			<div class="insideFields">
			<table>
			<tr>
				<td><span>Title<font color='red'>*</font></span></td>
				<td>
					<select name="personalTitle">
						<option>Mr.</option>
						<option>Ms.</option>
						<option>Mrs.</option>
						<option>Miss</option>
						<option>Dr.</option>
					</select>
				</td>
			</tr>
			
			<tr>
				<td><span>First Name<font color='red'>*</font></span></td>
				<td><input type="text" size="16" name="firstName"></td>
			</tr>
			
			<tr>
				<td><span>Surname<font color='red'>*</font></span></td>
				<td><input type="text"  size="16" name="surname"></td>
			</tr>
			
			<tr>			
				<td><span>Email<font color='red'>*</font></span></td>
				<td><span><?php echo $email;?></span></td>
			</tr>
			
			<tr>
				<td><span>Password<font color='red'>*</font></span></td>
				<td><input type="password"  size="16" name="password" id="password"></td>
			</tr>
			
            <tr>
				<td><span>Verify Password<font color='red'>*</font></span></td>
				<td>
					<input type="password"  size="16" name="passwordVerify" id="passwordVerify">
					<label class="error" style="display: none;" id="passwordError">The passwords have to match.</label>
				</td>
			</tr>	
			</table>
			<input type="hidden" size="1" name="email" value="<?php echo $email; ?>">
			</div>
		</div>

		<?php
			foreach ($categories as $category)
			{
				if ($category->show==true)
				{
                    echo '<div class="categoryBox">';
                    echo '<div class="headerBox"><h2>'.$category->name.'</h2></div>';
                    echo '<div class="insideFields">';
                    $table=false;
                    foreach ($fields[$category->ID] as $field)
                    {
                        if ($field->show==true) 
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
                                echo '<td><input type="text", size="16", name="'.$field->ID.'"></td>';
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
                                echo '<textarea cols="100%" rows="12" name="'.$field->ID.'"></textarea>';
                            }
                            
                            else if ($field->fieldType=='DropDown')
                            {
                                echo '<br><span>'.$field->name.'</span><br>';
                                $options = explode(",",$field->options);
                                echo '<select name='.$field->ID.'>';
                                foreach ($options as $option)
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
                                echo '<td><input type="text" id="datepicker" size="16" name="'.$field->ID.'"></td>';
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
                                    echo '<td><input type="checkbox" name="checkbox'.$field->ID.'[]" value="'.$checkboxes[$i].'"><span>'.$checkboxes[$i].'</span><br></td>';
                                    if ($i+1 < sizeOf($checkboxes)) 
									{
                                        echo '<td><input type="checkbox" name="checkbox'.$field->ID.'[]" value="'.$checkboxes[$i+1].'"><span>'.$checkboxes[$i+1].'</span><br></td>';
									}
                                    echo '</tr>';
                                }
                                echo '</table>';
                            }
                        }
                        
                    }
                    if ($table==true)
                        echo '</table>';
                    echo '</div></div>';
				}
			}
		
		
		?>
		
		<input type="checkbox" name="termsConditions" value="termsConditions"><span>I agree with the </span> <a href="../terms_and_conditions/" target="_blank">Terms and Conditions.</a> <br>
		<input type=submit value="SUBMIT"><br>
		</ul>
			
			
		</form>
	</div>
	</div>

</body>
</html>
