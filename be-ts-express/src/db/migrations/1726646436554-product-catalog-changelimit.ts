import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCatalogChangelimit1726646436554 implements MigrationInterface {
    name = 'ProductCatalogChangelimit1726646436554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` DROP COLUMN \`ean\``);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` ADD \`ean\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` DROP COLUMN \`ean\``);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` ADD \`ean\` varchar(100) NULL`);
    }

}
