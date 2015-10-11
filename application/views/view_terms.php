<!doctype html>
<html>
<head>
    <link rel="stylesheet" href="/styles/contact.css"/>
	<title>Terms and conditions</title>
</head>

<body>

<div class="box" style="max-width: 750px;">
<div class="boxContent">
	<p><h1 id=h1>Terms and Conditions</h1></p>
	
	<div ID="a_tag_needs_a_wrapper">
		<div >
		<?php
		echo '<span>';
		echo $terms;
		echo '</span>';
		?>
		</div>
		<div id=buttons>
		<?php 
		if($this->user->confirm_Member())
			if($this->user->is_Admin())
				if($this->user->get_Permissions()['permissionAdd'])
					echo '<a href="../../terms_and_conditions/edit/"><button class=but1>Edit</button></a><br>'
		?>
		<div>
	</div>
	
</div>
</div>

</body>
</html>