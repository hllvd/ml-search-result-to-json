import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCatalogInit1726426513288 implements MigrationInterface {
    name = 'ProductCatalogInit1726426513288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`seller\` (\`id\` int NOT NULL, \`nickname\` varchar(255) NULL, \`sellerAddressStateId\` varchar(5) NULL, \`userType\` varchar(32) NULL, \`permalink\` varchar(255) NULL, \`sellerReputationLevelId\` varchar(20) NULL, \`sellerReputationPowerSellerStatus\` varchar(20) NULL, \`sellerReputationTransactionsTotal\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products_catalogs\` (\`id\` varchar(255) NOT NULL, \`type\` tinyint NOT NULL, \`title\` varchar(255) NULL, \`categoryId\` varchar(255) NULL, \`officialStoreId\` varchar(16) NULL, \`price\` float NULL, \`basePrice\` float NULL, \`originalPrice\` float NULL, \`listingTypeId\` varchar(32) NULL, \`permalink\` varchar(255) NULL, \`videoId\` varchar(255) NULL, \`ean\` varchar(100) NULL, \`thumbnail\` varchar(255) NULL, \`health\` int NULL, \`shippingFreeShipping\` tinyint NULL, \`shippingLogisticType\` varchar(20) NULL, \`catalogProductId\` varchar(15) NULL, \`catalogListing\` tinyint NULL, \`dateCreated\` varchar(27) NULL, \`sellerId\` int NULL, INDEX \`IDX_CUSTOM_INDEX\` (\`id\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` ADD CONSTRAINT \`FK_0a175881ef7af4c395ec01a3b66\` FOREIGN KEY (\`sellerId\`) REFERENCES \`seller\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products_catalogs\` DROP FOREIGN KEY \`FK_0a175881ef7af4c395ec01a3b66\``);
        await queryRunner.query(`DROP INDEX \`IDX_CUSTOM_INDEX\` ON \`products_catalogs\``);
        await queryRunner.query(`DROP TABLE \`products_catalogs\``);
        await queryRunner.query(`DROP TABLE \`seller\``);
    }

}
