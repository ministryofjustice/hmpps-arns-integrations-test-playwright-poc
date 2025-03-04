import { test } from '@playwright/test';
import { StubHomePage } from '../page-objects/stub-home-page';
import { SentencePlanPage } from '../page-objects/sentence-plan-pages';

/* Note: this test feature will fail if the test data is wiped. 
It relies on pre-existing PK with a completed SAN assessment. */
test('User views about page when they have not completed SAN assessment', async ({ page }) => {

  const stubHomePage = new StubHomePage(page);
  const sentencePlanPage = new SentencePlanPage(page);

  // Navigate to the stub home page
  await stubHomePage.goto();

  // Check the title of the page is correct
  await stubHomePage.checkPageTitle();

  // Set up accomodation criminogenic needs Null answers
  await stubHomePage.clickCriminogenicNeedsTab();
  await stubHomePage.selectNullAccLinkedToHarmDropdown();
  await stubHomePage.selectNullAccLinkedToReoffending();
  await stubHomePage.selectNullAccStrengths();
  await stubHomePage.selectNullAccOtherWeightedScore();
  await stubHomePage.selectNullAccThreshold();

  // Select sentence plan
  await stubHomePage.selectSentencePlan();

  // Click create handover button
  await stubHomePage.clickCreateHandoverButton();

  // Click open button
  await stubHomePage.clickOpenButton();

  // Check the page title is correct
  await sentencePlanPage.checkPageTitle();

  // Access About section
  await sentencePlanPage.clickAboutTopNavLink();
  await sentencePlanPage.checkAboutPageTitle();

  // Check no banner displays
  await sentencePlanPage.checkBannerDisplaysForIncompleteAssessment();
  console.log('About page incomplete assessment - banner displayed');

  // Check sections are listed in the missinf information area
  await sentencePlanPage.checkSectionsAreListedAsIncompleteInformation();

  // Check no information available yet for accomodation is displayed
  await sentencePlanPage.checkNoInfoAvailableDisplays();
});