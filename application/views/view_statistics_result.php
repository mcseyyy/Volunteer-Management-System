<!doctype html>
<html>
<head>
	<link rel=stylesheet href=/styles/jquery.qtip.min.css>
	<script src="/scripts/jquery-1.9.1.js"></script>
	<script src="/scripts/jquery-ui.js"></script>
	<script src=/scripts/jquery.qtip.min.js></script>
	<script src="/scripts/statistics.js"></script>
	<script src="/scripts/csvExport.js"></script>
	<link rel=stylesheet href="/styles/jquery-ui.css">
	<link rel=stylesheet href="/styles/statistics.css">
	<meta charset="utf-8">
	<script>
		$(function() {
			$( "#datepicker" ).datepicker({ dateFormat: "yy-mm-dd" });;
			$( "#datepicker1" ).datepicker({ dateFormat: "yy-mm-dd" });;
		});
	</script>

	<title>Statistics</title>
</head>
<?php
	$helpFile = FCPATH."application/views/helpfiles/help_statistics.txt";
	$hf = fopen($helpFile, 'rb');
	$helptext = fread($hf,filesize($helpFile));
	fclose($hf);	
?>

<div class=container>
    <div id="band">
		<div id=helpStats ></div>
	</div>
	<span id="wrapper">
		<div class="fieldsBox">
            <h1 id=h1>Results for "<?php echo $name?>"</h1>
            <h4 id=h4>Select the criterion you want to generate statistics for.</h4>

			<form id="myForm" method="post" action=submit>
            <table><tr>
			<td>Criterion</td>
            <td><select class="fieldList" name="fieldId">
			<option class="dropDown" value="title" <?php if($name=='Title') echo "selected";?>>Title</option>
			<option class="smallText" value="fname" <?php if($name=='First Name') echo "selected";?>>First Name</option>
			<option class="smallText" value="sname" <?php if($name=='Surname') echo "selected";?>>Surname</option>
			<option class="smallText" value="email" <?php if($name=='Email') echo "selected";?>>Email</option>
			<option class="date" value="rdate" <?php if($name=='Registration Date') echo "selected";?>>Registration Date</option>
			<?php
				foreach($fields as $field)
				{
					echo '<option class='.$field->fieldType.' value='.$field->ID;
					if($name==$field->name)
					{
						echo " selected";
					}
					echo '>'.$field->name.'</option>';
				}
			?>
			</select></td></tr>

			<tr class="textType">
                <td colspan='2'><span>Please separate the text fragments you are looking for by commas.</span><br></td>
            </tr>
			<tr class="textType">
                <td><span>Keywords:</span></td>
				<td><input type="text" size="58 " name="search"></td>
			</tr>

			<tr class="dateType">
                <td>Start Date</td>
                <td><input type="text" id="datepicker" size="16" name="startDate"></td>
            </tr>
            <tr class="dateType">
                <td>End Date</td>
                <td><input type="text" id="datepicker1" size="16" name="endDate"></td>
            </tr>
            <tr class="dateType">
                <td>Interval</td>
                <td><select name="interval">
                    <option>Month</option>
                    <option>Year</option>
                </select></td>
            </tr>

            <tr><td>Chart Type</td>
			<td><select class="chartList" name="chartType">
				<option class="pie" value="pie" <?php if($chartType=='pie') echo"selected";?>> Pie Chart</option>
				<option class="bar" value="bar" <?php if($chartType=='bar') echo"selected";?>>Bar chart</option>
			</select></td></tr></table>
			
			<b><div id=butgen>
			<input class=butSearch type=submit value="Generate"></div></b>

			</form>
		</div>

        <div id=stats>
        <div id="plotArea"></div>
		
		<div id="dvData">
        <table class=statTab>
            <tr><td class=val id=exp colspan=3 style=min-width:150px;><a href="#" class="export" style=color:#FFFFFF;><b>Export to *.csv</b></a></td></tr>
            <?php
                foreach($result as $key => $value)
                {
                    echo "<tr>
                        <td class=val> ".$key." </td>
                        <td> ".$value." </td>
                        <td> ".round(($value/$total*100),2)."% </td>
                    </tr>";
                }
                echo "<tr><td class=val colspan=3 style=text-align:center>Total: $total</td></tr>";
            ?>
		</table>
		</div>
		
		<div id="container" style="min-width:600px; height: 500px; margin: 0 auto"></div>

        </div>
    </span>
</div>

<script src="/scripts/highcharts.js"></script>
<script src="/scripts/exporting.js"></script>
<?php
	if($chartType == "pie")
	{
?>
<script>
$(function () {
    $('#container').highcharts({
        chart: {
            backgroundColor:'transparent',
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Results for <?php echo $name;?>'
        },
        tooltip: {
    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            type: '<?php echo $chartType;?>',
            name: 'pie',
            data: [
                <?php
				$count = 0;
                foreach($result as $key => $value)
                {
                    if($count>0)
					{
						echo ",";
					}
					echo "['".addslashes($key)."', ".$value."]";
					$count++;
                }
				?>
            ]
        }]
    });
});
</script>
<?php
	}
	else if($chartType == "bar")
	{
?>
<script>
$(function () {
        $('#container').highcharts({
            chart: {
				backgroundColor:'transparent',
                type: 'column',
                margin: [ 50, 50, 100, 80]
            },
            title: {
                text: 'Results for <?php echo $name;?>'
            },
            xAxis: {
                categories: [
                    <?php
						$count = 0;
						foreach($result as $key => $value)
						{
							if($count>0)
							{
								echo ",";
							}
							echo "'".addslashes($key)."'";
							$count++;
						}
					?>
                ],
                labels: {
                    rotation: +90,
                    align: 'right',
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: '<?php echo $chartType;?>',
                data: [
					<?php
						$count = 0;
						foreach($result as $key => $value)
						{
							if($count>0)
							{
								echo ",";
							}
							echo addslashes($value);
							$count++;
						}
					?>
				],
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    x: 4,
                    y: 10,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif',
                        textShadow: '0 0 3px black'
                    }
                }
            }]
        });
    });
</script>
<?php
	}
	else if($chartType == "line")
	{
?>
<script>
$(function () {
        $('#container').highcharts({
			chart: {
				backgroundColor:'transparent'
			},
            title: {
                text: 'Results for <?php echo $name;?>',
                x: -20 //center
            },
            xAxis: {
                categories: [
				<?php
						$count = 0;
						foreach($result as $key => $value)
						{
							if($count>0)
							{
								echo ",";
							}
							echo "'".addslashes($key)."'";
							$count++;
						}
					?>
				]
            },
            yAxis: {
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                data: [
				<?php
					$count = 0;
					foreach($result as $key => $value)
					{
						if($count>0)
						{
							echo ",";
						}
						echo addslashes($value);
						$count++;
					}
				?>
				]
            }]
        });
    });
</script>
<?php
	}
?>
</html>