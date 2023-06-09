import { MigrationInterface, QueryRunner } from "typeorm";

export class ThemeTable1686238176655 implements MigrationInterface {
    name = 'ThemeTable1686238176655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "theme" ("id" character varying NOT NULL, "title" character varying, "scheme" jsonb NOT NULL, "templates" jsonb NOT NULL, "active" boolean DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_theme_id" PRIMARY KEY ("id"))`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "theme"`)
    }
}
