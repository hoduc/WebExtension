console.log("hello injected");
var LEFT_ARROW = 74;
var RIGHT_ARROW = 76;
var UP_ARROW = 73;
var DOWN_ARROW = 75;
var yScrollPixel = 30; //y-scroll pixel


document.onkeydown = keyPressHandler;

var arrowKeys = [LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW];

var arrowHandler =
[
	function(){
	    clickArrow("backward-arrow");
        },

        function(){
	    clickArrow("forward-arrow");
        },

        function(){
	    scrollY(-yScrollPixel);
	},
    
        function(){
	    scrollY(yScrollPixel);
	}
];

function scrollY(yPixel)
{
    window.scrollBy(0,yPixel);
}

function getArrowNode(className)
{
    var node = document.getElementsByClassName( className );
    console.log(node);
    if ( node.length > 0 )
	return node[0];
    return null;
}

function clickArrow(className)
{
    var node = getArrowNode(className);
    if ( node )
    {
	console.log(node);
	node.click();
    }
    else
    {
	console.log( "node:" + className + ": notfound!!!" );
    }
}

function keyPressHandler(e)
{
    console.log("keydown");
    console.log("keycode:" + e.keyCode);
    for( var i = 0 ; i < arrowKeys.length; i++ )
    {
	if ( arrowKeys[i] == e.keyCode )
	{
	    arrowHandler[i].apply();
	    break;
	}
    }
	
}
