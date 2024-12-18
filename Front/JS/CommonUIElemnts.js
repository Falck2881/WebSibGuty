"use strict"
//@ts-check

/**
 * Создаёт элемент div который блокирует задний фон экрана 
 */
export function createBlockingBackground()
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
export function removeBlockingBackgraund()
{
    let blockingBackgraund = document.getElementById("blocking-background");

    let parentElement = blockingBackgraund.parentNode;

    parentElement.removeChild(blockingBackgraund);
}