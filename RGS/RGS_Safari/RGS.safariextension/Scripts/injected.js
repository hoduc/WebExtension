console.log("hello google search injected");

function createContextItem(event)
{
    // console.log(event.target.textContent);
    // console.log(window.getSelection());
    var sel = window.getSelection();
    var begin = sel.anchorOffset;
    var end = sel.focusOffset;
    var selectedText = sel.toString();
    console.log("selected : " + selectedText);
    safari.self.tab.setContextMenuEventUserInfo( event, selectedText );
}

document.addEventListener("contextmenu", createContextItem,false);
