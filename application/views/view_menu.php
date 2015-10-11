<!DOCTYPE html>
<html>
<head>
<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400' rel='stylesheet' type='text/css'>
 <link rel=stylesheet href=/styles/kates_menu.css>
 <script src="/scripts/jquery-1.10.2.js"></script>
 <?php 
	$un = $this->user->userName();
	if ($un == '')
		redirect('');
	if ($this->user->is_Admin($un))
	{
		echo
		(
			"<script>
			$(document).ready(function () {
				if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
					if ($(window).width() >= 1288)
					{
						$('#inner').css('float','right');
						$('#inner').css('margin-right','1062px');
						
					}
				}
				if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
				$(window).on('resize', function(){
				  var win = $(this);
				  if (win.width() >= 1288)
				  {
					$('#inner').css('float','right');
					$('#inner').css('margin-right','1062px');
				  }
				  else
				  {
					$('#inner').css('float','none');
					$('#inner').css('margin-right','0px');
				  }
				});
				}
			
			});
			</script>"
		);
	}
	else
	{
		echo
		(
			"<script>
			$(document).ready(function () {
				if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
					if ($(window).width() >= 500)
					{
						$('#inner').css('float','right');
						$('#inner').css('margin-right','274px');
						
					}
				}
				if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
				$(window).on('resize', function(){
				  var win = $(this);
				  if (win.width() >= 500)
				  {
					$('#inner').css('float','right');
					$('#inner').css('margin-right','274px');
				  }
				  else
				  {
					$('#inner').css('float','none');
					$('#inner').css('margin-right','0px');
				  }
				});
				}
			
			});
			</script>"
		);
	}
 ?>
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