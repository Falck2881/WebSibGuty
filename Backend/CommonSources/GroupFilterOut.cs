using EFContextLib;

/// <summary>
/// Реализует выборку содержимого из таблицы моделей <see cref="GroupModel"/>
/// </summary>
public sealed class GroupFilterOut: IFilterOut
{
    /// <summary>
    /// Контекст по работе с моделями <see cref="GroupModel"/> 
    /// </summary>
    private readonly IGroupContext _groupContext;

    /// <summary>
    /// Контекст по работе с моделями <see cref="FacultetModel"/>
    /// </summary>
    private readonly IFacultetContext _facultetContext;
    
    public GroupFilterOut(IGroupContext groupContext, IFacultetContext facultetContex)
    {
        _groupContext = groupContext;
        _facultetContext = facultetContex;
    }

    /// <inheritdoc/>
    public async Task<IEnumerable<EntityDto>> Execute(EntityDto entity)
    {
        var groupsDto = await GroupModelDto.PrepareGroupsDto(_facultetContext, _groupContext);

        var groupsSelected = FilterOutGroups(groupsDto, entity);

        return groupsSelected;
    }

    /// <summary>
    /// Отфильтровывает модели группы по <see cref="EntityDto"/>
    /// </summary>
    /// <param name="groupModels">Модели групп которые нужно отфильтровать</param>
    /// <param name="entity">Сущность по которой будем выполнять фильтрацию содержимого коллекции</param>
    /// <returns>Отфильтрованный список DTO моделей <see cref="GroupModelDto"/></returns>
    private List<GroupModelDto> FilterOutGroups(
        List<GroupModelDto> groupModels,
        EntityDto entity)
    {
        if (entity is not GroupModelDto groupDto)
            return new List<GroupModelDto>();

        var groupSelected = groupModels.Where(
            model => (string.IsNullOrEmpty(groupDto.FacultetName) || model.FacultetName.Equals(groupDto.FacultetName)) &&
                    (string.IsNullOrEmpty(groupDto.GroupName) || model.GroupName.Equals(groupDto.GroupName)))
            .Select(model => new GroupModelDto()
            {
                Id = model.Id,
                FacultetName = model.FacultetName,
                GroupName = model.GroupName,
                GroupCreateData = model.GroupCreateData,
                GroupDeleteData = model.GroupDeleteData
            })
            .ToList();

        return groupSelected;
    }
}