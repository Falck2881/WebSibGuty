"use strict"
//@ts-check

import {FacultetModelDto} from "./Entities.js"
import {NullReferenceOfObjectError} from "./CommonException.js"

/**
 *  Класс выполняет:
 *  - хранение выбранных/введённых значений в фильтрах
 *  - поиск всех фильтров в разделе - Факультеты
 */
export class FacultetFilter
{
    #FacultetName = "";

    #Dean = "";

    constructor()
    {

    }

    /**
     * Преобразует в DTO объект
     * 
     * @returns {FacultetModelDto} Возвращает DTO объект данного класса
     */
    #toFacultetModelDto()
    {
        let facultetDto = new FacultetModelDto();

        facultetDto.Dean = this.#Dean;
        facultetDto.FacultetName = this.#FacultetName;

        return facultetDto;
    }

    /**
    * Сохроняет введённые значения из полей ввода типа - text
    */
    async #saveSelectedOfValuesFromInputField()
    {
        let ulFilterInFacultetSection = document.getElementById("selected-filter-Of-section");

        if (ulFilterInFacultetSection == null)
            throw new NullReferenceOfObjectError(ulFilterInFacultetSection, "HTML тег <ul> под id - selected-filter-Of-section, не был найден.");

        let facultetNameFilter = ulFilterInFacultetSection.querySelector('input[id="one_Filter_FacultetName"]');

        if (facultetNameFilter != null)
        {
            console.log(`one_Filter_FacultetName - ${facultetNameFilter.value}`);
            this.#FacultetName = facultetNameFilter.value;
        }

        let nameDeanFilter = ulFilterInFacultetSection.querySelector('input[id="two_Filter_NameDean"]');

        if (nameDeanFilter != null)
        {
            console.log(`two_Filter_NameDean - ${nameDeanFilter.value}`);
            this.#Dean = nameDeanFilter.value;
        }
    }

    /**
     * Возвращает DTO модель факультета
     * 
     * @returns DTO модель факультета
     */
    async getDtoFacultetModel()
    {
        try
        {
            await this.#saveSelectedOfValuesFromInputField()
        }
        catch(exception)
        {
            if (exception instanceof NullReferenceOfObjectError)
                console.error(`ERROR: ${exception.message}`);
        }

        return this.#toFacultetModelDto();
    }
}