"use strict"
//@ts-check

import {UserModelDto} from "./Entities.js"
import {NullReferenceOfObjectError} from "./CommonException.js"

/**
 *  DTO объект который содержит выбранные фильтры в разделе Пользователи
 */
export class UserFilter
{
    #Gender = "";

    #Military = "";

    #FirstName = "";

    #LastName = "";

    constructor()
    {
    }

    /**
     * Преобразует в DTO объект
     * 
     * @returns {UserModelDto} Возвращает DTO объект данного класса
     */
    toJSON()
    {
        let userFilterDto = new UserModelDto;

        userFilterDto.Gender = this.#Gender,
        userFilterDto.Military = this.#Military,
        userFilterDto.FirstName = this.#FirstName,
        userFilterDto.LastName = this.#LastName

        return userFilterDto;
    }

    /**
     * Сохранить выбранные значения из переключателей типа radio
     */
    async saveSelectedOfValuesFromSwitches()
    {
        let ulFilters = document.getElementById("selected-filter-Of-section");

        if (ulFilters == null)
            throw new NullReferenceOfObjectError(ulFilters, "HTML тег <ul> под id - selected-filter-Of-section, не был найден.");

        // Поиск фильтра с выбранным значением - по группе "Filter_User_Gender" 
        let selectGenderFilter = ulFilters.querySelector('input[name="Filter_User_Gender"]:checked');

        if (selectGenderFilter != null)
        {
            console.log(`Filter_User_Gender = ${selectGenderFilter.value}`);
            this.#Gender = selectGenderFilter.value;
        }

        // Поиск фильтра с выбранным значением - по группе "Filter_User_Military" 
        let selectMilitaryFilter = ulFilters.querySelector('input[name="Filter_User_Military"]:checked');

        if (selectMilitaryFilter != null)
        {
            console.log(`Filter_User_Military = ${selectMilitaryFilter.value}`);
            this.#Military = selectMilitaryFilter.value;
        }
    }

    /**
    * Сохроняет введённые значения из полей ввода 
    */
    async saveInputsOfValuesFromFieldsOfInput()
    {
        let ulFilters = document.getElementById("selected-filter-Of-section");

        if (ulFilters == null)
            throw new NullReferenceOfObjectError(ulFilters, "HTML тег <ul> под id - selected-filter-Of-section, не был найден.");

        // Поиск фильтра с введённой строкой - по id
        let firstNameFilter = ulFilters.querySelector('input[id="one_Filter_FirstName"]');

        if (firstNameFilter != null)
        {
            console.log(`one_Filter_FirstName ${firstNameFilter.value}`);
            this.#FirstName = firstNameFilter.value;
        }

        // Поиск фильтра с введённой строкой - по id
        let lastNameFilter = ulFilters.querySelector('input[id="two_Filter_LastName"]'); 

        if (lastNameFilter != null)
        {
            console.log(`two_Filter_LastName ${lastNameFilter.value}`);
            this.#LastName = lastNameFilter.value;
        }
    }
}