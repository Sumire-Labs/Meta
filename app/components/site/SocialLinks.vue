<script setup lang="ts">
import { site } from '~~/shared/data/site'
</script>
<template>
  <div class="social-links">
    <a :href="site.discord" target="_blank" rel="noopener noreferrer" aria-label="Discord" title="Discord"><Discord :size="18" /><span class="sr-only">Discord</span></a>
    <a :href="site.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><Github :size="18" :stroke-width="1.5" /><span class="sr-only">GitHub</span></a>
    <a :href="site.maven" target="_blank" rel="noopener noreferrer" aria-label="Maven" title="Maven"><Maven :size="18" /><span class="sr-only">Maven</span></a>
  </div>
</template>
