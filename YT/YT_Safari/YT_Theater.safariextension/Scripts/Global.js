function handleContextMenu(event)
{
    if( event.userInfo )
    {
	console.log("global:" + event.userInfo);
	event.contextMenu.appendContextMenuItem("ducho", event.userInfo, "pr");
    }
}

function handleCommand(event)
{
    //console.log("command clicked!!!");
    //console.log(event.command);
    if (event.command == "pr" )
    {
	safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("yt_theater", event.command);
	//console.log(document.getElementsByClassName("feed-item-dismissable"));
    }
}


function receiveMsg(event)
{
    if( event.name == "pr_data" )
    {
	//console.log( event.message );
	//open new tab
	//console.log("prepare to open tab:");
	//safari.application.activeBrowserWindow.openTab().url = safari.extension.baseURI + event.message;
	//console.log("url="+ safari.extension.baseURI + event.message);
	console.log(event.message);
	localStorage.setItem("yt_theater", event.message);
	safari.application.activeBrowserWindow.openTab().url = safari.extension.baseURI + "test.html";
    }
}


safari.application.addEventListener("message", receiveMsg, false);
safari.application.addEventListener("command", handleCommand, false);
safari.application.addEventListener("contextmenu", handleContextMenu, false);
