using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class SET_RELATIONSHIP_WITH_PRICE_IMAGE_FONT : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "FontId",
                table: "Price",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ImageId",
                table: "Price",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<int>(
                name: "CostType",
                table: "Images",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CostType",
                table: "Font",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Price_FontId",
                table: "Price",
                column: "FontId");

            migrationBuilder.CreateIndex(
                name: "IX_Price_ImageId",
                table: "Price",
                column: "ImageId");

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

            migrationBuilder.DropIndex(
                name: "IX_Price_FontId",
                table: "Price");

            migrationBuilder.DropIndex(
                name: "IX_Price_ImageId",
                table: "Price");

            migrationBuilder.DropColumn(
                name: "FontId",
                table: "Price");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Price");

            migrationBuilder.DropColumn(
                name: "CostType",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "CostType",
                table: "Font");
        }
    }
}
