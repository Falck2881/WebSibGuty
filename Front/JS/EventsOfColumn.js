"use strict"
//@ts-check

/**
 * Сортирует таблицу раздела "Пользователи" по столбцу "Выплаты"
 */
function sortUsersOfSectionByCashSize()
{
    let contentData = sessionStorage.getItem("Users");

    if (contentData == null)
        return;

    if (Array.isArray(contentData))
    {
        contentData.sort()
    }
}