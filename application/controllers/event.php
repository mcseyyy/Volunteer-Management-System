<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Event extends CI_Controller
{
	public function index()
	{
		redirect('event/page/0');
	}

	public function page()
	{
		//checks is the user has permission to view the page
		if (!$this->user->confirm_Member())
			redirect('');
		$data=array();
		$data['isAdmin']=false;

		//checks what type of permission the user has (admin/volunteer)
		if ($this->user->is_Admin())
			$data['isAdmin']=true;

		$this->load->helper("url");
		$this->load->library("pagination");

		$config=array();
		$config["base_url"] = base_url()."event/page/";
        $config["total_rows"] = $this->countEvents();
        $config["per_page"] = 5;
        $config["uri_segment"] = 3;

        $this->pagination->initialize($config);

		$start = ($this->uri->segment(3)) ? $this->uri->segment(3) : 0;
        $data["events"] = $this->getEvents($config["per_page"], $start);
        $data["links"] = $this->pagination->create_links();

		$this->load->view("view_menu");
		$this->load->view("view_eventDisplay", $data);


	}

	//gets all events information from database
	private function getEvents($limit, $start)
	{
		//if user is admin get all events, if not only the ones that are not hidden
		if ($this->user->is_Admin())
			$events=$this->db->query("SELECT * FROM event ORDER BY eventDate DESC LIMIT $start, $limit")->result();
		else
			$events=$this->db->query("SELECT * FROM event WHERE `show`=1 ORDER BY eventDate DESC LIMIT ".$start.", ".$limit)->result();
		return $events;
	}

	private function countEvents()
	{
		if ($this->user->is_Admin())
			$no=$this->db->query("SELECT COUNT(*) AS nmb FROM event")->row();
		else
			$no=$this->db->query("SELECT COUNT(*) AS nmb FROM event WHERE 'show'=1")->row();
		return $no->nmb;
	}

	//create new event, redirect to new page
	public function create()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect("event/index");
		$this->load->view("view_menu");

		//get groups names from db
		$data['groups']=$this->db->query("SELECT * FROM groups")->result();

		//if event already created, get info from db
		if (isset($_GET['event']))
		{
			$data['event']=$this->db->query("SELECT * FROM event WHERE ID=".$_GET['event']." LIMIT 1")->row();
			$this->load->view("view_addEvent", $data);
		}
		else
		{
			$this->load->view("view_addEvent", $data);
		}
	}

	//insert new event info into DB
	public function submitCreate()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect("event/index");
			
		$name = $this->db->query("SELECT first_name,surname FROM webUsers WHERE username ='".$this->user->userName()."'")->row();
		$name = $name->first_name." ".$name->surname;

		$data=array(
			'title'=>$_POST['title'],
			//'message'=>str_replace("\n","<br>",$_POST['message']),
			'message'=>$_POST['message'],
			'eventDate'=>$_POST['eventDate'],
			'name'=>$name,
			'show'=>$_POST['show'],
			'GroupID'=>$_POST['group']
		);
		//if id is not already in DB create it
		if ($_POST['ID']==-1)
		{
			$this->db->insert('event',$data);
			$this->mysql->changelog("Event [".$data['title']."] created");
		}
		//id already in DB, update info
		else
		{
			$this->db->where('ID', $_POST['ID']);
			$this->db->update('event',$data);
			$this->mysql->changelog("Event [".$data['title']."] edited");
		}

		redirect("event/index");
	}

	//delete an event from DB
	public function deleteEvent()
	{
		//checks if user har permission to perform the task
		if(!$this->user->get_Permissions()['permissionAdd'])
			redirect("event/index");
			
		$name=$this->db->query("SELECT title FROM event WHERE ID=".$_GET['event']."")->row();
		
		//delete event from DB
		$this->db->where('ID',$_GET['event']);
		$this->db->delete('event');
		//record change in changelog
		$this->mysql->changelog("Event [".$name->title."] deleted");
		
		redirect("event/index");
	}
}
