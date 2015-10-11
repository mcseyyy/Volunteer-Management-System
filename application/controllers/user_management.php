<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_management extends CI_Controller {
	public function index()
	{
		if ($this->user->confirm_Member())
		{
		  if ($this->user->is_Admin())
		  {
			//redirect if no permission
			$un = $this->user->userName();
			$permissions = $this->mysql->getPermissions($un);
			if (!$permissions['permissionAdd'])
				redirect('');
				
			//load the data from db and show
			$this->load->view('view_menu');

			$data = $this->db->get_where('webUsers', array('admin' => 1));

			$params['data'] = $data->result();
			$params['pendingRegistrations']=$this->db->query("SELECT * FROM uniqueUrl WHERE recovery=0")->result();
			$this->load->view('view_user_management', $params);
		  }
		  else
			redirect('user_profile?user='.$this->user->volunteerID());
		}
		else
		{
			redirect('');
		}
	}

	public function user_submit()
	{
		if (!$_POST)
			redirect('');
		if ($this->user->confirm_Member())
		{
			if ($this->user->is_Admin())
			{
				$un = $this->user->userName();
				$permissions = $this->mysql->getPermissions($un);
				if (!$permissions['permissionAdd'])
					redirect('');
				//just for skipping the first index, which doesn't include any information
				foreach($_POST as $key => $value)
				{
					//same as above
					if ($value=="" || $value==null || $key =='submit')
						continue;
					
					$this->mysql->changelog('Add a new user ['.$value.']');
					//if user already exists
					$result = $this->db->get_where('webUsers', array('username' => $value))->num_rows();
					if ($result!=0)
					{
						redirect('');
					}
					else
					{
						//create a unique url, store it in the db, and open email client with the url.
						$hash = password_hash($value, PASSWORD_DEFAULT);
						$this->mysql->insert_uniqueUrl($value, $hash);
						$link = "mailto:".$value."?body=".base_url('/registrationNew/index?unique=').$hash;

						$this->load->view('view_menu');
						$data = $this->db->get_where('webUsers', array('admin' => 1));
						$params['data'] = $data->result();
						$params['link']=$link;
						$params['pendingRegistrations']=$this->db->query("SELECT * FROM uniqueUrl WHERE recovery=0")->result();
						$this->load->view('view_user_management', $params);
					}
				}
			}
		}
	}

	public function admin_submit()
	{
		if (!$_POST)
			redirect('');
		if ($this->user->confirm_Member())
		{
			if ($this->user->is_Admin())
			{
				$un = $this->user->userName();
				$permissions = $this->mysql->getPermissions($un);
				if (!$permissions['permissionAdd'])
					redirect('');

				$this->mysql->changelog('Add a new admin ['.$_POST['admin_email'].']');
				//check if the email is webUsers already
				$result = $this->db->get_where('webUsers', array('username' =>$_POST['admin_email']))->num_rows();
				if ($result==1)
				{
					//if the user is in webUsers but hasn't finished the registration
					$result = $this->db->get_where('uniqueUrl', array('email' => $_POST['admin_email'], 'recovery' => 0));
					if ($result->num_rows()==1)
					{
						$link = "mailto:".$_POST['admin_email']."?body=".base_url('/registrationNew/admin?unique=').$result->row()->url;

						$this->load->view('view_menu');
						$data = $this->db->get_where('webUsers', array('admin' => 1));
						$params['data'] = $data->result();
						$params['link']=$link;
						$params['pendingRegistrations']=$this->db->query("SELECT * FROM uniqueUrl WHERE recovery=0")->result();
						$this->load->view('view_user_management', $params);
					}
					//if they finished the registration.
					else
					{
						redirect('');
					}

				}
				//if they aren't registered
				else
				{
					$this->registerAdmin($_POST);
				}
			}
		}
	}

	private function registerAdmin($data)
	{
		$this->mysql->addAdmin($data);

		//hash and store and open email with the url
		$hash = password_hash($data['admin_email'], PASSWORD_DEFAULT);
		$this->mysql->insert_admin_uniqueUrl($_POST['admin_email'], $hash);
		$link = "mailto:".$data['admin_email']."?body=".base_url('/registrationNew/admin?unique=').$hash;

		$this->load->view('view_menu');
		$data = $this->db->get_where('webUsers', array('admin' => 1));
		$params['data'] = $data->result();
		$params['link']=$link;
		$params['pendingRegistrations']=$this->db->query("SELECT * FROM uniqueUrl WHERE recovery=0")->result();
		$this->load->view('view_user_management', $params);

	}

	public function removeAddPermission()
	{
		if (!isset($_GET['ID']))
			redirect('');
		if ($this->user->confirm_Member())
		{
			if ($this->user->is_Admin())
			{
				$un = $this->user->userName();
				$permissions = $this->mysql->getPermissions($un);
				if (!$permissions['permissionAdd'])
					redirect('');
				
				echo $this->user->userID();
				echo $_GET['ID'];

				//can't remove your own permission
				if($this->user->userID()==$_GET['ID'])
				{
					redirect('user_management/index');
				}
				//update permission
				$this->mysql->changelog('Remove management permission for ['.$this->db->get_where('webUsers',array('ID' => $_GET['ID']))->row()->username.']');
				$id=$_GET['ID'];
				$this->db->query("UPDATE  `webUsers` SET  `permissionAdd` =  '0' WHERE `ID` =".$id." LIMIT 1");
				redirect('user_management/index');
				return;
			}
		}
		redirect('');
	}

	public function addAddPermission()
	{
		if (!isset($_GET['ID']))
			redirect('');
		if ($this->user->confirm_Member())
		{
			if ($this->user->is_Admin())
			{
				$un = $this->user->userName();
				$permissions = $this->mysql->getPermissions($un);
				if (!$permissions['permissionAdd'])
					redirect('');
				$this->mysql->changelog('Add management permission');
				$id=$_GET['ID'];
				$this->mysql->changelog('Add management permission for ['.$this->db->get_where('webUsers',array('ID' => $_GET['ID']))->row()->username.']');
				$this->db->query("UPDATE  `webUsers` SET  `permissionAdd` =  '1' WHERE `ID` =".$id." LIMIT 1");
				redirect('user_management/index');
				return;
			}
		}
		redirect('');
	}


	//removes full access
	function removeAccess()
	{
		if (!isset($_GET['ID']))
			redirect('');
		if ($this->user->confirm_Member())
		{
			if ($this->user->is_Admin())
			{
				$un = $this->user->userName();
				$permissions = $this->mysql->getPermissions($un);
				if (!$permissions['permissionAdd'])
					redirect('');
				$id=$_GET['ID'];
				$this->db->query("UPDATE  `webUsers` SET  `permissionBrowse` =  '0' WHERE `ID` =".$id." LIMIT 1");
				$this->mysql->changelog('Remove full access for ['.$this->db->get_where('webUsers',array('ID' => $_GET['ID']))->row()->username.']');
				//return;
				redirect('user_management/index');
			}
		}
		redirect('');
	}

	//adds full access
	function addAccess()
	{
		if (!isset($_GET['ID']))
			redirect('');
		if ($this->user->confirm_Member())
		{
			if ($this->user->is_Admin())
			{
				$un = $this->user->userName();
				$permissions = $this->mysql->getPermissions($un);
				if (!$permissions['permissionAdd'])
					redirect('');
				$id=$_GET['ID'];
				$this->db->query("UPDATE  `webUsers` SET  `permissionBrowse` =  '1' WHERE `ID` =".$id." LIMIT 1");
				$this->mysql->changelog('Add full access for ['.$this->db->get_where('webUsers',array('ID' => $_GET['ID']))->row()->username.']');
				redirect('user_management/index');
				return;
			}
		}
		redirect('');
	}

	//deletes an admin
	public function deleteUser()
	{
		if (!isset($_GET['ID']))
			redirect('');
		if ($this->user->confirm_Member())
		{
			if ($this->user->is_Admin())
			{
				$un = $this->user->userName();
				$permissions = $this->mysql->getPermissions($un);
				if (!$permissions['permissionAdd'])
					redirect('');
					
				echo $this->user->userID();
				echo $_GET['ID'];
				//can't delete yourself as an admin
				if($this->user->userID()==$_GET['ID'])
				{
					redirect('user_management/index');
				}
				$id=$_GET['ID'];
				$this->mysql->changelog('Remove admin ['.$this->db->get_where('webUsers',array('ID' => $_GET['ID']))->row()->username.']');
				$email = $this->db->query("SELECT username FROM webUsers WHERE ID='{$id}'")->row()->username;
				$this->db->delete('usersInGroups',array('webUser'=>$email));
				$this->db->delete('webUsers', array('id' => $id));
				$this->db->delete('uniqueUrl', array('email' => $email));
				redirect('user_management/index');
				return;
			}
		}
		redirect('');
	}

	public function editGroupPermissions()
	{
		if ($this->user->confirm_Member() && $this->user->is_Admin() )
		{
			$un = $this->user->userName();
			if($un=='')
			{
				redirect('');
			}
			$permissions = $this->mysql->getPermissions($un);
			if (!$permissions['permissionAdd'])
				redirect('');
			if (!isset($_GET['ID']))
				redirect('');

			//get info from Web Users
			$info = $this->db->get_where('webUsers', array('ID'=>$_GET['ID']))->row();

			//if doesn't exist
			if(!isset($info->admin))
				redirect('');

			//if not admin
			if($info->admin!=1)
				redirect('');

			$params['name'] = $info->first_name;
			$params['surname'] = $info->surname;
			$params['username'] = $info->username;
			$params['groups'] = $this->db->get('groups')->result();
			$params['categories'] = $this->db->get('categories')->result();
			$params['ID'] = $_GET['ID'];

			//Get info from Users in groups
			$perms = $this->db->get_where('usersInGroups', array('webUser'=>$info->username))->result();

			//get the list of groups the admin is in
			foreach ($perms as $row)
			{
				$params['permissions'][] = array(
											"name" => $this->db->get_where('groups', array('ID'=>$row->groupID))->row()->name,
											"ID" => $row->groupID,
										);
			}
			//get the list of restrictions
			if(!$this->db->get_where('webUsers', array('username'=>$info->username))->row()->permissionBrowse)
			{
				$access = $this->db->get_where('webUsers', array('username'=>$info->username))->row()->restrictions;
				$accessArray = array_filter(explode(',',$access));
				foreach($accessArray as $row)
				{
					$params['infoRestrictions'][] = array(
											"name" => $this->db->get_where('categories', array('ID'=>$row))->row()->name,
											"ID" => $row,
										);
				}
			}

			//finally show the stuff
			$this->load->view('view_menu');
			$this->load->view('view_edit_group_permissions', $params);
		}
		else
			redirect('');
	}

	//removes an admin from a group
	public function removeGroupPermission()
	{
		if (!isset($_GET['username']))
				redirect('');
		if (!isset($_GET['groupID']))
				redirect('');

		if ($this->user->confirm_Member() && $this->user->is_Admin() )
		{
			$un = $this->user->userName();
			if($un=='')
			{
				redirect('');
			}
			$permissions = $this->mysql->getPermissions($un);
			if (!$permissions['permissionAdd'])
				redirect('');

			$this->mysql->changelog('Remove a group permission for ['.$_GET['username'].']');
			
			$this->db->query('DELETE FROM usersInGroups WHERE webUser="' . $_GET["username"] .'" AND groupID='. $_GET['groupID']);

			redirect('user_management/editGroupPermissions?ID='.$_GET['userID']);
		}
	}

	//checks what was submitted and calls an appropriate method
	public function permissionSubmit()
	{
		if(isset($_POST['groupSubmit']))
		{
			$this->addGroupPermission();
		}
		else if(isset($_POST['categorySubmit']))
		{
			$this->addRestriction();
		}
		else
			redirect('');
	}

	//adds an admin in a group
	public function addGroupPermission()
	{
		if ($this->user->confirm_Member() && $this->user->is_Admin() )
		{
			$un = $this->user->userName();
			if($un=='')
			{
				redirect('');
			}
			$permissions = $this->mysql->getPermissions($un);
			if (!$permissions['permissionAdd'])
				redirect('');
			if (!isset($_POST))
				redirect('');

			$data = array(
						   'webUser' => $_POST['username'] ,
						   'groupID' => $_POST['selectID'],
						   'isAdmin' => 1
						);

			if($this->db->get_where('usersInGroups', $data)->num_rows()==0)
			{
				$this->db->insert('usersInGroups', $data);
				$this->mysql->changelog('Add a group permission for ['.$_POST['username'].']');
			}
			redirect('user_management/editGroupPermissions?ID='.$_POST['userID']);
		}
	}

	//adds a restriction for an admin
	public function addRestriction()
	{
		if ($this->user->confirm_Member() && $this->user->is_Admin() )
		{
			$un = $this->user->userName();
			if($un=='')
			{
				redirect('');
			}
			$permissions = $this->mysql->getPermissions($un);
			if (!$permissions['permissionAdd'])
				redirect('');
			if (!isset($_POST))
				redirect('');

			//get restrictions and explode them. add a new at the end and implode and update.
			$access = $this->db->get_where('webUsers', array('username'=>$_POST['username']))->row()->restrictions;
			$access = array_filter(explode(',',$access));
			if (array_search($_POST['selectCategoryID'], $access)!=FALSE)
				unset($access[array_search($_POST['selectCategoryID'], $access)]);
			$access[] = $_POST['selectCategoryID'];
			$access = implode(',',$access);

			$this->db->query('UPDATE webUsers SET restrictions="'.$access.'" WHERE username="' . $_POST["username"] .'"');

			$this->mysql->changelog('Add a restriction for ['.$_POST['username'].']');
			
			redirect('user_management/editGroupPermissions?ID='.$_POST['userID']);
		}
	}

	//explore permissions, remove one of them and implode and update
	public function removeRestriction()
	{
		if (!isset($_GET['username']))
				redirect('');

		if ($this->user->confirm_Member() && $this->user->is_Admin() )
		{
			$un = $this->user->userName();
			if($un=='')
			{
				redirect('');
			}
			$permissions = $this->mysql->getPermissions($un);
			if (!$permissions['permissionAdd'])
				redirect('');
			if (!isset($_GET['categoryID']) || !isset($_GET['username']) || !isset($_GET['userID']))
				redirect('');

			$access = $this->db->get_where('webUsers', array('username'=>$_GET['username']))->row()->restrictions;
			$access = array_filter(explode(',',$access));
			unset($access[array_search($_GET['categoryID'], $access)]);
			$access = implode(',',$access);

			$this->mysql->changelog('Remove a restriction for ['.$_GET['username'].']');
			
			$this->db->query('UPDATE webUsers SET restrictions="'.$access.'" WHERE username="' . $_GET["username"] .'"');

			redirect('../../user_management/editGroupPermissions?ID='.$_GET['userID']);
		}
	}

	//deletes a pending registration.
	public function deleteReg()
	{
		if (!isset($_GET['unique'])||$this->user->get_Permissions()['permissionAdd']==0)
			redirect('user_management/index');
		$this->db->query("DELETE FROM uniqueUrl WHERE url='".$_GET['unique']."' LIMIT 1");
		
		//redirects while keeping the pending part of the page shown
		redirect("user_management?pending");
	}
}
