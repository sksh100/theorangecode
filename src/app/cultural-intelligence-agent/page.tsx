'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import { Sparkles, Globe, Users, MessageSquare, Mail, Loader2, CheckCircle2, AlertCircle, Download, FileText } from 'lucide-react'
import dynamic from 'next/dynamic'

const AtmosphericBackground = dynamic(
  () => import('@/components/AtmosphericBackground').then(mod => ({ default: mod.AtmosphericBackground })),
  { ssr: false, loading: () => null }
)

// Comprehensive list of nationalities
const NATIONALITIES = [
  'Emirati (UAE)', 'Saudi Arabian', 'Qatari', 'Kuwaiti', 'Bahraini', 'Omani',
  'British', 'American', 'Canadian', 'Australian', 'New Zealander',
  'Indian', 'Pakistani', 'Bangladeshi', 'Sri Lankan', 'Nepalese',
  'Filipino', 'Indonesian', 'Malaysian', 'Singaporean', 'Thai',
  'Chinese', 'Japanese', 'South Korean', 'Vietnamese',
  'Egyptian', 'Lebanese', 'Jordanian', 'Syrian', 'Iraqi', 'Palestinian',
  'Turkish', 'Iranian', 'Afghan',
  'French', 'German', 'Italian', 'Spanish', 'Dutch', 'Belgian', 'Swiss', 'Swedish', 'Norwegian', 'Danish', 'Finnish',
  'Russian', 'Ukrainian', 'Polish', 'Romanian', 'Greek',
  'South African', 'Kenyan', 'Nigerian', 'Ghanaian',
  'Brazilian', 'Mexican', 'Argentinian', 'Chilean',
  'Other'
]

interface AgentResponse {
  success: boolean
  response?: string
  error?: string
  workCulture?: string
  reportId?: string
  reportSent?: boolean
}

export default function CulturalIntelligenceAgentPage() {
  const [userNationality, setUserNationality] = useState('')
  const [companyNationality, setCompanyNationality] = useState('')
  const [scenario, setScenario] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<AgentResponse | null>(null)
  const [mode, setMode] = useState<'scenario' | 'team' | 'workculture'>('scenario')
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!acceptedDisclaimer) {
      setResponse({ success: false, error: 'Please accept the disclaimer to continue' })
      return
    }
    
    if (!userNationality || !companyNationality || (!scenario && mode !== 'workculture')) {
      setResponse({ success: false, error: 'Please fill in all required fields' })
      return
    }

    if (!email) {
      setResponse({ success: false, error: 'Email is required to receive your report' })
      return
    }

    setIsLoading(true)
    setResponse(null)

    try {
      const res = await fetch('/api/cultural-intelligence-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userNationality,
          companyNationality,
          scenario: mode === 'scenario' ? scenario : undefined,
          teamIssues: mode === 'team' ? scenario : undefined,
          workCulture: mode === 'workculture',
          email,
          mode,
          sendReport: true
        })
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Network error occurred' }))
        throw new Error(errorData.error || `Server error: ${res.status}`)
      }

      const data = await res.json()
      setResponse(data)
      
      // If report was sent automatically, show message
      if (data.reportSent) {
        setTimeout(() => {
          alert('Your report has been generated and sent to your email!')
        }, 500)
      }
    } catch (error: any) {
      console.error('Cultural Intelligence Agent error:', error)
      setResponse({ 
        success: false, 
        error: error.message || 'Failed to get response. Please check your connection and try again.' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateReport = async () => {
    if (!response?.success || !email) return

    setIsGeneratingReport(true)
    try {
      const res = await fetch('/api/cultural-intelligence-agent/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userNationality,
          companyNationality,
          scenario: mode === 'scenario' ? scenario : undefined,
          teamIssues: mode === 'team' ? scenario : undefined,
          workCulture: mode === 'workculture',
          email,
          mode,
          response: response.response,
          workCultureResponse: response.workCulture
        })
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Network error occurred' }))
        throw new Error(errorData.error || `Server error: ${res.status}`)
      }

      const data = await res.json()
      if (data.success) {
        alert('Report generated and sent to your email!')
      } else {
        alert(data.error || 'Failed to generate report. Please try again.')
      }
    } catch (error: any) {
      console.error('Report generation error:', error)
      alert(error.message || 'Failed to generate report. Please check your connection and try again.')
    } finally {
      setIsGeneratingReport(false)
    }
  }

  return (
    <div className="relative w-full bg-primary-dark text-white min-h-screen">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AtmosphericBackground mousePosition={{ x: 0, y: 0 }} scrollProgress={0} />
      </div>

      <ModernNavbar />

      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/5 rounded-full border border-white/10">
              <Sparkles className="w-5 h-5 text-orange" />
              <span className="text-sm font-semibold text-orange uppercase tracking-wider">
                AI-Powered Cultural Intelligence
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                Cultural Intelligence Agent
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
              Get research-based cultural intelligence and behavioral science insights for multicultural teams and workplace scenarios
            </p>
          </motion.div>

          {/* Mode Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => { setMode('scenario'); setResponse(null) }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  mode === 'scenario'
                    ? 'bg-gradient-to-r from-orange to-azure-blue text-white'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Scenario Analysis
              </button>
              <button
                onClick={() => { setMode('team'); setResponse(null) }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  mode === 'team'
                    ? 'bg-gradient-to-r from-orange to-azure-blue text-white'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Team Issues
              </button>
              <button
                onClick={() => { setMode('workculture'); setResponse(null) }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  mode === 'workculture'
                    ? 'bg-gradient-to-r from-orange to-azure-blue text-white'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                <Globe className="w-4 h-4 inline mr-2" />
                Work Culture Design
              </button>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card mb-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Nationality */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-orange" />
                  Your Nationality <span className="text-red-400">*</span>
                </label>
                <select
                  value={userNationality}
                  onChange={(e) => setUserNationality(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-azure-blue/50 focus:bg-white/10 transition-all"
                  required
                >
                  <option value="">Select your nationality</option>
                  {NATIONALITIES.map((nat) => (
                    <option key={nat} value={nat} className="bg-primary-dark">
                      {nat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Company Nationality */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-azure-blue" />
                  Company/Team Nationality <span className="text-red-400">*</span>
                </label>
                <select
                  value={companyNationality}
                  onChange={(e) => setCompanyNationality(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-azure-blue/50 focus:bg-white/10 transition-all"
                  required
                >
                  <option value="">Select company/team nationality</option>
                  {NATIONALITIES.map((nat) => (
                    <option key={nat} value={nat} className="bg-primary-dark">
                      {nat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Scenario/Message Input */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-orange" />
                  {mode === 'scenario' && 'Describe Your Scenario'}
                  {mode === 'team' && 'Describe Team Issues'}
                  {mode === 'workculture' && 'Team Composition (Optional)'}
                  {mode !== 'workculture' && <span className="text-red-400">*</span>}
                </label>
                <textarea
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder={
                    mode === 'scenario'
                      ? 'Describe the situation, communication challenge, or scenario you need help with...'
                      : mode === 'team'
                      ? 'Describe the multicultural team issues, conflicts, or challenges you\'re facing...'
                      : 'Optionally describe your team composition and current work culture...'
                  }
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 focus:bg-white/10 transition-all resize-none"
                  required={mode !== 'workculture'}
                />
              </div>

              {/* Email (Required for report) */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-azure-blue" />
                  Email <span className="text-red-400">*</span>
                  <span className="text-xs text-white/60 font-normal">(Required to receive your report)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>

              {/* Legal Disclaimer */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="disclaimer"
                    checked={acceptedDisclaimer}
                    onChange={(e) => setAcceptedDisclaimer(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-orange focus:ring-2 focus:ring-orange/50 cursor-pointer"
                    required
                  />
                  <label htmlFor="disclaimer" className="text-sm text-white/90 leading-relaxed cursor-pointer">
                    <span className="font-semibold text-white">I accept the following disclaimer:</span>
                    <br />
                    <span className="text-white/80">
                      The Cultural Intelligence Agent provides general informational advice based on cultural intelligence frameworks and behavioral science research. This tool does not provide legal, immigration, tax, financial, medical, or professional advice. The Orange Code and its Cultural Intelligence Agent are not liable for any decisions, actions, or outcomes resulting from the use of this tool. Users are responsible for consulting appropriate professionals for specific legal, financial, or professional matters. By using this tool, you acknowledge that the advice provided is general in nature and may not apply to your specific situation.
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !acceptedDisclaimer}
                className="w-full px-8 py-4 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 text-lg inline-flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Get Cultural Intelligence Insights
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Response Display */}
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card"
            >
              {response.success ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                    <h2 className="text-2xl font-bold text-white">Cultural Intelligence Analysis</h2>
                  </div>
                  
                  {response.response && (
                    <div className="prose prose-invert max-w-none">
                      <div className="text-white/90 leading-relaxed whitespace-pre-wrap">
                        {response.response}
                      </div>
                    </div>
                  )}

                  {response.workCulture && (
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-orange" />
                        Recommended Corporate Work Culture
                      </h3>
                      <div className="text-white/90 leading-relaxed whitespace-pre-wrap">
                        {response.workCulture}
                      </div>
                    </div>
                  )}

                  {/* Report Generation Button */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    {response.reportSent ? (
                      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-400 mb-2">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="font-semibold">Report Sent!</span>
                        </div>
                        <p className="text-sm text-white/80">
                          A beautifully formatted report has been sent to {email}. Check your inbox!
                        </p>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={handleGenerateReport}
                          disabled={isGeneratingReport}
                          className="px-6 py-3 bg-gradient-to-r from-orange to-azure-blue text-white font-semibold rounded-xl transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGeneratingReport ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Generating Report...
                            </>
                          ) : (
                            <>
                              <FileText className="w-5 h-5" />
                              Generate & Send Full Report
                            </>
                          )}
                        </button>
                        <p className="text-sm text-white/60 mt-2">
                          A beautifully formatted HTML report will be sent to {email}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-red-400">
                  <AlertCircle className="w-6 h-6" />
                  <p>{response.error || 'An error occurred. Please try again.'}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 glass-card bg-white/5"
          >
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange/20 to-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-orange" />
                </div>
                <h3 className="font-bold text-white mb-2">Research-Based</h3>
                <p className="text-sm text-white/70">Insights grounded in cultural intelligence and behavioral science research</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-azure-blue/20 to-azure-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-azure-blue" />
                </div>
                <h3 className="font-bold text-white mb-2">Professional</h3>
                <p className="text-sm text-white/70">Designed for corporate teams and workplace scenarios</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange/20 to-azure-blue/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-orange" />
                </div>
                <h3 className="font-bold text-white mb-2">UAE Compliant</h3>
                <p className="text-sm text-white/70">Aligned with UAE business culture and regulations</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <ModernFooter />
    </div>
  )
}

