function handleMessage(event)
{
    alert("injected script receives message:" + event);
    //making sure it is our message
    if( event.name == "yt_theater" )
    {
	var command = event.message;
	alert( "what is the command:" + command );
	if ( command == "playRec" )
	{
	    playRecommended();
	}    
    }
}

function playRecommended()
{
    alert("Hello Recommended");
    var recommended = document.getElementsByClassName("feed-item-dismissable");
    var recNode = null;
    for( int i = 0; i < recommended.length; i++ )
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
    }
}



function createContextItem(event)
{
    alert("adding context item");
    safari.self.tab.setContextMenuEventUserInfo(event, "Play Recommended");
}

alert("hello");
safari.self.addEventListener("contextmenu", createContextItem, false);
//safari.self.addEventListener("message", handleMessage, false);
