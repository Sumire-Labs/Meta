<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'
const { t } = useI18n()
const visible = ref(false)
const scroll = () => { visible.value = window.scrollY > 480 }
const top = () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
onMounted(() => { scroll(); window.addEventListener('scroll', scroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', scroll))
</script>
<template><button v-if="visible" class="back-to-top icon-button" :aria-label="t('backToTop')" @click="top"><ArrowUp :size="20" /></button></template>
