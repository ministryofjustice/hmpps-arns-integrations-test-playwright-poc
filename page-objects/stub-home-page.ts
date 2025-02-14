import { expect, Locator, Page } from '@playwright/test';
import { DEFAULT_CLICK_OPTIONS } from './pages-common'

export class StubHomePage {
  constructor(
    private page: Page,
    private targetServiceDropdown: Locator = page.getByLabel('Target service'),
    private createHandoverButton: Locator = page.getByRole('button', { name: 'Create handover link' }),
    private openbutton: Locator = page.getByRole('button', { name: 'Open' }),
    private criminogenicNeedsTab: Locator = page.locator('#tab_criminogenicNeeds'),
    private accLinkedToHarmDropdown: Locator = page.locator('#accLinkedToHarm'),
    private accLinkedToReoffending: Locator = page.locator('#accLinkedToReoffending'),
    private accStrengths: Locator = page.locator('#accStrengths'),
    private accOtherWeightedScore: Locator = page.locator('#accOtherWeightedScore'),
    private accThreshold: Locator = page.locator('#accThreshold'),
  ) {}
  
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

  async clickCreateHandoverButton() {
    await this.createHandoverButton.click(DEFAULT_CLICK_OPTIONS);
  }

  async clickOpenButton() {
    await this.openbutton.click(DEFAULT_CLICK_OPTIONS);
  }

  async clickCriminogenicNeedsTab() {
    await this.criminogenicNeedsTab.click();
  }
}