
/// <summary>
/// Абстрактный класс фильтр, в который передают производные реализации интерфейса <see cref="IFilterOut"/>
/// </summary>
public class Filter 
{
    /// <summary>
    /// Тут должна быть производная реализация интерфейса 
    /// </summary>
    private readonly IFilterOut _filterOut = null!;

    public Filter(IFilterOut newMethodFilter)
    {
        _filterOut = newMethodFilter;
    }

    /// <summary>
    /// Отфильтровыает содержимое по <see cref="EntityDto"/>
    /// </summary>
    /// <param name="entity">Сущность по которой выполням фильтрацию содержимого</param>
    /// <returns>Отфильтрованная коллекция <see cref="EntityDto"/></returns>
    public async Task<IEnumerable<EntityDto>> FilterOut(EntityDto entity)
    {
        return await _filterOut.Execute(entity);
    }
}