// =====================================================================
// Playwright Configuration
// Enterprise-standard settings: parallel execution, HTML reporting,
// trace capture on retry, and automatic failure screenshots.
// =====================================================================

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directory where all test spec files are located
  testDir: './tests',

  // Run test files in parallel across available CPU cores to
  // minimize total suite execution time
  fullyParallel: true,

  // Fail the CI build if test.only is accidentally left in the code
  forbidOnly: !!process.env.CI,

  // Retry failed tests automatically in CI environments to absorb
  // transient/network flakiness, but not during local development
  retries: process.env.CI ? 2 : 0,

  // Limit parallel workers in CI to avoid resource contention;
  // let Playwright auto-detect the optimal count locally
  workers: process.env.CI ? 1 : undefined,

  // Generate an interactive HTML report after every test run
  reporter: 'html',

  use: {
    // Capture a trace only when a test is retried after failing,
    // giving full step-by-step debugging detail without bloating
    // storage on every successful run
    trace: 'on-first-retry',

    // Automatically capture a screenshot when a test fails, to
    // speed up root-cause analysis without manual reproduction
    screenshot: 'only-on-failure',
  },

  // Define the browser target(s) the suite runs against
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
