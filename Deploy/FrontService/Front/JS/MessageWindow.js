"use strict"
import { BlockingBackground } from "./BlockingBackgraund.js";
//@ts-check

import {IBuilderMessage} from "./IBuilderMessage.js"

/**
 * Класс модального окна с сообщением
 */
export class MessageWindow
{
    #builderMessage
    /**
     * 
     * @param {IBuildErrorMessage} element - разметка с сообщением 
     */
    constructor(buildErrorMessage)
    {
        if (buildErrorMessage instanceof IBuilderMessage)
            this.#builderMessage = buildErrorMessage;
    }

    /**
     * Показывает модальное окно
     */
    show()
    {
        this.#builderMessage.build();
    }

    /**
     * Удаляет модальное окно
     */
    removeWindow()
    {
        this.#builderMessage.remove();
    }
}

/**
 * Закрывает модальное окно
 */
function closeModalWindow()
{
    let blockingBackgraund = new BlockingBackground("blocking-background-for-record-user-card");
    blockingBackgraund.removeBlockingBackgraund();
}

window.closeModalWindow = closeModalWindow;