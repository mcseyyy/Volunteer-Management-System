<?php

class Mysql extends CI_model
{
	//parameters are a user name and a password. Returns true if this user is in the website user database and their password is correct.
	function verify_Username_and_Pass($un, $pwd)
	{
		$result = $this->db->get_where("webUsers", array( 'username' => $un));
		if ($result->num_rows() < 1)
            return false;
		if (password_verify($pwd, $result->result_array()[0]['password']))
			return true;
		return false;
	}
    
    function isAdmin($un)
    {
        return $this->db->select('admin')->get_where('webUsers', array('username'=>$un))->row()->admin;
    }
	
	function getPermissions($un)
    {
		return $this->db->select('permissionBrowse,permissionAdd')->get_where('webUsers', array('username'=>$un))->row_array();
    }
	
	function getRestrictions($un)
    {
		return $this->db->select('restrictions')->get_where('webUsers', array('username'=>$un))->row()->restrictions;
    }
    
    function getGroupMembers($un)
    {
        // Doesn't seem as though subqueries are supported by CI
        $users = array();
        foreach ($this->db->query("select distinct webUser from (usersInGroups natural join (select groupID from usersInGroups where webUser={$this->db->escape($un)}) q)")->result() as $user)
            array_push($users, $user->webUser);
        return $users;
    }
	
	function getName($un)
	{
		return $this->db->select('first_name')->get_where('webUsers', array('username'=>$un))->row()->first_name;
	}
	
	function insert_User($data)
	{
		$this->db->insert('volunteers',$data);
	}
	
	function insert_Email($data)
	{
		$this->db->insert('email',$data);
	}
	
    function overwrite_Email ($data)
    {
		$this->db->where('Subject',$data['Subject']);
        $this->db->update('email',$data);
    }
    
	function insert_webUser($data)
	{
		$this->db->insert('webUsers',$data);
	}
	
	function insert_uniqueUrl($email, $url)
	{
		$data = array(
			'url' => $url,
			'email' => $email,
			'admin' => 0
        );
		$this->db->delete('uniqueUrl', array('email' => $email));
		$this->db->insert('uniqueUrl',$data);
	}
	
	function insert_admin_uniqueUrl($email, $url)
	{
		$data = array(
			'url' => $url ,
			'email' => $email,
			'admin' => 1
			);
		$this->db->delete('uniqueUrl', array('email' => $email));
		$this->db->insert('uniqueUrl',$data);
	}
	
	function verify_volunteer_unique_url($url)
	{
		if($this->db->get_where('uniqueUrl',array('url'=>$url, 'admin'=>0))->num_rows()<1)
			redirect('');
		return $this->db->get_where('uniqueUrl',array('url'=>$url, 'admin'=>0))->row()->url;
	}
	
	function verify_admin_unique_url($url)
	{
		if($this->db->get_where('uniqueUrl',array('url'=>$url, 'admin'=>1))->num_rows()<1)
			redirect('');
		return $this->db->get_where('uniqueUrl',array('url'=>$url, 'admin'=>1))->row()->url;
	}
	
	//this function returns the ID based on the username (which is email address)
	function userID($un)
	{
        $q = $this->db->get_where('webUsers', array('username'=>$un));
		if ($q->num_rows() > 0)
            return $q->row()->ID;
        return false;
	}
    
	//this function returns the ID based on the username (which is email address)
	function volunteerID($un)
	{
        $q = $this->db->get_where('volunteersNew', array('email'=>$un));
		if ($q->num_rows() > 0)
            return $q->row()->ID;
        return false;
	}
	
    function getMail()
    {
        return $this->db->get('email')->result();
    }	
	
	function addAdmin($dataIn)
	{
		$data = array(
			'username'         => $dataIn['admin_email'] ,
			'password'         => password_hash(substr("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", mt_rand(0, 50), 1).substr(md5(time()), 1), PASSWORD_DEFAULT),
			'first_name'       => $dataIn['first_name'],
			'surname'          => $dataIn['surname'],
			'admin'            => 1,
			'permissionBrowse' => isset($dataIn['permissionBrowse']),
			'permissionAdd'    => isset($dataIn['permissionAdd']),
			);
		$this->db->insert('webUsers',$data);
	}
	
	//return total number of volunteers
	function userNumber()
	{
		return $this->db->count_all('volunteersNew');
	}
	
	//returns number of volunteers that satisfy condition
	function countWhere($field, $value)
	{
		$this->db->select('email')->get_where('volunteersNew', array($field => $value));
		return $this->db->count_all_results();
	}
	
	//...
	function foo($total, $value)
	{
		return ($value/$total*100).'%';
	}
	
	//adds a log in the changelog with $text
	function changelog($text, $user=NULL)
	{		
		if($user===NULL)
			$user=$this->user->userName();
		$data=array(
			'user'=>$user,
			'text'=>$text);
		$this->load->dbforge();
		$this->db->insert('changelog',$data);
	}
}

?>