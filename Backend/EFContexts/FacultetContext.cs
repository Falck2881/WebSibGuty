namespace EFContextLib;

/// <summary>
/// Контекст Факультета, котоырй выводит тип сущности <see cref="FacultetModel"/> для работы с таблицей "faculties"
/// </summary>
public class FacultetContext: PostgressRepositoryContext<FacultetModel>, IFacultetContext
{

}