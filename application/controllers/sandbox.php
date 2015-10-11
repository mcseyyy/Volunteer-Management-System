<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class Sandbox extends CI_Controller
{
    function index()
	{
        $this->load->view('view_sandbox');
        $this->load->view('view_statistics');
    }
}