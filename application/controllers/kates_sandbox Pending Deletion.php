<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class Kates_sandbox extends CI_Controller
{
    function __construct()
	{
		parent::__construct();      // Call parent constructer
        
        if (!$this->user->is_Admin())
            redirect('../../'); // Home page
        
        // The data to be sent to the view page
        $this->view_data = array(
            'fields' => NULL,     // The pretty names of the fields for the dropdown box
            'users' => NULL,      // Basic information about the volunteers
            'checkboxes' => NULL, // Which checkboxes to tick
            'more' => NULL,       // Details of the checked volunteers
            'filter' => NULL,     // Values for the query form
            'fieldTypes' => NULL, // A mapping from pretty names to their type
            'fieldEnums' => NULL, // The enumeration values for each enumeration table column
            'fieldSets' => NULL   // The set values for each set table column
        );
        
        $this->hardcodeNames = array('ID', 'Title', 'First name', 'Surname', 'Email', 'Registration date');
        
        $this->hardcodes = array(
            (object)array('name'=>'ID',           'tableName'=>'ID',                'fieldType'=>'number'),
            (object)array('name'=>'title',        'tableName'=>'Title',             'fieldType'=>'enum'),
            (object)array('name'=>'firstName',    'tableName'=>'First name',        'fieldType'=>'text'),
            (object)array('name'=>'surname',      'tableName'=>'Surname',           'fieldType'=>'text'),
            (object)array('name'=>'email',        'tableName'=>'Email',             'fieldType'=>'email'),
            (object)array('name'=>'registerDate', 'tableName'=>'Registration date', 'fieldType'=>'date')
        );
        $this->hardcodeEnums = array(
            array('k'=>'Title', 'v'=>'Mr.'),
            array('k'=>'Title', 'v'=>'Mrs.'),
            array('k'=>'Title', 'v'=>'Ms.'),
            array('k'=>'Title', 'v'=>'Miss'),
            array('k'=>'Title', 'v'=>'Dr.')
        );
        
        // Mapping from pretty names to their type
        $this->view_data['fieldTypes'] = array_merge(
            $this->hardcodes,
            $this->db->select('tableName, fieldType')->get_where('fields', array('show'=>'1', 'fieldType !='=>'text'))->result()
        );
        foreach ($this->view_data['fieldTypes'] as $v)
        {
            if ($v->fieldType == 'DropDown')
                $v->fieldType = 'enum';
            elseif ($v->fieldType == 'smallText' || $v->fieldType == 'bigText')
                $v->fieldType = 'text';
        }
        
        // Populate 'fields' with the field pretty names
        $this->view_data['fields'] = array();
        foreach ($this->view_data['fieldTypes'] as $name)
            array_push($this->view_data['fields'], $name->tableName);
        
        // Populate 'users' with the basic information of the volunteers
        $this->view_data['users'] = $this->db->select('ID, firstName, surname, email')->get('volunteersNew');
        
        // Default values for the query form
        //$this->view_data['filter'] = array('field' => 'Disabilities', 'field_type' => 'checkbox', 'value' => '', 'sort' => 'First name', 'order' => 'Ascending', 'values' => array());
        //$this->view_data['filter'] = array('field' => 'Title', 'field_type' => 'enum', 'value' => '', 'sort' => 'First name', 'order' => 'Ascending', 'values' => array());
        $this->view_data['filter'] = array('field' => 'First name', 'field_type' => 'text', 'value' => '', 'sort' => 'First name', 'order' => 'Ascending', 'values' => array());
        
        // The pretty names of the fields that are enums
        $this->view_data['fieldEnums'] = $this->hardcodeEnums;
        foreach ($this->db->select('tableName, options')->get_where('fields', array('fieldType' => 'DropDown', 'show' => '1'))->result() as $enum)
            foreach (explode(',', $enum->options) as $v)
                array_push($this->view_data['fieldEnums'], array('k' => $enum->tableName, 'v' => $v));
        
        // The pretty names of the fields that are sets
        $this->view_data['fieldSets'] = array();
        foreach ($this->db->select('tableName, options')->get_where('fields', array('fieldType' => 'checkbox', 'show' => '1'))->result() as $set)
            foreach (explode(',', $set->options) as $v)
                array_push($this->view_data['fieldSets'], array('k' => $set->tableName, 'v_pretty' => $v, 'v' => rawurlencode($v)));
    }

    function index()
	{
        $this->load->view('kates_menu_sandbox');
        $this->load->view('kates_browse_sandbox', $this->view_data);
    }

    // Filters mailing list entries to be diplayed according to parameters input by admin
    function filter()
    {
        // The list of volunteer IDs matching the criteria specified by the query form
        $IDs = array();
        
        {
            // Save the query values to repopulate the query form
            $this->view_data['filter']['field'] = $_POST['field'];
            if (array_key_exists('value', $_POST))
                $this->view_data['filter']['value'] = $_POST['value'];
            else
            {
                foreach ($_POST as $checkbox => $v)
                {
                    $key = explode('_', $checkbox);
                    if ($key[0] == 'value')
                    {
                        array_push($this->view_data['filter']['values'], rawurldecode($key[1]));
                    }
                }
            }
            $this->view_data['filter']['sort'] = $_POST['sort'];
            $this->view_data['filter']['order'] = $_POST['order'];
            
            // Read database name and type for the given 'field'
            $field = NULL;
            $name = '';
            if (in_array($_POST['field'], $this->hardcodeNames))
            {
                foreach ($this->hardcodes as $f)
                    if ($f->tableName == $_POST['field'])
                    {
                        $field = $f;
                        $name = $f->name;
                        break;
                    }
            }
            else
            {
                $field = $this->db->select('ID, fieldType')->get_where('fields', array('tableName' => $_POST['field']))->row();
                $name = 'field' . $field->ID;
            }
            $this->view_data['filter']['field_type'] = $field->fieldType;
            
            // Read database name for the given 'sort'
            $sort = NULL;
            if (in_array($_POST['sort'], $this->hardcodeNames))
            {
                foreach ($this->hardcodes as $f)
                    if ($f->tableName == $_POST['sort'])
                    {
                        $sort = $f->name;
                        break;
                    }
            }
            else
                $sort = 'field' . $this->db->select('ID')->get_where('fields', array('tableName' => $_POST['sort']))->row()->ID;
    
            
            // Load entries for display
            $this->db->select('ID, firstName, surname, email')->order_by($sort, $_POST['order'] == 'Ascending' ? 'ASC' : 'DESC');
            
            // If no value was given, load all entries
            // Else query for the value(s)
            if ($this->view_data['filter']['value'] || $this->view_data['filter']['values'])
            {
                if ($field->fieldType == 'checkbox')
                {
                    $last = array_pop($this->view_data['filter']['values']);
                    $this->db->where("FIND_IN_SET('{$last}', {$name})>0");
                    foreach ($this->view_data['filter']['values'] as $v)
                        $this->db->or_where("FIND_IN_SET('{$v}', {$name})>0");
                    array_push($this->view_data['filter']['values'], $last);
                }
                elseif ($field->fieldType == 'array')
                    $this->db->where_in($name, $_POST['value']);
                else
                    $this->db->where($name, $_POST['value']);
            }
            
            $this->view_data['users'] = $this->db->get('volunteersNew');
            // Populate $IDs with the found results
            foreach($this->view_data['users']->result() as $row)
                array_push($IDs, $row->ID);
        }

        // Iterate through $_POST data for checkboxes (checkbox_n)
        // Populate 'checkboxes' with only those checkboxes which conform to the query
        $this->view_data['checkboxes'] = array();
        foreach ($_POST as $checkbox => $v)
        {
            $key = explode('_', $checkbox);
            if ($key[0] == 'checkbox' and (empty($IDs) or in_array($key[1], $IDs)))
                array_push($this->view_data['checkboxes'], $key[1]);
        }
        
        // Populate 'more' with volunteer entries given by the checkboxes
        $this->view_data['more'] = array();
        foreach ($this->view_data['checkboxes'] as $id)
            array_push($this->view_data['more'], $this->db->get_where('volunteersNew', array('ID' => $id))->row());

        // If 'See more' clicked, (possibly) open in new window
        if (array_key_exists('SeeMore', $_POST))
        {
            if (!empty($this->view_data['checkboxes']))
			{
				$this->load->view('view_menu');
				$this->load->view('view_browse_database_more', $this->view_data);
			}
            else
                echo '<script>window.close()</script>';
        }
		/*else if (array_key_exists('Email', $_POST))
		{
			
            if (!empty($this->view_data['checkboxes']))
			{
				$this->load->view('view_send_email', $this->view_data);
			}
            else
                echo '<script>window.close()</script>';
        }*/
        else
            $this->index();
    }
}