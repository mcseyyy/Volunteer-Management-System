<!doctype html>
<html>
<head>
 <link rel="stylesheet" href="/styles/login.css"/>
 <script src="/scripts/jquery-1.10.2.js"></script>
 <script src="/scripts/login.js"></script>
 <title>Password Recovery</title>
</head>
<body>
<div class="box">
<div class="boxContent">
	<p id="signIn">Password recovery</p>
	<form method="post" action="../../forgotten/reset?url=<?php echo $_GET['unique'];?>">
		<div class="input">
			<span>New password</span>
			<input type="password" class="someTextShouldGoHereInputTypeInput" name="new1">
			<span>New password</span>
			<input type="password" class="someTextShouldGoHereInputTypeInput" name="new2">
		</div>
		<input value="Submit" type="submit" id="admin_submit" name="submit">
		<?php if(isset($response)) echo "<p id='alert'>". $response . "</p>"; ?>
	</form>
</div>
</div>
</body>
</html>
