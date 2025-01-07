"use strict"
//@ts-check

import {UserModelDto} from "./Entities.js" 
import {RegExpressions} from "./RegExpressions.js"
import {HttpRequest} from "./HttpRequest.js"
import {IndexDBRepository} from "./IndexDBRepository.js"

/**
 * Класс представляет из себя карточку в которой заполняют различные поля запси пользователя 
 */
export class RecordUserCard
{
    #userModelDto;

    #url_addRecordUser = "";

    #url_updateRecordUser= "";

    constructor()
    {
        this.#userModelDto = new UserModelDto;

        //для деплоя 
        // this.#url_addRecordUser = "/api/user/table/add/record_user";
        // this.#url_updateRecordUser = "/api/user/table/update/record_user";
        // для разработки
        this.#url_addRecordUser = "http://localhost:5188/api/user/table/add/record_user";
        this.#url_updateRecordUser = "http://localhost:5188/api/user/table/update/record_user";
    }
    /**
     * Показывает карточку по созданию записи пользователя
     */
    showCreateRecordUserCard()
    {
        let recordUserCard = document.createElement("div");
        recordUserCard.className = "record-user-card";
        recordUserCard.id = "recordUserCard";

        recordUserCard.appendChild( this.#createHeaderCard("Создание карточки пользователя."));

        recordUserCard.appendChild(document.createElement('hr'));
        
        recordUserCard.appendChild(this.#createFieldsInputs());

        let backButton = document.createElement("button");
        backButton.className = "left-button";
        backButton.appendChild(document.createTextNode("Отмена"));
        backButton.addEventListener('click', () => 
            {
                window.closeCreateRecordUserCard();
                window.openRecordCreationSelectionCard();
            });
        
        let sendButton = document.createElement("button");
        sendButton.className = "right-button";
        sendButton.appendChild(document.createTextNode("Отправить"));
        sendButton.addEventListener('click', async () => 
            {
                await window.sendRecord(this);
            });    
        
        let layoutButtons = document.createElement("div");
        layoutButtons.className = "layout-buttons-making-actions";
        layoutButtons.appendChild(backButton);
        layoutButtons.appendChild(sendButton);

        recordUserCard.appendChild(layoutButtons)
        
        let blockingBackgraund = document.getElementById("blocking-backgraund-main-menu");
        blockingBackgraund.appendChild(recordUserCard);
    }

    /**
     * Показывает карточку пользователя
     * @param {string} idUser - id пользователя  
     */
    async showRecordUserCard(idUser)
    {
        let recordUserCard = document.createElement("div");
        recordUserCard.className = "record-user-card";
        recordUserCard.id = "recordUserCard";
        
        recordUserCard.appendChild( this.#createHeaderCard("Карточка пользователя"));

        recordUserCard.appendChild(document.createElement('hr'));
        
        recordUserCard.appendChild(this.#createFieldsInputs());

        let closeButton = document.createElement("button");
        closeButton.className = "left-button";
        closeButton.appendChild(document.createTextNode("Закрыть"));
        closeButton.addEventListener('click', () => 
            {
                window.closeRecordUserCard();
                window.closeBlockingBackground("blocking-backgraund-main-menu");
            });
        
        let updateButton = document.createElement("button");
        updateButton.className = "right-button";
        updateButton.appendChild(document.createTextNode("Обновить"));
        updateButton.addEventListener('click', async () => 
            {
                await window.updateRecord(this);
                window.closeBlockingBackground("blocking-backgraund-main-menu");
            });    
        
        let layoutButtons = document.createElement("div");
        layoutButtons.className = "layout-buttons-making-actions";
        layoutButtons.appendChild(closeButton);
        layoutButtons.appendChild(updateButton);

        recordUserCard.appendChild(layoutButtons)
        
        let blockingBackgraund = document.getElementById("blocking-backgraund-main-menu");
        blockingBackgraund.appendChild(recordUserCard);

        await this.#setValuesInFiledsSelectedRecord(idUser);
        this.#userModelDto.Id = idUser;
    }

    /**
     * Устанавливает значения в поля выбранной записи
     * @param {string} idUser - id пользователя 
     */
    async #setValuesInFiledsSelectedRecord(idUser)
    {

        let indexDB = new IndexDBRepository;

        await indexDB.openRepository("WebSibguty", "Users");

        let entityDto  = await indexDB.getEntity(idUser, "Users");

        let recordUser = Object.assign(new UserModelDto, entityDto);

        let fieldInputFirstName = document.getElementById("fieldFirstNameUser_1");

        if (fieldInputFirstName instanceof HTMLInputElement && recordUser instanceof UserModelDto)
            fieldInputFirstName.value = entityDto === null ? "empty" : recordUser.FirstName;

        let fieldInputLastName = document.getElementById("fieldLastNameUser_2");

        if (fieldInputLastName instanceof HTMLInputElement)
            fieldInputLastName.value = entityDto === null ? "empty" : recordUser.LastName;

        let fieldGenderUser = document.getElementById("fieldGenderUser_3");

        if (fieldGenderUser instanceof HTMLSelectElement)
            fieldGenderUser.value = entityDto === null ? "empty" : recordUser.Gender;

        let fieldInputNumberPhone = document.getElementById("fieldNumberPhoneUser_4")

        if (fieldInputNumberPhone instanceof HTMLInputElement)
            fieldInputNumberPhone.value = entityDto === null ? "empty" : recordUser.PhoneNumber;

        let fieldMillitoryUser = document.getElementById("fieldMillitaryUser_5");

        if (fieldMillitoryUser instanceof HTMLSelectElement)
            fieldMillitoryUser.value = entityDto === null ? "empty" : recordUser.Military;
        
        let fieldCashSizeUser = document.getElementById("fieldCashSizeUser_6");

        if (fieldCashSizeUser instanceof HTMLInputElement)
            fieldCashSizeUser.value = entityDto === null ? "empty" : recordUser.CashSize;
    }

    /**
     * Создаёт заголовок и возвращает его
     * @param {string} textHeader 
     * @returns Возвращает заголовок карточки
     */
    #createHeaderCard(textHeader)
    {
        let headerCard = document.createElement("h4");
        headerCard.className = "header-card";
        headerCard.appendChild(document.createTextNode(textHeader));

        return headerCard;
    }

    /**
     * Создаёт поля ввода данных 
     * @returns Возвращает размещённый блок с полями ввода
     */
    #createFieldsInputs()
    {
        let layoutVertical = document.createElement("div");
        layoutVertical.className = "layout-vertical-field-card";

        let fieldFirstName = document.createElement("div");
        fieldFirstName.className = "field";
        let fieldInputFirstNameUser = document.createElement("input");
        let labelFirstNameUser = document.createElement("label");
        labelFirstNameUser.appendChild(document.createTextNode("Имя:"));
        labelFirstNameUser.htmlFor = "fieldFirstNameUser_1";
        labelFirstNameUser.className = "label-field";

        fieldInputFirstNameUser.type = "text";
        fieldInputFirstNameUser.id = "fieldFirstNameUser_1";
        fieldInputFirstNameUser.className = "input-field";

        fieldFirstName.appendChild(labelFirstNameUser);
        fieldFirstName.appendChild(fieldInputFirstNameUser);

        layoutVertical.appendChild(fieldFirstName);

        let fieldLastName = document.createElement("div");
        fieldLastName.className = "field";
        let fieldInputLastNameUser = document.createElement("input");
        let labelLastNameUser = document.createElement("label");
        labelLastNameUser.appendChild(document.createTextNode("Фамилия:"));
        labelLastNameUser.htmlFor = "fieldLastNameUser_2";
        labelLastNameUser.className = "label-field";

        fieldInputLastNameUser.type = "text";
        fieldInputLastNameUser.id = "fieldLastNameUser_2";
        fieldInputLastNameUser.className = "input-field";

        fieldLastName.appendChild(labelLastNameUser);
        fieldLastName.appendChild(fieldInputLastNameUser);

        layoutVertical.appendChild(fieldLastName);

        let fieldGenderUser = document.createElement("div");
        fieldGenderUser.className = "field";
        let selectGenderUser = document.createElement("select");
        let labelGenderUser = document.createElement("label");
        labelGenderUser.appendChild(document.createTextNode("Пол:"));
        labelGenderUser.htmlFor = "fieldGenderUser_3";
        labelGenderUser.className = "label-field";

        selectGenderUser.id = "fieldGenderUser_3";
        selectGenderUser.className = "selection-field";

        let menOption = document.createElement("option");
        menOption.appendChild(document.createTextNode("Муж."));
        selectGenderUser.appendChild(menOption);

        let womenOption = document.createElement("option");
        womenOption.appendChild(document.createTextNode("Жен."));
        selectGenderUser.appendChild(womenOption);

        fieldGenderUser.appendChild(labelGenderUser);
        fieldGenderUser.appendChild(selectGenderUser);

        layoutVertical.appendChild(fieldGenderUser);

        let fieldNumberPhoneUser = document.createElement("div");
        fieldNumberPhoneUser.className = "field";
        let filedInputNumberPhoneUser = document.createElement("input");
        let labelNumberPhoneUser = document.createElement("label");
        labelNumberPhoneUser.appendChild(document.createTextNode("Номер телефона:"));
        labelNumberPhoneUser.htmlFor = "fieldNumberPhoneUser_4";
        labelNumberPhoneUser.className = "label-field";

        filedInputNumberPhoneUser.type = "text";
        filedInputNumberPhoneUser.className = "input-field";
        filedInputNumberPhoneUser.id = "fieldNumberPhoneUser_4";

        fieldNumberPhoneUser.appendChild(labelNumberPhoneUser);
        fieldNumberPhoneUser.appendChild(filedInputNumberPhoneUser);

        layoutVertical.appendChild(fieldNumberPhoneUser);

        let fieldMillitoryUser = document.createElement("div");
        fieldMillitoryUser.className = "field";
        let selectedMillitoryUser = document.createElement("select");
        let labelMillitaryUser = document.createElement("label");
        labelMillitaryUser.appendChild(document.createTextNode("Военнообязанность:"));
        labelMillitaryUser.htmlFor = "fieldMillitaryUser_5";
        labelMillitaryUser.className = "label-field";

        selectedMillitoryUser.id = "fieldMillitaryUser_5";
        selectedMillitoryUser.className = "selection-field";

        let millitaryServiceOption = document.createElement("option");
        millitaryServiceOption.appendChild(document.createTextNode("Военнообязанный"));
        selectedMillitoryUser.appendChild(millitaryServiceOption);

        let releasedFromMilitaryServiceOption = document.createElement("option");
        releasedFromMilitaryServiceOption.appendChild(document.createTextNode("Освобождён"));
        selectedMillitoryUser.appendChild(releasedFromMilitaryServiceOption);

        let postponementFromMilitaryServiceOption = document.createElement("option");
        postponementFromMilitaryServiceOption.appendChild(document.createTextNode("Отсрочка"));
        selectedMillitoryUser.appendChild(postponementFromMilitaryServiceOption);

        fieldMillitoryUser.appendChild(labelMillitaryUser);
        fieldMillitoryUser.appendChild(selectedMillitoryUser);

        layoutVertical.appendChild(fieldMillitoryUser);

        let fieldCashSizeUser = document.createElement("div");
        fieldCashSizeUser.className = "field";
        let filedInputCashSizeUser = document.createElement("input");
        let labelCashSizeUser = document.createElement("label");
        labelCashSizeUser.appendChild(document.createTextNode("Выплаты:"));
        labelCashSizeUser.htmlFor = "fieldCashSizeUser_6";
        labelCashSizeUser.className = "label-field";

        filedInputCashSizeUser.type = "text";
        filedInputCashSizeUser.className = "input-field";
        filedInputCashSizeUser.id = "fieldCashSizeUser_6";

        fieldCashSizeUser.appendChild(labelCashSizeUser);
        fieldCashSizeUser.appendChild(filedInputCashSizeUser);

        layoutVertical.appendChild(fieldCashSizeUser);

        // let fieldAddGroupUser = document.createElement("div");
        // fieldAddGroupUser.className = "field";
        // let filedInputAddGroupUser = document.createElement("input");
        // let labelAddGroupUser = document.createElement("label");
        // labelAddGroupUser.appendChild(document.createTextNode("Зачислить в группу:"));
        // labelAddGroupUser.htmlFor = "fieldAddGroupUser_7";
        // labelAddGroupUser.className = "label-field";

        // filedInputAddGroupUser.type = "text";
        // filedInputAddGroupUser.className = "input-field";
        // filedInputAddGroupUser.id = "fieldAddGroupUser_7";

        // fieldAddGroupUser.appendChild(labelAddGroupUser);
        // fieldAddGroupUser.appendChild(filedInputAddGroupUser);

        // layoutVertical.appendChild(fieldAddGroupUser);

        return layoutVertical;
    }

    /**
     * Удаляет карточку пользователя 
     */
    removeCard()
    {
        let card = document.getElementById("recordUserCard");
        card.remove();
    }

    /**
     * Подготовить входные данные
     * @returns {UserModelDto}
     */
    prepareEnteredData()
    {
        let fieldInputFirstName = document.getElementById("fieldFirstNameUser_1");

        if (fieldInputFirstName instanceof HTMLInputElement)
            this.#userModelDto.FirstName = fieldInputFirstName.value;

        let fieldInputLastName = document.getElementById("fieldLastNameUser_2");

        if (fieldInputLastName instanceof HTMLInputElement)
            this.#userModelDto.LastName = fieldInputLastName.value;

        let fieldGenderUser = document.getElementById("fieldGenderUser_3");

        if (fieldGenderUser instanceof HTMLSelectElement)
            this.#userModelDto.Gender = fieldGenderUser.value;

        let fieldInputNumberPhone = document.getElementById("fieldNumberPhoneUser_4")

        if (fieldInputNumberPhone instanceof HTMLInputElement)
            this.#userModelDto.PhoneNumber = fieldInputNumberPhone.value;

        let fieldMillitoryUser = document.getElementById("fieldMillitaryUser_5");

        if (fieldMillitoryUser instanceof HTMLSelectElement)
            this.#userModelDto.Military = fieldMillitoryUser.value;
        
        let fieldCashSizeUser = document.getElementById("fieldCashSizeUser_6");

        if (fieldCashSizeUser instanceof HTMLInputElement)
            this.#userModelDto.CashSize = fieldCashSizeUser.value;
    }

    /**
     * Проверяет все ли поля заполненны 
     * @returns true - все поля заполненны; false - какие то поля не заполненны
     */
    isAllFieldsFilledIn()
    {
        let fields = new Array(this.#userModelDto.FirstName, this.#userModelDto.LastName,
            this.#userModelDto.Gender, this.#userModelDto.Military, this.#userModelDto.PhoneNumber, this.#userModelDto.CashSize);

        let result = false;

        let regExp = new RegExpressions;

        fields.forEach(field => 
            {
                result = regExp.isFieldFilled(field) ? true : false;
            });
        
        return result;
    }

    /**
     * Отправить созданную запись пользователя
     */
    async sendRecord()
    {
        let httpRequest = new HttpRequest;
        httpRequest.addContentTypeJson();

        return await httpRequest.PostAsync(this.#url_addRecordUser, this.#userModelDto);
    }

    /**
     * Обновляет запись пользователя
     */
    async updateRecord()
    {
        let httpRequest = new HttpRequest;
        httpRequest.addContentTypeJson();

        let indexDB = new IndexDBRepository;
        await indexDB.openRepository("WebSibguty", "Users");
        await indexDB.updateEntity(this.#userModelDto, "Users");

        return await httpRequest.PostAsync(this.#url_updateRecordUser, this.#userModelDto);
    }

    /**
     * 
     * @returns Возвращает заполненную запись 
     */
    getRecord()
    {
        return this.#userModelDto;
    }
}