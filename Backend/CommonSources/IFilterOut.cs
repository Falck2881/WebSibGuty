using System.Collections.Generic;

/// <summary>
/// Производные классы должные реализовывать выборку 
/// опираясь на данные которые содержаться в сущности <see cref="EntityDto"/>
/// </summary>
public interface IFilterOut
{
    /// <summary>
    /// Выполняет фильтрацию
    /// </summary>
    /// <param name="entity">Сущность по которой будет выполнятся фильрация</param>
    /// <returns>Возвращает отфильтрованную коллекцию <see cref="EntityDto"/></returns>
    Task<IEnumerable<EntityDto>> Execute(EntityDto entity);
}