"use strict"
//@ts-check

import {EntityDto, UserModelDto} from "./Entities.js"

/**
 * 
 * @param  {Array<string>} namesStorage - названия хранилищ для инициализации
 * @returns {Promise<void>}
 */
export async function initializedDBRepository(namesStorage)
{
    return new Promise((resolve, reject) => 
    {
        const dbRequest = window.indexedDB.open("WebSibguty");

        /*
        * Устанавливаем событие для успешно инициализации базы данных;
        */
        dbRequest.onsuccess = (event) =>
            {
                const db = event.target.result;
                
                if (db instanceof IDBDatabase)
                    console.log(`IndexDB успешно инициализирована: ${db}`);

                resolve(db);
            };

        /*
        * Устанавливает событие ошибки при инициализации базы
        */
        dbRequest.onerror = (event) =>
            {
                const error = event.target.error;
                console.error(`Ошибка при инициализации базы данных: ${error.message}`);
                reject(event.target.error)
            };

        /*
        * Создаёт хранилище.
        * Событие upgradeneeded вызывается только при отсутствии хранилища или отсутствии этого хранилища в новой версии
        */
        dbRequest.onupgradeneeded = (event) =>
            {
                const db = event.target.result;
                console.log(" const db = event.target.result;")
                if (db instanceof IDBDatabase)
                {
                    console.log("Прошли db instanceof IDBDatabase")
                    namesStorage.forEach(nameStorage => 
                        {
                            // Если не существует хранилища под указанным именем, то добавляем это хранилище. 
                            if (!db.objectStoreNames.contains(nameStorage))
                            {
                                db.createObjectStore(nameStorage, {keyPath: "Id", autoIncrement: false});
                                console.log(`Создали - ${nameStorage}`);
                            }
                        });
                }
            }
    });
}

/**
 * Класс по работе с базой данных и его хранилищами 
 */
export class IndexDBRepository
{
    // База данных
    #_dataBase;

    // Название хранилища 
    #_nameStorage = ""; 

    /**
     * @param {string} nameStorage 
     */
    constructor(nameStorage)
    {
        this.#_nameStorage = nameStorage;
    }

    async openRepository()
    {
        return new Promise((resolve, reject) => 
            {
                const request = window.indexedDB.open("WebSibguty");

                /*
                * Устанавливаем событие для успешно открытой базе данных;
                */
                request.onsuccess = (event) =>
                    {
                        const db = event.target.result;
                        
                        if (db instanceof IDBDatabase)
                        {
                            this.#_dataBase = db;
                        }
                        
                        resolve(this.#_dataBase)
                    };

                /*
                * Устанавливает событие ошибки при открытие базы
                */
                request.onerror = (event) =>
                    {
                        const error = event.target.error;
                        console.error(`Ошибка при открытии базы данных: ${error.message}`);
                        reject(event.target.error)
                    };
            });
    }

    /**
     * Добавляет сущность в хранилище
     * @param {EntityDto} entity 
     */
    async addDtoModel(entity)
    {
        if (this.#_dataBase === null)
            await this.openRepository();

        const trunsaction = this.#_dataBase.transaction(this.#_nameStorage, "readwrite");

        const storage = trunsaction.objectStore(this.#_nameStorage);

        let request = storage.get(entity.Id);

        request.onsuccess = (event) => 
            {
                let existEntry = event.target.result;
                if (existEntry === undefined)
                    storage.add(entity);
            }
        
    }

    /**
     * Вернуть сущность
     * @param {string} id
     * @returns {EntityDto} Возвращает сущность или null если такой сущности нету.
     */
    async getEntity(id)
    {
        const transaction = this.#_dataBase.transaction(this.#_nameStorage, "readonly");

        const storyObject = transaction.objectStore(this.#_nameStorage);
        
        let entity = null;

        let getRequest = storyObject.get(id);

        getRequest.onsuccess = (event) => 
            {
                entity = event.target.result;
            }
        
        return entity;
    }

    /**
     * Возврщает все сущности из хранилища
     * @returns 
     */
    async getAllEntities()
    {
        return new Promise((resolve, reject) => 
            {
                const transaction = this.#_dataBase.transaction(this.#_nameStorage, "readonly");

                const storyObject = transaction.objectStore(this.#_nameStorage);

                let getRequest = storyObject.getAll();

                getRequest.onsuccess = (event) => 
                    { 
                        const entitiesStorage = event.target.result;
                        
                        resolve(entitiesStorage);
                    };
            })
    }
}