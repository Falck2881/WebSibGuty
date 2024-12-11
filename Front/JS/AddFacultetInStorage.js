"use strict"
//@ts-check

import { IAddModelIntoStorage } from "./IAddModelIntoStorage.js"
import { IndexDBRepository } from "./IndexDBRepository.js"
import { FacultetModelDto } from "./Entities.js"

/**
 * Реализует добавления всех сущностей Факультетов во временное хранилище
 */
export class AddFacultetInStorage extends IAddModelIntoStorage
{
    /**
     * Добавляет все сущности в хранилище
     * @param {Array<FacultetModelDto>} content 
     */
    async execute(content)
    {
        if (content == null)
            return new Array;
        
        let indexDb = new IndexDBRepository("Facultets");
        await indexDb.openRepository();
        
        if (Array.isArray(content))
        {
            content.forEach(async facultet  => 
                {
                    await indexDb.addDtoModel(facultet);
                });
        }
    }
}