"use strict"
//@ts-check

import {UserFilter} from "./UserFilter.js"
import { Section } from "./Section.js";
import {TableOfSections} from "./TableOfSections.js"

/**
 *  Поиск по всем фильтрам в разделе - Пользователи.
 *  Собирает выбранные/введённые значения и отправляет на контроллер сервера
 */
async function findByFiltersOfUsers()
{
    let userSelectedFilters = new UserFilter;

    await userSelectedFilters.saveInputsOfValuesFromFieldsOfInput();

    await userSelectedFilters.saveSelectedOfValuesFromSwitches();

    //const controllerName = "/api/user/table/filtered_content";

    const controllerName = "http://localhost:5188/api/user/table/filtered_content";

    const requestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userSelectedFilters.toJSON())
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

window.findByFiltersOfUsers = findByFiltersOfUsers;