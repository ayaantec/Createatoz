using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ADD_FOLDER_USER_MAP_TABLE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Designes_Folder_FolderId",
                table: "Designes");

            migrationBuilder.DropForeignKey(
                name: "FK_Designes_SubCategory_SubCategoryId",
                table: "Designes");

            migrationBuilder.DropForeignKey(
                name: "FK_DesignTeamShareMap_Designes_DesignId",
                table: "DesignTeamShareMap");

            migrationBuilder.DropForeignKey(
                name: "FK_DesignTeamShareMap_Teams_TeamId",
                table: "DesignTeamShareMap");

            migrationBuilder.DropForeignKey(
                name: "FK_DesignUserShareMap_Designes_DesignId",
                table: "DesignUserShareMap");

            migrationBuilder.DropForeignKey(
                name: "FK_Folder_AspNetUsers_UserId",
                table: "Folder");

            migrationBuilder.DropForeignKey(
                name: "FK_Font_Folder_FolderId",
                table: "Font");

            migrationBuilder.DropForeignKey(
                name: "FK_Font_AspNetUsers_UserId",
                table: "Font");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Folder_FolderId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_AspNetUsers_UserId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_ImageTagMap_Images_ImageId",
                table: "ImageTagMap");

            migrationBuilder.DropForeignKey(
                name: "FK_Price_Font_FontId",
                table: "Price");

            migrationBuilder.DropForeignKey(
                name: "FK_Price_Images_ImageId",
                table: "Price");

            migrationBuilder.DropForeignKey(
                name: "FK_TeamUserMap_Teams_TeamId",
                table: "TeamUserMap");

            migrationBuilder.DropIndex(
                name: "IX_Font_UserId",
                table: "Font");

            migrationBuilder.DropIndex(
                name: "IX_Folder_UserId",
                table: "Folder");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Teams",
                table: "Teams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Images",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_UserId",
                table: "Images");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Designes",
                table: "Designes");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Font");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Folder");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Designes");

            migrationBuilder.RenameTable(
                name: "Teams",
                newName: "Team");

            migrationBuilder.RenameTable(
                name: "Images",
                newName: "Image");

            migrationBuilder.RenameTable(
                name: "Designes",
                newName: "Design");

            migrationBuilder.RenameIndex(
                name: "IX_Images_FolderId",
                table: "Image",
                newName: "IX_Image_FolderId");

            migrationBuilder.RenameIndex(
                name: "IX_Designes_SubCategoryId",
                table: "Design",
                newName: "IX_Design_SubCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Designes_FolderId",
                table: "Design",
                newName: "IX_Design_FolderId");

            migrationBuilder.AlterColumn<string>(
                name: "S3Key",
                table: "Font",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PreviewImageS3Key",
                table: "Font",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Font",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "FolderId",
                table: "Font",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Font",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AddColumn<long>(
                name: "FolderId",
                table: "Folder",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsOwner",
                table: "DesignUserShareMap",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Team",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Team",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AlterColumn<string>(
                name: "S3Key",
                table: "Image",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Image",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Image",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Design",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "FolderId",
                table: "Design",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Design",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AlterColumn<string>(
                name: "Config",
                table: "Design",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Team",
                table: "Team",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Image",
                table: "Image",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Design",
                table: "Design",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "FolderUserShareMap",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    FolderId = table.Column<long>(nullable: false),
                    IsOwner = table.Column<bool>(nullable: false),
                    SharedPermission = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FolderUserShareMap", x => new { x.FolderId, x.UserId });
                    table.ForeignKey(
                        name: "FK_FolderUserShareMap_Folder_FolderId",
                        column: x => x.FolderId,
                        principalTable: "Folder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FolderUserShareMap_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Folder_FolderId",
                table: "Folder",
                column: "FolderId");

            migrationBuilder.CreateIndex(
                name: "IX_FolderUserShareMap_UserId",
                table: "FolderUserShareMap",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Design_Folder_FolderId",
                table: "Design",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Design_SubCategory_SubCategoryId",
                table: "Design",
                column: "SubCategoryId",
                principalTable: "SubCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DesignTeamShareMap_Design_DesignId",
                table: "DesignTeamShareMap",
                column: "DesignId",
                principalTable: "Design",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DesignTeamShareMap_Team_TeamId",
                table: "DesignTeamShareMap",
                column: "TeamId",
                principalTable: "Team",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DesignUserShareMap_Design_DesignId",
                table: "DesignUserShareMap",
                column: "DesignId",
                principalTable: "Design",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Folder_Folder_FolderId",
                table: "Folder",
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
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Image_Folder_FolderId",
                table: "Image",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ImageTagMap_Image_ImageId",
                table: "ImageTagMap",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Font_FontId",
                table: "Price",
                column: "FontId",
                principalTable: "Font",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Image_ImageId",
                table: "Price",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TeamUserMap_Team_TeamId",
                table: "TeamUserMap",
                column: "TeamId",
                principalTable: "Team",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Design_Folder_FolderId",
                table: "Design");

            migrationBuilder.DropForeignKey(
                name: "FK_Design_SubCategory_SubCategoryId",
                table: "Design");

            migrationBuilder.DropForeignKey(
                name: "FK_DesignTeamShareMap_Design_DesignId",
                table: "DesignTeamShareMap");

            migrationBuilder.DropForeignKey(
                name: "FK_DesignTeamShareMap_Team_TeamId",
                table: "DesignTeamShareMap");

            migrationBuilder.DropForeignKey(
                name: "FK_DesignUserShareMap_Design_DesignId",
                table: "DesignUserShareMap");

            migrationBuilder.DropForeignKey(
                name: "FK_Folder_Folder_FolderId",
                table: "Folder");

            migrationBuilder.DropForeignKey(
                name: "FK_Font_Folder_FolderId",
                table: "Font");

            migrationBuilder.DropForeignKey(
                name: "FK_Image_Folder_FolderId",
                table: "Image");

            migrationBuilder.DropForeignKey(
                name: "FK_ImageTagMap_Image_ImageId",
                table: "ImageTagMap");

            migrationBuilder.DropForeignKey(
                name: "FK_Price_Font_FontId",
                table: "Price");

            migrationBuilder.DropForeignKey(
                name: "FK_Price_Image_ImageId",
                table: "Price");

            migrationBuilder.DropForeignKey(
                name: "FK_TeamUserMap_Team_TeamId",
                table: "TeamUserMap");

            migrationBuilder.DropTable(
                name: "FolderUserShareMap");

            migrationBuilder.DropIndex(
                name: "IX_Folder_FolderId",
                table: "Folder");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Team",
                table: "Team");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Image",
                table: "Image");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Design",
                table: "Design");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "Folder");

            migrationBuilder.DropColumn(
                name: "IsOwner",
                table: "DesignUserShareMap");

            migrationBuilder.RenameTable(
                name: "Team",
                newName: "Teams");

            migrationBuilder.RenameTable(
                name: "Image",
                newName: "Images");

            migrationBuilder.RenameTable(
                name: "Design",
                newName: "Designes");

            migrationBuilder.RenameIndex(
                name: "IX_Image_FolderId",
                table: "Images",
                newName: "IX_Images_FolderId");

            migrationBuilder.RenameIndex(
                name: "IX_Design_SubCategoryId",
                table: "Designes",
                newName: "IX_Designes_SubCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Design_FolderId",
                table: "Designes",
                newName: "IX_Designes_FolderId");

            migrationBuilder.AlterColumn<string>(
                name: "S3Key",
                table: "Font",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PreviewImageS3Key",
                table: "Font",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Font",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "FolderId",
                table: "Font",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Font",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Font",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Folder",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Teams",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Teams",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<string>(
                name: "S3Key",
                table: "Images",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Images",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Images",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Images",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Designes",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "FolderId",
                table: "Designes",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCreated",
                table: "Designes",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<string>(
                name: "Config",
                table: "Designes",
                type: "varchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Designes",
                type: "varchar(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Teams",
                table: "Teams",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Images",
                table: "Images",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Designes",
                table: "Designes",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Font_UserId",
                table: "Font",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Folder_UserId",
                table: "Folder",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Images_UserId",
                table: "Images",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Designes_Folder_FolderId",
                table: "Designes",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Designes_SubCategory_SubCategoryId",
                table: "Designes",
                column: "SubCategoryId",
                principalTable: "SubCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DesignTeamShareMap_Designes_DesignId",
                table: "DesignTeamShareMap",
                column: "DesignId",
                principalTable: "Designes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DesignTeamShareMap_Teams_TeamId",
                table: "DesignTeamShareMap",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DesignUserShareMap_Designes_DesignId",
                table: "DesignUserShareMap",
                column: "DesignId",
                principalTable: "Designes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Folder_AspNetUsers_UserId",
                table: "Folder",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Font_Folder_FolderId",
                table: "Font",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Font_AspNetUsers_UserId",
                table: "Font",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Folder_FolderId",
                table: "Images",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_AspNetUsers_UserId",
                table: "Images",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ImageTagMap_Images_ImageId",
                table: "ImageTagMap",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Font_FontId",
                table: "Price",
                column: "FontId",
                principalTable: "Font",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Images_ImageId",
                table: "Price",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TeamUserMap_Teams_TeamId",
                table: "TeamUserMap",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
