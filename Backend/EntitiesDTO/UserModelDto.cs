
/// <summary>
/// DTO модели <see cref="UserModel"/>
/// </summary>
public sealed class UserModelDto: EntityDto
{
    public override String Id { get; set;} = null!;

    public String FirstName { get; set; } = null!;

    public String LastName { get; set; } = null!;

    public String Gender { get; set; } = null!;

    public String DataBirth { get; set; } = null!;

    public String PhoneNumber { get; set; } = null!;

    public String CashSize { get; set; } = null!;

    public String Military { get; set; } = null!;
}
