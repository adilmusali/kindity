import { execSync } from 'child_process';
import path from 'path';

async function globalSetup() {
  const backDir = path.resolve(__dirname, '../back');
  const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/kindity_test';
  console.log(`Seeding database at ${dbUrl}...`);
  execSync('npx ts-node ./scripts/seed.ts', {
    cwd: backDir,
    env: {
      ...process.env,
      DB_URL: dbUrl,
      JWT_SECRET: process.env.JWT_SECRET || 'test-jwt-secret-kindity-qa',
    },
    stdio: 'inherit',
  });
}

export default globalSetup;
