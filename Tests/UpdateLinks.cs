using Xunit;
using Microsoft.EntityFrameworkCore;
using Xunit.Abstractions;

namespace EFContextLib.Tests;

public class UpdateLinks
{
    private ITestOutputHelper _output;

    public UpdateLinks(ITestOutputHelper outputHelper)
    {
        _output = outputHelper;
    }

    [Fact]
    public async Task LinkUserRecordsToFacultyRecords()
    {
        var userContext = new UserContext();

        var allIdsGroupsFromUsers = userContext.FindAll().ToDictionary(key => key.IdGroup, value => value.Id); 

        var facultetContext = new FacultetContext();

        var allFaculties = await facultetContext.FindAll().ToListAsync();
        
        var selectedAllFaculties =  allFaculties.Where(model => allIdsGroupsFromUsers.ContainsKey(model.IdGroup)).ToList();

        selectedAllFaculties.ForEach(model => 
        {
            if (allIdsGroupsFromUsers.TryGetValue(model.IdGroup, out var idUser))
                model.IdUser = idUser;
        });

        facultetContext.Update(selectedAllFaculties);

        await facultetContext.SaveAsync();

        var allIdsGroupsFromFacultets = facultetContext.FindAll().ToDictionary(key => key.IdGroup, value => value.Id);

        var allUsers = await userContext.FindAll().ToListAsync();
        
        var selectedAllUsers = allUsers.Where(model => allIdsGroupsFromFacultets.ContainsKey(model.IdGroup)).ToList();

        selectedAllUsers.ForEach(model => 
        {
            if (allIdsGroupsFromFacultets.TryGetValue(model.IdGroup, out var idFacultet))
                model.IdFacultet = idFacultet;
        });

        userContext.Update(selectedAllUsers);
        await userContext.SaveAsync();
    }

}