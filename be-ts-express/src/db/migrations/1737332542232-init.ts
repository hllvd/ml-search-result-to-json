import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1737332542232 implements MigrationInterface {
    name = 'Init1737332542232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`jobs\` ADD \`metadataCreateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`jobs\` DROP COLUMN \`metadataCreateAt\``);
    }

}
