import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class EnablePageLayoutFeatureFlag1750000000000 implements MigrationInterface {
  name = 'EnablePageLayoutFeatureFlag1750000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable IS_PAGE_LAYOUT_ENABLED feature flag for all existing workspaces
    await queryRunner.query(`
      INSERT INTO "core"."featureFlag" (
        id,
        key,
        "workspaceId", 
        value,
        "createdAt",
        "updatedAt"
      )
      SELECT 
        uuid_generate_v4() as id,
        'IS_PAGE_LAYOUT_ENABLED' as key,
        w.id as "workspaceId",
        true as value,
        NOW() as "createdAt",
        NOW() as "updatedAt"
      FROM "core"."workspace" w
      WHERE NOT EXISTS (
        SELECT 1 FROM "core"."featureFlag" ff 
        WHERE ff."workspaceId" = w.id 
        AND ff.key = 'IS_PAGE_LAYOUT_ENABLED'
      )
    `);

    // Update any existing disabled flags to enabled
    await queryRunner.query(`
      UPDATE "core"."featureFlag" 
      SET 
        value = true,
        "updatedAt" = NOW()
      WHERE 
        key = 'IS_PAGE_LAYOUT_ENABLED' 
        AND value = false
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // In rollback, we disable the feature flag but don't delete it
    // This is safer than deletion as it preserves the record
    await queryRunner.query(`
      UPDATE "core"."featureFlag" 
      SET 
        value = false,
        "updatedAt" = NOW()
      WHERE key = 'IS_PAGE_LAYOUT_ENABLED'
    `);
  }
}
