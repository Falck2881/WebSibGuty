
/// <summary>
/// DTO модели <see cref="FacultetModel"/>
/// </summary>
public class FacultetModelDto: EntityDto
{
    public override String Id {get; set;} = null!;

    public String FacultetName {get; set;} = null!;

    public String Dean {get; set;} = null!;

    public FacultetModelDto(){}
}