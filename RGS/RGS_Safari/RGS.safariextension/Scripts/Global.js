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


safari.application.addEventListener("contextmenu", handleContextMenu, false);
