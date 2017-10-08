define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Utils;
    (function (Utils) {
        function getOffset(el) {
            var _x = el.getBoundingClientRect().left + document.body.scrollLeft;
            var _y = el.getBoundingClientRect().top + document.body.scrollTop;
            var _w = el.offsetWidth;
            var _h = el.offsetHeight;
            return { top: _y, left: _x, width: _w, height: _h };
        }
        Utils.getOffset = getOffset;
    })(Utils = exports.Utils || (exports.Utils = {}));
});
