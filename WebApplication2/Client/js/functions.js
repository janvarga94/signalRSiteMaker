String.prototype.int = function(){
	return parseInt(this);
}
function el(id){
	return document.getElementById(id);
}
function changeSelection(newSelected){  
	selected={
		el: newSelected,
	};
	fixReplace(newSelected);		
	editChangeSelection();
}
function fixReplace(newSelected){   //fixing replace brackets on newSelected element
	var leftTop=document.getElementById('leftTop'),
		rightBottom=document.getElementById('rightBottom'),
		leftTopRot=document.getElementById('leftTopRot'),
		rightBottomRot=document.getElementById('rightBottomRot'),
		replace=document.getElementById('replace');

	if(newSelected==document.body){
		leftTop.style.left=-100;
		rightBottom.style.left=-100;
		leftTopRot.style.left=-100;
		rightBottomRot.style.left=-100;
		replace.style.left=-100;
		return;
	}
	leftTop.style.left=getOffset(newSelected).left-7;
	leftTop.style.top=getOffset(newSelected).top-7;

	rightBottom.style.left=getOffset(newSelected).left+getOffset(newSelected).width-23;
	rightBottom.style.top=getOffset(newSelected).top+getOffset(newSelected).height-23;

	leftTopRot.style.left=getOffset(newSelected).left-24;
	leftTopRot.style.top=getOffset(newSelected).top-24;

	rightBottomRot.style.left=getOffset(newSelected).left+getOffset(newSelected).width-6;
	rightBottomRot.style.top=getOffset(newSelected).top+getOffset(newSelected).height-6;

	replace.style.left=getOffset(newSelected).left+getOffset(newSelected).width/2 -20;
	replace.style.top=getOffset(newSelected).top+getOffset(newSelected).height/2 -20;
}
function editChangeSelection(){								//after changeing selection of element, we do this
	text.disabled=selected.el==document.body;
	if(selected.el!=document.body){	
		var helpText = "";
		var child = selected.el.firstChild;
		while(child) {
		    if (child.nodeType === 3) { // nodeType === Node.TEXT_NODE
		        helpText += child.nodeValue;
		    }
		    child = child.nextSibling;
		}
		text.value=helpText;
	}else
		text.value="";
																	//now we set values to range which represents shadows
	var shadow=window.getComputedStyle(selected.el)['box-shadow'];
	if(shadow!='none'){
		var color=shadow.substring(0,shadow.indexOf(')')+1);
		var shadows=shadow.substring(shadow.indexOf(')')+1).trim();
		var arr=shadows.split(' ');
		sh1.value=parseInt(arr[0]);
		sh2.value=parseInt(arr[1]);
		sh3.value=parseInt(arr[2]);
		sh4.value=parseInt(arr[3]);
	}else{
		sh1.value=0;
		sh2.value=0;
		sh3.value=0;
		sh4.value=0;
	}
}
function getOffset( el ) {		//x,y distance from left and top margins including scrolling of page, also returning width and height
    var _x=el.getBoundingClientRect().left + document.body.scrollLeft;
    var _y=el.getBoundingClientRect().top  + document.body.scrollTop;
    var _w = el.offsetWidth;
    var _h = el.offsetHeight;
    return { top: _y, left: _x,width: _w , height: _h };
}
function elAlignLeft(){
		selected.el.style['position'] = 'absolute';
		selected.el.style.left=0;
	fixReplace(selected.el);
}
function elAlignCenter(){	
		selected.el.style['position'] = 'absolute';
		var parentWidth=parseInt(window.getComputedStyle(selected.el.parentElement).width);
		var elWidth=parseInt(window.getComputedStyle(selected.el).width);
		selected.el.style.left=(parentWidth/2-elWidth/2) + "px";
	fixReplace(selected.el);
}
function elAlignRight(){
		selected.el.style['position'] = 'absolute';
		var parentWidth=parseInt(window.getComputedStyle(selected.el.parentElement).width);
		var elWidth=parseInt(window.getComputedStyle(selected.el).width);
		selected.el.style.left=(parentWidth-elWidth) + "px";
	fixReplace(selected.el);
}
function exportProject(filename){ // ctrl+s is save project, shift+s is export
	var saveEngine = document.getElementById("engine");
	document.body.removeChild(document.getElementById('engine'));
  var text='<html><head></head>'+document.body.outerHTML+'</html>';
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);
  pom.click();

  if(document.body.innerHTML.replace(" ","") == "")
  	document.body.appendChild(saveEngine);
  else
	document.body.insertBefore(saveEngine, document.body.firstChild);
}


function getOterHtmlForElement(target) {
    var wrap = document.createElement('div');
    wrap.appendChild(target.cloneNode(true));
    return wrap.innerHTML;
} 


function attachHandlersToNewCreatedElement(element) {
    element.oncontextmenu = function (ev) {						//so that we could select it
        ev.stopPropagation();
        ev.preventDefault();
        if (ev.which == 3) {
            changeSelection(this);
        }
        return false;
    };
}