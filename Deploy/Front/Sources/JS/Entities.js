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