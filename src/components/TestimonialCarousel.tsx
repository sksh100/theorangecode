'use client'

import { useEffect, useState } from 'react'
import { Quote, Shield } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Regional Project Lead',
    role: 'Dutch Construction Leader Managing Major Projects in the Gulf Region',
    company: '',
    content:
      "Working in the Gulf taught me that what feels natural in my own culture doesn't always land the same here. Beyond Formalities helped me understand the unspoken expectations and subtle ways people build trust. My whole approach shifted. I feel more grounded, more respectful and far more effective in every conversation I have.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Ciara K. Al-J.',
    role: 'Irish professional married to an Emirati',
    company: '',
    content:
      "I'm very thankful. Beyond Formalities changed everything. It brought calm into my marriage, clarity into my daily life and a sense of belonging I didn't know I could feel. I understand my husband's world so much better now and I'm genuinely grateful for how much lighter and more connected life here feels after reading Beyond Formalities.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Sophie Turner',
    role: 'British Expat Living in Dubai',
    company: '',
    content:
      'I signed up for the first masterclass of the culture code out of pure curiosity. I wanted to understand the culture I was living in and hoped to learn a few basics. The Cultural Foundations Masterclass and the Masterclass dedicated to Expatriates gave me so much more. I finally understood the values that shape life in the UAE and the meaning behind the way people communicate here. It made me feel more at home and more connected to the country. I see the culture with new appreciation and I no longer feel like an outsider.',
    rating: 5,
  },
  {
    id: 4,
    name: 'M',
    role: 'United Nations Programme Officer',
    company: '',
    content:
      'Coming from France and working in the UN, I thought I understood multicultural dynamics, but the Gulf has its own way of communicating. This training gave me the clarity and confidence to navigate it with real respect and ease.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Dutch Operations Lead',
    role: 'Operations Lead',
    company: 'Ballast Nedam',
    content:
      "I am from The Netherlands and when I started working in this amazing country I did thing The Dutch Way. I had a lot of stress and didn't know why things were not going effortlesly just like back in The Netherlands. I kept comparing and tried to find solutions that were all around defining our KPI's better but I just couldn't get the results I aimed for. Then I came across this and the 'Orange' in the name attracted me. Did around 15 private coaching sessions and man o man what a difference. I couldn't have come up with this on my own. Thank you!",
    rating: 5,
  },
  {
    id: 6,
    name: 'Dmitry P.',
    role: '',
    company: 'Russian Business Conglomerate',
    content:
      'Coming from Russia, I was used to giving feedback very directly axaxa. But in the Gulf, I realised that the same honesty can feel too sharp. This training helped me see how my communication comes across and how I can adjust here and there. The awareness it gave me is honestly the most valuable part. Great job! This is something many people overlook and nobody fills the gap my compliments!',
    rating: 5,
  },
  {
    id: 7,
    name: 'Francesca Morelli',
    role: 'Italian Expat Living in the UAE for 5+ Years',
    company: '',
    content:
      "I have been living in the Gulf already for more than five years because of my husband's work, but honestly I never had the possibility to understand the culture in such a complete way. Many things I was feeling but could not explain. Beyond Formalities finally put all the pieces together. Now I understand why people communicate in certain ways, how respect is shown here and what I was sometimes misunderstanding. I feel much more connected to others and the country. For me Beyond Formalities was really precious.",
    rating: 5,
  },
  {
    id: 8,
    name: 'David Mitchell',
    role: 'American Business Man',
    company: '',
    content:
      "As an American working in the Gulf, I thought being direct and transparent would always be seen as professional. I quickly learned that here it can come across very differently. The Masterclasses helped me understand the cultural expectations around communication, relationships, and respect in a way no book or YouTube video ever could. I finally get why people respond the way they do and how small adjustments on my side make a huge difference. It's made my work relationships smoother & faster and honestly much more enjoyable.",
    rating: 5,
  },
  {
    id: 9,
    name: 'Ahmed Al M.',
    role: 'Emirati Professonial',
    company: '',
    content:
      "I'm really grateful that someone took the time to help others understand our country, our heritage, and our values in such a professional way. I honestly hope people practice what they learn and share this knowledge, so we continue to respect each other. It's inspiring and motivating. Wishing you all the success, inshallah.",
    rating: 5,
  },
]

function TestimonialCard({
  testimonial,
  onPause,
  onResume,
}: {
  testimonial: Testimonial
  onPause: () => void
  onResume: () => void
}) {
  return (
    <article
      className="testimonial-card flex-shrink-0 w-[min(90vw,400px)] glass-card p-6 md:p-8 flex flex-col relative"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onFocus={onPause}
      onBlur={onResume}
    >
      {(testimonial.id === 1 || testimonial.id === 4 || testimonial.id === 6) && (
        <div className="absolute top-4 right-4 z-10">
          <div className="w-6 h-6 bg-orange/20 rounded-full flex items-center justify-center border border-orange/40 backdrop-blur-sm">
            <Shield className="w-3.5 h-3.5 text-orange" />
          </div>
        </div>
      )}

      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-orange/20 to-azure-blue/20 rounded-full flex items-center justify-center">
          <Quote className="w-6 h-6 text-orange" />
        </div>
      </div>

      <blockquote className="flex-grow mb-4">
        <p className="text-white text-sm md:text-base leading-relaxed font-light italic mb-3 tracking-normal">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </blockquote>

      <div className="flex justify-center gap-1 mb-3" aria-label={`${testimonial.rating} out of 5 stars`}>
        {[...Array(testimonial.rating)].map((_, i) => (
          <span key={i} className="text-orange text-base">
            ★
          </span>
        ))}
      </div>

      <div className="text-center mt-auto">
        <h4 className="text-white text-base md:text-lg font-bold mb-1 tracking-normal">
          {testimonial.name}
        </h4>
        {(testimonial.role || testimonial.company) && (
          <p className="text-white/70 text-xs md:text-sm tracking-normal">
            {testimonial.role && testimonial.company
              ? `${testimonial.role} at ${testimonial.company}`
              : testimonial.role || testimonial.company}
          </p>
        )}
      </div>
    </article>
  )
}

export function TestimonialCarousel() {
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  // Duplicate once for seamless CSS loop
  const track = [...TESTIMONIALS, ...TESTIMONIALS]

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const pause = () => setPaused(true)
  const resume = () => setPaused(false)

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary-dark via-primary-dark/95 to-primary-dark">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-64 h-64 bg-azure-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-orange rounded-full" />
            <span className="text-azure-blue font-semibold text-sm uppercase tracking-wider">
              Success Stories
            </span>
            <div className="w-2 h-2 bg-azure-blue rounded-full" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 tracking-normal">
            What Our{' '}
            <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>

          <div className="text-white/70 text-lg max-w-3xl mx-auto tracking-normal space-y-4">
            <p>
              Honest reflections from the people who walked this journey with us.
            </p>
            <p>
              Several clients, marked with a shield, prefer to remain anonymous because of NDA
              requirements, but still offered to share their experience. We are truly thankful for
              every participant who chooses to tell us how the masterclasses shaped their
              understanding of the culture. Here is a small selection.
            </p>
          </div>
        </div>

        {/* Marquee — overflow only on the track wrapper, not the whole section */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="overflow-hidden">
            <div
              className={`flex gap-8 w-max ${reduceMotion ? '' : 'bf-testimonial-marquee'}`}
              style={{
                animationPlayState: paused || reduceMotion ? 'paused' : 'running',
              }}
            >
              {track.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  onPause={pause}
                  onResume={resume}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
