<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Statistics extends CI_Controller
{
	function __construct()
	{
		parent::__construct();      // Call parent constructer
		
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
	}
	
	function index()
	{
		//gets all field names from volunteers table
		$data['fields'] = $this->db->query("SELECT ID,tableName AS name,fieldType FROM fields WHERE fieldType<>'text'")->result();
		
		$this->load->view("view_menu");
		$this->load->view('view_statistics', $data);
		
	}
	
	function submit()
	{	
		$data['fields'] = $this->db->query("SELECT ID,tableName AS name,fieldType FROM fields WHERE fieldType<>'text'")->result();
		$data['search'] = null;
		
		//get selected field ID
		$field = $_POST['fieldId'];
		//get information about selected field from DB
		if($field != "fname" && $field != "title" && $field != "email" && $field != "sname" && $field!="rdate")
		{
			$values = $this->db->query("SELECT ID,fieldType,options FROM fields WHERE ID=".$field)->row_array();
			$fieldname = "field".$values['ID'];
			$namefield = $this->db->query("SELECT tableName AS namef FROM fields WHERE ID=".$field)->row();
			$data['name'] = $namefield->namef;
		}
		else if($field == "title")
		{
			$values['fieldType'] = "DropDown";
			$values['options'] = "Mr.,Mrs.,Ms.,Miss,Dr.";
			$fieldname = "title";
			$data['name'] = "Title";
		}
		else if($field == "fname")
		{
			$values['fieldType'] = "smallText";
			$values['options'] = null;
			$fieldname = "firstName";
			$data['name'] = "First Name";
		}
		else if($field == "sname")
		{
			$values['fieldType'] = "smallText";
			$values['options'] = null;
			$fieldname = "surname";
			$data['name'] = "Surname";
		}
		else if($field == "email")
		{
			$values['fieldType'] = "smalltext";
			$values['options'] = null;
			$fieldname = "email";
			$data['name'] = "Email";
		}
		else if($field == "rdate")
		{
			$values['fieldType'] = "date";
			$values['options'] = null;
			$fieldname = "registerDate";
			$data['name'] = "Registration Date";
		}
		
		//total number of volunteers
		$data['total'] = $this->mysql->userNumber();
		
		//prepare data depending on its type
		if($values['fieldType'] == "DropDown")
		{
			$array_values = explode(',',$values['options']);
			foreach($array_values as $value)
			{
				$value=trim($value);
				$this->db->where($fieldname,$value);
				$result[$value] = $this->db->get('volunteersNew')->num_rows();
			}
		}
        else if($values['fieldType'] == "checkbox")
		{
			$array_values = explode(',',$values['options']);
			foreach($array_values as $value)
			{
				$value=trim($value);
				$this->db->like($fieldname,$value);
				$result[$value] = $this->db->get('volunteersNew')->num_rows();
			}
		}
		else if($values['fieldType'] == "smallText" || $values['fieldType'] == "bigText")
		{ 
			$value = $_POST['search'];
			$data['search']=$value;
			$array_values =  explode(',',$value);
			foreach($array_values as $criteria)
			{
				$criteria=trim($criteria);
				$table = $this->db->query("SELECT COUNT(*) AS no FROM volunteersNew WHERE ".$fieldname." LIKE '%".$criteria."%'")->row();
				$result[$criteria] = $table->no;
			}
		}
		else
		{
			//set default timezone
			date_default_timezone_set('UTC');
			$start = $_POST['startDate'];
			$end = $_POST['endDate'];
			$interval = $_POST['interval'];
			$temp = $start;
			//total number
			$table = $this->db->query("SELECT COUNT(*) AS no FROM volunteersNew WHERE ".$fieldname.">='".$start."' AND ".$fieldname." <='".$end."'")->row();
			$data['totaldate'] = $table->no;
			
			if($interval == "Year")
			{
				$t = date('Y-m-d',strtotime($temp.'+ 1 years'));
				while($t < $end)
				{
					$table = $this->db->query("SELECT COUNT(*) AS no FROM volunteersNew WHERE ".$fieldname.">='".$temp."' AND ".$fieldname." <'".$t."'")->row();
					$result[$temp] = $table->no;
					$temp = $t;
					$t = date('Y-m-d',strtotime($temp.'+ 1 years'));
				}
				$table = $this->db->query("SELECT COUNT(*) AS no FROM volunteersNew WHERE ".$fieldname.">='".$temp."' AND ".$fieldname." <'".$t."'")->row();
				$result[$temp] = $table->no;
			}
			
			if($interval == "Month")
			{
				$t = date('Y-m-d',strtotime($temp.'+ 1 months'));
				while($t < $end)
				{
					$query="SELECT COUNT(*) AS no FROM volunteersNew WHERE ".$fieldname.">='".$temp."' AND ".$fieldname." <='".$t."'";
					$table = $this->db->query("SELECT COUNT(*) AS no FROM volunteersNew WHERE ".$fieldname.">='".$temp."' AND ".$fieldname." <='".$t."'")->row();
					$result[$temp] = $table->no;
					$temp = $t;
					$t = date('Y-m-d',strtotime($temp.'+ 1 months'));
				}
				$table = $this->db->query("SELECT COUNT(*) AS no FROM volunteersNew WHERE ".$fieldname.">='".$temp."' AND ".$fieldname." <='".$t."'")->row();
				$result[$temp] = $table->no;
			}
		}

		//select what type of vizualisation
		$data['chartType'] = $_POST['chartType'];
		$data['result'] = $result;
		$data['fieldType']=$values['fieldType'];	
		$this->load->view('view_menu');
		$this->load->view('view_statistics_result',$data);
	}
}