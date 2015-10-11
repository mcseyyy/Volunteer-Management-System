<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Contact extends CI_Controller
{
	public function index()
	{
		//get the contact data from db
		$data = $this->db->get('contactUs')->row();
		if($this->user->confirm_Member())
			$this->load->view('view_menu');
		$this->load->view('view_contact', $data);
	}
	
	public function edit()
	{
		//check for permission
		if($this->user->confirm_Member())
			if($this->user->is_Admin())
				if($this->user->get_Permissions()['permissionAdd'])
				{
					//load the edit page with the contact data from db
					$data = $this->db->get('contactUs')->row();
					$this->load->view('view_menu');
					$this->load->view('view_contact_edit',$data);
					return;
				}
		redirect('');
	}
	
	public function submit()
	{
		//check for permission
		if($this->user->confirm_Member())
			if($this->user->is_Admin())
				if($this->user->get_Permissions()['permissionAdd'])
					if($_POST['email']!='' || $_POST['phone']!='' || $_POST['website']!='') //check if something was posted
					{
						//update changelog
						$this->mysql->changelog('Contact detail change');
						//get the old data
						$old = $this->db->get('contactUs')->row_array();
						//remove the old data
						$this->db->empty_table('contactUs');
						//update all the data
						if (trim($_POST['email'])!='')
							$old['email'] = trim($_POST['email']);
						if (trim($_POST['phone'])!='')
							$old['phone'] = trim($_POST['phone']);
						if (trim($_POST['website'])!='')
							$old['website'] = trim($_POST['website']);
						unset($old['ID']);
						//insert new data in db and load the view
						$this->db->insert('contactUs', $old);
						$data = $this->db->get('contactUs')->row();
						$this->load->view('view_menu');
						$this->load->view('view_contact',$data);
						return;
					}
		redirect('');
	}
}
?>