// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 10*1000,  /* 40 seconds  global timeout value change*/

  expect: {  

    timeout: 5*1000,  /* Maximum time expect() should wait, overriding assertion timeout */

  },
  
  fullyParallel: false,  /* Run tests in files in parallel */
  
  forbidOnly: !!process.env.CI,  /* Fail the build on CI if you accidentally left test.only in the source code. */
  
  retries: process.env.CI ? 2 : 0,  /* Retry on CI only */
 
  workers: process.env.CI ? 1 : undefined,   /* Opt out of parallel tests on CI. */
 
  reporter: 'html',   /* Reporter to use. See https://playwright.dev/docs/test-reporters */


  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //browserName: 'chromium',  /* Browser name to use. */
    headless: true,  /* Run tests in headless mode.  */
    
    trace: 'on-first-retry', /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

   
  ],

  
});

