import { test } from '@playwright/test';
import { StubHomePage } from '../page-objects/stub-home-page';
import { SentencePlanPage } from '../page-objects/sentence-plan-pages';
import { Accessibility } from '../page-objects/accessibility';
import * as fs from 'fs'; // import file system module

/* Note: this test feature will fail if the test data is wiped. 
It relies on pre-existing PK with a completed SAN assessment. */
test('User views their sections and their info in About page', async ({ page }) => {

  const stubHomePage = new StubHomePage(page);
  const sentencePlanPage = new SentencePlanPage(page);
  const accessibility = new Accessibility(page);

  // Navigate to the stub home page
  await stubHomePage.goto();

  // Check the title of the page is correct
  await stubHomePage.checkPageTitle();

  // Read json file and convert to string
  const jsonData = JSON.stringify(JSON.parse(fs.readFileSync('../data/data.json', 'utf-8')), null, 2)

  // Copy json data to clipboard
  await page.evaluate(text => navigator.clipboard.writeText(text), jsonData);

  // Paste json data to simulate criminogenic needs values
  await page.keyboard.press(process.platform === 'darwin' ? 'Meta+V' : 'Control+V');

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
  await sentencePlanPage.checkBannerDoesntDisplayForCompleteAssessment();
  console.log('About page complete assessment - info verified');

  // Check page has no accessiblity violations
  await accessibility.shouldHaveNoAccessibilityViolations();

  

  // Click show all sections accordion and check there are still no accessibility violations
  await sentencePlanPage.clickShowAllSectionsAccordion();
  await accessibility.shouldHaveNoAccessibilityViolations();

  // Click create a goal from section
  await sentencePlanPage.clickCreateAGoalLinkFromWithinSection();
  await sentencePlanPage.checkCreateAGoalPageTitle();

  // Back out from page and ensure user is back on About page
  await sentencePlanPage.clickBackButtonFromCreateGoalPage();
  await sentencePlanPage.checkAboutPageTitle();
});