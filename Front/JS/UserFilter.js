"use strict"
//@ts-check

import {UserModelDto} from "./Entities.js"
import {NullReferenceOfObjectError} from "./CommonException.js"

/**
 *  Класс выполняет:
 *  - хранение выбранных/введённых значений в фильтрах
 *  - поиск всех фильтров в разделе - Пользователи
 */
export class UserFilter
{
    // Муж/Жен
    #Gender = "";

    // Военнообязанный
    #Military = "";

    // Выплаты 
    #CashSize = "";

    // Имя пользователя
    #FirstName = "";

    // Фамилия пользователя
    #LastName = "";

    constructor()
    {
    }

    /**
     * Преобразует в DTO объект
     * 
     * @returns {UserModelDto} Возвращает DTO объект данного класса
     */
    #toUserModelDto()
    {
        let userFilterDto = new UserModelDto;

        userFilterDto.Gender = this.#Gender,
        userFilterDto.Military = this.#Military,
        userFilterDto.CashSize = this.#CashSize,
        userFilterDto.FirstName = this.#FirstName,
        userFilterDto.LastName = this.#LastName

        return userFilterDto;
    }

    /**
     * Сохранить выбранные значения из переключателей типа radio
     */
    async #saveSelectedOfValuesFromSwitches()
    {
        let ulFiltersInUserSection = document.getElementById("selected-filter-Of-section");

        if (ulFiltersInUserSection == null)
            throw new NullReferenceOfObjectError(ulFiltersInUserSection, "HTML тег <ul> под id - selected-filter-Of-section, не был найден.");

        // Поиск фильтра с выбранным значением - по группе "Filter_User_Gender" 
        let selectGenderFilter = ulFiltersInUserSection.querySelector('input[name="Filter_User_Gender"]:checked');

        if (selectGenderFilter != null)
        {
            console.log(`Был выбран фильтр под ID - Filter_User_Gender - ${selectGenderFilter.value}`);
            this.#Gender = selectGenderFilter.value;
        }

        // Поиск фильтра с выбранным значением - по группе "Filter_User_Military" 
        let selectMilitaryFilter = ulFiltersInUserSection.querySelector('input[name="Filter_User_Military"]:checked');

        if (selectMilitaryFilter != null)
        {
            console.log(`Был выбран фильтр под ID - Filter_User_Military - ${selectMilitaryFilter.value}`);
            this.#Military = selectMilitaryFilter.value;
        }

        // Поиск фильтра с выбранным значением - по группе "Filter_User_CashSize"
        let selectCashSizeFilter =  ulFiltersInUserSection.querySelector('input[name="Filter_User_CashSize"]:checked');

        if (selectCashSizeFilter != null )
        {
            console.log(`Был выбран фильтр под ID - Filtet_User_CashSize - ${selectCashSizeFilter.value}`);
            this.#CashSize = selectCashSizeFilter.value;
        }
    }

    /**
    * Сохроняет введённые значения из полей ввода типа - text
    */
    async #saveInputsOfValuesFromFieldsOfInput()
    {
        let ulFiltersInUserSection = document.getElementById("selected-filter-Of-section");

        if (ulFiltersInUserSection == null)
            throw new NullReferenceOfObjectError(ulFiltersInUserSection, "HTML тег <ul> под id - selected-filter-Of-section, не был найден.");

        // Поиск фильтра с введённой строкой - по id
        let firstNameFilter = ulFiltersInUserSection.querySelector('input[id="one_Filter_FirstName"]');

        if (firstNameFilter != null)
        {
            console.log(`Был выбран фильтр под ID - one_Filter_FirstName - ${firstNameFilter.value}`);
            this.#FirstName = firstNameFilter.value;
        }

        // Поиск фильтра с введённой строкой - по id
        let lastNameFilter = ulFiltersInUserSection.querySelector('input[id="two_Filter_LastName"]'); 

        if (lastNameFilter != null)
        {
            console.log(`Был выбран фильтр под ID - two_Filter_LastName - ${lastNameFilter.value}`);
            this.#LastName = lastNameFilter.value;
        }
    }

    /**
     * Возвращает выбранные фильтры
     * @returns DTO модель пользователя
     */
    async getSelectedFilters()
    {
        try{
            await this.#saveInputsOfValuesFromFieldsOfInput();
    
            await this.#saveSelectedOfValuesFromSwitches();
        }
        catch(exception)
        {
            if (exception instanceof NullReferenceOfObjectError)
                console.error(`ERROR: ${exception.message}`);
        }
    
        return this.#toUserModelDto();
    }

    /**
     * Проверяет пуст ли фильтр
     * @returns true - все поля пусты, false - некоторые (или все) поля НЕ пусты.
     */
    isEmptyFilters()
    {
        let result = false;

        let fieldFilters = new Array(this.#CashSize, this.#FirstName, 
            this.#Gender, this.#LastName, this.#Military);

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