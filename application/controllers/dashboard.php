<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Dashboard extends CI_Controller 
{
	public function index()
	{
		if ($this->user->confirm_Member())
		{
            if ($this->user->is_Admin())
            {
                $this->load->view('view_menu');
                
				$restrictions = $this->user->get_Restrictions();
				$debug = FALSE;
				
				echo '<html><head><link rel=stylesheet href="/styles/dashboard.css"><title>Bristol Museums, Galleries & Archives Volunteer Database</title></head>';
				echo '<body><span id=wrapper class=box>';
                echo "<h1 id=h1>Welcome, {$this->user->get_Name()}!</h1>";
                //debug information if needed
				if($debug)
				{
					if ($restrictions)
						echo "Your restrictions are categories <tt>$restrictions</tt>";
					else
						echo "You have no restrictions";
					echo " and your permissions are<br><pre>";
					echo implode(", ", array_keys(array_filter($this->user->get_Permissions(), function($v){return $v == '1';})));
					echo '</pre>Also in your groups are: <pre>';
					echo implode(", ", array_values($this->user->get_GroupMembers()));	
					echo '</pre>';
				}
				//information for admins with Management permission
				if ($this->user->get_Permissions()['permissionAdd'])
				{
					echo '<u>Volunteers, registered in the last 7 days:</u>';
					echo "<table class=lastTab><thead>";
					echo "<tr>";
					echo "<th>First Name</th>";
					echo "<th>Surname</th>";
					echo "<th>email</th>";
					echo "</tr></thead>";
					//get every volunteer whose last log in date is
					//no more than 7 days ago
					foreach ($this->db->get_where("volunteersNew", "registerDate <= CURDATE() AND registerDate > (CURDATE() - INTERVAL 1 WEEK)")->result() as $vol)
					{
						echo "<tr>";
						echo "<td><a href=../user_profileNew?user={$vol->ID}>{$vol->firstName}</a></td>";
						echo "<td>{$vol->surname}</td>";
						echo "<td>{$vol->email}</td>";
						echo "</tr>";
					}
					echo "</table>";
				}
				echo '</span>';
				echo '</body></html>';
            }
            else
                redirect('user_profileNew?user='.$this->user->volunteerID());
		}
		else
			redirect('');
	}

	public function log_out()
	{
		$this->user->log_User_Out();
	}
}
