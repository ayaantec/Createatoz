using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class Video_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "VideoId",
                table: "Price",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Video",
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
                    table.PrimaryKey("PK_Video", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VideoTagMap",
                columns: table => new
                {
                    VideoId = table.Column<long>(nullable: false),
                    TagId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoTagMap", x => new { x.TagId, x.VideoId });
                    table.ForeignKey(
                        name: "FK_VideoTagMap_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VideoTagMap_Video_VideoId",
                        column: x => x.VideoId,
                        principalTable: "Video",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Price_VideoId",
                table: "Price",
                column: "VideoId");

            migrationBuilder.CreateIndex(
                name: "IX_VideoTagMap_VideoId",
                table: "VideoTagMap",
                column: "VideoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Video_VideoId",
                table: "Price",
                column: "VideoId",
                principalTable: "Video",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Price_Video_VideoId",
                table: "Price");

            migrationBuilder.DropTable(
                name: "VideoTagMap");

            migrationBuilder.DropTable(
                name: "Video");

            migrationBuilder.DropIndex(
                name: "IX_Price_VideoId",
                table: "Price");

            migrationBuilder.DropColumn(
                name: "VideoId",
                table: "Price");
        }
    }
}
