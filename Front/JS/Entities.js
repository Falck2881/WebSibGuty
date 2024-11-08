"use strict";
//@ts-check

export class UserModelDto
{
    constructor()
    {
        this.Id = "";

        this.FirstName = "";

        this.LastName = "";

        this.Gender = "";

        this.DataBirth = "";

        this.PhoneNumber = "";

        this.CashSize = "";

        this.Military = "";

    }

    /**
     * Возвращает преобразованный массив в массив DTO моделей
     * @param {Array<UserModelDto>} content 
     */
    async ToUserModelDto(content)
    {
        if (content === null)
            return new Array.of();

        let usersModelDto = new Array();

        if (Array.isArray(content))
        {
            content.forEach(data => 
                {
                    var userModelDto = new UserModelDto();
                    userModelDto.Id = data.Id;
                    userModelDto.FirstName = data.FirstName;
                    userModelDto.CashSize = data.CashSize;
                    userModelDto.DataBirth = data.CashSize;
                    userModelDto.LastName = data.LastName;
                    userModelDto.Military = data.Military;
                    userModelDto.PhoneNumber = data.PhoneNumber;
                    userModelDto.Gender = data.Gender;

                    usersModelDto.push(userModelDto);
                });
        }

        return usersModelDto;
    }
}

export class GroupModelDto
{
    constructor()
    {
        this.Id = "";
        
        this.FacultetName = "";

        this.GroupName = "";

        this.GroupCreateData = "";

        this.GroupDeleteData = "";
    }
}

export class FacultetModelDto
{
    constructor()
    {
        this.Id = "";
        
        this.FacultetName = "";
        
        this.Dean = "";
    }
}