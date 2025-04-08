import { Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  await page.getByRole('textbox', { name: '' }).fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}
