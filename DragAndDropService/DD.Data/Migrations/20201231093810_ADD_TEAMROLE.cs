using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ADD_TEAMROLE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Teams",
                newName: "CreatedById");

            migrationBuilder.AddColumn<int>(
                name: "TeamRole",
                table: "TeamUserMap",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TeamRole",
                table: "TeamUserMap");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Teams",
                newName: "UserId");
        }
    }
}
