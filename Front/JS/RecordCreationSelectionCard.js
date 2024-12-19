"use strict"
//@ts-check

/**
 * Карточка с выбором создания записи
 */
export class RecordCreationSelectionCard
{
    create()
    {
        let selectionCard = document.createElement("div");
        selectionCard.className = "records-management-card";

        let backButton = document.createElement("button");
        backButton.className = "back-card-button";
        backButton.addEventListener('click', () => 
            {
                window.closeRecordsManagementCard();
                window.backToRecordsManagementCard();
            });
        selectionCard.appendChild(backButton);
        
        let actionsCard = this.#creationBlockAction();
        selectionCard.appendChild(actionsCard);

        let backgroundFonScreen = document.getElementById("blocking-background");
        backgroundFonScreen.appendChild(selectionCard);
    }


    #creationBlockAction()
    {
        let addUserAction = document.createElement("button");
        addUserAction.className = "records-management-button";
        addUserAction.appendChild(document.createTextNode("Пользователя"));

        let addGroupAction = document.createElement("button");
        addGroupAction.className = "records-management-button";
        addGroupAction.appendChild(document.createTextNode("Группу"));

        let addFacultetAction = document.createElement("button");
        addFacultetAction.className = "records-management-button";
        addFacultetAction.appendChild(document.createTextNode("Факультет"));


        let blockManagmentAction = document.createElement("div");
        blockManagmentAction.className = "block-record-management-action";
        blockManagmentAction.appendChild(addUserAction);
        blockManagmentAction.appendChild(addGroupAction);
        blockManagmentAction.appendChild(addFacultetAction);

        return blockManagmentAction;
    }
}