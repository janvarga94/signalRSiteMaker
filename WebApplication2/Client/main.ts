import { States } from 'states/States';

export module Main {




    var workContainer = document.createElement("div");

    workContainer.style.width = "80%";
    workContainer.style.height = "80%";
    workContainer.style.marginLeft = "150px";
    workContainer.style.marginTop = "150px";
    workContainer.style.border = "solid black 1px";
    workContainer.style.position = "relative";
    workContainer.style.overflow = "auto";


    var stateManager = new States.StateManager(new States.CreationState(workContainer));

    //setTimeout(() => { stateManager.currentState = new States.SelectionState(workContainer) }, 2000)


    let goCreationStateButton = document.createElement("button");
    goCreationStateButton.innerHTML = "Creation state"
    goCreationStateButton.addEventListener("click", (handler) => { stateManager.currentState = new States.CreationState(workContainer) })

    let goSelectionStateButton = document.createElement("button");
    goSelectionStateButton.innerHTML = "Selection state"
    goSelectionStateButton.addEventListener("click", (handler) => { stateManager.currentState = new States.SelectionState(workContainer) })

    document.body.appendChild(goCreationStateButton);
    document.body.appendChild(goSelectionStateButton);

    document.body.appendChild(workContainer);

}