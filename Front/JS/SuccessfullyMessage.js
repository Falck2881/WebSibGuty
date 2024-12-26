"use strict"
//@ts-check

import {IBuilderMessage} from "./IBuilderMessage.js"

/**
 * Класс реализует модальное окно с сообщением об успешной операции 
 */
export class SuccessfullyMessage extends IBuilderMessage
{
    #content = "";

    /**
     * 
     * @param {string} content 
     */
    constructor(content)
    {
        super();
        this.#content = content;
    }

    build()
    {
        let modalWindow = document.createElement("div");
        modalWindow.className = "fast-modal-window";
        modalWindow.id = "fast-modal-window";
        modalWindow.classList.add("open-fast-modal-window");
        

        let modalContent = document.createElement("div");
        modalContent.className = "fast-modal-content";

        let content = document.createElement("p");
        content.className = "successfully-message";
        content.appendChild(document.createTextNode(this.#content));

        modalContent.appendChild(content);

        modalWindow.appendChild(modalContent);

        let blockingBackgraund = document.getElementById("blocking-backgraund-main-menu");
        blockingBackgraund.appendChild(modalWindow);

        if (window.closeFastWindow){
            clearTimeout(window.closeFastWindow);
            this.#removeOldModalWindow();
        }

        window.closeFastWindow = setTimeout(() => this.#closeModalWindow(), 3000);
    }

    #closeModalWindow()
    {
        let modalWindow = document.getElementById("fast-modal-window");
        modalWindow.classList.remove("open-fast-modal-window");
    }

    #removeOldModalWindow()
    {
        let modalWindow = document.getElementById("fast-modal-window");
        modalWindow.remove();
    }
}