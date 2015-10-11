<!DOCTYPE html>
<html>
<head>
<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400' rel='stylesheet' type='text/css'>
 <link rel=stylesheet href=/styles/kates_menu.css>
 <style>
    td .menu
    {
        white-space:nowrap;
    }
    #outer
    {
        position:relative;
        overflow-x:auto;
        width:100%;
    }
    #inner
    {
        width:0;
    }
 </style>
</head>

<div class=navBar><table><tr>
	<td><a href=../../../dashboard/><img width=200 src=/styles/logo.png></img></a></td>
	<td id=outer><div id=inner><table><tr>
		<?php 
			//generates the menu according to the user's permissions
			$this->load->model("mysql");
			$this->load->model("user");
			
			//get permissions and the current page url
			$un = $this->user->userName();
			if ($un == '')
				redirect('');
			$permissions = $this->mysql->getPermissions($un);
			$url = $_SERVER['REQUEST_URI'];
			
			if ($this->user->is_Admin($un))
			{
				echo '<td class=menu><a class="aa li" href=../../../dashboard/>Dashboard</a></td>';
				echo '<td class=menu><a class="aa li" href=../../../browse_database/>Browse database</a></td>';
				if ($permissions['permissionAdd'])
                {
					echo '
                        <td class=menu><a class="aa li" href=../../../user_management/>Manage Users</a></td>
                        <td class=menu><a class="aa li" href=../../../category/>Manage Reg. Form</a></td>
                        <td class=menu><a class="aa li" href=../../../groups/>Groups</a></td>
                        <td class=menu><a class="aa li" href=../../../backup/>Manage Backups</a></td>
						<td class=menu><a class="aa li" href=../../../statistics/>Stats</a></td>
						<td class=menu><a class="aa li" href=../../../log/>Changelog</a></td>
                    ';
                }
				else
				{
					echo '<td class=menu><a class="aa li" href=../../../groups/>Groups</a></td>';
				}
			}
		?>
		<td class=menu><a class="aa li" href=../../../event/>Events</a></td>
		<td class=menu><a class="aa li" href=../../../terms_and_conditions/>T&C</a></td>
		<td class=menu><a class="aa li" href=../../contact/>Contact us</a></td>
		<td class=menu><a class="aa li" href=../../dashboard/log_out>Log Out</a></td>
	</tr></table></div></td>
</tr></table></div>

</html>