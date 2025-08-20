
import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test('should display mobile-friendly hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check that hero title is visible and properly sized
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
    
    // Title should not overflow
    const titleBox = await heroTitle.boundingBox();
    const viewportSize = page.viewportSize();
    
    if (titleBox && viewportSize) {
      expect(titleBox.width).toBeLessThanOrEqual(viewportSize.width);
    }
  });

  test('should handle mobile navigation', async ({ page }) => {
    await page.goto('/');
    
    // Look for mobile menu button (hamburger, etc.)
    const mobileMenuButton = page.locator('button[aria-label*="menu"], .navbar-toggler, [data-testid="mobile-menu"]');
    
    if (await mobileMenuButton.count() > 0) {
      await mobileMenuButton.click();
      
      // Menu should be visible
      const mobileMenu = page.locator('.navbar-collapse, .mobile-menu, [data-testid="mobile-nav"]');
      await expect(mobileMenu).toBeVisible();
    }
  });

  test('should display case cards in mobile layout', async ({ page }) => {
    // Mock cases data
    await page.route('**/functions/v1/fetch-crime-cases', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [
            { id: '1', title: 'Mobile Test Case', description: 'Test case', status: 'open' },
            { id: '2', title: 'Another Case', description: 'Another test', status: 'open' }
          ]
        })
      });
    });

    await page.goto('/');
    
    // Wait for cases to load
    await page.waitForSelector('[data-testid="case-card"], .game-card, .card', { timeout: 10000 });
    
    // Cases should be stacked vertically on mobile
    const caseCards = page.locator('[data-testid="case-card"], .game-card, .card');
    const cardCount = await caseCards.count();
    
    if (cardCount > 1) {
      const firstCard = caseCards.first();
      const secondCard = caseCards.nth(1);
      
      const firstBox = await firstCard.boundingBox();
      const secondBox = await secondCard.boundingBox();
      
      if (firstBox && secondBox) {
        // Second card should be below the first (mobile stacking)
        expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height - 50); // Allow some overlap
      }
    }
  });

  test('should handle touch interactions', async ({ page }) => {
    await page.goto('/');
    
    // Test touch/tap interactions
    const interactiveElements = page.locator('button, a, [role="button"]');
    const elementCount = await interactiveElements.count();
    
    if (elementCount > 0) {
      const firstElement = interactiveElements.first();
      await firstElement.tap();
      
      // Should respond to tap (no specific assertion, just ensuring no crash)
      await page.waitForTimeout(500);
    }
  });
});
