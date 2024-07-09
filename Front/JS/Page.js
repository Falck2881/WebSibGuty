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
            this._fill = newMethodfill; 
    }

    /**
     * Загружает содержимое страницы по переданному url
     * @param {string} url 
     */
    loadPage(url)
    {
        console.log(`Вывод значения ${url}`);
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

