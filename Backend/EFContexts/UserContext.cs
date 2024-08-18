/// <summary>
/// Контекст пользователей, который выводит тип сущности <see cref="UserModel" /> для работы с таблицей "users"
/// </summary>

namespace EFContextLib;

public class UserContext: PostgressRepositoryContext<UserModel>, IUserContext
{ 
    public UserContext()
    {

    }
}