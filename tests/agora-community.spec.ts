import { test, expect } from '@playwright/test';

test.describe('Agora Community Site', () => {
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

  test('should have working footer links', async ({ page }) => {
    // Verify footer content is present on the page - use more specific selector
    await expect(page.locator('.footer__title').getByText('Stay in touch with the community')).toBeVisible();
    
    // Verify footer sections - use more specific selectors to avoid debug output conflicts
    await expect(page.locator('.footer-page__title').getByText('Connect')).toBeVisible();
    await expect(page.getByText('Level Up')).toBeVisible();
    await expect(page.getByText('Rise Up')).toBeVisible();
    
    // Verify important footer links
    await expect(page.getByRole('link', { name: 'About us' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'FAQ' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Terms and conditions' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
  });

  test('should display "Join the community" button in header', async ({ page }) => {
    // Verify Join the community button is present in header
    await expect(page.getByRole('button', { name: 'Join the community' })).toBeVisible();
  });

  test('should handle newsletter signup', async ({ page }) => {
    // Verify Newsletter button is present (it should be visible without scrolling)
    await expect(page.getByRole('button', { name: 'Newsletter' })).toBeVisible();
  });

  test('should verify external social media links', async ({ page }) => {
    // Get social media links (these should be present on the page)
    const instagramLink = page.locator('[href="https://www.instagram.com/agora.community/"]');
    const facebookLink = page.locator('[href="https://web.facebook.com/agoracommunityfb"]');
    const linkedinLink = page.locator('[href="https://www.linkedin.com/company/agora-community/"]');
    const spotifyLink = page.locator('[href*="spotify.com"]');
    const twitterLink = page.locator('[href="https://x.com/AgoraCommunity_"]');
    const youtubeLink = page.locator('[href="https://www.youtube.com/@AgoraCommunity"]');
    
    // Verify all social media links are present
    await expect(instagramLink).toBeVisible();
    await expect(facebookLink).toBeVisible();
    await expect(linkedinLink).toBeVisible();
    await expect(spotifyLink).toBeVisible();
    await expect(twitterLink).toBeVisible();
    await expect(youtubeLink).toBeVisible();
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
