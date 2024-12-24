"use strict"
import { BlockingBackground } from "./BlockingBackgraund.js";
//@ts-check

import {IBuilderErrorMessage} from "./IBuildErrorMessage.js"

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
        if (buildErrorMessage instanceof IBuilderErrorMessage)
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