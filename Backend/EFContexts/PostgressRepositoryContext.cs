using System.Collections;
using Microsoft.EntityFrameworkCore;

namespace EFContextLib;

public class PostgressRepositoryContext<TEntity>: DbContext
    where TEntity : class
{
    protected DbSet<TEntity> SetEntities {get; set;}

    public PostgressRepositoryContext(): base()
    {

    }

    /// <summary>
    /// Добавляет модель в <see cref="SetEntities"/>
    /// </summary>
    /// <param name="entityModel">Модель сущности которую создаём в таблице БД</param>
    public async Task CreateAsync(TEntity entityModel, CancellationToken cancellationToken = default)
    {
        await SetEntities.AddAsync(entityModel, cancellationToken);
    }

    /// <summary>
    /// Ищет сущность и возвращает результат
    /// </summary>
    /// <param name="id">id сущности</param>
    /// <returns>Возвращает сущность</returns>
    public async Task<TEntity> Find(String id)
    {
        return await SetEntities.FindAsync(id) ?? default;
    }

    /// <summary>
    /// Возврщает все найденные сущности в наборе <see cref="SetEntities"/>.
    /// </summary>
    /// <typeparam name="TEntity">Сущность в наборе</typeparam>
    /// <returns></returns>
    public IQueryable<TEntity> FindAll(CancellationToken cancellationToken= default)
    {
        return SetEntities;
    }

    /// <summary>
    /// Отслеживает изменения сущности в <see cref="SetEntities"/> 
    /// </summary>
    /// <param name="entityModel">Модель сущности которую отслеживаем и обновляем в таблице.</param>
    public void Update(TEntity entityModel)
    {
        SetEntities.Update(entityModel);
    }

    /// <summary>
    /// Перегруженный метод
    /// Отслеживает изменения коллекции сущностей в <see cref="SetEntities"/> 
    /// </summary>
    /// <param name="entities">Обновлённые сущности которые нужно отслеживать и обновить в таблице</param>
    public void Update(IEnumerable<TEntity> entities)
    {
        SetEntities.UpdateRange(entities);
    }

    /// <summary>
    /// Удаляет модель сущности из <see cref="SetEntities"/> 
    /// </summary>
    /// <param name="entityModel"></param>
    public void Delete(TEntity entityModel)
    {
        if (SetEntities.Any())
            SetEntities.Remove(entityModel);
    }

    /// <summary>
    /// Сохроняет все изменения контекста.
    /// </summary>
    /// <param name="cancellationToken"></param>
    public async Task SaveAsync(CancellationToken cancellationToken = default)
    {
        await SaveChangesAsync(cancellationToken);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var config = new ConfigurationBuilder()
                        .AddJsonFile("ConnectBaseData.json")
                        .SetBasePath(Directory.GetCurrentDirectory())
                        .Build();

        optionsBuilder.UseNpgsql(config.GetConnectionString("DefaultConnection"));
    }
}