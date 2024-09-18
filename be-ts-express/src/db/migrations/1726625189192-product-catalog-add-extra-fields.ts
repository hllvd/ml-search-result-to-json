import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCatalogAddExtraFields1726625189192 implements MigrationInterface {
    name = 'ProductCatalogAddExtraFields1726625189192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`attributes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`brand\` varchar(255) NULL, \`model\` varchar(255) NULL, \`color\` varchar(255) NULL, \`modelDetailed\` varchar(255) NULL, \`productCatalogId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` ADD \`tagsGoodQualityThumbnail\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` ADD \`tagsGoodQualityPicture\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` ADD \`hasPromotion\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` ADD \`revenue\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` ADD \`quantitySold\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` ADD \`currentPrice\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` ADD \`dailyRevenue\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` ADD \`attributeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`attributes\` ADD CONSTRAINT \`FK_96815c720320e73973c7fcfbf4a\` FOREIGN KEY (\`productCatalogId\`) REFERENCES \`products_catalogs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` ADD CONSTRAINT \`FK_26d7d2e2d3f90cabf1ffb7e684f\` FOREIGN KEY (\`attributeId\`) REFERENCES \`attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` DROP FOREIGN KEY \`FK_26d7d2e2d3f90cabf1ffb7e684f\``);
        await queryRunner.query(`ALTER TABLE \`attributes\` DROP FOREIGN KEY \`FK_96815c720320e73973c7fcfbf4a\``);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` DROP COLUMN \`attributeId\``);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` DROP COLUMN \`dailyRevenue\``);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` DROP COLUMN \`currentPrice\``);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` DROP COLUMN \`quantitySold\``);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` DROP COLUMN \`revenue\``);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` DROP COLUMN \`hasPromotion\``);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` DROP COLUMN \`tagsGoodQualityPicture\``);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` DROP COLUMN \`tagsGoodQualityThumbnail\``);
        await queryRunner.query(`DROP TABLE \`attributes\``);
    }

}
