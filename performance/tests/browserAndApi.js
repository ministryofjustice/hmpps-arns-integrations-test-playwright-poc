import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';
import http from 'k6/http';

const testStubUrl = 'https://arns-oastub-test.hmpps.service.justice.gov.uk/'

export const options = {
  scenarios: {
    browser: {
      executor: 'constant-vus',
      exec: 'browserTest',
      vus: 1,
      duration: '10s',
      options: {
        browser: {
          type: 'chromium',
          headless: 'false'
        },
      },
    },
    api: {
      executor: 'constant-vus',
      exec: 'api',
      vus: 20,
      duration: '1m',
    },
  },
};

export async function browserTest() {
  const page = await browser.newPage();

  try {
    await page.goto(testStubUrl, { waitUntil: 'networkidle' });

    // Access SAN assessment
    await page.locator('#target-service').selectOption('strengths-and-needs-assessment');
    await page.locator('#form > div:nth-child(2) > div > div.action-shelf > button').click();
    await page.locator('#main-content > div.govuk-grid-row > div > div > div.govuk-button-group > a').click();

    // Check the page is correct
    await check(page.locator('#main-content > div > div:nth-child(2) > div > div > h1')
      .textContent === 'Strengths and needs',
    );

  } finally {
    await page.close();
  }
}

export function api() {
  const res = http.get('https://arns-oastub-test.hmpps.service.justice.gov.uk/');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}