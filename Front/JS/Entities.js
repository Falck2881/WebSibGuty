"use strict";
//@ts-check

export class EntityDto
{
    constructor()
    {
        this.Id = "";
    }
}


export class UserModelDto extends EntityDto
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
}

export class GroupModelDto extends EntityDto
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

export class FacultetModelDto extends EntityDto
{
    constructor()
    {
        this.Id = "";
        
        this.FacultetName = "";
        
        this.Dean = "";
    }
}