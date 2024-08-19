using EFContextLib;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("Users")]
public class UserController: Controller
{
    private readonly UserContext _userContext = null!;
    public UserController(IUserContext IUserContext)
    {
        if (IUserContext is UserContext userContext)
            _userContext = userContext;
    }

    [HttpGet]
    [Route("All")]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userContext.FindAll().ToListAsync();

        return Ok(users);
    }
}