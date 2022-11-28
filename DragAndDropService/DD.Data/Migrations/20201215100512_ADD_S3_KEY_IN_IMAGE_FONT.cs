using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ADD_S3_KEY_IN_IMAGE_FONT : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Url",
                table: "Images",
                newName: "S3Key");

            migrationBuilder.RenameColumn(
                name: "DisplayName",
                table: "Font",
                newName: "S3Key");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "S3Key",
                table: "Images",
                newName: "Url");

            migrationBuilder.RenameColumn(
                name: "S3Key",
                table: "Font",
                newName: "DisplayName");
        }
    }
}
