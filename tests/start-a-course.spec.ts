import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Perform login once before each test
  await page.goto('/home');
  await page.getByRole('banner').getByRole('button', { name: 'Join the community' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('user@example.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Continue' }).click();
});

test('should start a course', async ({ page }) => {
  await page.getByRole('list').getByRole('link', { name: 'Courses' }).click();
  await page.getByRole('link', { name: 'First Course Title' }).click();
  await page.getByRole('link', { name: 'Start the course' }).click();
  await expect(page.getByRole('button', { name: 'Play Video' })).toBeVisible();
  await page.getByRole('button', { name: 'Play Video' }).click();
});

test('should view course details', async ({ page }) => {
  await page.getByRole('list').getByRole('link', { name: 'Courses' }).click();
  await page.getByRole('link', { name: 'First Course Title' }).click();
  await expect(page.getByRole('heading', { name: 'Course Details' })).toBeVisible();
});

test('should navigate to profile page', async ({ page }) => {
  await page.getByRole('banner').getByRole('link', { name: 'Profile' }).click();
  await expect(page.getByRole('heading', { name: 'Your Profile' })).toBeVisible();
});