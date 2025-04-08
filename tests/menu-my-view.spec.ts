import { test } from '@playwright/test';
import { MantisPage } from '../pages/MantisPage';
import { login } from '../helper/loginHelper';
import { credentials } from '../data/credentials';
import { setAllureMeta } from '../helper/allureHelper';

test.describe('Menu My View', () => {
  let mantis: MantisPage;

  test.beforeAll(() => {
    setAllureMeta({
      feature: 'My View Search',
      owner: 'Dede',
    });
  });

  test.beforeEach(async ({ page }) => {
    mantis = new MantisPage(page);
    await mantis.goto();
    await login(page, credentials.username, credentials.password);
    await mantis.assertLoginSuccess();
  });

  test('can search issue and see error message', async ({}, testInfo) => {
    setAllureMeta({ severity: 'normal' });  
    await mantis.goToMyView();
    await mantis.searchIssue('dede');
    await mantis.assertApplicationError();
  });

  test('can search issue and see error message again', async ({}, testInfo) => {
    setAllureMeta({ severity: 'critical' });
    await mantis.goToMyView();
    await mantis.searchIssue('dede');
    await mantis.assertApplicationError();
  });
});
