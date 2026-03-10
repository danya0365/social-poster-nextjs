import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
dotenv.config({ path: '.env.local' });

const isLocal = process.env.TURSO_CONNECTION_URL?.startsWith('file:');

export default defineConfig({
  schema: './src/infrastructure/database/schema.ts',
  out: './src/infrastructure/database/migrations',
  dialect: isLocal ? 'sqlite' : 'turso',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    ...(isLocal ? {} : { authToken: process.env.TURSO_AUTH_TOKEN }),
  },
  verbose: true,
  strict: true,
});
