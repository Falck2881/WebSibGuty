namespace Controllers;

using EFContextLib;
using Microsoft.AspNetCore.Mvc;

public class UsersController: Controller
{
    private readonly IUserContext _userContext;
    public UsersController(IUserContext userContext)
    {
        _userContext = userContext;
    }
}