import { test, expect } from '@playwright/test'

test('service links stay visible and More opens the team', async ({ page, isMobile }) => {
  await page.addInitScript(() => sessionStorage.setItem('sumire:intro', '1'))
  await page.goto('/ja')
  const nav = page.locator('.main-nav')
  await expect(nav.getByRole('link', { name: 'SkySend' })).toBeVisible()
  await expect(nav.getByRole('link', { name: 'SkySend' })).toHaveAttribute('href', 'https://send.sumirelabs.com/')
  await expect(nav.getByRole('link', { name: 'SumireVox' })).toBeVisible()
  await expect(nav.getByRole('link', { name: 'SumireVox' })).toHaveAttribute('href', 'https://sumirevox.com/')
  const more = nav.getByRole('link', { name: 'その他', exact: true })
  if (isMobile) await more.tap()
  else await more.click()
  await expect(page).toHaveURL('/ja/about')
  await expect(page.locator('.org-tier').first().getByRole('link')).toHaveCount(2)
  await expect(page.locator('.member-card')).toHaveCount(0)
  await expect(page.locator('.org-people li')).toHaveCount(4)
  await expect(page.locator('#member-pepelys a')).toHaveAttribute('href', 'https://github.com/pepelys')
  await page.locator('.search-trigger').click()
  await page.locator('.site-search-dialog .search-input-row input').fill('Pepelys')
  await page.locator('.search-result').filter({ hasText: 'Pepelys' }).click()
  await expect(page).toHaveURL('/ja/about#member-pepelys')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('organization has localized routes and the removed directory returns 404', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('sumire:intro', '1'))
  for (const [prefix, lang, title] of [['', 'en', 'About the organization'], ['/th', 'th', 'เกี่ยวกับองค์กร']]) {
    const response = await page.goto(`${prefix}/about`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', lang!)
    await expect(page.locator('h1')).toHaveText(title!)
    expect((await page.goto(`${prefix}/links`))?.status()).toBe(404)
  }
})
