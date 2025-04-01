import { expect, Locator, Page } from '@playwright/test';
import { SP_TEST_ENV_LINK } from './pages-common';

let newTabGlobal: Page | null = null;

export class SentencePlanfromSanPage {
    constructor(
        private page: Page,
    ) { }

    async checkPageTitle() {
        const context = this.page.context();
        const pages = context.pages();
        const latestPage = pages[pages.length - 1];
        await latestPage.bringToFront();
        //wait for Load 
        await latestPage.waitForLoadState();
        newTabGlobal = latestPage;
        await expect(latestPage).toHaveTitle('Plan - Sentence plan');
    }

    async navigateToSPLink() {
        await newTabGlobal!.goto(SP_TEST_ENV_LINK);
    }

    async clickAboutPageAfterNavigatingToSPWithoutOasysStep() {
        //const newPagePromise = this.page.waitForEvent('load');
        //const newPage = await newPagePromise;
        //wait for Load 
        //await newPage.waitForLoadState();
        //newTabGlobal2 = newPage;
        const aboutLink = await newTabGlobal!.getByRole('link', { name: 'About', exact: false })
        await aboutLink.waitFor({ state: 'visible' });
        await aboutLink.click();
    }
}