using System.ComponentModel.DataAnnotations.Schema;

[Table("facultiesgroup")]
public class GroupModel
{
    [Column("id")]
    public String id {get; set;} = null!;

    [Column("iduser")]
    public String IdUser {get; set;} = null!;

    [Column("groupname")]
    public String GroupName {get; set;} = null!;

    [Column("idfaculties")]
    public String IdFacultet {get; set;} = null!;

    [Column("groupcreatedata")]
    public String GroupCreateData {get; set;} = null!;

    [Column("groupdeletedata")]
    public String GroupDeleteData {get; set;} = null!;

    [Column("typename")]
    public String TypeName {get; set;} = null!;
}