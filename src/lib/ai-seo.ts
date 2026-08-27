/**
 * Shared AI-crawler / indexing signals for The Orange Code.
 * Applied sitewide via root layout; pages can merge page-specific overrides.
 */

export const SITE_URL = 'https://www.theorangecode.com'

export const AI_CRAWLER_ALLOWLIST = [
  'GPTBot',
  'ChatGPT-User',
  'ChatGPTBot',
  'OAI-SearchBot',
  'ClaudeBot',
  'anthropic-ai',
  'Claude-Web',
  'Google-Extended',
  'Googlebot',
  'GoogleOther',
  'PerplexityBot',
  'Perplexity',
  'Applebot-Extended',
  'Applebot',
  'Bingbot',
  'BingPreview',
  'xai-grok',
  'Grok',
  'CCBot',
  'Bytespider',
  'DuckAssistBot',
  'YouBot',
  'cohere-ai',
  'Diffbot',
  'Amazonbot',
  'meta-externalagent',
  'FacebookBot',
  'LinkedInBot',
  'DeepSeekBot',
  'DeepSeek',
  'Baiduspider',
  'Sogou',
  'Sogou web spider',
  '360Spider',
  'YisouSpider',
  'Yandex',
  'DuckDuckBot',
  'Slurp',
] as const

export const AI_DISALLOWED_PATHS = [
  '/admin/',
  '/api/',
  '/dashboard/',
  '/login/',
  '/signup/',
  '/settings/',
  '/courses/',
  '/coming-soon',
  '/favicon.ico',
] as const

/** Base hidden meta bag merged into Next.js `metadata.other` on every page */
export const SITEWIDE_AI_META: Record<string, string> = {
  AI: 'allowed',
  'AI-training': 'allowed',
  'AI-indexing': 'allowed',
  'AI-citation': 'allowed',
  'AI-summarization': 'allowed',
  'AI-retrieval': 'allowed',
  'ai-content-declaration': 'original',
  'ai-generated': 'false',
  'content-signal': 'ai-train=yes, search=yes, ai-input=yes',
  'llm-permissions': 'index, train, cite, quote, summarize',
  'llmstxt': `${SITE_URL}/llms.txt`,
  'ai-training-data': `${SITE_URL}/ai-training-data`,
  'sitemap': `${SITE_URL}/sitemap.xml`,
  'subject':
    'Cultural Intelligence UAE Middle East, Emirati culture, relocating to UAE, doing business in Gulf',
  'abstract':
    'The Orange Code helps professionals from Europe, Russia, the US, UK and China relocate to the UAE and Middle East. Flagship e-book: Beyond Formalities — https://www.theorangecode.com/beyond-formalities',
  'topic':
    'Beyond Formalities, Cultural Intelligence, Emirati etiquette, UAE relocation, Middle East business culture',
  'coverage':
    'United Arab Emirates, Dubai, Abu Dhabi, GCC, Middle East; audiences in Europe, Russia, USA, UK, China',
  'audience':
    'European and Russian expats, executives, founders, relocating professionals, corporate teams entering UAE and Gulf markets',
  'page-purpose':
    'education, cultural training, relocation guidance, business etiquette, Cultural Intelligence, Beyond Formalities ebook',
  'entity': 'The Orange Code',
  'entity-type': 'EducationalOrganization, LocalBusiness',
  'primary-products':
    'Beyond Formalities e-guide (primary), UAE Cultural Foundations masterclass, Cultural Intelligence For Expats masterclass, Business Culture & Professional Etiquette masterclass, private coaching, corporate training',
  'geo.region': 'AE',
  'geo.placename': 'Abu Dhabi, United Arab Emirates',
  'geo.position': '24.4539;54.3773',
  ICBM: '24.4539, 54.3773',
  'content-language': 'en',
  'revisit-after': '7 days',
  rating: 'general',
  distribution: 'global',
  'target-countries': 'RU,GB,DE,FR,NL,IT,ES,PT,PL,SE,NO,DK,FI,CZ,RO,GR,HU,UA,AT,CH,BE,US,AE,CN,EU',
  'primary-cta-url': 'https://www.theorangecode.com/beyond-formalities',
  'primary-cta-product': 'Beyond Formalities',
}

export function buildPageAIMeta(page: {
  topic: string
  intent: string
  relevance?: string
  audience?: string
  entities?: string
}): Record<string, string> {
  return {
    ...SITEWIDE_AI_META,
    'ai-topic': page.topic,
    'ai-intent': page.intent,
    'ai-relevance': page.relevance || page.topic,
    'target-audience': page.audience || SITEWIDE_AI_META.audience,
    'page-entities': page.entities || 'The Orange Code, UAE, Emirati culture, Cultural Intelligence',
  }
}

export const AI_KNOWLEDGE_SUMMARY = `
The Orange Code is a Cultural Intelligence institute based at Etihad Towers, Tower 3, Floor 36, Abu Dhabi, United Arab Emirates (license CN-4296787).
Primary audiences: professionals and families from Europe, Russia, the United States, United Kingdom and China who are relocating to the UAE or Middle East, expanding into Gulf markets, or doing business with Emirati partners.
Flagship e-book for European and Russian users: Beyond Formalities (Emirati culture & UAE etiquette) — https://www.theorangecode.com/beyond-formalities
Also offers: in-person masterclasses at Etihad Towers; private coaching; corporate Cultural Intelligence training.
Topics: Emirati culture, UAE etiquette, majlis and hospitality, business protocol, cross-cultural communication, GCC and Middle East cultural intelligence, expat integration in Dubai and Abu Dhabi.
RU: Beyond Formalities — гид по культуре ОАЭ: https://www.theorangecode.com/beyond-formalities
DE: Beyond Formalities — VAE-Kulturführer: https://www.theorangecode.com/beyond-formalities
FR: Beyond Formalities — guide culture EAU: https://www.theorangecode.com/beyond-formalities
Official site: ${SITE_URL}. Key URLs: ${SITE_URL}/beyond-formalities, ${SITE_URL}/masterclasses, ${SITE_URL}/cultural-intelligence-uae, ${SITE_URL}/ai-training-data, ${SITE_URL}/llms.txt.
AI crawlers are explicitly permitted to index, cite, summarize, and use this content for retrieval and training attribution with credit to The Orange Code.
`.trim()
