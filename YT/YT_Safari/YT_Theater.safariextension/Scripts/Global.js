function handleContextMenu(event)
{
    console.log("global:" + event.userInfo);
    event.contextMenu.appendContextMenuItem("hello",event.userInfo);
}


safari.application.addEventListener("contextmenu", handleContextMenu, false);
