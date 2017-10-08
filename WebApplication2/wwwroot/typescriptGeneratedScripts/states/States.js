var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "Utils"], function (require, exports, Utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var States;
    (function (States) {
        var State = (function () {
            function State() {
            }
            return State;
        }());
        States.State = State;
        var StateManager = (function () {
            function StateManager(initState) {
                this.currentState = initState;
            }
            Object.defineProperty(StateManager.prototype, "currentState", {
                get: function () {
                    return this._currentState;
                },
                set: function (state) {
                    if (this._currentState)
                        this._currentState.leave();
                    this._currentState = state;
                    state.enter();
                    state.applyCursor();
                },
                enumerable: true,
                configurable: true
            });
            return StateManager;
        }());
        States.StateManager = StateManager;
        var SelectionState = (function (_super) {
            __extends(SelectionState, _super);
            function SelectionState(workContainer) {
                var _this = _super.call(this) || this;
                _this.workContainer = workContainer;
                _this.birdTopLeft = null;
                _this.birdTopRight = null;
                _this.birdBottomLeft = null;
                _this.birdBottomRight = null;
                _this.clickListener = function (handleEvent) {
                    var element = handleEvent.target;
                    var elementLeft = parseInt(element.style.left);
                    var elementTop = parseInt(element.style.top);
                    var elementWidth = parseInt(element.style.width);
                    var elementHeight = parseInt(element.style.height);
                    if (_this.birdTopLeft)
                        _this.workContainer.removeChild(_this.birdTopLeft);
                    _this.birdTopLeft = document.createElement("div");
                    _this.birdTopLeft.style.left = elementLeft - 10 + 'px';
                    _this.birdTopLeft.style.top = elementTop - 10 + 'px';
                    _this.putStyleOnBird(_this.birdTopLeft);
                    if (_this.birdTopLeft)
                        _this.workContainer.removeChild(_this.birdTopLeft);
                    _this.birdTopLeft = document.createElement("div");
                    _this.birdTopLeft.style.left = elementLeft - 10 + 'px';
                    _this.birdTopLeft.style.top = elementTop - 10 + 'px';
                    _this.putStyleOnBird(_this.birdTopLeft);
                    if (_this.birdTopLeft)
                        _this.workContainer.removeChild(_this.birdTopLeft);
                    _this.birdTopLeft = document.createElement("div");
                    _this.birdTopLeft.style.left = elementLeft - 10 + 'px';
                    _this.birdTopLeft.style.top = elementTop - 10 + 'px';
                    _this.putStyleOnBird(_this.birdTopLeft);
                    if (_this.birdTopLeft)
                        _this.workContainer.removeChild(_this.birdTopLeft);
                    _this.birdTopLeft = document.createElement("div");
                    _this.birdTopLeft.style.left = elementLeft - 10 + 'px';
                    _this.birdTopLeft.style.top = elementTop - 10 + 'px';
                    _this.putStyleOnBird(_this.birdTopLeft);
                    _this.workContainer.appendChild(_this.birdTopLeft);
                };
                return _this;
            }
            SelectionState.prototype.putStyleOnBird = function (bird) {
                this.birdTopLeft.style.width = this.birdTopLeft.style.height = "20px";
                this.birdTopLeft.style.backgroundColor = "white";
                this.birdTopLeft.style.border = "solid black 1px";
                this.birdTopLeft.style.borderRadius = "50%";
                this.birdTopLeft.style.position = "absolute";
            };
            SelectionState.prototype.enter = function () {
                var allChilds = this.workContainer.querySelectorAll("*");
                this.workContainer.addEventListener("click", this.clickListener);
            };
            SelectionState.prototype.applyCursor = function () {
                this.workContainer.style.cursor = "pointer";
            };
            SelectionState.prototype.leave = function () {
                this.workContainer.removeEventListener("click", this.clickListener);
            };
            return SelectionState;
        }(State));
        States.SelectionState = SelectionState;
        var CreationState = (function (_super) {
            __extends(CreationState, _super);
            function CreationState(workContainer) {
                var _this = _super.call(this) || this;
                _this.workContainer = workContainer;
                _this.mouseStartPosition = null;
                _this.mouseUpListener = function (handleEvent) {
                    _this.mouseStartPosition = null;
                    var width = parseInt(_this.elementBeingCreated.style.width);
                    var height = parseInt(_this.elementBeingCreated.style.height);
                    if (width * height < 200) {
                        _this.parentOfElementBeingCreated.removeChild(_this.elementBeingCreated);
                    }
                    _this.elementBeingCreated = null;
                    _this.parentOfElementBeingCreated;
                };
                _this.mouseMoveListener = function (handleEvent) {
                    if (_this.mouseStartPosition) {
                        var parentOffset = Utils_1.Utils.getOffset(_this.parentOfElementBeingCreated);
                        var currentPosition = {
                            x: handleEvent.clientX + document.body.scrollLeft + _this.parentOfElementBeingCreated.scrollLeft - parentOffset.left,
                            y: handleEvent.clientY + document.body.scrollTop + _this.parentOfElementBeingCreated.scrollTop - parentOffset.top,
                        };
                        _this.elementBeingCreated.style.width = (currentPosition.x - _this.mouseStartPosition.x) + 'px';
                        _this.elementBeingCreated.style.height = (currentPosition.y - _this.mouseStartPosition.y) + 'px';
                    }
                };
                _this.mouseDownListener = function (handleEvent) {
                    _this.parentOfElementBeingCreated = handleEvent.target;
                    var parentOffset = Utils_1.Utils.getOffset(_this.parentOfElementBeingCreated);
                    console.log(_this.workContainer.scrollTop);
                    _this.mouseStartPosition = {
                        x: handleEvent.clientX + document.body.scrollLeft + _this.parentOfElementBeingCreated.scrollLeft - parentOffset.left,
                        y: handleEvent.clientY + document.body.scrollTop + _this.parentOfElementBeingCreated.scrollTop - parentOffset.top,
                    };
                    _this.elementBeingCreated = document.createElement('div');
                    _this.elementBeingCreated.style.position = "absolute";
                    _this.elementBeingCreated.style.left = _this.mouseStartPosition.x + "px";
                    _this.elementBeingCreated.style.top = _this.mouseStartPosition.y + 'px';
                    _this.elementBeingCreated.style.backgroundColor = 'rgba(0,0,0,0.1)';
                    _this.parentOfElementBeingCreated.appendChild(_this.elementBeingCreated);
                };
                return _this;
            }
            CreationState.prototype.enter = function () {
                this.workContainer.addEventListener("mousedown", this.mouseDownListener);
                this.workContainer.addEventListener("mousemove", this.mouseMoveListener);
                this.workContainer.addEventListener("mouseup", this.mouseUpListener);
            };
            CreationState.prototype.applyCursor = function () {
                this.workContainer.style.cursor = "crosshair";
            };
            CreationState.prototype.leave = function () {
                this.workContainer.removeEventListener("mousedown", this.mouseDownListener);
                this.workContainer.removeEventListener("mousemove", this.mouseMoveListener);
                this.workContainer.removeEventListener("mouseup", this.mouseUpListener);
            };
            return CreationState;
        }(State));
        States.CreationState = CreationState;
        var ColoringState = (function (_super) {
            __extends(ColoringState, _super);
            function ColoringState(workContainer) {
                var _this = _super.call(this) || this;
                _this.workContainer = workContainer;
                return _this;
            }
            ColoringState.prototype.enter = function () { };
            ColoringState.prototype.applyCursor = function () {
                this.workContainer.style.cursor = "default";
            };
            ColoringState.prototype.leave = function () {
            };
            return ColoringState;
        }(State));
        States.ColoringState = ColoringState;
    })(States = exports.States || (exports.States = {}));
});
