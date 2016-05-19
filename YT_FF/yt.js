function YTVideo(id, startSec, quality)
{
    this.id = id;
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
	img.width = img.height = 128;
	pl.appendChild(img);
    }
}

function initializeYtList()
{
    var query = window.location.search.substring(1);
    console.log("query=" + query);
    var videoIds = query.substring(query.indexOf("=")+1).split("&");
    console.log("videoIds:" + videoIds);
    for( var i = 0; i < videoIds.length; i++ )
    {
	yt.push( new YTVideo( videoIds[i] ) );
    }
    createThumbnails(yt);
}

function playNext()
{
    var nextVideo = yt[++cur%yt.length];
    player.cueVideoById(nextVideo.id, nextVideo.startSec, nextVideo.quality);
    player.playVideo();

    //pop img-top, push to the end
    if( cur > 0 )
    {
	var pl = document.getElementById("playerList");
	var fc = pl.removeChild(pl.firstChild);
	pl.appendChild(fc);
    }
}

initializeYtList();

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
	videoId: 'sCG0SBAeoV0', //bootstrapvideo
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

