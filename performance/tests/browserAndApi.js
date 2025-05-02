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
      duration: '30s',
      options: {
        browser: {
          type: 'chromium',
          headless: 'false',
        },
      },
    },
    api: {
      executor: 'ramping-vus',
      exec: 'api',
      //vus: 50,
      //duration: '1m',
      stages: [
        { duration: '25s', target: 50 },  // Gradually increase to 50 VUs
        { duration: '25s', target: 50 },   // Maintain 50 VUs
        { duration: '10s', target: 0 },  // Gradually reduce to 0 VUs with graceful shutdown
      ],
      gracefulRampDown: '10s',
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

    // Select No accomodation
    await page.locator('#current_accommodation-3').check();

    // Select emergency hostel
    await page.locator('#type_of_no_accommodation-2').check();

    // Submit form
    await page.locator('#form > div.questiongroup-action-buttons > button').click();

    // Ensure user is on the no accomodation page
    await check(page.locator('#no_accommodation_reason-hint > div > p:nth-child(1)')
      .textContent === 'Consider current and past homelessness issues.',
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