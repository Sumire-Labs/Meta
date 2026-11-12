export interface SearchSection { id: string; title: string; titles?: string[]; content: string; locale: string }
export function normalize(value: unknown): string
export function searchSections<T extends SearchSection>(sections: T[], query: string, locale: string, allLanguages?: boolean): Array<T & { score: number }>
