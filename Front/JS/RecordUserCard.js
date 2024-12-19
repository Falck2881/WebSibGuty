"use strict"
//@ts-check

export class RecordUserCard
{
    create()
    {
        let recordUserCard = document.createElement("div");
        recordUserCard.className = "";

        recordUserCard.appendChild( this.#createHeaderCard());

        recordUserCard.appendChild(this.#createFieldsInputs());


    }

    /**
     * Создаёт заголовок и возвращает его
     * @returns Возвращает заголовок карточки
     */
    #createHeaderCard()
    {
        let headerCard = document.createElement("h4");
        headerCard.className = "";
        headerCard.appendChild(document.createTextNode("Создание карточки пользователя."));

        return headerCard;
    }

    /**
     * Создаёт поля ввода данных 
     * @returns Возвращает размещённый блок с полями ввода
     */
    #createFieldsInputs()
    {
        let layoutVertical = document.createElement("div");
        layoutVertical.className = "";

        let fieldInputFirstNameUser = document.createElement("input");
        let labelFirstNameUser = document.createElement("label");
        labelFirstNameUser.appendChild(document.createTextNode("Имя:"));
        labelFirstNameUser.htmlFor = "fieldFirstNameUser_1";

        fieldInputFirstNameUser.type = "text";
        fieldInputFirstNameUser.id = "fieldFirstNameUser_1";
        fieldInputFirstNameUser.className = "";
        labelFirstNameUser.appendChild(fieldInputFirstNameUser);

        layoutVertical.appendChild(labelFirstNameUser);

        let fieldInputLastNameUser = document.createElement("input");
        let labelLastNameUser = document.createElement("label");
        labelLastNameUser.appendChild(document.createTextNode("Фамилия:"));
        labelLastNameUser.htmlFor = "fieldLastNameUser_2";

        fieldInputLastNameUser.type = "text";
        fieldInputLastNameUser.id = "fieldLastNameUser_2";
        fieldInputLastNameUser.className = "";
        labelLastNameUser.appendChild(fieldInputLastNameUser);

        layoutVertical.appendChild(labelLastNameUser);

        let selectGenderUser = document.createElement("select");
        let labelGenderUser = document.createElement("label");
        labelGenderUser.appendChild(document.createTextNode("Пол:"));
        labelGenderUser.htmlFor = "fieldGenderUser_3";

        selectGenderUser.id = "fieldGenderUser_3";
        selectGenderUser.className = "";

        let menOption = document.createElement("option");
        menOption.appendChild(document.createTextNode("Муж."));
        selectGenderUser.appendChild(menOption);

        let womenOption = document.createElement("option");
        womenOption.appendChild(document.createTextNode("Жен."));
        selectGenderUser.appendChild(womenOption);
        labelGenderUser.appendChild(selectGenderUser);

        layoutVertical.appendChild(labelGenderUser);

        let filedInputNumberPhoneUser = document.createElement("input");
        let labelNumberPhoneUser = document.createElement("label");
        labelNumberPhoneUser.appendChild(document.createTextNode("Номер телефона:"));
        labelNumberPhoneUser.htmlFor = "fieldNumberPhoneUser_4";

        filedInputNumberPhoneUser.type = "text";
        filedInputNumberPhoneUser.class = "";
        filedInputNumberPhoneUser.id = "fieldNumberPhoneUser_4";
        labelNumberPhoneUser.appendChild(filedInputNumberPhoneUser)

        layoutVertical.appendChild(labelNumberPhoneUser);

        let selectedMillitoryUser = document.createElement("section");
        let labelMillitaryUser = document.createElement("label");
        labelMillitaryUser.appendChild(document.createTextNode("Военнообязанность:"));
        labelMillitaryUser.htmlFor = "fieldMillitaryUser_5";

        selectedMillitoryUser.id = "fieldMillitaryUser_5";
        selectedMillitoryUser.className = "";

        let millitaryServiceOption = document.createElement("option");
        millitaryServiceOption.appendChild(document.createTextNode("Военнообязанный"));
        selectedMillitoryUser.appendChild(millitaryServiceOption);

        let releasedFromMilitaryServiceOption = document.createElement("option");
        releasedFromMilitaryServiceOption.appendChild(document.createAttribute("Освобождён"));
        selectedMillitoryUser.appendChild(releasedFromMilitaryServiceOption);

        let postponementFromMilitaryServiceOption = document.createElement("option");
        postponementFromMilitaryServiceOption.appendChild(document.createAttribute("Отсрочка"));
        selectedMillitoryUser.appendChild(postponementFromMilitaryServiceOption);
        labelMillitaryUser.appendChild(selectedMillitoryUser);

        layoutVertical.appendChild(labelMillitaryUser);

        let filedInputCashSizeUser = document.createElement("input");
        let labelCashSizeUser = document.createElement("label");
        labelCashSizeUser.appendChild(document.createTextNode("Выплаты:"));
        labelCashSizeUser.htmlFor = "fieldCashSizeUser_6";

        filedInputCashSizeUser.type = "text";
        filedInputCashSizeUser.class = "";
        filedInputCashSizeUser.id = "fieldCashSizeUser_6";
        labelCashSizeUser.appendChild(filedInputCashSizeUser);

        layoutVertical.appendChild(labelCashSizeUser);

        let filedInputAddGroupUser = document.createElement("input");
        let labelAddGroupUser = document.createElement("label");
        labelAddGroupUser.appendChild(document.createTextNode("Зачислить в группу:"));
        labelAddGroupUser.htmlFor = "fieldAddGroupUser_7";

        filedInputAddGroupUser.type = "text";
        filedInputAddGroupUser.class = "";
        filedInputAddGroupUser.id = "fieldAddGroupUser_7";
        labelAddGroupUser.appendChild(filedInputCashSizeUser);

        layoutVertical.appendChild(labelAddGroupUser);

        return layoutVertical;
    }
}