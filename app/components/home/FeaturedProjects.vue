<script setup lang="ts">
import { Globe } from '@lucide/vue'
import { projects, projectRepository, type ProjectId } from '~~/shared/data/projects'
import { projectResources } from '~~/shared/data/project-resources'
const { t } = useI18n()
const featuredIds: ProjectId[] = ['pulsar', 'celeritas-extra', 'leaf-culling', 'sumirevox', 'create-astralization']
const featured = featuredIds.map(id => ({ ...projects.find(project => project.id === id)!, resources: projectResources[id] }))
const linkLabel = (kind: string) => kind === 'website' ? t('officialWebsite') : kind === 'curseforge' ? 'CurseForge' : 'Modrinth'
</script>

<template>
  <div class="featured-grid">
    <article v-for="project in featured" :key="project.id" class="project-card">
      <div class="card-content">
        <div class="card-heading">
          <img v-if="project.resources?.icon" :src="project.resources.icon" :class="['project-logo', { 'project-logo-wide': project.resources.wideIcon }]" :width="project.resources.wideIcon ? 128 : 64" height="64" alt="" loading="lazy" decoding="async" />
          <h3>{{ project.name }}</h3>
        </div>
        <p>{{ t(`projectDescriptions.${project.id}`) }}</p>
      </div>
      <div class="card-links">
        <div class="card-external-links">
          <a v-for="link in project.resources?.links" :key="link.kind" :href="link.url" :class="link.kind === 'website' ? 'card-website-link' : 'icon-button'" :aria-label="`${project.name} — ${linkLabel(link.kind)}`" :title="linkLabel(link.kind)" target="_blank" rel="noopener noreferrer">
            <CurseForge v-if="link.kind === 'curseforge'" :size="18" />
            <Modrinth v-else-if="link.kind === 'modrinth'" :size="18" />
            <template v-else><Globe :size="16" /><span>{{ t('officialWebsite') }}</span></template>
          </a>
          <a v-if="project.repo" :href="projectRepository(project.repo)" class="icon-button" :aria-label="`${project.name} — GitHub`" title="GitHub" target="_blank" rel="noopener noreferrer"><Github :size="18" /></a>
        </div>
      </div>
    </article>
  </div>
</template>
