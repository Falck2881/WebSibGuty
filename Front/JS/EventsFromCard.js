"use strict"
//@ts-check

import {BlockingBackground} from "./BlockingBackgraund.js"
import {RecordCreationSelectionCard} from "./RecordCreationSelectionCard.js"
import {RecordsManagementCard} from "./RecordsManagementCard.js"
import {RecordUserCard} from "./RecordUserCard.js"

/**
 * Закрывает карточку управления записями 
 */
function closeBlockingBackground()
{
    let blockingBackgraund = new BlockingBackground;

    blockingBackgraund.removeBlockingBackgraund();
}

/**
 * Создаёт блокирующий задний фон
 */
function createBlockingBackground()
{
    let blockingBackgraund = new BlockingBackground;

    blockingBackgraund.createBlockingBackground();
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