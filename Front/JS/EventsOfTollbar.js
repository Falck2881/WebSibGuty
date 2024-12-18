"use strict"
//@ts-check

import {createBlockingBackground, removeBlockingBackgraund} from "./CommonUIElemnts.js" 
import { RecordsManagementCard } from "./RecordsManagementCard.js";

/**
 * Открывает карточку по управленею записями
 */
async function openRecordManagementCard()
{
    createBlockingBackground();

    let card = new RecordsManagementCard();
    card.create();
    
}

/**
 * Закрывает карточку управления записями 
 */
async function closeRecordsManagementCard()
{
    removeBlockingBackgraund();
}

window.openRecordManagementCard = openRecordManagementCard;
window.closeRecordsManagementCard = closeRecordsManagementCard;