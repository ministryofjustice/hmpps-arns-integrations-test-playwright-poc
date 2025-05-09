import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';
import http from 'k6/http';
import { sleep } from 'k6';
import formData from '../data/formData.js';


const testStubUrl = 'https://arns-oastub-test.hmpps.service.justice.gov.uk/'

const SCENARIOS = (__ENV.SCENARIO || 'load').split(',').map(s => s.trim());
// splitting scenarios into a list to set which api test to run alongside the browser test
// refer to the README to pass scenarios in your run commands

//#region options
export const options = {
  scenarios: (function () {
    const scenarios = {};
    if (SCENARIOS.includes('browser')) {
      scenarios.browser = {
        executor: 'constant-vus',
        exec: 'browserTest',
        vus: 3,
        duration: '2m',
        // adjust the above values as needed if you need to run browser an API scenarios together 
        options: {
          browser: {
            type: 'chromium',
            headless: false,
          },
        },
      };
    }

    if (SCENARIOS.includes('load')) {
      scenarios.api = {
        executor: 'ramping-vus',
        exec: 'runIfLoad',
        stages: [
          { duration: '2m', target: 100 },   // Ramp up to 500 VUs over 2 minutes
          { duration: '5m', target: 400 },  // Ramp up to 2000 VUs over 5 minutes
          { duration: '5m', target: 400 },  // Hold 2000 VUs for 5 minutes
          { duration: '1m', target: 0 },     // Ramp down over 1 minute
        ],
        gracefulRampDown: '1m',
      };
    }

    if (SCENARIOS.includes('soak')) {
      scenarios.api = {
        executor: 'constant-vus',
        exec: 'runIfSoak',
        vus: 50,
        duration: '1h',
      };
    }

    if (SCENARIOS.includes('smoke')) {
      scenarios.api = {
        executor: 'shared-iterations',
        exec: 'runIfSmoke',
        vus: 1,
        iterations: 30,
        maxDuration: '15s',
      };
    }
    if (SCENARIOS.includes('stress')) {
      scenarios.api = {
        executor: 'constant-arrival-rate',
        exec: 'runIfStress',
        rate: 1000,             // 1000 iterations per second
        timeUnit: '1s',
        duration: '5m',
        preAllocatedVUs: 500,   // can start here
        maxVUs: 4000,           // allows scaling up as needed
      };
    }
    return scenarios;
  })(),

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
    sleep(1 + Math.random() * 3); // simulate thinking time
    await page.locator('//*[@id="main-content"]/div[3]/div/div/div[2]/a').click();
    sleep(1 + Math.random() * 3);

    // Move driver
    const pages = browser.context().pages();
    const page2 = pages[pages.length - 1];

    await page2.bringToFront();
    console.log('Current URL after switching: ', page2.url())
    console.log(page2.title());
    console.log("=========================");

    // Select No accomodation
    await page2.locator('#current_accommodation-3').check();
    sleep(1 + Math.random() * 3);

    // Select emergency hostel
    await page2.locator('#type_of_no_accommodation-2').check();
    sleep(1 + Math.random() * 3);

    // Submit form
    await page2.locator('//*[@id="form"]/div[2]/button').click();
    sleep(1 + Math.random() * 3);

    // Submit no accomodation form
    await page2.locator('//*[@id="no_accommodation_reason-6"]').check();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="suitable_housing_planned-3"]').check();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="accommodation_changes-4"]').check();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="form"]/div[5]/button').click();

    // Submit practitioner analysis
    await page2.locator('//*[@id="tab_practitioner-analysis"]').click();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="accommodation_practitioner_analysis_strengths_or_protective_factors-2"]').check();
    await page2.locator('//*[@id="accommodation_practitioner_analysis_risk_of_serious_harm-2"]').check();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="accommodation_practitioner_analysis_risk_of_reoffending"]').check();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="accommodation_practitioner_analysis_risk_of_reoffending_yes_details"]').type('Performance test');
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="form"]/div[4]/button').click();
    sleep(3);

    // Move onto Employment and education section
    await page2.locator('//*[@id="main-content"]/div/div[3]/div[1]/nav/ul/li[2]/a/span').click();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="employment_status-2"]').check();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="form"]/div[2]/button').click();
    sleep(1 + Math.random() * 3);

    await page2.locator('//*[@id="employment_other_responsibilities"]').check();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="employment_history"]').click();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="education_highest_level_completed-8"]').check();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="education_professional_or_vocational_qualifications-4"]').check();
    await page2.locator('//*[@id="education_transferable_skills-2"]').check();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="education_difficulties-5"]').check();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="employment_experience"]').check();
    await page2.locator('//*[@id="education_experience"]').check();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="employment_education_changes-3"]').check();
    sleep(1 + Math.random() * 3);

    // Submit form
    await page2.locator('//*[@id="form"]/div[11]/button').click();
    sleep(1 + Math.random() * 3);

    // Submit practitioner analysis
    await page2.locator('//*[@id="tab_practitioner-analysis"]').click();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="employment_education_practitioner_analysis_strengths_or_protective_factors-2"]').check();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="employment_education_practitioner_analysis_risk_of_serious_harm-2"]').check();
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="employment_education_practitioner_analysis_risk_of_reoffending"]').check();
    await page2.locator('//*[@id="employment_education_practitioner_analysis_risk_of_reoffending_yes_details"]').type('Performance test');
    sleep(1 + Math.random() * 3);
    await page2.locator('//*[@id="form"]/div[4]/button').click();
    sleep(3);

  } finally {
    await page.close();
  }
}
//#endregion

//#region api test
export function apiTest() {

  // Send the GET request and retrieve cookies
  const res = http.get(testStubUrl);
  sleep(Math.random() * 3) // comment out when running stress scenario

  // Check that the response status is 200
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Get cookie from the GET request
  const sessionCookie = res.cookies['hmpps-assess-risks-and-needs-oastub-ui.session'];

  // Set headers for the POST request
  const headers = {
    'Content-Type': 'text/html; charset=utf-8',
    'Cookie': `hmpps-assess-risks-and-needs-oastub-ui.session=${sessionCookie}`, // Add the session cookie here
  };

  const encodedData = (formData).toString();

  const postRes = http.post(testStubUrl, encodedData, { headers });

  // Check that the POST request status is 200
  check(postRes, {
    'status is 200': (r) => r.status === 200,
  });
  //console.log(postRes).toString;
  sleep(Math.random() * 3) // comment out when running stress scenario
}

export function runIfLoad() {
  if (SCENARIOS.includes('load')) apiTest();
}
export function runIfSoak() {
  if (SCENARIOS.includes('soak')) apiTest();
}
export function runIfSmoke() {
  if (SCENARIOS.includes('smoke')) apiTest();
}
export function runIfStress() {
  if (SCENARIOS.includes('stress')) apiTest();
}

//#endregion