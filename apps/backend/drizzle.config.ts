import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

console.log(process.env.POSTGRES_URL);

export default defineConfig({
  schema: './drizzle/schema/**.schema.ts',
  out: './drizzle/out',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
});
