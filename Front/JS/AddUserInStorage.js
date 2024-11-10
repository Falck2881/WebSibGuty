"use strict"
//@ts-check
import { IAddModelIntoStorage } from "./IAddModelIntoStorage.js"
import { UserModelDto } from "./Entities.js"
import { IndexDBRepository } from "./IndexDBRepository.js";

export class AddUserInStorage extends IAddModelIntoStorage
{
    /**
    * Добавляет все сущности в хранилище пользователей 
    * @param {Array<UserModelDto>} content
    * @returns {Array} 
    */
    async execute(content)
    {
        if (content == null)
            return;

        let indexDb = new IndexDBRepository("Users");

        if (Array.isArray(content))
        {
            content.forEach(async user => 
                {
                    await indexDb.addDtoModel(user);
                });
        }
    }
}