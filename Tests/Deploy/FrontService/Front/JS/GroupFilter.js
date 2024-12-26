"use strict"
//@ts-check

import {GroupModelDto} from "./Entities.js"
import {NullReferenceOfObjectError} from "./CommonException.js"


/**
 *  Класс выполняет:
 *  - хранение выбранных/введённых значений в фильтрах
 *  - поиск всех фильтров в разделе - Группы
 */
export class GroupFilter
{
    #GroupName = "";

    #FacultetName = "";

    constructor()
    {

    }

    /**
     * Преобразует в DTO объект
     * 
     * @returns {GroupModelDto} Возвращает DTO объект данного класса
     */
    #toGroupModelDto()
    {
        let groupModelDto = new GroupModelDto();

        groupModelDto.FacultetName = this.#FacultetName;
        groupModelDto.GroupName = this.#GroupName;

        return groupModelDto;
    }

    /**
    * Сохроняет введённые значения из полей ввода типа - text
    */
    async #saveSelectedOfValuesFromInputField()
    {
        let ulFilterInGroupSection = document.getElementById("selected-filter-Of-section");

        if (ulFilterInGroupSection == null)
            throw new NullReferenceOfObjectError(ulFilterInGroupSection, "HTML тег <ul> под id - selected-filter-Of-section, не был найден.");

        let facultetNameFilter = ulFilterInGroupSection.querySelector('input[id="one_Filter_FacultetName"]');

        if (facultetNameFilter != null)
        {
            console.log(`one_Filter_FacultetName - ${facultetNameFilter.value}`);
            this.#FacultetName = facultetNameFilter.value;
        }

        let groupNameFilter = ulFilterInGroupSection.querySelector('input[id="two_Filter_GroupName"]');

        if (groupNameFilter != null)
        {
            console.log(`two_Filter_GroupName - ${groupNameFilter.value}`);
            this.#GroupName = groupNameFilter.value;
        }
    }

    /**
     * Возвращает DTO модель группы
     * @returns DTO модель группы
     */
    async getDtoGroupModel()
    {
        try
        {
            await this.#saveSelectedOfValuesFromInputField();
        }
        catch(exception)
        {
            if (exception instanceof NullReferenceOfObjectError)
                console.error(`ERROR: ${exception.message}`);
        }

        return this.#toGroupModelDto();
    }

    /**
     * Проверяет пуст ли фильтр
     * @returns true - все поля пусты, false - некоторые (или все) поля НЕ пусты.
     */
    isEmptyFilters()
    {
        let result = false;

        let fieldFilters = new Array(this.#FacultetName, this.#GroupName);

        for(let i = 0; i < fieldFilters.length; ++i)
        {
            if (fieldFilters[i] === "")
                result = true;
            else
            {
                result = false;
                break;
            }
        }
        
        return result;
    }
}