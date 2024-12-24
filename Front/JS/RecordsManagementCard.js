"use strict"
//@ts-check

/**
 * Карточка управления записями.
 * В этой карточке будут размещены различные действия такие как:
 * - создать
 * - удалить
 * - редактировать
 */
export class RecordsManagementCard
{
    /**
     * Создаёт компонент 
     */
    create()
    {
        let recordManagementCard = document.createElement("div");
        recordManagementCard.className = "records-management-card";
        recordManagementCard.id = "recordsManagementCard";
        
        let closeCardAction = document.createElement("button");
        closeCardAction.className = "close-сard-button";
        closeCardAction.addEventListener("click", () => window.closeBlockingBackground("blocking-backgraund-main-menu"));
        recordManagementCard.appendChild(closeCardAction);

        let blockManagmentAction = this.#createBlockAction();
        recordManagementCard.appendChild(blockManagmentAction);

        let backgroundFonScreen = document.getElementById("blocking-backgraund-main-menu");
        backgroundFonScreen.appendChild(recordManagementCard);
    }

    /**
     * Создаёт блок действий для управления записями
     * @returns {HTMLElement} 
     */
    #createBlockAction()
    {
        let createRecordAction = document.createElement("button");
        createRecordAction.className = "records-management-button";
        createRecordAction.addEventListener('click', () => 
            {
                window.closeRecordManagementCard();
                window.openRecordCreationSelectionCard();
            })
        createRecordAction.appendChild(document.createTextNode("Создать"));

        let deleteRecordAction = document.createElement("button");
        deleteRecordAction.className = "records-management-button";
        deleteRecordAction.appendChild(document.createTextNode("Удалить"));

        let editRecordAction = document.createElement("button");
        editRecordAction.className = "records-management-button";
        editRecordAction.appendChild(document.createTextNode("Редактировать"));


        let blockManagmentAction = document.createElement("div");
        blockManagmentAction.className = "block-record-management-action";
        blockManagmentAction.appendChild(createRecordAction);
        blockManagmentAction.appendChild(deleteRecordAction);
        blockManagmentAction.appendChild(editRecordAction);

        return blockManagmentAction;
    }

    /**
     * Удаляет карточку
     */
    removeCard()
    {
        let card = document.getElementById("recordsManagementCard");
        card.remove();
    }
}