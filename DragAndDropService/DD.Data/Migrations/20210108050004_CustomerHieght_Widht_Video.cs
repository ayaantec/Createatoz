using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class CustomerHieght_Widht_Video : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustomHeight",
                table: "Video",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CustomWeight",
                table: "Video",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomHeight",
                table: "Video");

            migrationBuilder.DropColumn(
                name: "CustomWeight",
                table: "Video");
        }
    }
}
