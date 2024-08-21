using System.ComponentModel.DataAnnotations.Schema;

[Table("faculties")]
public class FacultetModel
{
    [Column("id")]
    public String Id {get; set;} = null!;

    [Column("facultetname")]
    public String FacultetName {get; set;} = null!;

    [Column("idgroup")]
    public String IdGroup {get; set;} = null!;

    [Column("dean")]
    public String Dean {get; set;} = null!;

    [Column("typename")]
    public String TypeName {get; set;} = null!;
}