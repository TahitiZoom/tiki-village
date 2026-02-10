import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    ALTER TABLE users 
    ADD COLUMN IF NOT EXISTS preferred_language VARCHAR(10) DEFAULT 'fr';
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(`
    ALTER TABLE users 
    DROP COLUMN IF EXISTS preferred_language;
  `)
}
