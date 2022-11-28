using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ADD_FOLDER_DELETE_RESTRICT : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Folder_Folder_FolderId",
                table: "Folder");

            migrationBuilder.DropIndex(
                name: "IX_Folder_FolderId",
                table: "Folder");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "Folder");

            migrationBuilder.AddColumn<long>(
                name: "ParentFolderId",
                table: "Folder",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Folder_ParentFolderId",
                table: "Folder",
                column: "ParentFolderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Folder_Folder_ParentFolderId",
                table: "Folder",
                column: "ParentFolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Folder_Folder_ParentFolderId",
                table: "Folder");

            migrationBuilder.DropIndex(
                name: "IX_Folder_ParentFolderId",
                table: "Folder");

            migrationBuilder.DropColumn(
                name: "ParentFolderId",
                table: "Folder");

            migrationBuilder.AddColumn<long>(
                name: "FolderId",
                table: "Folder",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Folder_FolderId",
                table: "Folder",
                column: "FolderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Folder_Folder_FolderId",
                table: "Folder",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
