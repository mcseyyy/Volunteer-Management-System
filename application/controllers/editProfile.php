<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class EditProfile extends CI_Controller
{
	//this loads the view for editing a category from a volunteers details
	public function index()
	{
		if (!isset($_GET['user']) || !isset($_GET['category']))
			redirect('');

		if ($this->user->confirm_Member())
		{
			$isAdmin=$this->user->get_Permissions()['permissionAdd'];
            if ($isAdmin || $this->user->volunteerID() == $_GET['user'])
			{
				//get the category name
				$categoryName=$this->db->query("SELECT `name`, `show` FROM categories WHERE ID=".$_GET['category']." LIMIT 1")->row_array();
				if ($categoryName['show']==0 && !$isAdmin) //check if the user has access to that category
					redirect('');
				$categoryName=$categoryName['name'];

				//get the fields and their characteristics from that category
				if ($isAdmin)
					$fields=$this->db->query("SELECT * FROM fields WHERE category=".$_GET['category']." ORDER BY `order` ASC")->result();
				else
					$fields=$this->db->query("SELECT * FROM fields WHERE `show`=1 and `category`=".$_GET['category']." ORDER BY `order` ASC")->result();

				//get the information about the volunteer
				$user=$this->db->query("SELECT * FROM volunteersNew WHERE ID=".$_GET['user']." LIMIT 1")->row_array();

				//put everything together
				$data=array(
					'categoryName'=>$categoryName,
					'fields'=>$fields,
					'user'=>$user);

				$this->load->view('view_menu');

				$this->load->view("view_editProfile",$data);
			}
			else
				redirect('');
		}
		else
			redirect('');
	}

	//function that saves the edits that have been done to a volunteer's profile
	public function submitEdit()
	{
		if (!isset($_GET['user']))
			redirect ('');
		if (!$this->user->confirm_Member())
			redirect ('');

		$isAdmin=$this->user->get_Permissions()['permissionAdd'];
        if (!($isAdmin || $this->user->volunteerID() == $_GET['user']))
			redirect ('');

		foreach ($_POST as $k => $v)
			if (is_string($_POST[$k]))
				$_POST[$k] = htmlspecialchars($v);
		$keys=array_keys($_POST);
		$data=array();
		foreach ($keys as $key)
		{

			if (strpos($key,'checkbox') !== false)
			{
				$finalValue='';
				foreach ($_POST[$key] as $value){
					$finalValue=$finalValue.','.$value;
				}
				$finalValue=substr($finalValue,1);
				$data["field".str_replace("checkbox","",$key)]=$finalValue;
			}
			else
				$data['field'.$key]=$_POST[$key];
		}
		
		//update the entry in the DB
		$this->db->where('ID',$_GET['user']);
		$this->db->update('volunteersNew',$data);

		//ChangeLog
		$email=$this->db->query("SELECT email FROM volunteersNew WHERE ID=".$_GET['user']." LIMIT 1")->row()->email;
		$category=$this->db->query("SELECT name FROM categories WHERE ID=(SELECT category FROM fields WHERE ID=$keys[0])")->row()->name;
		$this->mysql->changelog("Update details of user [".$email."] in category [".$category."]");

		redirect('user_profileNew?user='.$_GET['user'].'&message=1');
	}

	//function that saves the edits that have been done to the main details of a volunteer
	public function submitEditMain()
	{
		if (!isset($_GET['user']))
				redirect('');
		if (!$this->user->confirm_Member())
			redirect('');

		$isAdmin=$this->user->get_Permissions()['permissionAdd'];
        if (!($isAdmin || $this->user->volunteerID() == $_GET['user']))
			redirect ('');

		foreach ($_POST as $k => $v)
            $_POST[$k] = htmlspecialchars($v);

		$emailID=$this->db->query("SELECT ID FROM volunteersNew WHERE `email`='".$_POST['email']."' LIMIT 1")->row();
		if ($emailID==NULL||$emailID->ID==$_GET['user'])
		{
			//get the currentEmail for referencing it in the update query in the webUsers
			$currentEmail=$this->db->query("SELECT email FROM volunteersNew WHERE id=".$_GET['user']." LIMIT 1")->row();
			$currentEmail=$currentEmail->email;

			//update in volunteersNew table
			$this->db->where('id',$_GET['user'])->update('volunteersNew', $_POST);

			//update in webUsers table
			$userData['username']=$_POST['email'];
			$userData['first_name']=$_POST['firstName'];
			$userData['surname']=$_POST['surname'];
			$this->db->where('username',$currentEmail)->update('webUsers',$userData);

			$userData=array();
			$userData['webUser']=$_POST['email'];
			$this->db->where('webUser',$currentEmail)->update('usersInGroups',$userData);


			//ChangeLog
			$this->mysql->changelog("Update details of user [".$_POST['email']."] in category [Personal Details 1]");

			redirect('user_profileNew?user='.$_GET['user'].'&message=1');
		}
		else
			redirect('user_profileNew?user='.$_GET['user'].'&message=3');
	}

	//function that loads the view for editing the main details
	public function editMainDetails()
	{

		if (!isset($_GET['user']))
				redirect('');
		if (!$this->user->confirm_Member())
			redirect('');

		$isAdmin=$this->user->get_Permissions()['permissionAdd'];
        if (!($isAdmin || $this->user->volunteerID() == $_GET['user']))
			redirect ('');

		if ($this->user->confirm_Member())
		{
			$isAdmin=$this->user->is_Admin();
            if ($isAdmin || $this->user->volunteerID() == $_GET['user'])
			{
				$fields=$this->db->query("SELECT title,firstName,surname,email FROM volunteersNew WHERE ID=".$_GET['user']." LIMIT 1")->row();
				$data=array(
					'fields'=>$fields,
					'userID'=>$_GET['user']);
				$this->load->view('view_menu');
				$this->load->view('view_editMainDetails',$data);
			}
		}
	}
	
	//function that saves the new password
	public function changePassword()
	{
		if (!isset($_GET['user']))
				redirect('');
		if (!$this->user->confirm_Member())
			redirect('');

		$isAdmin=$this->user->get_Permissions()['permissionAdd'];
        if (!($isAdmin || $this->user->volunteerID() == $_GET['user']))
			redirect ('');

		$email=$this->db->query("SELECT email FROM volunteersNew WHERE ID=".$_GET['user']." LIMIT 1")->row();
		$email=$email->email;
		$currentPass=$this->db->query("SELECT password FROM webUsers WHERE username='".$email."' LIMIT 1")->row();
		$currentPass=$currentPass->password;
		$typedPass=$_POST['oldPassword'];

		if (password_verify($typedPass,$currentPass))
		{
			$data['password']=password_hash($_POST['password'], PASSWORD_DEFAULT);
			$this->db->where('username',$email);
			$this->db->update('webUsers',$data);
			//ChangeLog
			$this->mysql->changelog("Changed password of user [".$email."]");
			redirect('user_profileNew?user='.$_GET['user'].'&message=4');
		}
		else
			redirect('user_profileNew?user='.$_GET['user'].'&message=2');
	}
	
	//function that completly deletes a volunteer from the database
	public function deleteUser()
	{
		if (!isset($_GET['user']))
			redirect('');
		$isAdmin=$this->user->get_Permissions()['permissionAdd'];
        if (!($isAdmin || $this->user->volunteerID() == $_GET['user']))
			redirect ('');
		$email=$this->db->query("SELECT email FROM volunteersNew WHERE ID=".$_GET['user']." LIMIT 1")->row();
		$email=$email->email;
		
		//delete user from webUsers
		$this->db->query("DELETE FROM webUsers WHERE `username`='".$email."' LIMIT 1");
		//delete user from all groups
		$this->db->query("DELETE FROM usersInGroups WHERE `webUser`='".$email."'");
		//delete user from volunteersNew (delete all his information)
		$this->db->query("DELETE FROM volunteersNew WHERE `email`='".$email."'");
		
		$this->mysql->changelog("Volunteer [".$email."] deleted.");
		
		if (!$isAdmin)
			$this->user->log_User_out();
		redirect('browse_database/index');
		
		
	}



}
