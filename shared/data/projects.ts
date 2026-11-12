export const projectCategories = ['mod', 'modpack', 'gradlePlugin', 'bot', 'tool', 'library', 'template', 'minecraftPlugin', 'datapack', 'website', 'other'] as const
export const projects = [
  { id: 'pulsar', name: 'Pulsar', repo: 'Pulsar', category: 'mod', number: '01' },
  { id: 'cleanroom-dev-env', name: 'CleanroomDevEnv', repo: 'CleanroomDevEnv', category: 'template', number: '02' },
  { id: 'felt', name: 'Felt', repo: 'Felt', category: 'gradlePlugin', number: '03' },
  { id: 'meta', name: 'Meta', repo: 'Meta', category: 'website', number: '04' },
  { id: 'leaf-culling', name: 'Sodium/Embeddium Leaf Culling', repo: 'SodiumLeafCulling-Unofficial', category: 'mod', number: '05' },
  { id: 'celeritas-extra', name: 'Celeritas/Nothirium Extra', repo: 'Celeritas-Extra', category: 'mod', number: '06' },
  { id: 'chatheads-legacy', name: 'ChatHeads Legacy', repo: 'ChatHeads-Vintage', category: 'mod', number: '07' },
  { id: 'flexible-marker-cre', name: 'FlexibleMarker CRE', repo: 'FlexibleMarker-CRE', category: 'mod', number: '08' },
  { id: 'kita', name: 'Kita', repo: 'Kita', category: 'bot', number: '09' },
  { id: 'quarryplus-rescaled', name: 'QuarryPlus Rescaled', repo: 'QuarryPlus-Rescaled', category: 'mod', number: '10' },
  { id: 'yomu', name: 'Yomu', repo: 'Yomu', category: 'library', number: '11' },
  { id: 'urusaiyatsu', name: 'Urusaiyatsu', repo: null, category: 'bot', number: '12' },
  { id: 'sumirevox', name: 'SumireVox', repo: 'SumireVox', category: 'bot', number: '13' },
  { id: 'sum1rem0d', name: 'Sum1reM0d', repo: 'Sum1reM0d', category: 'mod', number: '14' },
  { id: 'cbmultipart-rescaled', name: 'CBMultipart-Rescaled', repo: 'CBMultipart-Rescaled', category: 'mod', number: '15' },
  { id: 'lightbench', name: 'lightbench', repo: 'lightbench', category: 'tool', number: '16' },
  { id: 'stonecutter-example-mod', name: 'Stonecutter-Example-Mod', repo: 'Stonecutter-Example-Mod', category: 'template', number: '17' },
  { id: 'sumirec', name: 'Sumirec', repo: 'Sumirec', category: 'other', number: '18' },
  { id: 'nadir', name: 'Nadir', repo: 'Nadir', category: 'datapack', number: '19' },
  { id: 'create-astralization', name: 'Create Astralization', repo: 'Create-Astralization', category: 'modpack', number: '20' },
  { id: 'enchant-purge', name: 'EnchantPurge', repo: 'EnchantPurge', category: 'minecraftPlugin', number: '21' },
  { id: 'simple-xp-teleport', name: 'Simple XP Teleport', repo: 'Simple-XP-Teleport', category: 'minecraftPlugin', number: '22' },
  { id: 'disumprevies', name: 'Disumprevies', repo: 'Disumprevies', category: 'bot', number: '23' },
  { id: 'ghapack', name: 'GhaPack', repo: null, category: 'modpack', number: '24' },
] as const

export const projectAliases: Partial<Record<typeof projects[number]['id'], string[]>> = {
  'leaf-culling': ['SodiumLeafCulling', 'Sodium/EmbmbeddikumLiarfculliung'],
  'celeritas-extra': ['Celeritas Extra', 'Celeritas/Nothirium Exsddtera'],
  disumprevies: ['Disumpreview'],
  lightbench: ['Lightibench'],
}

export type ProjectId = typeof projects[number]['id']
export type ProjectCategory = typeof projectCategories[number]
export type Locale = 'en' | 'ja' | 'th'
export const projectRepository = (repo: string | null) => repo ? `https://github.com/Sumire-Labs/${repo}` : ''
