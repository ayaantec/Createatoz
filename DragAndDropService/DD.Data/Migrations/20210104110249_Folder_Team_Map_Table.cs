using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class Folder_Team_Map_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FolderTeamShareMap",
                columns: table => new
                {
                    TeamId = table.Column<long>(nullable: false),
                    FolderId = table.Column<long>(nullable: false),
                    SharedPermission = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FolderTeamShareMap", x => new { x.FolderId, x.TeamId });
                    table.ForeignKey(
                        name: "FK_FolderTeamShareMap_Folder_FolderId",
                        column: x => x.FolderId,
                        principalTable: "Folder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FolderTeamShareMap_Team_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Team",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FolderTeamShareMap_TeamId",
                table: "FolderTeamShareMap",
                column: "TeamId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FolderTeamShareMap");
        }
    }
}
