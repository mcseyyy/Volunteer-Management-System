<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Backup extends CI_Controller
{
    function __construct()
	{
		parent::__construct();      // Call parent constructer

        $this->load->dbutil();
        $this->load->helper('file');
        $this->load->helper('download');
        $this->load->helper('date');
        $this->load->helper('directory');
        $this->load->library('zip');

        // Admin check
        if (!$this->user->get_Permissions()['permissionAdd'])
            redirect(''); // Home page

        $this->view_data = array(
            'files' => NULL,
            'status' => NULL
        );
        $this->__listBackups();
    }
    
    function __listBackups()
    {
        $this->view_data['files'] = directory_map('backups/', 1);
        rsort($this->view_data['files'], SORT_NATURAL);
        array_shift($this->view_data['files']);
    }

    function index()
    {
        $this->load->view('view_menu');
        $this->load->view('view_backup', $this->view_data);
    }

    function makeBackup()
    {
        $backup =& $this->dbutil->backup();
        $filename = date("Y-m-d_H-i-s").'.gz';
        write_file('backups/'.$filename, $backup);
		$this->mysql->changelog('Create a backup');
        redirect('backup/index');
    }

    function deleteBackup()
    {
        // Sanity check
        if (empty($_POST))
            redirect('..');

        foreach ($_POST as $k => $v)
            unlink('backups/' . substr($k, 0, strrpos($k, '_')) . '.' . substr($k, strrpos($k, '_') + 1)); // The substr is because the dot is translated to an underscore by PHP

		$this->mysql->changelog('Remove backup');
        redirect('backup/index');
    }

	function downloadFile($filename)
	{
        // Sanity check
		if (!$filename)
			redirect('');
    
        $filepath = FCPATH."backups/$filename";
        if (file_exists($filepath))
            force_download($filename, file_get_contents($filepath));
	}
	
    function restoreBackup($filename, $restoring = 0)
    {
        if ($restoring == 0)
        {
            $this->load->view('view_menu');
            $this->load->view('view_backup_restore');
        }
        elseif ($restoring == 1)
        {
            $file = gzopen(FCPATH."backups/$filename", 'rb');
            $SQL = '';
            while (!gzeof($file))
                $SQL .= gzread($file, 4096);
            
            $SQLi = $this->load->database('defaulti', TRUE);
            $SQLi->call_function('multi_query', $SQLi->conn_id, $SQL);
            while ($SQLi->call_function('next_result', $SQLi->conn_id));
            
            $this->mysql->changelog('Backup restored');
            redirect('backup/index');
        }
    }
    
    function uploadBackup()
    {
        $this->load->library('upload', array('upload_path'=>'backups/', 'allowed_types'=>'gz', 'overwrite'=>false));
		if (!$this->upload->do_upload())
			$this->view_data['status'] = $this->upload->display_errors();
		else
			$this->view_data['status'] = 'Upload successful';
        $this->__listBackups();
        $this->index();
    }
}
