<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class groups extends CI_Controller {


	function __construct()
	{
		//eliminate need to check if someone's an admin
		parent::__construct();      // Call parent constructer
		if (!$this->user->is_Admin())
			redirect ('');
	}
	
	public function index()
	{
		$this->load->model("mysql");
		$this->load->view("view_menu");
		$users=array();
		$volunteers=array();
		$groups = $this->db->query("SELECT * FROM `groups`")->result();
		//get list of members for each group
		foreach ($groups as $group)
		{
			$users[$group->ID]=$this->db->query("SELECT * FROM `usersInGroups` WHERE `groupID`=".$group->ID)->result();
		}
		$volntr = $this->db->query("SELECT * FROM `webUsers`")->result();
		//get details for members
		foreach ($volntr as $vol)
		{
			$volunteers[$vol->username]=$this->db->query('SELECT * FROM `webUsers` WHERE `username`="'.$vol->username.'"')->result();
		}
		$data=array('users'=>$users,
				'groups'=>$groups,
				'volunteers'=>$volunteers);
		$this->load->view("view_groups",$data);
	}
	//remove user from group
	public function removeFromGroup()
	{
		$un = $this->user->userName();
		$permissions = $this->mysql->getPermissions($un);
		if (!$permissions['permissionAdd'])
			redirect('');
			
		$group=$_GET['group'];
		$user=$_GET['user'];
		//get group name for changelog
		$groupName = $this->db->query("SELECT `name` FROM `groups` WHERE `ID` = '{$group}'")->row()->name;
		//delete dependencies
		$this->db->query("DELETE FROM `usersInGroups` WHERE `webUser` = '{$user}' AND `groupID`='{$group}'");
		
		//ChangeLog			
		$this->mysql->changelog('Delete user ['.$user.'] from group ['.$groupName.']');
		redirect('groups/index');
	}
	
	//get selected emails and load the email page
	public function email()
	{
		$this->load->view("view_menu");
		$groupID = $_GET['id'];
		$emailList='';
		foreach ($_POST as $user)
		{
			$emailList = $emailList.','.$user;
		}
		$emailList = substr($emailList, 1);
		$data['emails'] = $this->mysql->getMail();
        $data['emailList'] = $emailList;
		$this->load->view("view_send_email", $data);
	}
	//create new group
	public function newGroup()
	{
		$groupName = $_POST['groupName'];
		$this->load->dbforge();
		$data=array("name" => $groupName);
		$name=$this->db->get_where('groups',array('name'=>$groupName));
		//create new group only if it doesn't already exist
		if ($name->num_rows() == 0)
		{
			$this->db->insert('groups',$data);
			$this->mysql->changelog("Create group:[".$groupName."]");
		}
		redirect('groups/index');
	}
	//delete group
	public function deleteGroup()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
		$id=$_GET['group'];
		//get group members
		$users = $this->db->query("SELECT * FROM `usersInGroups` WHERE `groupID`='{$id}'");
		//get group name
		$group = $this->db->query("SELECT * FROM groups WHERE ID ={$id}")->row()->name;
		//remove members from the group
		if ($users->num_rows() > 0)
			$this->db->query("DELETE FROM `usersInGroups` WHERE `groupID` = '{$id}'");
		//delete the group
		$this->db->query("DELETE FROM `groups` WHERE `ID` = {$id}");
		//ChangeLog			
		$this->mysql->changelog("Delete group [{$group}]");
		
		redirect('groups/index');
	}
	//add members from Browse Database
	public function addBrowse()
	{
		$emailList = $_POST['emailList'];
		$groupList = $_POST['groupList'];
		$groups = explode(', ',$groupList);
		$emails = explode(', ',$emailList);
		$this->load->dbforge();
		//add the users to each group separately
		foreach ($groups as $group)
		{
			if ($group != '')
			{
				$findgroup=$this->db->get_where('groups',array('name'=>$group));
				//create the group if it doesn't exist
				if ($findgroup->num_rows() == 0)
				{
					$data = array('name' => $group);
					$this->db->insert('groups',$data);
					$this->mysql->changelog("Create group [{$group}]");
				}
				$groupid=$this->db->get_where('groups',array('name'=>$group))->row()->ID;
				//add each volunteer to the group
				foreach ($emails as $email)
				{
					$isUserInGroup = $this->db->query("SELECT * FROM `usersInGroups` WHERE `webUser`='{$email}' AND `groupID`='{$groupid}'");
					//only add the volunteer if they're not
					//already a member
					if ($isUserInGroup->num_rows() == 0)
					{
						$admin = $this->db->query("SELECT `admin` FROM `webUsers` WHERE `username` = '{$email}'")->row()->admin;
						$data = array('webUser' => $email, 'groupID' => $groupid, 'isAdmin' => $admin);
						$this->db->insert('usersInGroups', $data);
						$this->mysql->changelog("Add user [{$email}] to group [{$group}]");
					}
				}
			}
		}
		redirect('groups/index');
	}
}

