<!doctype html>
<html>
<head>
	<link rel="stylesheet" href="/styles/newCategory.css">
	<meta charset="utf-8">
	<link rel="stylesheet" href="/styles/jquery-ui.css">
	<script src="/scripts/jquery-1.9.1.js"></script>
	<script src="/scripts/jquery-ui.js"></script>
	<!-- function for selecting date -->
	<script>
		$(function() {
			$( "#datepicker" ).datepicker({ dateFormat: "yy-mm-dd" });;
		});
	</script>
	<title>Add New Event</title>
</head>
<body>
	<div class="wrapper">
		<div class=box>
		<form method="post" action="../../event/submitCreate">
			<table>
				<tr><td>Title: </td><td><input type="text" name="title" <?php if (isset($_GET['event'])) echo "value=".'"'.$event->title.'"';?>></td></tr>
				<tr><td>Date: </td><td><input type="text" id="datepicker" name="eventDate" <?php if (isset($_GET['event'])) echo "value=".'"'.$event->eventDate.'"';?>></td></tr>
				<tr><td>Show: </td><td><select name="show">
					<option value="1" <?php if (isset($_GET['event']) && ($event->show=="1")) echo "selected" ;?>>Yes</option>
					<option value="0" <?php if (isset($_GET['event']) && ($event->show=="0")) echo "selected" ;?>>No</option>
				</select></td></tr>
				<tr><td>Group</td>
					<td>
					<select name="group">
						<option value="-1">No Group</option>
						
						<?php
							if (isset($_GET['event']))
								$g=$this->db->query("SELECT name FROM groups WHERE id=".$event->GroupID."")->row();
							
							foreach($groups as $group)
							{
								if($g->name==$group->name)
									echo '<option value='.$group->ID.' selected>'.$group->name.'</option>';
								else
									echo '<option value='.$group->ID.'>'.$group->name.'</option>';
							}
						?>
					</select>
					</td></tr>
			</table>
			<textarea type="text" rows="15" style=width:100%; name="message"><?php if (isset($_GET['event'])) echo $event->message;?></textarea>
			
			<input type="text" name="ID" style="display:none" <?php if (isset($_GET['event'])) echo "value=".'"'.$_GET['event'].'"'; else echo 'value="-1"';?>>
			<br>
			<div style=text-align:right><input class=butSave type=submit value="CREATE"></div>
		</form>
		</div>
	</div>
</body>
</html>
