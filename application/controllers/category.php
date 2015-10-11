<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Category extends CI_Controller
{
	public function index()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
		
		$this->load->view('view_menu');
		//get all categories in the correct order
		$data = array('data' => $this->db->query("SELECT * FROM `categories` ORDER BY `order` ASC")->result());
		$this->load->view('view_category', $data);
	    
	}

	//function that adds a new category to the database
	public function submitAdd()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
		if (!$_POST)
			redirect('');
			
		$this->load->dbforge();		
		//find first available position
		$lastOrder=$this->db->query("SELECT `order` FROM `categories` ORDER BY `order` DESC LIMIT 1;")->row();
		$lastOrder=$lastOrder->order+1;
		$data=array(
			'name'=>$_POST['catName'],
			'order'=>$lastOrder);
		//add category to the table
		$this->db->insert('categories',$data);

		$this->db->select('ID'); //get the index
		$index=$this->db->get_where('categories',array('name'=> $_POST['catName']))->row();

		//ChangeLog
		$this->mysql->changelog("Add new category: [".$_POST['catName']."]");

		$tableID=$index->ID;

		redirect("category/edit?category=$tableID");
	}

	//function that loads the view for a category; the page will contain all the fields within that category
	public function edit()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');

		$this->load->view('view_menu');
		//get name
		$table = $this->db->query ("SELECT `name` FROM `categories` WHERE `ID` = ".$_GET['category']." LIMIT 1")->row();
		//get fields
		$query = $this->db->query("SELECT * FROM `fields` WHERE `category` = ".$_GET['category']." ORDER BY `order` ASC");
		//get all categories
		$categories=$this->db->query("SELECT name FROM categories ORDER BY `order` ASC")->result();
		$table=array('fields'=>$query->result_array(),
				'tableName'=>$table->name,
				'categories'=>$categories);
		$this->load->view('view_categoryEdit',$table);
}

	//function that moves a field from a category to another
	public function moveTo()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
		//get category details
		$fields=$this->db->query("SELECT `ID`, `category`, `name` FROM fields WHERE category=".$_GET['category'])->result();
		foreach($fields as $field)
		{
			$targetCategory=$this->db->query("SELECT ID from categories WHERE name='".$_POST[$field->ID]."' LIMIT 1")->row();
			$targetCategory=$targetCategory->ID;

			if ($targetCategory!=$field->category)
			{
				//get the current order of the filed in its old category
				$currentOrder=$this->db->query("SELECT `order` FROM fields WHERE ID=".$field->ID." LIMIT 1")->row();
				$currentOrder=$currentOrder->order;

				//get the order of the last element in the target category; and increment it
				$maxOrder=$this->db->query("SELECT `order` FROM fields WHERE category=".$targetCategory." ORDER BY `order` DESC LIMIT 1")->row();
				$maxOrder=$maxOrder->order+1;

				//move the fields from the previous category up
				$this->db->query("UPDATE `fields` SET `order`= `order` - 1 WHERE `category`=".$_GET['category']." AND `order` > ".$currentOrder);

				//change the category of the field
				$this->db->query("UPDATE fields SET `category`='".$targetCategory."', `order`='".$maxOrder."' WHERE ID=".$field->ID);

				//ChangeLog
				$initialCategory=$this->db->query("SELECT name FROM categories WHERE ID=".$_GET['category']." LIMIT 1")->row();
				$initialCategory=$initialCategory->name;
				$this->mysql->changelog("Move field: [".$field->name."] from [".$initialCategory."] to [".$_POST[$field->ID]."]");
			}
		}
	}

	//delete a category
	public function deleteCategory()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
	
		$id=$_GET['category'];
		$admins=$this->db->query("SELECT username,restrictions FROM webUsers WHERE admin=1")->result();
		foreach ($admins as $admin)
		{
			$access=array_filter(explode(',',$admin->restrictions));
			if (array_search($id,$access)!=FALSE)
			{
				unset($access[array_search($id,$access)]);
				$access=implode(',',$access);
				$this->db->query("UPDATE webUsers SET restrictions='".$access."'WHERE username='".$admin->username."'");
			}
		}
		$categoryName=$this->db->query("SELECT name FROM categories WHERE ID=".$id." LIMIT 1")->row()->name;

		$order=$this->db->query ("SELECT `order` FROM `categories` WHERE `ID` = ".$id)->row();
		$this->db->query("UPDATE `categories` SET `order`= `order` - 1 WHERE `order` > ".$order->order);
		$this->db->query("DELETE FROM categories WHERE ID = ".$id);
		$fields=$this->db->query("SELECT ID, fieldType FROM fields WHERE category=".$id)->result_array();
		foreach ($fields as $field)
			if ($field['fieldType']!='text')
				$this->db->query("ALTER TABLE `volunteersNew` DROP COLUMN field".$field['ID']);
		$this->db->query("DELETE FROM fields WHERE category = ".$id);

		//ChangeLog
		$this->mysql->changelog("Delete category [".$categoryName."]");

		redirect('category/index');
	}

	//Move a category up in the registration form
	public function upCategory()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
			
		$id=$_GET['category'];
		$cat=$this->db->query ("SELECT `order`, `name` FROM `categories` WHERE `ID` = ".$id)->row();
		$name=$cat->name;
		$order=$cat->order;
		if ($order>1)
		{
			$order=$order-1;
			$this->db->query("UPDATE `categories` SET `order`=`order`+1 WHERE `order`=".$order);

			$this->db->query("UPDATE `categories` SET `order`=`order`-1 WHERE `ID`=".$id);
		}
		//ChangeLog
		$this->mysql->changelog("Category [".$name."] moved up in reg form");

		redirect('category/index');
	}

	//Move a category down in the registration form
	public function downCategory()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
			
		$id=$_GET['category'];
		$cat=$this->db->query ("SELECT `order`, `name` FROM `categories` WHERE `ID` = ".$id)->row();
		$name=$cat->name;
		$order=$cat->order;
		$largestOrder = $this->db->query("SELECT `order` FROM `categories` ORDER BY `order` DESC LIMIT 1;")->row()->order;
		if ($order<$largestOrder)
		{
			$order=$order+1;
			$this->db->query("UPDATE `categories` SET `order`=`order`-1 WHERE `order`=".$order);
			$this->db->query("UPDATE `categories` SET `order`=`order`+1 WHERE `ID`=".$id);
		}
		//Changelog
		$this->mysql->changelog("Category [".$name."] moved up in reg form");

		redirect('category/index');
	}

	//function that adds a new field in the database
	public function submitField()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');	
	
		$this->load->model("mysql");
		$this->load->dbforge();
		if (!$_POST)
			redirect('');

		if ($_POST['fieldType'] == "Dropdown Menu")
			$fieldType = 'DropDown';
		else if ($_POST['fieldType'] == "Small Text Box")
			$fieldType = 'smallText';
		else if ($_POST['fieldType'] == "Big Text Box")
			$fieldType = 'bigText';
		else if ($_POST['fieldType'] == "Text")
			$fieldType = 'text';
		else if ($_POST['fieldType'] == "Checkbox")
			$fieldType = 'checkbox';
		else if ($_POST['fieldType'] == "Date")
			$fieldType = 'date';
		$minLength=0;
		$maxLength=400;
		$required=false;
		$options="";
		if ($fieldType == 'DropDown')
		{
			$name=$_POST['dropdownname'];
			$options=$_POST['dropdownoptions'];
		}
		else if ($fieldType == 'smallText')
		{
			$name=$_POST['smalltextname'];
			$required=($_POST['smalltextrequired']=='Yes');
			$minLength=$_POST['smalltextminLength'];
			$maxLength=$_POST['smalltextmaxLength'];
			$options=$_POST['smalltextoptions'];
		}
		else if ($fieldType == 'bigText')
		{
			$name=$_POST['bigtextname'];
			$required=($_POST['bigtextrequired']=='Yes');
			$minLength=$_POST['bigtextminLength'];
			$maxLength=$_POST['bigtextmaxLength'];
			$options=$_POST['bigtextoptions'];
		}
		else if ($fieldType == 'text')
		{
			$name=$_POST['textname'];
			$options=$_POST['textSize'];
		}
		else if ($fieldType == 'date')
		{
			$name=$_POST['datename'];
			$required=($_POST['daterequired']=='Yes');
		}
		else if ($fieldType == 'checkbox')
		{
			$name=$_POST['checkboxname'];
			$options=$_POST['checkboxoptions'];
		}
		$category = $_GET['cat'];
		$data = array('name' => $name,
			'tableName' => $_POST['tableName'],
			'fieldType' => $fieldType,
			'required' => $required,
			'minLength' => $minLength,
			'maxLength' => $maxLength,
			'options' => $options,
			'category' => $category);
		if ($fieldType == 'DropDown')
		{
			$values=str_replace(",", "','", $options);
			$type = "ENUM('".$values."')";
		}
		else if ($fieldType == 'checkbox')
		{
			$values=str_replace(",", "','", $options);
			$type = "SET('".$values."')";
		}
		else $type = 'TEXT';
		$lastOrder=$this->db->query("SELECT `order` FROM `fields` WHERE `category` = ".$_GET['cat']." ORDER BY `order` DESC LIMIT 1")->row();
		$data['order']=$lastOrder->order+1;

		$this->db->insert('fields',$data);
		$lastID = $this->db->query("SELECT ID FROM fields ORDER BY ID DESC LIMIT 1;")->row();
		$lastID = $lastID->ID;
		if ($fieldType!='text')
			$this->db->query("ALTER TABLE volunteersNew ADD field".$lastID." ".$type);

		//Changelog
		$this->mysql->changelog("Field [".$_POST['tableNmae']."] edited");
		redirect('category/edit?category='.$category);
	}

	//function to make a category show on the registration form
	public function showCategory()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
			
		$id=$_GET['category'];
		$this->db->query("UPDATE  `categories` SET  `show` =  '1' WHERE  `categories`.`ID` =".$id." LIMIT 1");
		//ChangeLog
		$name=$this->db->query("SELECT name FROM categories WHERE ID=".$id." LIMIT 1")->row()->name;
		$this->mysql->changelog("Category [".$name."] shown.");

		redirect('category/index');
	}

	//function to make a category hide from the registration form
	public function hideCategory()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
			
		$id=$_GET['category'];
		$this->db->query("UPDATE  `categories` SET  `show` =  '0' WHERE  `categories`.`ID` =".$id." LIMIT 1");
		//ChangeLog
		$name=$this->db->query("SELECT name FROM categories WHERE ID=".$id." LIMIT 1")->row();
		$name=$name->name;
		
		//ChangeLog
		$this->mysql->changelog("Category [".$name."] hidden.");

		redirect('category/index');
	}

	//function that makes a field visible on the registration form
	public function showField()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
			
		$id=$_GET['field'];
		$this->db->query("UPDATE  `fields` SET  `show` =  '1' WHERE  `fields`.`ID` =".$id." LIMIT 1");
		//ChangeLog
		$name=$this->db->query("SELECT name from fields WHERE ID=".$id." LIMIT 1")->row->name;
		$this->mysql->changelog("Field [".$name."] shown.");

		redirect('category/edit?category='.$_GET['category']);
	}

	//function that hides a field from the registration form
	public function hideField()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
			
		$id=$_GET['field'];
		$this->db->query("UPDATE  `fields` SET  `show` =  '0' WHERE  `fields`.`ID` =".$id." LIMIT 1");
		//ChangeLog
		$name=$this->db->query("SELECT name from fields WHERE ID=".$id." LIMIT 1")->row->name;
		$this->mysql->changelog("Field [".$name."] hidden.");
		
		redirect('category/edit?category='.$_GET['category']);
	}
	
	//function that completly deletes a field from the registration form
	public function deleteField()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
			
		$id=$_GET['field'];
		$field=$this->db->query ("SELECT `order`,`name` FROM `fields` WHERE `ID` = ".$id)->row();
		$name=$field->name;
		$order=$field->order;
		
		//update the order of the other fields
		$this->db->query("UPDATE `fields` SET `order`= `order` - 1 WHERE `category`=".$_GET['category']." AND `order` > ".$order);
		//delete the field from FIELDS table
		$this->db->query("DELETE FROM `fields` WHERE `fields`.`ID` = ".$id);
		//delete the column from volunteersNew table
		$this->db->query("ALTER TABLE `volunteersNew` DROP COLUMN field".$id);
		
		//ChangeLog
		$this->mysql->changelog("Field [".$name."] deleted.");
		
		redirect('category/edit?category='.$_GET['category']);
	}

	//move up a field in the registration form
	public function upField()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
			
		$cat=$_GET['category'];
		$field=$_GET['field'];
		$data=$this->db->query ("SELECT `order`,`name` FROM `fields` WHERE `ID` = ".$field)->row();
		$order=$data->order;
		$name=$data->name;
		if ($order>0)
		{
			$order=$order-1;
			$this->db->query("UPDATE `fields` SET `order`=`order`+1 WHERE `order`=".$order." AND `category`=".$cat);

			$this->db->query("UPDATE `fields` SET `order`=`order`-1 WHERE `ID`=".$field." AND `category`=".$cat);
		}
		//ChangeLog
		$this->mysql->changelog("Field [".$name."] moved up in the reg form.");
		redirect('category/edit?category='.$cat);
	}

	//move down a field in the registration form
	public function downField()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
	
		$cat=$_GET['category'];
		$field=$_GET['field'];
		$data=$this->db->query ("SELECT `order`, `name` FROM `fields` WHERE `ID` = ".$field)->row();
		$order=$data->order;
		$name=$data->name;
		$largestOrder = $this->db->query("SELECT `order` FROM `fields` WHERE `category`=".$cat." ORDER BY `order` DESC LIMIT 1;")->row()->order;
		if ($order<$largestOrder)
		{
			$order=$order+1;
			$this->db->query("UPDATE `fields` SET `order`=`order`-1 WHERE `order`=".$order." AND `category`=".$cat);
			$this->db->query("UPDATE `fields` SET `order`=`order`+1 WHERE `ID`=".$field." AND `category`=".$cat);
		}
		//ChangeLog
		$this->mysql->changelog("Field [".$name."] moved up in the reg form.");
		redirect('category/edit?category='.$cat);		
	}

	//function that loads the page for editing a field
	public function fieldEdit()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
			
		$id=$_GET['field'];
		$field=$this->db->query("SELECT * FROM fields WHERE ID = ".$id." LIMIT 1")->row_array();
		$this->load->view('view_menu');
		$this->load->view("view_fieldEdit",$field);
	}

	//save the changes for a field
	public function fieldEditSubmit()
	{
		if (!$this->user->get_Permissions()['permissionAdd'])
			redirect ('');
			
		$id=$_GET['field'];
		$field=$this->db->query("SELECT fieldType, category FROM fields WHERE ID=".$id." LIMIT 1")->row_array();
		$type=$field['fieldType'];
		$category=$field['category'];
		if ($type=='smallText')
		{
			$data['tableName']=$_POST['tableName'];
			$data['name']=$_POST['smalltextname'];
			if ($_POST['smalltextrequired']=='Yes')
				$data['required']=1;
			else
				$data['required']=0;
			$data['minLength']=$_POST['smalltextminLength'];
			$data['maxLength']=$_POST['smalltextmaxLength'];
			$data['options']=$_POST['smalltextoptions'];
		}

		else if ($type=='bigText')
		{
			$data['tableName']=$_POST['tableName'];
			$data['name']=$_POST['bigtextname'];
			if ($_POST['bigtextrequired']=='Yes')
				$data['required']=1;
			else
				$data['required']=0;
			$data['minLength']=$_POST['bigtextminLength'];
			$data['maxLength']=$_POST['bigtextmaxLength'];
			$data['options']=$_POST['bigtextoptions'];
		}

		else if ($type=='DropDown')
		{
			$data['tableName']=$_POST['tableName'];
			$data['name']=$_POST['dropdownname'];
			$data['options']=$_POST['dropdownoptions'];
		}
		else if ($type=='text')
		{
			$data['name']=$_POST['textname'];
			$data['options']=$_POST['textSize'];
		}
		else if ($type=='checkbox')
		{
			$data['tableName']=$_POST['tableName'];
			$data['options']=$_POST['checkboxoptions'];
			$data['name']=$_POST['checkboxname'];
		}
		else if ($type=='date')
		{
			$data['tableName']=$_POST['tableName'];
			$data['name']=$_POST['datename'];
			if ($_POST['daterequired']=='Yes')
				$data['required']=1;
			else
				$data['required']=0;
		}
		$this->db->where('ID',$id);
		$this->db->update('fields',$data);
		
		//ChangeLog
		$this->mysql->changelog("Field [".$_POST['tableName']."] edited");
		redirect('category/edit?category='.$category);
	}
}
