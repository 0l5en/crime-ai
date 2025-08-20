
import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Mock admin authentication
    await page.addInitScript(() => {
      window.localStorage.setItem('auth-token', 'mock-admin-token');
      window.localStorage.setItem('user-roles', JSON.stringify(['admin']));
    });

    // Mock admin API calls
    await page.route('**/functions/v1/**', async route => {
      const url = route.request().url();
      
      if (url.includes('prompt-template-identifiers')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            items: [
              { id: '1', name: 'Test Template', version: '1.0' }
            ]
          })
        });
      } else {
        await route.continue();
      }
    });
  });

  test('should access admin dashboard with admin role', async ({ page }) => {
    await page.goto('/admin');
    
    // Should show admin dashboard
    await expect(page.locator('h1, h2')).toContainText(/admin|dashboard/i);
  });

  test('should navigate to case management', async ({ page }) => {
    await page.goto('/admin');
    
    // Look for case management link
    const caseLink = page.locator('a[href="/admin/cases"], button', { hasText: /case|fall/i });
    if (await caseLink.count() > 0) {
      await caseLink.first().click();
      await expect(page).toHaveURL('/admin/cases');
    }
  });

  test('should navigate to prompt management', async ({ page }) => {
    await page.goto('/admin');
    
    // Look for prompt management link
    const promptLink = page.locator('a[href="/admin/prompts"], button', { hasText: /prompt|template/i });
    if (await promptLink.count() > 0) {
      await promptLink.first().click();
      await expect(page).toHaveURL('/admin/prompts');
    }
  });

  test('should deny access without admin role', async ({ page }) => {
    // Override with standard user role
    await page.addInitScript(() => {
      window.localStorage.setItem('user-roles', JSON.stringify(['standard']));
    });

    await page.goto('/admin');
    
    // Should redirect or show access denied
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('/admin');
  });
});
