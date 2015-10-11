<!doctype html>
<html>
<head>
	<link rel=stylesheet href=/styles/send_email.css>
    <script src="/scripts/jquery-1.10.2.js"></script>
    <script src=/scripts/mails.js></script>
	<title>Send Email</title>
</head>

<body>
    <div id=band></div>
	<span id=wrapper>
        <form method="post" action="../../send_email/buttonAction">  
		<div id="headBox">
            <table>
            <tr>
            <td id=h1><b>Select email</b></td> 
            <td><select id="email">
                <option> </option>
                <?php
                    foreach($emails as $row)
                    {
                        $subject = $row->Subject;
                        $text = $row->Text;
                        echo "<option id='$subject' value='$text'>$subject</option>";
                    }
                ?>
            </select></td></tr><tr><td colspan=2>
            <input class="but1" id="save" type="submit" name="Save" value="Save">
            <input class="but1" id="clear" type="submit" name="New" value="New">
            <input class="but1" id="del" type="submit" name="Delete" value="Delete">
            <input class="but1" id="send" type="submit" name="Email" value="Send Email">
            </td></tr></table>
        </div>
        <div id=content>
		
			<table>
                <tr><td class=descs>Subject:</td> <td class="fds"><input id="title" type="text" name="subject"></td></tr>
		  
                <tr><td class=descs>To:</td> <td class="fds"><input id="to" type="text" name="adresses" <?php if(isset($emailList)) echo("value='".$emailList."'") ?> ></td></tr>
                <tr><td colspan=2><textarea id="text" type="text" rows="31" cols="82" name="emailtext"></textarea></td></tr>
            </table>
        </div> 
		</form>
	</span>
</body>

</html>