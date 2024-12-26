"use strict"
//@ts-check

import {IAddModelIntoStorage} from "./IAddModelIntoStorage.js"
import { EntityDto } from "./Entities.js";

/**
 * Класс хранилища для работы с Dto моделями
 */
export class StorageDtoModels
{
    #_addModel;

    constructor()
    {
        this.#_addModel = null;
    }

    /**
     * Устанавливает способ добавления модели в хранилище
     * @param {IAddModelIntoStorage} method 
     */
    setMethodAddedModel(method)
    {
        if (method != null && method instanceof IAddModelIntoStorage)
            this.#_addModel = method;
    }

    /**
     * Добавляет все DTO модели в хранилище
     * @param {Array<EntityDto>} content 
     */
    async addAllDtoModelsInStorage(content)
    {
        await this.#_addModel.execute(content);
    }

}