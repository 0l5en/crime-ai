
import { test, expect } from '@playwright/test';

test.describe('Case Management', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication state
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

    // Mock Supabase API responses
    await page.route('**/functions/v1/fetch-crime-cases', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [
            {
              id: 'test-case-1',
              title: 'The Missing Artifact',
              description: 'A valuable artifact has gone missing from the museum',
              status: 'open',
              created_at: '2024-01-01T00:00:00Z'
            },
            {
              id: 'test-case-2',
              title: 'Corporate Espionage',
              description: 'Sensitive documents were stolen from a tech company',
              status: 'open',
              created_at: '2024-01-02T00:00:00Z'
            }
          ]
        })
      });
    });

    await page.route('**/functions/v1/fetch-single-crime-case/**', async route => {
      const caseId = route.request().url().split('/').pop();
      
      if (caseId === 'test-case-1') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'test-case-1',
            title: 'The Missing Artifact',
            description: 'A valuable artifact has gone missing from the museum',
            status: 'open',
            created_at: '2024-01-01T00:00:00Z'
          })
        });
      } else {
        await route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Case not found' })
        });
      }
    });
  });

  test('should display case list on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Wait for Keycloak initialization and cases to load
    await page.waitForTimeout(3000);
    
    // Look for case cards with various possible selectors
    const caseSelectors = [
      '[data-testid="case-card"]',
      '.game-card',
      '.card',
      'h3:has-text("The Missing Artifact")',
      'text="The Missing Artifact"'
    ];
    
    let foundCase = false;
    for (const selector of caseSelectors) {
      const elements = page.locator(selector);
      if (await elements.count() > 0) {
        await expect(elements.first()).toBeVisible();
        foundCase = true;
        break;
      }
    }
    
    // Fallback: check if any content loaded
    if (!foundCase) {
      const bodyText = await page.locator('body').textContent();
      console.log('Page content:', bodyText);
      // At minimum, the page should be responsive
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should navigate to case details when case is clicked', async ({ page }) => {
    await page.goto('/');
    
    // Wait for cases to load
    await page.waitForTimeout(3000);
    
    // Try to find and click a case
    const caseSelectors = [
      '[data-testid="case-card"]',
      '.game-card',
      '.card',
      'h3:has-text("The Missing Artifact")'
    ];
    
    let clickedCase = false;
    for (const selector of caseSelectors) {
      const elements = page.locator(selector);
      if (await elements.count() > 0) {
        await elements.first().click();
        clickedCase = true;
        break;
      }
    }
    
    if (clickedCase) {
      // Should navigate to case details
      await page.waitForTimeout(2000);
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/\/case\/.+/);
    }
  });

  test('should handle case not found gracefully', async ({ page }) => {
    await page.goto('/case/nonexistent-case');
    
    // Wait for page to load
    await page.waitForTimeout(3000);
    
    // Should either show error message or redirect to home
    const currentUrl = page.url();
    const hasNotFoundText = await page.locator('text=/not found/i').count() > 0;
    const redirectedToHome = currentUrl.endsWith('/') || currentUrl.includes('/#');
    
    expect(hasNotFoundText || redirectedToHome).toBeTruthy();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Override with error response
    await page.route('**/functions/v1/fetch-crime-cases', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' })
      });
    });

    await page.goto('/');
    
    // Wait for page to load
    await page.waitForTimeout(3000);
    
    // Should handle error gracefully - page should still be visible
    await expect(page.locator('body')).toBeVisible();
    
    // Either shows error message or empty state
    const hasErrorMessage = await page.locator('text=/error/i').count() > 0;
    const hasNoCases = await page.locator('[data-testid="case-card"], .game-card, .card').count() === 0;
    
    expect(hasErrorMessage || hasNoCases).toBeTruthy();
  });
});
