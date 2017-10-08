export module Utils {
    export function getOffset(el) {		//x,y distance from left and top margins including scrolling of page, also returning width and height
        var _x = el.getBoundingClientRect().left + document.body.scrollLeft;
        var _y = el.getBoundingClientRect().top + document.body.scrollTop;
        var _w = el.offsetWidth;
        var _h = el.offsetHeight;
        return { top: _y, left: _x, width: _w, height: _h };
    }
}