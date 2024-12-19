"use strict"
//@ts-check

import {createBlockingBackground} from "./CommonUIElemnts.js" 
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

window.openRecordManagementCard = openRecordManagementCard;