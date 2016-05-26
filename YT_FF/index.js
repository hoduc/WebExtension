var self = require("sdk/self");

var cm = require("sdk/context-menu");
cm.Item({
    label: "Play Recommended",
    context: cm.URLContext("youtube.com"),
    contentScript: "self.on('click', self.postMessage);",
    onMessage: playRecommended
    
                   
});

function playRecommended()
{
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

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;
