import { test, expect } from '@playwright/test';
import { runQuery } from '../utils/oracle';

test('verify Oracle DB connectivity', async () => {
  const result = await runQuery(`SELECT 'd[-_-]b' AS test FROM dual`);
  expect(result.rows).toBeDefined();
  expect(result.rows.length).toBe(1);
  console.log('Oracle DB connection successful.', result.rows)
});
