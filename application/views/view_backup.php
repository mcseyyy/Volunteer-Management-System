<html>
<title>Backup</title>
<link rel=stylesheet href=/styles/backup.css>
<script src="/scripts/jquery-1.10.2.js"></script>
<script>
function CheckAll(id)
{
    // Change the onclick value to CheckNone()
    var selectAll = document.getElementById(id);
    var attr = document.createAttribute("onclick");
    attr.nodeValue = "CheckNone(this.id)";
    selectAll.attributes.setNamedItem(attr);

    // Check all checkboxes (in the list of entries)
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; ++i)
        if (inputs[i].id.substring(0,id.length) == id)
			inputs[i].checked = true;
}

function CheckNone(id)
{
    // Change the onclick value to CheckAll()
    var selectAll = document.getElementById(id);
    var attr = document.createAttribute("onclick");
    attr.nodeValue = "CheckAll(this.id)";
    selectAll.attributes.setNamedItem(attr);

    // Check all checkboxes (in the list of entries)
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; ++i)
        if (inputs[i].id.substring(0,id.length) == id)
			inputs[i].checked = false;
}
function ToggleUpload()
{
    document.getElementById("uploadForm").style.display = "inline";
    document.getElementById("uploadButton").style.display = "none";
}

function pastePath()
{
	document.getElementById("pathDisplay").value = document.getElementById("file_input").value.replace("C:\\fakepath\\", "");
}
</script>


<div id=band></div>
<div id=wrapper>
	<div class=headerBox>
		<h1 id=h1>Mange Backups</h1>
        <table><tr>
		<td><form action=makeBackup><input type=submit value="+ Make backup" class=butSave></form></td>
        <td id=upload>
            <span style=display:inline; id=uploadButton>
                <button type=button onclick=ToggleUpload() class=butSave>Upload backup</button>
            </span>
            <span style=display:none; id=uploadForm>
                <form action=uploadBackup method=post accept-charset=utf-8 enctype=multipart/form-data>
                <div id=Select style=position:relative>
					<input type=file accept=.gz id=file_input name=userfile onchange=pastePath()>
					<button type=button class=butSelect>Select file</button>
					<input type="text" id=pathDisplay readonly>
					<input class=butSave type=submit value=Upload>
				</div>                
				</form>
			</span>
        </td>
        </tr></table>
	</div>
	<div id=content>
		<form id=delBack action=deleteBackup method=post>
			<table class=backTab>
				<tr>
					<th class=checked><input type=checkbox id=file onclick=CheckAll(this.id)></th>
					<th class=headField>Backup file</th>
                    <th></th>
				<?php foreach ($files as $file): ?>
					<tr>
						<td><input type=checkbox id=file_<?=$file?> name=<?=$file?>></td>
						<td><a href=downloadFile/<?=$file?>><?=$file?></a></td>
						<td class=restore><a href=restoreBackup/<?=$file?> style=color:#FFF>Restore</a></td>
					</tr>
				<?php endforeach ?>
			</table>
			<div id=butt><input type=submit value="Delete selected" class=butSave></div>
		</form>
	</div>
</div>
<div id=wrapper><?php if ($status) echo $status; ?></div>

<script>
    $('#delBack').submit(function(e)
    {
        var c = confirm("Are you sure you want to delete this backup?");
        
        if (!c)
            e.preventDefault();
    });	
</script>

</html>