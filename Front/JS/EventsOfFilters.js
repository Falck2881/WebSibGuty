"use strict"
//@ts-check

import { UserFilter } from "./UserFilter.js"
import { GroupFilter } from "./GroupFilter.js"
import { FacultetFilter } from "./FacultetFilter.js";
import { Section } from "./Section.js";
import { TableOfSections } from "./TableOfSections.js"
import { HttpRequest } from "./HttpRequest.js"
import { IndexDBRepository } from "./IndexDBRepository.js";
import { FacultetModelDto, GroupModelDto, UserModelDto } from "./Entities.js";

/**
 *  Поиск по всем фильтрам в разделе - Пользователи.
 *  Собирает выбранные/введённые значения и отправляет на контроллер сервера
 */
async function findByFiltersOfUsers()
{
    let userSelectedFilters = new UserFilter;

    const indexDB = new IndexDBRepository("Users");

    await indexDB.openRepository();

    let methodFillTable = new TableOfSections(); 
    let userSection = new Section(methodFillTable.fillUsersTable);

     // Вытаскиваем готовую модель с выбранными атрибутами из фильтров в разделе "Пользователи"
    let userModelDto = await userSelectedFilters.getUserDtoModel();

    // Найденная модель - ищем либо в локальном Хранилище либо на сервере в базе
    let usersFromStorage = await indexDB.getAllEntities();

    // Если null то в локальном хранилище "Users" нету этой записи. Создаём запрос на сервер в контроллер
    if (Array.isArray(usersFromStorage) && usersFromStorage.length === 0)
    {
        // Для деплоя 
        // const controllerName = "/api/user/table/filtered_users_content";
        // Для разработки
        const controllerName = "http://localhost:5188/api/user/table/filtered_users_content";

        let httpRequest = new HttpRequest;
        httpRequest.addContentTypeJson();
        // Пытаемся получить содержимое выбранное в "Пользовательских" фильтрах
        const resultSelectionByFilter = await httpRequest.PostAsync(controllerName, userModelDto);

        try
        {
            if (!resultSelectionByFilter.ok)
                throw new Error("Ошибка сети: Неудалось получить результат выборки по пользовательским фильтрам.");

            usersFromStorage = await resultSelectionByFilter.json();
        }
        catch(error)
        {
            if (error instanceof Error)
                console.error(`${error.message} | Код ошибки: ${resultSelectionByFilter.status}`);
        }
    }

    let userModels = await findUsersInStorage(usersFromStorage, userModelDto);
    // В любом случаии что то должны показать пользователю
    await userSection.setContentSection(userModels);
    await userSection.updateSection("Sections/Users.html");
}

/**
 * Поиск моделей пользователей в хранилище
 * @param {Array<UseModelDto>} usersStorage 
 * @param {UserModelDto} userModelDto 
 */
async function findUsersInStorage(usersStorage, userModelDto)
{
    let userModels = new Array;

    usersStorage.forEach(user => {
            if ((userModelDto.FirstName === "" || userModelDto.FirstName === user.FirstName) &&
                (userModelDto.LastName === "" || userModelDto.LastName === user.LastName) &&
                (userModelDto.Gender === "" || userModelDto.Gender === user.Gender) &&
                (userModelDto.CashSize === "" || userModelDto.CashSize === user.CashSize) &&
                (userModelDto.Military === "") || userModelDto.Military === user.Military)
                {
                    let userModelDto = new UserModelDto(user);
                    userModels.push(userModelDto);
                }
    });

    return userModels;
}

/**
 *  Поиск по всем фильтрам в разделе - Группы.
 *  Собирает выбранные/введённые значения и отправляет на контроллер сервера
 */
async function findByFiltersOfGroups()
{
    let groupFilter = new GroupFilter();

    let indexDB = new IndexDBRepository("Groups");

    await indexDB.openRepository();

    let methodFillTable = new TableOfSections(); 
    let groupSection = new Section(methodFillTable.fillGroupsTable);

    let groupDtoModel = await groupFilter.getDtoGroupModel();

    // Пробуем найти запись в локальном хранилище 
    let groupsFromStorage = await indexDB.getAllEntities();

    if (Array.isArray(groupsFromStorage) && groupsFromStorage.length === 0)
    {
        // Для деплоя 
        // const controllerName = "/api/group/table/filtered_groups_content";
        // Для разработки
        const controllerName = "http://localhost:5188/api/group/table/filtered_groups_content"

        let httpRequest = new HttpRequest;
        httpRequest.addContentTypeJson();
        // Пытаемся получить содержимое выбранное в "Пользовательских" фильтрах
        const resultSelectionByFilter = await httpRequest.PostAsync(controllerName, groupDtoModel);

        try
        {
            if (!resultSelectionByFilter.ok)
                throw new Error("Ошибка сети: Неудалось получить результат выборки по пользовательским фильтрам.");
            
            groupsFromStorage = await resultSelectionByFilter.json();
            console.log(`Groups : ${groupsFromStorage}`);

        }
        catch(error)
        {
            if (error instanceof Error)
                console.error(`${error.message} | Код ошибки: ${resultSelectionByFilter.status}`);
        }
    }

    let groupModels = await findGroupsInStorage(groupsFromStorage, groupDtoModel)
    await groupSection.setContentSection(groupModels);
    await groupSection.updateSection("Sections/Groups.html");
}

/**
 * Ищет модели групп в хранилище
 * @param {Array<GroupModelDto>} groupModelsStorage
 * @param {GroupModelDto} groupDtoModel
 */
async function findGroupsInStorage(groupModelsStorage, groupDtoModel) 
{
    let groupModels = new Array;

    groupModelsStorage.forEach(group => {
            if ((groupDtoModel.GroupName === "" || groupDtoModel.GroupName === group.GroupName) &&
                (groupDtoModel.FacultetName === "" || groupDtoModel.FacultetName === group.FacultetName))
                {
                    let groupModelDto = new GroupModelDto(group);
                    groupModels.push(groupModelDto);
                }
    });

    return groupModels;
}

/**
 *  Поиск по всем фильтрам в разделе - Факультеты.
 *  Собирает выбранные/введённые значения и отправляет на контроллер сервера
 */
async function findByFiltersOfFacultets()
{
    let facultetFilter = new FacultetFilter();

    let indexDB = new IndexDBRepository("Facultets");

    await indexDB.openRepository();

    let methodFillTable = new TableOfSections(); 
    let facultetSection = new Section(methodFillTable.fillFacultetTable);

    let facultetDtoModel = await facultetFilter.getDtoFacultetModel();

    let facultetsFromStorage = await indexDB.getAllEntities();

    if (Array.isArray(facultetsFromStorage) && facultetsFromStorage.length === 0)
    {
        // Для деплоя 
        //const controllerName = "/api/facultet/table/filtered_facultets_content";
        // Для разработки
        const controllerName = "http://localhost:5188/api/facultet/table/filtered_facultets_content"

        let httpRequest = new HttpRequest;
        httpRequest.addContentTypeJson();
        // Пытаемся получить содержимое выбранное в "Пользовательских" фильтрах
        const resultSelectionByFilter = await httpRequest.PostAsync(controllerName, facultetDtoModel);

        try
        {
            if (!resultSelectionByFilter.ok)
                throw new Error("Ошибка сети: Неудалось получить результат выборки по пользовательским фильтрам.");
            
            facultetsFromStorage = await resultSelectionByFilter.json();
            console.log(`Facultets : ${facultets}`);
        }
        catch(error)
        {
            if (error instanceof Error)
                console.error(`${error.message} | Код ошибки: ${resultSelectionByFilter.status}`);
        }
    }
    
    let facultetModels = findFacultetsInStorage(facultetsFromStorage, facultetDtoModel)
    await facultetSection.setContentSection(facultetModels);
    await facultetSection.updateSection("Sections/Facultets.html");
}

/**
 * Ищет модели факультета в хранилище
 * @param {Array<FacultetModelDto>} facultetModelsStorage
 * @param {FacultetModelDto} facultetDtoModel
 */
async function findFacultetsInStorage(facultetModelsStorage, facultetDtoModel) 
{
    let facultetModels = new Array;

    facultetModelsStorage.forEach(facultet => {
            if ((facultetDtoModel.FacultetName === "" || facultetDtoModel.FacultetName === facultet.FacultetName) &&
                (facultetDtoModel.Dean === "" || facultetDtoModel.Dean === facultet.Dean))
                {
                    let facultetModelDto = new FacultetModelDto(facultet);
                    facultetModels.push(facultetModelDto);
                }
    });

    return facultetModels;
}


window.findByFiltersOfUsers = findByFiltersOfUsers;
window.findByFiltersOfGroups = findByFiltersOfGroups;
window.findByFiltersOfFacultets = findByFiltersOfFacultets;