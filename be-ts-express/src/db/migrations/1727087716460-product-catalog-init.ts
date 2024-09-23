import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCatalogInit1727087716460 implements MigrationInterface {
    name = 'ProductCatalogInit1727087716460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`catalog_fields\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`catalog_fields\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`catalog_fields\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`catalog_fields\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`catalog_fields\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`catalog_fields\` ADD PRIMARY KEY (\`id\`)`);
    }

}
