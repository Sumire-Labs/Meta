<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { site } from '~~/shared/data/site'
const { t } = useI18n()
useSeoMeta({ title: () => t('home'), description: () => t('heroDescription').replace(/\n/g, ' '), ogTitle: 'Sumire Labs', ogDescription: () => t('heroDescription').replace(/\n/g, ' ') })
</script>
<template>
  <main id="main">
    <section class="home-intro container" aria-labelledby="home-title">
      <div class="home-identity"><img src="/images/brand/sumire.png" width="96" height="96" alt="" /><h1 id="home-title">Sumire Labs</h1></div>
      <p class="home-description">{{ t('heroDescription') }}</p>
      <div class="home-actions">
        <a :href="site.discord" class="button primary" target="_blank" rel="noopener noreferrer"><Discord :size="18" />{{ t('joinDiscord') }}<ArrowUpRight :size="16" /></a>
        <a :href="site.github" class="button" target="_blank" rel="noopener noreferrer"><Github :size="18" />{{ t('viewGithub') }}<ArrowUpRight :size="16" /></a>
      </div>
    </section>
    <section class="home-projects container" aria-labelledby="projects-title">
      <h2 id="projects-title">{{ t('featuredProjects') }}</h2>
      <FeaturedProjects />
    </section>
  </main>
</template>
