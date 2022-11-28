using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ADD_RELATIONS_WITH_FOLDER_DESIGN_IMAGE_FONT : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "FolderId",
                table: "Images",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "FolderId",
                table: "Font",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "FolderId",
                table: "Designes",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Images_FolderId",
                table: "Images",
                column: "FolderId");

            migrationBuilder.CreateIndex(
                name: "IX_Font_FolderId",
                table: "Font",
                column: "FolderId");

            migrationBuilder.CreateIndex(
                name: "IX_Designes_FolderId",
                table: "Designes",
                column: "FolderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Designes_Folder_FolderId",
                table: "Designes",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Font_Folder_FolderId",
                table: "Font",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Folder_FolderId",
                table: "Images",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Designes_Folder_FolderId",
                table: "Designes");

            migrationBuilder.DropForeignKey(
                name: "FK_Font_Folder_FolderId",
                table: "Font");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Folder_FolderId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_FolderId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Font_FolderId",
                table: "Font");

            migrationBuilder.DropIndex(
                name: "IX_Designes_FolderId",
                table: "Designes");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "Font");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "Designes");
        }
    }
}
