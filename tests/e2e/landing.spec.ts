import { test, expect } from '@playwright/test';

test('landing page renders hero + install snippets', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Daily Soup' })).toBeVisible();
  await expect(page.getByText('script src="https://daily-soup-widget.vercel.app/embed.js"')).toBeVisible();
  await expect(page.getByText("npm install daily-soup-widget")).toBeVisible();
});

test('widget mounts and renders a quote inside its shadow root', async ({ page }) => {
  await page.goto('/');

  const host = page.locator('[data-daily-soup-host]').first();
  await expect(host).toBeVisible();

  // Shadow DOM piercing via locator is automatic in Playwright. not.toBeEmpty auto-waits
  // until the skeleton swaps to the real quote text.
  const quote = host.locator('.ds-quote');
  await expect(quote).toBeVisible({ timeout: 5000 });
  await expect(quote).not.toBeEmpty({ timeout: 5000 });
});

test('powered-by link is present in every mounted widget', async ({ page }) => {
  await page.goto('/');
  const powered = page.locator('.ds-powered a:has-text("mshmwr")');
  await expect(powered).toHaveCount(3, { timeout: 5000 });
});
