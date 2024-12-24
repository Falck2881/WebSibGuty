"use strict"
//@ts-check

/**
 * Класс создаёт блокирующий задний фон 
 */
export class BlockingBackground
{
    #id = "";

    /**
     * 
     * @param {string} id 
     */
    constructor(id)
    {
        this.#id = id;
    }

    /**
     * Создаёт элемент div который блокирует задний фон экрана 
     * @param {string} idParent 
     */
    createBlockingBackground(idParent)
    {
        let blockingBackgraund = document.createElement("div");
        blockingBackgraund.className = "blocking-background";
        blockingBackgraund.id = this.#id;

        let appBody = document.getElementById(idParent);
        appBody.appendChild(blockingBackgraund);
    }

    /**
     * Удаляет блокирующий задний фон
     */
    removeBlockingBackgraund()
    {
        let blockingBackgraund = document.getElementById(this.#id);

        blockingBackgraund.remove();
    }
}
