<html>
<head>
 <link rel=stylesheet href=/styles/browse_more.css> 
 <script src=/scripts/browse_database.js></script>
 <script src=/scripts/jquery-latest.js></script> 
 <script src=/scripts/jquery.tablesorter.js></script>
 <script src="/scripts/csvExport.js"></script>
 <title> Browse Database </title>
</head>
<div id=Boxxx>
	<input type=submit onclick=submitFormMore('../send_email/email') name=Email value=Email class=but1>
	<?php
			$permissionBr = $this->user->get_Permissions()['permissionBrowse'];
			if ($permissionBr)
			echo '<button class=but1><a href="#" class="export2" style=color:#FFFFFF;>Export to *.csv</a></button>';
	?>
	
</div>
<span id=wrapper><form method=post id=form1 action=filter>
    <?php
        if (!empty($more))
        {
            echo "<table class=listTab id=dataTable><thead class=head id=hd><tr class=fixie id=hrow>";
            echo "<th class=checked><input type=checkbox checked id=selectAll name=select_all onclick=CheckNone('selectAll')></th>";
            foreach ($fields as $field)
                echo "<th>{$field}</th>\n";
            echo "</tr></thead>";
            echo "<tbody class=scrollable>";
            foreach ($more as $row)
            {
                echo "<tr id=row>";
                if (!empty($checkboxes) and in_array($row->ID, $checkboxes))
                    echo "<td class=checked><input type=checkbox name=selectAll_{$row->ID} checked></td>";
                else
                    echo "<td class=unchecked><input type=checkbox name=selectAll_{$row->ID}></td>";
                foreach ($row as $data)
                    echo "<td><div class=content>{$data}</div></td>\n";
                echo "</tr>\n";
            }
            echo "</tbody></table>";
        }
    ?>    
</form></span>
    
<script>
    $(document).ready(function(){
        $("#dataTable").tablesorter({headers: {0: {sorter: false}}});
        
        var $widths = allignTable('dataTable');
        for (var i=1; i<32; i++)
        {
            $('th').eq(i).css('min-width', $widths[i]-6);
            $('th').eq(i).css('max-width', $widths[i]-6);
        }
    });
    
    $(window).resize(function(){
        var $widths = allignTable('dataTable');
        for (var i=1; i<32; i++)
        {
            $('th').eq(i).css('min-width', $widths[i]-6);
            $('th').eq(i).css('max-width', $widths[i]-6);
        }
    });
    
    
    $(window).scroll(function(){
        $('.head').css('left', -$(window).scrollLeft() + 10);
    });
</script>
</html>