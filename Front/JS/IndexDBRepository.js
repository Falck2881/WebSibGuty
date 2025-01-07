"use strict"
//@ts-check

import {EntityDto} from "./Entities.js"

/**
 * Инициализирует стартовые хранлища для моделей из базы данных
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
                if (db instanceof IDBDatabase)
                {
                    namesStorage.forEach(nameStorage => 
                        {
                            // Если не существует хранилища под указанным именем, то добавляем это хранилище. 
                            if (!db.objectStoreNames.contains(nameStorage))
                            {
                                db.createObjectStore(nameStorage, {keyPath: "Id", autoIncrement: false});
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

    /**
     * Открывает базу данных
     * @param {string} nameDataBase - название базы данных 
     * @param {string} nameStorage - название хранилища
     * @returns {Promise<void>} 
     */
    async openRepository(nameDataBase, nameStorage = "")
    {
        return new Promise((resolve, reject) => 
            {
                const request = window.indexedDB.open(nameDataBase);

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

                /*
                * Создаёт хранилище.
                * Событие upgradeneeded вызывается только при отсутствии хранилища или отсутствии этого хранилища в новой версии
                */
                request.onupgradeneeded = (event) =>
                    {
                        const db = event.target.result;
                        if (db instanceof IDBDatabase)
                        {
                            // Если не существует хранилища под указанным именем, то добавляем это хранилище. 
                            if (!db.objectStoreNames.contains(nameStorage))
                            {
                                db.createObjectStore(nameStorage, {keyPath: "Id", autoIncrement: false});
                            }
                        }
                    }
            });
    }

    /**
     * Добавляет сущность в хранилище
     * @param {EntityDto} entity - сущность которую добавляем
     * @param {string} nameStorage - название хранилища
     * @returns {Promise<void>}
     */
    async addDtoModel(entity, nameStorage)
    {
        if (this.#_dataBase === null)
            await this.openRepository();

        const trunsaction = this.#_dataBase.transaction(nameStorage, "readwrite");

        const storage = trunsaction.objectStore(nameStorage);

        const request = storage.get(entity.Id);

        request.onsuccess = (event) => 
            {
                let existEntry = event.target.result;
                if (existEntry === undefined)
                    storage.add(entity);
            }
        
        request.onerror = (event) =>
            {
                console.error(`Error: failed add DtoModel: ${event.target.error}`)
            }
        
    }

    /**
     * Вернуть сущность
     * @param {string} id - уникальный id сущности
     * @param {string} nameStorage - название сущности
     * @returns {Promise<EntityDto>} Возвращает сущность или null если такой сущности нету.
     */
    async getEntity(id, nameStorage)
    {
        return new Promise((resolve, reject) => 
        {
            const transaction = this.#_dataBase.transaction(nameStorage, "readonly");

            const storyObject = transaction.objectStore(nameStorage);
            
            let entity = null;

            const getRequest = storyObject.get(id);

            getRequest.onsuccess = (event) => 
                {
                    entity = event.target.result;
                    resolve(entity);
                }

            getRequest.onerror = (event) => 
                {
                    console.error(`Error: failed get entity ${event.target.error}`);
                    reject();
                }   
        })
    }

    /**
     * Возврщает все сущности из хранилища
     * @param {string} nameStorage - название хранилища 
     * @returns {Promise<Array>}
     */
    async getAllEntities(nameStorage)
    {
        return new Promise((resolve, reject) => 
            {
                const transaction = this.#_dataBase.transaction(nameStorage, "readonly");

                const storyObject = transaction.objectStore(nameStorage);

                const getRequest = storyObject.getAll();

                getRequest.onsuccess = (event) => 
                    { 
                        const entitiesStorage = event.target.result;
                        
                        resolve(entitiesStorage);
                    };
                
                getRequest.onerror = (event) => 
                    {
                        console.error(`Error: failed get all entities - ${event.target.error}`);
                    }
            })
    }

    /**
     * Очищает хранилище
     * @param {string} nameStorage 
     * @returns {Promise<void>}
     */
    async clearStorage(nameStorage)
    {
        return new Promise((resolve, reject) => 
            {
                const transaction = this.#_dataBase.transaction(nameStorage, "readwrite");

                const storage = transaction.objectStore(nameStorage);

                const clearRequest = storage.clear();

                clearRequest.onsuccess = (event) => 
                    {
                        console.log(`Successfully clear storage ${nameStorage} | ${event.target.result}`);
                        resolve();
                    }
                
                clearRequest.onerror = (event) => 
                    {
                        console.error(`ERROR: failed clear storage - ${nameStorage} | ${event.target.error}`);
                        reject();
                    }
            });
    }

    /**
     * Обновляет запись в хранилище
     * @param {EntityDto} entity - сущность которую добавляем
     * @param {string} nameStorage - названия хранилища 
     */
    async updateEntity(entity, nameStorage)
    {
        return new Promise((resolve, reject) => 
            {
                const transaction = this.#_dataBase.transaction(nameStorage, "readwrite");

                let storage = transaction.objectStore(nameStorage);

                let request = storage.put(entity);

                request.onsuccess = () =>
                {
                    console.log(`Successfully update entity in storage ${nameStorage} `);
                    resolve();
                };

                request.onerror = () =>
                {
                    console.error(`ERROR: failed update entity in storage - ${nameStorage} `);
                    reject();
                }
            });
    }
}