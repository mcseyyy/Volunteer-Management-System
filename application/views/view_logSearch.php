<!doctype html>
<html><head>
	<link rel="stylesheet" href="/styles/newCategory.css"/>
    <script src=/scripts/browse_database.js></script>
    <script src="/scripts/jquery-1.10.2.js"></script>
	
	<script src="/scripts/jquery-ui.js"></script>
	<link rel=stylesheet href="/styles/jquery-ui.css">
	<meta charset="utf-8">
	<script>
		$(function() {
			$( "#datepicker" ).datepicker({ dateFormat: "yy-mm-dd" });;
			$( "#datepicker1" ).datepicker({ dateFormat: "yy-mm-dd" });;
		});
	</script>
	
	<title>Changelog</title>
</head>
<body>
    <div id=band2></div>
	<div class="wrapper">
		<div class="headerBox">
			<h1 id=h1> Change Log </h1>
			<form method="post" action="../../log/search">
				<table>
					<tr>
						<td><span class="whiteText">Username<span></td>
						<td><input type="text" size ="16" name="userName"></td>
						
						<td><span class="whiteText">Action<span></td>
						<td><input type="text" size="16" name="action"></td>						
                        <td rowspan="2"><input class=butSearch type="submit" value="Search"><td>
					</tr>
					<tr>	
						<td><span class="whiteText">Start date<br>(yyyy-mm-dd)<span></td>
						<td><input type="text" id="datepicker" size ="16" name="startDate"></td>
					
						<td><span class="whiteText">End date<br>(yyyy-mm-dd<span>)</td>
						<td><input type="text" id="datepicker1" size ="16" name="endDate"></td>
					</tr>
				</table>
			</form>
		
		</div>
		<div class="logBox">
			<table id="log">
                <thead>
				<tr>
					<th>User</th>
					<th>Name</th>
					<th>Date</th>
					<th>Action</th>					
				</tr>
                </thead> 
			<?php
				foreach( $logs as $log) 
				{
					echo "<tr>\n";
					
					echo "<td>";
						if ($log->admin==-1)
							echo $log->user." [X]\n";
						else if ($log->admin==1)
							echo $log->user."[*]";
						else
							echo '<a href="../../user_profileNew?user='.$log->id.'">'.$log->user.'</a>';
						
					echo "</td>";
					echo 	"<td>".$log->first_name." ".$log->surname."</td>\n";
					echo 	"<td>".$log->date."</td>\n";
					echo 	"<td>".$log->text."</td>\n";					
					echo "</tr>\n";
				}
			?>
			</table>
		</div>
    </div>

</body>

<script>
    $(document).ready(function(){       
        var $widths = allignTable('log');
        for (var i=0; i<32; i++)
        {
            $('th').eq(i).css('min-width', $widths[i]-10);
            $('th').eq(i).css('max-width', $widths[i]-10);
        }      
    });
    
    $(window).resize(function(){
        var $widths = allignTable('log');
        for (var i=0; i<32; i++)
        {
            $('th').eq(i).css('min-width', $widths[i]-10);
            $('th').eq(i).css('max-width', $widths[i]-10);
        }
    });
</script>	

</html>