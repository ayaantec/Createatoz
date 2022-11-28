using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class Track_Purchase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Font_Folder_FolderId",
                table: "Font");

            migrationBuilder.AddColumn<long>(
                name: "FolderId",
                table: "Video",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasPurchased",
                table: "ImageUserShareMap",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<long>(
                name: "FolderId",
                table: "Font",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<long>(
                name: "FolderId",
                table: "Audio",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AudioUserMap",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    AudioId = table.Column<long>(nullable: false),
                    IsOwner = table.Column<bool>(nullable: false),
                    HasPurchased = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AudioUserMap", x => new { x.UserId, x.AudioId });
                    table.ForeignKey(
                        name: "FK_AudioUserMap_Audio_AudioId",
                        column: x => x.AudioId,
                        principalTable: "Audio",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AudioUserMap_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FontUserMap",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    FontId = table.Column<long>(nullable: false),
                    IsOwner = table.Column<bool>(nullable: false),
                    HasPurchased = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FontUserMap", x => new { x.UserId, x.FontId });
                    table.ForeignKey(
                        name: "FK_FontUserMap_Font_FontId",
                        column: x => x.FontId,
                        principalTable: "Font",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FontUserMap_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VideoUserMap",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    VideoId = table.Column<long>(nullable: false),
                    IsOwner = table.Column<bool>(nullable: false),
                    HasPurchased = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoUserMap", x => new { x.UserId, x.VideoId });
                    table.ForeignKey(
                        name: "FK_VideoUserMap_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VideoUserMap_Video_VideoId",
                        column: x => x.VideoId,
                        principalTable: "Video",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Video_FolderId",
                table: "Video",
                column: "FolderId");

            migrationBuilder.CreateIndex(
                name: "IX_Audio_FolderId",
                table: "Audio",
                column: "FolderId");

            migrationBuilder.CreateIndex(
                name: "IX_AudioUserMap_AudioId",
                table: "AudioUserMap",
                column: "AudioId");

            migrationBuilder.CreateIndex(
                name: "IX_FontUserMap_FontId",
                table: "FontUserMap",
                column: "FontId");

            migrationBuilder.CreateIndex(
                name: "IX_VideoUserMap_VideoId",
                table: "VideoUserMap",
                column: "VideoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Audio_Folder_FolderId",
                table: "Audio",
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
                name: "FK_Video_Folder_FolderId",
                table: "Video",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Audio_Folder_FolderId",
                table: "Audio");

            migrationBuilder.DropForeignKey(
                name: "FK_Font_Folder_FolderId",
                table: "Font");

            migrationBuilder.DropForeignKey(
                name: "FK_Video_Folder_FolderId",
                table: "Video");

            migrationBuilder.DropTable(
                name: "AudioUserMap");

            migrationBuilder.DropTable(
                name: "FontUserMap");

            migrationBuilder.DropTable(
                name: "VideoUserMap");

            migrationBuilder.DropIndex(
                name: "IX_Video_FolderId",
                table: "Video");

            migrationBuilder.DropIndex(
                name: "IX_Audio_FolderId",
                table: "Audio");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "Video");

            migrationBuilder.DropColumn(
                name: "HasPurchased",
                table: "ImageUserShareMap");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "Audio");

            migrationBuilder.AlterColumn<long>(
                name: "FolderId",
                table: "Font",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Font_Folder_FolderId",
                table: "Font",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
