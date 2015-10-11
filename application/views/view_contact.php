<!doctype html>
<html>
<head>
    <link rel="stylesheet" href="/styles/contact.css"/>
	<title>Contact us</title>
</head>

<body>

<div class="box">
<div class="boxContent">
	<p><h1 id=h1>Contact us</h1></p>
	
	<div ID="a_tag_needs_a_wrapper">
		<div >
		<table id=conTab>
			<tr><td class=left>Email</td><td class=right><a href="mailto:<?php echo $email ?>"> <?php echo $email ?></a></td></tr>
			<tr><td class=left>Phone</td><td class=right><?php echo $phone ?></td></tr>
			<tr><td colspan=2><a href="<?php echo $website ?>">Visit our website</a></td></tr>
		</table>
		</div>
		<div id=buttons>
		<?php 
		if($this->user->confirm_Member())
			if($this->user->is_Admin())
				if($this->user->get_Permissions()['permissionAdd'])
					echo '<a href="../../contact/edit/"><button class=but1>Edit</button></a><br>'
		?>
		<div>
	</div>
	
</div>
</div>

</body>
</html>