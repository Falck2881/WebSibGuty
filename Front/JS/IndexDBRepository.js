"use strict"
//@ts-check

import {EntityDto} from "./Entities.js"

export class IndexDBRepository
{
    // База данных
    #_dataBase;

    // Название хранилища 
    #_nameStorage = ""; 

    /**
     * 
     * @param {string} nameStorage 
     */
    constructor(nameStorage)
    {
        this.#_dataBase = indexedDB.open("WebSibguty");
        this.#_nameStorage = nameStorage;

        this.#setEventSuccessfullyOpen();
        this.#setEventErrorOpen();
        this.#createStorages();
    }

    /**
     * Устанавливаем событие для успешно открытой базе данных;
     */
    #setEventSuccessfullyOpen()
    {
        this.#_dataBase.onsuccess = (event) =>
        {
            const db = event.target.result;
            
            if (db instanceof IDBDatabase)
            {
                console.log(`IndexDB открыт: ${db.name}`)
            }
        };
    }

    /**
     * Устанавливает событие ошибки при открытие базы
     */
    #setEventErrorOpen()
    {
        this.#_dataBase.error = (event) =>
        {
            const db = event.target.error;
            console.error(`Ошибка при открытии базы данных: ${db.message}`);
            db.close();
        };
    }

    /**
     * Создаёт хранилище
     */
    #createStorages()
    {
        this.#_dataBase.onupgradeneeded = (event) =>
        {
            const db = event.target.result;
            
            if (db instanceof IDBDatabase)
            {
                // Если не существует хранилища под указанным именем, то добавляем это хранилище. 
                if (!db.objectStoreNames.contains(this.#_nameStorage));
                {
                    db.createObjectStore(this.#_nameStorage, {keyPath: "Id", autoIncrement: false});
                }
            }
        }
    }

    /**
     * Добавляет сущность в хранилище
     * @param {EntityDto} entity 
     */
    async addDtoModel(entity)
    {
        const db = this.#_dataBase.result;

        const trunsaction = db.transaction(this.#_nameStorage, "readwrite");

        const storage = trunsaction.objectStore(this.#_nameStorage);

        if (entity instanceof EntityDto)
        {
            let existEntry = storage.get(entity.Id);

            // Если сущности нету в хранилище то добавляе.
            if (existEntry == null)
                storage.add(existEntry);
        }
    }

    /**
     * Вернуть сущность
     * @param {string} id
     * @returns {EntityDto} Возвращает сущность 
     */
    async getEntity(id)
    {
        const db = this.#_dataBase.result;

        const transaction = db.transaction(this.#_nameStorage, "readonly");

        const storyObject = transaction.objectStore(this.#_nameStorage);

        return storyObject.get(id);
    }
}