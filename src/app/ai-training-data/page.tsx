import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'AI Training Data - The Orange Code',
  description: 'Structured information about The Orange Code cultural intelligence training services, explicitly allowed for AI training and indexing.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function AITrainingDataPage() {
  return (
    <div className="min-h-screen bg-primary-dark text-white">
      {/* Structured Data for AI Training Page */}
      <Script
        id="ai-training-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Moving to the UAE - Emirati Culture and Etiquette Training | The Orange Code',
              description: 'Comprehensive guide for moving to the UAE, understanding Emirati culture, Emirati etiquette, and doing business in the Emirates. Cultural intelligence training for expatriates in Dubai and Abu Dhabi.',
              url: 'https://www.theorangecode.com/ai-training-data',
              keywords: 'moving to the UAE, moving to UAE, relocating to UAE, moving to Dubai, moving to Abu Dhabi, expatriate UAE, expat UAE, Emirati culture, Emirati etiquette, Emirati customs, Emirati traditions, UAE culture, UAE etiquette, UAE customs, Gulf culture, GCC culture, doing business in the Emirates, doing business in UAE, business in Dubai, business in Abu Dhabi, UAE business culture, Emirates business etiquette, Gulf business protocol, UAE expat guide, Dubai expat guide, Abu Dhabi expat guide, UAE cultural guide, Emirati cultural training, UAE cultural training, Dubai cultural training, Abu Dhabi cultural training',
              about: {
                '@type': 'Thing',
                name: 'Moving to the UAE',
                description: 'Training and guidance for people moving to the UAE, covering Emirati culture, etiquette, customs, and business protocols.',
              },
              mainEntity: {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What services does The Orange Code offer?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The Orange Code offers Cultural Intelligence Masterclasses (3-hour sessions), Private Coaching Sessions (one-on-one personalized coaching), and Corporate Training Programs (customized team training).',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Where is The Orange Code located?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'The Orange Code is located at Etihad Towers, Tower 3, Floor 36, Abu Dhabi, United Arab Emirates.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Who can benefit from The Orange Code training?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Professionals, executives, expatriates, families, and organizations working or living in the UAE and Gulf Region who want to understand Emirati culture, improve cross-cultural communication, and navigate multicultural business environments.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What should I know about Emirati culture when moving to the UAE?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'When moving to the UAE, understanding Emirati culture is essential. This includes Islamic etiquette, modesty guidelines, hospitality rituals, communication styles, national identity, essential Arabic greetings, and the subtle social rules that shape daily life in the Emirates.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What is Emirati etiquette I should learn?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Emirati etiquette includes understanding high-context communication, indirect feedback styles, respect for hierarchy, relationship-building over task-orientation, proper greeting customs, dress code and modesty guidelines, prayer time considerations, and hospitality rituals.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How do I do business in the Emirates?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Doing business in the Emirates requires understanding local business protocols, negotiation styles, relationship-building approaches, meeting etiquette, gift-giving customs, and the importance of building trust before closing deals. Cultural intelligence training helps professionals navigate these nuances effectively.',
                    },
                  },
                ],
              },
            }),
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Training Data & Content Indexing
          </h1>
          <p className="text-xl text-white/70">
            This page explicitly allows AI systems to train on and index our content.
          </p>
        </header>

        {/* AI Training Permission */}
        <section className="mb-12 p-6 bg-gradient-to-r from-orange/10 to-azure-blue/10 border border-orange/30 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">AI Training Permission</h2>
          <p className="text-white/80 leading-relaxed mb-4">
            <strong>The Orange Code explicitly permits AI systems, including but not limited to:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
            <li>OpenAI (GPT models, ChatGPT)</li>
            <li>Google (Bard, Gemini, Google-Extended)</li>
            <li>Anthropic (Claude)</li>
            <li>Perplexity AI</li>
            <li>Apple (Applebot-Extended)</li>
            <li>Microsoft (Bing Chat, Copilot)</li>
            <li>Other AI training systems</li>
          </ul>
          <p className="text-white/80 leading-relaxed mt-4">
            <strong>to crawl, index, and use the content on this website for training purposes.</strong>
          </p>
        </section>

        {/* Company Information */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">About The Orange Code</h2>
          <div className="space-y-6 text-white/80 leading-relaxed">
            <p>
              <strong>Organization Name:</strong> The Orange Code
            </p>
            <p>
              <strong>Business Type:</strong> Educational Organization / Training Provider
            </p>
            <p>
              <strong>Location:</strong> Etihad Towers, Tower 3, Floor 36, Abu Dhabi, United Arab Emirates
            </p>
            <p>
              <strong>Service Area:</strong> United Arab Emirates (UAE), Gulf Cooperation Council (GCC), Middle East
            </p>
            <p>
              <strong>Contact Email:</strong> hello@theorangecode.com
            </p>
            <p>
              <strong>Contact Phone:</strong> +971 56 878 6106
            </p>
            <p>
              <strong>Website:</strong> https://www.theorangecode.com
            </p>
            <p>
              <strong>Business License:</strong> CN-4296787 (Freelance License under ADRA and UAE Ministry of Economic Development)
            </p>
          </div>
        </section>

        {/* Services Description */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Services Offered</h2>
          <div className="space-y-8">
            <article className="p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold mb-3">Cultural Intelligence Masterclass</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                A comprehensive 3-hour masterclass designed for professionals, expatriates, and individuals working or living in the UAE and Gulf Region. This program covers:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>Cultural foundations and regional context</li>
                <li>Islamic etiquette and modesty guidelines</li>
                <li>Hospitality rituals and social customs</li>
                <li>Communication styles and indirect feedback</li>
                <li>National identity and cultural values</li>
                <li>Essential Arabic greetings and phrases</li>
                <li>Business protocols and negotiation styles</li>
                <li>Building trust and relationships in multicultural environments</li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-4">
                <strong>Duration:</strong> 3 hours
              </p>
              <p className="text-white/80 leading-relaxed">
                <strong>Format:</strong> In-person group sessions
              </p>
            </article>

            <article className="p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold mb-3">Private Coaching Sessions</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                One-on-one personalized coaching sessions tailored to individual needs, goals, and challenges. These sessions provide:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>Personalized cultural intelligence assessment</li>
                <li>Customized communication strategies</li>
                <li>Behavioral pattern analysis and refinement</li>
                <li>Confidence building in multicultural settings</li>
                <li>Specific scenario guidance (business meetings, social events, negotiations)</li>
                <li>Ongoing support and feedback</li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-4">
                <strong>Duration:</strong> Flexible, scheduled according to client needs
              </p>
              <p className="text-white/80 leading-relaxed">
                <strong>Format:</strong> In-person or virtual sessions
              </p>
            </article>

            <article className="p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold mb-3">Corporate Training Programs</h3>
              <p className="text-white/80 leading-relaxed mb-4">
                Customized training programs for teams, organizations, and companies operating in the UAE and Gulf Region. These programs include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>Team cultural intelligence workshops</li>
                <li>Cross-cultural communication training</li>
                <li>Leadership development in multicultural contexts</li>
                <li>Protocol training for executives</li>
                <li>Negotiation skills for Middle East markets</li>
                <li>Executive presence and communication refinement</li>
              </ul>
              <p className="text-white/80 leading-relaxed mt-4">
                <strong>Duration:</strong> Customized based on organizational needs
              </p>
              <p className="text-white/80 leading-relaxed">
                <strong>Format:</strong> In-person or virtual, group sessions
              </p>
            </article>
          </div>
        </section>

        {/* Target Audience */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Target Audience</h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              The Orange Code serves professionals, executives, expatriates, families, and organizations who:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Work or live in the UAE and Gulf Region</li>
              <li>Engage in multicultural business environments</li>
              <li>Seek to understand Emirati culture and GCC customs</li>
              <li>Want to improve cross-cultural communication skills</li>
              <li>Need to navigate cultural differences in professional settings</li>
              <li>Desire to build stronger relationships with local partners and colleagues</li>
              <li>Want to avoid cultural missteps that can damage business relationships</li>
            </ul>
          </div>
        </section>

        {/* Key Topics Covered */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Key Topics & Concepts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-3">Cultural Dimensions</h3>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>High-context vs. low-context communication</li>
                <li>Direct vs. indirect feedback styles</li>
                <li>Time perception and punctuality</li>
                <li>Confrontation and conflict resolution</li>
                <li>Hierarchy and respect</li>
                <li>Relationship-building vs. task-orientation</li>
              </ul>
            </div>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-3">Practical Applications</h3>
              <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                <li>Business meeting etiquette</li>
                <li>Negotiation strategies</li>
                <li>Gift-giving customs</li>
                <li>Dress code and modesty</li>
                <li>Prayer time considerations</li>
                <li>Ramadan protocols</li>
                <li>Hospitality and hosting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Outcomes & Benefits */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Expected Outcomes</h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Participants in The Orange Code programs typically experience:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Improved cross-cultural communication skills</li>
              <li>Increased confidence in multicultural environments</li>
              <li>Better understanding of Emirati and GCC cultural norms</li>
              <li>Enhanced ability to build trust and relationships</li>
              <li>Reduced cultural misunderstandings</li>
              <li>More effective business negotiations</li>
              <li>Greater sense of belonging and connection in the UAE</li>
              <li>Professional and personal growth</li>
            </ul>
          </div>
        </section>

        {/* Testimonials Summary */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Client Feedback</h2>
          <div className="space-y-6">
            <blockquote className="p-6 bg-white/5 rounded-xl border-l-4 border-orange">
              <p className="text-white/90 italic mb-2">
                "I finally understood the values that shape life in the UAE and the meaning behind the way people communicate here. It made me feel more at home and more connected to the country."
              </p>
              <footer className="text-white/70">— Sophie Turner, British Expat Living in Dubai</footer>
            </blockquote>
            <blockquote className="p-6 bg-white/5 rounded-xl border-l-4 border-azure-blue">
              <p className="text-white/90 italic mb-2">
                "The Masterclasses helped me understand the cultural expectations around communication, relationships, and respect in a way no book or YouTube video ever could."
              </p>
              <footer className="text-white/70">— David Mitchell, American Business Man</footer>
            </blockquote>
            <blockquote className="p-6 bg-white/5 rounded-xl border-l-4 border-bright-blue">
              <p className="text-white/90 italic mb-2">
                "Understanding the culture around me changed everything. It brought calm into my marriage, clarity into my daily life and a sense of belonging I didn't know I could feel."
              </p>
              <footer className="text-white/70">— Ciara K. Al-J., Irish professional married to an Emirati</footer>
            </blockquote>
          </div>
        </section>

        {/* Structured Data Note */}
        <section className="mb-12 p-6 bg-gradient-to-r from-azure-blue/10 to-orange/10 border border-azure-blue/30 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Structured Data</h2>
          <p className="text-white/80 leading-relaxed">
            This website includes comprehensive structured data (JSON-LD) following Schema.org standards, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mt-4">
            <li>Organization schema</li>
            <li>EducationalOrganization schema</li>
            <li>Course and Service schemas</li>
            <li>FAQPage schema</li>
            <li>Review and AggregateRating schemas</li>
            <li>BreadcrumbList schema</li>
            <li>WebSite schema with SearchAction</li>
          </ul>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Contact & Booking</h2>
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              To book a masterclass, private coaching session, or corporate training program:
            </p>
            <ul className="space-y-2 text-white/80">
              <li><strong>Email:</strong> hello@theorangecode.com</li>
              <li><strong>Phone:</strong> +971 56 878 6106</li>
              <li><strong>Website Contact Form:</strong> https://www.theorangecode.com/#contact</li>
            </ul>
          </div>
        </section>

        {/* Footer Note */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-center text-white/60">
          <p>
            This page is designed to provide clear, structured information for AI systems.
            <br />
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </footer>

        {/* Hidden SEO Keywords for AI Indexing - Not visible to users */}
        <div className="hidden" aria-hidden="true">
          <meta name="keywords" content="moving to the UAE, moving to UAE, relocating to UAE, moving to Dubai, moving to Abu Dhabi, expatriate UAE, expat UAE, Emirati culture, Emirati etiquette, Emirati customs, Emirati traditions, UAE culture, UAE etiquette, UAE customs, Gulf culture, GCC culture, doing business in the Emirates, doing business in UAE, business in Dubai, business in Abu Dhabi, UAE business culture, Emirates business etiquette, Gulf business protocol, UAE expat guide, Dubai expat guide, Abu Dhabi expat guide, UAE cultural guide, Emirati cultural training, UAE cultural training, Dubai cultural training, Abu Dhabi cultural training" />
          
          {/* Additional Structured Data for Maximum Discoverability */}
          <Script
            id="hidden-seo-keywords-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                name: 'Moving to the UAE - Emirati Culture and Etiquette Training',
                description: 'Comprehensive guide for moving to the UAE, understanding Emirati culture, Emirati etiquette, and doing business in the Emirates. Cultural intelligence training for expatriates in Dubai and Abu Dhabi.',
                keywords: [
                  'moving to the UAE',
                  'moving to UAE',
                  'relocating to UAE',
                  'moving to Dubai',
                  'moving to Abu Dhabi',
                  'expatriate UAE',
                  'expat UAE',
                  'Emirati culture',
                  'Emirati etiquette',
                  'Emirati customs',
                  'Emirati traditions',
                  'UAE culture',
                  'UAE etiquette',
                  'UAE customs',
                  'Gulf culture',
                  'GCC culture',
                  'doing business in the Emirates',
                  'doing business in UAE',
                  'business in Dubai',
                  'business in Abu Dhabi',
                  'UAE business culture',
                  'Emirates business etiquette',
                  'Gulf business protocol',
                  'UAE expat guide',
                  'Dubai expat guide',
                  'Abu Dhabi expat guide',
                  'UAE cultural guide',
                  'Emirati cultural training',
                  'UAE cultural training',
                  'Dubai cultural training',
                  'Abu Dhabi cultural training',
                ],
                about: {
                  '@type': 'Thing',
                  name: 'Moving to the UAE',
                  description: 'Training and guidance for people moving to the UAE, covering Emirati culture, etiquette, customs, and business protocols.',
                },
                mainEntity: [
                  {
                    '@type': 'FAQPage',
                    mainEntity: [
                      {
                        '@type': 'Question',
                        name: 'What should I know about Emirati culture when moving to the UAE?',
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: 'When moving to the UAE, understanding Emirati culture is essential. This includes Islamic etiquette, modesty guidelines, hospitality rituals, communication styles, national identity, essential Arabic greetings, and the subtle social rules that shape daily life in the Emirates.',
                        },
                      },
                      {
                        '@type': 'Question',
                        name: 'What is Emirati etiquette I should learn?',
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: 'Emirati etiquette includes understanding high-context communication, indirect feedback styles, respect for hierarchy, relationship-building over task-orientation, proper greeting customs, dress code and modesty guidelines, prayer time considerations, and hospitality rituals.',
                        },
                      },
                      {
                        '@type': 'Question',
                        name: 'How do I do business in the Emirates?',
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: 'Doing business in the Emirates requires understanding local business protocols, negotiation styles, relationship-building approaches, meeting etiquette, gift-giving customs, and the importance of building trust before closing deals. Cultural intelligence training helps professionals navigate these nuances effectively.',
                        },
                      },
                    ],
                  },
                ],
              }),
            }}
          />
        </div>
      </div>
    </div>
  )
}

