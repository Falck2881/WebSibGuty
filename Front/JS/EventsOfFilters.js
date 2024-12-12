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
import { StorageDtoModels } from "./StorageDtoModels.js";
import { AddUserInStorage } from "./AddUserInStorage.js";
import { AddGroupInStorage } from "./AddGroupInStorage.js";
import { AddFacultetInStorage } from "./AddFacultetInStorage.js";


/**
 *  Поиск по всем фильтрам в разделе - Пользователи.
 *  Собирает выбранные/введённые значения и отправляет на контроллер сервера
 */
async function findByFiltersOfUsers()
{
    let userFilters = new UserFilter;

    const indexDB = new IndexDBRepository;

    await indexDB.openRepository("UserModelSelection","UserModelSelection");

    let methodFillTable = new TableOfSections(); 
    let userSection = new Section(methodFillTable.fillUsersTable);

     // Вытаскиваем готовую модель с выбранными атрибутами из фильтров в разделе "Пользователи"
    let selectedFilters = await userFilters.getSelectedFilters();

    // Найденная модель - ищем либо в локальном Хранилище либо на сервере в базе
    let usersFromStorage = await indexDB.getAllEntities("UserModelSelection");

    let userModels = new Array;
    
    // Проверяем пусты ли фильтры:
    // true - фильтры не выбраны, значит выборка не нужна, вытаскиваем все модели из кэша по умолчанию
    // false - некоторые (или все) фильтры были выбраны и их поля не пусты
    if (userFilters.isEmptyFilters())
    {
        await indexDB.openRepository("WebSibguty", "Users");
        let allEntitiesUsers = await indexDB.getAllEntities("Users");
        userModels = await findUsersInStorage(allEntitiesUsers, selectedFilters);
    }
    else{
        userModels = await findUsersInStorage(usersFromStorage, selectedFilters);
    }

    // Если null то в локальном хранилище "Users" нету этой записи. Создаём запрос на сервер в контроллер
    if (Array.isArray(userModels) && userModels.length === 0)
    {
        // Для деплоя 
        // const controllerName = "/api/user/table/filtered_users_content";
        // Для разработки
        const controllerName = "http://localhost:5188/api/user/table/filtered_users_content";

        let httpRequest = new HttpRequest;
        httpRequest.addContentTypeJson();
        // Пытаемся получить содержимое выбранное в "Пользовательских" фильтрах
        const resultSelectionByFilter = await httpRequest.PostAsync(controllerName, selectedFilters);

        try
        {
            if (!resultSelectionByFilter.ok)
                throw new Error("Ошибка сети: Неудалось получить результат выборки по пользовательским фильтрам.");

            userModels = await resultSelectionByFilter.json();
        }
        catch(error)
        {
            if (error instanceof Error)
                console.error(`${error.message} | Код ошибки: ${resultSelectionByFilter.status}`);
        }
    }

    // В любом случаии что то должны показать пользователю
    await userSection.setContentSection(userModels);
    await userSection.updateSection("Sections/Users.html");
    
    // Если был выбран хоть один фильтр, то чистим старый кэш и сохроняем новый результат выборки в этот же кэш 
    if (!userFilters.isEmptyFilters())
        await indexDB.clearStorage("UserModelSelection");

    let storageDtoModel = new StorageDtoModels;
    storageDtoModel.setMethodAddedModel(new AddUserInStorage("UserModelSelection","UserModelSelection"));
    await storageDtoModel.addAllDtoModelsInStorage(userModels);
    
}

/**
 * Поиск моделей пользователей в хранилище
 * @param {Array<UseModelDto>} usersStorage 
 * @param {UserModelDto} selectedFilters 
 */
async function findUsersInStorage(usersStorage, selectedFilters)
{
    let userModels = new Array;

    usersStorage.forEach(user => {
            if ((selectedFilters.FirstName === "" || selectedFilters.FirstName === user.FirstName) &&
                (selectedFilters.LastName === "" || selectedFilters.LastName === user.LastName) &&
                (selectedFilters.Gender === "" || selectedFilters.Gender === user.Gender) &&
                (selectedFilters.CashSize === "" || selectedFilters.CashSize === user.CashSize) &&
                (selectedFilters.Military === "") || selectedFilters.Military === user.Military)
                {
                    let userModelDto = new UserModelDto(user);
                    userModels.push(userModelDto);
                }
    });
    console.log(userModels);
    return userModels;
}

/**
 *  Поиск по всем фильтрам в разделе - Группы.
 *  Собирает выбранные/введённые значения и отправляет на контроллер сервера
 */
async function findByFiltersOfGroups()
{
    let groupFilter = new GroupFilter();

    let indexDB = new IndexDBRepository;

    await indexDB.openRepository("GroupModelSelection", "GroupModelSelection");

    let methodFillTable = new TableOfSections(); 
    let groupSection = new Section(methodFillTable.fillGroupsTable);

    let selectedFilters = await groupFilter.getDtoGroupModel();

    // Пробуем найти запись в локальном хранилище 
    let groupsFromStorage = await indexDB.getAllEntities("GroupModelSelection");

    let groupModels = new Array;

    if (groupFilter.isEmptyFilters())
    {
        await indexDB.openRepository("WebSibguty", "Groups");
        let allEntitiesGroup = await indexDB.getAllEntities("Groups");
        groupModels = await findGroupsInStorage(allEntitiesGroup, selectedFilters);
    }
    else
        groupModels = await findGroupsInStorage(groupsFromStorage, selectedFilters);

    if (Array.isArray(groupModels) && groupModels.length === 0)
    {
        // Для деплоя 
        // const controllerName = "/api/group/table/filtered_groups_content";
        // Для разработки
        const controllerName = "http://localhost:5188/api/group/table/filtered_groups_content"

        let httpRequest = new HttpRequest;
        httpRequest.addContentTypeJson();
        // Пытаемся получить содержимое выбранное в "Пользовательских" фильтрах
        const resultSelectionByFilter = await httpRequest.PostAsync(controllerName, selectedFilters);

        try
        {
            if (!resultSelectionByFilter.ok)
                throw new Error("Ошибка сети: Неудалось получить результат выборки по пользовательским фильтрам.");
            
            groupModels = await resultSelectionByFilter.json();
        }
        catch(error)
        {
            if (error instanceof Error)
                console.error(`${error.message} | Код ошибки: ${resultSelectionByFilter.status}`);
        }
    }

    await groupSection.setContentSection(groupModels);
    await groupSection.updateSection("Sections/Groups.html");

    if (!groupFilter.isEmptyFilters())
        await indexDB.clearStorage("GroupModelSelection");
    
    let storageDtoModel = new StorageDtoModels;
    storageDtoModel.setMethodAddedModel(new AddGroupInStorage("GroupModelSelection","GroupModelSelection"));
    await storageDtoModel.addAllDtoModelsInStorage(groupModels);
}

/**
 * Ищет модели групп в хранилище
 * @param {Array<GroupModelDto>} groupModelsStorage
 * @param {GroupModelDto} selectedFilters
 */
async function findGroupsInStorage(groupModelsStorage, selectedFilters) 
{
    let groupModels = new Array;

    groupModelsStorage.forEach(group => {
            if ((selectedFilters.GroupName === "" || selectedFilters.GroupName === group.GroupName) &&
                (selectedFilters.FacultetName === "" || selectedFilters.FacultetName === group.FacultetName))
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

    let indexDB = new IndexDBRepository;

    await indexDB.openRepository("FacultetModelStorage", "FacultetModelStorage");

    let methodFillTable = new TableOfSections(); 
    let facultetSection = new Section(methodFillTable.fillFacultetTable);

    let facultetDtoModel = await facultetFilter.getDtoFacultetModel();

    let facultetsFromStorage = await indexDB.getAllEntities("FacultetModelStorage");

    let facultetModels = new Array;

    if (facultetFilter.isEmptyFilters())
    {
        await indexDB.openRepository("WebSibguty", "Facultets");
        let allEntitiesFacultet = await indexDB.getAllEntities("Facultets");
        facultetModels = await findFacultetsInStorage(allEntitiesFacultet, facultetDtoModel)
    }
    else
        facultetModels = await findFacultetsInStorage(facultetsFromStorage, facultetDtoModel)

    if (Array.isArray(facultetModels) && facultetModels.length === 0)
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
            
            facultetModels = await resultSelectionByFilter.json();
        }
        catch(error)
        {
            if (error instanceof Error)
                console.error(`${error.message} | Код ошибки: ${resultSelectionByFilter.status}`);
        }
    }
    
    await facultetSection.setContentSection(facultetModels);
    await facultetSection.updateSection("Sections/Facultets.html");

    if (!facultetFilter.isEmptyFilters())
        await indexDB.clearStorage("FacultetModelStorage");

    let storageDtoModel = new StorageDtoModels;
    storageDtoModel.setMethodAddedModel(new AddFacultetInStorage("FacultetModelStorage","FacultetModelStorage"));
    await storageDtoModel.addAllDtoModelsInStorage(facultetModels);
}

/**
 * Ищет модели факультета в хранилище
 * @param {Array<FacultetModelDto>} facultetModelsStorage
 * @param {FacultetModelDto} selectedFilters
 */
async function findFacultetsInStorage(facultetModelsStorage, selectedFilters) 
{
    let facultetModels = new Array;

    facultetModelsStorage.forEach(facultet => {
            if ((selectedFilters.FacultetName === "" || selectedFilters.FacultetName === facultet.FacultetName) &&
                (selectedFilters.Dean === "" || selectedFilters.Dean === facultet.Dean))
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