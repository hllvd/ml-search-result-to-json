import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCatalogInit1726669972412 implements MigrationInterface {
    name = 'ProductCatalogInit1726669972412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`seller\` (\`id\` int NOT NULL, \`nickname\` varchar(255) NULL, \`sellerAddressStateId\` varchar(5) NULL, \`userType\` varchar(32) NULL, \`permalink\` varchar(255) NULL, \`sellerReputationLevelId\` varchar(20) NULL, \`sellerReputationPowerSellerStatus\` varchar(20) NULL, \`sellerReputationTransactionsTotal\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products_catalogs\` (\`id\` varchar(255) NOT NULL, \`type\` tinyint NOT NULL, \`title\` varchar(255) NULL, \`categoryId\` varchar(255) NULL, \`officialStoreId\` varchar(16) NULL, \`price\` float NULL, \`basePrice\` float NULL, \`originalPrice\` float NULL, \`listingTypeId\` varchar(32) NULL, \`permalink\` varchar(255) NULL, \`videoId\` varchar(255) NULL, \`ean\` varchar(255) NULL, \`thumbnail\` varchar(255) NULL, \`pictureCount\` int NULL, \`health\` int NULL, \`shippingFreeShipping\` tinyint NULL, \`shippingLogisticType\` varchar(20) NULL, \`catalogProductId\` varchar(15) NULL, \`catalogListing\` tinyint NULL, \`dateCreated\` varchar(27) NULL, \`tagsGoodQualityThumbnail\` tinyint NULL, \`tagsGoodQualityPicture\` tinyint NULL, \`hasPromotion\` tinyint NULL, \`hasVideo\` tinyint NULL, \`revenue\` int NULL, \`quantitySold\` int NULL, \`currentPrice\` float NULL, \`dailyRevenue\` float NULL, \`sellerId\` int NULL, \`attributeId\` int NULL, INDEX \`IDX_CUSTOM_INDEX\` (\`id\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`attributes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`brand\` varchar(255) NULL, \`model\` varchar(255) NULL, \`color\` varchar(255) NULL, \`modelDetailed\` varchar(255) NULL, \`productCatalogId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` ADD CONSTRAINT \`FK_0a175881ef7af4c395ec01a3b66\` FOREIGN KEY (\`sellerId\`) REFERENCES \`seller\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` ADD CONSTRAINT \`FK_26d7d2e2d3f90cabf1ffb7e684f\` FOREIGN KEY (\`attributeId\`) REFERENCES \`attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`attributes\` ADD CONSTRAINT \`FK_96815c720320e73973c7fcfbf4a\` FOREIGN KEY (\`productCatalogId\`) REFERENCES \`products_catalogs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attributes\` DROP FOREIGN KEY \`FK_96815c720320e73973c7fcfbf4a\``);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` DROP FOREIGN KEY \`FK_26d7d2e2d3f90cabf1ffb7e684f\``);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` DROP FOREIGN KEY \`FK_0a175881ef7af4c395ec01a3b66\``);
        await queryRunner.query(`DROP TABLE \`attributes\``);
        await queryRunner.query(`DROP INDEX \`IDX_CUSTOM_INDEX\` ON \`products_catalogs\``);
        await queryRunner.query(`DROP TABLE \`products_catalogs\``);
        await queryRunner.query(`DROP TABLE \`seller\``);
    }

}
