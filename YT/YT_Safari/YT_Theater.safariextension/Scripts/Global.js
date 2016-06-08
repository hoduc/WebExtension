
var context = ["Play Recommended", "Play Recently Uploaded", "Play Today"];
var command = ["pr", "pru", "ptd"];

function handleContextMenu(event)
{
    if( event.userInfo )
    {
	console.log("global:" + event.userInfo);
	var items = event.userInfo.split("|");
	console.log(items);
	//map item-command
	for( var i = 0 ; i < items.length; i++ )
	{
	    for( var j = 0 ; j < context.length; j++ )
	    {
		if( items[i] == context[j] )
		{
		    console.log(i + "context:" + context[i]);
		    event.contextMenu.appendContextMenuItem(context[j], context[j], command[j]);
		}
	    }
	    
	}
    }
}

function handleCommand(event)
{
    //console.log("command clicked!!!");
    //console.log(event.command);
    /*if (event.command == "pr" )
    {
	safari.application.activeBrowserWindow.activeTab.page.dispatchMessage( "yt_theater", event.command );
	}*/
    console.log("command:" + event.command);
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage( "yt_theater", event.command );
}


function receiveMsg(event)
{
    if( event.name == "pr_data" )
    {
	
	//remove storeage
	localStorage.removeItem("yt_ids");
	localStorage.removeItem("yt_titles");
	localStorage.removeItem("yt_users");
	localStorage.removeItem("yt_ulinks");
	console.log("dataobject:");
	//console.log(event.message);
	var dataObject = event.message;
	console.log(dataObject);
	localStorage.setItem("yt_ids", dataObject.videoIds);
	localStorage.setItem("yt_titles", dataObject.titles);
	localStorage.setItem("yt_users", dataObject.users);
	localStorage.setItem("yt_ulinks", dataObject.u_links);
	//console.log(localStorage);
	safari.application.activeBrowserWindow.openTab().url = safari.extension.baseURI + "test.html";
    }
}


safari.application.addEventListener("message", receiveMsg, false);
safari.application.addEventListener("command", handleCommand, false);
safari.application.addEventListener("contextmenu", handleContextMenu, false);
