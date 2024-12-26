"use strict"
//@ts-check

import {BlockingBackground} from "./BlockingBackgraund.js"
import {RecordCreationSelectionCard} from "./RecordCreationSelectionCard.js"
import {RecordsManagementCard} from "./RecordsManagementCard.js"
import {RecordUserCard} from "./RecordUserCard.js"
import {MessageWindow} from "./MessageWindow.js"
import {ErrorSendRecordUserMessage} from "./ErrorSendRecordUserMessage.js"
import {SuccessfullyMessage} from "./SuccessfullyMessage.js"

/**
 * Закрывает карточку управления записями
 * @param {string} id  
 */
function closeBlockingBackground(id)
{
    let blockingBackgraund = new BlockingBackground(id);

    blockingBackgraund.removeBlockingBackgraund();
}

/**
 * Создаёт блокирующий задний фон
 * @param {string} id 
 */
function createBlockingBackground(id)
{
    let blockingBackgraund = new BlockingBackground(id);

    blockingBackgraund.createBlockingBackground("app-body");
}

window.closeBlockingBackground = closeBlockingBackground;
window.createBlockingBackground = createBlockingBackground;

/**
 * Закрывает карточку "управление записями"
 */
function closeRecordManagementCard()
{
    let card = new RecordsManagementCard;
    card.removeCard();
}

/**
 * Открывает карточку "управление записями"
 */
function openRecordManagementCard()
{
    let card = new RecordsManagementCard;
    card.create();
}

window.closeRecordManagementCard = closeRecordManagementCard;
window.openRecordManagementCard = openRecordManagementCard;

/**
 * Открывает карточку выбора по созданию различных записей
 */
function openRecordCreationSelectionCard()
{
    let card = new RecordCreationSelectionCard;
    card.create();
}

/**
 * Закрывает карточку по выбору созданию записи 
 */
function closeRecordCreationSelectionCard()
{
    let card = new RecordCreationSelectionCard;
    card.removeCard();
}

window.openRecordCreationSelectionCard = openRecordCreationSelectionCard;
window.closeRecordCreationSelectionCard = closeRecordCreationSelectionCard;

/**
 * Открывает карточку по созданию записи пользователя
 */
function openRecordUserCard()
{
    let recordUserCard = new RecordUserCard;

    recordUserCard.create();
}

/**
 * Закрывает карточку по созданию записи пользователя
 */
function closeRecordUserCard()
{
    let recordUserCard = new RecordUserCard;

    recordUserCard.removeCard();
}


window.openRecordUserCard = openRecordUserCard;
window.closeRecordUserCard = closeRecordUserCard;

/**
 * События кнопки - отправить запись
 */

async function sendRecord(card)
{
    if (card instanceof RecordUserCard)
    {   
        card.prepareEnteredData();

        if (!card.isAllFieldsFilledIn())
        {
            createModalWindowWithErrorSendRecordUser(card.getRecord());
            return;
        }

        let response = await card.sendRecord();
        let object = await response.json();
        let successfullyMessage = new SuccessfullyMessage(object.Message);
        let modalWindow = new MessageWindow(successfullyMessage);
        modalWindow.show();
    }
}

/**
* Создаёт модальное окно с ошибкой при отправки записи пользователя
* @param {UserModelDto} userModelDto  
*/
function createModalWindowWithErrorSendRecordUser(userModelDto)
{
    let blockingBackgraundRecordUserCard = new BlockingBackground("blocking-background-for-record-user-card");
    blockingBackgraundRecordUserCard.createBlockingBackground("recordUserCard");

    let builder = new ErrorSendRecordUserMessage(userModelDto);
    let modalWindow = new MessageWindow(builder);
    modalWindow.show();
}

window.sendRecord = sendRecord;