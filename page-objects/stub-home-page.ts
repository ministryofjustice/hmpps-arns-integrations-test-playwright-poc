import { expect, Locator, Page } from '@playwright/test';
import { DEFAULT_CLICK_OPTIONS } from './pages-common'

export class StubHomePage {
  constructor(
    private page: Page,
    private targetServiceDropdown: Locator = page.getByLabel('Target service'),
    private createHandoverButton: Locator = page.getByRole('button', { name: 'Create handover link' }),
    private openbutton: Locator = page.getByRole('button', { name: 'Open' }),
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
}