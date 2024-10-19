using System.Timers;
using EFContextLib;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Xunit.Abstractions;

public class GroupContextTest
{
    private readonly ITestOutputHelper _outputHelper;

    public GroupContextTest(ITestOutputHelper outputHelper)
    {
        _outputHelper = outputHelper;
    }

    [Fact]
    public async Task TestCreateGroupModel()
    {
        _outputHelper.WriteLine("Start TestCreateGroupModel");

        var context = new GroupContext();

        var groupModel = new GroupModel
        {
            id = Guid.NewGuid().ToString(),
            GroupName = "My ПБТ-83",
            IdFacultet = Guid.NewGuid().ToString(),
            IdUser = Guid.NewGuid().ToString(),
            TypeName =  nameof(GroupModel),
            GroupCreateData = DateTimeOffset.Now.ToString(),
            GroupDeleteData = DateTimeOffset.Now.ToString()
        };

        var action = async () => await EFContextTestHelper.Create(groupModel, context);

        _outputHelper.WriteLine("Execute to create model of users");
        await Assert.ThrowsAsync<DbSuccessfullyOperationExeption>(action);

        _outputHelper.WriteLine("End TestCreateGroupModel");
    }

    [Fact]
    public async Task TestFindAllGroups()
    {
        _outputHelper.WriteLine("Start TestFindAllGroups");

        var context = new GroupContext();

        var groups = await context.FindAll().ToListAsync();

        Assert.NotEmpty(groups);

        _outputHelper.WriteLine("End TestFindAllGroups");
    }

    [Fact]
    public async Task TestFindGroupModel()
    {
        _outputHelper.WriteLine("Start TestFindGroupModel");

        var context = new GroupContext();

        var group = await context.FindAll().FirstOrDefaultAsync(group => group.GroupName.Equals("My ПБТ-83"));

        Assert.NotNull(group);

        _outputHelper.WriteLine("End TestFindGroupModel");
    }
    
    [Fact]
    public async Task TestUpdateGroupModel()
    {
        _outputHelper.WriteLine("Start TestUpdateGroupModel");

        var context = new GroupContext();

        var groupModel = await context.FindAll().FirstOrDefaultAsync(groupModel => groupModel.GroupName.Equals("My ПБТ-83"));

        Assert.NotNull(groupModel);
        
        groupModel.GroupName = "Suuper puper PBT 83";
        Func<Task> action = async () => await EFContextTestHelper.Update(groupModel, context);
        
        await Assert.ThrowsAsync<DbSuccessfullyOperationExeption>(action);

        _outputHelper.WriteLine("End TestUpdateGroupModel");
    }

    [Fact]
    public async Task TestDeleteGroupModel()
    {
        _outputHelper.WriteLine("Start TestDeleteGroupModel");

        var context = new GroupContext();

        var groupModel = await context.FindAll().FirstOrDefaultAsync(group => group.GroupName.Equals("Suuper puper PBT 83"));

        Assert.NotNull(groupModel);

        Func<Task> action = async () => await EFContextTestHelper.Delete(groupModel, context);
        
        await Assert.ThrowsAsync<DbSuccessfullyOperationExeption>(action);

        _outputHelper.WriteLine("End TestDeleteGroupModel");
    }
}