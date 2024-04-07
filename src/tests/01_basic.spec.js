import { test, expect } from '@playwright/test';

test.describe('Basic tests', async () => {

    test('basic page elements', async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/#/');
        await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
        await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
    });

    test('add some Todos', async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/#/');
        await page.getByPlaceholder('What needs to be done?').click();
        await page.getByPlaceholder('What needs to be done?').fill('buy a dog');
        await page.getByPlaceholder('What needs to be done?').press('Enter');
        await page.getByPlaceholder('What needs to be done?').fill('buy some dog food');
        await page.getByPlaceholder('What needs to be done?').press('Enter');
        await page.locator('li').filter({ hasText: 'buy a dog' }).getByLabel('Toggle Todo').check();
        await page.getByRole('link', { name: 'Active' }).click();
        await expect(page.getByText('buy some dog food')).toBeVisible();
        await expect(page.getByText('buy a dog')).not.toBeVisible();
        await page.getByRole('link', { name: 'Completed' }).click();
        await expect(page.getByText('buy a dog')).toBeVisible();
        await expect(page.getByText('buy some dog food')).not.toBeVisible();
    });

});
