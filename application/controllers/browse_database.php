<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class Browse_database extends CI_Controller
{
    function __construct()
	{
		parent::__construct();      // Call parent constructer

        // Admin check
        if (!$this->user->is_Admin())
            redirect(''); // Home page

        // Get disallowed fields if applicable
        $this->restricted = false;
        if (!$this->user->get_Permissions()['permissionBrowse'])
        {
            $this->restricted = true;
            $this->restrictions = explode(',', $this->user->get_Restrictions());
            $this->disallowedFields = $this->db->select('ID')->where_in('category', $this->restrictions)->get('fields')->result();
            $this->allowedUsers = $this->user->get_GroupMembers();
            if (empty($this->allowedUsers))
                redirect(''); // Home page
        }
		
        // The data to be sent to the view page
        $this->view_data = array(
            'fields' => NULL,     // The pretty names of the fields for the dropdown box
            'users' => NULL,      // Basic information about the volunteers
            'checkboxes' => NULL, // Which checkboxes to tick
            'more' => NULL,       // Details of the checked volunteers
            'filter' => NULL,     // Values for the query form
            'fieldTypes' => NULL, // A mapping from pretty names to their type
            'fieldEnums' => NULL, // The enumeration values for each enumeration table column
            'fieldSets' => NULL,  // The set values for each set table column
            'fieldsExtra' => NULL,// The extra fields in addition to the hardcoded ones
            'groupData' => NULL,  // The data from the volunteer groups
            'nextGroupID' => NULL,// The next group ID for if a new group is created
            'group' => NULL,      // The group ID that is to be checked by defaults
			'csv' => NULL         // CSV information
        );

        $this->hardcodeNames = array('ID', 'Title', 'First name', 'Surname', 'Email', 'Registration date');

        $this->hardcodes = array(
            (object)array('name'=>'ID',           'tableName'=>'ID',                'fieldType'=>'number'),
            (object)array('name'=>'title',        'tableName'=>'Title',             'fieldType'=>'enum'),
            (object)array('name'=>'firstName',    'tableName'=>'First name',        'fieldType'=>'text'),
            (object)array('name'=>'surname',      'tableName'=>'Surname',           'fieldType'=>'text'),
            (object)array('name'=>'email',        'tableName'=>'Email',             'fieldType'=>'email'),
            (object)array('name'=>'registerDate', 'tableName'=>'Registration date', 'fieldType'=>'date'),
            (object)array('name'=>'lastLogIn',    'tableName'=>'Last log in',       'fieldType'=>'date')
        );
        $this->hardcodeEnums = array(
            array('k'=>'Title', 'v'=>'Mr.'),
            array('k'=>'Title', 'v'=>'Mrs.'),
            array('k'=>'Title', 'v'=>'Ms.'),
            array('k'=>'Title', 'v'=>'Miss'),
            array('k'=>'Title', 'v'=>'Dr.')
        );

        // Mapping from pretty names to their type
        if ($this->restricted)
            $this->db->where_not_in('category', $this->restrictions);
        $this->view_data['fieldTypes'] = array_merge(
            $this->hardcodes,
            $this->db->select('tableName, fieldType')->get_where('fields', array('show'=>'1', 'fieldType !='=>'text'))->result()
        );
        foreach ($this->view_data['fieldTypes'] as $v)
            $this->__translateFieldType($v);

        // Populate 'fields' with the field pretty names
        $this->view_data['fields'] = array();
        foreach ($this->view_data['fieldTypes'] as $name)
            array_push($this->view_data['fields'], $name->tableName);

        // Populate 'users' with the basic information of the volunteers
        if ($this->restricted)
            $this->db->where_in('email', $this->allowedUsers);
        $this->view_data['users'] = $this->db->select('ID, firstName, surname, email')->get('volunteersNew')->result();

        // Default values for the query form
        $this->view_data['filter'] = array(
            'fields' => array(array(
                'field'      => 'First name',
                'field_type' => 'text',
                'value'      => ''
            )),
            'sort'   => 'First name',
            'order'  => 'Ascending',
            'values' => array()
        );

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

        // Group data for adding volunteers to groups
        $this->view_data['groupData'] = $this->db->get('groups')->result();
        $this->view_data['nextGroupID'] = $this->db->select("AUTO_INCREMENT")->get_where("information_schema.tables", array("table_name" => "groups"))->result()[0]->AUTO_INCREMENT;

        $this->view_data['fieldsExtra'] = array();
        
        // Generate the CSV file for the volunteers table
        $uglyFields = $this->db->list_fields('volunteersNew');
        $prettyFields = array();
        foreach ($this->view_data['fields'] as $v)
            array_push($prettyFields, str_replace(' ', '', $v));
        for ($i = 0; $i < count($uglyFields); ++$i)
            $this->db->select("{$uglyFields[$i]} as `{$prettyFields[$i]}`");
		$this->load->dbutil();
		$this->view_data['csv'] = $this->dbutil->csv_from_result($this->db->get('volunteersNew'));
    }
    
    function __translateFieldType($v)
    {
        if ($v->fieldType == 'DropDown')
            $v->fieldType = 'enum';
        elseif ($v->fieldType == 'smallText')
            $v->fieldType = 'text';
        elseif ($v->fieldType == 'bigText')
            $v->fieldType = 'array';
    }

    function index()
	{
        if (isset($_GET['group']))
            $this->view_data['group'] = $_GET['group'];
        $this->load->view('view_menu');
        $this->load->view('view_browse_database', $this->view_data);
    }

    // Filters mailing list entries to be diplayed according to parameters input by admin
    function filter()
    {
        // Sanity check
        if (empty($_POST))
        {
            $this->index();
            return;
        }

        {
            // This will contain the query form values to repopulate the query form
            $this->view_data['filter']['fields'] = array();

            // I'm just gonna build the god damn string from scratch
            $conjunction = 0; // Is set after first loop, when set, writes AND between select conditions
            $SQL = ''; // The query that will eventually be executed (if not null)
            $where = array(); // The where conditions that will be executed with the above
            $like = array(); // The like conditions that will be executed with the above
            $fieldsShown = array(); // The names (fieldxx) of the columns to be displayed

            // Iterate through the rows of criteria
            foreach ($_POST as $field => $v)
            {
                $key = explode('_', $field);
                if ($key[0] == 'field')
                {
                    // Add to table columns displayed
                    if (!in_array($v, array('First name', 'Surname', 'Email')))
                        array_push($this->view_data['fieldsExtra'], $v);

                    // Field name
                    $field_entry = array('field' => $v);

                    // Field value
                    // If not checkbox, add to field_entry as normal
                    if (array_key_exists("value_{$key[1]}", $_POST))
                        $field_entry['value'] = $_POST["value_{$key[1]}"];
                    // If checkbox, iterate through checkboxes, add to field_entry all the relevant checkboxes
                    else
                    {
                        $field_entry['values'] = array();
                        foreach ($_POST as $checkbox => $v)
                        {
                            $check_key = explode('_', $checkbox);
                            $check_key[2] = implode('.', array_slice($check_key, 2)); // This undoes the obscure '.'->'_' conversion done by PHP
                            if ($check_key[0] == "value" && $check_key[1] == $key[1])
                                array_push($field_entry['values'], rawurldecode($check_key[2]));
                        }
                    }

                    // Read database name and type for the given 'field'
                    $name = '';
                    if (in_array($field_entry['field'], $this->hardcodeNames))
                    {
                        foreach ($this->hardcodes as $field)
                            if ($field->tableName == $field_entry['field'])
                            {
                                $field_entry['field_type'] = $field->fieldType;
                                $name = $field->name;
                                break;
                            }
                    }
                    else
                    {
                        if ($this->restricted)
                            $this->db->where_not_in('category', $this->restrictions);

                        $field = $this->db->select('ID, fieldType')->get_where('fields', array('tableName' => $field_entry['field']))->row();
                        $this->__translateFieldType($field);
                        $field_entry['field_type'] = $field->fieldType;
                        $name = "field{$field->ID}";
                    }

                    array_push($fieldsShown, $name);
                    array_push($this->view_data['filter']['fields'], $field_entry);


                    // Add to SQL string
                    if (array_key_exists('value', $field_entry) && $field_entry['value'] || array_key_exists('values', $field_entry) && $field_entry['values'])
                    {
                        if ($field->fieldType == 'checkbox')
                        {
                            // This has to be done with the special mysql function find_in_set, which isn't supported by codeigniter
                            if ($conjunction)
                                $SQL .= ' AND ';
                            else
                                $conjunction = 1;
                            $last = array_pop($field_entry['values']);
                            $SQL .= "(FIND_IN_SET({$this->db->escape($last)}, {$this->db->escape_str($name)})>0";
                            foreach ($field_entry['values'] as $v)
                                $SQL .= " OR FIND_IN_SET({$this->db->escape($v)}, {$this->db->escape_str($name)})>0";
                            $SQL .= ')';
                            array_push($field_entry['values'], $last);
                        }
                        elseif ($field->fieldType == 'array')
                            $like[$name] = $field_entry['value'];
                        else
                            $where[$name] = $field_entry['value'];
                    }
                }
            }

            $this->view_data['filter']['sort'] = $_POST['sort'];
            $this->view_data['filter']['order'] = $_POST['order'];

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
            {
                if ($this->restricted)
                    $this->db->where_not_in('category', $this->restrictions);
                $sort = 'field' . $this->db->select('ID')->get_where('fields', array('tableName' => $_POST['sort']))->row()->ID;
            }

            // Load entries for display
            foreach ($fieldsShown as $field)
                $this->db->select($field);
            $this->db->select('ID, firstName, surname, email')->order_by($sort, $_POST['order'] == 'Ascending' ? 'ASC' : 'DESC');
            if ($SQL)
                $this->db->where($SQL);
            if ($where)
                $this->db->where($where);
            if ($like)
                $this->db->like($like);

            if ($this->restricted)
                $this->db->where_in('email', $this->allowedUsers);
            $this->view_data['users'] = $this->db->get('volunteersNew')->result();
        }


        // Iterate through $_POST data for checkboxes (checkbox_n)
        // Populate 'checkboxes' with only those checkboxes which conform to the query
        $IDs = array();
        foreach($this->view_data['users'] as $row)
            array_push($IDs, $row->ID);
        $this->view_data['checkboxes'] = array();
        foreach ($_POST as $checkbox => $v)
        {
            $key = explode('_', $checkbox);
            if ($key[0] == 'selectAll' and (empty($IDs) or in_array($key[1], $IDs)))
                array_push($this->view_data['checkboxes'], $key[1]);
        }

        // Populate 'more' with volunteer entries given by the checkboxes
        $this->view_data['more'] = array();
        $fieldMask = array();
        foreach ($this->db->select('ID')->get_where('fields', array('show'=>'1', 'fieldType !='=>'text'))->result() as $v)
            array_push($fieldMask, $v->ID);
        foreach ($this->view_data['checkboxes'] as $id)
        {
            if ($this->restricted)
            {
                $this->db->select('ID, title, firstName, surname, email, registerDate');
                foreach ($fieldMask as $v)
                    if (!in_array($v, $this->disallowedFields))
                        $this->db->select('field'.$v);
            }
            if ($this->restricted)
                $this->db->where_in('email', $this->allowedUsers);
            array_push($this->view_data['more'], $this->db->get_where('volunteersNew', array('ID' => $id))->row());
        }
		
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
        else
            $this->index();
    }
}