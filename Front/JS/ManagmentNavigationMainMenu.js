"use strict";
//@ts-check
import {TableOfSections} from "./TableOfSections.js"
import {Section} from "./Section.js"

var tables = new TableOfSections();
let section = new Section(tables.fillUsersTable);

section.setNameSection("Users");
await section.loadContentSection("/user/table/content");
await section.loadSection("Sections/Users.html");
await section.fillTable();
await section.addAllEvents();

const nameSectons = new Array("Users", "Groups", "Facultets");

const urlSections = new Array("Sections/Users.html", "Sections/Groups.html", "Sections/Facultets.html");

const urlContentSections = new Array("/user/table/content", "/group/table/content", "/facultet/table/content");

const methodsFillTables = new Array(tables.fillUsersTable, tables.fillGroupsTable, tables.fillFacultetTable);

const navigationsBySections = new Array(document.getElementById("nav-user-page"), 
                                        document.getElementById("nav-group-page"),
                                        document.getElementById("nav-facultet-page"))


// В цикле закрепляем за элементами списка <li> (навигационная панель),
// события мыши "click" и обработчики которые изменяют содержимое стр. 
for(let index = 0; index < urlContentSections.length; ++index)
{
    navigationsBySections[index].addEventListener("click", 
        function(nameSecion, urlSection, newMethodfill, urlContentSection)
    {
        return async function(){
            section.setNameSection(nameSecion);
            await section.setMethodFill(newMethodfill)
            await section.loadContentSection(urlContentSection);
            await section.loadSection(urlSection);
            await section.fillTable();
            await section.addAllEvents();
        }
    }(nameSectons[index],urlSections[index], methodsFillTables[index], urlContentSections[index]), true);  
}