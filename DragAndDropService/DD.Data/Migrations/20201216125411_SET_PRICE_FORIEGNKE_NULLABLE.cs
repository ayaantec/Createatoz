using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class SET_PRICE_FORIEGNKE_NULLABLE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Price_Font_FontId",
                table: "Price");

            migrationBuilder.DropForeignKey(
                name: "FK_Price_Images_ImageId",
                table: "Price");

            migrationBuilder.DropForeignKey(
                name: "FK_Price_Templates_TemplateId",
                table: "Price");

            migrationBuilder.AlterColumn<long>(
                name: "TemplateId",
                table: "Price",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<long>(
                name: "ImageId",
                table: "Price",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<long>(
                name: "FontId",
                table: "Price",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Templates_TemplateId",
                table: "Price",
                column: "TemplateId",
                principalTable: "Templates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Price_Font_FontId",
                table: "Price");

            migrationBuilder.DropForeignKey(
                name: "FK_Price_Images_ImageId",
                table: "Price");

            migrationBuilder.DropForeignKey(
                name: "FK_Price_Templates_TemplateId",
                table: "Price");

            migrationBuilder.AlterColumn<long>(
                name: "TemplateId",
                table: "Price",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "ImageId",
                table: "Price",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "FontId",
                table: "Price",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Templates_TemplateId",
                table: "Price",
                column: "TemplateId",
                principalTable: "Templates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
