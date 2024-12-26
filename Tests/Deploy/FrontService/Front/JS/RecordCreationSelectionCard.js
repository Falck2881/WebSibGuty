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
        selectionCard.id = "recordCreationSelectionCard";

        let backButton = document.createElement("button");
        backButton.className = "back-card-button";
        backButton.addEventListener('click', () => 
            {
                window.closeRecordCreationSelectionCard();
                window.openRecordManagementCard();
            });
        selectionCard.appendChild(backButton);
        
        let actionsCard = this.#creationBlockAction();
        selectionCard.appendChild(actionsCard);

        let backgroundFonScreen = document.getElementById("blocking-backgraund-main-menu");
        backgroundFonScreen.appendChild(selectionCard);
    }


    #creationBlockAction()
    {
        let addUserAction = document.createElement("button");
        addUserAction.className = "records-management-button";
        addUserAction.appendChild(document.createTextNode("Пользователя"));
        addUserAction.addEventListener('click', () => 
            {
                window.closeRecordCreationSelectionCard();
                window.openRecordUserCard();
            })

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

    /**
     * Удаляет карточку 
     */
    removeCard()
    {
        let card = document.getElementById("recordCreationSelectionCard");

        card.remove();
    }
}