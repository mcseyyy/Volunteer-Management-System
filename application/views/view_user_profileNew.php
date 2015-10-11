<!doctype html>
<html>
<head>
	<link rel="stylesheet" href="/styles/registration.css"/>
	<link rel="stylesheet" href="/styles/userProfile.css"/>
	<script src="/scripts/jquery-1.10.2.js"></script>
	<script src="/scripts/jquery.validate.js"></script>
	<script src="/scripts/changePassword.js"></script> 
	<script src="/scripts/additional-methods.js"></script> 
	<title>User profile</title>
	<script>
		$(document).ready(function () {
			$("#myForm").validate({
			
				// Specify the validation rules
				rules: {
					oldPassword: {
						required: true
					},			
					password: {
						required: true,
						minlength: 6
					},
					passwordVerify: {
						required: true,
						minlength: 6
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
	
	
	
</head>
<body>
	<div class="outBox">
	<h1 id=h1><?php echo $user['firstName']." ".$user['surname']."'s profile";?></h1>
	<?php
		if($this->user->confirm_Member() && $this->user->is_Admin())
		{
			echo '<b>User ID:  </b>';
			echo $user['ID'];
			echo '<br><b>Last log in: </b>'; 
			$lastlogin=$this->db->query("SELECT * FROM volunteersNew WHERE ID={$user['ID']}")->row()->lastLogIn;
			if ($lastlogin=='0000-00-00')
				echo ('Never');
			else 
				echo $lastlogin;
			echo '<br><br>';
		}
	?>
	
	
	<strong><?php if ($text!=='') echo $text;?></strong><br>
	
	<?php	
		if ($deletePermission)
			echo '<a href="../../editProfile/deleteUser?user='.$user["ID"].'"><input id=delUsr class=butSave type=button value="Delete Profile"></a><br><br>';
	?>
	<div class="fieldsBox">
		
		<div class="categoryBox">
			
			<div class="headerBox"><div style="overflow: hidden;">
				<div style ="float:left;"> <h2>Personal Details</h2> </div>
				<?php 
					if ($deletePermission)
					{
				?>
				<div style="float:right;"> <p><a href="../../editProfile/editMainDetails?user=<?php echo $user['ID'];?>">Edit</a><p> </div>
				<?php } ?>
			</div></div>
			<div class="insideFields">
				<table>
				<tr>
					<td><span class="fieldName">Title</font></span></td>
					<td><span><?php echo $user['title'];?></span></td>
				</tr>
				<tr>
					<td><span class="fieldName">First Name</font></span></td>
					<td><span><?php echo $user['firstName'];?></span></td>
				</tr>
				<tr>
					<td><span class="fieldName">Surname</font></span></td>
					<td><span><?php echo $user['surname'];?></span></td>
				</tr>
				<tr>			
					<td><span class="fieldName">Email</font></span></td>
					<td><span><?php echo $user['email'];?></span></td>
				</tr>
				</table><br>
				
				<?php 
					if ($deletePermission)
					{
				?>
				<input class=butSave type="button" id="changePassButton" value="Change password" >
				<div id="changePassword">				
					<form id="myForm" method="post" action="../../editProfile/changePassword?user=<?php echo $user['ID'];?>">
						<table>
							<tr>
								<td><span class="fieldName"> Old Password</span></td>
								<td><input type="password" size="16" name="oldPassword"></td>
							<tr>
							<tr>
								<td><span class="fieldName"> New Password</span></td>
								<td><input type="password" size="16" name="password" id="password"></td>
							<tr>
							<tr>
								<td><span class="fieldName">  Verify Password</span></td>
								<td>
									<input type="password" size="16" name="passwordVerify" id="passwordVerify">
									<label class="error" style="display: none;" id="passwordError">The passwords have to match.</label>
								</td>
							<tr>
						</table>
						<input class=butSave type="submit" value="Save Password">
					</form>
				</div>
				<?php } ?>
				
				
			</div>
		</div>
		<?php
			foreach ($categories as $category)
			{
				echo '<div class="categoryBox">';
				echo '<div class="headerBox"><div style="overflow: hidden;">';
				echo '<div style ="float:left;"> <h2>'.$category->name.'</h2> </div>';
				if ($deletePermission)
					echo	'<div style="float:right;"> <p><a href="../../editProfile?user='.$user['ID'].'&category='.$category->ID.'">Edit</a><p> </div>';
				echo 	'</div></div>';
				echo '<div class="insideFields">';
				$table=false;
				foreach ($fields[$category->ID] as $field)
				{
					
					if ($field->fieldType=='smallText')
					{
						if ($table==false)
						{
							echo '<table>';
							$table=true;
						}
						echo '<tr><td><span class="fieldName">'.$field->name.'</span></td>';
						echo '<td>'.$user['field'.$field->ID].'</td></tr>';						
					}
					
					else if ($field->fieldType=='bigText')
					{
						if ($table==true)
						{
							echo '</table><br>';
							$table=false;
						}
						echo '<li><span class="fieldName">'.$field->name.'</span></li>';
						echo '<span>'.$user['field'.$field->ID].'</span><br><br>';
					}
					
					else if ($field->fieldType=='DropDown')
					{
						if ($table==true)
						{
							echo '</table>';
							$table=true;
						}
						echo '<span class="fieldName">'.$field->name.'</span><br>';
						echo '<span>'.$user['field'.$field->ID].'<span><br><br>';	
					}
					
					else if ($field->fieldType=='date')
					{
						if ($table==false)
						{
							echo '<table>';
							$table=true;
						}
						echo '<tr><td><span class="fieldName">'.$field->name.'</td>';
						echo '<td>'.$user['field'.$field->ID].'</td></tr>';	
					}
					else if ($field->fieldType=='checkbox')
					{
						if ($table==true)
						{
							echo '</table><br>';
							$table=false;
						}
						echo '<li><span><strong>'.$field->name.'</strong></span></li>';
						echo '<span>'.$user['field'.$field->ID].'</span><br><br>';
					}	
					
				}
				if ($table==true)
					echo '</table>';
				echo '</div></div>';
				
			}
			
			if($this->user->is_Admin())
			{
				echo '<div class="categoryBox">';
				echo '<div class="headerBox"><div style="overflow: hidden;">
						<div style ="float:left;"> <h2>Events</h2> </div></div></div>';
				echo '<div class="insideFields">';
				foreach($events as $event)
					echo '<li><span>'.$event->title.'</span></li>';
				echo '</div>';
				
			}
		
		
		?>
		
		<!--<input type="checkbox" name="termsConditions" value="termsConditions"><span>I agree with Terms and Conditions. </span><br>
		<input type=submit value="SUBMIT"><br>-->
		</ul>
	</div>
	</div>
</body>
<script>
	$('#delUsr').click(function(e)
    {
        var c = confirm("Are you sure you want to delete this profile?");
        
        if (c==false)
            e.preventDefault();
    });
</script>	
</html>
