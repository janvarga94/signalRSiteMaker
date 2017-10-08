define(["require", "exports", "./globalVars", "./editor", "./functions"], function (require, exports, globalVars_1, editor_1, functions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Keyboard;
    (function (Keyboard_1) {
        Keyboard_1.Keyboard = new function () {
            var v1 = ["", "", "", "CANCEL", "", "", "HELP", "", "BACK_SPACE", "TAB", "", "", "CLEAR", "ENTER", "RETURN", "", "SHIFT", "CONTROL", "ALT", "PAUSE", "CAPS_LOCK", "KANA", "EISU", "JUNJA", "FINAL", "HANJA", "", "ESCAPE", "CONVERT", "NONCONVERT", "ACCEPT", "MODECHANGE", "SPACE", "PAGE_UP", "PAGE_DOWN", "END", "HOME", "LEFT", "UP", "RIGHT", "DOWN", "SELECT", "PRINT", "EXECUTE", "PRINTSCREEN", "INSERT", "DELETE", "", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "COLON", "SEMICOLON", "LESS_THAN", "EQUALS", "GREATER_THAN", "QUESTION_MARK", "AT", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "WIN", "", "CONTEXT_MENU", "", "SLEEP", "NUMPAD0", "NUMPAD1", "NUMPAD2", "NUMPAD3", "NUMPAD4", "NUMPAD5", "NUMPAD6", "NUMPAD7", "NUMPAD8", "NUMPAD9", "MULTIPLY", "ADD", "SEPARATOR", "SUBTRACT", "DECIMAL", "DIVIDE", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "", "", "", "", "", "", "", "", "NUM_LOCK", "SCROLL_LOCK", "WIN_OEM_FJ_JISHO", "WIN_OEM_FJ_MASSHOU", "WIN_OEM_FJ_TOUROKU", "WIN_OEM_FJ_LOYA", "WIN_OEM_FJ_ROYA", "", "", "", "", "", "", "", "", "", "CIRCUMFLEX", "EXCLAMATION", "DOUBLE_QUOTE", "HASH", "DOLLAR", "PERCENT", "AMPERSAND", "UNDERSCORE", "OPEN_PAREN", "CLOSE_PAREN", "ASTERISK", "PLUS", "PIPE", "HYPHEN_MINUS", "OPEN_CURLY_BRACKET", "CLOSE_CURLY_BRACKET", "TILDE", "", "", "", "", "VOLUME_MUTE", "VOLUME_DOWN", "VOLUME_UP", "", "", "SEMICOLON", "EQUALS", "COMMA", "MINUS", "PERIOD", "SLASH", "BACK_QUOTE", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "OPEN_BRACKET", "BACK_SLASH", "CLOSE_BRACKET", "QUOTE", "", "META", "ALTGR", "", "WIN_ICO_HELP", "WIN_ICO_00", "", "WIN_ICO_CLEAR", "", "", "WIN_OEM_RESET", "WIN_OEM_JUMP", "WIN_OEM_PA1", "WIN_OEM_PA2", "WIN_OEM_PA3", "WIN_OEM_WSCTRL", "WIN_OEM_CUSEL", "WIN_OEM_ATTN", "WIN_OEM_FINISH", "WIN_OEM_COPY", "WIN_OEM_AUTO", "WIN_OEM_ENLW", "WIN_OEM_BACKTAB", "ATTN", "CRSEL", "EXSEL", "EREOF", "PLAY", "ZOOM", "", "PA1", "WIN_OEM_CLEAR", ""];
            var v2 = new Array(v1.length);
            var v3 = new Object(v1.length);
            var v4 = new Object(v1.length);
            for (var i = 0; i < v1.length; i++) {
                v3[v1[i]] = i;
                v2[i] = false;
                v4[v1[i]] = false;
            }
            this.numToKey = v1;
            this.numToBool = v2;
            this.keyToBool = v4;
            this.keyToNum = v3;
            this.toTrue = function (num) {
                if (num > 255)
                    return;
                this.numToBool[num] = true;
                this.keyToBool[v1[num]] = true;
            };
            this.toFalse = function (num) {
                if (num > 255)
                    return;
                this.numToBool[num] = false;
                this.keyToBool[v1[num]] = false;
            };
        }();
        document.onkeydown = function (e) {
            Keyboard_1.Keyboard.toTrue(e.which);
            //e.preventDefault();
            if (Keyboard_1.Keyboard.keyToBool["DELETE"]) {
                if (globalVars_1.GlobalVars.selected.el != document.body) {
                    window['myHubProxy'].invoke("removeElement", globalVars_1.GlobalVars.selected.el.id);
                    var parent = globalVars_1.GlobalVars.selected.el.parentElement;
                    parent.removeChild(globalVars_1.GlobalVars.selected.el);
                    functions_1.Functions.changeSelection(parent);
                }
            }
            if (Keyboard_1.Keyboard.keyToBool["INSERT"]) {
                if (editor_1.Editor.editor.style.visibility == 'visible')
                    editor_1.Editor.editor.style.visibility = 'hidden'; // Insert button means show or hide options
                else
                    editor_1.Editor.editor.style.visibility = 'visible';
            }
            if (Keyboard_1.Keyboard.keyToBool['CONTROL'] && Keyboard_1.Keyboard.keyToBool['C']) {
                if (globalVars_1.GlobalVars.selected.el != document.body)
                    globalVars_1.GlobalVars.Clipboard = globalVars_1.GlobalVars.selected.el.outerHTML;
            }
            if (Keyboard_1.Keyboard.keyToBool['CONTROL'] && Keyboard_1.Keyboard.keyToBool['X']) {
                if (globalVars_1.GlobalVars.selected.el != document.body) {
                    globalVars_1.GlobalVars.Clipboard = globalVars_1.GlobalVars.selected.el.outerHTML;
                    var parent = globalVars_1.GlobalVars.selected.el.parentElement;
                    parent.removeChild(globalVars_1.GlobalVars.selected.el);
                    functions_1.Functions.changeSelection(parent);
                }
            }
            if (Keyboard_1.Keyboard.keyToBool['CONTROL'] && Keyboard_1.Keyboard.keyToBool['V']) {
                if (globalVars_1.GlobalVars.Clipboard != null) {
                    var div = document.createElement('div');
                    div.innerHTML = globalVars_1.GlobalVars.Clipboard;
                    var elementToPaste = div.childNodes[0];
                    elementToPaste['id'] = functions_1.Functions.generateUniqueId();
                    functions_1.Functions.attachHandlersToNewCreatedElement(elementToPaste);
                    globalVars_1.GlobalVars.selected.el.appendChild(elementToPaste);
                    var selectedId = globalVars_1.GlobalVars.selected.el.nodeName.toLowerCase() == "body" ? "" : globalVars_1.GlobalVars.selected.el.id;
                    window['myHubProxy'].invoke("addElement", functions_1.Functions.getOterHtmlForElement(elementToPaste), selectedId);
                }
            }
            if (Keyboard_1.Keyboard.keyToBool['SHIFT'] && Keyboard_1.Keyboard.keyToBool['S']) {
                functions_1.Functions.exportProject('yourProject.html');
            }
        };
        document.onkeyup = function (e) {
            var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
            Keyboard_1.Keyboard.toFalse(charCode);
        };
    })(Keyboard = exports.Keyboard || (exports.Keyboard = {}));
});