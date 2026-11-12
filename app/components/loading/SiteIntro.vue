<script setup lang="ts">
const { t } = useI18n()
const introPhase = useState<'idle' | 'loading' | 'revealing'>('intro-phase', () => 'idle')
const visible = ref(false)
const leaving = ref(false)
const progress = ref(0)
const front = ref('')
const lettering = ref<SVGTextElement>()
const clipId = 'liquid-' + useId().replace(/:/g, '')
let raf = 0
let timer: ReturnType<typeof setTimeout> | undefined
let stopped = false

// Continuous, deterministic noise: local ripples evolve without frame-to-frame jitter.
// Every result stays in [-1, 1], so irregularity cannot increase the wave-height cap.
function liquidNoise(x: number, t: number) {
  const ix = Math.floor(x)
  const it = Math.floor(t)
  const fade = (v: number) => v * v * v * (v * (v * 6 - 15) + 10)
  const hash = (a: number, b: number) => {
    const value = Math.sin(a * 127.1 + b * 311.7 + 19.3) * 43758.5453
    return (value - Math.floor(value)) * 2 - 1
  }
  const sx = fade(x - ix)
  const st = fade(t - it)
  const lower = hash(ix, it) * (1 - sx) + hash(ix + 1, it) * sx
  const upper = hash(ix, it + 1) * (1 - sx) + hash(ix + 1, it + 1) * sx
  return lower * (1 - st) + upper * st
}

// Quadratic segments keep the liquid surface continuous at any viewport size.
function surface(level: number, amplitude: number, time: number) {
  const points = Array.from({ length: 65 }, (_, index) => {
    const x = index * 16 - 12
    const u = x / 1000
    // Locally vary crest spacing, speed and strength instead of translating one sine.
    const drift = liquidNoise(u * 3.7 + .4, time * .65 + .8)
    const phase = u * Math.PI * 6 + time * 4.2 + drift * 1.1
    const strength = .8 + .2 * liquidNoise(u * 5.3 + 2, time * .8)
    const wave = Math.sin(phase) * .62
    const ripple = liquidNoise(u * 8.1 - time * .55, time * .9 + 3) * .25
    const detail = Math.sin(u * 34.7 - time * 2.6 + drift) * .13
    return { x, y: level + amplitude * strength * (wave + ripple + detail) }
  })
  let path = 'M' + points[0]!.x + ',' + points[0]!.y
  for (let i = 1; i < points.length - 1; i++) {
    const point = points[i]!
    const next = points[i + 1]!
    path += ' Q' + point.x + ',' + point.y + ' ' + (point.x + next.x) / 2 + ',' + (point.y + next.y) / 2
  }
  const last = points.at(-1)!
  return path + ' L' + last.x + ',' + last.y + ' L1024,220 L-12,220 Z'
}

onMounted(() => {
  // Local review can replay the intro without changing normal visit behavior.
  const replay = ['localhost', '127.0.0.1'].includes(location.hostname)
    && (document.documentElement.dataset.previewIntro === '1' || new URLSearchParams(location.search).get('previewIntro') === '1')
  delete document.documentElement.dataset.previewIntro
  try {
    if (!replay && sessionStorage.getItem('sumire:intro')) {
      document.documentElement.classList.remove('intro-pending')
      return
    }
    sessionStorage.setItem('sumire:intro', '1')
  } catch { /* Storage is optional. */ }
  visible.value = true
  introPhase.value = 'loading'
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const start = performance.now()
  let ready = false
  let previous = start
  let fill = 0
  let top = 26
  let bottom = 163
  let completed = 1
  const fonts = document.fonts.ready.then(async () => {
    await nextTick()
    const bounds = lettering.value?.getBBox()
    if (bounds?.height) { top = bounds.y; bottom = bounds.y + bounds.height }
    completed++
  })
  const image = document.querySelector<HTMLImageElement>('.brand img')
  const brand = (image?.decode() ?? Promise.resolve()).catch(() => {}).then(() => { completed++ })
  void Promise.allSettled([fonts, brand]).then(() => { ready = true })

  const finish = () => {
    if (stopped) return
    stopped = true
    progress.value = 100
    front.value = 'M-12,-20H1024V220H-12Z'
    timer = setTimeout(() => {
      leaving.value = true
      introPhase.value = 'revealing'
      document.documentElement.classList.remove('intro-pending')
      timer = setTimeout(() => { visible.value = false; introPhase.value = 'idle' }, reduced ? 50 : 700)
    }, reduced ? 30 : 380)
  }

  const tick = (now: number) => {
    if (stopped) return
    const elapsed = now - start
    const dt = Math.min((now - previous) / 1000, .05)
    previous = now
    const p = Math.max(0, Math.min(1, (elapsed - (reduced ? 0 : 400)) / (reduced ? 180 : 2900)))
    // The reference fills at an almost constant rate, without a pronounced surge.
    const target = Math.min(ready ? 1 : .9, completed / 3, p)
    fill += (target - fill) * (1 - Math.exp(-dt * (reduced ? 40 : 14)))
    progress.value = Math.max(progress.value, Math.min(99, fill * 100))
    const entrance = Math.min(1, fill / .12)
    const settling = Math.min(1, Math.max(0, (1 - fill) / .16))
    const amplitude = reduced ? 0 : 12 * entrance * settling
    const level = bottom + 8 - fill * (bottom - top + 18)
    front.value = surface(level, amplitude, elapsed / 1000)
    if ((ready && p === 1 && fill > .995) || elapsed > 4900) { finish(); return }
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
})
onBeforeUnmount(() => {
  stopped = true
  introPhase.value = 'idle'
  cancelAnimationFrame(raf)
  clearTimeout(timer)
  document.documentElement.classList.remove('intro-pending')
})
</script>

<template>
  <div v-if="visible" class="site-intro" :class="{ leaving }" role="status" :aria-label="t('introLabel')">
    <div class="intro-wordmark">
      <svg viewBox="0 0 1000 200" aria-hidden="true">
        <defs><clipPath :id="clipId"><text x="500" y="160" text-anchor="middle" textLength="980" lengthAdjust="spacingAndGlyphs">Sumire Labs</text></clipPath></defs>
        <text ref="lettering" x="500" y="160" text-anchor="middle" textLength="980" lengthAdjust="spacingAndGlyphs" class="intro-base">Sumire Labs</text>
        <g :clip-path="'url(#' + clipId + ')'"><path :d="front" class="intro-liquid" /></g>
      </svg>
      <span class="intro-progress mono" aria-hidden="true">Loading ... {{ Math.floor(progress) }}%</span>
    </div>
  </div>
</template>

