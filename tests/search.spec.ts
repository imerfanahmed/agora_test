import { test, expect } from '@playwright/test';

test.describe('Agora Community Search Functionality', () => {


  test.beforeEach(async ({ page }) => {
    await page.goto(`/home`);
  });

  test('should have functional search feature', async ({ page }) => {
    // Click on search textbox
    await page.getByRole('textbox', { name: 'Search' }).click();
    
    // Verify search interface opens - use first() to avoid strict mode violation
    await expect(page.getByText('Popular search').first()).toBeVisible();
    
    // Verify popular search tags are displayed
    await expect(page.getByRole('button', { name: 'Blender' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unreal' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'AnimChallenge' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Animation Reviews' })).toBeVisible();
    
    // Test typing in search
    await page.getByRole('textbox', { name: 'Search' }).fill('animation');
    
    // Verify URL updates with search parameter
    await expect(page).toHaveURL(/s=animation/);
    
    // Verify search results interface - use first occurrence
    await expect(page.getByText('Searched Tags:').first()).toBeVisible();
  });
});
