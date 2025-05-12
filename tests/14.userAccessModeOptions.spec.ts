import { test } from '@playwright/test';
import { StubHomePage } from '../page-objects/stub-home-page';
import { SentencePlanPage } from '../page-objects/sentence-plan-pages';
import {Accessibility} from "../page-objects/accessibility";

test('User views sentence plan with view and edit access', async ({ page }) => {

    const stubHomePage = new StubHomePage(page);
    const sentencePlanPage = new SentencePlanPage(page);
    const accessibility = new Accessibility(page);

    // Navigate to the stub home page
    await stubHomePage.goto();

    // Check the title of the page is correct
    await stubHomePage.checkPageTitle();

    // Paste PK of existing user
    await stubHomePage.fillInPkNumberOfCompletedAssessment()

    // Select view and edit level of access
    await stubHomePage.clickPractionerDetailsTab();
    await stubHomePage.selectViewAndEditAccessMode();

    // Select sentence plan
    await stubHomePage.selectSentencePlan();

    // Click create handover button
    await stubHomePage.clickCreateHandoverButton();

    // Click open button
    await stubHomePage.clickOpenButton();

    // Check the page title is correct
    await sentencePlanPage.checkPageTitle();

    // Check update button appears on page
    await sentencePlanPage.checkUpdateButtonAppears();

    console.log('View and edit works as expected');
});

test('User views sentence plan with view only access', async ({ page }) => {

    const stubHomePage = new StubHomePage(page);
    const sentencePlanPage = new SentencePlanPage(page);
    const accessibility = new Accessibility(page);

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

    // Check update button appears on page
    await sentencePlanPage.checkUpdateButtonHidden();

    console.log('View only works as expected');
});