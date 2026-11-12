export function normalize(value) {
  return String(value ?? '').normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim()
}

export function searchSections(sections, query, locale, allLanguages = false) {
  const terms = normalize(query).split(' ').filter(Boolean)
  return sections.filter(section => allLanguages || section.locale === locale).map(section => {
    const title = normalize(section.title)
    const text = normalize(`${section.title} ${section.titles?.join(' ') ?? ''} ${section.content}`)
    const matches = terms.every(term => text.includes(term))
    return { ...section, score: matches ? terms.reduce((score, term) => score + (title.includes(term) ? 10 : 1), 0) + 1 : 0 }
  }).filter(section => section.score > 0).sort((a, b) => b.score - a.score).slice(0, 30)
}
