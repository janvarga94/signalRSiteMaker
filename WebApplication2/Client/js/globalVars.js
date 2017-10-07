var selected = {				
	el: document.body,			//selected element
};
var	newEl=null;				 //element that is being created
var Clipboard=null;  // for copy or cut
var mouseDown={				//what have we clicked	
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
var editor=document.getElementById('editor');
var Keyboard;
