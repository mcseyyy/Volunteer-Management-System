<!doctype html>
<html>
<head>
 <link rel="stylesheet" href="/styles/login.css"/>
 <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400' rel='stylesheet' type='text/css'>
 <script src="/scripts/jquery-1.10.2.js"></script>
 <script src="/scripts/login.js"></script>
 <title> Forgotten Password </title>
</head>
<body>
<div class="box">
<div class="boxContent">
	<p id="signIn">Forgotten Password</p>
	<form method="post" action="../../forgotten/submit">
		<div class="input">
			<span>Email</span>
			<input type="text" class="someTextShouldGoHereInputTypeInput" name="email">
		</div>
		<input class=butSearch value="Send password recovery e-mail" type="submit" id="admin_" name="submit">
		<?php if(isset($response)) echo "<p id='alert'>". $response . "</p>"; ?>
	</form>
</div>
</div>
</body>
</html>
