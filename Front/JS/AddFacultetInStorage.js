"use strict"
//@ts-check

import { IAddModelIntoStorage } from "./IAddModelIntoStorage.js"
import { IndexDBRepository } from "./IndexDBRepository.js"
import { FacultetModelDto } from "./Entities.js"


export class UpdateFacultetStorage extends IAddModelIntoStorage
{
    /**
     * Добавляет все сущности в хранилище
     * @param {Array<FacultetModelDto>} content 
     */
    async execute(content)
    {
        if (content == null)
            return new Array;

        let facultets = new Array;
        
        let indexDb = new IndexDBRepository("Facultets");

        if (Array.isArray(content))
        {
            content.forEach(async facultet  => 
                {
                    await indexDb.addDtoModel(facultet);
                });
        }
    }
}