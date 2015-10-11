<!doctype html>
<html>
<head>
 <link rel="stylesheet" href="/styles/contact.css"/>
 <script src="/scripts/jquery-1.10.2.js"></script>
 <script src="/scripts/jquery.color-2.1.2.js"></script>
 <script src="/scripts/contact_edit.js"></script>
 <title>Edit Contact Information</title>
</head>
<body>
<div class="box">
<div class="boxContent">
	<p><h1 id=h1>Edit contact details</h1></p>
	<table id=edTab>
	<tr><td class=left>Current email</td><td class=right><?php echo $email ?></td></tr>
	<tr><td class=left>Current phone</td><td class=right><?php echo $phone ?></td></tr>
	<tr><td class=left>Current website</td><td class=right><a href="<?php echo $website ?>"> <?php echo $website ?></a></td></tr>
	</table>
	<form method="post" id="myForm" action="../../contact/submit">
		<div class="input">
			<span id=first>New email</span>
			<input type="text"  size="16" name="email" class="someTextShouldGoHereInputTypeInput" id="email">
			<span id=second>New phone</span>
			<input type="text"  size="16" name="phone" class="someTextShouldGoHereInputTypeInput" id="phone">
			<span id=third>New website</span>
			<input type="text"  size="16" name="website" class="someTextShouldGoHereInputTypeInput" id="website">
		</div>
		<div id=buttons>
		<input class=but1 value="Submit" type="submit" id="submit" name="submit">
		</div>
	</form>
</div>
</div>
</body>
</html>
