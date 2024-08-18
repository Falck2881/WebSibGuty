"use strict";
//@ts-check

/**
 * Этот класс служит общей абстракцией по работе с содержимым страницей
 */
export class Page
{
    /**
     * Инвентируем функцию обратного вызова для заполнения страницы. Делаем это только один раз при загрузки главной страницы.
     * @param {function} fill 
     */
    constructor(newMethodfill)
    {
        if (typeof newMethodfill === 'function')
        {
            this._fill = newMethodfill;
            this._contentPage = new Array();
        }
    }

    /**
     * Загружает содержимое страницы
     * @param {string} url 
     */
    loadContentPage(url)
    {
        fetch(url)
        .then(response => 
        {
            if(!response.ok)
                throw new Error("Network responce was not ok");

            return response.json();
        })
        .then(data => 
        {
            console.log('Users received from server:', data);
            this._contentPage = data;
        })
        .catch(error =>{
            console.error('There was a problem with your fetch operation:', error);
        });
    }

    /**
     * Загружает страницы по переданному url
     * @param {string} url 
     */
    loadPage(url)
    {
        fetch(url)
        .then(response => {
            if (!response.ok)
                throw new Error("Network response was not ok");
    
            return response.text();
        })
        .then(data => {
            document.getElementById("content").innerHTML = data;
            this._fill();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('content').innerHTML = '<p>Ошибка загрузки содержимого. Пожалуйста, попробуйте позже.</p>';
        })
    }

    /**
     * Устанавливаем новый способ заполнения страницы.
     * В нашем случае это функция обратного вызова
     * @param {function} newMethodfill 
     */
    setMethodFill(newMethodfill)
    {
        if (typeof newMethodfill === 'function')
            this._fill = newMethodfill; 
    }
}

