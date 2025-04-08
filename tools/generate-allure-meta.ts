import fs from 'fs-extra';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const resultsDir = path.resolve(__dirname, '../allure-results');
const reportDir = path.resolve(__dirname, '../allure-report');
const historyFrom = path.join(reportDir, 'history');
const historyTo = path.join(resultsDir, 'history');

// Pastikan folder allure-results ada
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir);
  console.log('📁 Created allure-results directory');
}

// Copy trend history dari report sebelumnya
if (fs.existsSync(historyFrom)) {
  fs.copySync(historyFrom, historyTo);
  console.log('📊 Copied previous history for trend support');
}

// Generate executor.json
const executor = {
  name: 'Local Machine',
  type: 'local',
  url: 'http://localhost:3000',
  buildOrder: 1,
  buildName: 'Playwright Test',
  buildUrl: 'http://localhost:3000/build/1',
  reportUrl: 'http://localhost:3000/report',
};
fs.writeJsonSync(path.join(resultsDir, 'executor.json'), executor, { spaces: 2 });
console.log('🛠️ Generated executor.json');

// Generate environment.properties
const environment = `
Browser=${process.env.Browser || 'chromium'}
BaseURL=${process.env.BASE_URL || 'http://localhost:3000'}
Environment=${process.env.Environment || 'development'}
`.trim();
fs.writeFileSync(path.join(resultsDir, 'environment.properties'), environment);
console.log('🌿 Generated environment.properties');

// Generate categories.json
const categories = [
  {
    name: 'AssertionError',
    matchedStatuses: ['failed'],
    messageRegex: '.*expect.*toBe.*',
  },
  {
    name: 'TimeoutError',
    matchedStatuses: ['broken'],
    messageRegex: '.*Timeout.*',
  },
];
fs.writeJsonSync(path.join(resultsDir, 'categories.json'), categories, { spaces: 2 });
console.log('🏷️ Generated categories.json');

console.log('✅ Allure metadata generation complete');
