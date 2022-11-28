using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ADD_DESIGN_TABLE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Designes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "datetime", nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<long>(nullable: false),
                    Config = table.Column<string>(type: "varchar(1000)", maxLength: 1000, nullable: true),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    SubCategoryId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Designes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Designes_SubCategory_SubCategoryId",
                        column: x => x.SubCategoryId,
                        principalTable: "SubCategory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Templates_SubCategoryId",
                table: "Templates",
                column: "SubCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Designes_SubCategoryId",
                table: "Designes",
                column: "SubCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Templates_SubCategory_SubCategoryId",
                table: "Templates",
                column: "SubCategoryId",
                principalTable: "SubCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Templates_SubCategory_SubCategoryId",
                table: "Templates");

            migrationBuilder.DropTable(
                name: "Designes");

            migrationBuilder.DropIndex(
                name: "IX_Templates_SubCategoryId",
                table: "Templates");
        }
    }
}
