"use strict"
//@ts-check
import { IAddModelIntoStorage } from "./IAddModelIntoStorage.js"
import { EntityDto, UserModelDto } from "./Entities.js"
import { IndexDBRepository } from "./IndexDBRepository.js";

/**
 * Реализует добавление всех сущностей "Пользователи" во временное хранилище.
 */
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
        
        await indexDb.openRepository();

        if (Array.isArray(content))
        {
            content.forEach(async user => 
                {
                    var userDtoModel = new UserModelDto(user);
                    await indexDb.addDtoModel(userDtoModel);
                });
        }
    }
}