<!doctype html>
<html>
<head>
 <link rel="stylesheet" href="/styles/groups.css"/>
 <script src="/scripts/jquery-1.10.2.js"></script>
 <script src="/scripts/jquery.validate.js"></script>
 <script src="/scripts/additional-methods.js"></script>
 <script src="/scripts/groups.js"></script>
 <title>Groups</title>
</head>
<body>
    <div id=band></div>
	<div class="outBox">
    <div class="fieldsBox">
    <h1 id=h1>Groups</h1>
	<?php if ($this->user->get_Permissions()['permissionAdd']==1) 
		echo '<input class="butSave" type="button" value="+ New group" id="newGroupButton">' ?>
	</div>
			<div id="newGroupDIV">
				<h3>Group name:</h3><form id="groupAddForm" onsubmit="return checkForm(this)" method="post" action="../../../groups/newGroup">
					<input type="text" size ="16" name="groupName">
					<br><br>
					<input class=butSave type="submit" value="SUBMIT"><br>
				</form>
			</div>
		<br>
        <div id=groups>
		<?php
			$currentUser=$this->user->userName();
			foreach ($groups as $group)
			{
				$permissionGr = $this->db->query("SELECT * FROM usersInGroups WHERE webUser='{$currentUser}' AND groupID='{$group->ID}'")->num_rows();
				$permissionBr = $this->user->get_Permissions()['permissionBrowse'];
				if ($permissionGr!=0 || $permissionBr)
				{
					echo "<a href={$group->ID}></a>\n";
					echo "<form id={$group->ID} method=post action=../groups/email?id={$group->ID}>\n";
					echo "<div class=categoryBox>\n";
					echo "<div class=headerBox>\n";
					echo "<table class=header><tr><td><h2 id=h2>{$group->name}</h2></td>\n";
					//prevent special characters
					$groupName=str_replace(' ','_',$group->name);
					$groupName=str_replace('"','_',$groupName);
					$groupName=str_replace('\'','_',$groupName);
					$groupName=str_replace('(','_',$groupName);
					$groupName=str_replace(')','_',$groupName);
					$groupName=str_replace(';','_',$groupName);
					$groupName=str_replace(':','_',$groupName);
					$groupName=str_replace('{','_',$groupName);
					$groupName=str_replace('}','_',$groupName);
					$groupName=str_replace('*','_',$groupName);
					echo '<td id=show><input class="butSave" type="button" value="Show" id="show_'.$groupName.'"></td></tr></table>'; echo "\n";
					
					//script for collapsing menus
					echo "<script>\n";
					echo "$(document).ready(function () {\n";
					echo '$("#show_'.$groupName.'").click(function() {'; echo "\n";
					echo 'if ($("#'.$groupName.'")';
					echo ".css('display')=='none')\n";
					echo "{\n";
					echo '$("#'.$groupName.'").show(500);'; echo "\n";
					echo '$("#show_'.$groupName.'")';
					echo ".attr('value', 'Hide');\n";
					echo "}\n";
					echo "else\n";
					echo "{\n";
					echo '$("#'.$groupName.'").hide(500);'; echo "\n";
					echo '$("#show_'.$groupName.'")';
					echo ".attr('value', 'Show');\n";
					echo "}\n";
					echo "});\n";
					echo "});\n";
					echo "</script>\n";
					//end of script
					
					//style for collapsing menus
					echo "<style>\n";
					echo "#{$groupName}\n";
					echo "{\n";
					echo "border-bottom:2px solid #b2221d !important; \n";
					echo "display:none\n";
					echo "}\n";
					echo "</style>\n";
					//end of style
					
					echo "</div>\n";
					echo "<div class=insideFields id={$groupName}>\n";
					echo "<table class=listTab>\n";
					echo "<tr>\n";
					echo "<th class=checked><input type=checkbox id=selectAll{$group->ID} onclick=CheckAll(this.id)></th>\n";
					echo "<th class=headField>First Name</th>\n";
					echo "<th class=headField>Surname</th>\n";
					echo "<th class=headField>Email</th>";
					echo "<th class=removeUser>REMOVE</th></tr>\n";
					echo "<tbody class=scrollable>\n";
					$c = 0;
					foreach ($users[$group->ID] as $user)
					{
						echo "<tr>\n";
						foreach ($volunteers[$user->webUser] as $volunteer)
						{
							$c++;
							echo "<td class=unchecked><input type=checkbox name=checkbox{$group->ID}_{$c} value={$user->webUser}></td>\n";
							$admin = $this->db->query("SELECT `admin` FROM `webUsers` WHERE `username`='{$user->webUser}'")->row()->admin;
							if ($admin == 0)
							{
								$id = $this->db->query("SELECT `ID` FROM `volunteersNew` WHERE `email`='{$user->webUser}'")->row()->ID;
								echo "<td><a href=../../user_profileNew?user={$id}>{$volunteer->first_name}</a></td>\n";
							}
							else
								echo "<td>{$volunteer->first_name}</td>\n";
							echo "<td>{$volunteer->surname}</td>\n";
							echo "<td>{$volunteer->username}";
							if ($volunteer->admin==1)
								echo "*";
							echo "</td>\n";
							echo "<td class='removeUser'><a href=../../groups/removeFromGroup?user={$user->webUser}&group={$group->ID} style=color:#FFFFFF>Remove</a></td>\n";
						}
						echo "</tr>\n";
					}
					echo "</tbody>\n";
					echo "</table>\n";
					echo "<table>\n";
					echo "<tr><td>\n";
					echo "<input type=submit class=butSave value='Email selected users'>\n";
					if ($this->user->get_Permissions()['permissionAdd']==1)
						echo "<a href=../../groups/deleteGroup?group={$group->ID}><input type=button class=butSave id=delete_{$group->ID} value='Delete group'</a>\n";
					if ($this->user->get_Permissions()['permissionAdd']==1)
					echo "<a href=../../browse_database/index?group={$group->ID}><input type=button class=butSave id=add_to{$group->ID} value='Add Users'</a>\n";
					//script to confirm deletion of the group
					echo "<script>\n";
					echo "$(document).ready(function () {\n";
					echo "$('#delete_{$group->ID}').click(function(e)\n{\n";
					echo 'var c = confirm("Do you really want to delete this group?");'; echo "\n";
					echo "if (c==false)\n";
					echo "e.preventDefault();\n});});\n";
					echo "</script>\n";
					//end of script
					echo "</td></tr>\n";
					echo "</table>\n";
					echo "</div></div>\n";
					echo "</form>\n";
				}
			}
		
		
		?>
    </div>
	</div>
	</div>
</body>
</html>
