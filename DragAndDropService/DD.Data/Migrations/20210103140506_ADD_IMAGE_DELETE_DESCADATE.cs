using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ADD_IMAGE_DELETE_DESCADATE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Price_Image_ImageId",
                table: "Price");

            migrationBuilder.AddColumn<bool>(
                name: "IsRoot",
                table: "Folder",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Image_ImageId",
                table: "Price",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Price_Image_ImageId",
                table: "Price");

            migrationBuilder.DropColumn(
                name: "IsRoot",
                table: "Folder");

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Image_ImageId",
                table: "Price",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
