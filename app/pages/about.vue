<script setup lang="ts">
import { members } from '~~/shared/data/members'
const { t } = useI18n()
const groups = ['representative', 'member'] as const
useSeoMeta({ title: () => t('aboutTitle'), description: () => t('aboutDescription'), ogTitle: () => t('aboutTitle'), ogDescription: () => t('aboutDescription') })
</script>

<template>
  <main id="main" class="directory-page container">
    <header class="directory-heading"><p class="eyebrow">Sumire Labs</p><h1>{{ t('aboutTitle') }}</h1><p>{{ t('aboutDescription') }}</p></header>
    <section class="org-chart" :aria-label="t('organizationChart')">
      <div class="org-root"><img src="/images/brand/sumire.png" width="40" height="40" alt="" /><span>Sumire Labs</span></div>
      <div v-for="group in groups" :key="group" class="org-tier">
        <h2>{{ t(group === 'representative' ? 'representatives' : 'members') }}</h2>
        <ul class="org-people"><li v-for="person in members.filter(m => m.role === group)" :id="`member-${person.id}`" :key="person.id"><component :is="person.github ? 'a' : 'span'" class="org-person" :href="person.github" :target="person.github ? '_blank' : undefined" :rel="person.github ? 'noopener noreferrer' : undefined"><img v-if="person.avatar" :src="person.avatar" width="28" height="28" alt="" decoding="async" /><span v-else class="org-person-initial" aria-hidden="true">{{ person.name.charAt(0).toUpperCase() }}</span>{{ person.name }}</component></li></ul>
      </div>
    </section>
  </main>
</template>
