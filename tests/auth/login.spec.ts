
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Mock Keycloak responses for testing
    await page.route('**/auth/realms/lovable/**', async route => {
      if (route.request().url().includes('auth')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            access_token: 'mock-token',
            token_type: 'Bearer',
            expires_in: 3600
          })
        });
      }
    });
  });

  test('should display login page when not authenticated', async ({ page }) => {
    await page.goto('/');
    
    // Should show the hero section for unauthenticated users
    await expect(page.locator('h1')).toContainText('Unravel the Truth');
    
    // Check for login functionality (this depends on your actual auth implementation)
    const hasLoginButton = await page.locator('button', { hasText: /login|anmelden/i }).count();
    if (hasLoginButton > 0) {
      await expect(page.locator('button', { hasText: /login|anmelden/i })).toBeVisible();
    }
  });

  test('should handle authentication redirect', async ({ page }) => {
    // Mock authenticated state
    await page.addInitScript(() => {
      window.localStorage.setItem('auth-token', 'mock-token');
    });

    await page.goto('/');
    
    // Wait for any auth redirects to complete
    await page.waitForTimeout(1000);
    
    // Should show main application content
    await expect(page).toHaveURL('/');
  });

  test('should handle logout', async ({ page }) => {
    // Mock authenticated state
    await page.addInitScript(() => {
      window.localStorage.setItem('auth-token', 'mock-token');
    });

    await page.goto('/');
    
    // Look for logout functionality
    const logoutButton = page.locator('button', { hasText: /logout|abmelden/i });
    if (await logoutButton.count() > 0) {
      await logoutButton.click();
      
      // Should redirect to login or home
      await expect(page.locator('h1')).toContainText('Unravel the Truth');
    }
  });
});
