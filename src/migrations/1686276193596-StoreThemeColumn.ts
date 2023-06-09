import { MigrationInterface, QueryRunner } from "typeorm"

export class StoreThemeColumn1686276193596 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE \"store\"" +
            " ADD COLUMN \"theme_id\" character varying"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE \"store\" DROP COLUMN \"theme_id\""
        )
    }

}
