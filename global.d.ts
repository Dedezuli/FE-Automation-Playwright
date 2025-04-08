// global.d.ts
import type { AllureTest } from 'allure-playwright';

declare module '@playwright/test' {
  interface TestInfo {
    allure: AllureTest;
  }
}
