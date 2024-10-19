"use strict";
//@ts-check
import {UserModelDto, GroupModelDto, FacultetModelDto } from "./Entities.js";

/**
 * 
 * @returns Возвращает действие которое заполняет содержимое таблицы
 */
export function TableOfSections()
{

    /**
     * Заполняет таблицу пользователей данными. 
     * @param {Array<UserModelDto>} content 
     */
    async function fillUsersTable(content)
    {
        let tbodyUser = document.getElementById("tbody-data-user");

        if (tbodyUser != null) {
            for (let i = 0; i < content.length; ++i) 
            {
                let row = document.createElement("tr");
                row.className = "tr-content";
                
                let user = Array.of(content[i].FirstName, content[i].LastName,
                    content[i].Gender, content[i].DataBirth, content[i].PhoneNumber, content[i].CashSize,
                    content[i].Military);

                user.forEach(data => console.log(`Name - ${data}, `));

                for (let j = 0; j < 7; ++j) {
                    let columnInRow = document.createElement("td");
                    columnInRow.className = "td-content";
                    let contentColumn = document.createTextNode(user[j]);
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
     * Заполняет таблицу "Группы" данными.
     * @param {Array<GroupModelDto>} content 
     */
    async function fillGroupsTable(content)
    {
        let tbodyUser = document.getElementById("tbody-data-group");

        if (tbodyUser != null) {
            for (let i = 0; i < content.length; ++i) {
                let row = document.createElement("tr");
                row.className = "tr-content";

                let groups = Array.of(content[i].FacultetName, content[i].GroupName, 
                    content[i].GroupCreateData, content[i].GroupDeleteData);

                for (let j = 0; j < 4; ++j) {
                    let columnInRow = document.createElement("td");
                    columnInRow.className = "td-content";
                    let contentColumn = document.createTextNode(groups[j]);
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
     * @param {Array<FacultetModelDto>} content 
     */
    async function fillFacultetTable(content)
    {
        let tbodyFacultet = document.getElementById("tbody-data-facultet");

        if (tbodyFacultet != null) {
            for (let i = 0; i < content.length; ++i) {
                let row = document.createElement("tr");
                row.className = "tr-content";

                let facultet = Array.of(content[i].FacultetName, content[i].Dean);

                for (let j = 0; j < 2; ++j) {
                    let columnInRow = document.createElement("td");
                    columnInRow.className = "td-content";
                    let contentColumn = document.createTextNode(facultet[j]);
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
        fillUsersTable: fillUsersTable,
        fillGroupsTable: fillGroupsTable,
        fillFacultetTable: fillFacultetTable
    };
}