"use strict"
//@ts-check

import { EntityDto } from "./Entities.js"

export class HttpRequest
{
    #_request;

    #_valueHeaderJson = "";

    /**
     * Установить значение заголовка - Json
     * @param {string} valueHeaderJson 
     */
    addContentTypeJson()
    {
        this.#_valueHeaderJson = "application/json";
    }

    /**
     * Адресс куда отправляем запрос
     * @param {string} url 
     * @param {EntityDto} entity 
     * @returns {Promise<Response>}
     */
    async PostAsync(url, entity)
    {
        const requestInit = {
            method: "POST",
            headers: {
                "Content-Type": this.#_valueHeaderJson
            },
            body: JSON.stringify(entity)
        };
    
        return await fetch(url, requestInit);
    }
}