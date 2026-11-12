import type { ProjectId } from './projects'

type DistributionLink = { kind: 'curseforge' | 'modrinth' | 'website'; url: string }
type ProjectResources = { icon?: string; wideIcon?: boolean; links: DistributionLink[] }

// Verified against publishing IDs and the platforms' source links.
// Image provenance and original licenses: public/licenses/projects/.
export const projectResources: Partial<Record<ProjectId, ProjectResources>> = {
  'flexible-marker-cre': {
    links: [
      { kind: 'curseforge', url: 'https://www.curseforge.com/minecraft/mc-mods/flexible-marker-cre' },
      { kind: 'modrinth', url: 'https://modrinth.com/mod/IiFeerO5' },
    ],
  },
  'quarryplus-rescaled': {
    links: [{ kind: 'curseforge', url: 'https://www.curseforge.com/minecraft/mc-mods/aem-rescaled' }],
  },
  'chatheads-legacy': {
    links: [
      { kind: 'curseforge', url: 'https://www.curseforge.com/minecraft/mc-mods/chat-heads-legacy' },
      { kind: 'modrinth', url: 'https://modrinth.com/mod/khN4yZlX' },
    ],
  },
  pulsar: {
    icon: '/images/projects/pulsar.png',
    links: [
      { kind: 'curseforge', url: 'https://www.curseforge.com/minecraft/mc-mods/pulsar-lighting-engine' },
      { kind: 'modrinth', url: 'https://modrinth.com/mod/pulsar-lighting-engine' },
    ],
  },
  'celeritas-extra': {
    icon: '/images/projects/celeritas-extra.png',
    links: [
      { kind: 'curseforge', url: 'https://www.curseforge.com/minecraft/mc-mods/celeritas-extra' },
      { kind: 'modrinth', url: 'https://modrinth.com/mod/celeritas-extra' },
    ],
  },
  'leaf-culling': {
    icon: '/images/projects/leaf-culling.png',
    links: [
      { kind: 'curseforge', url: 'https://www.curseforge.com/minecraft/mc-mods/se-leafculling' },
      { kind: 'modrinth', url: 'https://modrinth.com/mod/se-leafculling' },
    ],
  },
  sumirevox: {
    icon: '/images/projects/sumirevox.png',
    links: [{ kind: 'website', url: 'https://sumirevox.com/' }],
  },
  'create-astralization': {
    icon: '/images/projects/create-astralization.png',
    wideIcon: true,
    links: [{ kind: 'curseforge', url: 'https://www.curseforge.com/minecraft/modpacks/create-astralization' }],
  },
}
