"use strict"
//@ts-check

import { UserFilter } from "./UserFilter.js"
import { GroupFilter } from "./GroupFilter.js"
import { FacultetFilter } from "./FacultetFilter.js";
import { Section } from "./Section.js";
import { TableOfSections } from "./TableOfSections.js"
import { HttpRequest } from "./HttpRequest.js"
import { IndexDBRepository } from "./IndexDBRepository.js";
import { EntityDto } from "./Entities.js";

/**
 *  Поиск по всем фильтрам в разделе - Пользователи.
 *  Собирает выбранные/введённые значения и отправляет на контроллер сервера
 */
async function findByFiltersOfUsers()
{
    // Найденная модель - ищем либо в локальном Хранилище либо на сервере в базе
    let findUserModelDto = new EntityDto;

    let userSelectedFilters = new UserFilter;

    // Вытаскиваем готовую модель с выбранными атрибутами из фильтров в разделе "Пользователи"
    let userModelDto = await userSelectedFilters.getUserDtoModel();

    const indexDB = new IndexDBRepository("Users");

    // Пробуем найти в локальном хранилище
    findUserModelDto = indexDB.getEntity(userModelDto.Id);

    let methodFillTable = new TableOfSections(); 
    let userSection = new Section(methodFillTable.fillUsersTable);

    // Если null то в локальном хранилище "Users" нету этой записи. Создаём запрсо на сервер в контроллер
    if (findUserModelDto == null)
    {
        // Для деплоя 
        // const controllerName = "/api/user/table/filtered_users_content";
        // Для разработки
        const controllerName = "http://localhost:5188/api/user/table/filtered_users_content";

        let httpRequest = new HttpRequest;
        httpRequest.addContentTypeJson();
        const resultSelectionByFilter = await httpRequest.PostAsync(controllerName, userModelDto);

        try
        {
            if (!resultSelectionByFilter.ok)
                throw new Error("Ошибка сети: Неудалось получить результат выборки по пользовательским фильтрам.");

            findUserModelDto = await resultSelectionByFilter.json();
        }
        catch(error)
        {
            if (error instanceof Error)
                console.error(`${error.message} | Код ошибки: ${resultSelectionByFilter.status}`);
        }
    }

    // В любом случаии что то должны показать пользователю
    await userSection.setContentSection(findUserModelDto);
    await userSection.updateSection("Sections/Users.html");
}

/**
 *  Поиск по всем фильтрам в разделе - Группы.
 *  Собирает выбранные/введённые значения и отправляет на контроллер сервера
 */
async function findByFiltersOfGroups()
{
    let groupFilter = new GroupFilter();

    let groupDtoModel = await groupFilter.getDtoGroupModel();

    // Для деплоя 
    // const controllerName = "/api/group/table/filtered_groups_content";
    // Для разработки
    const controllerName = "http://localhost:5188/api/group/table/filtered_groups_content"

    let httpRequest = new HttpRequest;
    httpRequest.addContentTypeJson();
    const resultSelectionByFilter = await httpRequest.PostAsync(controllerName, groupDtoModel);

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

    let facultetDtoModel = await facultetFilter.getDtoFacultetModel();

    // Для деплоя 
    //const controllerName = "/api/facultet/table/filtered_facultets_content";
    // Для разработки
    const controllerName = "http://localhost:5188/api/facultet/table/filtered_facultets_content"

    let httpRequest = new HttpRequest;
    httpRequest.addContentTypeJson();
    const resultSelectionByFilter = await httpRequest.PostAsync(controllerName, facultetDtoModel);

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