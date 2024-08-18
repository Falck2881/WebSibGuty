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
    /// Создаёт модель сущности в таблице БД
    /// </summary>
    /// <param name="entityModel">Модель сущности которую создаём в таблице БД</param>
    public async Task CreateAsync(TEntity entityModel, CancellationToken cancellationToken = default)
    {
        await SetEntities.AddAsync(entityModel, cancellationToken);
    }

    /// <summary>
    /// Возврщает все найденные сущности в наборе <see cref="IRepositoryContext.Set"/>.
    /// </summary>
    /// <typeparam name="TEntity">Сущность в наборе</typeparam>
    /// <returns></returns>
    public IQueryable<TEntity> FindAll(CancellationToken cancellationToken= default)
    {
        return SetEntities;
    }

    /// <summary>
    /// Начинает отслеживать модель сущности в контексте.
    /// 
    /// Если модель сущности существует в таблице БД, то обновляет её.
    /// Иначе создаёт её.
    /// </summary>
    /// <param name="entityModel">Модель сущности которую обновляем в таблице, или создаём её.</param>
    public void Update(TEntity entityModel)
    {
        SetEntities.Update(entityModel);
    }

    /// <summary>
    /// Удаляет модель сущности из таблицы
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