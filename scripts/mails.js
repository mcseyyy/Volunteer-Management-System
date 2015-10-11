$(document).ready(function()
{
    $('#email').change(function()
    {
        //$('#text').val = $('#email option').find(':selected').val();
        $('#title').val($('#email option:selected').text());
        $('#text').val($('#email option:selected').val());
    });

    $('#send').click(function(e)
    {
        e.preventDefault();
        
        var subject = $('#title').val();
        var to = $('#to').val();
        var body = $('#text').val();
        
        var strMail = 'mailto:museum.volunteering@bristol.gov.uk?bcc=' + encodeURIComponent(to)
                    + '&subject=' + encodeURIComponent(subject)
                    + '&body=' + encodeURIComponent(body);
        
        
        var c = true;
		if (to=='')
			c = confirm("You haven't selected any recipients. Would you like to continue?");
        if (c==true)
			window.open(strMail);
    });
    
    $('#del').click(function(e)
    {
        var c = confirm("Do you really want to delete this e-mail template?");
        
        if (c==false)
            e.preventDefault();
    });
    
    
    $('#save').click(function(e)
    {
        if ($('#title').val() ==  $('#email option:selected').text())
        {
            var c = confirm("Do you really want to overwrite this e-mail template?");
            
            if (c==false)
                e.preventDefault();
        }
    });
}); 