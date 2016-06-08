var HOME_LINK = "https://www.youtube.com/";
var SUB_LINK = HOME_LINK + "feed/subscriptions";


var LINK =
[
    HOME_LINK,
    SUB_LINK
];

var CONTEXT_ITEM =
[
    "Play Recommended|Play Watch It Again",
    "Play Today"
];

var COMMAND =
[
    "pr",
    /*"pru",*/
    "pwa",
    "ptd",
];

var COMMAND_NODE =
[
    "Recommended",
    /*"Recently Uploaded",*/
    "Watch It Again",
    "Today"
];

console.log("hello injected!");
var dataObject =
{
    videoIds:[],
    titles: [],
    users: [],
    u_links: []
};

function getHrefContentTuple(nodeName, t)
{
    t[0] = nodeName.firstChild.href.split("=")[1];
    t[1] = nodeName.firstChild.textContent;
}

function chopLastDelimeter(s, delimeter)
{
    delimeter = delimeter || ",";
    if(!s.lastIndexOf(delimeter))
	return s
    return s.substring(0, s.lastIndexOf(delimeter));
}
function getInterestedSegment(nodeName)
{
    console.log("trying to find:" + nodeName);
    var allInterestedNodes = document.getElementsByClassName("feed-item-dismissable");
    //console.log(allInterestedNodes);
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
	console.log("Cannot find any " + nodeName );
	return;
    }
    else
    {
	console.log(interestedNode);
	var ll = interestedNode.getElementsByClassName("yt-shelf-grid-item");
	var vids = "";
	var titles = "";
	var users = "";
	var users_links = "";
	var t = [];
	for( var i = 0; i < ll.length; i++ )
	{
	    var tupleNode = ll[i].getElementsByClassName("yt-lockup-title contains-action-menu");
	    tupleNode = tupleNode[0];
	    getHrefContentTuple( tupleNode, t );
	    dataObject.videoIds.push(t[0]);
	    dataObject.titles.push(t[1]);

	    tupleNode = ll[i].getElementsByClassName("yt-lockup-byline");
	    tupleNode = tupleNode[0];
	    getHrefContentTuple( tupleNode, t );
	    dataObject.users.push(t[0]);
	    dataObject.u_links.push(t[1]);
	    
	}
    }
    console.log("found dataObject");
    console.log(dataObject);
    safari.self.tab.dispatchMessage("pr_data", dataObject);
}

function createContextItem(event)
{
    console.log(event);
    console.log("adding context item");
    console.log("link:" + window.location.href );
    for( var i = 0; i < LINK.length; i++ )
    {
	if( window.location.href == LINK[i] )
	{
	    console.log("link:" + LINK[i]);
	    console.log("context_item:" + CONTEXT_ITEM[i]);
	    safari.self.tab.setContextMenuEventUserInfo( event, CONTEXT_ITEM[i] );
	    break;
	}
    }
}

function handleCommand(msg)
{
    //console.log(msg);
    //only handle relevant message
    // if( msg.name == "yt_theater" )
    // {
    // 	if( msg.message == "pr" )
    // 	{
    // 	    console.log( "u click: play recommended" );
    // 	    getInterestedSegment("Recommended");
    // 	}
    // 	else if ( msg.messafe = "pru" )
    // 	{
    // 	    console.log( "u click: play recently uploaded" );
    // 	    getInterestedSegment("Recently Uploaded");
    // 	}
    // }

    if( msg.name == "yt_theater" )
    {
	console.log( "u click: play" + msg.message );
	for( var i = 0; i < COMMAND.length; i++ )
	{
	    if( msg.message == COMMAND[i] )
	    {
		console.log("dataObject:");
		console.log(dataObject);
		getInterestedSegment(COMMAND_NODE[i]);
		break;
	    }
	}
    }
}
//console.log("hello");
document.addEventListener("contextmenu", createContextItem, false);
safari.self.addEventListener("message", handleCommand, false);
