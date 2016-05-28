console.log("hello injected");
var LEFT_ARROW = 74;
var RIGHT_ARROW = 76;

document.onkeydown = keyPressHandler;

var arrowKeys = [LEFT_ARROW, RIGHT_ARROW];
var arrowHandler =
[
	function(){
	            clickArrow("backward-arrow");
                 },

        function(){
	            clickArrow("forward-arrow");
                  }
    
];

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
    alert("keycode:" + e.keyCode);
    for( var i = 0 ; i < arrowKeys.length; i++ )
    {
	if ( arrowKeys[i] == e.keyCode )
	{
	    arrowHandler[i].apply();
	    break;
	}
    }
	
}
