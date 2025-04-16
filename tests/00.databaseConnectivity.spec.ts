import { test, expect } from '@playwright/test';
import { runQuery } from '../utils/oracle';

test('verify Oracle DB connectivity', async () => {
  const result = await runQuery(`SELECT 1 FROM dual`);
  expect(result.rows).toBeDefined();
  expect(result.rows.length).toBe(1);
});
