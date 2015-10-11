<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Send_email extends CI_Controller
{
	public function index($emailList)
	{
		$this->load->view("view_menu");
        $data['emails'] = $this->mysql->getMail();
		$data['emailList']=$emailList;
		$this->load->view("view_send_email", $data);
	}
	
	public function buttonAction()
	{
        $this->load->model("mysql");
		
        $data = array( 
            'Subject' => $_POST['subject'],
            'Text' => $_POST['emailtext']
        );
        
        $recepients = $_POST['adresses'];
        
        if(!$_POST)
			redirect('');

		//insert email into DB
        if(array_key_exists('Save', $_POST))
        {
            $check = $this->db->get_where('email', array('Subject' => $_POST['subject']))->num_rows();
            
            if ($check == 0)
                $this->mysql->insert_Email($data);
            else
                $this->mysql->overwrite_Email($data);
        }
        
		//delete email
        if(array_key_exists('Delete', $_POST))
        {
            $this->db->delete('email', $data);
        }
        $emailList = $_POST['adresses'];
        $this->index($emailList);
	}
	
	public function email()
	{
		if(!$_POST)
			redirect('');
		$this->load->view("view_menu");
		$data['emails'] = $this->mysql->getMail();
        $data['emailList'] = $_POST['emailList'];
		$this->load->view("view_send_email", $data);
	}
}