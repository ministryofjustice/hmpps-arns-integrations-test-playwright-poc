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

  // Set up accomodation criminogenic needs No answers
  await stubHomePage.fillInPkNumberOfCompletedAssessment()

  // Select sentence plan
  await stubHomePage.selectSentencePlan();

  // Click create handover button
  await stubHomePage.clickCreateHandoverButton();

  // Click open button
  await stubHomePage.clickOpenButton();

  // Check the page title is correct
  await sentencePlanPage.checkPageTitle();

  // Change step status and add notes
  await sentencePlanPage.clickUpdateLink();
  await sentencePlanPage.checkUpdateStepsPageTitle();
  await sentencePlanPage.updateStepStatustoInProgress();
  await sentencePlanPage.addNotesAboutStepUpdate();
  await sentencePlanPage.clickSaveGoalAndStepsButton();
  await sentencePlanPage.checkStepStatusIsSetToInProgress();
  console.log('Goal step status updated to in progress');

  // Check information from plan history page
  await sentencePlanPage.clickPlanHistoryTopNavLink();
  await sentencePlanPage.assertPlanHistoryDateAndPracticionerUpdate();
  console.log('Update information from plan history verified');

  // Revert step status back to not started
  await sentencePlanPage.clickPlanTopNavLink();
  await sentencePlanPage.clickUpdateLink();
  await sentencePlanPage.checkUpdateStepsPageTitle();
  await sentencePlanPage.updateStepStatusBackToNotStarted();
  await sentencePlanPage.addNotesAboutStepUpdate();
  await sentencePlanPage.clickSaveGoalAndStepsButton();
  await sentencePlanPage.checkStepStatusBackToNotStarted();
  console.log('Goal step status updated back to not started');
});