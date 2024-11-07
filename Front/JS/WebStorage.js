"use strict"
//@ts-check

/**
 * Класс отвечает за работу с временными хранилищами
 */
export class WebStorage
{
    /**
     * Добавляет содержимое раздела в временное хранилище 
     * @param {string} key 
     * @param {Array<any>} contentSection 
     */
    addContentOfSectionInSessionStorage(key, contentSection)
    {
        if (Array.isArray(contentSection))
            sessionStorage.setItem(key, JSON.stringify(contentSection));
    }
}