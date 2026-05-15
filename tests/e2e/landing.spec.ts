import { test, expect } from '@playwright/test';

test('landing page renders hero + install snippets', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Daily Soup' })).toBeVisible();
  await expect(page.getByText('script src="https://daily-soup.vercel.app/embed.js"')).toBeVisible();
  await expect(page.getByText("npm install daily-soup-widget")).toBeVisible();
});

test('widget mounts and renders a quote inside its shadow root', async ({ page }) => {
  await page.goto('/');

  // The first demo host
  const host = page.locator('[data-daily-soup-host]').first();
  await expect(host).toBeVisible();

  // Wait for content to fetch + render. Shadow DOM piercing via locator is automatic in Playwright.
  const quote = host.locator('.ds-quote');
  await expect(quote).toBeVisible({ timeout: 5000 });
  const text = await quote.textContent();
  expect(text?.trim().length ?? 0).toBeGreaterThan(0);
});

test('powered-by link is present in every mounted widget', async ({ page }) => {
  await page.goto('/');
  const poweredCount = await page.locator('.ds-powered a:has-text("coco-c.dev")').count();
  expect(poweredCount).toBeGreaterThanOrEqual(3);
});
