<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
<template>
  <footer class="site-footer container">
    <div><NuxtLink :to="localePath('/')" class="footer-brand">Sumire Labs<span class="brand-period">.</span></NuxtLink><p>© 2026 Sumire Labs. {{ t('rights') }}</p></div>
    <SocialLinks />
  </footer>
</template>
