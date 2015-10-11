<!doctype html>
<html>
<head>
 <link rel="stylesheet" href="/styles/login.css"/>
 <script src="/scripts/jquery-1.10.2.js"></script>
 <script src="/scripts/registration.js"></script>
 <script src="/scripts/login.js"></script>
 <title>Register</title>
</head>
<body>
<div class="box">
<div class="boxContent">
	<p id="signIn">Admin registration</p>
	<form method="post" id="myForm" action="../../registrationNew/submitAdmin">
		<div class="input">
			<span>Password</span>
			<input type="password"  size="16" name="password" class="someTextShouldGoHereInputTypeInput" id="password">
			<label class="error" style="display: none;" id="minLength">The passwords needs to be at least 6 characters long.</label><br>
			<span>Verify password</span>
			<input type="password"  size="16" name="passwordVerify" class="someTextShouldGoHereInputTypeInput" id="passwordVerify">
			<label class="error" style="display: none;" id="passwordError">The passwords have to match.</label>
		</div>
		<div style="display:none">
			<?php echo ("<input type=text style=display:none name=unique id=unique value='".$unique."'>");?>
			
		</div>
		<input value="Submit" type="submit" id="admin_submit" name="submit">
	</form>
</div>
</div>
</body>
</html>
