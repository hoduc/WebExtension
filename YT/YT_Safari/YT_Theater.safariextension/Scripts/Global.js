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
    }
}


/*function receiveMsg(event)
{
    
}*/


//safari.application.addEventListener("message", receiveMsg, false);
safari.application.addEventListener("command", handleCommand, false);
safari.application.addEventListener("contextmenu", handleContextMenu, false);
