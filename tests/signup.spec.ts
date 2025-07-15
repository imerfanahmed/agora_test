import { test, expect } from '@playwright/test';

test('test', async ({ page, context }) => {
  await page.goto('/');
  await page.getByRole('banner').getByRole('button', { name: 'Join the community' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('erfan.siam@agora.studio');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('password');
  await page.getByRole('textbox', { name: 'Password confirmation' }).click();
  await page.getByRole('textbox', { name: 'Password confirmation' }).fill('password');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'First name' }).click();
  await page.getByRole('textbox', { name: 'First name' }).fill('Erfan Ahmed');
  await page.getByRole('textbox', { name: 'First name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last name' }).fill('Siam');
  await page.getByRole('textbox', { name: 'Last name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Username' }).fill('imerfanahmed');
  await page.locator('label').filter({ hasText: 'Terms conditions' }).locator('span').first().click();
  await page.locator('label').filter({ hasText: 'Privacy Policy' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Accept all' }).click();
  
  // Create a new page for the email verification
  const page1 = await context.newPage();
  await page1.goto('http://127.0.0.1:8025/');
  await page1.getByText('Agora Community Development Site erfan.siam@agora.studio Agora.community:').first().click();
  const page2Promise = page1.waitForEvent('popup');
  await page1.locator('#preview-html').contentFrame().getByRole('link', { name: 'Verify E-mail Address' }).click();
  const page2 = await page2Promise;
  await page2.getByRole('button', { name: 'My avatar' }).click();
  await page2.getByRole('link', { name: 'My Account Settings' }).click();
  await expect(page2.getByRole('heading', { name: 'Account Information' })).toBeVisible();
  await expect(page2.getByRole('textbox', { name: 'Username' })).toBeVisible();
  await expect(page2.getByRole('textbox', { name: 'Username' })).toHaveValue('imerfanahmed');
});