using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class ADD_COVERPHOTO_S3KEY_AND_THUMBNAIL_S3KEY_REMOVE_SIZE_LIMIT_OF_DESIGN_CONFIG : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ThumbNailS3Key",
                table: "SubCategory",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Config",
                table: "Designes",
                type: "varchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(1000)",
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CoverPhotoS3Key",
                table: "Categories",
                type: "varchar(500)",
                maxLength: 500,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ThumbNailS3Key",
                table: "SubCategory");

            migrationBuilder.DropColumn(
                name: "CoverPhotoS3Key",
                table: "Categories");

            migrationBuilder.AlterColumn<string>(
                name: "Config",
                table: "Designes",
                type: "varchar(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(max)",
                oldNullable: true);
        }
    }
}
