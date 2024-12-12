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
    #nameDataBase = "";

    #nameStorage = "";

    constructor(newNameDataBase ,newNameStorage = "")
    {
        super();
        this.#nameDataBase = newNameDataBase;
        this.#nameStorage = newNameStorage;
    }
    /**
    * Добавляет все сущности в хранилище пользователей 
    * @param {Array<UserModelDto>} content
    * @returns {Array} 
    */
    async execute(content)
    {
        if (content == null)
            return;

        let indexDb = new IndexDBRepository;
        
        await indexDb.openRepository(this.#nameDataBase, this.#nameStorage);

        if (Array.isArray(content))
        {
            content.forEach(async user => 
                {
                    var userDtoModel = new UserModelDto(user);
                    await indexDb.addDtoModel(userDtoModel, this.#nameStorage);
                });
        }
    }
}