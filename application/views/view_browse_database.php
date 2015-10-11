<?php
if (empty($users)):
    echo '<script>alert("No results found");history.back();</script>';
else:
?>

<html>
<head>
 <link rel=stylesheet href=/styles/browse_database.css> 
 <link rel=stylesheet href=/styles/jquery.qtip.min.css>
 <script src=/scripts/jquery-latest.js></script>
 <script src=/scripts/jquery.qtip.min.js></script>
 <script src=/scripts/browse_database.js></script>
 <script src=/scripts/jquery.tablesorter.js></script>
 <script src=/scripts/jquery-ui.js></script>
 <title> Browse Database </title>
</head>

<script>
<?php
    foreach ($fieldTypes as $field)
        echo "AddToFieldTypes('" . addslashes($field->tableName) . "', '" . addslashes($field->fieldType) . "');\n";
    foreach ($fieldEnums as $enum)
        echo "AddEnum('" . addslashes($enum['k']) . "', '" . addslashes($enum['v']) . "');\n";
    foreach ($fieldSets as $set)
        echo "AddSet('" . addslashes($set['k']) . "', '" . addslashes($set['v']) . "', '" . addslashes($set['v_pretty']) . "');\n";
    echo "var nextGroupID = $nextGroupID;\n";
    if ($this->user->get_Permissions()['permissionBrowse']):
?>
function exportCSV(csv)
{	
	csv=csv.replace(/ /g,'%20');
	var link         = document.createElement('a');
	link.href        = 'data:attachment/csv,' + csv;
	link.target      = '_blank';
	link.download    = 'volunteers.csv';
	document.body.appendChild(link);
	link.click();
}
<?php
endif;
?>
</script>

<div class="container">
    <?php
        if (count($filter['fields']) >= 2)
            echo '<div id=band style=height:240px>';
        else
            echo '<div id=band>';
		echo '<div id=help class=tooltip"></div></div>';
    ?>

    <span id=wrapper><form method=post id=form1 action=filter>

    <table class=table>
        <tr><td colspan=5><h1 id=h1>Mailing List Browser</h1></td></tr>
        <tr>
            <td><table>
                <tr id=blockrow1>
                    <td>Sort by</td>
                    <td>
                        <select name=sort>
                            <?php
                                foreach ($fields as $field)
                                {
                                    if ($field == $filter['sort'])
                                        echo "<option selected>$field</option>";
                                    else
                                        echo "<option>$field</option>";
                                }
                            ?>
                        </select>
                    </td>

                    <td>Order</td>
                    <td>
                        <select name=order>
                            <?php
                                if ($filter['order'] == 'Ascending')
                                    echo '<option selected>Ascending</option><option>Descending</option>';
                                else
                                    echo '<option>Ascending</option><option selected>Descending</option>';
                            ?>
                        </select>
                    </td>
                </tr>
                
                <?php
                    if (count($filter['fields']) >= 2)
                        echo '<tbody id=criterions style=height:100px>';
                    else
                        echo '<tbody id=criterions>';
                    $i = 0;
                    $n = count($filter['fields'])-1;
                    foreach ($filter['fields'] as $field_entry):
                        if ($i == $n)
                            echo '<tr id=lastFieldRow>';
                        else
                            echo '<tr>';
                ?>
                    <td>Criteria</td>
                    <td>
                        <?php
                            if ($field_entry['field_type'] == 'enum')
                                echo "<select id=field_$i name=field_$i onchange=SetValueInput(this.value,this.id,'select');>";
                            elseif ($field_entry['field_type'] == 'checkbox')
                                echo "<select id=field_$i name=field_$i onchange=SetValueInput(this.value,this.id,'checkbox');>";
                            else
                                echo "<select id=field_$i name=field_$i onchange=SetValueInput(this.value,this.id,'input');>";
                            foreach ($fields as $field)
                            {
                                if ($field == $field_entry['field'])
                                    echo "<option selected>$field</option>";
                                else
                                    echo "<option>$field</option>";
                            }
                        ?>
                        </select>
                    </td>
                    <td>Value</td>
                    <td>
                    <?php
                        if ($field_entry['field_type'] == 'enum')
                        {
                            echo "<select id=value_$i name=value_$i>";
                            foreach ($fieldEnums as $enum)
                            {
                                if ($enum['k'] == $field_entry['field'])
                                {
                                    if ($enum['v'] == $field_entry['value'])
                                        echo "<option selected>{$enum['v']}</option>";
                                    else
                                        echo "<option>{$enum['v']}</option>";
                                }
                            }
                            echo "</select>";
                        }
                        elseif ($field_entry['field_type'] == 'checkbox')
                        {
                            echo "<div class=chkbxs><table id=value_$i>";
                            foreach ($fieldSets as $set) 
                            {
                                if ($set['k'] == $field_entry['field'])
                                {
                                    echo "<tr><td>";
                                    if (in_array($set['v_pretty'], $field_entry['values']))
                                        echo "<input id=\"value_{$i}_{$set['v']}\" name=\"value_{$i}_{$set['v']}\" type=checkbox checked>";
                                    else
                                        echo "<input id=\"value_{$i}_{$set['v']}\" name=\"value_{$i}_{$set['v']}\" type=checkbox>";
                                    echo $set['v_pretty'];
                                    echo "</td></tr>";
                                }
                            }
                            echo "</table></div>";
                        }
                        else
                        {
                            echo "<input id=value_$i name=value_$i type={$field_entry['field_type']} value='{$field_entry['value']}'>";
                        }
                        echo'</td></tr>';
                    ?>
                    
                <?php
                    ++$i;
                    endforeach;
                    
                ?>
                
            </tbody></table></td>
            <td roswpan=2 valign=top><table id="buttses">
                <tr><td><input type=submit value=Submit class=but2></td></tr>
                <tr><td><button type=button class=but2 id=addCriterion onclick=AddField();>Add criterion</button></td></tr>
                <tr><td><button type=button class=but2 onclick=window.location='./'>Clear</button></td></tr>
            </table></td>
        </tr>
        <tr>
        <td><table>
            <tr>
            <td><input type=submit formtarget="_blank" onclick="submitForm('filter')" name=SeeMore value="Show All" class="but2"></td>
			<?php
			$permissionBr = $this->user->get_Permissions()['permissionBrowse'];
			$csv=addslashes(htmlspecialchars(str_replace("\n","%0A",$csv)));
			if ($permissionBr)
				echo '<td><a href="#" onclick="exportCSV(\''.$csv.'\',\'volunteers.csv\')" class="export2" style=color:#FFFFFF;><input type=button name=Export value="Export Database" class="but2"></a></td>';
			?>
            <td><input type=submit onclick="submitForm('../send_email/email')" name=Email value="Email Selected" class="but2"></td>
            <?php
				if($group === NULL && $permissionBr)
					echo "<td><button type=button name=AddToGroup class=but2 id=addToGroup>Add to group</button></td>";
			?>
            </tr>
        </table></td>
        </tr>
    </table>

    <?php
        if(count($filter['fields'])>=2)
            echo '<table class="listTab" id="dataTable" style=margin-top:245px>';
        else
            echo '<table class="listTab" id="dataTable">';
    ?>
        <thead class="fixed">
        <tr>
            <th class=checked><input type=checkbox id='selectAll' onclick=CheckAll(this.id)></th>
            <th class=headField>First name</th>
            <th class=headField>Surname</th>
            <th class=headField>Email</th>
            <?php
                foreach ($fieldsExtra as $v)
                    echo "<th class=headField>$v</th>";
            ?>
        </tr>
        </thead>
        <tbody class="scrollable">
        <?php
            foreach($users as $user)
            {
                echo "<tr>";
                    if (!empty($checkboxes) and in_array($user->ID, $checkboxes))
                        echo "<td class=checked><input type=checkbox name=selectAll_{$user->ID} checked></td>";
                    else
                        echo "<td class=unchecked><input type=checkbox name=selectAll_{$user->ID}></td>";
                    echo "<td class=name><a href=../user_profileNew?user={$user->ID}>{$user->firstName}</a></td>";
                    echo "<td>{$user->surname}</td>";
                    echo "<td>{$user->email}</td>";
                    foreach ($user as $k => $v)
                    {
                        if (!in_array($k, array('ID', 'firstName', 'surname', 'email')))
                            echo "<td>$v</td>";
                    }
                echo "</tr>";
            }
        ?>
        </tbody>
    </table>

	<?php
		if ($group === NULL)
			echo '<table class="groups" id="groupsTable" style="display:none">';
		else
			echo '<table class="groups" id="groupsTable">';
	?>
        <thead>
        <tr>
            <th class=checked><input type=checkbox id=checkAllGroups onclick=CheckAll(this.id)></th>
            <th> Group Name </th>
        </tr>
        </thead>
        <tbody id="groupses">
            <?php
				$currentUser=$this->user->userName();
                foreach ($groupData as $groups)
                {
					$permissionGr = $this->db->query("SELECT * FROM usersInGroups WHERE webUser='{$currentUser}' AND groupID='{$groups->ID}'")->num_rows();
					$permissionBr = $this->user->get_Permissions()['permissionBrowse'];
					if ($permissionGr!=0 || $permissionBr)
					{
						echo "<tr>";
						if($group !== NULL && $group == $groups->ID)
							echo "<td class=unchecked><input type=checkbox name=checkAllGroups_{$groups->ID} checked></td>";
						else 
							echo "<td class=unchecked><input type=checkbox name=checkAllGroups_{$groups->ID}></td>";
						echo "<td><a href=../groups/index#{$groups->ID} target=_blank>{$groups->name}</td></tr>";
					}
                }
            ?>
        </tbody>
    </table>
    <?php
		if ($group === NULL)
		{
			echo'<div id=addGroup><button type=button name=AddNewGroup class=but2 id=addNewGroup style=display:none>+ New Group</button></div>';
			echo'<span id=newGroupName style=display:none;>New name: <input type=text name=newGroupInput id=newGroupInput>';
			echo'<button type=button name=insertGroup class=but2 id=insertGroup>Add</button></span>';
			echo'<br><br>';
			echo'<div id=addToButt><input type=submit id=addUsers style=display:none class=but2 onclick=\'return submitFormGroups("../groups/addBrowse")\' value=Add></div>';
		}
		else
		{
			echo'<div id=addGroup><button type=button name=AddNewGroup class=but2 id=addNewGroup>+ New Group</button></div>';
			echo'<span id=newGroupName style=display:none;>New name: <input type=text name=newGroupInput id=newGroupInput>';
			echo'<button type=button name=insertGroup class=but2 id=insertGroup>Add</button></span>';
			echo'<br><br>';
			echo'<div id=addToButt><input type=submit id=addUsers class=but2 onclick=\'return submitFormGroups("../groups/addBrowse")\' value=Add></div>';
		}
	?>	
    </form>
    </span>
    

</div>

<script>
    $(document).ready(function(){
        $("#dataTable").tablesorter({headers: {0: {sorter: false}}});
        $('#addToGroup').click(function(e){
            $("#groupsTable").show(250);
            $("#addNewGroup").show(250);
            $("#addToGroup").hide(250);
			$("#addUsers").show(250);
        });
        $('#addNewGroup').click(function(e){
            $("#newGroupName").show(250);
            $("#addNewGroup").hide(250);
        });
        $('#insertGroup').click(function(e){
			if (newGroupInput.value!='')
			{
				insertGroupRow("newGroupInput", "groupses");
				$("#addNewGroup").show(250);
				$("#newGroupName").hide(250); 
			}
        });
        
        $firstAddCriterion = 0;
        $('#addCriterion').click(function(e){
            if(!$firstAddCriterion)
            {
                $firstAddCriterion = 1;
                $('.listTab').animate({'margin-top':'245px'}, 250);
                $('#band').animate({'height':'240px'}, 250);
                $('#criterions').animate({'height':'100px'}, 250);
            }
		});
    });
</script>
</html>
<?php
endif;
?>