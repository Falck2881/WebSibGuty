"use strict";
//@ts-check
import {BuilderFilter} from "./BuilderFilter.js"
import {UserModelDto} from "./Entities.js"

/**
 * Этот класс служит общей абстракцией по работе с содержимым раздела
 */
export class Section
{
    #_fillTable = () => {};

    #_contentSection = new Array();

    #_filter = new BuilderFilter();

    #_hostName = "";

    /**
     * Инвентируем функцию обратного вызова для заполнения страницы.
     * @param {Function} newMethodfillTable 
     */
    constructor(newMethodfillTable)
    {
        if (typeof newMethodfillTable === 'function')
            this.#_fillTable = newMethodfillTable;

        //для деплоя 
        this.#_hostName = "/api";

        // this.#_hostName = "http://127.0.0.1:8000/api"
    }


    /**
     * Устанавливаем новый способ заполнения раздела.
     * В нашем случае это функция обратного вызова
     * @param {Function} newMethodfillTable 
     */
    setMethodFill(newMethodfillTable)
    {
        if (typeof newMethodfillTable === 'function')
            this.#_fillTable = newMethodfillTable; 
    }

    /**
     * 
     * @param {Array<UserModelDto>} newContentSection 
     */
    setContentSection(newContentSection)
    {
        this.#_contentSection = newContentSection;
    }

    /**
     * Устанавливает внутренности раздела
     * 
     * @param {string} innerHtml 
     */
    setSection(innerHtml = "")
    {
        document.getElementById("content").innerHTML = innerHtml;
    }

    /**
     *  Обновляыет раздел 
     * @param {string} url 
     */
    async updateSection(url)
    {
        this.setSection();
        await this.loadSection(url);
        await this.fillTable();
        await this.addAllEvents();
    } 

    /**
     * Добавляет все необходимые события в раздел 
     */
    async addAllEvents()
    {
        await this.#_filter.addEventsToWorkWithFilters();
    }

    /**
     * Заполняет таблицу
     */
    async fillTable()
    {
        await this.#_fillTable(this.#_contentSection);
    }

    /**
     * Загружает содержимое раздела
     * @param {string} url 
     */
    async loadContentSection(url)
    {
        var str = this.#_hostName + url;
        console.log(str);
        await fetch(str)
        .then(response => 
        {
            if(!response.ok)
                throw new Error("Network responce was not ok");

            return response.json();
        })
        .then(data => 
        {
            console.log('Users received from server:', data);
            this.#_contentSection = data;
        })
        .catch(error =>{
            console.error('There was a problem with your fetch operation:', error);
        });
    }

    /**
     * Загружает раздел по переданному url
     * @param {string} url 
     */
    async loadSection(url)
    {
        await fetch(url)
        .then(response => {
            if (!response.ok)
                throw new Error("Network response was not ok");
    
            return response.text();
        })
        .then(async innerHtml => {
            this.setSection(innerHtml);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            var innerError = '<p>Ошибка загрузки содержимого. Пожалуйста, попробуйте позже.</p>';
            this.setSection(innerError);
        })
    }
}
