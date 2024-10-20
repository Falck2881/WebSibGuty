using EFContextLib;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


/// <summary>
/// Контроллер по работе с таблицей - Группы
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class GroupController: Controller
{
    private readonly IGroupContext _groupContext = null!;

    private readonly IFacultetContext _facultetContext = null!;

    public GroupController(IGroupContext groupContext, IFacultetContext facultetContext)
    {
        _groupContext = groupContext;
        _facultetContext = facultetContext;
    }

    /// <summary>
    /// Возвращает содержимое всей таблицы группы 
    /// </summary>
    /// <returns>Список DTO моделей <see cref="GroupModelDto"/></returns>
    [HttpGet]
    [Route("table/content")]
    public async Task<IActionResult> GetGroups()
    {
        var groupsDto = await GroupModelDto.PrepareGroupsDto(_facultetContext, _groupContext);

        return Ok(groupsDto);
    }


    /// <summary>
    /// Возвращает отфильтрованную выборку из таблицы - Группы
    /// </summary>
    /// <param name="group">Модель DTO в которой передаём выбранные/введённые значения из фильтров</param>
    /// <returns>Список DTO моделей <see cref="GroupModelDto"/></returns>
    [HttpPost]
    [Route("table/filtered_groups_content")]
    public async Task<IActionResult> GetFilteredGroupsContent([FromBody] GroupModelDto group)
    {        
        var filter = new Filter(new GroupFilterOut(_groupContext, _facultetContext));
        
        var groupSelected = await filter.FilterOut(group); 

        return Ok(groupSelected);
    }
}