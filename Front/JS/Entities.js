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
    /**
     * Устанавливает значения 
     * @param {UserModelDto} user 
     */
    constructor(user)
    {
        super();

        this.Id = user?.Id || "";

        this.FirstName = user?.FirstName || "";

        this.LastName = user?.LastName || "";

        this.Gender = user?.Gender || "";

        this.DataBirth = user?.DataBirth || "";

        this.PhoneNumber = user?.PhoneNumber || "";

        this.CashSize = user?.CashSize || "";

        this.Military = user?.Military || "";
    }
}

export class GroupModelDto extends EntityDto
{
    /**
     * Устанавливает значения 
     * @param {GroupModelDto} group
     */
    constructor(group)
    {
        super();

        this.Id = group?.Id || "";
        
        this.FacultetName = group?.FacultetName || "";

        this.GroupName = group?.GroupName || "";

        this.GroupCreateData = group?.GroupCreateData || "";

        this.GroupDeleteData = group?.GroupDeleteData || "";
    }
}

export class FacultetModelDto extends EntityDto
{
    /**
     * Устанавливает значения 
     * @param {FacultetModelDto} facultet 
     */
    constructor(facultet)
    {
        super();

        this.Id = facultet?.Id || "";
        
        this.FacultetName = facultet?.FacultetName || "";
        
        this.Dean = facultet?.Dean || "";
    }
}