"use strict"
//@ts-check


/**
 * Класс занимается строительствомм фильтров.
 */
export class BuilderFilter
{
    /**
     * Добавляет события по работе с фильтрами
     */
    async addEventsToWorkWithFilters()
    {
        console.log("DOM полностью загружен");
        let filtersCheckboxes = document.getElementById("filters_section");
        
        if (filtersCheckboxes) 
        {
            console.log("Элемент найден");
            filtersCheckboxes.addEventListener("change", async (event) =>
            {
                if (event.target.tagName.toLowerCase() === "input" && event.target.type === "checkbox")
                    await this.#managmentFilters(event.target);
                    
            });
        }
        else
            console.error("Элемент с id 'filters_section' не найден.");
        
    }

    /**
     * 
     * @param {HTMLInputElement} target 
     */
    async #managmentFilters(target)
    {
        if (target instanceof HTMLInputElement)
        {
            console.log("managmentFilters");
            let filter = document.getElementById(target.id);

            if (filter != null)
            {
                if (target.checked)
                    await this.#addFilter(filter)
                else
                    await this.#removeFilter(filter);
            }
        }
    }

    /**
     * Добавляет новый фильтр в панель фильтров
     * 
     * @param {HTMLElement} filter 
     */
    async #addFilter(filter)
    {
        if (filter instanceof HTMLElement)
        {
            let fieldset = document.createElement("fieldset");

            fieldset.className = "fieldset-filter";

            let legend = document.createElement("legend");

            // Отоброжаем текстовый узел внутри label
            let title = document.createTextNode(filter.nextSibling.nodeValue);
            
            legend.appendChild(title);
            
            fieldset.appendChild(legend);

            await this.#createFilter(filter, fieldset);
            
            let list = document.getElementById("selected-filter-Of-section");
            
            let elementList = document.createElement("li");

            elementList.className = "li-filter";

            elementList.setAttribute("id", filter.value);
            
            elementList.appendChild(fieldset);
            
            if (list != null)
                list.appendChild(elementList);
        }
    }

    /**
     * Удаляет фильтр из панели фильтров
     * 
     * @param {HTMLElement} filter 
     */
    async #removeFilter(filter)
    {
        if (filter instanceof HTMLElement)
        {
            let liFilter = document.getElementById(filter.value);

            if (liFilter != null)
            {
                let ulSelectedFilters = liFilter.parentNode;

                ulSelectedFilters.removeChild(liFilter);
            }
        }
    }

    /**
     * Создаёт тег input определённого вида 
     * 
     * @param {HTMLElement} filter 
     * @param {HTMLFieldSetElement} fieldsetFilter 
     * @returns {HTMLInputElement}
     */
    async #createFilter(filter, fieldsetFilter)
    {
        let input = document.createElement("input");
        
        if (filter.value === "Filter_Gender")
        {
            // Добавляем в фильтр "Пол" - муж
            let inputMen = document.createElement("input");
            let labelMen = document.createElement("label");
            labelMen.htmlFor = "men_filter";

            inputMen.type = "radio";
            inputMen.id = "men_filter";
            inputMen.value = "Мужчина";
            inputMen.name = "Filter_User_Gender";
            labelMen.appendChild(inputMen);

            labelMen.appendChild(document.createTextNode("Муж."));

            fieldsetFilter.appendChild(labelMen);

            // Добавляем в фильтр "Пол" - жен

            let inputWomen = document.createElement("input");
            let labelWomen = document.createElement("label");
            labelWomen.htmlFor = "women_filter";

            inputWomen.type = "radio";
            inputWomen.id = "women_filter";
            inputWomen.value = "Женщина";
            inputWomen.name = "Filter_User_Gender";
            labelWomen.appendChild(inputWomen);

            labelWomen.appendChild(document.createTextNode("Жен."));

            fieldsetFilter.appendChild(labelWomen);

            return;
        }
        else if (filter.value === "Filter_Military")
        {
            // Добавляем в фильтр "Военнообязанный" пункт - Освобождён от военной службы
            let inputFreeByMilitary = document.createElement("input");
            let labelFreeByMilitary = document.createElement("label");
            labelFreeByMilitary.htmlFor = "military_filter";

            inputFreeByMilitary.type = "radio";
            inputFreeByMilitary.id = "military_filter";
            inputFreeByMilitary.value = "Освобождён от военной службы";
            inputFreeByMilitary.name = "Filter_User_Military";
            labelFreeByMilitary.appendChild(inputFreeByMilitary);

            labelFreeByMilitary.appendChild(document.createTextNode("Освобождён от военной службы"));

            fieldsetFilter.appendChild(labelFreeByMilitary);

            // Добавляем в фильтр "Военнообязанный" пункт - Военнообязан
            let inputFreeByMilitary_1 = document.createElement("input");
            let labelFreeByMilitary_1 = document.createElement("label");
            labelFreeByMilitary_1.htmlFor = "military_filter_1";

            inputFreeByMilitary_1.type = "radio";
            inputFreeByMilitary_1.id = "military_filter_1";
            inputFreeByMilitary_1.value = "Военнообязан";
            inputFreeByMilitary_1.name = "Filter_User_Military";
            labelFreeByMilitary_1.appendChild(inputFreeByMilitary_1);

            labelFreeByMilitary_1.appendChild(document.createTextNode("Военнообязан"));

            fieldsetFilter.appendChild(labelFreeByMilitary_1);

            // Добавляем в фильтр "Военнообязанный" пункт - Бронь
            let inputFreeByMilitary_2 = document.createElement("input");
            let labelFreeByMilitary_2 = document.createElement("label");
            labelFreeByMilitary_2.htmlFor = "military_filter_2";

            inputFreeByMilitary_2.type = "radio";
            inputFreeByMilitary_2.id = "military_filter_2";
            inputFreeByMilitary_2.value = "Бронь";
            inputFreeByMilitary_2.name = "Filter_User_Military";
            labelFreeByMilitary_2.appendChild(inputFreeByMilitary_2);

            labelFreeByMilitary_2.appendChild(document.createTextNode("Бронь"));

            fieldsetFilter.appendChild(labelFreeByMilitary_2);

            return;
        }
        
        input.type = "text";
        let idValue = filter.id + '_' + filter.value
        console.log(`IdValue - ${idValue}`);
        input.setAttribute("id", idValue);
        fieldsetFilter.appendChild(input);
    }
}