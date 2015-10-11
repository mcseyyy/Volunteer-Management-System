<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class user_profileNew extends CI_Controller
{
	/*---function that loads the view for a user's profile
    Gets all data about that specific user from the database 
      filters out the sensible info that the other users are 
      trying to see (depending on their privileges) and passes it to the view*/
	public function index()
	{
		if (!isset($_GET['user']) || !$this->user->confirm_Member())
			redirect('');
			
		//List of default messages	
		$messages = array();
		$messages[1] = "Your details have been successfully changed.<br>Thank you for keeping your profile updated.";
		$messages[2] = "Wrong password. Please try again!";
		$messages[3] = "The email that you have inserted has been already registered!";
		$messages[4] = "Password successfully changed.";

        //checking permissions
		$permission = false;
        $isAdmin = false;

        if ($this->user->volunteerID() == $_GET['user'])
            $permission = true;
        else if (!$this->user->is_Admin())
            redirect('');
        else if ($this->user->get_Permissions()['permissionBrowse'])
        {
            $permission = true;
            $isAdmin = true;
        }
        else
        {
            $currentUserEmail = $this->user->userName();
            if (!$currentUserEmail)
                redirect('');
            $volunteerEmail = $this->db->select('email')->get_where('volunteersNew', array('ID' => $_GET['user']))->row()->email;
            $number = $this->db->query("SELECT COUNT(*) as nmb FROM
                (SELECT groupID FROM usersInGroups WHERE webUser={$this->db->escape($currentUserEmail)} AND isAdmin=1) AS t1
                NATURAL JOIN
                (SELECT groupID FROM usersInGroups WHERE webUser={$this->db->escape($volunteerEmail)}) AS t2")->row()->nmb;

            if (!$number)
                redirect('');

            $permission = true;
            $isAdmin = true;
            if (!$this->user->is_Admin())
                $permission = false;
        }

        if (!$permission)
            redirect('');
		
		//Check if the volunteer with that ID exists in the database
		$count=$this->db->query("SELECT * FROM volunteersNew WHERE ID=".$_GET['user'])->num_rows();
		if ($count!=1) //volunteer does not exist; Display error message
		{
			$this->load->view("view_menu");
			echo "<html><body><div><br><br><br><p>This user does not exist. <br><br> Nothing to see here. Move along.</p></div></body></html>";
			return;
		}
        
        $fields = array();
        if (!$isAdmin) //get only the categories and fields that are shown
        {
            $categories = $this->db->select('ID, name')->order_by('order', 'ASC')->get_where('categories', array('show' => 1))->result();
            foreach ($categories as $category)
                $fields[$category->ID] = $this->db->select('ID, name, fieldType')->order_by('order', 'ASC')->get_where('fields', array('show' => 1, 'category' => $category->ID))->result();
        }
        else if ($this->user->get_Permissions()['permissionBrowse']) //get all data; Admin user
        {
            $categories = $this->db->select('ID, name')->order_by('order', 'ASC')->get('categories')->result();
            foreach ($categories as $category)
                $fields[$category->ID] = $this->db->select('ID, name, fieldType')->order_by('order', 'ASC')->get_where('fields', array('category' => $category->ID))->result();

        }
        else //get only non restricted data for Admin user
        {
            $restrictions = $this->user->get_Restrictions();
            $categories = $this->db->select('ID, name')->where_not_in('ID', $restrictions)->order_by('order', 'ASC')->get('categories')->result();
            foreach ($categories as $category)
                $fields[$category->ID] = $this->db->select('ID, name, fieldType')->order_by('order', 'ASC')->get_where('fields', array('category' => $category->ID))->result();
        }
        $user = $this->db->get_where('volunteersNew', array('ID' => $_GET['user']))->row_array();

        $text='';
        if (isset($_GET['message']))
            $text = $messages[$_GET['message']];

        $profilEmail = $this->db->select('email')->get_where('volunteersNew', array('ID' => $_GET['user']))->row()->email;

        $events = $this->db->query
        ("
            SELECT title, ID
            FROM event
            WHERE groupID IN
                (SELECT groupID FROM usersInGroups WHERE webUser LIKE '$profilEmail')
        ")->result();
		$deletePermission=1;
		$isAdmin=$this->user->get_Permissions()['permissionAdd'];
        if (!($isAdmin || $this->user->volunteerID() == $_GET['user']))
			$deletePermission=0;
        $data = array(
            'text'      => $text,
            'categories'=> $categories,
            'fields'    => $fields,
            'user'      => $user,
            'events'    => $events,
			'deletePermission' => $deletePermission);

        $this->load->view('view_menu');
        $this->load->view("view_user_profileNew",$data);
	}
}
