using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class Design_SubCategoryId_Delete_Cascade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Design_SubCategory_SubCategoryId",
                table: "Design");

            migrationBuilder.AddForeignKey(
                name: "FK_Design_SubCategory_SubCategoryId",
                table: "Design",
                column: "SubCategoryId",
                principalTable: "SubCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Design_SubCategory_SubCategoryId",
                table: "Design");

            migrationBuilder.AddForeignKey(
                name: "FK_Design_SubCategory_SubCategoryId",
                table: "Design",
                column: "SubCategoryId",
                principalTable: "SubCategory",
                principalColumn: "Id");
        }
    }
}
