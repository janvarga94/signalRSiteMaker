define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GlobalVars;
    (function (GlobalVars) {
        GlobalVars.selected = {
            el: document.body,
        };
        GlobalVars.newEl = null; //element that is being created
        GlobalVars.Clipboard = null; // for copy or cut
        GlobalVars.mouseDown = {
            startX: null,
            startY: null,
            startWidth: 0,
            startHeight: 0,
            leftTop: false,
            rightBottom: false,
            leftTopRot: false,
            rightBottomRot: false,
            replace: false
        };
    })(GlobalVars = exports.GlobalVars || (exports.GlobalVars = {}));
});
