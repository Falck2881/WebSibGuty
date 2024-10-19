
using EFContextLib;
using Microsoft.EntityFrameworkCore;


/// <summary>
/// DTO модели <see cref="GroupModel"/>
/// </summary>
public class GroupModelDto: EntityDto
{
    public override String Id { get; set;} = null!;

    public String FacultetName {get; set; } = null!;

    public String GroupName {get; set;} = null!;

    public String GroupCreateData {get; set;} = null!;

    public String GroupDeleteData {get; set;} = null!;

    /// <summary>
    /// Подготавливает список DTO моделей <see cref="GroupModelDto"/> 
    /// </summary>
    /// <param name="facultetContext">Контекст работающий с моделями <see cref="FacultetModel"/></param>
    /// <param name="groupContext">Контекст работающий с моделями <see cref="GroupModel"/></param>
    /// <returns>Список DTO моделей <see cref="GroupModelDto"/></returns>
    public static async Task<List<GroupModelDto>> PrepareGroupsDto(
        IFacultetContext facultetContext,
        IGroupContext groupContext)
    {
        if (groupContext is not GroupContext groupContextRepository)
            return new List<GroupModelDto>();

        if (facultetContext is not FacultetContext facultetContextRepository)
            return new List<GroupModelDto>();

        var facultiesDto = await facultetContextRepository.FindAll().AsNoTracking().Select(facultet =>
                new FacultetModelDto{Id = facultet.Id, Dean = facultet.Dean, FacultetName = facultet.FacultetName})
                .ToListAsync();

        var groupSelection = new List<GroupModelDto>();

        var groupsModelAll = await groupContextRepository.FindAll().AsNoTracking().ToListAsync();

        foreach(var facultet in facultiesDto)
        {
            groupsModelAll.ForEach(model => 
            {
                if (model.IdFacultet.Equals(facultet.Id))
                {
                    var groupDto = new GroupModelDto()
                    {
                        Id = model.id,
                        FacultetName = facultet.FacultetName,
                        GroupCreateData = model.GroupCreateData,
                        GroupDeleteData = model.GroupDeleteData,
                        GroupName = model.GroupName
                    };

                    groupSelection.Add(groupDto);
                }
            });
        }

        return groupSelection;
    }
}