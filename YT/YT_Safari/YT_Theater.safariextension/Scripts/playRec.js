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
	//var ll = interestedNode.getElementsByClassName("yt-lockup-thumbnail contains-addto");//each square of videos
	// var ids = [];
	// for( var i = 0 ; i < ll.length; i++ ){
	//     ids.push( ll[i].firstChild.href.split("=")[1]);
	// }
	// var test_link = "test.html?v=";
	// for( var i = 0 ; i < ids.length; i++ ){
	//     test_link += ids[i] + "&";
	// }
	// test_link = test_link.substring(0, test_link.lastIndexOf("&"));
	// safari.self.tab.dispatchMessage("pr_data", test_link);
	// console.log(test_link);
	//set local storage

	var ll = interestedNode.getElementsByClassName("yt-shelf-grid-item");
	var vids = "";
	var titles = "";
	var users = "";
	var users_links = "";
	var t = [];
	for( var i = 0; i < ll.length; i++ )
	{
	    //console.log(ll[i]);
	    var tupleNode = ll[i].getElementsByClassName("yt-lockup-title contains-action-menu");
	    tupleNode = tupleNode[0];
	    //console.log(tupleNode);
	    //console.log(tupleNode.firstChild);
	    //console.log(tupleNode.firstChild);
	    getHrefContentTuple( tupleNode, t );
	    dataObject.videoIds.push(t[0]);
	    dataObject.titles.push(t[1]);
	    // vids += t[0] + ",";
	    // titles += t[1] + ",";

	    tupleNode = ll[i].getElementsByClassName("yt-lockup-byline");
	    tupleNode = tupleNode[0];
	    getHrefContentTuple( tupleNode, t );
	    // users += t[0] + ",";
	    // users_links += t[1] + ",";
	    dataObject.users.push(t[0]);
	    dataObject.u_links.push(t[1]);
	    
	}
	// vids = "[" + chopLastDelimeter(vids) + "]";
	// titles = "[" + chopLastDelimeter(titles) + "]";
	// users = "[" + chopLastDelimeter(users) + "]";
	// users_links = "[" + chopLastDelimeter(users_links) + "]";
	
	
    }
    // var jsonStr = "{ \"videoIds\" :" + "\"" + vids + "\"" + ", \"titles\":" + "\"" + titles + "\"" + "}";
    // 	//+ ", 'titles':" + titles + ", 'users':" + users + ", 'ulinks':" + users_links + " }";
    // console.log(jsonStr);
    safari.self.tab.dispatchMessage("pr_data", dataObject);
}

function createContextItem(event)
{
    console.log("adding context item");
    safari.self.tab.setContextMenuEventUserInfo(event, "Play Recommended");
}

function handleCommand(msg)
{
    //console.log(msg);
    //only handle relevant message
    if( msg.name == "yt_theater" )
    {
	if( msg.message == "pr" )
	{
	    console.log( "u click: play recommended" );
	    getInterestedSegment("Recommended");
	}
    }
}
//console.log("hello");
document.addEventListener("contextmenu", createContextItem, false);
safari.self.addEventListener("message", handleCommand, false);
