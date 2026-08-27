import { Fragment } from 'react'
import {
  BEYOND_FORMALITIES_LOCALES,
  BF_KEYWORDS_META,
  BF_MULTILINGUAL_AI_DIGEST,
  BF_URL,
} from '@/lib/beyond-formalities-i18n-seo'

/**
 * Extensive hidden multilingual meta tags that funnel European + Russian
 * search/AI discovery to the Beyond Formalities e-book.
 * Safe in <head> on every page (and reinforced on /beyond-formalities).
 */
export function BeyondFormalitiesI18nHeadTags() {
  return (
    <>
      <meta name="product" content="Beyond Formalities" />
      <meta name="product:url" content={BF_URL} />
      <meta name="product:category" content="ebook, cultural guide, UAE etiquette" />
      <link rel="related" href={BF_URL} title="Beyond Formalities E-Guide" />
      <link rel="alternate" type="text/html" href={BF_URL} title="Beyond Formalities" />

      {/* Hreflang → Beyond Formalities for all EU + RU locales */}
      <link rel="alternate" hrefLang="x-default" href={BF_URL} />
      <link rel="alternate" hrefLang="en" href={BF_URL} />
      {BEYOND_FORMALITIES_LOCALES.map((locale) => (
        <link
          key={locale.hreflang}
          rel="alternate"
          hrefLang={locale.hreflang}
          href={BF_URL}
          title={locale.title}
        />
      ))}

      {/* Aggregated multilingual keywords */}
      <meta name="keywords:beyond-formalities" content={BF_KEYWORDS_META} />
      <meta name="keywords:europe-russia" content={BF_KEYWORDS_META} />

      {/* Per-locale titles, descriptions, keywords */}
      {BEYOND_FORMALITIES_LOCALES.map((locale) => (
        <Fragment key={`bf-meta-${locale.hreflang}`}>
          <meta name={`title:${locale.hreflang}`} content={locale.title} />
          <meta name={`description:${locale.hreflang}`} content={locale.description} />
          <meta name={`keywords:${locale.hreflang}`} content={locale.keywords.join(', ')} />
          <meta property="og:locale:alternate" content={locale.ogLocale} />
        </Fragment>
      ))}

      {/* Yandex / Russian emphasis */}
      <meta
        name="yandex-keyphrases"
        content="Beyond Formalities, культура ОАЭ, этикет ОАЭ, переезд в Дубай, переезд в Абу-Даби, бизнес в ОАЭ, эмиратская культура, гид для экспатов ОАЭ"
      />
      <meta
        name="description:ru-RU"
        content="Beyond Formalities — гид по культуре ОАЭ: https://www.theorangecode.com/beyond-formalities"
      />

      {/* Language list for crawlers */}
      <meta
        name="available-languages"
        content={BEYOND_FORMALITIES_LOCALES.map((l) => l.hreflang).join(',')}
      />
      <meta
        name="target-markets-europe-russia"
        content="GB,IE,DE,AT,CH,FR,BE,NL,LU,IT,ES,PT,PL,SE,NO,DK,FI,CZ,RO,GR,HU,UA,RU,EU"
      />
    </>
  )
}

/** Crawlable multilingual digest → Beyond Formalities (place in body) */
export function BeyondFormalitiesI18nDigest() {
  return (
    <div
      id="beyond-formalities-i18n-digest"
      data-product="Beyond Formalities"
      data-product-url={BF_URL}
      data-ai-content="true"
      className="sr-only"
      aria-hidden="true"
    >
      {BF_MULTILINGUAL_AI_DIGEST}
      {BEYOND_FORMALITIES_LOCALES.map((locale) => (
        <p key={locale.hreflang} lang={locale.hreflang.split('-')[0]}>
          [{locale.lang}] {locale.title}. {locale.description} → {BF_URL}. Keywords:{' '}
          {locale.keywords.join(', ')}.
        </p>
      ))}
    </div>
  )
}
