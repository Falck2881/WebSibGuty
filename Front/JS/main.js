"use - strict";
//@ts-check
import {ContentPage} from "./ActionHelper.js"
import {Page} from "./Page.js"

var action = new ContentPage();
let page = new Page(action.fillUsersPage);

page.loadPage("Pages/Users.html");

const urls = new Array("Pages/Users.html", "Pages/Groups.html");

const methodsFill = new Array(action.fillUsersPage, action.fillGroupsPage);

const navigations = new Array(document.getElementById("nav-user-page"), 
                                        document.getElementById("nav-group-page"))


for(let index = 0; index < urls.length; ++index)
{
        navigations[index].addEventListener("click", function(url, newMethodfill)
        {
            return function(){
                let selectPage = new Page(newMethodfill);
                selectPage.loadPage(url);
            }
        }(urls[index], methodsFill[index]), true);  
}
