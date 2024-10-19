using EFContextLib;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// Реализует выборку содержимого из таблицы моделей <see cref="FacultetModel"/>
/// </summary>
public class FacultetFilterOut: IFilterOut
{
    /// <summary>
    /// Контекст по работе содержимым <see cref="FacultetModel"/> таблицы
    /// </summary>
    private readonly IFacultetContext _facultetContext;

    public FacultetFilterOut(IFacultetContext filterContext)
    {
        _facultetContext = filterContext;
    }

    public async Task<IEnumerable<EntityDto>> Execute(EntityDto entity)
    {
        if (_facultetContext is not FacultetContext facultetContext)
            return new List<FacultetModelDto>();

        if (entity is not FacultetModelDto facultetDto)
            return new List<FacultetModelDto>();
        
        var facultetSelected = await facultetContext.FindAll().AsNoTracking()
                            .Where(model => (string.IsNullOrEmpty(facultetDto.FacultetName) || model.FacultetName.Equals(facultetDto.FacultetName)) &&
                                            (string.IsNullOrEmpty(facultetDto.Dean) || model.Dean.Equals(facultetDto.Dean)))
                            .Select(model => new FacultetModelDto()
                            {
                                Id = model.Id,
                                FacultetName = model.FacultetName,
                                Dean = model.Dean
                            })
                            .ToListAsync();

        return facultetSelected;
    }
}