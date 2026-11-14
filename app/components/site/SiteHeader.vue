<script setup lang="ts">
import { Search, Menu, X, Monitor, Sun, Moon, Check, ArrowUpRight } from '@lucide/vue'
import { site } from '~~/shared/data/site'
const serviceLinks = [{ label: 'SkySend', href: site.skysend }, { label: 'SumireVox', href: site.sumirevox }]
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const colorMode = useColorMode()
const route = useRoute()
const searchOpen = useState('search-open', () => false)
const interactive = ref(false)
const settingsOpen = ref(false)
const scrolled = ref(false)
const header = ref<HTMLElement>()
const settingsButton = ref<HTMLButtonElement>()
const close = () => { settingsOpen.value = false }
const dismissSettings = () => {
  if (!settingsOpen.value) return
  close()
  settingsButton.value?.focus()
}
const updateScroll = () => { scrolled.value = window.scrollY > 16 }
const outside = (event: PointerEvent) => { if (!header.value?.contains(event.target as Node)) close() }
watch(() => route.fullPath, close)
onMounted(() => { interactive.value = true; updateScroll(); window.addEventListener('scroll', updateScroll, { passive: true }); document.addEventListener('pointerdown', outside) })
onBeforeUnmount(() => { window.removeEventListener('scroll', updateScroll); document.removeEventListener('pointerdown', outside) })
</script>

<template>
  <header ref="header" class="site-header" :class="{ scrolled }" @keydown.esc="dismissSettings">
    <div class="header-inner">
      <NuxtLink :to="localePath('/')" class="brand" aria-label="Sumire Labs — Home">
        <img src="/images/brand/sumire.png" width="32" height="32" alt="" />
        <span>Sumire Labs<span class="brand-period">.</span></span>
      </NuxtLink>
      <nav class="main-nav" :aria-label="t('navigation')">
        <NuxtLink :to="localePath('/')" class="home-link">{{ t('home') }}</NuxtLink>
        <a v-for="link in serviceLinks" :key="link.label" :href="link.href" class="service-link" target="_blank" rel="noopener noreferrer">{{ link.label }}<ArrowUpRight :size="12" /></a>
        <NuxtLink :to="localePath('/about')" class="more-link" @click="close">{{ t('more') }}</NuxtLink>
      </nav>
      <div class="header-actions">
        <button class="search-trigger" :disabled="!interactive" :aria-label="t('search')" @click="searchOpen = true"><Search :size="17" /><span>{{ t('search') }}</span><kbd>⌘ K</kbd></button>
        <div class="settings-wrap">
          <button ref="settingsButton" class="icon-button" :disabled="!interactive" :aria-label="t('settings')" :aria-expanded="settingsOpen" aria-controls="settings-menu" @click="settingsOpen = !settingsOpen"><X v-if="settingsOpen" :size="20" /><Menu v-else :size="20" /></button>
          <div v-if="settingsOpen" id="settings-menu" class="popover settings-menu">
            <p class="menu-label">{{ t('language') }}</p>
            <NuxtLink v-for="lang in locales" :key="lang.code" :to="switchLocalePath(lang.code)" class="setting-row" :class="{ selected: locale === lang.code }" :lang="lang.language" :aria-current="locale === lang.code ? 'true' : undefined">{{ lang.name }}<Check v-if="locale === lang.code" :size="16" /></NuxtLink>
            <p class="menu-label theme-label">{{ t('theme') }}</p>
            <ClientOnly>
              <div class="theme-switch" role="group" :aria-label="t('theme')">
                <button v-for="mode in (['system', 'light', 'dark'] as const)" :key="mode" :aria-label="t(mode)" :title="t(mode)" :aria-pressed="colorMode.preference === mode" @click="colorMode.preference = mode"><component :is="{ system: Monitor, light: Sun, dark: Moon }[mode]" :size="17" /><span>{{ t(mode) }}</span></button>
              </div>
            </ClientOnly>
            <div class="settings-social"><span>{{ t('elsewhere') }}</span><SocialLinks /></div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
