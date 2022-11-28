using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ADD_CUSTOM_HEIGHT_CUSTOM_WIDTH : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Designes_SubCategory_SubCategoryId",
                table: "Designes");

            migrationBuilder.AlterColumn<long>(
                name: "SubCategoryId",
                table: "Designes",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<long>(
                name: "CustomHeight",
                table: "Designes",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "CustomWidth",
                table: "Designes",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Designes_SubCategory_SubCategoryId",
                table: "Designes",
                column: "SubCategoryId",
                principalTable: "SubCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Designes_SubCategory_SubCategoryId",
                table: "Designes");

            migrationBuilder.DropColumn(
                name: "CustomHeight",
                table: "Designes");

            migrationBuilder.DropColumn(
                name: "CustomWidth",
                table: "Designes");

            migrationBuilder.AlterColumn<long>(
                name: "SubCategoryId",
                table: "Designes",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Designes_SubCategory_SubCategoryId",
                table: "Designes",
                column: "SubCategoryId",
                principalTable: "SubCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
