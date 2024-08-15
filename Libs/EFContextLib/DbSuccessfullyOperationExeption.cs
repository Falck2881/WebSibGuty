
/// <summary>
/// Исключение отражает что все хорошо. 
/// </summary>
public class DbSuccessfullyOperationExeption: Exception
{
    public DbSuccessfullyOperationExeption(string message): base(message) { }
}