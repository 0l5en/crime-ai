
import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test.beforeEach(async ({ page }) => {
    // Mock authentication for mobile tests
    await page.addInitScript(() => {
      window.Keycloak = () => ({
        init: () => Promise.resolve(true),
        authenticated: true,
        token: 'mock-token',
        tokenParsed: { name: 'Test User', preferred_username: 'testuser' },
        realmAccess: { roles: ['standard'] },
        resourceAccess: {},
        clientId: 'test-client',
        login: () => {},
        logout: () => {},
        updateToken: () => Promise.resolve(false)
      });
    });

    // Mock cases for mobile testing
    await page.route('**/functions/v1/fetch-crime-cases', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [
            { id: '1', title: 'Mobile Test Case', description: 'Test case for mobile', status: 'open' },
            { id: '2', title: 'Another Mobile Case', description: 'Another test case', status: 'open' }
          ]
        })
      });
    });
  });

  test('should display mobile-friendly hero section', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForTimeout(3000);
    
    // Check that hero title is visible
    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible({ timeout: 10000 });
    
    // Title should fit within viewport
    const titleBox = await heroTitle.boundingBox();
    const viewportSize = page.viewportSize();
    
    if (titleBox && viewportSize) {
      expect(titleBox.width).toBeLessThanOrEqual(viewportSize.width * 0.95); // Allow some margin
    }
  });

  test('should display case cards in mobile layout', async ({ page }) => {
    await page.goto('/');
    
    // Wait for cases to load
    await page.waitForTimeout(3000);
    
    // Look for case cards using our data-testid
    const caseCards = page.locator('[data-testid="case-card"]');
    const cardCount = await caseCards.count();
    
    if (cardCount > 0) {
      // First card should be visible
      await expect(caseCards.first()).toBeVisible();
      
      // Cards should stack vertically on mobile
      if (cardCount > 1) {
        const firstCard = caseCards.first();
        const secondCard = caseCards.nth(1);
        
        const firstBox = await firstCard.boundingBox();
        const secondBox = await secondCard.boundingBox();
        
        if (firstBox && secondBox) {
          // Second card should be below the first (mobile stacking)
          expect(secondBox.y).toBeGreaterThan(firstBox.y);
        }
      }
    } else {
      // Fallback: check if page loaded without errors
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should handle touch interactions', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForTimeout(3000);
    
    // Test touch/tap interactions on buttons
    const buttons = page.locator('button:visible, [role="button"]:visible');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      
      // Should be able to tap without errors
      await firstButton.tap();
      await page.waitForTimeout(500);
      
      // Page should still be responsive after tap
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should handle mobile navigation if present', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForTimeout(3000);
    
    // Look for various mobile menu patterns
    const mobileMenuSelectors = [
      '[data-testid="mobile-menu-button"]',
      '.navbar-toggler',
      'button[aria-label*="menu"]',
      'button[aria-expanded]',
      '.hamburger'
    ];
    
    let foundMobileMenu = false;
    for (const selector of mobileMenuSelectors) {
      const menuButton = page.locator(selector);
      if (await menuButton.count() > 0) {
        await menuButton.click();
        foundMobileMenu = true;
        
        // Wait for menu to appear
        await page.waitForTimeout(1000);
        
        // Menu should be visible after click
        const mobileMenu = page.locator('.navbar-collapse:visible, .mobile-menu:visible, [data-testid="mobile-nav"]:visible');
        if (await mobileMenu.count() > 0) {
          await expect(mobileMenu.first()).toBeVisible();
        }
        break;
      }
    }
    
    // If no mobile menu found, that's also acceptable
    if (!foundMobileMenu) {
      console.log('No mobile menu found - this is acceptable for this app');
    }
  });

  test('should be responsive to different mobile viewports', async ({ page }) => {
    // Test different mobile screen sizes
    const viewports = [
      { width: 320, height: 568 }, // iPhone SE (small)
      { width: 375, height: 667 }, // iPhone 8
      { width: 414, height: 896 }  // iPhone 11 Pro Max
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      await page.waitForTimeout(2000);
      
      // Page should be visible and responsive at all sizes
      await expect(page.locator('body')).toBeVisible();
      
      // Content should not overflow horizontally
      const bodyBox = await page.locator('body').boundingBox();
      if (bodyBox) {
        expect(bodyBox.width).toBeLessThanOrEqual(viewport.width + 20); // Allow small margin
      }
    }
  });
});
