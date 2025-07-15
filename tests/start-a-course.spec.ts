import { test, expect } from '@playwright/test';

test('should start a course', async ({ page }) => {
  await page.goto('/home');
  await page.getByRole('banner').getByRole('button', { name: 'Join the community' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('user@example.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('list').getByRole('link', { name: 'Courses' }).click();
  await page.locator('[id^="thumbnail-"] > a').first().click();
  await page.getByRole('link', { name: 'Start the course' }).click();
  //it should see play video button
  await expect(page.getByRole('button', { name: 'Play Video' })).toBeVisible();
  await page.getByRole('button', { name: 'Play Video' }).click();
});