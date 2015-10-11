<!doctype html>
<html>
<head>
 <link rel="stylesheet" href="/styles/contact.css"/>
 <script src="/scripts/jquery-1.10.2.js"></script>
 <script src="/scripts/jquery.color-2.1.2.js"></script>
 <script src="/scripts/contact_edit.js"></script>
 <title>Edit Terms and Conditions</title>
</head>
<body>
<div class="box">
<div class="boxContent">
	<p><h1 id=h1>Edit Terms and Conditions</h1></p>
	<form method="post" id="myForm" action="../../terms_and_conditions/submit">
		<div class="input">
			
			<textarea rows="50" cols="50" name="terms"  id="website"><?php echo $terms; ?> </textarea>
		</div>
		<div id=buttons>
		<input class=but1 value="Submit" type="submit" id="submit" name="submit">
		</div>
	</form>
</div>
</div>
</body>
</html>
