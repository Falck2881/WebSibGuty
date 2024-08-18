using System.ComponentModel.DataAnnotations.Schema;

[Table("faculties")]
public class FacultetModel
{
    [Column("id")]
    public String Id {get; set;}

    [Column("facultetname")]
    public String FacultetName {get; set;}

    [Column("idgroup")]
    public String IdGroup {get; set;}

    [Column("dean")]
    public String Dean {get; set;}
}