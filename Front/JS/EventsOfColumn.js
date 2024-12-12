"use strict"
//@ts-check

import { IndexDBRepository } from "./IndexDBRepository.js"
import { TableOfSections } from "./TableOfSections.js"
import { AddUserInStorage } from "./AddUserInStorage.js";
import { Section } from "./Section.js";
import { StorageDtoModels } from "./StorageDtoModels.js";

// Тип сортировки
const TypeSort = {
    "SortUp": 1, // Сортировать по возрастанию 
    "NoSort": 0, // Не отсортировано 
    "SortDown": -1 // Сортировать по убыванию
};

let currentSort = TypeSort.NoSort; 

/**
 * Сортирует таблицу раздела "Пользователи" по столбцу "Выплаты"
 */
async function sortUsersOfSectionByCashSize()
{
    let indexDb = new IndexDBRepository;

    await indexDb.openRepository("UserModelSelection", "UserModelSelection");

    let contentData = new Array;

    contentData = await indexDb.getAllEntities("UserModelSelection");

    if (Array.isArray(contentData) && contentData.length === 0)
    {
        await indexDb.openRepository("WebSibguty");
        contentData = await indexDb.getAllEntities("Groups");
    }

    if (Array.isArray(contentData) && contentData.length > 0)
    {
        var buttonSortCashSize = document.getElementById("sort-cashsize");

        if (currentSort === TypeSort.NoSort)
        {
            //Сортируем по возрастанию 
            contentData.sort((firstUser, secondUser) => 
                {
                    return parseInt(firstUser.CashSize) - parseInt(secondUser.CashSize);
                });
            currentSort = TypeSort.SortUp;
        }
        else if (currentSort === TypeSort.SortUp)
        {
            //Сортируем по убыванию
            contentData.sort((firstUser, secondUser) => 
                {
                    return parseInt(secondUser.CashSize) - parseInt(firstUser.CashSize);
                });
            currentSort = TypeSort.SortDown;
        }
        else
        {
            //Никак не сортируем 
            currentSort = TypeSort.NoSort;
        }
    }

    let tables = new TableOfSections();
    let section = new Section(tables.fillUsersTable);

    // Обновляем кэш в хранилище
    let methodAddUserInStorage = new AddUserInStorage("UserModelSelection", "UserModelSelection");
    let storageDtoModel = new StorageDtoModels;
    storageDtoModel.setMethodAddedModel(methodAddUserInStorage);
    await storageDtoModel.addAllDtoModelsInStorage(contentData);

    // Перерисовывем страницу
    await section.setContentSection(contentData)
    await section.updateSection("Sections/Users.html");

    // Визуализируем направление сортировки 
    var buttonSortCashSize = document.getElementById("sort-cashsize");
        
    if (currentSort === TypeSort.NoSort)
    {
        var currentClassStyle = buttonSortCashSize.className;
        buttonSortCashSize.className = currentClassStyle + " img-no-sort-cashsize";
    }
    else if (currentSort === TypeSort.SortUp)
    {
        var currentClassStyle = buttonSortCashSize.className;
        buttonSortCashSize.className = currentClassStyle + " img-sort-up-cashsize";
    }
    else
    {
        var currentClassStyle = buttonSortCashSize.className;
        buttonSortCashSize.className = currentClassStyle + " img-sort-down-cashsize";
    }
}

window.sortUsersOfSectionByCashSize = sortUsersOfSectionByCashSize;