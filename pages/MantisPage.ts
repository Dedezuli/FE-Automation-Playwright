import { Page, expect } from '@playwright/test';

export class MantisPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async assertTitle() {
    await expect(this.page).toHaveTitle('Pengumuman IT');
  }

  async assertLoginSuccess() {
    await expect(this.page.getByRole('link', { name: 'Pengumuman IT' })).toBeVisible();
  }

  async goToMyView() {
    await this.page.getByRole('link', { name: ' My View' }).click();
  }

  async searchIssue(issueText: string) {
    const input = this.page.getByRole('textbox', { name: 'Issue #' });
    await input.fill(issueText);
    await input.press('Enter');
  }

  async assertApplicationError() {
    await expect(this.page.locator('#main-container')).toContainText('APPLICATION ERROR #203');
  }
}
