using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class Add_Element_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ElementId",
                table: "Price",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Element",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false),
                    S3Key = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    CostType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Element", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ElementTagMap",
                columns: table => new
                {
                    ElementId = table.Column<long>(nullable: false),
                    TagId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElementTagMap", x => new { x.TagId, x.ElementId });
                    table.ForeignKey(
                        name: "FK_ElementTagMap_Element_ElementId",
                        column: x => x.ElementId,
                        principalTable: "Element",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ElementTagMap_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Price_ElementId",
                table: "Price",
                column: "ElementId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementTagMap_ElementId",
                table: "ElementTagMap",
                column: "ElementId");

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Element_ElementId",
                table: "Price",
                column: "ElementId",
                principalTable: "Element",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Price_Element_ElementId",
                table: "Price");

            migrationBuilder.DropTable(
                name: "ElementTagMap");

            migrationBuilder.DropTable(
                name: "Element");

            migrationBuilder.DropIndex(
                name: "IX_Price_ElementId",
                table: "Price");

            migrationBuilder.DropColumn(
                name: "ElementId",
                table: "Price");
        }
    }
}
