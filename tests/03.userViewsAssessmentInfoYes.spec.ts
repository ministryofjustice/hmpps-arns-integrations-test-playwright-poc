import { test } from '@playwright/test';
import { StubHomePage } from '../page-objects/stub-home-page';
import { SentencePlanPage } from '../page-objects/sentence-plan-pages';

test('User views assessment info when creating a goal - Yes answers', async ({ page }) => {
  
  const stubHomePage = new StubHomePage(page);
  const sentencePlanPage = new SentencePlanPage(page);
  
  // Navigate to the stub home page
  await stubHomePage.goto();

  // Check the title of the page is correct
  await stubHomePage.checkPageTitle();
});