export module GlobalVars {

    export var selected = {
        el: document.body,			//selected element
    };
    export var newEl = null;				 //element that is being created
    export var Clipboard = null;  // for copy or cut
    export var mouseDown = {				//what have we clicked	
        startX: null,		//starting positions of element 	
        startY: null,
        startWidth: 0,
        startHeight: 0,
        leftTop: false,
        rightBottom: false,
        leftTopRot: false,
        rightBottomRot: false,
        replace: false
    };
    export var Keyboard;

}