using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class Image_Folder_RelationUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImageUserShareMap_Folder_FolderId",
                table: "ImageUserShareMap");

            migrationBuilder.DropIndex(
                name: "IX_ImageUserShareMap_FolderId",
                table: "ImageUserShareMap");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "ImageUserShareMap");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "FolderId",
                table: "ImageUserShareMap",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_ImageUserShareMap_FolderId",
                table: "ImageUserShareMap",
                column: "FolderId");

            migrationBuilder.AddForeignKey(
                name: "FK_ImageUserShareMap_Folder_FolderId",
                table: "ImageUserShareMap",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
