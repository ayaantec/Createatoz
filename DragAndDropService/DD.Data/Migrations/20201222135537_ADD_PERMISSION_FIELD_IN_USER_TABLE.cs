using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ADD_PERMISSION_FIELD_IN_USER_TABLE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Permissions",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Permissions",
                table: "AspNetUsers");
        }
    }
}
