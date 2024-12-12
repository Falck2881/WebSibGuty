"use strict"
//@ts-check

import { GroupModelDto } from "./Entities.js"
import { IndexDBRepository } from "./IndexDBRepository.js"
import { IAddModelIntoStorage } from "./IAddModelIntoStorage.js"

/**
 * Реализует добавление всех сущностей "Групп" во временное хранилище
 */
export class AddGroupInStorage extends IAddModelIntoStorage
{
    #nameDataBase = "";

    #nameStorage = "";

    constructor(newNameDataBase, newNameStorage = "")
    {
        super();
        this.#nameDataBase = newNameDataBase;
        this.#nameStorage = newNameStorage;
    }
    /**
     * Добавляет все сущности в хранилище Groups
     * @param {Array<GroupModelDto>} content 
     */
    async execute(content)
    {
        if (content == null)
            return;

        let indexDb = new IndexDBRepository;
        await indexDb.openRepository(this.#nameDataBase, this.#nameStorage);
        
        if (Array.isArray(content))
        {
            content.forEach(async group => 
                {
                    await indexDb.addDtoModel(group, this.#nameStorage);
                });
        }
    }
}