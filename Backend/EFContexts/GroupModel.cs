using System.ComponentModel.DataAnnotations.Schema;

[Table("facultiesgroup")]
public class GroupModel
{
    [Column("id")]
    public String id {get; set;}

    [Column("iduser")]
    public String IdUser {get; set;}

    [Column("groupname")]
    public String GroupName {get; set;}

    [Column("idfaculties")]
    public String IdFacultet {get; set;}

    [Column("groupcreatedata")]
    public String GroupCreateData {get; set;}

    [Column("groupdeletedata")]
    public String GroupDeleteData {get; set;}
}