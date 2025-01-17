import { test } from '@playwright/test';
import { StubHomePage } from '../page-objects/stub-home-page';
import { SentencePlanPage } from '../page-objects/sentence-plan-pages';

test('user creates and updates a goal, adds, updates and removes steps and agrees plan in sentence plan', async ({ page }) => {
  
  const stubHomePage = new StubHomePage(page);
  const sentencePlanPage = new SentencePlanPage(page);
  
  // Navigate to the stub home page
  await stubHomePage.goto();

  // Check the title of the page is correct
  await stubHomePage.checkPageTitle();

  // Select strenghts and needs reports assessment
  await stubHomePage.selectSentencePlan();

  // Click create handover button
  await stubHomePage.clickCreateHandoverButton(); 

  // Click open button
  await stubHomePage.clickOpenButton();

  // Check the page title is correct
  await sentencePlanPage.checkPageTitle();

  // Create an accomodation goal from top nav
  await sentencePlanPage.clickCreateGoalButton();
  await sentencePlanPage.fillInGoalTitle();
  await sentencePlanPage.tickGoalNotRelatedToAreaOfNeed();
  await sentencePlanPage.tickCanStartWorkingOnGoalNow();
  await sentencePlanPage.tickIn3Months();
  await sentencePlanPage.clickAddSTeps();

  await sentencePlanPage.checkAddSTepsToGoalPageTitle();
  await sentencePlanPage.selectProbationPracticioner();
  await sentencePlanPage.fillInStepTitle();
  await sentencePlanPage.clickSaveAndContinueButton();
  console.log('Goal created');

  // Change goal
  await sentencePlanPage.clickChangeGoalLink();
  await sentencePlanPage.checkChangeGoalPageTitle();
  await sentencePlanPage.fillInNewGoalTitle();
  await sentencePlanPage.changeToFutureGoal();
  await sentencePlanPage.clickSaveGoalButton();
  await sentencePlanPage.clickFutureGoalTab();
  await sentencePlanPage.checkGoalTitleChangeIsStoredCorrectly();
  console.log('Goal updated');

  // Add step
  await sentencePlanPage.clickAddOrChangeStepsLink();
  await sentencePlanPage.checkAddStepsToGoalPageTitle();
  await sentencePlanPage.clickAddAnotherStepButton();
  await sentencePlanPage.selectProgrammeStaff();
  await sentencePlanPage.fillInSecondStepTitle();
  await sentencePlanPage.clickSaveAndContinueButton();
  await sentencePlanPage.checkNewStepIsStoredCorrectly();
  console.log('Step added');

  // Remove step
  await sentencePlanPage.clickAddOrChangeStepsLink();
  await sentencePlanPage.clickRemoveStepButton();
  await sentencePlanPage.clickSaveAndContinueButton();
  await sentencePlanPage.checkNewStepIsRemoved();
  await sentencePlanPage.checkExistingStepHasNotBeenDeleted();
  console.log('Step removed');

  // Change goal back to work on now
  await sentencePlanPage.clickChangeGoalLink();
  await sentencePlanPage.tickCanStartWorkingOnGoalNow();
  await sentencePlanPage.tickIn3Months();
  await sentencePlanPage.clickSaveGoalButton();

  // Agree plan
  await sentencePlanPage.clickAgreePlanButton();
  await sentencePlanPage.checkDoTheyAgreeToThisPLanPageTitle();
  await sentencePlanPage.tickYesIAgreeToThisPlan();
  await sentencePlanPage.fillInNotesAboutAgreeingPlan();
  await sentencePlanPage.clickSaveButtonOnAgreePlanPage();
  await sentencePlanPage.checkUserIsBAckOnSentencePlanLandingPage();
  console.log('Plan agreed');

  // Create a goal without steps
  await sentencePlanPage.clickCreateGoalButton();
  await sentencePlanPage.fillInGoalTitle();
  await sentencePlanPage.tickGoalNotRelatedToAreaOfNeed();
  await sentencePlanPage.tickCanStartWorkingOnGoalNow();
  await sentencePlanPage.tickIn3Months();
  await sentencePlanPage.clickSaveWithoutStepsButton();

  await sentencePlanPage.checkAddStepsValidationErrorDisplays();
  await sentencePlanPage.checkUserIsNotifiedGoalHasBeenAdded();
  await sentencePlanPage.checkNumberOfGoalsToWorkOnNowIsCorrect();

  // Create future goal
  await sentencePlanPage.clickCreateGoalButton();
  await sentencePlanPage.fillInGoalTitle();
  await sentencePlanPage.tickGoalNotRelatedToAreaOfNeed();
  await sentencePlanPage.tickFutureGoal();
  await sentencePlanPage.clickSaveWithoutStepsButton();

  await sentencePlanPage.checkAddStepsValidationErrorDisplays();
  await sentencePlanPage.checkUserIsNotifiedGoalHasBeenAdded();
  await sentencePlanPage.checkNumberOfFutureGoalsIsCorrect();
});