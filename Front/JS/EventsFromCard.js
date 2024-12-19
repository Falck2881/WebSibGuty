"use strict"
//@ts-check

import {createBlockingBackground, removeBlockingBackgraund} from "./CommonUIElemnts.js" 
import {RecordCreationSelectionCard} from "./RecordCreationSelectionCard.js"
import {RecordsManagementCard} from "./RecordsManagementCard.js"

/**
 * Закрывает карточку управления записями 
 */
function closeRecordsManagementCard()
{
    removeBlockingBackgraund();
}

/**
 * Открывает карточку выбора по созданию различных записей
 */
function openRecordCreationSelectionCard()
{
    createBlockingBackground();

    let card = new RecordCreationSelectionCard;
    card.create();
}

/**
 * Вернуться назад к карточке "управление записями"
 */
function backToRecordsManagementCard()
{
    createBlockingBackground();

    let card = new RecordsManagementCard;
    card.create();
}

window.closeRecordsManagementCard = closeRecordsManagementCard;
window.openRecordCreationSelectionCard = openRecordCreationSelectionCard;
window.backToRecordsManagementCard = backToRecordsManagementCard;