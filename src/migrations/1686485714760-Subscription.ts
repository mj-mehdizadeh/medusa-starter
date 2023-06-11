import { MigrationInterface, QueryRunner } from "typeorm"

export class Subscription1686485714760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "subscription" (
                      "id" varchar COLLATE "pg_catalog"."default" NOT NULL,
                      "customer_id" varchar COLLATE "pg_catalog"."default" NOT NULL,
                      "variant_id" varchar COLLATE "pg_catalog"."default",
                      "status" varchar COLLATE "pg_catalog"."default",
                      "trialing" bool,
                      "next_billing_date" timestamptz(6) NOT NULL,
                      "created_at" timestamptz(6) DEFAULT now(),
                      "updated_at" timestamptz(6) DEFAULT now()
                    )`
        )

        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")`)
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "subscription_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "subscription_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "product_variant" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)

        await queryRunner.query(`ALTER TABLE "order" ADD COLUMN "subscription_id" character varying`)
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "order_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscription" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "order_subscription_id_fkey"`)
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "subscription_id"`)

        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "subscription_customer_id_fkey"`)
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "subscription_variant_id_fkey"`)
        await queryRunner.query(`DROP INDEX "subscription_pkey"`)
        await queryRunner.query(`DROP TABLE "subscription"`)
    }
}
