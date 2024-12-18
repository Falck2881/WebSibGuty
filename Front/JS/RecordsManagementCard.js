"use strict"
//@ts-check

import {Card} from "./Card.js"

/**
 * Карточка управления записями.
 * В этой карточке будут размещены различные действия такие как:
 * - создать
 * - удалить
 * - редактировать
 */
export class RecordsManagementCard extends Card
{
    /**
     * div элемент со всем содержимым карточки
     */
    #component;

    constructor()
    {
        super();
    }

    /**
     * Создаёт компонент 
     */
    create()
    {
        this.#component = document.createElement("div");
        this.#component.className = "records-management-card";
        
        let closeCardAction = document.createElement("button");
        closeCardAction.className = "close-сard-button";
        closeCardAction.addEventListener("click", () => window.closeRecordsManagementCard());
        this.#component.appendChild(closeCardAction);

        let blockManagmentAction = this.#createBlockAction();
        this.#component.appendChild(blockManagmentAction);

        let backgroundFonScreen = document.getElementById("blocking-background");
        backgroundFonScreen.appendChild(this.#component);
    }

    /**
     * Создаёт блок действий для управления записями
     * @returns {HTMLElement} 
     */
    #createBlockAction()
    {
        let createRecordAction = document.createElement("button");
        createRecordAction.className = "records-management-button";
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
     * Удаляет компонент
     */
    delete()
    {

    }

    /**
     * Получить компонент
     * @returns {HTMLElement}
     */
    getComponent()
    {

    }
}