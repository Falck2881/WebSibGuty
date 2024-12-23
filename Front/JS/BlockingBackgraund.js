"use strict"
//@ts-check

/**
 * Класс создаёт блокирующий задний фон 
 */
export class BlockingBackground
{
    /**
     * Создаёт элемент div который блокирует задний фон экрана 
     */
    createBlockingBackground()
    {
        let blockingBackgraund = document.createElement("div");
        blockingBackgraund.className = "blocking-background";
        blockingBackgraund.id = "blocking-background";

        let appBody = document.getElementById("app-body");
        appBody.appendChild(blockingBackgraund);
    }

    /**
     * Удаляет блокирующий задний фон
     */
    removeBlockingBackgraund()
    {
        let blockingBackgraund = document.getElementById("blocking-background");

        blockingBackgraund.remove();
    }
}
