import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:8005/');
  await page.getByRole('banner').getByRole('button', { name: 'Join the community' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('user@example.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'My avatar' }).click();
  await page.goto('/profile/settings');
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('First Name');
  await page.getByRole('textbox', { name: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Last Name');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('updatedusernames');
  await page.locator('body > main > div.profile-settings > div.profile-settings__content > form > div.profile-settings__navigation > div > button').click();
  await expect(page.getByRole('heading', { name: 'Your account has successfully' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
});