<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class terms_and_conditions extends CI_Controller
{
	public function index()
	{
		$terms = $this->db->get('termsConditions')->row()->TNC;
		$terms=nl2br($terms);
		if($this->user->confirm_Member())
			$this->load->view('view_menu');
		$this->load->view('view_terms', array('terms' => $terms));
	}
	
	//open editing page
	public function edit()
	{
		if($this->user->confirm_Member())
			if($this->user->is_Admin())
				if($this->user->get_Permissions()['permissionAdd'])
				{
					$terms = $this->db->get('termsConditions')->row()->TNC;
					$this->load->view('view_menu');
					$this->load->view('view_terms_edit',array('terms' => $terms));
					return;
				}
		redirect('');
	}
	//submit the new Terms and Conditions
	public function submit()
	{
		if($this->user->confirm_Member())
			if($this->user->is_Admin())
				if($this->user->get_Permissions()['permissionAdd'])
					if($_POST['terms']!='')
					{
						$this->mysql->changelog('Terms and Conditions change');
						$terms = $_POST['terms'];
						$this->db->update('termsConditions',array('TNC' => $terms));
						redirect('terms_and_conditions');
						return;
					}
		redirect('');
	}
}
?>