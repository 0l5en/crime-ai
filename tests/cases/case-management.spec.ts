
import { test, expect } from '@playwright/test';

test.describe('Case Management', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.addInitScript(() => {
      window.localStorage.setItem('auth-token', 'mock-token');
    });

    // Mock Supabase functions
    await page.route('**/functions/v1/fetch-crime-cases', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [
            {
              id: 'test-case-1',
              title: 'Test Crime Case',
              description: 'A test case for E2E testing',
              status: 'open',
              createdAt: '2024-01-01T00:00:00Z'
            }
          ]
        })
      });
    });
  });

  test('should display case list on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Wait for cases to load
    await page.waitForSelector('[data-testid="case-card"], .game-card, .card', { timeout: 10000 });
    
    // Should show at least one case
    const caseCards = page.locator('[data-testid="case-card"], .game-card, .card');
    await expect(caseCards.first()).toBeVisible();
  });

  test('should navigate to case details', async ({ page }) => {
    await page.goto('/');
    
    // Wait for cases to load
    await page.waitForSelector('[data-testid="case-card"], .game-card, .card', { timeout: 10000 });
    
    // Click on first case
    const firstCase = page.locator('[data-testid="case-card"], .game-card, .card').first();
    await firstCase.click();
    
    // Should navigate to case details
    await expect(page).toHaveURL(/\/case\/.+/);
  });

  test('should handle case not found', async ({ page }) => {
    // Mock 404 response for specific case
    await page.route('**/functions/v1/fetch-single-crime-case/nonexistent', async route => {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Case not found' })
      });
    });

    await page.goto('/case/nonexistent');
    
    // Should show error or redirect
    await expect(page.locator('text=not found')).toBeVisible({ timeout: 5000 })
      .catch(() => expect(page).toHaveURL('/')); // or redirect to home
  });
});
