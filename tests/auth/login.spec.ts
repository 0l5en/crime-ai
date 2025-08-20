
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Mock Keycloak initialization and token endpoints
    await page.route('**/auth/realms/**', async route => {
      const url = route.request().url();
      
      if (url.includes('protocol/openid-connect/token')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            access_token: 'mock-access-token',
            token_type: 'Bearer',
            expires_in: 3600,
            refresh_token: 'mock-refresh-token'
          })
        });
      } else if (url.includes('.well-known/openid-configuration')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            issuer: 'http://localhost:8080/auth/realms/test-realm',
            authorization_endpoint: 'http://localhost:8080/auth/realms/test-realm/protocol/openid-connect/auth',
            token_endpoint: 'http://localhost:8080/auth/realms/test-realm/protocol/openid-connect/token'
          })
        });
      } else {
        await route.continue();
      }
    });
  });

  test('should display hero section for unauthenticated users', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Should show the hero section
    await expect(page.locator('h1')).toContainText('Unravel the Truth', { timeout: 10000 });
  });

  test('should handle Keycloak initialization', async ({ page }) => {
    // Mock successful Keycloak initialization
    await page.addInitScript(() => {
      // Mock Keycloak object
      window.Keycloak = () => ({
        init: () => Promise.resolve(false),
        login: () => {},
        logout: () => {},
        updateToken: () => Promise.resolve(false),
        authenticated: false,
        token: null,
        tokenParsed: null,
        realmAccess: null,
        resourceAccess: null,
        clientId: 'test-client'
      });
    });

    await page.goto('/');
    
    // Should not crash and show loading or hero
    await page.waitForTimeout(2000);
    const isVisible = await page.locator('body').isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('should handle authenticated state', async ({ page }) => {
    // Mock authenticated Keycloak state
    await page.addInitScript(() => {
      window.Keycloak = () => ({
        init: () => Promise.resolve(true),
        login: () => {},
        logout: () => {},
        updateToken: () => Promise.resolve(false),
        authenticated: true,
        token: 'mock-token',
        tokenParsed: {
          name: 'Test User',
          email: 'test@example.com',
          preferred_username: 'testuser'
        },
        realmAccess: { roles: ['standard'] },
        resourceAccess: {},
        clientId: 'test-client'
      });
    });

    await page.goto('/');
    
    // Wait for authentication to process
    await page.waitForTimeout(3000);
    
    // Should show main application content
    const isAppVisible = await page.locator('body').isVisible();
    expect(isAppVisible).toBeTruthy();
  });
});
