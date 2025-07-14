import { test, expect } from '@playwright/test';

test.describe('Agora Community Homepage', () => {
  const baseURL = 'http://agora.community.site:8005';

  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseURL}/home`);
  });

  test('should load the homepage successfully', async ({ page }) => {
    // Verify the page title contains "Agora"
    await expect(page).toHaveTitle(/Agora/);
    
    // Verify main navigation elements are present - using navigation role to be more specific
    await expect(page.getByRole('link', { name: 'Homepage' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Discord' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Live events' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Mentors' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Courses' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Video Library' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'AnimChallenge' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Assets' })).toBeVisible();
  });

  test('should display featured content section', async ({ page }) => {
    // Verify featured content section exists
    await expect(page.getByText('Featured Content')).toBeVisible();
    
    // Verify that featured content cards are displayed
    const featuredCards = page.locator('article').first();
    await expect(featuredCards).toBeVisible();
  });

  test('should display Join Discord section', async ({ page }) => {
    // Verify Discord section is present
    await expect(page.getByRole('heading', { name: 'Join Discord' })).toBeVisible();
    
    // Verify Discord description text
    await expect(page.getByText('Agora Community\'s Discord is our hub for live events')).toBeVisible();
    
    // Verify Join Discord link is present and functional
    const discordLink = page.getByRole('link', { name: 'Join Discord' }).first();
    await expect(discordLink).toBeVisible();
    await expect(discordLink).toHaveAttribute('href', 'https://discord.com/invite/9hJxMyR');
  });

  test('should display mentors section with mentor profiles', async ({ page }) => {
    // Verify Mentors link is visible
    await expect(page.getByRole('link', { name: 'Mentors' }).first()).toBeVisible();
    await expect(page.getByText('Get personalized animation guidance and feedback')).toBeVisible();
    
    // Verify mentor profiles are displayed
    await expect(page.getByText('View Profile').first()).toBeVisible();
    
    // Verify at least one mentor name is visible
    await expect(page.getByRole('heading', { level: 3 }).first()).toBeVisible();
  });

  test('should display main sections (Courses, Assets, Video Library)', async ({ page }) => {
    // Verify Courses section
    await expect(page.getByRole('heading', { name: 'Courses' })).toBeVisible();
    await expect(page.getByText('Learn with our ever-growing library of courses')).toBeVisible();
    
    // Verify Assets section
    await expect(page.getByRole('heading', { name: 'Assets' })).toBeVisible();
    await expect(page.getByText('A library of assets and character rigs')).toBeVisible();
    
    // Verify Video Library section
    await expect(page.getByRole('heading', { name: 'Video Library' })).toBeVisible();
    await expect(page.getByText('Explore our curated video collection')).toBeVisible();
  });

  test('should display "Join the community" button in header', async ({ page }) => {
    // Verify Join the community button is present in header
    await expect(page.getByRole('button', { name: 'Join the community' })).toBeVisible();
  });

  test('should handle newsletter signup', async ({ page }) => {
    // Verify Newsletter button is present (it should be visible without scrolling)
    await expect(page.getByRole('button', { name: 'Newsletter' })).toBeVisible();
  });
});
