import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Safety filters - words/phrases to avoid
const RESTRICTED_TOPICS = [
  'legal advice', 'lawyer', 'attorney', 'sue', 'lawsuit', 'legal action',
  'government', 'political', 'politics', 'election', 'vote', 'political party',
  'religious', 'religion', 'prayer', 'worship', 'faith', 'god', 'allah',
  'visa', 'immigration', 'citizenship', 'residency', 'work permit',
  'tax', 'taxation', 'irs', 'vat', 'tax return'
]

function containsRestrictedContent(text: string): boolean {
  const lowerText = text.toLowerCase()
  return RESTRICTED_TOPICS.some(topic => lowerText.includes(topic))
}

function buildPrompt(
  userNationality: string,
  companyNationality: string,
  mode: string,
  scenario?: string,
  teamIssues?: string,
  workCulture?: boolean
): string {
  const basePrompt = `You are a Cultural Intelligence expert specializing in UAE and GCC business culture. Provide professional, research-based insights grounded in cultural intelligence theory and behavioral science.

User Nationality: ${userNationality}
Company/Team Nationality: ${companyNationality}

IMPORTANT GUIDELINES:
1. Focus ONLY on workplace communication, business etiquette, and team dynamics
2. Base insights on established cultural intelligence frameworks (Hofstede, Trompenaars, GLOBE study)
3. Reference behavioral science principles (trust-building, communication styles, decision-making)
4. Provide actionable, practical advice for professional settings
5. Maintain respect for all cultures and nationalities
6. Align with UAE business culture and professional standards
7. DO NOT provide legal, immigration, tax, government, political, or religious advice
8. DO NOT make assumptions about individuals based solely on nationality
9. Focus on general cultural patterns, not stereotypes

`

  if (mode === 'scenario' && scenario) {
    return basePrompt + `SCENARIO ANALYSIS:
The user describes: "${scenario}"

Provide:
1. Cultural context analysis (communication styles, expectations, norms)
2. Behavioral science insights (why this might be happening)
3. Practical recommendations (how to handle this professionally)
4. Cultural intelligence strategies (building bridges, adapting approach)
5. UAE/GCC business culture considerations

Format your response in clear sections with actionable advice.`
  }

  if (mode === 'team' && teamIssues) {
    return basePrompt + `MULTICULTURAL TEAM ISSUES:
The team is experiencing: "${teamIssues}"

Provide:
1. Root cause analysis from cultural intelligence perspective
2. Common challenges between ${userNationality} and ${companyNationality} work styles
3. Research-based solutions (cite cultural frameworks where relevant)
4. Team-building strategies
5. Communication protocols that work across cultures
6. Leadership approaches for multicultural teams

Format your response with specific, actionable recommendations.`
  }

  if (mode === 'workculture' || workCulture) {
    return basePrompt + `CORPORATE WORK CULTURE DESIGN:
Create a unified corporate work culture that transcends individual nationalities and works for a team with ${userNationality} and ${companyNationality} members.

Provide:
1. Core values that resonate across both cultures
2. Communication protocols (meetings, feedback, decision-making)
3. Work style integration (time perception, hierarchy, directness)
4. Team rituals and practices that build cohesion
5. Leadership model that works for both cultures
6. Why this culture works (behavioral science and cultural intelligence rationale)
7. Implementation steps

The culture should be:
- Professional and respectful
- Aligned with UAE business standards
- Inclusive of all team members
- Based on proven cultural intelligence principles
- Practical and implementable

Format your response as a comprehensive work culture framework.`
  }

  return basePrompt
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userNationality, companyNationality, scenario, teamIssues, workCulture, email, mode, sendReport } = body

    // Validate inputs
    if (!userNationality || !companyNationality) {
      return NextResponse.json(
        { success: false, error: 'Nationality fields are required' },
        { status: 400 }
      )
    }

    // Check for restricted content
    const inputText = (scenario || teamIssues || '').toLowerCase()
    if (containsRestrictedContent(inputText)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'This tool focuses on workplace communication and cultural intelligence. For legal, immigration, tax, government, political, or religious matters, please consult appropriate professionals.' 
        },
        { status: 400 }
      )
    }

    // Get OpenAI API key
    const openaiApiKey = process.env.OPENAI_API_KEY

    if (!openaiApiKey) {
      // Fallback response if no API key
      return NextResponse.json({
        success: true,
        response: `Thank you for your inquiry about cultural intelligence between ${userNationality} and ${companyNationality} professionals.

This tool provides research-based cultural intelligence insights. To receive personalized analysis, please ensure the OpenAI API key is configured.

For immediate assistance with workplace cultural challenges, consider:
1. Understanding communication style differences (direct vs indirect)
2. Building trust through relationship-building
3. Respecting hierarchical structures
4. Adapting meeting and decision-making approaches
5. Creating inclusive team environments

For corporate work culture design, focus on:
- Shared values that transcend individual cultures
- Clear communication protocols
- Inclusive leadership practices
- Team-building activities that respect all backgrounds

Contact us at hello@theorangecode.com for personalized Cultural Intelligence training and consulting.`,
        workCulture: mode === 'workculture' ? `A unified corporate work culture for ${userNationality} and ${companyNationality} teams should:

1. **Core Values**: Respect, professionalism, inclusivity, and excellence
2. **Communication**: Structured meetings with clear agendas, written follow-ups, and open feedback channels
3. **Decision-Making**: Collaborative approach with clear authority levels
4. **Work Style**: Balance between relationship-building and task completion
5. **Leadership**: Adaptive leadership that recognizes and values diverse perspectives

This culture works because it creates psychological safety, clear expectations, and mutual respect - principles proven effective across cultures.` : undefined
      })
    }

    // Build prompt
    const prompt = buildPrompt(userNationality, companyNationality, mode, scenario, teamIssues, workCulture)

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using mini for cost efficiency
        messages: [
          {
            role: 'system',
            content: 'You are a Cultural Intelligence expert specializing in UAE and GCC business culture. You provide professional, research-based insights grounded in cultural intelligence theory and behavioral science. You NEVER provide legal, immigration, tax, government, political, or religious advice. You focus exclusively on workplace communication, business etiquette, and team dynamics.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenAI API error:', errorData)
      return NextResponse.json(
        { success: false, error: 'Failed to generate response. Please try again.' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content || ''

    // Double-check response for restricted content
    if (containsRestrictedContent(aiResponse)) {
      return NextResponse.json({
        success: true,
        response: `Thank you for your inquiry. Based on cultural intelligence principles, here are professional insights for ${userNationality} and ${companyNationality} workplace interactions:

**Key Considerations:**
- Communication style differences and how to bridge them
- Building trust through relationship-building and consistent actions
- Understanding hierarchical structures and decision-making processes
- Adapting feedback and conflict resolution approaches
- Creating inclusive team environments

For detailed, personalized Cultural Intelligence guidance, please contact our team at hello@theorangecode.com for professional consulting services.`
      })
    }

    // For work culture mode, try to extract separate work culture section
    let workCultureResponse = undefined
    if (mode === 'workculture' || workCulture) {
      // Try to get a more detailed work culture response
      const workCulturePrompt = buildPrompt(userNationality, companyNationality, 'workculture', undefined, undefined, true)
      
      const workCultureApiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a Cultural Intelligence expert specializing in corporate work culture design for multicultural teams in the UAE and GCC.'
            },
            {
              role: 'user',
              content: workCulturePrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      })

      if (workCultureApiResponse.ok) {
        const workCultureData = await workCultureApiResponse.json()
        workCultureResponse = workCultureData.choices?.[0]?.message?.content || undefined
      }
    }

    // Store inquiry (optional - for analytics)
    // You could store this in your database/KV for tracking

    // If sendReport is true, trigger report generation (non-blocking)
    let reportSent = false
    if (sendReport && email) {
      // Trigger report generation endpoint asynchronously
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.theorangecode.com'}/api/cultural-intelligence-agent/generate-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userNationality,
          companyNationality,
          scenario,
          teamIssues,
          workCulture,
          email,
          mode,
          response: aiResponse,
          workCultureResponse
        })
      }).catch(err => {
        console.error('Background report generation error:', err)
      })
      reportSent = true
    }

    return NextResponse.json({
      success: true,
      response: aiResponse,
      workCulture: workCultureResponse,
      reportSent
    })

  } catch (error: any) {
    console.error('Cultural Intelligence Agent error:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

