	//editor is visible after pressing "INSERT" button, so all that appear is considered as editor

editor.onmousedown =
	editor.onmousemove=
	editor.onkeydown=
	editor.oncontextmenu=
	editor.onmouseup=		function(ev){
								ev.stopPropagation();
							}
	editor.sh1=document.getElementById('sh1');
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
					selected.el.style['box-shadow']=editor.sh1.value+'px '+editor.sh2.value+'px '+editor.sh3.value+'px '+editor.sh4.value+'px '+editor.csh.value;
				}	

	editor.setStyle.oninput=function(e){
		var arr=this.value.replace(';','').split(":");
		selected.el.style[arr[0]]=arr[1];	
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
				selected.el.removeAttribute('width');
				selected.el.removeAttribute('height');
				selected.el.style.width=null;
				selected.el.style.height=null;
				selected.el[arr[0]]=arr[1];
				fixReplace(selected.el);
			}
	} 
	editor.text.oninput=function(){										//insert text to div, algorithm for delete previous and write text in textarea
		if(selected.el!=document.body){
			var child = selected.el.firstChild;
			while(child) {
				var nextChild=child.nextSibling;
	    		if (child.nodeType === 3) { // nodeType === Node.TEXT_NODE
	       		 selected.el.removeChild(child);
	   		 }
		    child = nextChild;
			}
			selected.el.appendChild(document.createTextNode(this.value));
		}
	}

																	//now aligns
el('elAlignLeft').onclick=function(e){				
	e.stopPropagation();
	elAlignLeft();
}
el('elAlignCenter').onclick=function(e){
	e.stopPropagation();
	elAlignCenter();
}
el('elAlignRight').onclick=function(e){
	e.stopPropagation();
	elAlignRight();
}
el('TextAlignLeft').onclick=function(e){
	e.stopPropagation();
	selected.el.style['text-align']="left";
}
el('TextAlignCenter').onclick=function(e){
	e.stopPropagation();
	selected.el.style['text-align']="center";
}
el('TextAlignRight').onclick=function(e){
	e.stopPropagation();
	selected.el.style['text-align']="right";
}
																	// enter will delete value of inputs for style and or attribute


