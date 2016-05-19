var fid = document.getElementsByClassName("feed-item-dismissable");
var recommended = fid[1];
var ids = [];
ll = recommended.getElementsByClassName("yt-lockup-thumbnail contains-addto");//each square of videos
for( var i = 0 ; i < ll.length; i++ ){ ids.push( ll[i].firstChild.href.split("=")[1]); }

test_link = "file:///Users/khiemho/Desktop/Programming/YT/YT_FF/test.html?v=";
for( var i = 0 ; i < ids.length; i++ ){ test_link += ids[i] + "&"; }
test_link = test_link.substring(0, test_link.lastIndexOf("&"))
//FF auto display th elink right now
