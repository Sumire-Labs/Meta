import { test, expect } from '@playwright/test'

test('first-visit intro finishes, and stays dismissed after reload and navigation', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.site-intro')).toBeVisible()
  await expect(page.locator('.site-intro')).toHaveCount(0, { timeout: 8000 })
  expect(await page.evaluate(() => sessionStorage.getItem('sumire:intro'))).toBe('1')
  await page.reload()
  await expect(page.locator('.site-intro')).toHaveCount(0)
  await page.locator('.main-nav').getByRole('link', { name: 'More', exact: true }).click()
  await expect(page).toHaveURL('/about')
  await expect(page.locator('.site-intro')).toHaveCount(0)
})

test('local review replays the liquid intro and reaches 100 before fading', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('sumire:intro', '1'))
  await page.goto('/ja?previewIntro=1')
  await expect(page.locator('.site-intro')).toBeVisible()
  await expect(page.locator('.intro-liquid')).toHaveCount(1)
  await expect(page.locator('.intro-progress')).toHaveText('Loading ... 100%', { timeout: 7000 })
  await page.waitForFunction(() => {
    const content = document.querySelector('.site-content')
    const overlay = document.querySelector('.site-intro')
    if (!content || !overlay) return false
    const behind = Number(getComputedStyle(content).opacity)
    const front = Number(getComputedStyle(overlay).opacity)
    return behind > .1 && behind < .9 && front > .1 && front < .9
  }, undefined, { timeout: 2000 })
  await expect(page.locator('.site-intro')).toHaveCount(0, { timeout: 2000 })
  await expect(page.locator('.site-content')).not.toHaveAttribute('inert')
  await page.goto('/ja')
  await expect(page.locator('.site-intro')).toHaveCount(0)
})

test('reduced motion finishes promptly without a wave', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/?previewIntro=1')
  await expect(page.locator('.site-intro')).toHaveCount(0, { timeout: 2500 })
  await expect(page.locator('html')).not.toHaveClass(/intro-pending/)
})


test('language, theme and member search work without the wiki', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('sumire:intro', '1'))
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/ja/about')
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.getByRole('button', { name: '設定', exact: true }).click()
  await page.getByRole('button', { name: 'ライト', exact: true }).click()
  await expect(page.locator('html')).toHaveClass(/light/)
  await page.getByRole('link', { name: 'ไทย', exact: true }).click()
  await expect(page).toHaveURL('/th/about')
  await expect(page.locator('html')).toHaveAttribute('lang', 'th')
  await page.reload()
  await expect(page.locator('html')).toHaveClass(/light/)
  await page.locator('.search-trigger').click()
  await page.locator('.site-search-dialog .search-input-row input').fill('Pepelys')
  await page.locator('.search-result').filter({ hasText: 'Pepelys' }).click()
  await expect(page).toHaveURL('/th/about#member-pepelys')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('removed Projects and Wiki pages return 404 and have no navigation links', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('sumire:intro', '1'))
  for (const path of ['/wiki', '/ja/wiki', '/th/wiki', '/ja/wiki/pulsar/configuration', '/projects']) {
    expect((await page.goto(path))?.status()).toBe(404)
  }
  await page.goto('/ja')
  await expect(page.locator('.project-card')).toHaveCount(5)
  await expect(page.locator('a[href*="/wiki"]')).toHaveCount(0)
  await expect(page.locator('.main-nav').getByRole('link', { name: 'Projects', exact: true })).toHaveCount(0)
})
