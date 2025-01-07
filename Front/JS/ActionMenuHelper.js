"use strict"
//@ts-check

/**
 * Класс предоставляет методы в которых создаются всплывающие меню с различными действиями 
 */
export class ActionMenuHelper
{

    /**
     * Создаёт меню действий по работе с пользователем.
     * @param {string} parentId 
     * @param {string} idActionMenu 
     */
    createMenuOfActionsByWorkingWithUser(parentId, idActionMenu)
    {
        let actionMenu = document.createElement("div");
        actionMenu.className = "action-menu";
        actionMenu.id = idActionMenu;
        
        let openCardUser = document.createElement("p");
        openCardUser.className = "item-action-menu"
        openCardUser.appendChild(document.createTextNode("Открыть"));
        openCardUser.addEventListener('click', async () => 
            {
                window.createBlockingBackground('blocking-backgraund-main-menu'); 
                await window.openRecordUserCard(actionMenu.id);
            });
        actionMenu.appendChild(openCardUser);

        // let deleteRecorrdUser = document.createElement("p");
        // deleteRecorrdUser.className = "item-action-menu";
        // deleteRecorrdUser.appendChild(document.createTextNode("Удалить"));
        // actionMenu.appendChild(deleteRecorrdUser);

        let parentActionElement = document.getElementById(parentId);
        parentActionElement.appendChild(actionMenu);
    }

    removeMenuOfActionsByWorkingWithUser(idActionMenu)
    {
        let actionMenu = document.getElementById(idActionMenu);
        actionMenu.remove();
    }
}