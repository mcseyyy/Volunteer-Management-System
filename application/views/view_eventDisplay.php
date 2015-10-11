<!doctype html>
<html>
<head>
	<link rel=stylesheet href=/styles/newCategory.css>
    <link rel=stylesheet href=/styles/events.css>
	
	<title>Events</title>
	
</head>
<body>
	<div class=wrapper>
		<?php if ($this->user->is_Admin())
			echo '<a href="../create"><button class=but2>+ Create New Event</button></a>';
		?>
		<br>
		<br>
		<?php
			foreach ($events as $event)
			{
				echo "<div class=event>";
				echo "<h2 id=h1>".$event->title."</h2>";
				echo "<table><tr><td>Author: </td><td>".$event->name."</td></tr>";
				if($this->user->is_Admin())
				{
					if($event->GroupID != -1)
					{
						$group = $this->db->select('name')->get_where('groups', array('id' => $event->GroupID))->row();
						echo "<tr>
							<td>Group:</td>
							<td>{$group->name}</td>
							</tr>";
					}
					else
					{
						echo "<tr>
							<td>Group:</td>
							<td>No group has been selected</td>
							</tr>";
					}
				}
				echo "<tr><td>Date:</td><td>".date('d-m-Y', strtotime($event->eventDate))."</td></tr></table>";
				echo "<table id=desc><tr><td colspan=2><div>".nl2br(htmlspecialchars($event->message))."</div></td></tr></table>";
				if ($this->user->is_Admin())
				{
					echo "<div id=buttons><a href='../create?event={$event->ID}'><button class=but1>Edit</button></a>";
					echo "<a href='../deleteEvent?event={$event->ID}'><button class=but1>Delete</button></a></div>";
				}
				echo "</div>";
				echo "<br>";
			}
		?>
		<p><?=$links?></p>
	</div>
</body>
</html>