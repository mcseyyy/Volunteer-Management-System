$(document).ready(function () {
	
	$('#helpReg').qtip({ 
		content: {
			text: '<u>Create/edit categories</u> <br><br><br> Click on a category\'s name or Edit to edit its fields <br><br>Move Up/Down affects the registration page <br><br>They can be hidden from the registration page without any information being lost. <br><br> <b>DELETING A CATEGORY WILL PERMANENTLY DELETE ALL INFORMATION IN THE CATEGORY </b>'
		},
		style: {
			classes: 'qtip-light'
		},
		position: {
			my: 'top right',  // Position my top right...
			at: 'bottom left', // at the bottom left of...
			target: $('#helpReg') // my target
		}
	});

	//animate new category button
	$("#newCategoryButton").click(function() {
		if ($("#newCategory").css('display')=='none')
		{
			$("#newCategory").show(500);
			$("#categories").animate({'margin-top': '0px'}, 500);
			$("#newCategoryButton").attr('value', 'Cancel new category');
		}
		else
		{
			$("#newCategory").hide(500);	
			$("#categories").animate({'margin-top': '123px'}, 500);
			$("#newCategoryButton").attr('value', '+ New category');
		}
	});
    
    $('.delCat').click(function(e)
    {
        var c = confirm("Do you really want to delete this category?");
        
        if (c==false)
            e.preventDefault();
    });

     $('.delField').click(function(e)
    {
        var c = confirm("Do you really want to delete this field?");
        
        if (c==false)
            e.preventDefault();
    });
});

function checkForm(form)
{
	if (form.catName.value=="")
		return false;
	return true;
}