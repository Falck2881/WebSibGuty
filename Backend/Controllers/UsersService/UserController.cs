using EFContextLib;
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
}