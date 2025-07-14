import { test, expect } from '@playwright/test';

test.describe('Agora Community Footer', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`/home`);
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
});
