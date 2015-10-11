<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class RegistrationNew extends CI_Controller
{
	//function for loading the registration form for a volunteer
	public function index()
	{
		if (!isset($_GET['unique']))
			redirect('');
		$this->load->model("mysql");
		//accept only valid Unique URLs
		if ($this->mysql->verify_volunteer_unique_url($_GET['unique']))
		{
			$fields=array();
			$email=$this->db->query("SELECT `email` FROM `uniqueUrl` WHERE `url`='".$_GET['unique']."' AND recovery=0 AND admin=0 LIMIT 1")->row();
			$categories = $this->db->query("SELECT * FROM `categories` ORDER BY `order` ASC")->result();
			foreach ($categories as $category)
			{
				$fields[$category->ID]=$this->db->query("SELECT * FROM fields WHERE category=".$category->ID." ORDER BY `order` ASC")->result();
			}
			$data=array('fields'=>$fields,
					'categories'=>$categories,
					'email'=>$email->email,
					'url'=>$_GET['unique']);
			
			$this->load->view("view_registrationNew",$data);
		}
		else
			redirect('');
	}

	//function that saves the details of a volunteer after they
	//complete the registration form
	public function submit()
	{
		if (!$_POST)
			redirect('');
		if (!isset($_GET['url']))
			redirect('');
		//check if the URL is indeed unique
		$rows=$this->db->query("SELECT url FROM `uniqueUrl` WHERE `url`='".$_GET['url']."' AND recovery=0 AND admin=0 LIMIT 1")->num_rows();
		if($rows<1)
		{
			echo "Error: ".$_GET['url']."<br>";
			echo $rows;
			return;
		}

		foreach ($_POST as $k => $v)
			if (is_string($_POST[$k]))
				$_POST[$k] = htmlspecialchars($v);


		$this->load->model("mysql");
		//use British time
		date_default_timezone_set('Europe/London');
		$data=array(
			'title'=>$_POST['personalTitle'],
			'firstName'=>$_POST['firstName'],
			'surname'=>$_POST['surname'],
			'email'=>$_POST['email'],
			'registerDate'=>date('Y/m/d'),
			);
		$fields=$this->db->query("SELECT * FROM fields ")->result();
		//get every input field
		foreach ($fields as $field)
		{

			if ($field->fieldType=='smallText'||$field->fieldType=='bigText'||$field->fieldType=='DropDown')
				{
				if (isset($_POST[$field->ID]))
					$data['field'.$field->ID]= $_POST[$field->ID];
				}
			else if ($field->fieldType=='checkbox')
			{
				$boxName='checkbox'.$field->ID;

				if (isset($_POST[$boxName]))
				{
					$finalValue='';
					foreach ($_POST[$boxName] as $value){
						$finalValue=$finalValue.','.$value;
					}

					$finalValue=substr($finalValue,1);
					$data['field'.$field->ID]=$finalValue;
				}
			}
		}

		$this->db->insert('volunteersNew',$data);
		$password=$_POST['password'];
		$hash = password_hash($password, PASSWORD_DEFAULT);
		$webdata=array(
			'first_name'=>$_POST['firstName'],
			'surname'=>$_POST['surname'],
			'username'=>$_POST['email'],
			'password'=>$hash,
			'admin'=>0
		);
		//delete URL
		$this->db->query("DELETE FROM uniqueUrl WHERE url='".$_GET['url']."'");

		$this->mysql->insert_webUser($webdata);
		//ChangeLog
		$this->mysql->changelog("Volunteer registered",$_POST['email']);

		redirect('login/success');
	}

	//function that loads the admin registration form
	public function admin()
	{
		if (!isset($_GET['unique']))
			redirect('');

		if ($this->mysql->verify_admin_unique_url($_GET['unique']))
		{
			$this->load->view('view_registrationAdmin',$_GET);
		}
	}

	//function that saves the details of an admin
	public function submitAdmin()
	{
		if (!$_POST)
			redirect('');
		{
            foreach ($_POST as $k => $v)
                $_POST[$k] = htmlspecialchars($v);
			if ($this->mysql->verify_admin_unique_url($_POST['unique']))
			{
				$data = array(
				   'password' => password_hash($_POST['password'], PASSWORD_DEFAULT)
				);

				$query = $this->db->get_where('uniqueUrl', array('url' => $_POST['unique']))->result_array()[0]['email'];

				$this->db->where('username', $query);
				$this->db->update('webUsers', $data);
				//remove Unique URL after it's used
				$this->db->delete('uniqueUrl', array('url' => $_POST['unique']));
				//ChangeLog
				$this->mysql->changelog("Admin registered",$query);
				$this->db->query("DELETE FROM uniqueUrl WHERE url='".$_GET['url']."'");
				redirect('login/success');
			}
		}
	}
}

