<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');
class Forgotten extends CI_Controller
{
    public function index()
    {
        $this->load->view('view_forgotten');
    }
    
	public function recover()
    {	
		//check the unique url.
		if (!isset($_GET['unique']))
			redirect ("");
		$exist=$this->db->query("SELECT COUNT(*) AS nmb FROM uniqueUrl where url='".$_GET['unique']."' AND recovery=1")->result();
		if ($exist[0]->nmb!=1)
			redirect('');
		
		$date=$this->db->query("SELECT * FROM uniqueUrl WHERE url='".$_GET['unique']."' AND recovery=1")->row()->dateAdded;
		//load view if it's valid
		$time = strtotime($date);
		$curtime = time();
		if(($curtime-$time) > 86400) { 
			$this->db->query("DELETE FROM uniqueUrl WHERE url='".$_GET['unique']."' LIMIT 1");
			redirect('');
		}
		$this->load->view('view_recovery');
	}
	
	public function reset()
	{
		//check if passwords match
		if (!isset($_POST['new1']) || !isset($_POST['new2']) || !isset($_GET['url']))
			redirect("");
		if ($_POST['new1']!==$_POST['new2'])
		{
			$message="Passwords do not match";
			//change to send message
			//redirect("");
		}
		else
		{
			//hash the password and store it.
			$data['password']=password_hash($_POST['new1'], PASSWORD_DEFAULT);
			$email=$this->db->query("SELECT email FROM uniqueUrl WHERE url='".$_GET['url']."' AND recovery=1 LIMIT 1")->row();
			$email=$email->email;
			$this->db->where('username',$email);
			$this->db->update('webUsers', $data);
			$this->db->query("DELETE FROM uniqueUrl WHERE url='".$_GET['url']."' LIMIT 1");
			$message="Password successfully changed";
			//change to send message
			//redirect("");
		}
		echo $message;
	}
	
	
    public function submit()
    {
        if (!isset($_POST['email']))
            redirect('');
			
		//if the user is not in webUsers
        $result = $this->db->get_where('webUsers', array(
            'username' => $_POST['email']
        ), 1);
		
		//if it is in webUsers but haven't finished the registration
		$result2 = $this->db->get_where('uniqueUrl', array(
            'email' => $_POST['email'],
			'recovery' => 0
        ), 1);
        if ($result->num_rows() != 1) 
		{
            $data = array(
                'response' => 'Email not registered.'
            );
            $this->load->view('view_forgotten', $data);
        } 
		else if ($result2->num_rows() == 1) 
		{
            $data = array(
                'response' => 'Email not registered.'
            );
            $this->load->view('view_forgotten', $data);
        }
		//send a recovery email
		else 
		{
            $hash   = password_hash($_POST['email'], PASSWORD_DEFAULT);
            $result = $this->db->delete('uniqueUrl', array(
                'email' => $_POST['email']
            ));
            $this->db->insert('uniqueUrl', array(
                'email' => $_POST['email'],
                'url' => $hash,
                'admin' => 0,
                'recovery' => 1
            ));
            
            $message = "Dear user,\nhere is your password recovery link: " . base_url('/forgotten/recover?unique=') . $hash;

            $this->load->library('email');
            $this->email->set_newline("\r\n");
            $this->email->from('Ppassword recovery', 'noreply');
            $this->email->to($_POST['email']);
            
            $this->email->subject('Password recovery');
            $this->email->message($message); 
			$this->email->send();
			$data    = array(
				'response' => 'Password recovery email sent.'
			);
			 $this->load->view('view_forgotten', $data);

        }
    }
}


?>