using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ADD_Team_User_Design : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DesignTeamShareMap",
                columns: table => new
                {
                    DesignId = table.Column<long>(nullable: false),
                    TeamId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DesignTeamShareMap", x => new { x.DesignId, x.TeamId });
                    table.ForeignKey(
                        name: "FK_DesignTeamShareMap_Designes_DesignId",
                        column: x => x.DesignId,
                        principalTable: "Designes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DesignTeamShareMap_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DesignUserShareMap",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    DesignId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DesignUserShareMap", x => new { x.DesignId, x.UserId });
                    table.ForeignKey(
                        name: "FK_DesignUserShareMap_Designes_DesignId",
                        column: x => x.DesignId,
                        principalTable: "Designes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DesignUserShareMap_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DesignTeamShareMap_TeamId",
                table: "DesignTeamShareMap",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_DesignUserShareMap_UserId",
                table: "DesignUserShareMap",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DesignTeamShareMap");

            migrationBuilder.DropTable(
                name: "DesignUserShareMap");
        }
    }
}
