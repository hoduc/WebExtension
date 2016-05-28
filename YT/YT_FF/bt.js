function loadXMLDoc(url, onDone) {
    var xmlhttp;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if(xmlhttp.status == 200){
               onDone(xmlhttp.responseText);
           }
           else if(xmlhttp.status == 400) {
              alert('There was an error 400')
           }
           else {
               alert('something else other than 200 was returned')
           }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function playRecommended()
{
    loadXMLDoc("recommended.html", onRecommendedReady);
}

function onRecommendedReady(doc)
{
    console.log(doc);
    var recommended = doc.getElementsByClassName("feed-item-dismissable")[1];
    var ids = [];
    var ll = recommended.getElementsByClassName("yt-lockup-thumbnail contains-addto");//each square of videos
    for( var i = 0 ; i < ll.length; i++ ){
	ids.push( ll[i].firstChild.href.split("=")[1]);
    }
    var test_link = "file:///Users/khiemho/Desktop/Programming/YT/YT_FF/test.html?v=";
    for( var i = 0 ; i < ids.length; i++ ){
	test_link += ids[i] + "&";
    }
    test_link = test_link.substring(0, test_link.lastIndexOf("&"));
    window.open(test_link, '_blank');
    window.focus;
}
