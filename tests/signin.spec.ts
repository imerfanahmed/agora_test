import { test, expect } from '@playwright/test';
test('should sign in successfully', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('banner').getByRole('button', { name: 'Join the community' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('user@example.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.goto('/profile/show');
  await expect(page.getByRole('paragraph').filter({ hasText: 'User User' })).toBeVisible();
});