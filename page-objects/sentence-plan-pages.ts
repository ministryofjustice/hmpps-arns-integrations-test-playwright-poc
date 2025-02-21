import { expect, Locator, Page } from '@playwright/test';

const { chromium } = require('playwright');

let newTabGlobal: Page | null = null;

export class SentencePlanPage {
    constructor(
        private page: Page,
    ) { }

    async checkPageTitle() {
        const newTabPromise = this.page.waitForEvent('popup');
        const newTab = await newTabPromise;
        //wait for Load 
        await newTab.waitForLoadState();
        newTabGlobal = newTab;
        await expect(newTab).toHaveTitle('Plan - Sentence plan');
    }

    async validationErrorDisplays() {
        await expect(newTabGlobal!.getByRole('alert')).toBeVisible();
    }

    async clickViewInfoFromAssessmentDropdown() {
        await newTabGlobal!.locator('summary').click();
    }

    async checkThisAreaIsNotMarkedAsCompleteWarningDisplays() {
        await expect(newTabGlobal!.getByText('Warning This area has not')).toBeVisible();
    }

    async checkThisAreaIsNotMarkedAsCompleteWarningDoesNotDisplay() {
        await expect(newTabGlobal!.getByText('Warning This area has not')).toHaveCount(0);
    }

    async checkNoInfoAvailableYetWarningDisplays() {
        await expect(newTabGlobal!.getByText('Warning No information is')).toBeVisible();
    }

    async checkNoInfoAvailableYetWarningDoesNotDisplay() {
        await expect(newTabGlobal!.getByText('Warning No information is')).toHaveCount(0);
    }

    async checkAreaIsLinkedToRoSH() {
        await expect(newTabGlobal!.getByText('This area is linked to RoSH (risk of serious harm)')).toBeVisible();
    }

    async checkAreaIsLinkedToRiskOfReoffending() {
        await expect(newTabGlobal!.getByText('This area is linked to risk of reoffending')).toBeVisible();
    }

    async checkStrenghtsAndProtectiveFactorsAreInPlace() {
        await expect(newTabGlobal!.getByText('There are strengths or protective factors related to this area')).toBeVisible();
    }

    async checkAreaIsNotLinkedToRoSH() {
        await expect(newTabGlobal!.getByText('This area is not linked to RoSH (risk of serious harm)')).toBeVisible();
    }

    async checkAreaIsNotLinkedToRiskOfReoffending() {
        await expect(newTabGlobal!.getByText('This area is not linked to risk of reoffending')).toBeVisible();
    }

    async checkStrenghtsAndProtectiveFactorsAreNotInPlace() {
        await expect(newTabGlobal!.getByText('There are no strengths or protective factors related to this area')).toBeVisible();
    }

    async checkMotivationResponseDisplaysAsMissingInfo() {
        await expect(newTabGlobal!.locator('#main-content > div > div.govuk-grid-column-two-thirds > details > div > ul > li'))
            .toContainText('motivation to make changes')
    }

    async checkMissingInformationDisplays() {
        await expect(newTabGlobal!.getByText('Missing information')).toBeVisible();
    }

    async clickCreateGoalButton() {
        await newTabGlobal!.getByRole('button', { name: 'Create goal' }).click();
    }

    async clickAgreePlanButton() {
        await newTabGlobal!.getByRole('button', { name: 'Agree plan' }).click();
    }

    async fillInGoalTitle() {
        await newTabGlobal!.locator('#goal-input-autocomplete')
            .fill('Test Accomodation goal');
    }

    async tickGoalNotRelatedToAreaOfNeed() {
        await newTabGlobal!.locator('#related-area-of-need-radio-2').check();
    }

    async tickCanStartWorkingOnGoalNow() {
        await newTabGlobal!.locator('#start-working-goal-radio').check();
    }

    async tickIn3Months() {
        await newTabGlobal!.locator('#date-selection-radio').check();
    }

    async tickFutureGoal() {
        await newTabGlobal!.locator('#start-working-goal-radio-2').check();
    }

    async clickAddSTeps() {
        await newTabGlobal!.getByRole('button', { name: 'Add steps' }).click();
    }

    async checkAddSTepsToGoalPageTitle() {
        await expect(newTabGlobal!).toHaveTitle('Add or change steps - Sentence plan');
    }

    async selectProbationPracticioner() {
        await newTabGlobal!.locator('#step-actor-1').selectOption('Probation practitioner');
    }

    async selectProgrammeStaff() {
        await newTabGlobal!.locator('#step-actor-2').selectOption('Programme staff');
    }

    async fillInStepTitle() {
        await newTabGlobal!.locator('#step-description-1')
            .fill('Accomodation step title')
    }

    async fillInSecondStepTitle() {
        await newTabGlobal!.locator('#step-description-2')
            .fill('Second step title');
    }

    async clickRemoveStepButton() {
        await newTabGlobal!.getByRole('button', { name: 'Remove' }).nth(1).click();
    }

    async clickSaveAndContinueButton() {
        await newTabGlobal!.getByRole('button', { name: 'Save and continue' }).click();
    }

    async clickChangeGoalLink() {
        await newTabGlobal!.getByRole('link', { name: 'Change goal' }).click();
    }

    async clickAddOrChangeStepsLink() {
        await newTabGlobal!.getByRole('link', { name: 'Add or change steps' }).click();
    }

    async checkChangeGoalPageTitle() {
        await expect(newTabGlobal!).toHaveTitle('Change goal - Sentence plan');
    }

    async checkAddStepsToGoalPageTitle() {
        await expect(newTabGlobal!).toHaveTitle('Add or change steps - Sentence plan');
    }

    async fillInNewGoalTitle() {
        await newTabGlobal!.locator('#goal-input-autocomplete')
            .fill('Test New Accomodation goal');
    }

    async changeToFutureGoal() {
        await newTabGlobal!.locator('#start-working-goal-radio-2').check();
    }

    async clickSaveGoalButton() {
        await newTabGlobal!.locator('#change-goal-form > div.govuk-button-group > button').click();
    }

    async clickFutureGoalTab() {
        await newTabGlobal!.locator('#main-content > div > div > nav > ul > li:nth-child(2) > a').click();
    }

    async checkGoalTitleChangeIsStoredCorrectly() {
        await expect(newTabGlobal!.getByRole('heading', { name: 'Test New Accomodation goal' })).toBeVisible();
    }

    async clickViewStepsElement() {
        await newTabGlobal!.locator('summary').click();
    }

    async checkExpectedStepIsListedWhenViewStepsElementIsToggled() {
        await expect(newTabGlobal!.locator('#goal-summary-card-1 > div > div.govuk-summary-card__content > details > div > table > tbody > tr:nth-child(1) > td:nth-child(2)'))
            .toHaveText('Accomodation step title');
    }

    async checkRemovedStepIsNotShowingWhenViewStepsElementIsToggled() {
        await expect(newTabGlobal!.locator('#goal-summary-card-1 > div > div.govuk-summary-card__content > details > div > table > tbody > tr:nth-child(2) > td:nth-child(2)'))
            .toHaveCount(0);
    }

    async checkNewStepIsStoredCorrectly() {
        await expect(newTabGlobal!.locator('#goal-summary-card-1 > div > div.govuk-summary-card__content > div.govuk-details__text_inactive > table > tbody > tr:nth-child(2) > td:nth-child(2)'))
            .toHaveText('Second step title');
    }

    async checkNewStepIsRemoved() {
        await expect(newTabGlobal!.locator('#goal-summary-card-1 > div > div.govuk-summary-card__content > details > div > table > tbody > tr:nth-child(2) > td:nth-child(2)'))
            .toHaveCount(0);
    }

    async checkExistingStepHasNotBeenDeleted() {
        await expect(newTabGlobal!.locator('#goal-summary-card-1 > div > div.govuk-summary-card__content > div.govuk-details__text_inactive > table > tbody > tr > td:nth-child(2)'))
            .toBeVisible();
    }

    async clickAddAnotherStepButton() {
        await newTabGlobal!.getByRole('button', { name: 'Add another step' }).click();
    }

    async checkDoTheyAgreeToThisPLanPageTitle() {
        await expect(newTabGlobal!).toHaveTitle('Do they agree to this plan? - Sentence plan');
    }

    async tickYesIAgreeToThisPlan() {
        await newTabGlobal!.locator('#agree-plan-radio').check();
    }

    async fillInNotesAboutAgreeingPlan() {
        await newTabGlobal!.locator('#notes')
            .fill('Test notes about agreeing the plan.')
    }

    async clickSaveButtonOnAgreePlanPage() {
        await newTabGlobal!.locator('#agree-plan-form > button').click();
    }

    async checkUserIsBAckOnSentencePlanLandingPage() {
        await expect(newTabGlobal!).toHaveTitle('Plan - Sentence plan');
    }

    async clickSaveWithoutStepsButton() {
        await newTabGlobal!.getByRole('button', { name: 'Save without steps' }).click();
    }

    async checkAddStepsValidationErrorDisplays() {
        await expect(newTabGlobal!.locator('div').filter({ hasText: 'There is a problem Add steps' }).nth(3))
            .toBeVisible();
    }

    async checkUserIsNotifiedGoalHasBeenAdded() {
        await expect(newTabGlobal!.getByLabel('Success')).toBeVisible();
    }

    async checkNumberOfGoalsToWorkOnNowIsCorrect() {
        await expect(newTabGlobal!.getByRole('link', { name: 'Goals to work on now (2)' }))
            .toBeVisible();
    }

    async checkNumberOfFutureGoalsIsCorrect() {
        await expect(newTabGlobal!.getByRole('link', { name: 'Future goals (1)' }))
            .toBeVisible();
    }
}