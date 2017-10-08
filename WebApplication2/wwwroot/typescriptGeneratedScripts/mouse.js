define(["require", "exports", "./globalVars", "./functions", "./keys"], function (require, exports, globalVars_1, functions_1, keys_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Mouse;
    (function (Mouse) {
        document.body.onmousedown = function (e) {
            if (e.which != 1)
                return; //if is not left click return, if is start creating element
            globalVars_1.GlobalVars.newEl = document.createElement(document.getElementById('whichTag').value);
            globalVars_1.GlobalVars.newEl.style.border = "dotted 1px black";
            globalVars_1.GlobalVars.newEl.style.position = 'absolute';
            globalVars_1.GlobalVars.newEl.style.left = e.pageX - functions_1.Functions.getOffset(globalVars_1.GlobalVars.selected.el).left;
            globalVars_1.GlobalVars.newEl.style.top = e.pageY - functions_1.Functions.getOffset(globalVars_1.GlobalVars.selected.el).top;
            globalVars_1.GlobalVars.newEl.id = functions_1.Functions.generateUniqueId();
            functions_1.Functions.attachHandlersToNewCreatedElement(globalVars_1.GlobalVars.newEl);
            globalVars_1.GlobalVars.selected.el.appendChild(globalVars_1.GlobalVars.newEl);
            globalVars_1.GlobalVars.mouseDown.startX = e.pageX;
            globalVars_1.GlobalVars.mouseDown.startY = e.pageY;
            var selectedId = globalVars_1.GlobalVars.selected.el.nodeName.toLowerCase() == "body" ? "" : globalVars_1.GlobalVars.selected.el.id;
            window['myHubProxy'].invoke("addElement", functions_1.Functions.getOterHtmlForElement(globalVars_1.GlobalVars.newEl), selectedId);
        };
        document.body.onmousemove = function (ev) {
            if (ev.which != 1)
                return;
            var whatToChange = (functions_1.Functions.el('radR1').checked ? globalVars_1.GlobalVars.selected.el.style : globalVars_1.GlobalVars.selected.el);
            if (globalVars_1.GlobalVars.newEl != null) {
                var newWhatToChange = (functions_1.Functions.el('radR1').checked ? globalVars_1.GlobalVars.newEl.style : globalVars_1.GlobalVars.newEl);
                newWhatToChange.width = ev.pageX - globalVars_1.GlobalVars.mouseDown.startX;
                if (keys_1.Keyboard.Keyboard.keyToBool['SHIFT'])
                    newWhatToChange.height = globalVars_1.GlobalVars.newEl.style.width;
                else
                    newWhatToChange.height = ev.pageY - globalVars_1.GlobalVars.mouseDown.startY;
            }
            if (globalVars_1.GlobalVars.mouseDown.leftTop) {
                if (keys_1.Keyboard.Keyboard.keyToBool['SHIFT']) {
                    globalVars_1.GlobalVars.selected.el.style.left = (ev.pageX - functions_1.Functions.getOffset(globalVars_1.GlobalVars.selected.el.parentElement).left) + "px";
                    globalVars_1.GlobalVars.selected.el.style.top = (ev.pageX - globalVars_1.GlobalVars.mouseDown.startX + globalVars_1.GlobalVars.mouseDown.startY - globalVars_1.GlobalVars.selected.el.parentElement.offsetTop) + "px";
                    whatToChange.width = (globalVars_1.GlobalVars.mouseDown.startWidth - (ev.pageX - globalVars_1.GlobalVars.mouseDown.startX)) + "px";
                    whatToChange.height = (globalVars_1.GlobalVars.mouseDown.startHeight - globalVars_1.GlobalVars.mouseDown.startWidth + parseInt(whatToChange.width)) + "px";
                }
                else {
                    globalVars_1.GlobalVars.selected.el.style.left = (ev.pageX - functions_1.Functions.getOffset(globalVars_1.GlobalVars.selected.el.parentElement).left) + "px";
                    globalVars_1.GlobalVars.selected.el.style.top = (ev.pageY - functions_1.Functions.getOffset(globalVars_1.GlobalVars.selected.el.parentElement).top) + "px";
                    whatToChange.width = (globalVars_1.GlobalVars.mouseDown.startWidth - (ev.pageX - globalVars_1.GlobalVars.mouseDown.startX)) + "px";
                    whatToChange.height = (globalVars_1.GlobalVars.mouseDown.startHeight - (ev.pageY - globalVars_1.GlobalVars.mouseDown.startY)) + "px";
                }
                functions_1.Functions.fixReplace(globalVars_1.GlobalVars.selected.el);
            }
            if (globalVars_1.GlobalVars.mouseDown.rightBottom) {
                if (keys_1.Keyboard.Keyboard.keyToBool['SHIFT']) {
                    whatToChange.width = (globalVars_1.GlobalVars.mouseDown.startWidth + ev.pageX - globalVars_1.GlobalVars.mouseDown.startX) + "px";
                    whatToChange.height = (globalVars_1.GlobalVars.mouseDown.startHeight + parseInt(whatToChange.width) - globalVars_1.GlobalVars.mouseDown.startWidth) + "px";
                }
                else {
                    whatToChange.width = (globalVars_1.GlobalVars.mouseDown.startWidth + ev.pageX - globalVars_1.GlobalVars.mouseDown.startX) + "px";
                    whatToChange.height = (globalVars_1.GlobalVars.mouseDown.startHeight + ev.pageY - globalVars_1.GlobalVars.mouseDown.startY) + "px";
                }
                functions_1.Functions.fixReplace(globalVars_1.GlobalVars.selected.el);
            }
            if (globalVars_1.GlobalVars.mouseDown.replace) {
                globalVars_1.GlobalVars.selected.el.style.left = (ev.pageX - functions_1.Functions.getOffset(globalVars_1.GlobalVars.selected.el).width / 2 - functions_1.Functions.getOffset(globalVars_1.GlobalVars.selected.el.parentElement).left) + "px";
                globalVars_1.GlobalVars.selected.el.style.top = (ev.pageY - functions_1.Functions.getOffset(globalVars_1.GlobalVars.selected.el).height / 2 - functions_1.Functions.getOffset(globalVars_1.GlobalVars.selected.el.parentElement).top) + "px";
                functions_1.Functions.fixReplace(globalVars_1.GlobalVars.selected.el);
            }
            if (globalVars_1.GlobalVars.mouseDown.leftTopRot || globalVars_1.GlobalVars.mouseDown.rightBottomRot) {
                var deg = ev.pageX - globalVars_1.GlobalVars.mouseDown.startX;
                globalVars_1.GlobalVars.selected.el.style['transform'] = 'rotate(' + deg + 'deg)';
            }
            window['myHubProxy'].invoke("updateElement", functions_1.Functions.getOterHtmlForElement(globalVars_1.GlobalVars.newEl || globalVars_1.GlobalVars.selected.el));
        };
        document.body.onmouseup = function (ev) {
            var distanceX = Math.abs(globalVars_1.GlobalVars.mouseDown.startX - ev.pageX); //measuring distance
            var distanceY = Math.abs(globalVars_1.GlobalVars.mouseDown.startY - ev.pageY);
            if (distanceX * distanceY < 2000 && globalVars_1.GlobalVars.newEl != null) {
                globalVars_1.GlobalVars.selected.el.removeChild(globalVars_1.GlobalVars.newEl);
                window['myHubProxy'].invoke("removeElement", globalVars_1.GlobalVars.newEl.id);
            }
            globalVars_1.GlobalVars.mouseDown.leftTop =
                globalVars_1.GlobalVars.mouseDown.leftTopRot =
                    globalVars_1.GlobalVars.mouseDown.rightBottom =
                        globalVars_1.GlobalVars.mouseDown.rightBottomRot =
                            globalVars_1.GlobalVars.mouseDown.replace =
                                false;
            globalVars_1.GlobalVars.newEl = null;
        };
        document.body.oncontextmenu = function (ev) {
            ev.preventDefault(); //we dont want menu to appear
            if (ev.which == 3) {
                functions_1.Functions.changeSelection(document.body);
            }
        };
        document.body.ondragstart = function () { return false; }; // draggig is causing bugs
        document.getElementById('leftTop').onmousedown =
            document.getElementById('rightBottom').onmousedown =
                document.getElementById('leftTopRot').onmousedown =
                    document.getElementById('rightBottomRot').onmousedown =
                        document.getElementById('replace').onmousedown =
                            function (e) {
                                e.stopPropagation();
                                if (e.which != 1)
                                    return;
                                globalVars_1.GlobalVars.mouseDown[this.id] = true;
                                globalVars_1.GlobalVars.mouseDown.startWidth = functions_1.Functions.getOffset(globalVars_1.GlobalVars.selected.el).width;
                                globalVars_1.GlobalVars.mouseDown.startHeight = functions_1.Functions.getOffset(globalVars_1.GlobalVars.selected.el).height;
                                globalVars_1.GlobalVars.mouseDown.startX = e.pageX;
                                globalVars_1.GlobalVars.mouseDown.startY = e.pageY;
                            };
        functions_1.Functions.el('radR1').onchange =
            functions_1.Functions.el('radR2').onchange = function () {
                if (functions_1.Functions.el('radR1').checked) {
                    globalVars_1.GlobalVars.selected.el.style.width = globalVars_1.GlobalVars.selected.el['width'];
                    globalVars_1.GlobalVars.selected.el.style.height = globalVars_1.GlobalVars.selected.el['height'];
                    globalVars_1.GlobalVars.selected.el.removeAttribute('width');
                    globalVars_1.GlobalVars.selected.el.removeAttribute('height');
                }
                else {
                    globalVars_1.GlobalVars.selected.el['width'] = parseInt(globalVars_1.GlobalVars.selected.el.style.width);
                    globalVars_1.GlobalVars.selected.el['height'] = parseInt(globalVars_1.GlobalVars.selected.el.style.height);
                    globalVars_1.GlobalVars.selected.el.style.width = null;
                    globalVars_1.GlobalVars.selected.el.style.height = null;
                }
            };
    })(Mouse = exports.Mouse || (exports.Mouse = {}));
});
