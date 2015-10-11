<!doctype html>
<html><head>
	<link rel="stylesheet" href="/styles/newCategory.css"/>
	<link rel=stylesheet href=/styles/jquery.qtip.min.css>
	<script src="/scripts/jquery-1.10.2.js"></script>
	<script src=/scripts/jquery.qtip.min.js></script>
	<script src="/scripts/jquery.validate.js"></script>
	<script src="/scripts/additional-methods.js"></script>	
	<script src="/scripts/newCategory.js"></script>
    <script src=/scripts/browse_database.js></script>
    <script src=/scripts/jquery.tablesorter.js></script>
	<title>Categories</title>
</head>
<body>
    <div id=band>
		<div id=helpReg ></div>
	</div>
	<div class="wrapper">
		<div class="headerBox"><h1 id=h1> Categories </h1><input class="butSave" type="button" value="+ New category" id="newCategoryButton"></div>
		<div class="fieldsBox">
			
			<div id="newCategory">
				<h3>Category name:</h3>
				<form id="catAddForm" method="post" onsubmit="return checkForm(this)" action="submitAdd">
					<input type="text" size ="16" name="catName">
					<br><br>
					<input class=butSave type="submit" value="SUBMIT"><br>
				</form>
			</div>
			
			
			<table id="categories">
                <thead>
				<tr>
					<th id=del>Category Name</th>
					<th id=del></th><th id=del></th><th id=del></th><th id=del></th><th id=del>DELETE</th>
				</tr>
                </thead>
                <tbody id=bodi>
                <?php
                    foreach( $data as $datas) 
                    {
                        echo "<tr>\n";
                        //echo 	"<td> $datas->name </td>\n";
                        echo 	 "<td><a href='edit?category=".$datas->ID."'>".$datas->name ."</a></td>\n";
                        echo 	 "<td><a href='edit?category=".$datas->ID."'>Edit</a></td>\n";
                        if ($datas->show==true)
                            echo "<td><a href='hideCategory?category=".$datas->ID."'>Hide</a></td>\n";
                        else
                            echo "<td><a href='showCategory?category=".$datas->ID."'>Show</a></td>\n";
                        echo 	 "<td><a href='upCategory?category=".$datas->ID."'>Move Up</a></td>\n";					
                        echo 	 "<td><a href='downCategory?category=".$datas->ID."'>Move Down</a></td>\n";					
                        echo 	 "<td class='delCat'><a href='deleteCategory?category=".$datas->ID."' style=color:#FFFFFF>Delete</a></td>\n";					
                        echo '</tr>';
                    }
                ?>
                </tbody>
			</table>
		</div>
    </div>
<script>
    $(document).ready(function(){
        //$("#categories").tablesorter({headers: {1:{sorter: false},3:{sorter: false},4:{sorter: false},5:{sorter: false}}});
        
        var $widths = allignTable('categories');
        for (var i=0; i<32; i++)
        {
            $('th').eq(i).css('min-width', $widths[i]-10);
            $('th').eq(i).css('max-width', $widths[i]-10);
        }      
    });
    
    $(window).resize(function(){
        var $widths = allignTable('categories');
        for (var i=0; i<32; i++)
        {
            $('th').eq(i).css('min-width', $widths[i]-10);
            $('th').eq(i).css('max-width', $widths[i]-10);
        }
    });
</script>

</html>