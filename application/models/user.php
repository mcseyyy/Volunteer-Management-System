<?php
session_start();

class User extends CI_model
{
	//validates if the given credentials are valid and returns true or false accordingly.
	//If true, a cookie or a session is created, depending on the remember me check box value.
	function validate_user($un, $pwd, $rememberMe)
	{
		if (!isset($_SESSION))
			session_start();
		$this->load->model('mysql');
		$valid_credentials = $this->mysql->verify_Username_and_Pass($un, $pwd);
		if($valid_credentials)
		{
			if ($rememberMe)
				$this->session->set_userdata('user', $un);
			else
			{
				if($this->session->userdata('user'))
					$this->session->sess_destroy();
				$_SESSION['user'] = $un;
			}
			return true;
		}
		else
			return false;
	}

    function is_Admin()
    {
        $this->load->model('mysql');
        return $this->mysql->isAdmin($this->user->userName());
    }
    
    function get_Permissions()
    {
        $this->load->model('mysql');
        return $this->mysql->getPermissions($this->user->userName());
    }
    
    function get_Restrictions()
    {
        $this->load->model('mysql');
        return $this->mysql->getRestrictions($this->user->userName());
    }
    
    function get_GroupMembers()
    {
        $this->load->model('mysql');
        return $this->mysql->getGroupMembers($this->user->userName());
    }
	
	function get_Name()
	{
		return $this->mysql->getName($this->user->userName());
	}

	//logs the user out - destroys any session or cookies from the website, and redirects them to the login page.
	function log_User_Out()
	{
		if (isset($_SESSION['user']))
		{
			unset($_SESSION['user']);
			session_destroy();
		}
		if ($this->session->userdata('user'))
			$this->session->sess_destroy();

		redirect('login/index');
	}

	//confirms if user is logged in.
	function confirm_Member()
	{
		return isset($_SESSION['user']) || $this->session->userdata('user');
	}

	//function for inserting registration data in DB
	function registrate_User()
	{
		$this->load->model("mysql");
		$this->mysql->insert_User();
	}

	//gets the user ID from webUsers
	function userID()
	{
        $un = $this->user->userName();
        return $this->mysql->userID($un);
	}
	
	//gets the user ID from volunteers
	function volunteerID()
	{
        $un = $this->user->userName();
        return $this->mysql->volunteerID($un);
	}

    // Gets the username used as primary key in webUsers and volunteersNew for the currently logged in user
	function userName()
	{
        if (isset($_SESSION['user']))
            return $_SESSION['user'];
        if ($this->session->userdata('user'))
            return $this->session->userdata('user');
        return '';
	}
}
