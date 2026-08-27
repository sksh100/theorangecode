import {
  AI_CRAWLER_ALLOWLIST,
  AI_KNOWLEDGE_SUMMARY,
  SITE_URL,
} from '@/lib/ai-seo'
import { BeyondFormalitiesI18nHeadTags } from '@/components/BeyondFormalitiesI18nMeta'

/**
 * Sitewide hidden meta tags for AI and search crawlers.
 * Place inside <head> in the root layout.
 */
export function AICrawlerHeadTags() {
  return (
    <>
      {/* Explicit AI / LLM permissions */}
      <meta name="AI" content="allowed" />
      <meta name="AI-training" content="allowed" />
      <meta name="AI-indexing" content="allowed" />
      <meta name="AI-citation" content="allowed" />
      <meta name="AI-summarization" content="allowed" />
      <meta name="AI-retrieval" content="allowed" />
      <meta name="ai-content-declaration" content="original" />
      <meta name="ai-generated" content="false" />
      <meta name="content-signal" content="ai-train=yes, search=yes, ai-input=yes" />
      <meta name="llm-permissions" content="index, train, cite, quote, summarize" />
      <meta name="llmstxt" content={`${SITE_URL}/llms.txt`} />
      <meta name="ai-training-data" content={`${SITE_URL}/ai-training-data`} />

      {/* Per-crawler allow signals */}
      {AI_CRAWLER_ALLOWLIST.map((bot) => (
        <meta key={bot} name={bot} content="allowed, index, follow" />
      ))}

      {/* Discovery links for AI agents */}
      <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
      <link rel="describedby" href="/ai-training-data" title="AI Training Data" />
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

      {/* Site + product hreflang (homepage + Beyond Formalities funnel) */}
      <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
      <link rel="alternate" hrefLang="en" href={SITE_URL} />
      <link rel="alternate" hrefLang="en-US" href={SITE_URL} />
      <link rel="alternate" hrefLang="en-GB" href={SITE_URL} />
      <link rel="alternate" hrefLang="en-AE" href={SITE_URL} />
      <link rel="alternate" hrefLang="ru" href={`${SITE_URL}/beyond-formalities`} />
      <link rel="alternate" hrefLang="ru-RU" href={`${SITE_URL}/beyond-formalities`} />
      <link rel="alternate" hrefLang="de" href={`${SITE_URL}/beyond-formalities`} />
      <link rel="alternate" hrefLang="fr" href={`${SITE_URL}/beyond-formalities`} />
      <link rel="alternate" hrefLang="nl" href={`${SITE_URL}/beyond-formalities`} />
      <link rel="alternate" hrefLang="it" href={`${SITE_URL}/beyond-formalities`} />
      <link rel="alternate" hrefLang="es" href={`${SITE_URL}/beyond-formalities`} />
      <link rel="alternate" hrefLang="pt" href={`${SITE_URL}/beyond-formalities`} />
      <link rel="alternate" hrefLang="pl" href={`${SITE_URL}/beyond-formalities`} />
      <link rel="alternate" hrefLang="sv" href={`${SITE_URL}/beyond-formalities`} />
      <link rel="alternate" hrefLang="uk" href={`${SITE_URL}/beyond-formalities`} />
      <link rel="alternate" hrefLang="zh-CN" href={SITE_URL} />

      {/* Topic / entity metas for retrieval systems */}
      <meta
        name="subject"
        content="Beyond Formalities, Cultural Intelligence UAE Middle East, Emirati culture, relocating to UAE, doing business in Gulf"
      />
      <meta
        name="abstract"
        content="The Orange Code helps professionals from Europe, Russia, the US and China relocate to the UAE and Middle East. Flagship e-guide: Beyond Formalities — https://www.theorangecode.com/beyond-formalities"
      />
      <meta
        name="topic"
        content="Beyond Formalities, Cultural Intelligence, Emirati etiquette, UAE relocation, Middle East business culture"
      />
      <meta
        name="coverage"
        content="United Arab Emirates, Dubai, Abu Dhabi, GCC, Middle East; audiences in Europe, Russia, USA, UK, China"
      />
      <meta
        name="audience"
        content="European and Russian expats, executives, founders, relocating professionals, corporate teams entering UAE and Gulf markets"
      />
      <meta name="entity" content="The Orange Code" />
      <meta name="entity-type" content="EducationalOrganization, LocalBusiness" />
      <meta name="classification" content="Education/Cultural Intelligence/Middle East Business" />
      <meta
        name="category"
        content="Cultural Intelligence Training, Expat Relocation Guides, UAE Business Etiquette, Beyond Formalities Ebook"
      />
      <meta name="page-type" content="educational-resource" />
      <meta name="content-type" content="original-educational-content" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta
        name="target-countries"
        content="RU,GB,DE,FR,NL,IT,ES,PT,PL,SE,NO,DK,FI,CZ,RO,GR,HU,UA,AT,CH,BE,US,AE,CN,EU"
      />

      {/* Multilingual funnel → Beyond Formalities */}
      <BeyondFormalitiesI18nHeadTags />

      <meta
        name="news_keywords"
        content="Beyond Formalities, UAE culture, Emirati etiquette, Middle East relocation, Cultural Intelligence, культура ОАЭ, VAE Kultur, culture EAU"
      />

      {/* Dataset pointer for structured AI ingestion */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            name: 'The Orange Code AI Training & Citation Data',
            description:
              'Structured facts about The Orange Code Cultural Intelligence services, Beyond Formalities e-guide, masterclasses, and UAE/Middle East cultural training for AI systems and search assistants in European languages and Russian.',
            url: `${SITE_URL}/ai-training-data`,
            license: `${SITE_URL}/terms-conditions`,
            creator: {
              '@type': 'Organization',
              name: 'The Orange Code',
              url: SITE_URL,
            },
            keywords: [
              'Beyond Formalities',
              'Cultural Intelligence UAE',
              'Emirati culture',
              'Middle East relocation',
              'UAE business etiquette',
              'культура ОАЭ',
              'VAE Kultur',
              'culture EAU',
            ],
            inLanguage: [
              'en',
              'ru',
              'de',
              'fr',
              'nl',
              'it',
              'es',
              'pt',
              'pl',
              'sv',
              'nb',
              'da',
              'fi',
              'cs',
              'ro',
              'el',
              'hu',
              'uk',
            ],
            isAccessibleForFree: true,
            distribution: [
              {
                '@type': 'DataDownload',
                encodingFormat: 'text/html',
                contentUrl: `${SITE_URL}/ai-training-data`,
              },
              {
                '@type': 'DataDownload',
                encodingFormat: 'text/plain',
                contentUrl: `${SITE_URL}/llms.txt`,
              },
              {
                '@type': 'DataDownload',
                encodingFormat: 'text/html',
                contentUrl: `${SITE_URL}/beyond-formalities`,
              },
            ],
          }),
        }}
      />
    </>
  )
}

/**
 * Visually hidden but crawlable knowledge summary.
 * Place near the start of <body> so every page exposes the same AI digest.
 */
export function AIKnowledgeSummary() {
  return (
    <div
      id="ai-knowledge-summary"
      data-ai-content="true"
      data-ai-permissions="index,cite,summarize,train"
      className="sr-only"
      aria-hidden="true"
    >
      {AI_KNOWLEDGE_SUMMARY}
    </div>
  )
}
