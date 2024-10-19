using EFContextLib;
using Microsoft.EntityFrameworkCore;


/// <summary>
/// Релизует выборку содержимого из таюдицы моделей <see cref="UserModel"/>
/// </summary>
public sealed class UsersFilterOut: IFilterOut
{
    /// <summary>
    /// Контекст по работе с моделями <see cref="UserModel"/>
    /// </summary>
    private readonly IUserContext _context = null!;

    public UsersFilterOut(IUserContext context)
    {
        _context = context;
    }

    ///<inheritdoc/>
    public async Task<IEnumerable<EntityDto>> Execute(EntityDto entity)
    {
        if (_context is not UserContext context)
            return new List<UserModelDto>();

        if (entity is not UserModelDto userFilter)
            return new List<UserModelDto>();

        var resultOfSelecion = new List<UserModelDto>();

        var users = await context.FindAll().AsNoTracking().ToListAsync();

        resultOfSelecion = users.Where( dbUser => (string.IsNullOrEmpty(userFilter.Gender) || dbUser.Gender.Equals(userFilter.Gender)) && 
                                        (string.IsNullOrEmpty(userFilter.Military) || dbUser.Military.Equals(userFilter.Military)) &&
                                        (string.IsNullOrEmpty(userFilter.FirstName) || dbUser.FirstName.Equals(userFilter.FirstName)) &&
                                        (string.IsNullOrEmpty(userFilter.LastName) || dbUser.LastName.Equals(userFilter.LastName)))
                                .Select( dbUser => new UserModelDto()
                                {
                                    Id = dbUser.Id, 
                                    FirstName = dbUser.FirstName, 
                                    LastName = dbUser.LastName, 
                                    Gender = dbUser.Gender, 
                                    DataBirth = dbUser.DataBirth, 
                                    PhoneNumber = dbUser.PhoneNumber, 
                                    CashSize = dbUser.CashSize, 
                                    Military = dbUser.Military
                                }).ToList();

        return resultOfSelecion;
    }
}