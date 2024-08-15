namespace EFContextLib;

/// <summary>
/// Контекст групп, который выводит тип сущности <see cref="GroupModel"/> для работы с таблицей "facultiesgroup"
/// </summary>
public class GroupContext: PostgressRepositoryContext<GroupModel>, IGroupContext
{
    
}