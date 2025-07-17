import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from .env file if needed.
 * Uncomment below to use dotenv.
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Playwright Test Configuration.
 * Full documentation: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  timeout: 30 * 1000, // Global timeout per test
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,

  reporter: 'html',

  use: {
    baseURL: 'http://127.0.0.1:8000/',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--use-gl=desktop',
            '--enable-gpu',
            '--ignore-gpu-blocklist',
            '--enable-webgl',
          ],
        },
      },
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     launchOptions: {
    //     },
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     launchOptions: {
    //     },
    //   },
    // },

    // Enable if you want to test mobile devices
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // Enable if you want to test branded browsers
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // Optional: Start dev server before tests
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
