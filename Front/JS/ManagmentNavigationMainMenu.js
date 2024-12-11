"use strict";
//@ts-check
import {TableOfSections} from "./TableOfSections.js"
import {Section} from "./Section.js"
import {AddUserInStorage} from "./AddUserInStorage.js";
import {AddGroupInStorage} from "./AddGroupInStorage.js"
import {AddFacultetInStorage} from "./AddFacultetInStorage.js"
import {IndexDBRepository, initializedDBRepository} from "./IndexDBRepository.js"

const namesStorage = new Array("Users", "Groups", "Facultets");

(async () => 
{
    await initializedDBRepository(namesStorage);
})();

var tables = new TableOfSections();
let section = new Section(tables.fillUsersTable);

section.setMethodAddedModelInStorage(new AddUserInStorage);
await section.loadContentSection("/user/table/content");
await section.loadSection("Sections/Users.html");
await section.fillTable();
await section.addAllEvents();

const methodsAddedModel = new Array(new AddUserInStorage, new AddGroupInStorage, new AddFacultetInStorage);

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
        function(methodAddedModel, urlSection, newMethodfill, urlContentSection, nameStorage)
    {
        return async function(){
            section.setMethodAddedModelInStorage(methodAddedModel);
            await section.setMethodFill(newMethodfill);
            
            const indexDB = new IndexDBRepository(nameStorage);
            await indexDB.openRepository();

            let contentSection = await indexDB.getAllEntities();
            
            if (Array.isArray(contentSection) && contentSection.length > 0){
                section.setContentSection(contentSection);
            }
            else
                await section.loadContentSection(urlContentSection);

            await section.loadSection(urlSection);
            await section.fillTable();
            await section.addAllEvents();
        }
    }(methodsAddedModel[index],
            urlSections[index],
        methodsFillTables[index],
urlContentSections[index],
        namesStorage[index]), true);  
}