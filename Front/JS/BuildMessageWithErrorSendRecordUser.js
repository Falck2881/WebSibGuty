"use strict"
//@ts-check

import { IBuilderErrorMessage } from "./IBuildErrorMessage.js";
import { UserModelDto } from "./Entities.js";
import { RegExpressions } from "./RegExpressions.js";

export class BuildMessageWithErrorSendRecordUser extends IBuilderErrorMessage
{
    #userModelDto;
    /**
     * 
     * @param {UserModelDto} userModelDto 
     */
    constructor(userModelDto)
    {
        super();

        if (userModelDto instanceof UserModelDto)
            this.#userModelDto = userModelDto;
    }

    build()
    {
        let modalWindow = document.createElement("div");
        modalWindow.className = "modal-window";
        modalWindow.appendChild(this.#createHeaderMessage());

        modalWindow.appendChild(document.createElement("hr"));

        modalWindow.appendChild(this.#layoutMessageInWindow());

        let buttonOk = document.createElement("button");
        buttonOk.className = "right-button"
        buttonOk.appendChild(document.createTextNode("Ок"));
        buttonOk.addEventListener("click",() =>  window.closeBlockingBackground("blocking-background-for-record-user-card"));

        let layoutButtons = document.createElement("div");
        layoutButtons.className = "layout-buttons-making-actions";
        layoutButtons.appendChild(buttonOk);

        modalWindow.appendChild(layoutButtons);

        let blockingBackgraund = document.getElementById("blocking-background-for-record-user-card");
        blockingBackgraund.appendChild(modalWindow);
    }

    /**
     * Создаёт заголовок сообщения
     */
    #createHeaderMessage()
    {
        let headerMessage = document.createElement("h4");
        headerMessage.className = "header-card";
        headerMessage.appendChild(document.createTextNode("Заполните следующие поля."));

        return headerMessage;
    }


    /**
     * Разместить сообщение в окне
     */
    #layoutMessageInWindow()
    {
        let listNotFilledFields = document.createElement("ul");
        
        let regExp = new RegExpressions;

        if (!regExp.isFieldFilled(this.#userModelDto.FirstName))
        {
            let element = document.createElement("li");
            element.appendChild(document.createTextNode("Имя"));
            listNotFilledFields.appendChild(element);
        }
        
        if (!regExp.isFieldFilled(this.#userModelDto.LastName))
        {
            let element = document.createElement("li");
            element.appendChild(document.createTextNode("Фамилия"));
            listNotFilledFields.appendChild(element);
        }
        
        if (!regExp.isFieldFilled(this.#userModelDto.Gender))
        {
            let element = document.createElement("li");
            element.appendChild(document.createTextNode("Пол"));
            listNotFilledFields.appendChild(element);
        }
        
        if (!regExp.isFieldFilled(this.#userModelDto.PhoneNumber))
        {
            let element = document.createElement("li");
            element.appendChild(document.createTextNode("Телефон"));
            listNotFilledFields.appendChild(element);
        }
        
        if (!regExp.isFieldFilled(this.#userModelDto.Military))
        {
            let element = document.createElement("li");
            element.appendChild(document.createTextNode("Военнообязанность"));
            listNotFilledFields.appendChild(element);
        }
        
        if (!regExp.isFieldFilled(this.#userModelDto.CashSize))
        {
            let element = document.createElement("li");
            element.appendChild(document.createTextNode("Выплаты"));
            listNotFilledFields.appendChild(element);
        }

        return listNotFilledFields;
    }
}