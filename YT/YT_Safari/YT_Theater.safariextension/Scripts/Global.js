function handleContextMenu(event)
{
    console.log("global:" + event.userInfo);
}


safari.application.addEventListener("contextmenu", handleContextMenu, false);
