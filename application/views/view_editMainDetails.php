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
				email: {
					required: true,
					email: true
				}
			}
			/*,			
			messages: {
				passwordVerify: "Please enter the same password.";
				termsConditions: "Please accept the terms and conditions";
			}*/
			
		});

	});
 
 </script>
 <title><?php echo $fields->firstName." ".$fields->surname." Edit"?></title>
</head>
<body>
	<div class="outBox">
	<h1 id=h1><?php echo $fields->firstName." ".$fields->surname." - Edit profile"?></h1><br>
	<div class="fieldsBox">
		<form id="myForm" method="post" action="../../editProfile/submitEditMain?user=<?php echo $_GET['user'];?>">
		<div class="categoryBox">
			<div class="headerBox"><h2>Personal Details</h2></div>
			<div class="insideFields">
			<table>
			<tr>
				<td><span>Title<font color='red'>*</font></span></td>
				<td>
					<select name="title">
						<?php
							if ($fields->title=="Mr.")
								echo '<option selected="selected">Mr.</option>';
							else
								echo '<option >Mr.</option>';
								
							if ($fields->title=="Ms.")
								echo '<option selected="selected">Ms.</option>';
							else
								echo '<option >Ms.</option>';
								
							if ($fields->title=="Mrs.")
								echo '<option selected="selected">Mrs.</option>';
							else
								echo '<option >Mrs.</option>';
								
							if ($fields->title=="Miss")
								echo '<option selected="selected">Miss</option>';
							else
								echo '<option >Miss</option>';
								
							if ($fields->title=="Dr.")
								echo '<option selected="selected">Dr.</option>';
							else
								echo '<option >Dr.</option>';
						?>
					</select>
				</td>
			</tr>
			
			<tr>
				<td><span>First Name<font color='red'>*</font></span></td>
				<td><input type="text" size="16" name="firstName" value="<?php echo $fields->firstName;?>"></td>
			</tr>
			
			<tr>
				<td><span>Surname<font color='red'>*</font></span></td>
				<td><input type="text"  size="16" name="surname" value="<?php echo $fields->surname;?>"></td>
			</tr>
			
			<tr>			
				<td><span>Email<font color='red'>*</font></span></td>
				<td><input type="text" size="16" name="email" value="<?php echo $fields->email;?>"></td>
			</tr>
			
			
			</table>
			<br>
			<div style=text-align:right><input class=butSave type=submit value="SAVE"></div>
			</div>
		</div>
		</form>
	</div>
	</div>

</body>
</html>
