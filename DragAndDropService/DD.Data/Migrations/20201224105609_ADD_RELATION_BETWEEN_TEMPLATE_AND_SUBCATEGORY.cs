using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ADD_RELATION_BETWEEN_TEMPLATE_AND_SUBCATEGORY : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Price_Templates_TemplateId",
                table: "Price");

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Templates_TemplateId",
                table: "Price",
                column: "TemplateId",
                principalTable: "Templates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Price_Templates_TemplateId",
                table: "Price");

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Templates_TemplateId",
                table: "Price",
                column: "TemplateId",
                principalTable: "Templates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
