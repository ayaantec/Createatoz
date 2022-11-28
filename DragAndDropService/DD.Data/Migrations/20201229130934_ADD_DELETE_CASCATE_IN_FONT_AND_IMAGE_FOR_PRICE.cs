using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ADD_DELETE_CASCATE_IN_FONT_AND_IMAGE_FOR_PRICE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Price_Font_FontId",
                table: "Price");

            migrationBuilder.DropForeignKey(
                name: "FK_Price_Images_ImageId",
                table: "Price");

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Font_FontId",
                table: "Price",
                column: "FontId",
                principalTable: "Font",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Images_ImageId",
                table: "Price",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Price_Font_FontId",
                table: "Price");

            migrationBuilder.DropForeignKey(
                name: "FK_Price_Images_ImageId",
                table: "Price");

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Font_FontId",
                table: "Price",
                column: "FontId",
                principalTable: "Font",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Images_ImageId",
                table: "Price",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
