var selected = {
    el: document.body,
};
var newEl = null; //element that is being created
var Clipboard = null; // for copy or cut
var mouseDown = {
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
var editor = document.getElementById('editor');
var Keyboard;
