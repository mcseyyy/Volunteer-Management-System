<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {
	
	public function index()
	{
		//check if user is already logged in
		if ($this->user->confirm_Member())
		{
			//store the login time of volunteers
			if (!$this->user->is_Admin())
				$this->db->query("UPDATE volunteersNew SET lastLogIn=CURDATE() WHERE email='{$_POST['username']}'");
			redirect('dashboard/index');
		}
		else 
			$this->load->view("view_login");
	}
	
	//after registration
	public function success()
	{
		if ($this->user->confirm_Member())
			redirect('dashboard/index');
		else 
		{	
			if (!$this->user->is_Admin())
				$this->db->query("UPDATE volunteersNew SET lastLogIn=CURDATE() WHERE email='{$_POST['username']}'");
			$data['response'] = 'Registration successful!';
			$this->load->view("view_login", $data);
		}
	}
	
	public function login_validation()
	{
		//if the user got here without submitting the login form, get them out of here.
		if (!$_POST)
			redirect('');
		//validate credentials
		$validCred = $this->user->validate_user($_POST['username'], $_POST['pwd'], isset($_POST['rememberMe']));
		if (!$validCred)
		{
			$data['response'] = 'Wrong username and password!';
			$this->load->view("view_login", $data);
		}
		else
		{
			if (!$this->user->is_Admin())
				$this->db->query("UPDATE volunteersNew SET lastLogIn=CURDATE() WHERE email='{$_POST['username']}'");
			redirect('dashboard/index');
		}
	}
}