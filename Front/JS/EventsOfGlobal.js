"use strict";
//@ts-check

var expanded = false;

function showCheckboxes() 
{
    let checkboxes = document.getElementById("filters_section");
    
    if (checkboxes == null) return;
        
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } 
    else {
        checkboxes.style.display = "none";
        expanded = false;
    }

}



// Добавляем функцию в глобальный объект
window.showCheckboxes = showCheckboxes;