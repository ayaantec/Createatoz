using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class Audio_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "AudioId",
                table: "Price",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Audio",
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
                    table.PrimaryKey("PK_Audio", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AudioTagMap",
                columns: table => new
                {
                    AudioId = table.Column<long>(nullable: false),
                    TagId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AudioTagMap", x => new { x.TagId, x.AudioId });
                    table.ForeignKey(
                        name: "FK_AudioTagMap_Audio_AudioId",
                        column: x => x.AudioId,
                        principalTable: "Audio",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AudioTagMap_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Price_AudioId",
                table: "Price",
                column: "AudioId");

            migrationBuilder.CreateIndex(
                name: "IX_AudioTagMap_AudioId",
                table: "AudioTagMap",
                column: "AudioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Audio_AudioId",
                table: "Price",
                column: "AudioId",
                principalTable: "Audio",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Price_Audio_AudioId",
                table: "Price");

            migrationBuilder.DropTable(
                name: "AudioTagMap");

            migrationBuilder.DropTable(
                name: "Audio");

            migrationBuilder.DropIndex(
                name: "IX_Price_AudioId",
                table: "Price");

            migrationBuilder.DropColumn(
                name: "AudioId",
                table: "Price");
        }
    }
}
