import { test, request, expect } from '@playwright/test';

test('API test using cookies set from initial GET request', async () => {
  // Step 1: Make an initial GET request to get the cookie
  const context = await request.newContext();
  const initialResponse = await context.get('https://arns-oastub-test.hmpps.service.justice.gov.uk/');
  expect(initialResponse.ok()).toBeTruthy();

  // Get cookies from the response
  const cookies = await context.storageState();

  // Check what cookies were received
  console.log('Stored Cookies:', cookies.cookies);

  const sessionCookie = cookies.cookies.find(c => c.name === 'hmpps-assess-risks-and-needs-oastub-ui.session');
  expect(sessionCookie).toBeDefined();
  console.log(sessionCookie.value);

  // Step 2: Use the cookie in a new API context
  const cookieProtectedContext = await request.newContext({
    baseURL: 'https://arns-oastub-test.hmpps.service.justice.gov.uk/',
    extraHTTPHeaders: {
      'Cookie': `${sessionCookie!.name}=${sessionCookie!.value}`,
    },
  });

  // Step 3: Send a request using the cookie
  const response = await cookieProtectedContext.post('https://arns-oastub-test.hmpps.service.justice.gov.uk/');
  expect(response.ok()).toBeTruthy();
});