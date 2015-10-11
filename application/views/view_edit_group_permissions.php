<!doctype html>
<html>
<head>
 <link rel="stylesheet" href="/styles/edit_group_permissions.css"/>
 <script src="/scripts/jquery-1.10.2.js"></script>
 <title>Admin Permissions</title>
</head>

	<body>
		<div id=wrapper>
			<form method="POST" action="../../user_management/permissionSubmit">
				<input type="hidden" name=username value="<?=$username?>">
				<input type="hidden" name=userID value="<?=$ID?>">
				
				<div class="headerBox">
					<h1 id=h1>Admin Permissions</h1>
					<table>
						<tr><td><b>Name:</b></td><td><?=$name?></td></tr>
						<tr><td><b>Surname:</b></td><td><?=$surname?></td></tr>
						<tr><td value="<?=$username?>"><b>Email:</b></td><td><?=$username?></td></tr>
					</table>
				</div>
				<br>
				<div id='contentBox'>
					<div>
						<span> Currently has permissions to see the following groups: </span>
						<table>
							<?php 
								if(isset($permissions))
								{
									foreach ($permissions as $row)
									{
										echo("<tr>");
										
										echo("<td><li><ul style='margin:0px;'>".$row['name']."</ul></li><td>");
										echo "<td><a href='../../user_management/removeGroupPermission?groupID=".$row["ID"]."&username=".$username."&userID=".$ID." '>Delete</a></td>";
										echo("</tr>");
									}
								}
								else
									echo("No permissions.");
							?>	
						</table>
						
						<span> Add permission for:</span>

						<?php 
							echo '<select name="selectID">';
								foreach ($groups as $group)
									echo "<option value=".$group->ID.">".$group->name."</option>";
							echo "</select></td>";
						?>
						<input class=but2 type="submit" name="groupSubmit" value="Add Group">
					</div>
					<br>
					<div>
						<span> Currently restricted from: </span>
						<table>
							<?php 
									if(isset($infoRestrictions))
									{
										foreach($infoRestrictions as $restriction)
										{
											echo("<tr>");
											echo("<td><li><ul style='margin:0px;'>".$restriction['name']."</li></ul><td>");
											echo "<td><a href='../../user_management/removeRestriction?categoryID=".$restriction["ID"]."&username=".$username."&userID=".$ID." '>Delete restriction.</a></td>";
											echo("</tr>");
										}
									}
									else
										echo("Nothing.");
							?>	
						</table>
						<span> Add new restriction </span>
						<?php 
							echo '<select name="selectCategoryID">';
								foreach ($categories as $category)
									echo "<option value=".$category->ID.">".$category->name."</option>";
							echo "</select></td>";
						?>
						<input class=but2 type="submit" name="categorySubmit" value="Add Restriction">
					</div>
				</div>
			</form>
		</div>

	</body>

</html>