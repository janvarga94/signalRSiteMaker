import { Utils } from "Utils"


export module States {

    export abstract class State {
        abstract enter();
        abstract leave();
        abstract applyCursor();
    }


    export class StateManager{
        private _currentState: State;

        constructor(initState: State) {
            this.currentState = initState;
        }

        get currentState(): State{
            return this._currentState;
        }

        set currentState(state: State) {
            if (this._currentState) this._currentState.leave();
            this._currentState = state;
            state.enter();
            state.applyCursor();
        }

    }

    export class SelectionState extends State {

        private birdTopLeft: HTMLElement = null;
        private birdTopRight: HTMLElement = null;
        private birdBottomLeft: HTMLElement = null;
        private birdBottomRight: HTMLElement = null;

        constructor(private workContainer: HTMLElement) {
            super();
        }

        private clickListener = (handleEvent: MouseEvent) => {
            var element = <HTMLElement>handleEvent.target;

            var elementLeft = parseInt(element.style.left);
            var elementTop = parseInt(element.style.top);

            var elementWidth = parseInt(element.style.width);
            var elementHeight = parseInt(element.style.height);

            if (this.birdTopLeft) this.workContainer.removeChild(this.birdTopLeft);
            this.birdTopLeft = document.createElement("div");
            this.birdTopLeft.style.left = elementLeft - 10 + 'px';
            this.birdTopLeft.style.top = elementTop - 10 + 'px';
            this.putStyleOnBird(this.birdTopLeft);

            if (this.birdTopLeft) this.workContainer.removeChild(this.birdTopLeft);
            this.birdTopLeft = document.createElement("div");
            this.birdTopLeft.style.left = elementLeft - 10 + 'px';
            this.birdTopLeft.style.top = elementTop - 10 + 'px';
            this.putStyleOnBird(this.birdTopLeft);

            if (this.birdTopLeft) this.workContainer.removeChild(this.birdTopLeft);
            this.birdTopLeft = document.createElement("div");
            this.birdTopLeft.style.left = elementLeft - 10 + 'px';
            this.birdTopLeft.style.top = elementTop - 10 + 'px';
            this.putStyleOnBird(this.birdTopLeft);

            if (this.birdTopLeft) this.workContainer.removeChild(this.birdTopLeft);
            this.birdTopLeft = document.createElement("div");
            this.birdTopLeft.style.left = elementLeft - 10 + 'px';
            this.birdTopLeft.style.top = elementTop - 10 + 'px';
            this.putStyleOnBird(this.birdTopLeft);

            this.workContainer.appendChild(this.birdTopLeft);

        }

        private putStyleOnBird(bird: HTMLElement) {
            this.birdTopLeft.style.width = this.birdTopLeft.style.height = "20px";
            this.birdTopLeft.style.backgroundColor = "white";
            this.birdTopLeft.style.border = "solid black 1px";
            this.birdTopLeft.style.borderRadius = "50%";
            this.birdTopLeft.style.position = "absolute";
        }

        enter() {
            var allChilds = this.workContainer.querySelectorAll("*");

            this.workContainer.addEventListener("click", this.clickListener)
        }

        applyCursor() {
            this.workContainer.style.cursor = "pointer";
        }

        leave() {
            this.workContainer.removeEventListener("click", this.clickListener)
        }
    }

    export class CreationState extends State {

        private parentOfElementBeingCreated: HTMLElement;
        private elementBeingCreated: HTMLElement;
        private mouseStartPosition: {x: number, y: number} = null;


        constructor(private workContainer: HTMLElement) {
            super();
        }

        private mouseUpListener = (handleEvent: MouseEvent) => {
            this.mouseStartPosition = null;
            var width = parseInt(this.elementBeingCreated.style.width);
            var height = parseInt(this.elementBeingCreated.style.height);

            if (width * height < 200) {
                this.parentOfElementBeingCreated.removeChild(this.elementBeingCreated);
            }

            this.elementBeingCreated = null;
            this.parentOfElementBeingCreated;
        }

        private mouseMoveListener = (handleEvent: MouseEvent) => {
            if (this.mouseStartPosition) {
                var parentOffset = Utils.getOffset(this.parentOfElementBeingCreated);

                var currentPosition = {
                    x: handleEvent.clientX + document.body.scrollLeft + this.parentOfElementBeingCreated.scrollLeft - parentOffset.left,
                    y: handleEvent.clientY + document.body.scrollTop + this.parentOfElementBeingCreated.scrollTop - parentOffset.top,
                }

                this.elementBeingCreated.style.width = (currentPosition.x - this.mouseStartPosition.x) + 'px';
                this.elementBeingCreated.style.height = (currentPosition.y - this.mouseStartPosition.y) + 'px';
            }
        }

        private mouseDownListener = (handleEvent: MouseEvent) => {
            this.parentOfElementBeingCreated = <HTMLElement> handleEvent.target;
            var parentOffset = Utils.getOffset(this.parentOfElementBeingCreated);

            console.log(this.workContainer.scrollTop);

            this.mouseStartPosition = {
                x: handleEvent.clientX + document.body.scrollLeft + this.parentOfElementBeingCreated.scrollLeft - parentOffset.left,
                y: handleEvent.clientY + document.body.scrollTop + this.parentOfElementBeingCreated.scrollTop - parentOffset.top,
            }

            this.elementBeingCreated = document.createElement('div');

            this.elementBeingCreated.style.position = "absolute";
            this.elementBeingCreated.style.left = this.mouseStartPosition.x + "px";
            this.elementBeingCreated.style.top = this.mouseStartPosition.y + 'px';
            this.elementBeingCreated.style.backgroundColor = 'rgba(0,0,0,0.1)';

            this.parentOfElementBeingCreated.appendChild(this.elementBeingCreated);
        }


        enter() {
            this.workContainer.addEventListener("mousedown", this.mouseDownListener);
            this.workContainer.addEventListener("mousemove", this.mouseMoveListener);
            this.workContainer.addEventListener("mouseup", this.mouseUpListener);
        }

        applyCursor() {
            this.workContainer.style.cursor = "crosshair";
        }

        leave() {
            this.workContainer.removeEventListener("mousedown", this.mouseDownListener);
            this.workContainer.removeEventListener("mousemove", this.mouseMoveListener);
            this.workContainer.removeEventListener("mouseup", this.mouseUpListener);
        }
    }

    export class ColoringState extends State {

        constructor(private workContainer: HTMLElement) {
            super();

        }

        enter() { }

        applyCursor() {
            this.workContainer.style.cursor = "default";
        }

        leave() {

        }
    }


}