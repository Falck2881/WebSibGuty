"use strict"
//@ts-check

/**
 * Класс предоставляет методы в которых создаются всплывающие меню с различными действиями 
 */
export class ActionMenuHelper
{

    #actionMenu = "action-menu";
    /**
     * Создаёт меню действий по работе с пользователем.
     * @param {string} parentId 
     * @param {string} idUser 
     */
    createMenuOfActionsByWorkingWithUser(parentId, idUser)
    {
        let actionMenu = document.createElement("div");
        actionMenu.className = "action-menu";
        actionMenu.id = this.#actionMenu;
        
        let openCardUser = document.createElement("p");
        openCardUser.className = "item-action-menu"
        openCardUser.appendChild(document.createTextNode("Открыть"));
        openCardUser.addEventListener('click', async () => 
            {
                window.createBlockingBackground('blocking-backgraund-main-menu'); 
                await window.openRecordUserCard(idUser);
            });
        actionMenu.appendChild(openCardUser);

        // let deleteRecorrdUser = document.createElement("p");
        // deleteRecorrdUser.className = "item-action-menu";
        // deleteRecorrdUser.appendChild(document.createTextNode("Удалить"));
        // actionMenu.appendChild(deleteRecorrdUser);

        let parentActionElement = document.getElementById(parentId);
        parentActionElement.appendChild(actionMenu);
    }

    removeMenuOfActionsByWorkingWithUser()
    {
        let actionMenu = document.getElementById(this.#actionMenu);
        
        if (actionMenu !== null)
            actionMenu.remove();
    }
}