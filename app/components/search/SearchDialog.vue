<script setup lang="ts">
import { Search, X, ArrowUpRight } from '@lucide/vue'
import { searchSections } from '~~/shared/utils/search.mjs'
import type { SearchSection } from '~~/shared/utils/search.mjs'
import { members } from '~~/shared/data/members'
const { t, te, locale, loadLocaleMessages } = useI18n()
const open = useState('search-open', () => false)
const dialog = ref<HTMLDialogElement>()
const input = ref<HTMLInputElement>()
const query = ref('')
const allLanguages = ref(false)
const sections = shallowRef<SearchSection[]>([])
const loading = ref(false)
const loadFailed = ref(false)
const results = computed(() => searchSections(sections.value, query.value, locale.value, allLanguages.value))
let previousFocus: HTMLElement | null = null
const route = useRoute()
async function load() {
  if (loading.value) return
  loading.value = true
  loadFailed.value = false
  try {
    const languages = ['en', 'ja', 'th'] as const
    await Promise.all(languages.map(language => loadLocaleMessages(language)))
    // The i18n loader logs fetch failures without rejecting its promise.
    if (languages.some(language => !te('aboutTitle', language))) {
      throw new Error('Search translations are unavailable')
    }
    const index: SearchSection[] = []
    for (const language of languages) {
      const prefix = language === 'en' ? '' : `/${language}`
      index.push(
        { id: prefix || '/', title: 'Sumire Labs — Home', content: t('heroDescription', {}, { locale: language }), locale: language },
        { id: `${prefix}/about`, title: t('aboutTitle', {}, { locale: language }), content: t('aboutDescription', {}, { locale: language }), locale: language },
        ...members.map(person => ({ id: `${prefix}/about#member-${person.id}`, title: person.name, titles: [t('aboutTitle', {}, { locale: language })], content: t(person.role, {}, { locale: language }), locale: language })),
      )
    }
    sections.value = index
  } catch {
    loadFailed.value = true
  } finally {
    loading.value = false
  }
}
watch(open, async value => {
  if (value) { previousFocus = document.activeElement as HTMLElement; dialog.value?.showModal(); await nextTick(); input.value?.focus(); if (!sections.value.length) void load() }
  else { dialog.value?.close(); previousFocus?.focus() }
})
watch(() => route.fullPath, () => { open.value = false })
const shortcut = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    open.value = !open.value
  }
}
function moveFocus(event: KeyboardEvent) {
  if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return
  event.preventDefault()
  const items = [...(dialog.value?.querySelectorAll<HTMLAnchorElement>('.search-result') || [])]
  if (!items.length) return
  const index = items.indexOf(document.activeElement as HTMLAnchorElement)
  const direction = event.key === 'ArrowDown' ? 1 : -1
  const next = index < 0
    ? (direction === 1 ? 0 : items.length - 1)
    : (index + direction + items.length) % items.length
  items[next]?.focus()
}
onMounted(() => document.addEventListener('keydown', shortcut))
onBeforeUnmount(() => document.removeEventListener('keydown', shortcut))
</script>
<template>
  <dialog ref="dialog" class="search-dialog site-search-dialog" :aria-label="t('search')" @cancel="open = false" @close="open = false" @click="(e: MouseEvent) => { if (e.target === dialog) open = false }" @keydown="moveFocus">
    <div class="search-panel">
      <div class="search-input-row"><Search :size="20" /><input ref="input" v-model="query" :placeholder="t('searchPlaceholder')" :aria-label="t('search')" /><button class="icon-button" :aria-label="t('close')" @click="open = false"><X :size="18" /></button></div>
      <div class="search-options"><span>{{ t('searchHint') }}</span><label><input v-model="allLanguages" type="checkbox" />{{ t('allLanguages') }}</label></div>
      <div class="search-results" :aria-busy="loading">
        <p v-if="loading" class="search-message" role="status">{{ t('searchLoading') }}</p>
        <div v-else-if="loadFailed" class="search-message" role="alert"><p>{{ t('searchError') }}</p><button class="button" @click="load">{{ t('retry') }}</button></div>
        <p v-else-if="!results.length" class="search-message">{{ t('noResults') }}</p>
        <NuxtLink v-for="result in results" v-else :key="result.id" :to="result.id" class="search-result" @click="open = false"><div><small>{{ result.titles?.join(' / ') || 'Sumire Labs' }} <span v-if="allLanguages" class="mono"> · {{ result.locale }}</span></small><strong>{{ result.title }}</strong><p>{{ result.content.slice(0, 150) }}</p></div><ArrowUpRight :size="18" /></NuxtLink>
      </div>
      <div class="search-footer"><span aria-live="polite">{{ results.length }} {{ t('results') }}</span><span><kbd>↑</kbd> <kbd>↓</kbd> <kbd>Enter</kbd> <kbd>Esc</kbd></span></div>
    </div>
  </dialog>
</template>
