var searchContent = null;

function handleContextMenu(event)
{
    if( event.userInfo )
    {
	var contextItemTitle = event.userInfo;
	console.log("title:" + contextItemTitle);
	if( contextItemTitle.length > 10 )
	{
	    contextItemTitle = contextItemTitle.substring(0,11) + "...";	
	}
	searchContent = contextItemTitle;
	contextItemTitle = "Search " + "\"" + contextItemTitle + "\"" + " with Google";
	console.log(contextItemTitle);
	event.contextMenu.appendContextMenuItem(contextItemTitle, contextItemTitle, "sg");
    }
}

function handleCommand(event)
{
    if( event.command == "sg" )
    {
	safari.application.activeBrowserWindow.openTab().url = "https://www.google.com/#q=" + searchContent;
    }
}

safari.application.addEventListener("contextmenu", handleContextMenu, false);
safari.application.addEventListener("command", handleCommand, false);
