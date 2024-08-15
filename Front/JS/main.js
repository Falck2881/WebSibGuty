"use - strict";
//@ts-check
import {ContentPage} from "./ActionHelper.js"
import {Page} from "./Page.js"

var action = new ContentPage();
let page = new Page(action.fillUsersPage);

page.loadPage("Pages/Users.html");

const urls = new Array("Pages/Users.html", "Pages/Groups.html", "Pages/Facultets.html");

const methodsFill = new Array(action.fillUsersPage, action.fillGroupsPage, action.fillFacultetPage);

const navigations = new Array(document.getElementById("nav-user-page"), 
                                        document.getElementById("nav-group-page"),
                                        document.getElementById("nav-facultet-page"))


// В цикле закрепляем за элементами списка <li> (навигационная панель),
// события мыши "click" и обработчики которые изменяют содержимое стр. 
for(let index = 0; index < urls.length; ++index)
{
        navigations[index].addEventListener("click", function(url, newMethodfill)
        {
            return function(){
                page.setMethodFill(newMethodfill)
                page.loadPage(url);
            }
        }(urls[index], methodsFill[index]), true);  
}
