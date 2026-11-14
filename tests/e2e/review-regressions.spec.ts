import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('sumire:intro', '1'))
})

test('all-language search finds a language that has not been visited', async ({ page }) => {
  await page.goto('/ja')
  await page.locator('.search-trigger').click()
  const search = page.locator('.site-search-dialog')
  await search.getByRole('checkbox').check()
  await search.getByRole('textbox').fill('เกี่ยวกับองค์กร')
  await expect(search.locator('a[href="/th/about"]')).toBeVisible()
  await expect(search.locator('a[href="/th/about"] strong')).toHaveText('เกี่ยวกับองค์กร')
})

test('ArrowUp from the search input focuses the last result', async ({ page }) => {
  await page.goto('/')
  await page.locator('.search-trigger').click()
  const search = page.locator('.site-search-dialog')
  await expect(search.locator('.search-result').first()).toBeVisible()
  await search.getByRole('textbox').focus()
  await page.keyboard.press('ArrowUp')
  await expect(search.locator('.search-result').last()).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(search.locator('.search-result').first()).toBeFocused()
})

test('search can retry after a translation request fails', async ({ page }) => {
  await page.route('**/_i18n/**/th/messages.json', route => route.abort())
  await page.goto('/')
  await page.locator('.search-trigger').click()
  const search = page.locator('.site-search-dialog')
  await expect(search.getByRole('alert')).toContainText('Search could not be loaded')
  await page.unroute('**/_i18n/**/th/messages.json')
  await search.getByRole('button', { name: 'Try again' }).click()
  await search.getByRole('checkbox').check()
  await search.getByRole('textbox').fill('เกี่ยวกับองค์กร')
  await expect(search.locator('a[href="/th/about"]')).toBeVisible()
})

test('settings and search remain usable on short landscape viewports', async ({ page }) => {
  await page.setViewportSize({ width: 812, height: 320 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Settings', exact: true }).click()
  const menu = page.locator('.settings-menu')
  await expect(menu).toBeVisible()
  expect(await menu.evaluate(el => el.getBoundingClientRect().bottom <= innerHeight)).toBe(true)
  await menu.getByRole('link', { name: 'Maven', exact: true }).scrollIntoViewIfNeeded()
  expect(await menu.getByRole('link', { name: 'Maven', exact: true }).evaluate(el => el.getBoundingClientRect().bottom <= innerHeight)).toBe(true)
  await page.getByRole('button', { name: 'Settings', exact: true }).click()
  await page.locator('.search-trigger').click()
  await expect(page.locator('.site-search-dialog .search-result').first()).toBeVisible()
  expect(await page.locator('.search-panel').evaluate(el => el.getBoundingClientRect().bottom <= innerHeight)).toBe(true)
  await page.locator('.search-result').last().scrollIntoViewIfNeeded()
  await expect(page.locator('.search-result').last()).toBeInViewport()
})
