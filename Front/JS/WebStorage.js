"use strict"
//@ts-check

/**
 * Класс отвечает за работу с временными хранилищами
 */
export class WebStorage
{
    // Производная WebStorage
    #_derivative;

    #_nameStorage = "";

    /**
     * 
     * @param {WebStorage} derivative
     * @param {string} name 
     */
    constructor(derivative, name)
    {
        if (derivative instanceof WebStorage)
            this.#_derivative = derivative
        else
            this.#_derivative = null;

        if (typeof name === "string")
            this.#_nameStorage = name;
    }

    /**
     * Добавляет содержимое раздела в временное хранилище 
     * @param {string} key 
     * @param {Array<any>} contentSection 
     */
    async addContentOfSectionInSessionStorage(contentSection)
    {
        if (Array.isArray(contentSection))
        {
            let readyContent = new Array;

            if (this.#_derivative instanceof WebStorage)
                readyContent = this.#_derivative.prepareContentToStorage(contentSection);

            sessionStorage.setItem(this.#_nameStorage, JSON.stringify(readyContent));
        }
    }

    /**
     * Подготавливает содержимое к хранению.
     * Производные классы должны переопределить.
     * @param {Array} content
     * @returns {Array} 
     */
    async prepareContentToStorage(content)
    {
        return Array.of();
    }
}