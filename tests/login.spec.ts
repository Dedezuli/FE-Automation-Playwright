import { test } from '@playwright/test';
import { MantisPage } from '../pages/MantisPage';
import { login } from '../helper/loginHelper';
import { credentials } from '../data/credentials';
import { setAllureMeta } from '../helper/allureHelper';

test.describe('Login', () => {

    test.beforeAll(() => {
      setAllureMeta({
        feature: 'Login',
        owner: 'Dede',
      });
    });

test('dashboard login should be accessed', async ({ page }) => {
  const mantis = new MantisPage(page);
  await mantis.goto();
  await mantis.assertTitle();
});

test('user should login successfully with valid credentials', async ({ page }) => {
  const mantis = new MantisPage(page);
  await mantis.goto();
  await login(page, credentials.username, credentials.password);
  await mantis.assertLoginSuccess();
});
})
