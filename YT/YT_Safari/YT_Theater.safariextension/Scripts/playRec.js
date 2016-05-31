console.log("hello injected!");

function getPlayRecommended()
{
    //alert("Hello Recommended");
    var recommended = document.getElementsByClassName("feed-item-dismissable");
    /*if ( recommended != null )
    {
	safari.self.tab.dispatchMessage("pr_data", recommended);
    }*/
    var recNode = null;
    //console.log("node:");
    //console.log(recommended.length);
    for( var i = 0; i < recommended.length; i++ )
    {
	var rec = recommended[i].getElementsByClassName("branded-page-module-title-text");
	if ( rec && rec[0].textContent == "Recommended" )
	{
	    recNode = recommended[i];
	    break;
	}
    }
    console.log(recNode);
    
    if( recNode == null )
    {
	console.log("Cannot find any 'Recommended'");
    }
    else
    {
	var ll = recNode.getElementsByClassName("yt-lockup-thumbnail contains-addto");//each square of videos
	var ids = [];
	for( var i = 0 ; i < ll.length; i++ ){
	    ids.push( ll[i].firstChild.href.split("=")[1]);
	}
	var test_link = "test.html?v=";
	for( var i = 0 ; i < ids.length; i++ ){
	    test_link += ids[i] + "&";
	}
	test_link = test_link.substring(0, test_link.lastIndexOf("&"));
	console.log(test_link);
	window.open(test_link, '_blank');
	window.focus;
    }
}

function createContextItem(event)
{
    console.log("adding context item");
    safari.self.tab.setContextMenuEventUserInfo(event, "Play Recommended");
}

function handleCommand(msg)
{
    console.log(msg);
    if( msg.name == "yt_theater" )
    {
	if( msg.message == "pr" )
	{
	    console.log( "u click: play recommended" );
	    getPlayRecommended();
	}
    }
}
//console.log("hello");
document.addEventListener("contextmenu", createContextItem, false);
safari.self.addEventListener("message", handleCommand, false);
