import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCatalogInit1726152829762 implements MigrationInterface {
    name = 'ProductCatalogInit1726152829762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product_catalog\` (\`id\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, INDEX \`IDX_CUSTOM_INDEX\` (\`id\`, \`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_CUSTOM_INDEX\` ON \`product_catalog\``);
        await queryRunner.query(`DROP TABLE \`product_catalog\``);
    }

}
