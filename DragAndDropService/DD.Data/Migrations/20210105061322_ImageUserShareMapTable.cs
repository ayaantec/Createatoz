using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ImageUserShareMapTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "FolderId",
                table: "Image",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ImageUserShareMap",
                columns: table => new
                {
                    ImageId = table.Column<long>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    FolderId = table.Column<long>(nullable: false),
                    IsOwner = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageUserShareMap", x => new { x.UserId, x.ImageId });
                    table.ForeignKey(
                        name: "FK_ImageUserShareMap_Folder_FolderId",
                        column: x => x.FolderId,
                        principalTable: "Folder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ImageUserShareMap_Image_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Image",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ImageUserShareMap_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Image_FolderId",
                table: "Image",
                column: "FolderId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageUserShareMap_FolderId",
                table: "ImageUserShareMap",
                column: "FolderId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageUserShareMap_ImageId",
                table: "ImageUserShareMap",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Image_Folder_FolderId",
                table: "Image",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Image_Folder_FolderId",
                table: "Image");

            migrationBuilder.DropTable(
                name: "ImageUserShareMap");

            migrationBuilder.DropIndex(
                name: "IX_Image_FolderId",
                table: "Image");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "Image");
        }
    }
}
