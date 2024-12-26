using EFContextLib;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class UserController: Controller
{
    private readonly IUserContext _userContext = null!;

    public UserController(IUserContext userContext)
    {
        _userContext = userContext;
    }

    [HttpGet]
    [Route("table/content")]
    public async Task<IActionResult> GetUsers()
    {
        var users = new List<UserModelDto>();

        if (_userContext is UserContext context)
            users = await context.FindAll().Select(user =>
                new UserModelDto
                { 
                    Id = user.Id, 
                    FirstName = user.FirstName, 
                    LastName = user.LastName, 
                    Gender = user.Gender, 
                    DataBirth = user.DataBirth, 
                    PhoneNumber = user.PhoneNumber, 
                    CashSize = user.CashSize, 
                    Military = user.Military
                }).ToListAsync();

        return Ok(users);
    }

    [HttpPost]
    [Route("table/filtered_users_content")]
    public async Task<IActionResult> GetFilteredUsersContent([FromBody] UserModelDto user)
    {
        var filter = new Filter(new UsersFilterOut(_userContext));

        var resultOfSelecion = await filter.FilterOut(user);

        return Ok(resultOfSelecion);
    }

    [HttpPost]
    [Route("table/add/record_user")]
    public async Task<IActionResult> AddUser([FromBody] UserModelDto user)
    {
        if (user is null)
            return new NotFoundObjectResult(new {Message = "Ошибка 404: переданный объект клиента равен null"});

        if (_userContext is not UserContext userContext)
            return new JsonResult(new {Message = "Ошибка 502: Контекст не соответствует типу"});

        user.Id = Guid.NewGuid().ToString();

        var userModel = new UserModel()
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Gender = user.Gender,
            Password = "empty",
            DataBirth = "empty",
            Login = "empty",
            Military = user.Military,
            CashSize = user.CashSize,
            AvarangeScore = 0,
            IdGroup = "empty",
            PhoneNumber = user.PhoneNumber,
            SubjectName = "Гость",
            TypeName = nameof(UserModel)
        };

        await userContext.AddAsync(userModel);
        await userContext.SaveChangesAsync();

        return Ok(new {Message = "Успешно"});
    }
}