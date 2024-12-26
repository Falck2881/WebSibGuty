"use strict"
//@ts-check

/**
 * Класс с функциями для првоерки входных строк используя регулярные выражения
 */
export class RegExpressions
{
    /**
     * Проверяет заполненно ли поле
     * @param {string} field 
     */
    isFieldFilled(field)
    {
        let exp = new RegExp("[A-Za-z0-9А-Яа-я]{3,}");

        return exp.test(field);
    }
}