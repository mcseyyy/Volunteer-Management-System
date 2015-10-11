<html>
<head>
 <link rel=stylesheet href=/styles/user_management.css>
 <link rel=stylesheet href=/styles/jquery.qtip.min.css>
 <script src="/scripts/jquery-1.10.2.js"></script>
 <script src=/scripts/jquery.qtip.min.js></script>
 <script src="/scripts/user_management.js"></script>
 <script src=/scripts/browse_database.js></script>
 <script src=/scripts/jquery.tablesorter.js></script>
 <title> User Management </title>
</head>
<?php
	$helpFile = FCPATH."application/views/helpfiles/help_user_management.txt";
	$hf = fopen($helpFile, 'rb');
	$helptext = fread($hf,filesize($helpFile));
	fclose($hf);	
?>

<div id="band">
	<div id=helpManagement ></div>
</div>
<div id=wrapper>
    <?php 
		if(isset($link))
		{
			echo("
				<a href='".$link."' id=emailEvent style='display:none'>asd</a>
			");
		}
	?>
	<div class="headerBox"><h1 id=h1>User Management</h1>
		<?php if(isset($response)) echo "<p id='alert'>". $response . "</p><br>"; ?>
		<button class="butSave" id="volunteerButton" type="button" >Add volunteer</button>
		<button class="butSave" id="adminButton" type="button" >Add admin</button>
		<button class="butSave" id="adminListButton" type="button" >Show admins</button>
		<button class="butSave" id="pendingButton" type="button" >Pending</button>
	</div>
	
    <form id="volunteerForm" method="post" action="../../user_management/user_submit">
		<div class="input">
			<span>E-mail</span>
			<input type="text" id="input1" class="someTextShouldGoHereInputTypeInput" name="volunteer_email">
		</div>
	<input class=butSave value="Submit" type="submit" id="volunteer_submit" name="submit">
		
	</form>
	
	<form id="adminForm" method="post" action="../../user_management/admin_submit">
		<div class="input">
			<span>E-mail</span>
			<input type="text" class="someTextShouldGoHereInputTypeInput" name="admin_email">
		</div>
		<div class="input">
			<span>First Name</span>
			<input type="text" class="someTextShouldGoHereInputTypeInput" name="first_name">
		</div>
		<div class="input">
			<span>Surname Name</span>
			<input type="text" class="someTextShouldGoHereInputTypeInput" name="surname">
		</div>
		<input type="checkbox" id="checkBoxThing1" name="permissionBrowse"> 
		<label id="chkbxLabel1">Access to all volunteer information</label> <br>
		<input type="checkbox" id="checkBoxThing2" name="permissionAdd"> 
		<label id="chkbxLabel2">Website management permission</label><br>
		<input class=butSave value="Submit" type="submit" id="login_submit" name="submit">
	</form>
	
	<table class=table id="adminTable">
    <thead>
	<tr>
		<th class=adminTh>Name</th>
		<th class=adminTh>Surname</th>
		<th class=adminTh>Email</th>
		<th class=adminTh>Full volunteer access</th>
		<th class=adminTh>Management permission</th>
		<th class=adminTh>Group permissions</th>
		<th class=adminTh id='del'>DELETE</th>
	</tr>
    </thead>
    <tbody>
	<?php
		foreach( $data as $row) 
		{
			echo "<tr>\n";
			echo "<td>".$row->first_name."</td>\n";
			echo "<td>".$row->surname."</td>\n";
			echo "<td>".$row->username."</td>\n";
			if($row->permissionBrowse == 1)
				echo "<td><a href='../../user_management/removeAccess?ID=".$row->ID."'>Yes</a></td>\n";
			else echo "<td><a href='../../user_management/addAccess?ID=".$row->ID."'>No</a></td>\n";
			if($row->permissionAdd == 1)
				echo "<td><a href='../../user_management/removeAddPermission?ID=".$row->ID."'>Yes</a></td>\n";
			else echo "<td><a href='../../user_management/addAddPermission?ID=".$row->ID."'>No</a></td>\n";
			if($row->permissionBrowse == 1)
				echo "<td>Full access</td>\n";
			else
				echo "<td><a href='../../user_management/editGroupPermissions?ID=".$row->ID."'>Edit</a></td>\n";
			echo "<td class=delete><a href='../../user_management/deleteUser?ID=".$row->ID."' style=color:#FFFFFF>Delete</a></td>\n";
				
			echo '</tr>';
		}
	?>
    </tbody>
	</table>
	
	<table class=table id="pendingRegistrations">
		<thead>
			<th class=pendingTh>Email</th>
			<th class=pendingTh>Date</th>
			<th class=pendingTh>Type</th>
			<th class=pendingTh id=del>Resend</th>
			<th class=pendingTh id=del>Delete</th>
		</thead>
		<tbody><?php
			foreach ($pendingRegistrations as $pending)
			{
				echo "<tr>";
				echo "<td>".$pending->email."</td>\n"; //email
				$regLink='"../../registrationNew?unique='.$pending->url.'"';
				//echo "<td><a href=".$regLink.">".$pending->url."</a></td>\n"; //registration link
				echo "<td>".$pending->dateAdded."</td>\n";
				if ($pending->admin==0)
				{
					echo "<td>Volunteer</td>\n";
					echo "<td><a href='mailto:".$pending->email."?body=".base_url('/registrationNew/index?unique=').$pending->url."'>Resend</a></td>\n";
				}
				else
				{
					echo "<td>Admin</td>\n";
					echo "<td><a href='mailto:".$pending->email."?body=".base_url('/registrationNew/admin?unique=').$pending->url."'>Resend</a></td>\n";
				}
				
				$deleteLink='"../../user_management/deleteReg?unique='.$pending->url.'"'; //delete link
				echo "<td class=deleteReg><a href=".$deleteLink." style=color:#FFFFFF>Delete</a></td>\n";
				echo "</tr>";
			}
		?></tbody>
	</table>
</div>

<script>
    $(document).ready(function(){
		<?php 
			if(isset($link))
			{
				echo('$( "#emailEvent" )[0].click();');
			}
		?>
        $("#adminTable").tablesorter({headers: {7: {sorter: false}}});
        $("#pendingRegistrations").tablesorter({headers: {4: {sorter: false},3: {sorter: false}}});
        
        var $widths = allignTable('adminTable');
        var $widths2 = allignTable('pendingRegistrations');
        for (var i=0; i<32; i++)
        {
            $('.pendingTh').eq(i).css('min-width', $widths2[i]-10);
            $('.pendingTh').eq(i).css('max-width', $widths2[i]-10);
            $('.adminTh').eq(i).css('min-width', $widths[i]-10);
            $('.adminTh').eq(i).css('max-width', $widths[i]-10);
        }
        $('#pendingRegistrations').hide();
		<?php
		if(isset($_GET['pending']))
		{
			echo '$("#adminTable").hide();';
			echo '$("#pendingRegistrations").show();';
		}
		?>
		
    });
    
    $(window).resize(function(){
        $hidden = $("table:hidden");
        $hidden.show();
        
        var $widths = allignTable('adminTable');
        var $widths2 = allignTable('pendingRegistrations');
        for (var i=0; i<32; i++)
        {
            $('.adminTh').eq(i).css('min-width', $widths[i]-10);
            $('.adminTh').eq(i).css('max-width', $widths[i]-10);
            $('.pendingTh').eq(i).css('min-width', $widths2[i]-10);
            $('.pendingTh').eq(i).css('max-width', $widths2[i]-10);
        }
        
        $hidden.hide();
    });
    
    $('.delete').click(function(e)
    {
        var c = confirm("Are you sure you want to delete this user?");
        
        if (c==false)
            e.preventDefault();
    });
    
    $('.deleteReg').click(function(e)
    {
        var c = confirm("Are you sure you want to delete this entry?");
        
        if (c==false)
            e.preventDefault();
    });
</script>

</html>