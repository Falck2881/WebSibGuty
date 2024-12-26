"use strict"
//@ts-check

export class NullReferenceOfObjectError extends Error
{
    constructor(myObject, ...params)
    {
        super(...params);
        this.name = "NullReferenceOfObjectError";
        this.argument = myObject;
    }
}
