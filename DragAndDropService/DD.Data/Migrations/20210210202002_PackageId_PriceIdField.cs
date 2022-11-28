using Microsoft.EntityFrameworkCore.Migrations;

namespace DD.Data.Migrations
{
    public partial class PackageId_PriceIdField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EnterprisePriceId",
                table: "Packages",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EnterpriseStripeId",
                table: "Packages",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProPriceId",
                table: "Packages",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProStripeId",
                table: "Packages",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EnterprisePriceId",
                table: "Packages");

            migrationBuilder.DropColumn(
                name: "EnterpriseStripeId",
                table: "Packages");

            migrationBuilder.DropColumn(
                name: "ProPriceId",
                table: "Packages");

            migrationBuilder.DropColumn(
                name: "ProStripeId",
                table: "Packages");
        }
    }
}
