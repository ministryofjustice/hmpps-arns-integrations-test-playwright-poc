import { test } from '@playwright/test';
import { StubHomePage } from '../page-objects/stub-home-page';
import { SentencePlanPage } from '../page-objects/sentence-plan-pages';

test('User views assessment info when they have completed that assessment', async ({ page }) => {

  const stubHomePage = new StubHomePage(page);
  const sentencePlanPage = new SentencePlanPage(page);

  // Navigate to the stub home page
  await stubHomePage.goto();

  // Check the title of the page is correct
  await stubHomePage.checkPageTitle();

  // Paste PK of existing user
  await stubHomePage.fillInPkNumberOfCompletedAssessment()

  // Select sentence plan
  await stubHomePage.selectSentencePlan();

  // Click create handover button
  await stubHomePage.clickCreateHandoverButton();

  // Click open button
  await stubHomePage.clickOpenButton();

  // Check the page title is correct
  await sentencePlanPage.checkPageTitle();

  // Check information from accomodation assessment from create a goal page
  await sentencePlanPage.clickCreateGoalButton();
  await sentencePlanPage.clickViewInfoFromAssessmentDropdown();
  await sentencePlanPage.checkThisAreaIsNotMarkedAsCompleteWarningDoesNotDisplay();
  await sentencePlanPage.checkNoInfoAvailableYetWarningDoesNotDisplay();
  console.log('Information from completed accomodation assessment verified');
});