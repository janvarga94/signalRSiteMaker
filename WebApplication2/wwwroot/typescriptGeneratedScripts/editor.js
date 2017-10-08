//editor is visible after pressing "INSERT" button, so all that appear is considered as editor
define(["require", "exports", "./globalVars", "./functions"], function (require, exports, globalVars_1, functions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Editor;
    (function (Editor) {
        Editor.editor = document.getElementById('editor');
        Editor.editor.onmousedown = function (ev) { ev.stopPropagation(); };
        Editor.editor.onmousemove = function (ev) { ev.stopPropagation(); };
        Editor.editor.onkeydown = function (ev) { ev.stopPropagation(); };
        Editor.editor.oncontextmenu = function (ev) { ev.stopPropagation(); };
        Editor.editor.onmouseup = function (ev) { ev.stopPropagation(); };
        Editor.editor.sh1 = document.getElementById('sh1');
        Editor.editor.sh2 = document.getElementById('sh2');
        Editor.editor.sh3 = document.getElementById('sh3');
        Editor.editor.sh4 = document.getElementById('sh4');
        Editor.editor.csh = document.getElementById('csh');
        Editor.editor.setStyle = document.getElementById('setStyle');
        Editor.editor.setAttr = document.getElementById('setAttr');
        Editor.editor.text = document.getElementById('text');
        Editor.editor.sh1.oninput =
            Editor.editor.sh2.oninput =
                Editor.editor.sh3.oninput =
                    Editor.editor.sh4.oninput =
                        Editor.editor.csh.oninput =
                            function () {
                                globalVars_1.GlobalVars.selected.el.style['box-shadow'] = Editor.editor.sh1.value + 'px ' + Editor.editor.sh2.value + 'px ' + Editor.editor.sh3.value + 'px ' + Editor.editor.sh4.value + 'px ' + Editor.editor.csh.value;
                            };
        Editor.editor.setStyle.oninput = function (e) {
            var arr = this.value.replace(';', '').split(":");
            globalVars_1.GlobalVars.selected.el.style[arr[0]] = arr[1];
        };
        Editor.editor.onkeydown = function (e) {
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            if (charCode == 13) {
                Editor.editor.setStyle.value = "";
                Editor.editor.setAttr.value = "";
            }
        };
        Editor.editor.setAttr.oninput = function (e) {
            var arr = this.value.replace(/\"/g, '').split("=");
            if (arr[1] == 'undefined' || arr[1] == null)
                arr[1] = 'asd'; // if we have image than we clear size so that image would be in original resolution
            if (arr[1].indexOf('.png') > -1 ||
                arr[1].indexOf('.jpg') > -1 ||
                arr[1].indexOf('.gif') > -1 ||
                arr[1].indexOf('.ico') > -1 ||
                arr[1].indexOf('.bmp') > -1 ||
                arr[1].indexOf('.tiff') > -1) {
                globalVars_1.GlobalVars.selected.el.removeAttribute('width');
                globalVars_1.GlobalVars.selected.el.removeAttribute('height');
                globalVars_1.GlobalVars.selected.el.style.width = null;
                globalVars_1.GlobalVars.selected.el.style.height = null;
                globalVars_1.GlobalVars.selected.el[arr[0]] = arr[1];
                functions_1.Functions.fixReplace(globalVars_1.GlobalVars.selected.el);
            }
        };
        Editor.editor.text.oninput = function () {
            if (globalVars_1.GlobalVars.selected.el != document.body) {
                var child = globalVars_1.GlobalVars.selected.el.firstChild;
                while (child) {
                    var nextChild = child.nextSibling;
                    if (child.nodeType === 3) {
                        globalVars_1.GlobalVars.selected.el.removeChild(child);
                    }
                    child = nextChild;
                }
                globalVars_1.GlobalVars.selected.el.appendChild(document.createTextNode(this.value));
            }
        };
        //now aligns
        functions_1.Functions.el('elAlignLeft').onclick = function (e) {
            e.stopPropagation();
            functions_1.Functions.elAlignLeft();
        };
        functions_1.Functions.el('elAlignCenter').onclick = function (e) {
            e.stopPropagation();
            functions_1.Functions.elAlignCenter();
        };
        functions_1.Functions.el('elAlignRight').onclick = function (e) {
            e.stopPropagation();
            functions_1.Functions.elAlignRight();
        };
        functions_1.Functions.el('TextAlignLeft').onclick = function (e) {
            e.stopPropagation();
            globalVars_1.GlobalVars.selected.el.style['text-align'] = "left";
        };
        functions_1.Functions.el('TextAlignCenter').onclick = function (e) {
            e.stopPropagation();
            globalVars_1.GlobalVars.selected.el.style['text-align'] = "center";
        };
        functions_1.Functions.el('TextAlignRight').onclick = function (e) {
            e.stopPropagation();
            globalVars_1.GlobalVars.selected.el.style['text-align'] = "right";
        };
        // enter will delete value of inputs for style and or attribute
    })(Editor = exports.Editor || (exports.Editor = {}));
});
