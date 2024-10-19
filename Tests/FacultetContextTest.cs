namespace EFContextLib.Test;

using Xunit;
using EFContextLib;
using Microsoft.EntityFrameworkCore;
using Xunit.Abstractions;

public class FacultetContextTest
{
    private readonly ITestOutputHelper _output;

    public FacultetContextTest(ITestOutputHelper outputHelper)
    {
        _output = outputHelper;
    }

    [Fact]
    public async Task TestCreateFacultetModel()
    {
        _output.WriteLine("Start TestCreateFacultetModel");

        var facultetModel = new FacultetModel()
        {
            Id = Guid.NewGuid().ToString(),
            IdGroup = Guid.NewGuid().ToString(),
            FacultetName = "Facultet",
            Dean = "Дикан", 
            TypeName = nameof(FacultetModel)
        };
        var context = new FacultetContext();
        
        Func<Task> action = async () => await EFContextTestHelper.Create(facultetModel, context);

        _output.WriteLine("Execute to create model of facultet");
        await Assert.ThrowsAsync<DbSuccessfullyOperationExeption>(action);

        _output.WriteLine("End TestCreateFacultetModel");
    }

    [Fact]
    public async Task TestFindFacultetModel()
    {
        _output.WriteLine("Start TestFindFacultetModel");

        var context = new FacultetContext();
        
        _output.WriteLine("Find model of Facultet");
        var facultetModel = await context.FindAll().FirstOrDefaultAsync(facultet => facultet.FacultetName == "Facultet");

        Assert.NotNull(facultetModel);

        _output.WriteLine("End TestFindFacultetModel");
    }

    [Fact]
    public async Task TestFindAllFacultetModels()
    {
        _output.WriteLine("Start TestFindAllFacultetModels");

        var context = new FacultetContext();

        _output.WriteLine("Find all model of facultet");
        var allFacultetsModels = await context.FindAll().ToListAsync();

        _output.WriteLine("Execute to action of find all model of facultet");
        Assert.NotEmpty(allFacultetsModels);

        _output.WriteLine("End TestFindAllFacultetModels");
    }

    [Fact]
    public async Task TestUpdateFacultetModel()
    {
        _output.WriteLine("Start TestUpdateFacultetModel");

        var context = new FacultetContext();
        var oldFacultetModel =  await context.FindAll().FirstOrDefaultAsync(facultet => facultet.FacultetName == "Facultet");

        _output.WriteLine("Find model of facultet");

        Assert.NotNull(oldFacultetModel);

        oldFacultetModel.FacultetName = "Super puper Facultet";
        
        _output.WriteLine("Execute to action of update model of facultet");
        Func<Task> action = async () => await EFContextTestHelper.Update(oldFacultetModel, context);
        
        await Assert.ThrowsAsync<DbSuccessfullyOperationExeption>(action);

        _output.WriteLine("End TestUpdateFacultetModel");
    }

    [Fact]
    public async Task TestDeleteFacultetModel()
    {
        _output.WriteLine("Start TestDeleteFacultetModel");

        var context = new FacultetContext();
        var oldFacultetModel =  await context.FindAll().FirstOrDefaultAsync(facultet => facultet.FacultetName == "Super puper Facultet");

        _output.WriteLine("Find model of facultet");

        Assert.NotNull(oldFacultetModel);
        
        _output.WriteLine("Execute to action of delete model of facultet");
        Func<Task> action = async () => await EFContextTestHelper.Delete(oldFacultetModel, context);
        
        await Assert.ThrowsAsync<DbSuccessfullyOperationExeption>(action);

        _output.WriteLine("End TestDeleteFacultetModel");
    }
}