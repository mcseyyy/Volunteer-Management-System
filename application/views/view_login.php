<!doctype html>
<html>
<head>
 <link rel="stylesheet" href="/styles/login.css"/>
 <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400' rel='stylesheet' type='text/css'>
 <script src="/scripts/jquery-1.10.2.js"></script>
 <script src="/scripts/jquery.color-2.1.2.js"></script>
 <script src="/scripts/login.js"></script>
 <title>Bristol Museum Galleries Archives</title>
</head>
<body>
<div class="box">
<div class="boxContent">
	<h1 id="signIn">Sign in</h1>
	<form method="post" action="../../login/login_validation">
		<div class="input">
			<span>E-mail</span>
			<input type="text" class="someTextShouldGoHereInputTypeInput" name="username" autofocus>
		</div>
		<div class="input">
			<span>Password</span>
			<input type="password" class="someTextShouldGoHereInputTypeInput" name="pwd">
		</div>
		<input type="checkbox" id="checkBoxThing" name="rememberMe"> 
		<label id="chkbxLabel">Remember me</label>
		<input value="Sign in" type="submit" id="login_submit" name="submit">
	</form>

	<div ID="omg_a_tag_needs_a_wrapper">
		<a href="../../forgotten/">Forgot your password?</a> | <a href="../../contact/">Contact us</a>
	</div>
	
	<?php if(isset($response)) echo "<p id='alert'>". $response . "</p>"; ?>
</div>
</div>
</body>
</html>
