import { expect, Locator, Page } from '@playwright/test';
import { DEFAULT_CLICK_OPTIONS, PK_WITH_COMPLETED_SAN } from '../../../page-objects/pages-common'

export class StubHomePage {
  constructor(
    private page: Page,
    private targetServiceDropdown: Locator = page.getByLabel('Target service'),
    private createHandoverButton: Locator = page.getByRole('button', { name: 'Create handover link' }),
    private pasteConfigurationButton: Locator = page.getByRole('button', { name: 'Paste configuration' }),
    private openbutton: Locator = page.getByRole('button', { name: 'Open' }),
    private criminogenicNeedsTab: Locator = page.locator('#tab_criminogenicNeeds'),
    private accLinkedToHarmDropdown: Locator = page.locator('#accLinkedToHarm'),
    private accLinkedToReoffending: Locator = page.locator('#accLinkedToReoffending'),
    private accStrengths: Locator = page.locator('#accStrengths'),
    private accOtherWeightedScore: Locator = page.locator('#accOtherWeightedScore'),
    private accThreshold: Locator = page.locator('#accThreshold'),
    private pkField: Locator = page.locator('#oasys-assessment-pk')
  ) { }

  async goto() {
    await this.page.goto('/');
  }

  async checkPageTitle() {
    await expect(this.page).toHaveTitle('ARNS OAStub');
  }

  async selectStrenghtsAndNeeds() {
    await this.targetServiceDropdown.selectOption('strengths-and-needs-assessment');
  }

  async selectSentencePlan() {
    await this.targetServiceDropdown.selectOption('sentence-plan');
  }

  async clickPasteConfigurationButton() {
    await this.pasteConfigurationButton.click();
  }

  async clickCreateHandoverButton() {
    await this.createHandoverButton.click(DEFAULT_CLICK_OPTIONS);
  }

  async clickOpenButton() {
    await this.openbutton.click(DEFAULT_CLICK_OPTIONS);
  }

  async clickCriminogenicNeedsTab() {
    await this.criminogenicNeedsTab.click();
  }

  async selectYesAccLinkedToHarmDropdown() {
    await this.accLinkedToHarmDropdown.selectOption('Yes');
  }

  async selectYesAccLinkedToReoffending() {
    await this.accLinkedToReoffending.selectOption('Yes');
  }

  async selectYesAccStrengths() {
    await this.accStrengths.selectOption('Yes');
  }

  async selectNoAccLinkedToHarmDropdown() {
    await this.accLinkedToHarmDropdown.selectOption('No');
  }

  async selectNoAccLinkedToReoffending() {
    await this.accLinkedToReoffending.selectOption('No');
  }

  async selectNoAccStrengths() {
    await this.accStrengths.selectOption('No');
  }

  async selectNullAccLinkedToHarmDropdown() {
    await this.accLinkedToHarmDropdown.selectOption('Null');
  }

  async selectNullAccLinkedToReoffending() {
    await this.accLinkedToReoffending.selectOption('Null');
  }

  async selectNullAccStrengths() {
    await this.accStrengths.selectOption('Null');
  }

  async selectNullAccOtherWeightedScore() {
    await this.accOtherWeightedScore.selectOption('Null');
  }

  async selectNullAccThreshold() {
    await this.accThreshold.selectOption('Null');
  }

  async fillInPkNumberOfCompletedAssessment() {
    await this.pkField.fill(PK_WITH_COMPLETED_SAN);
  }
}