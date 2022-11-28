using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class REVERT_FOREIGN_KEY_CONSTRAINT : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Price_Font_FontId",
                table: "Price");

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Font_FontId",
                table: "Price",
                column: "FontId",
                principalTable: "Font",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Price_Font_FontId",
                table: "Price");

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Font_FontId",
                table: "Price",
                column: "FontId",
                principalTable: "Font",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
