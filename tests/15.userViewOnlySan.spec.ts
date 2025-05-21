import { test } from '@playwright/test';
import { StubHomePage } from '../page-objects/stub-home-page';
import { SentencePlanPage } from '../page-objects/sentence-plan-pages';

test('User tries editing capabilities on view only', async ({ page }) => {

    const stubHomePage = new StubHomePage(page);
    const sentencePlanPage = new SentencePlanPage(page);

    // Navigate to the stub home page
    await stubHomePage.goto();

    // Check the title of the page is correct
    await stubHomePage.checkPageTitle();

    // Paste PK of existing user
    await stubHomePage.fillInPkNumberOfCompletedAssessment()

    // Select view only level of access
    await stubHomePage.clickPractionerDetailsTab();
    await stubHomePage.selectViewOnlyAccessMode();

    // Select sentence plan
    await stubHomePage.selectSentencePlan();

    // Click create handover button
    await stubHomePage.clickCreateHandoverButton();

    // Click open button
    await stubHomePage.clickOpenButton();

    // Check the page title is correct
    await sentencePlanPage.checkPageTitle();

    // Interacts with what is possible for view only
    await sentencePlanPage.checkUpdateButtonHidden();

    // Future Goals interaction
    await sentencePlanPage.clickFutureGoalTab();

    // Remove goals interactions
    await sentencePlanPage.clickRemovedGoalsButton();
    await sentencePlanPage.checkRemovedGoalsTabIsThere();
    await sentencePlanPage.clickGoalsToWorkOnTab();

    // View Steps interactions
    await sentencePlanPage.checkViewStepsIsNotExpanded();
    await sentencePlanPage.clickViewStepsElement();
    await sentencePlanPage.checkViewStepsExpandsWhenClicked();
    await sentencePlanPage.clickViewStepsElement();
    await sentencePlanPage.checkViewStepsIsNotExpanded();

    // Check plan history via both ways
    await sentencePlanPage.clickEmbeddedViewPlanHistoryLink();
    await sentencePlanPage.checkPlanHistoryTabOpens();
    await sentencePlanPage.clickAboutTopNavLink();
    await sentencePlanPage.clickPlanHistoryTopNavLink();
    await sentencePlanPage.checkPlanHistoryTabOpens();

    // About tab
    await sentencePlanPage.clickAboutTopNavLink();
    await sentencePlanPage.checkAboutTabOpens();

    console.log('View only works as expected');
});