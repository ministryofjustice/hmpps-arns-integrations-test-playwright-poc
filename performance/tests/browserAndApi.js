import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';
import http from 'k6/http';
import { sleep } from 'k6';

const testStubUrl = 'https://arns-oastub-test.hmpps.service.justice.gov.uk/'
const employmentAndEducationUrl = 'https://strengths-based-needs-assessments-test.hmpps.service.justice.gov.uk/form/1/0/current-employment'

//#region options
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
        { duration: '10s', target: 50 },  // Gradually increase to 50 VUs
        { duration: '10s', target: 50 },   // Maintain 50 VUs
        { duration: '10s', target: 0 },  // Gradually reduce to 0 VUs with graceful shutdown
      ],
      gracefulRampDown: '10s',
    },
  },
  thresholds: {
    browser_http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    browser_http_req_duration: ['p(90)<200', 'p(95)<500'], // 90% of requests should be below 200ms / 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
};
//#endregion

//#region browser test
export async function browserTest() {
  const page = await browser.newPage();

  try {
    await page.goto(testStubUrl, { waitUntil: 'networkidle' });

    // Access SAN assessment
    await page.locator('//*[@id="target-service"]').selectOption('strengths-and-needs-assessment');
    await page.locator('//*[@id="form"]/div[1]/div/div/button[1]').click();
    await page.locator('//*[@id="main-content"]/div[3]/div/div/div[2]/a').click();
    sleep(3);

    // Move driver
    const pages = browser.context().pages();
    const page2 = pages[pages.length - 1];

    await page2.bringToFront();
    console.log('Current URL after switching: ', page2.url())
    console.log(page2.title());
    console.log("=========================");

    // Select No accomodation
    await page2.locator('#current_accommodation-3').check();

    // Select emergency hostel
    await page2.locator('#type_of_no_accommodation-2').check();

    // Submit form
    await page2.locator('//*[@id="form"]/div[2]/button').click();
    sleep(3);

    // Submit no accomodation form
    await page2.locator('//*[@id="no_accommodation_reason-6"]').check();
    await page2.locator('//*[@id="suitable_housing_planned-3"]').check();
    await page2.locator('//*[@id="accommodation_changes-4"]').check();
    await page2.locator('//*[@id="form"]/div[5]/button').click();
    
    // Submit practitioner analysis
    await page2.locator('//*[@id="tab_practitioner-analysis"]').click();
    await page2.locator('//*[@id="accommodation_practitioner_analysis_strengths_or_protective_factors-2"]').check();
    await page2.locator('//*[@id="accommodation_practitioner_analysis_risk_of_serious_harm-2"]').check();
    await page2.locator('//*[@id="accommodation_practitioner_analysis_risk_of_reoffending"]').check();
    await page2.locator('//*[@id="accommodation_practitioner_analysis_risk_of_reoffending_yes_details"]').type('Performance test');
    await page2.locator('//*[@id="form"]/div[4]/button').click();
    sleep(3);

    // Move onto Employment and education section
    await page2.locator('//*[@id="main-content"]/div/div[3]/div[1]/nav/ul/li[2]/a/span').click();
    await page2.locator('//*[@id="employment_status-2"]').check();
    await page2.locator('//*[@id="form"]/div[2]/button').click();

    await page2.locator('//*[@id="employment_other_responsibilities"]').check();
    await page2.locator('//*[@id="employment_history"]').click();
    await page2.locator('//*[@id="education_highest_level_completed-8"]').check();
    await page2.locator('//*[@id="education_professional_or_vocational_qualifications-4"]').check();
    await page2.locator('//*[@id="education_transferable_skills-2"]').check();
    await page2.locator('//*[@id="education_difficulties-5"]').check();
    await page2.locator('//*[@id="employment_experience"]').check();
    await page2.locator('//*[@id="education_experience"]').check();
    await page2.locator('//*[@id="employment_education_changes-3"]').check();

    // Submit form
    await page2.locator('//*[@id="form"]/div[11]/button').click();

    // Submit practitioner analysis
    await page2.locator('//*[@id="tab_practitioner-analysis"]').click();
    await page2.locator('//*[@id="employment_education_practitioner_analysis_strengths_or_protective_factors-2"]').check();
    await page2.locator('//*[@id="employment_education_practitioner_analysis_risk_of_serious_harm-2"]').check();
    await page2.locator('//*[@id="employment_education_practitioner_analysis_risk_of_reoffending"]').check();
    await page2.locator('//*[@id="employment_education_practitioner_analysis_risk_of_reoffending_yes_details"]').type('Performance test');
    await page2.locator('//*[@id="form"]/div[4]/button').click();
    sleep(3);

  } finally {
    await page.close();
  }
}
//#endregion

//#region api test
export function api() {

  const res = http.get('https://arns-oastub-test.hmpps.service.justice.gov.uk/');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
//#endregion