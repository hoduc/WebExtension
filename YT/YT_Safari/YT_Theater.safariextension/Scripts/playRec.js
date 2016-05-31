console.log("hello injected!");

function getPlayRecommended()
{
    //alert("Hello Recommended");
    var recommended = document.getElementsByClassName("feed-item-dismissable");
    var recNode = null;
    console.log("node:");
    console.log(recommended);
    /*for( int i = 0; i < recommended.length; i++ )
    {
	var rec = recommended[i].getElementsByClassName("branded-page-module-title-text");
	if ( rec && rec[0].textContent == "Recommended" )
	{
	    recNode = recommended[i];
	    break;
	}
    }

    if( recNode == null )
    {
	alert("Cannot find any 'Recommended'");
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
	window.open(test_link, '_blank');
	window.focus;
    }*/
}

function createContextItem(event)
{
    console.log("adding context item");
    safari.self.tab.setContextMenuEventUserInfo(event, "Play Recommended");
}

function handleCommand(msg)
{
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
