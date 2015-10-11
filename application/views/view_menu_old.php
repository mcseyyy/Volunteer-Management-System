<!DOCTYPE html>
<html>
<head>
<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400' rel='stylesheet' type='text/css'>
 <link rel=stylesheet href=/styles/kates_menu.css>
</head>

<div class=navBar>
	<a href=../../../dashboard/><div class=councilLogo></div></a>
	<ul id=menuUl>
		<?php 
			//generates the menu according to the user's permissions
			$this->load->model("mysql");
			$this->load->model("user");
			
			//get permissions and the current page url
			$un = $this->user->userName();
			if($un=='')
			{
				redirect('');
			}
			$permissions = $this->mysql->getPermissions($un);
			$url = $_SERVER['REQUEST_URI'];
			
			if ($this->user->is_Admin($un))
			{
				echo '<li><a class="aa li" href=../../../dashboard/>Dashboard</a></li>';
				echo '<li><a class="aa li" href=../../../browse_database/>Browse database</a></li>';
				if ($permissions['permissionAdd'])
                {
					echo '
                        <li><a class="aa li" href=../../../user_management/>Manage Users</a></li>
                        <li><a class="aa li" href=../../../category/>Manage Reg. Form</a></li>
                        <li><a class="aa li" href=../../../groups/>Groups</a></li>
                        <li><a class="aa li" href=../../../backup/>Manage Backups</a></li>
						<li><a class="aa li" href=../../../statistics/>Stats</a></li>
						<li><a class="aa li" href=../../../log/>Changelog</a></li>
                    ';
                }
				else
				{
					echo '<li><a class="aa li" href=../../../groups/>Groups</a></li>';
				}
			}
		?>
		<li><a class="aa li" href=../../../event/>Events</a></li>
		<li><a class="aa li" href=../../../terms_and_conditions/>T&C</a></li>
		<li><a class="aa li" href=../../contact/>Contact us</a></li>
		<li><a class="aa li" href=../../dashboard/log_out>Log Out</a></li>
	</ul>
</div>

</html>