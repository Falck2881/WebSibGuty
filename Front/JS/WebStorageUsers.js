"use strict"
//@ts-check
import { WebStorage } from "./WebStorage"
import {UserModelDto} from "./Entities"

export class WebStorageUsers extends WebStorage
{
    // Имя хранилища
    #name = "Users";

    constructor()
    {
        super(this, this.#name);
    }

    /**
    * Подготавливает содержимое к хранению.
    * Производные классы должны переопределить.
    * @param {Array} content
    * @returns {Array} 
    */
    async prepareContentToStorage(content)
    {
        let userModel = new UserModelDto;
        return userModel.ToUserModelDto(content);
    }
}