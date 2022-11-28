using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ElementUserMapTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "FolderId",
                table: "Element",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ElementUserMap",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    ElementId = table.Column<long>(nullable: false),
                    IsOwner = table.Column<bool>(nullable: false),
                    HasPurchased = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElementUserMap", x => new { x.UserId, x.ElementId });
                    table.ForeignKey(
                        name: "FK_ElementUserMap_Element_ElementId",
                        column: x => x.ElementId,
                        principalTable: "Element",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ElementUserMap_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Element_FolderId",
                table: "Element",
                column: "FolderId");

            migrationBuilder.CreateIndex(
                name: "IX_ElementUserMap_ElementId",
                table: "ElementUserMap",
                column: "ElementId");

            migrationBuilder.AddForeignKey(
                name: "FK_Element_Folder_FolderId",
                table: "Element",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Element_Folder_FolderId",
                table: "Element");

            migrationBuilder.DropTable(
                name: "ElementUserMap");

            migrationBuilder.DropIndex(
                name: "IX_Element_FolderId",
                table: "Element");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "Element");
        }
    }
}
