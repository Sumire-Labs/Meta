<script setup lang="ts">
defineProps<{ error: { statusCode?: number } }>()
</script>
<template><main class="error-page container"><p class="eyebrow">Sumire Labs / {{ error.statusCode || 500 }}</p><h1>{{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}</h1><a href="/" class="button primary">Home →</a></main></template>
