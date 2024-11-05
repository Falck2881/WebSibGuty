"use strict"
//@ts-check

import { UserFilter } from "./UserFilter.js"
import { GroupFilter } from "./GroupFilter.js"
import { FacultetFilter } from "./FacultetFilter.js";
import { Section } from "./Section.js";
import { TableOfSections } from "./TableOfSections.js"
import { NullReferenceOfObjectError } from "./CommonException.js";

/**
 *  Поиск по всем фильтрам в разделе - Пользователи.
 *  Собирает выбранные/введённые значения и отправляет на контроллер сервера
 */
async function findByFiltersOfUsers()
{
    let userSelectedFilters = new UserFilter;

    try{
        await userSelectedFilters.saveInputsOfValuesFromFieldsOfInput();

        await userSelectedFilters.saveSelectedOfValuesFromSwitches();
    }
    catch(exception)
    {
        if (exception instanceof NullReferenceOfObjectError)
            console.error(`ERROR: ${exception.message}`);
    }
    const controllerName = "/api/user/table/filtered_users_content";

    // const controllerName = "http://localhost:5188/api/user/table/filtered_users_content";

    const requestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userSelectedFilters.toUserModelDto())
    };

    const resultSelectionByFilter = await fetch(controllerName, requestInit);

    try
    {
        if (!resultSelectionByFilter.ok)
            throw new Error("Ошибка сети: Неудалось получить результат выборки по пользовательским фильтрам.");
        
        let methodFillTable = new TableOfSections(); 
        let userSection = new Section(methodFillTable.fillUsersTable);
        var user = await resultSelectionByFilter.json();
        console.log(`User : ${user}`);

        await userSection.setContentSection(user);
        await userSection.updateSection("Sections/Users.html");
    }
    catch(error)
    {
        if (error instanceof Error)
            console.error(`${error.message} | Код ошибки: ${resultSelectionByFilter.status}`);
    }
}

/**
 *  Поиск по всем фильтрам в разделе - Группы.
 *  Собирает выбранные/введённые значения и отправляет на контроллер сервера
 */
async function findByFiltersOfGroups()
{
    let groupFilter = new GroupFilter();

    try
    {
        await groupFilter.saveSelectedOfValuesFromInputField()
    }
    catch(exception)
    {
        if (exception instanceof NullReferenceOfObjectError)
            console.error(`ERROR: ${exception.message}`);
    }

    const controllerName = "/api/group/table/filtered_groups_content";
    // const controllerName = "http://localhost:5188/api/group/table/filtered_groups_content"

    const requestInit = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(groupFilter.toGroupModelDto())
    };

    const resultSelectionByFilter = await fetch(controllerName, requestInit);

    try
    {
        if (!resultSelectionByFilter.ok)
            throw new Error("Ошибка сети: Неудалось получить результат выборки по пользовательским фильтрам.");
        
        let methodFillTable = new TableOfSections(); 
        let groupSection = new Section(methodFillTable.fillGroupsTable);
        var groups = await resultSelectionByFilter.json();
        console.log(`Groups : ${groups}`);

        await groupSection.setContentSection(groups);
        await groupSection.updateSection("Sections/Groups.html");
    }
    catch(error)
    {
        if (error instanceof Error)
            console.error(`${error.message} | Код ошибки: ${resultSelectionByFilter.status}`);
    }
}

/**
 *  Поиск по всем фильтрам в разделе - Факультеты.
 *  Собирает выбранные/введённые значения и отправляет на контроллер сервера
 */
async function findByFiltersOfFacultets()
{
    let facultetFilter = new FacultetFilter();

    try
    {
        await facultetFilter.saveSelectedOfValuesFromInputField()
    }
    catch(exception)
    {
        if (exception instanceof NullReferenceOfObjectError)
            console.error(`ERROR: ${exception.message}`);
    }

    const controllerName = "/api/facultet/table/filtered_facultets_content";
    // const controllerName = "http://localhost:5188/api/facultet/table/filtered_facultets_content"

    const requestInit = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(facultetFilter.toFacultetModelDto())
    };

    const resultSelectionByFilter = await fetch(controllerName, requestInit);

    try
    {
        if (!resultSelectionByFilter.ok)
            throw new Error("Ошибка сети: Неудалось получить результат выборки по пользовательским фильтрам.");
        
        let methodFillTable = new TableOfSections(); 
        let facultetSection = new Section(methodFillTable.fillFacultetTable);
        var facultets = await resultSelectionByFilter.json();
        console.log(`Facultets : ${facultets}`);

        await facultetSection.setContentSection(facultets);
        await facultetSection.updateSection("Sections/Facultets.html");
    }
    catch(error)
    {
        if (error instanceof Error)
            console.error(`${error.message} | Код ошибки: ${resultSelectionByFilter.status}`);
    }
}

window.findByFiltersOfUsers = findByFiltersOfUsers;
window.findByFiltersOfGroups = findByFiltersOfGroups;
window.findByFiltersOfFacultets = findByFiltersOfFacultets;