	//editor is visible after pressing "INSERT" button, so all that appear is considered as editor

import { GlobalVars } from './globalVars'
import { Functions } from './functions'

export module Editor {

    export var editor: any;

    editor = document.getElementById('editor');

    editor.onmousedown = function (ev) { ev.stopPropagation(); }
    editor.onmousemove = function (ev) { ev.stopPropagation(); }
    editor.onkeydown = function (ev) { ev.stopPropagation(); }
    editor.oncontextmenu = function (ev) { ev.stopPropagation(); }
    editor.onmouseup = function (ev) { ev.stopPropagation(); }
        editor.sh1 = document.getElementById('sh1');
	    editor.sh2=document.getElementById('sh2');
	    editor.sh3=document.getElementById('sh3');
	    editor.sh4=document.getElementById('sh4');
	    editor.csh=document.getElementById('csh');
	    editor.setStyle=document.getElementById('setStyle');
	    editor.setAttr=document.getElementById('setAttr');
	    editor.text=document.getElementById('text');

	    editor.sh1.oninput=
	    editor.sh2.oninput=
	    editor.sh3.oninput=
	    editor.sh4.oninput=
	    editor.csh.oninput=    
				    function(){
					    GlobalVars.selected.el.style['box-shadow']=editor.sh1.value+'px '+editor.sh2.value+'px '+editor.sh3.value+'px '+editor.sh4.value+'px '+editor.csh.value;
				    }	

	    editor.setStyle.oninput=function(e){
		    var arr=this.value.replace(';','').split(":");
		    GlobalVars.selected.el.style[arr[0]]=arr[1];	
	    }
	    editor.onkeydown=function(e){
		    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
		    if(charCode==13){
			    editor.setStyle.value="";
			    editor.setAttr.value="";
		    }
	    }
        editor.setAttr.oninput=function(e){
    	    var arr=this.value.replace(/\"/g,'').split("=");
		    if(arr[1]=='undefined' || arr[1]==null) arr[1]='asd';		// if we have image than we clear size so that image would be in original resolution
			    if(	arr[1].indexOf('.png')>-1 ||
				    arr[1].indexOf('.jpg')>-1 ||
				    arr[1].indexOf('.gif')>-1 ||
				    arr[1].indexOf('.ico')>-1 ||
				    arr[1].indexOf('.bmp')>-1 ||
				    arr[1].indexOf('.tiff')>-1 
			    ){
				    GlobalVars.selected.el.removeAttribute('width');
				    GlobalVars.selected.el.removeAttribute('height');
				    GlobalVars.selected.el.style.width=null;
				    GlobalVars.selected.el.style.height=null;
                    GlobalVars.selected.el[arr[0]] = arr[1];
                    Functions.fixReplace(GlobalVars.selected.el);
			    }
	    } 
	    editor.text.oninput=function(){										//insert text to div, algorithm for delete previous and write text in textarea
		    if(GlobalVars.selected.el!=document.body){
			    var child = GlobalVars.selected.el.firstChild;
			    while(child) {
				    var nextChild=child.nextSibling;
	    		    if (child.nodeType === 3) { // nodeType === Node.TEXT_NODE
	       		     GlobalVars.selected.el.removeChild(child);
	   		     }
		        child = nextChild;
			    }
			    GlobalVars.selected.el.appendChild(document.createTextNode(this.value));
		    }
	    }

																    //now aligns
    Functions.el('elAlignLeft').onclick=function(e){				
	    e.stopPropagation();
	    Functions.elAlignLeft();
    }
    Functions.el('elAlignCenter').onclick=function(e){
	    e.stopPropagation();
        Functions.elAlignCenter();
    }
    Functions.el('elAlignRight').onclick=function(e){
	    e.stopPropagation();
        Functions.elAlignRight();
    }
    Functions.el('TextAlignLeft').onclick=function(e){
	    e.stopPropagation();
	    GlobalVars.selected.el.style['text-align']="left";
    }
    Functions.el('TextAlignCenter').onclick=function(e){
	    e.stopPropagation();
	    GlobalVars.selected.el.style['text-align']="center";
    }
    Functions.el('TextAlignRight').onclick=function(e){
	    e.stopPropagation();
	    GlobalVars.selected.el.style['text-align']="right";
    }
																	    // enter will delete value of inputs for style and or attribute

}
