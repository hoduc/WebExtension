console.log("hello injected!");

function getInterestedSegment(nodeName)
{
    var allInterestedNodes = document.getElementsByClassName("feed-item-dismissable");
    var interestedNode = null;
    for( var i = 0; i < allInterestedNodes.length; i++ )
    {
	var rec = allInterestedNodes[i].getElementsByClassName("branded-page-module-title-text");
	if ( rec && rec[0].textContent == nodeName )
	{
	    interestedNode = allInterestedNodes[i];
	    break;
	}
    }
    if( interestedNode == null )
    {
	console.log("Cannot find any 'Recommended'");
    }
    else
    {
	var ll = interestedNode.getElementsByClassName("yt-lockup-thumbnail contains-addto");//each square of videos
	var ids = [];
	for( var i = 0 ; i < ll.length; i++ ){
	    ids.push( ll[i].firstChild.href.split("=")[1]);
	}
	var test_link = "test.html?v=";
	for( var i = 0 ; i < ids.length; i++ ){
	    test_link += ids[i] + "&";
	}
	test_link = test_link.substring(0, test_link.lastIndexOf("&"));
	safari.self.tab.dispatchMessage("pr_data", test_link);
	console.log(test_link);
    }
}

function createContextItem(event)
{
    console.log("adding context item");
    safari.self.tab.setContextMenuEventUserInfo(event, "Play Recommended");
}

function handleCommand(msg)
{
    //console.log(msg);
    if( msg.name == "yt_theater" )
    {
	if( msg.message == "pr" )
	{
	    console.log( "u click: play recommended" );
	    // getPlayRecommended();
	    getInterestedSegment("Recommended");
	}
    }
}
//console.log("hello");
document.addEventListener("contextmenu", createContextItem, false);
safari.self.addEventListener("message", handleCommand, false);
