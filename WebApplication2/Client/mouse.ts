import { GlobalVars } from './globalVars'
import { Functions } from './functions'
import { Keyboard } from './keys'

export module Mouse {

   
    document.body.onmousedown = function (e) {
        if (e.which != 1) return;				//if is not left click return, if is start creating element
        GlobalVars.newEl = document.createElement((<HTMLInputElement> document.getElementById('whichTag')).value);
        GlobalVars.newEl.style.border = "dotted 1px black";
        GlobalVars.newEl.style.position = 'absolute';
        GlobalVars.newEl.style.left = e.pageX - Functions.getOffset(GlobalVars.selected.el).left;
        GlobalVars.newEl.style.top = e.pageY - Functions.getOffset(GlobalVars.selected.el).top;
        GlobalVars.newEl.id = Functions.generateUniqueId();
        Functions.attachHandlersToNewCreatedElement(GlobalVars.newEl);
        GlobalVars.selected.el.appendChild(GlobalVars.newEl);
        GlobalVars.mouseDown.startX = e.pageX;
        GlobalVars.mouseDown.startY = e.pageY;
        var selectedId = GlobalVars.selected.el.nodeName.toLowerCase() == "body" ? "" : GlobalVars.selected.el.id;
        window['myHubProxy'].invoke("addElement", Functions.getOterHtmlForElement(GlobalVars.newEl), selectedId);
    }
    document.body.onmousemove = function (ev) {
        if (ev.which != 1) return;
        var whatToChange : any = ((<HTMLInputElement> Functions.el('radR1')).checked ? GlobalVars.selected.el.style : GlobalVars.selected.el);
        if (GlobalVars.newEl != null) { 			//if we are creating then change size with dragging
            var newWhatToChange = ((<HTMLInputElement>Functions.el('radR1')).checked ? GlobalVars.newEl.style : GlobalVars.newEl);
            newWhatToChange.width = ev.pageX - GlobalVars.mouseDown.startX;
            if (Keyboard.Keyboard.keyToBool['SHIFT'])	 //if is pressed shift that resize proportionally
                newWhatToChange.height = GlobalVars.newEl.style.width;
            else
                newWhatToChange.height = ev.pageY - GlobalVars.mouseDown.startY;
        }
        if (GlobalVars.mouseDown.leftTop) {		// if changing size with left top corner
            if (Keyboard.Keyboard.keyToBool['SHIFT']) { //if is pressed shift that resize proportionally
                GlobalVars.selected.el.style.left = (ev.pageX - Functions.getOffset(GlobalVars.selected.el.parentElement).left) + "px";
                GlobalVars.selected.el.style.top = (ev.pageX - GlobalVars.mouseDown.startX + GlobalVars.mouseDown.startY - GlobalVars.selected.el.parentElement.offsetTop) + "px";

                whatToChange.width = (GlobalVars.mouseDown.startWidth - (ev.pageX - GlobalVars.mouseDown.startX)) + "px";
                whatToChange.height = (GlobalVars.mouseDown.startHeight - GlobalVars.mouseDown.startWidth + parseInt(whatToChange.width)) + "px";
            } else {
                GlobalVars.selected.el.style.left = (ev.pageX - Functions.getOffset(GlobalVars.selected.el.parentElement).left) + "px";
                GlobalVars.selected.el.style.top = (ev.pageY - Functions.getOffset(GlobalVars.selected.el.parentElement).top) + "px";

                whatToChange.width = (GlobalVars.mouseDown.startWidth - (ev.pageX - GlobalVars.mouseDown.startX)) + "px";
                whatToChange.height = (GlobalVars.mouseDown.startHeight - (ev.pageY - GlobalVars.mouseDown.startY)) + "px";
            }
            Functions.fixReplace(GlobalVars.selected.el);
        }
        if (GlobalVars.mouseDown.rightBottom) {	// if changing size with right bottom corner
            if (Keyboard.Keyboard.keyToBool['SHIFT']) { //if is pressed shift that resize proportionally
                whatToChange.width = (GlobalVars.mouseDown.startWidth + ev.pageX - GlobalVars.mouseDown.startX) + "px";
                whatToChange.height = (GlobalVars.mouseDown.startHeight + parseInt(whatToChange.width) - GlobalVars.mouseDown.startWidth) + "px";
            } else {
                whatToChange.width = (GlobalVars.mouseDown.startWidth + ev.pageX - GlobalVars.mouseDown.startX) + "px";
                whatToChange.height = (GlobalVars.mouseDown.startHeight + ev.pageY - GlobalVars.mouseDown.startY) + "px";
            }
            Functions.fixReplace(GlobalVars.selected.el);
        }
        if (GlobalVars.mouseDown.replace) {		//if replacing
            GlobalVars.selected.el.style.left = (ev.pageX - Functions.getOffset(GlobalVars.selected.el).width / 2 - Functions.getOffset(GlobalVars.selected.el.parentElement).left) + "px";
            GlobalVars.selected.el.style.top = (ev.pageY - Functions.getOffset(GlobalVars.selected.el).height / 2 - Functions.getOffset(GlobalVars.selected.el.parentElement).top) + "px";

            Functions.fixReplace(GlobalVars.selected.el);
        }
        if (GlobalVars.mouseDown.leftTopRot || GlobalVars.mouseDown.rightBottomRot) {		//if rotating
            var deg = ev.pageX - GlobalVars.mouseDown.startX;
            GlobalVars.selected.el.style['transform'] = 'rotate(' + deg + 'deg)';
        }
        window['myHubProxy'].invoke("updateElement", Functions.getOterHtmlForElement(GlobalVars.newEl || GlobalVars.selected.el));
    }
    document.body.onmouseup = function (ev) {
        var distanceX = Math.abs(GlobalVars.mouseDown.startX - ev.pageX);			//measuring distance
        var distanceY = Math.abs(GlobalVars.mouseDown.startY - ev.pageY);

        if (distanceX * distanceY < 2000 && GlobalVars.newEl != null) {		//if surface is less that 2k px x px  that delete created element
            GlobalVars.selected.el.removeChild(GlobalVars.newEl);
            window['myHubProxy'].invoke("removeElement", GlobalVars.newEl.id);
        }

        GlobalVars.mouseDown.leftTop =
            GlobalVars.mouseDown.leftTopRot =
            GlobalVars.mouseDown.rightBottom =
            GlobalVars.mouseDown.rightBottomRot =
            GlobalVars.mouseDown.replace =
            false;
        GlobalVars.newEl = null;
    };
    document.body.oncontextmenu = function (ev) {
        ev.preventDefault();    //we dont want menu to appear
        if (ev.which == 3) {
            Functions.changeSelection(document.body);
        }
    };
    document.body.ondragstart = function () { return false; }  // draggig is causing bugs

    document.getElementById('leftTop').onmousedown =
        document.getElementById('rightBottom').onmousedown =
        document.getElementById('leftTopRot').onmousedown =
        document.getElementById('rightBottomRot').onmousedown =
        document.getElementById('replace').onmousedown =
        function (e) {
            e.stopPropagation();
            if (e.which != 1) return;
            GlobalVars.mouseDown[this.id] = true;
            GlobalVars.mouseDown.startWidth = Functions.getOffset(GlobalVars.selected.el).width;
            GlobalVars.mouseDown.startHeight = Functions.getOffset(GlobalVars.selected.el).height;
            GlobalVars.mouseDown.startX = e.pageX;
            GlobalVars.mouseDown.startY = e.pageY;
        }

    Functions.el('radR1').onchange =
        Functions.el('radR2').onchange = function () {						//switching sizes style and attr
            if ((<HTMLInputElement>Functions.el('radR1')).checked) {
                GlobalVars.selected.el.style.width = GlobalVars.selected.el['width'];
                GlobalVars.selected.el.style.height = GlobalVars.selected.el['height'];

                GlobalVars.selected.el.removeAttribute('width');
                GlobalVars.selected.el.removeAttribute('height');

            } else {
                GlobalVars.selected.el['width'] = parseInt(GlobalVars.selected.el.style.width);
                GlobalVars.selected.el['height'] = parseInt(GlobalVars.selected.el.style.height);


                GlobalVars.selected.el.style.width = null;
                GlobalVars.selected.el.style.height = null;
            }
        }


  
}