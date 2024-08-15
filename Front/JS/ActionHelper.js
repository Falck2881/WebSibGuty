"use strict";
//@ts-check

/**
 * 
 * @returns Возвращает действие которое заполняет содержимое страницы
 */
export function ContentPage()
{

    /**
     * Заполняет таблицу пользователей данными. 
     * По хорошему сюда нужно передать массив сущностей и от туда брать нужные нам данные. ЭТО НЕОБХОДИМО РЕАЛИЗОВАТЬ.
     */
    function fillUsersPage()
    {
        let tbodyUser = document.getElementById("tbody-data-user");

        if (tbodyUser != null) {
            for (let i = 0; i < 30; ++i) {
                let row = document.createElement("tr");
                row.className = "tr-content";

                for (let j = 0; j < 7; ++j) {
                    let columnInRow = document.createElement("td");
                    columnInRow.className = "td-content";
                    let contentColumn = document.createTextNode(`(${i},${j})`);
                    columnInRow.appendChild(contentColumn);
                    row.appendChild(columnInRow);
                }

                tbodyUser.appendChild(row);
            }
        } else {
            console.error("tbody-data-user element not found");
        }
    }

    /**
     * Заполняет таблицу группы данными.
     * По хорошему сюда нужно передать массив сущностей и от туда брать нужные нам данные. ЭТО НЕОБХОДИМО РЕАЛИЗОВАТЬ.
     */
    function fillGroupsPage()
    {
        let tbodyUser = document.getElementById("tbody-data-group");

        if (tbodyUser != null) {
            for (let i = 0; i < 30; ++i) {
                let row = document.createElement("tr");
                row.className = "tr-content";

                for (let j = 0; j < 4; ++j) {
                    let columnInRow = document.createElement("td");
                    columnInRow.className = "td-content";
                    let contentColumn = document.createTextNode(`(${i},${j})`);
                    columnInRow.appendChild(contentColumn);
                    row.appendChild(columnInRow);
                }

                tbodyUser.appendChild(row);
            }
        } else {
            console.error("tbody-data-group element not found");
        }
    }

    /**
     * Заполняет таблицу Факультеты.
     * По хорошему сюда нужно передать массив сущностей и от туда брать нужные нам данные. ЭТО НЕОБХОДИМО РЕАЛИЗОВАТЬ.
     */
    function fillFacultetPage()
    {
        let tbodyFacultet = document.getElementById("tbody-data-facultet");

        if (tbodyFacultet != null) {
            for (let i = 0; i < 30; ++i) {
                let row = document.createElement("tr");
                row.className = "tr-content";

                for (let j = 0; j < 2; ++j) {
                    let columnInRow = document.createElement("td");
                    columnInRow.className = "td-content";
                    let contentColumn = document.createTextNode(`(${i},${j})`);
                    columnInRow.appendChild(contentColumn);
                    row.appendChild(columnInRow);
                }

                tbodyFacultet.appendChild(row);
            }
        } else {
            console.error("tbody-data-facultet element not found");
        }
    }
    

    return {
        fillUsersPage: fillUsersPage,
        fillGroupsPage: fillGroupsPage,
        fillFacultetPage: fillFacultetPage
    };
}