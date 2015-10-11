<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class log extends CI_Controller
{
	//Constructor; mainly for checking permissions
	function __construct()
	{
		parent::__construct();      // Call parent constructer
		
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
	}
	
	//index function that loads the view with the first page of logs
	public function index()
	{
		if (isset($_GET['page']))
			$page=$_GET['page'];
		else
			$page=1;
		
		//get the number of pages of Changelog
		$pageNo=$this->db->query("SELECT COUNT(*) AS no FROM changelog")->row();
		$pageNo=$pageNo->no;
		if ($pageNo%20==0)	
			$pageNo=floor($pageNo/20);
		else				
			 $pageNo=floor($pageNo/20)+1;
		
		//if current page is too large redirect to first page
		if ($page>$pageNo)
			redirect("log/index");
		
		//get the logs corresponding to that page
		$logNo=($page-1)*20;
		$logs=$this->db->query("SELECT * FROM changelog ORDER BY date DESC LIMIT ".$logNo.",20")->result();
		//add some extra information (name, surname, isAdmin?)
	
		foreach ($logs as $log)
		{
			$userData=$this->db->query("SELECT first_name, surname, admin FROM webUsers WHERE username='".$log->user."' LIMIT 1")->row();
			if (empty($userData))
			{
				$log->admin=-1;
				$log->first_name="User ";
				$log->surname="Deleted";
			}
			else
			{
			
				$log->first_name=$userData->first_name;
				$log->surname=$userData->surname;
				$log->admin=$userData->admin;
				if ($log->admin==0)
				{
					$id=$this->db->query("SELECT ID FROM volunteersNew WHERE email='".$log->user."' LIMIT 1")->row();
					if (isset($id->ID))
						$log->id=$id->ID;
					else
						$log->id=-1;
				}
			}
			
		}
		
		$data=array();
		$data['pageNo']=$pageNo;
		$data['logs']=$logs;
		$this->load->view("view_menu");
		$this->load->view("view_log",$data);	
	}
	
	//function that searches for specific logs and loads the view to display those logs
	public function search()
	{
		$query="SELECT * FROM changelog WHERE ";		
		$comma=false;
		//check if the username input field has been filled
		if ($_POST['userName']!==' ')
		{
			$query=$query."user LIKE '%".$_POST['userName']."%'";
			$comma=true;
		}
		//check if the input field for Start Date has been filled
		//if yes set date '>=startDate'
		if ($_POST['startDate']!=='')
		{
			if ($comma)
				$query=$query." AND ";			
			$query=$query."date>='".$_POST['startDate']." 00:00:00'";
			
			$comma=true;
		}
		//check if the End Date has been filled
		//if yes set date '<= endDate'
		if ($_POST['endDate']!=='')
		{
			if ($comma)
				$query=$query." AND ";			
			$query=$query."date<='".$_POST['endDate']." 23:59:59'";
			$comma=true;
		}
		//check if the user is searching for a specific action
		if ($_POST['action']!=='')
		{
			if ($comma)
				$query=$query." AND ";
			$query=$query." text LIKE '%".$_POST['action']."%'";
		}
		//add the sorting options
		$query=$query." ORDER BY date DESC";
		$logs=$this->db->query($query)->result();
		foreach ($logs as $log)
		{
			$userData=$this->db->query("SELECT first_name, surname, admin FROM webUsers WHERE username='".$log->user."' LIMIT 1")->row();
			if (empty($userData))
			{
				$log->admin=-1;
				$log->first_name="User ";
				$log->surname="Deleted";
			}
			else
			{
			
				$log->first_name=$userData->first_name;
				$log->surname=$userData->surname;
				$log->admin=$userData->admin;
				if ($log->admin==0)
				{
					$id=$this->db->query("SELECT ID FROM volunteersNew WHERE email='".$log->user."' LIMIT 1")->row();
					if (isset($id->ID))
						$log->id=$id->ID;
					else
						$log->id=-1;
				}
			}			
		}
		
		$data=array();
		$data['logs']=$logs;
		//echo $query;
		$this->load->view("view_menu");
		$this->load->view("view_logSearch",$data);
	}
}	