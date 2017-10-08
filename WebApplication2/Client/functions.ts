import { GlobalVars } from './globalVars';

export module Functions {

    export function el(id) {
        return document.getElementById(id);
    }
    export function changeSelection(newSelected) {
        GlobalVars.selected = {
            el: newSelected,
        };
        fixReplace(newSelected);
        editChangeSelection();
    }
    export function fixReplace(newSelected) {   //fixing replace brackets on newSelected element
        var leftTop = document.getElementById('leftTop'),
            rightBottom = document.getElementById('rightBottom'),
            leftTopRot = document.getElementById('leftTopRot'),
            rightBottomRot = document.getElementById('rightBottomRot'),
            replace = document.getElementById('replace');

        if (newSelected == document.body) {
            leftTop.style.left = '-100px';
            rightBottom.style.left = '-100px';
            leftTopRot.style.left = '-100px';
            rightBottomRot.style.left = '-100px';
            replace.style.left = '-100px';
            return;
        }
        leftTop.style.left = (getOffset(newSelected).left - 7) + 'px';
        leftTop.style.top = (getOffset(newSelected).top - 7) + 'px';

        rightBottom.style.left = (getOffset(newSelected).left + getOffset(newSelected).width - 23) + 'px';
        rightBottom.style.top = (getOffset(newSelected).top + getOffset(newSelected).height - 23) + 'px';

        leftTopRot.style.left = (getOffset(newSelected).left - 24) + 'px';
        leftTopRot.style.top = (getOffset(newSelected).top - 24) + 'px';

        rightBottomRot.style.left = (getOffset(newSelected).left + getOffset(newSelected).width - 6) + 'px';
        rightBottomRot.style.top = (getOffset(newSelected).top + getOffset(newSelected).height - 6) + 'px';

        replace.style.left = (getOffset(newSelected).left + getOffset(newSelected).width / 2 - 20) + 'px';
        replace.style.top = (getOffset(newSelected).top + getOffset(newSelected).height / 2 - 20) + 'px';
    }

    var text = document.getElementById('text');

    export function editChangeSelection() {								//after changeing selection of element, we do this
        GlobalVars.selected.el == document.body ? text.setAttribute('disabled', 'true') : text.removeAttribute('disabled');
        if (GlobalVars.selected.el != document.body) {
            var helpText = "";
            var child = GlobalVars.selected.el.firstChild;
            while (child) {
                if (child.nodeType === 3) { // nodeType === Node.TEXT_NODE
                    helpText += child.nodeValue;
                }
                child = child.nextSibling;
            }
            text.appendChild(document.createTextNode(helpText));
        } else
            text.innerHTML = "";
        //now we set values to range which represents shadows
        var shadow = window.getComputedStyle(GlobalVars.selected.el)['box-shadow'];
        if (shadow != 'none') {
            var color = shadow.substring(0, shadow.indexOf(')') + 1);
            var shadows = shadow.substring(shadow.indexOf(')') + 1).trim();
            var arr = shadows.split(' ');
           /* sh1.value = parseInt(arr[0]);
            sh2.value = parseInt(arr[1]);
            sh3.value = parseInt(arr[2]);
            sh4.value = parseInt(arr[3]);*/
        } else {
          /*  sh1.value = 0;
            sh2.value = 0;
            sh3.value = 0;
            sh4.value = 0;*/
        }
    }
    export function getOffset(el) {		//x,y distance from left and top margins including scrolling of page, also returning width and height
        var _x = el.getBoundingClientRect().left + document.body.scrollLeft;
        var _y = el.getBoundingClientRect().top + document.body.scrollTop;
        var _w = el.offsetWidth;
        var _h = el.offsetHeight;
        return { top: _y, left: _x, width: _w, height: _h };
    }
    export function elAlignLeft() {
        GlobalVars.selected.el.style['position'] = 'absolute';
        GlobalVars.selected.el.style.left = '0px';
        fixReplace(GlobalVars.selected.el);
    }
    export function elAlignCenter() {
        GlobalVars.selected.el.style['position'] = 'absolute';
        var parentWidth = parseInt(window.getComputedStyle(GlobalVars.selected.el.parentElement).width);
        var elWidth = parseInt(window.getComputedStyle(GlobalVars.selected.el).width);
        GlobalVars.selected.el.style.left = (parentWidth / 2 - elWidth / 2) + "px";
        fixReplace(GlobalVars.selected.el);
    }
    export function elAlignRight() {
        GlobalVars.selected.el.style['position'] = 'absolute';
        var parentWidth = parseInt(window.getComputedStyle(GlobalVars.selected.el.parentElement).width);
        var elWidth = parseInt(window.getComputedStyle(GlobalVars.selected.el).width);
        GlobalVars.selected.el.style.left = (parentWidth - elWidth) + "px";
        fixReplace(GlobalVars.selected.el);
    }
    export function exportProject(filename) { // ctrl+s is save project, shift+s is export
        var saveEngine = document.getElementById("engine");
        document.body.removeChild(document.getElementById('engine'));
        var text = '<html><head></head>' + document.body.outerHTML + '</html>';
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);
        pom.click();

        if (document.body.innerHTML.replace(" ", "") == "")
            document.body.appendChild(saveEngine);
        else
            document.body.insertBefore(saveEngine, document.body.firstChild);
    }


    export function getOterHtmlForElement(target) {
        var wrap = document.createElement('div');
        wrap.appendChild(target.cloneNode(true));
        return wrap.innerHTML;
    }


    export function attachHandlersToNewCreatedElement(element) {
        element.oncontextmenu = function (ev) {						//so that we could select it
            ev.stopPropagation();
            ev.preventDefault();
            if (ev.which == 3) {
                changeSelection(this);
            }
            return false;
        };
    }

    export function generateUniqueId() {
        return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    }

}