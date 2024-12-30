namespace EFContextLib.Test;

using Xunit;
using EFContextLib;
using Microsoft.EntityFrameworkCore;
using Xunit.Abstractions;

public class UserContextTest
{
    private readonly ITestOutputHelper _output;

    public UserContextTest(ITestOutputHelper outputHelper)
    {
        _output = outputHelper;
    }

    [Fact]
    public async Task TestCreateUserModel()
    {
        _output.WriteLine("Start TestCreateUserModel");

        var userModel = new UserModel()
        {
            AvarangeScore = 0,
            CashSize = "300",
            DataBirth = DateTime.Now.ToString(),
            FirstName = "FirstTest",
            Gender = "men",
            Id = Guid.NewGuid().ToString(),
            IdGroup = Guid.NewGuid().ToString(),
            LastName = "last",
            Login = "login",
            Military = "Military",
            Password = "123",
            PhoneNumber = "0000000000000",
            SubjectName = "sub"
        };
        var context = new UserContext();
        
        Func<Task> action = async () => await EFContextTestHelper.Create(userModel, context);

        _output.WriteLine("Execute to create model of users");
        await Assert.ThrowsAsync<DbSuccessfullyOperationExeption>(action);

        _output.WriteLine("End TestCreateUserModel");
    }

    [Fact]
    public async Task TestFindUserModel()
    {
        _output.WriteLine("Start TestFindUserModel");

        var context = new UserContext();
        
        _output.WriteLine("Find model of user");
        var userModel = await context.FindAll().FirstOrDefaultAsync(user => user.Login == "login");

        Assert.NotNull(userModel);

        _output.WriteLine("End TestFindUserModel");
    }

    [Fact]
    public async Task TestFindAllUserModels()
    {
        _output.WriteLine("Start TestFindAllUserModels");

        var context = new UserContext();

        _output.WriteLine("Find all model of users");
        var allUserModels = await context.FindAll().ToListAsync();

        _output.WriteLine("Execute to action of find all model of users");
        Assert.NotEmpty(allUserModels);

        _output.WriteLine("End TestFindAllUserModels");
    }

    [Fact]
    public async Task TestUpdateUserModel()
    {
        _output.WriteLine("Start TestUpdateUserModel");

        var context = new UserContext();
        var oldUserModel =  await context.FindAll().FirstOrDefaultAsync(user => user.Login == "login");

        _output.WriteLine("Find model of user");

        Assert.NotNull(oldUserModel);

        oldUserModel.Password = "00000001";
        
        _output.WriteLine("Execute to action of update model of user");
        Func<Task> action = async () => await EFContextTestHelper.Update(oldUserModel, context);
        
        await Assert.ThrowsAsync<DbSuccessfullyOperationExeption>(action);

        _output.WriteLine("End TestUpdateUserModel");
    }

    [Fact]
    public async Task TestDeleteUserModel()
    {
        _output.WriteLine("Start TestDeleteUserModel");

        var context = new UserContext();
        var oldUserModel =  await context.FindAll().FirstOrDefaultAsync(user => user.Login == "login");

        _output.WriteLine("Find model of user");

        Assert.NotNull(oldUserModel);
        
        _output.WriteLine("Execute to action of delete model of user");
        Func<Task> action = async () => await EFContextTestHelper.Delete(oldUserModel, context);
        
        await Assert.ThrowsAsync<DbSuccessfullyOperationExeption>(action);

        _output.WriteLine("End TestDeleteUserModel");
    }
}