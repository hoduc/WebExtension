function YTVideo(id, title, ytUser, ytUserLink, startSec, quality)
{
    this.id = id;
    this.title = title;
    this.ytUser = ytUser;
    this.ytUserLink = ytUserLink;
    this.startSec = startSec || 0;
    this.quality = quality || "large";
}

var yt=[
    //new YTVideo("jYXbep0SKzk"),
    //new YTVideo("Ec2mQCQI4RY")
];

var cur=-1;
var player;

function createThumbnails(ytli)
{
    var pl = document.getElementById("playerList");
    for (var i = 0 ; i < ytli.length; i++ )
    {
	var img = document.createElement("img");
	img.src = "https://i.ytimg.com/vi/" + ytli[i].id + "/sddefault.jpg";
	img.width = img.height = 96;
	var li = document.createElement("li");
	li.appendChild(img);
	pl.appendChild(li);
    }
}

// function initializeYtList()
// {
//     var query = window.location.search.substring(1);
//     console.log("query=" + query);
//     var videoIds = query.substring(query.indexOf("=")+1).split("&");
//     console.log("videoIds:" + videoIds);
//     for( var i = 0; i < videoIds.length; i++ )
//     {
// 	yt.push( new YTVideo( videoIds[i] ) );
//     }
//     createThumbnails(yt);
// }

function initializeYtListLocalStorage()
{
    //console.log(localStorage);
    // var vids = localStorage.getItem("videoIds").split(",");
    // var titles = localStorage.getItem("titles").split(",");
    // var users = localStorage.getItem("users").split(",");
    // var ulinks = localStorage.getItem("ulinks").split(",");
    // for( var i = 0 ; i < vids.length; i++ )
    // {
    // 	yt.push( new YTVideo( vids[i], titles[i], users[i], ulinks[i] ) );
    // }
    JSON.parse(localStorage.getItem( "yt_theater" ), function( k,v ){
	console.log(k);
    });
    // createThumbnails(yt);
}


function playNext()
{
    var nextVideo = yt[++cur%yt.length];
    player.cueVideoById(nextVideo.id, nextVideo.startSec, nextVideo.quality);
    player.playVideo();

    //pop img-top, push to the end
    if( cur >= 0 )
    {
	var pl = document.getElementById("playerList");
	console.log("firstChild:" + pl.firstChild);
	var fc = pl.firstElementChild;
	pl.removeChild(fc);
	pl.appendChild(fc);
	console.log("after:" + pl);
    }
}

initializeYtListLocalStorage();

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
	height: '390',
	width: '640',
	/*videoId: 'sCG0SBAeoV0', //bootstrapvideo*/
	events: {
	    'onReady': onPlayerReady,
	    'onStateChange': onPlayerStateChange
	}
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    //hook up event to play next button
    var nextButton = document.getElementById("next");
    playNext();
    nextButton.onclick=playNext;
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    /*play next in da loop*/
    if( event.data == YT.PlayerState.ENDED ) {
	playNext();
    }
}

function stopVideo() {
  player.stopVideo();
}

