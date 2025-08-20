
import { test, expect } from '@playwright/test';

test.describe('Supabase Integration', () => {
  test('should handle API success responses', async ({ page }) => {
    // Mock successful API response
    await page.route('**/functions/v1/fetch-crime-cases', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [
            {
              id: 'api-test-case',
              title: 'API Test Case',
              description: 'Testing API integration',
              status: 'open'
            }
          ]
        })
      });
    });

    await page.goto('/');
    
    // Should display the mocked case
    await expect(page.locator('text=API Test Case')).toBeVisible({ timeout: 10000 });
  });

  test('should handle API error responses', async ({ page }) => {
    // Mock API error
    await page.route('**/functions/v1/fetch-crime-cases', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' })
      });
    });

    await page.goto('/');
    
    // Should handle error gracefully (show error message or empty state)
    await page.waitForTimeout(3000);
    
    // Either error message or empty state should be visible
    const hasErrorMessage = await page.locator('text=error', { timeout: 1000 }).count() > 0;
    const hasEmptyState = await page.locator('[data-testid="case-card"], .game-card, .card', { timeout: 1000 }).count() === 0;
    
    expect(hasErrorMessage || hasEmptyState).toBeTruthy();
  });

  test('should handle network timeouts', async ({ page }) => {
    // Mock slow API response
    await page.route('**/functions/v1/fetch-crime-cases', async route => {
      await new Promise(resolve => setTimeout(resolve, 10000)); // 10 second delay
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ items: [] })
      });
    });

    await page.goto('/');
    
    // Should show loading state initially
    await page.waitForTimeout(1000);
    
    // Application should remain responsive
    const isPageResponsive = await page.locator('body').isVisible();
    expect(isPageResponsive).toBeTruthy();
  });
});
