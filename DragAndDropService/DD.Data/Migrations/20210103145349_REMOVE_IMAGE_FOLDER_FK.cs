using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class REMOVE_IMAGE_FOLDER_FK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Image_Folder_FolderId",
                table: "Image");

            migrationBuilder.DropIndex(
                name: "IX_Image_FolderId",
                table: "Image");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "Image");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "FolderId",
                table: "Image",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Image_FolderId",
                table: "Image",
                column: "FolderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Image_Folder_FolderId",
                table: "Image",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
