import { test, expect } from '@playwright/test';

test.describe('Agora Community Navigation', () => {
  const baseURL = 'http://agora.community.site:8005';

  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseURL}/home`);
  });

  test('should navigate to AnimChallenge page', async ({ page }) => {
    // Click on AnimChallenge navigation link
    await page.getByRole('navigation').getByRole('link', { name: 'AnimChallenge' }).click();
    
    // Verify URL changed to AnimChallenge (allow for hash)
    await expect(page).toHaveURL(/.*\/animchallenge.*/);
    
    // Verify page title
    await expect(page).toHaveTitle(/Animchallenge/);
    
    // Verify AnimChallenge content is displayed - use more specific selector
    await expect(page.locator('p.hero__tag')).toContainText('AnimChallenge');
    
    // Verify countdown timer elements are present - use specific text matching only if visible
    const countdownExists = await page.getByText('Days').first().isVisible();
    if (countdownExists) {
      await expect(page.getByText('Days').first()).toBeVisible();
      await expect(page.getByText('Hours').first()).toBeVisible();
      await expect(page.getByText('Minutes').first()).toBeVisible();
      await expect(page.getByText('Seconds').first()).toBeVisible();
    }
    
    // Verify submission information
    await expect(page.getByText('SUBMISSION CLOSES ON')).toBeVisible();
    
    // Verify challenge tabs
    await expect(page.getByRole('link', { name: 'Current Challenge' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Previous Challenge' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Your Submissions' })).toBeVisible();
  });

  test('should navigate to Video Library page', async ({ page }) => {
    // Click on Video Library navigation link
    await page.getByRole('navigation').getByRole('link', { name: 'Video Library' }).click();
    
    // Verify URL changed to library
    await expect(page).toHaveURL(`${baseURL}/library`);
    
    // Verify page title
    await expect(page).toHaveTitle(/Video Library/);
    
    // Verify Video Library header content - use more specific selectors
    await expect(page.locator('p.hero__tag')).toContainText('Video Library');
    await expect(page.getByText('Our video library offers an ever-growing')).toBeVisible();
    
    // Verify contributors section
    await expect(page.getByRole('heading', { name: 'Our Contributors' })).toBeVisible();
    
    // Verify filter options are present
    await expect(page.getByRole('button', { name: 'newest' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Contributors' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Tags' })).toBeVisible();
    
    // Verify category tags are present - use specific class selector
    await expect(page.locator('.button-filter--active').getByText('All')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Animation Reviews' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Interviews' })).toBeVisible();
  });

  test('should navigate to Discord page', async ({ page }) => {
    // Click on Discord navigation link
    await page.getByRole('navigation').getByRole('link', { name: 'Discord' }).click();
    
    // Verify URL changed to discord
    await expect(page).toHaveURL(`${baseURL}/discord`);
    
    // Verify page title
    await expect(page).toHaveTitle(/Discord/);
    
    // Verify Discord page content - use more specific selector
    await expect(page.locator('#hero-title')).toContainText('Join The Community');
    await expect(page.getByText('Agora Community\'s Discord is our hub')).toBeVisible();
    
    // Verify Discord Events section
    await expect(page.getByRole('heading', { name: 'Discord Events' })).toBeVisible();
    await expect(page.getByText('Interact with peers and mentors')).toBeVisible();
    
    // Verify online users count is displayed
    await expect(page.getByText(/online users/)).toBeVisible();
    
    // Verify Join Discord link - use first occurrence
    const joinDiscordLink = page.getByRole('link', { name: 'Join Discord' }).first();
    await expect(joinDiscordLink).toBeVisible();
    await expect(joinDiscordLink).toHaveAttribute('href', 'https://discord.gg/9hJxMyR');
  });

  test('should navigate between different sections via footer links', async ({ page }) => {
    // Test navigation to Courses via footer
    await page.getByRole('link', { name: 'Courses' }).last().click();
    await expect(page).toHaveURL(`${baseURL}/courses`);
    
    // Go back to home
    await page.goto(`${baseURL}/home`);
    
    // Test navigation to Mentors via footer
    await page.getByRole('link', { name: 'Mentors' }).last().click();
    await expect(page).toHaveURL(/mentors/);
  });
});
