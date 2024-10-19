using EFContextLib;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class FacultetController: Controller
{
    private readonly IFacultetContext _facultetContext = null!;

    public FacultetController(IFacultetContext facultetContext)
    {
        _facultetContext = facultetContext;
    }

    [HttpGet]
    [Route("table/content")]
    public async Task<IActionResult> GetFacultets()
    {
        var facultiesGroup = new List<FacultetModelDto>();

        if (_facultetContext is FacultetContext context)
            facultiesGroup = await context.FindAll().AsNoTracking().Select(facultet => 
                new FacultetModelDto
                {   
                    Id = facultet.Id,
                    FacultetName = facultet.FacultetName,
                    Dean = facultet.Dean
                }).ToListAsync();

        return Ok(facultiesGroup);
    }

    [HttpPost]
    [Route("table/filtered_facultets_content")]
    public async Task<IActionResult> GetFilteredFacultetsContent([FromBody] FacultetModelDto facultetDto)
    {
        var filter = new Filter(new FacultetFilterOut(_facultetContext));

        var facultetSelected = await filter.FilterOut(facultetDto);

        return Ok(facultetSelected);
    }
}