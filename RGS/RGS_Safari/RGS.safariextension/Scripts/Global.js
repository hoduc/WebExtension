var searchContent = null;
var context = ["with Google", "with Google Images"];
var command = ["sg", "sgi"];
var command_link = ["https://www.google.com/#q=", "https://www.google.com/search?site=&tbm=isch&source=hp&q="]

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
	for( var i = 0; i < context.length; i++ )
	{
	    var cit = "Search " + "\"" + contextItemTitle + " \"" + context[i];
	    event.contextMenu.appendContextMenuItem(contextItemTitle, contextItemTitle, command[i]);
	}
	// contextItemTitle = "Search " + "\"" + contextItemTitle + "\"" + " with Google";
	// console.log(contextItemTitle);
	// event.contextMenu.appendContextMenuItem(contextItemTitle, contextItemTitle, "sg");
    }
}

function handleCommand(event)
{
    // if( event.command == "sg" )
    // {
    // 	safari.application.activeBrowserWindow.openTab().url = "https://www.google.com/#q=" + searchContent;
    // }
    for( var i = 0; i < command.length; i++ )
    {
	if( event.command == command[i] )
	{
	    safari.application.activeBrowserWindow.openTab().url = command_link[i] + encodeURI( searchContent );
	}
    }
}

safari.application.addEventListener("contextmenu", handleContextMenu, false);
safari.application.addEventListener("command", handleCommand, false);
