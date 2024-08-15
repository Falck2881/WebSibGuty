
using EFContextLib;
using Microsoft.EntityFrameworkCore;

public static class EFContextTestHelper
{
    public async static Task Create<TEntry, TContext>(TEntry entry, TContext context) 
        where TEntry : class
        where TContext : PostgressRepositoryContext<TEntry>
    {
        try
        {
            await context.CreateAsync(entry);
            await context.SaveAsync();
        }
        catch(DbUpdateException dbUpdateException)
        {
            throw new DbUpdateException(dbUpdateException.Message);
        }
        finally
        {
            throw new DbSuccessfullyOperationExeption($"Successfully create entity type {typeof(TEntry).Name}");
        }
    }

    public async static Task Update<TEntry, TContext>(TEntry entry, TContext context) 
        where TEntry : class
        where TContext : PostgressRepositoryContext<TEntry>
    {
        try
        {
            context.Update(entry);
            await context.SaveAsync();
        }
        catch(DbUpdateException dbUpdateException)
        {
            throw new DbUpdateException(dbUpdateException.Message);
        }
        finally
        {
            throw new DbSuccessfullyOperationExeption($"Successfully update entity type {typeof(TEntry).Name}");
        }
    }

    public async static Task Delete<TEntry, TContext>(TEntry entry, TContext context)
        where TEntry : class
        where TContext : PostgressRepositoryContext<TEntry>
    {
        try
        {
            context.Delete(entry);
            await context.SaveAsync();
        }
        catch(DbUpdateException dbUpdateException)
        {
            throw new DbUpdateException(dbUpdateException.Message);
        }
        finally
        {
            throw new DbSuccessfullyOperationExeption($"Successfully delete entity type {typeof(TEntry).Name}");
        }
    }
}