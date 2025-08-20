
import { Page } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  async mockAuthentication(role: 'admin' | 'standard' = 'standard') {
    await this.page.addInitScript((userRole) => {
      window.localStorage.setItem('auth-token', 'mock-token');
      window.localStorage.setItem('user-roles', JSON.stringify([userRole]));
    }, role);
  }

  async mockSupabaseFunction(functionName: string, response: any, status: number = 200) {
    await this.page.route(`**/functions/v1/${functionName}*`, async route => {
      await route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify(response)
      });
    });
  }

  async waitForCasesToLoad() {
    await this.page.waitForSelector(
      '[data-testid="case-card"], .game-card, .card', 
      { timeout: 10000 }
    );
  }

  async navigateToCase(caseId: string) {
    await this.page.goto(`/case/${caseId}`);
  }

  async mockCrimeCase(caseId: string, caseData: any) {
    await this.mockSupabaseFunction(`fetch-single-crime-case/${caseId}`, caseData);
  }

  async mockCrimeCases(cases: any[]) {
    await this.mockSupabaseFunction('fetch-crime-cases', { items: cases });
  }

  async takeScreenshotOnFailure(testName: string) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${testName}-${Date.now()}.png`,
      fullPage: true 
    });
  }
}

export const mockData = {
  crimeCase: {
    id: 'test-case-1',
    title: 'The Missing Diamond',
    description: 'A valuable diamond has gone missing from the museum.',
    status: 'open',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  
  crimeCases: [
    {
      id: 'case-1',
      title: 'The Art Heist',
      description: 'Famous painting stolen from gallery',
      status: 'open'
    },
    {
      id: 'case-2', 
      title: 'The Corporate Fraud',
      description: 'Embezzlement at tech company',
      status: 'closed'
    }
  ],

  crimeScene: {
    id: 'scene-1',
    caseId: 'test-case-1',
    description: 'Museum main hall',
    evidence: ['fingerprints', 'security_footage']
  },

  suspects: [
    {
      id: 'suspect-1',
      name: 'John Doe',
      description: 'Former employee',
      alibi: 'Claims to be at home'
    }
  ]
};
