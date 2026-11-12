<script setup lang="ts">
const { locale, t } = useI18n()
const introPhase = useState<'idle' | 'loading' | 'revealing'>('intro-phase', () => 'idle')
const localeHead = useLocaleHead({ seo: { canonicalQueries: [] } })
useHead(() => ({ htmlAttrs: { lang: locale.value }, link: localeHead.value.link, meta: localeHead.value.meta }))
useSeoMeta({ ogSiteName: 'Sumire Labs', ogType: 'website', twitterCard: 'summary', ogImage: 'https://sumirelabs.com/images/brand/sumire.png' })
</script>

<template>
  <a class="skip-link" href="#main">{{ t('skip') }}</a>
  <NuxtLoadingIndicator color="var(--accent)" />
  <div class="site-content" :data-intro-phase="introPhase" :inert="introPhase !== 'idle'">
    <SiteHeader />
    <NuxtPage />
    <SiteFooter />
  </div>
  <SearchDialog />
  <BackToTop />
  <SiteIntro />
</template>
