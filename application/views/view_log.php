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
	<div class="wrapperLog">
		<div class="headerBox">
			<h1 id=h1> Change Log </h1>
			<form id=logSearch method="post" action="../../log/search">
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
					<tr>
						<td><div class="navButtons"><?php
                            if (isset($_GET['page']))	$page=$_GET['page'];
                            else						$page=1;
                            //echo "Current page:".$page." Total number of pages:".$pageNo."<br><br>";
                            if ($page>1)
                                echo '<a href="../../log?page='.($page-1).'">Previous page</a>';
                            if ($page>1 || $page<$pageNo)
                                echo "<span>|<span>";
                            if ($page<$pageNo)
                                echo '<a href="../../log?page='.($page+1).'">Next page</a>';				
                        ?></div></td>
					</tr>
				
                </table>
				
			</form>
            
		
		</div>
		<div class="logBox">			
			<table id="log">
                <thead>
				<tr>
					<th class=usr>User</th>
					<th class=nam>Name</th>
					<th>Date</th>
					<th class=act>Action</th>					
				</tr>
                </thead>
                <tbody>
                <?php
                    foreach( $logs as $log) 
                    {
                        echo "<tr>\n";
                        
                        echo "<td class=usr>";
                            if ($log->admin==-1)
                                echo $log->user." [X]\n";
							else if ($log->admin==1)
								echo $log->user."[*]";
                            else
                                echo '<a href="../../user_profileNew?user='.$log->id.'">'.$log->user.'</a>';
                            
                        echo "</td>";
                        echo 	"<td class=nam>".$log->first_name." ".$log->surname."</td>\n";
                        echo 	"<td>".$log->date."</td>\n";
                        echo 	"<td class=act>".$log->text."</td>\n";					
                        echo "</tr>\n";
                    }
                ?>
                </tbody>
			</table>
			
			<div class="navButtons"><?php
				if (isset($_GET['page']))	$page=$_GET['page'];
				else						$page=1;
				//echo "Current page:".$page." Total number of pages:".$pageNo."<br><br>";
				if ($page>1)
					echo '<a href="../../log?page='.($page-1).'">Previous page</a>';
				if ($page>1 && $page<$pageNo)
					echo "<span>|<span>";
				if ($page<$pageNo)
					echo '<a href="../../log?page='.($page+1).'">Next page</a>';
				
			?></div>
			<p> [X] User has been deleted.</p>
			<p> [*] User is admin </p>
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