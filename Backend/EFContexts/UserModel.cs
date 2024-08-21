using System.ComponentModel.DataAnnotations.Schema;

[Table("users")]
public class UserModel
{
    [Column("id")]
    public String id {get; set;}

    [Column("login")]
    public String Login {get; set;} = null!;

    [Column("gender")]
    public String Gender {get; set;} = null!;

    [Column("cashsize")]
    public String CashSize {get; set;} = null!;

    [Column("lastname")]
    public String LastName {get; set;} = null!;

    [Column("military")]
    public String Military {get; set;} = null!;

    [Column("password")]
    public String Password {get; set;} = null!;

    [Column("databirth")]
    public String DataBirth {get; set;} = null!;

    [Column("firstname")]
    public String FirstName {get; set;} = null!;

    [Column("idgroup")]
    public String IdGroup {get; set;} = null!;

    [Column("phonenumber")]
    public String PhoneNumber {get; set;} = null!;

    [Column("subjectname")]
    public String SubjectName {get; set;} = null!;

    [Column("avarangescore")]
    public Int32 AvarangeScore {get; set;}

    [Column("typename")]
    public String TypeName {get; set;} = null!;
}
