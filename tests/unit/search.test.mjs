import { test } from 'node:test'
import assert from 'node:assert/strict'
import { searchSections } from '../../shared/utils/search.mjs'
const sections = [
  { id: '/ja/wiki/pulsar', title: 'Pulsar', content: '照明エンジンの導入方法', locale: 'ja' },
  { id: '/th/wiki/pulsar', title: 'Pulsar', content: 'เอนจินแสงสำหรับ Cleanroom', locale: 'th' },
  { id: '/wiki/pulsar', title: 'Pulsar', content: 'Lighting engine for Cleanroom', locale: 'en' },
]
test('Japanese and Thai substring searches work without whitespace', () => {
  assert.equal(searchSections(sections, '導入', 'ja')[0]?.id, '/ja/wiki/pulsar')
  assert.equal(searchSections(sections, 'เอนจินแสง', 'th')[0]?.id, '/th/wiki/pulsar')
})
test('normalizes full-width Latin, filters languages, and combines terms', () => {
  assert.equal(searchSections(sections, 'ＰＵＬＳＡＲ', 'ja').length, 1)
  assert.equal(searchSections(sections, 'pulsar', 'ja', true).length, 3)
  assert.equal(searchSections(sections, 'lighting cleanroom', 'en').length, 1)
  assert.equal(searchSections(sections, 'lighting unknown', 'en').length, 0)
})
