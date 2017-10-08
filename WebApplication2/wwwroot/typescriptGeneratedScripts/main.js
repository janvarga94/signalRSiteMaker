define(["require", "exports", "states/States"], function (require, exports, States_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Main;
    (function (Main) {
        var workContainer = document.createElement("div");
        workContainer.style.width = "80%";
        workContainer.style.height = "80%";
        workContainer.style.marginLeft = "150px";
        workContainer.style.marginTop = "150px";
        workContainer.style.border = "solid black 1px";
        workContainer.style.position = "relative";
        workContainer.style.overflow = "auto";
        var stateManager = new States_1.States.StateManager(new States_1.States.CreationState(workContainer));
        //setTimeout(() => { stateManager.currentState = new States.SelectionState(workContainer) }, 2000)
        var goCreationStateButton = document.createElement("button");
        goCreationStateButton.innerHTML = "Creation state";
        goCreationStateButton.addEventListener("click", function (handler) { stateManager.currentState = new States_1.States.CreationState(workContainer); });
        var goSelectionStateButton = document.createElement("button");
        goSelectionStateButton.innerHTML = "Selection state";
        goSelectionStateButton.addEventListener("click", function (handler) { stateManager.currentState = new States_1.States.SelectionState(workContainer); });
        document.body.appendChild(goCreationStateButton);
        document.body.appendChild(goSelectionStateButton);
        document.body.appendChild(workContainer);
    })(Main = exports.Main || (exports.Main = {}));
});
