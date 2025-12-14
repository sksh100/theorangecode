'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { AdminLiveUpdates } from '@/components/AdminLiveUpdates'
import { VisitorsWorldMap } from '@/components/VisitorsWorldMap'
import { PushRegistration } from '@/components/PushRegistration'
import {
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  CreditCard,
  Download,
  RefreshCw,
  Search,
  Filter,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  CheckCircle,
  XCircle,
  X,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  MapPin,
  Monitor,
  ExternalLink,
  Image as ImageIcon,
  Hash,
  Send,
  Plus,
  Edit,
  Trash2,
  Instagram,
  Linkedin,
  Twitter,
  Sparkles,
} from 'lucide-react'
import { DayContentGenerator } from '@/components/30DayContentGenerator'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface Payment {
  id: string
  amount: number
  currency: string
  status: string
  customerEmail: string
  customerName: string
  createdAt: string
  description: string
  stripeChargeId?: string
  metadata?: any
}

interface Subscriber {
  id: string
  email: string
  name: string
  firstName: string
  lastName: string
  phone: string
  status: string
  source: string
  createdAt: string
  subscribedAt: string
  sent: number
  opensCount: number
  clicksCount: number
  welcomeEmailReceived: boolean
  welcomeEmailOpened: boolean
  welcomeEmailClicked: boolean
}

interface Analytics {
  revenue: {
    total: number
    today: number
    monthly: number
    byDate: Array<{ date: string; amount: number }>
  }
  subscribers: {
    total: number
    today: number
    monthly: number
  }
  payments: {
    total: number
    today: number
    monthly: number
  }
}

interface Visitor {
  id: string
  ip: string
  userAgent: string
  referrer: string
  page: string
  country?: string
  city?: string
  timestamp: string
  sessionId: string
}

interface ActiveSession {
  sessionId: string
  page: string
  country?: string
  city?: string
  lastSeen: string
}

interface VisitorStats {
  totalVisitors: number
  uniqueVisitors: number
  currentVisitors: number
  last24HoursVisitors: number
  lastWeekVisitors: number
  lastMonthVisitors: number
  todayVisitors: number
  monthlyVisitors: number
  activeNow: number
}

const COLORS = ['#00d4ff', '#ff914d', '#0099ff', '#00ffff']

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'subscribers' | 'analytics' | 'visitors' | 'content' | '30day'>('overview')
  const [payments, setPayments] = useState<Payment[]>([])
  const [paymentStats, setPaymentStats] = useState<{ totalRevenue: number; count: number }>({ totalRevenue: 0, count: 0 })
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [gaData, setGaData] = useState<any>(null)
  const [gaLoading, setGaLoading] = useState(false)
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([])
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null)
  const [topCountries, setTopCountries] = useState<Array<{ country: string; count: number }>>([])
  const [countriesRecord, setCountriesRecord] = useState<Record<string, number>>({})
  const [topPages, setTopPages] = useState<Array<{ page: string; views: number }>>([])
  const [dailyVisitorStats, setDailyVisitorStats] = useState<Array<{ date: string; visitors: number }>>([])
  const [comingSoonVisitors, setComingSoonVisitors] = useState<Visitor[]>([])
  const [comingSoonStats, setComingSoonStats] = useState<{ total: number; today: number; thisWeek: number; thisMonth: number } | null>(null)
  const [topSources, setTopSources] = useState<Array<{ source: string; count: number }>>([])
  const [sourceTypes, setSourceTypes] = useState<Array<{ type: string; count: number }>>([])
  const [utmCampaigns, setUtmCampaigns] = useState<Array<{ campaign: string; count: number }>>([])
  const [paymentsLoading, setPaymentsLoading] = useState(false)
  const [subscribersLoading, setSubscribersLoading] = useState(false)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [visitorsLoading, setVisitorsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [resendModalOpen, setResendModalOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [customEmail, setCustomEmail] = useState('')
  const [resending, setResending] = useState(false)
  const [previousCounts, setPreviousCounts] = useState({
    visitors: 0,
    payments: 0,
    subscribers: 0,
  })

  // Request browser notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Play notification sound
  const playNotificationSound = () => {
    if (!soundEnabled) return
    
    try {
      // Create a simple notification sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (error) {
      console.log('Could not play notification sound:', error)
    }
  }

  // Show browser notification
  const showBrowserNotification = (title: string, body: string, icon?: string) => {
    if (!notificationsEnabled || !('Notification' in window)) return
    
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: icon || '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'admin-notification',
      })
    }
  }

  // Check for new events and trigger notifications
  useEffect(() => {
    if (!isAuthenticated) return

    const newVisitors = visitors.length - previousCounts.visitors
    const newPayments = payments.length - previousCounts.payments
    const newSubscribers = subscribers.length - previousCounts.subscribers

    if (newVisitors > 0 && previousCounts.visitors > 0) {
      playNotificationSound()
      showBrowserNotification(
        'New Visitor!',
        `${newVisitors} new visitor${newVisitors > 1 ? 's' : ''} on your site`,
        '/favicon.ico'
      )
    }

    if (newPayments > 0 && previousCounts.payments > 0) {
      playNotificationSound()
      const latestPayment = payments[0]
      showBrowserNotification(
        'New Payment! 💰',
        `${latestPayment.customerName || 'Customer'} paid ${latestPayment.currency} ${latestPayment.amount.toFixed(2)}`,
        '/favicon.ico'
      )
    }

    if (newSubscribers > 0 && previousCounts.subscribers > 0) {
      playNotificationSound()
      showBrowserNotification(
        'New Subscriber!',
        `${newSubscribers} new subscriber${newSubscribers > 1 ? 's' : ''} joined`,
        '/favicon.ico'
      )
    }

    // Update previous counts
    if (visitors.length > 0 || payments.length > 0 || subscribers.length > 0) {
      setPreviousCounts({
        visitors: visitors.length,
        payments: payments.length,
        subscribers: subscribers.length,
      })
    }
  }, [visitors.length, payments.length, subscribers.length, isAuthenticated, notificationsEnabled, soundEnabled])

  // Check URL for tab parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const tabParam = urlParams.get('tab')
      if (tabParam && ['visitors', 'payments', 'subscribers', 'analytics', 'overview', 'content'].includes(tabParam)) {
        setActiveTab(tabParam as typeof activeTab)
      }
    }
  }, [])

  // Check if already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      fetchData()
    }
  }, [])

  // Auto-refresh data every 30 seconds (general data)
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(() => {
      console.log('🔄 Auto-refreshing data...')
      fetchData()
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [isAuthenticated])

  // Poll visitors more frequently when on Visitors tab (every 5 seconds)
  useEffect(() => {
    if (!isAuthenticated || activeTab !== 'visitors') return

    const interval = setInterval(() => {
      console.log('🔄 Polling visitors...')
      fetchVisitors()
    }, 5000) // Refresh every 5 seconds when on Visitors tab

    return () => clearInterval(interval)
  }, [isAuthenticated, activeTab])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
      setLoading(true)
    setAuthError('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        setIsAuthenticated(true)
        localStorage.setItem('admin_authenticated', 'true')
        fetchData()
      } else {
        setAuthError(data.error || 'Invalid password')
      }
    } catch (error) {
      setAuthError('Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_authenticated')
  }

  const fetchData = async () => {
    // Fetch in parallel, then calculate analytics from actual data
    await Promise.all([
      fetchPayments(),
      fetchSubscribers(),
      fetchVisitors(),
      fetchGoogleAnalytics(),
    ])
    // Calculate analytics after we have payments and subscribers data
    fetchAnalytics()
  }

  const fetchVisitors = async () => {
    setVisitorsLoading(true)
    try {
      console.log('👥 Fetching visitors...')
      const response = await fetch('/api/admin/visitors')
      const data = await response.json()
      console.log('👥 Visitors response:', { success: data.success, visitorsCount: data.data?.visitors?.length || 0 })
      if (data.success) {
        const visitorsList = data.data.visitors || []
        const activeSessionsList = data.data.activeSessions || []
        const stats = data.data.stats || {}
        const countries = data.data.countries || []
        const countriesRec = data.data.countriesRecord || {}
        const pages = data.data.pages || []
        const daily = data.data.dailyStats || []
        
        console.log(`✅ Loaded ${visitorsList.length} visitors, ${activeSessionsList.length} active sessions`)
        setVisitors(visitorsList)
        setActiveSessions(activeSessionsList)
        setVisitorStats(stats)
        setTopCountries(countries)
        setCountriesRecord(countriesRec)
        setTopPages(pages)
        setDailyVisitorStats(daily)
        setComingSoonVisitors(data.data.comingSoonVisitors || [])
        setComingSoonStats(data.data.comingSoonStats || { total: 0, today: 0, thisWeek: 0, thisMonth: 0 })
        setTopSources(data.data.sources || [])
        setSourceTypes(data.data.sourceTypes || [])
        setUtmCampaigns(data.data.campaigns || [])
      } else {
        console.error('❌ Failed to fetch visitors:', data.error)
        setVisitors([])
        setActiveSessions([])
        setVisitorStats(null)
      }
    } catch (error) {
      console.error('❌ Error fetching visitors:', error)
      setVisitors([])
      setActiveSessions([])
      setVisitorStats(null)
    } finally {
      setVisitorsLoading(false)
    }
  }

  const fetchPayments = async () => {
    setPaymentsLoading(true)
    try {
      console.log('📊 Fetching payments...')
      const response = await fetch('/api/admin/payments')
      const data = await response.json()
      console.log('📊 Payments response:', { 
        success: data.success, 
        paymentsCount: data.payments?.length || 0,
        totalRevenue: data.stats?.totalRevenue || 0,
        count: data.stats?.count || 0,
        samplePayments: data.payments?.slice(0, 3) || []
      })
      if (data.success !== false) {
        const paymentsList = data.payments || []
        const stats = data.stats || { totalRevenue: 0, count: 0 }
        console.log(`✅ Loaded ${paymentsList.length} payments`)
        console.log('📊 Sample payments:', paymentsList.slice(0, 3))
        setPayments(paymentsList)
        setPaymentStats(stats)
      } else {
        console.error('❌ Failed to fetch payments:', data.error)
        setPayments([])
      }
    } catch (error) {
      console.error('❌ Error fetching payments:', error)
      setPayments([])
    } finally {
      setPaymentsLoading(false)
    }
  }

  const fetchSubscribers = async () => {
    setSubscribersLoading(true)
    try {
      console.log('📧 Fetching subscribers...')
      const response = await fetch('/api/admin/subscribers')
      const data = await response.json()
      console.log('📧 Subscribers response:', { success: data.success, subscribersCount: data.data?.subscribers?.length || 0 })
      if (data.success) {
        const subscribersList = data.data.subscribers || []
        console.log(`✅ Loaded ${subscribersList.length} subscribers`)
        setSubscribers(subscribersList)
      } else {
        console.error('❌ Failed to fetch subscribers:', data.error)
        setSubscribers([])
      }
    } catch (error) {
      console.error('❌ Error fetching subscribers:', error)
      setSubscribers([])
    } finally {
      setSubscribersLoading(false)
    }
  }

  const fetchGoogleAnalytics = async () => {
    setGaLoading(true)
    try {
      const response = await fetch('/api/admin/google-analytics')
      const data = await response.json()
      if (data.success) {
        setGaData(data.data)
      }
    } catch (error) {
      console.error('Error fetching Google Analytics:', error)
    } finally {
      setGaLoading(false)
    }
  }

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true)
    try {
      // Use actual data from payments and subscribers for consistency
      // This ensures Overview tab matches other tabs exactly
      const currentPayments = payments
      const currentSubscribers = subscribers
      
      const analyticsData = {
        revenue: {
          total: currentPayments.reduce((sum, p) => sum + p.amount, 0),
          today: currentPayments.filter(p => {
            const date = new Date(p.createdAt)
            const today = new Date()
            return date.toDateString() === today.toDateString()
          }).reduce((sum, p) => sum + p.amount, 0),
          monthly: currentPayments.filter(p => {
            const date = new Date(p.createdAt)
            const now = new Date()
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
          }).reduce((sum, p) => sum + p.amount, 0),
          byDate: [] as Array<{ date: string; amount: number }>,
        },
        subscribers: {
          total: currentSubscribers.length,
          today: currentSubscribers.filter(s => {
            const date = new Date(s.subscribedAt)
            const today = new Date()
            return date.toDateString() === today.toDateString()
          }).length,
          monthly: currentSubscribers.filter(s => {
            const date = new Date(s.subscribedAt)
            const now = new Date()
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
          }).length,
        },
        payments: {
          total: currentPayments.length,
          today: currentPayments.filter(p => {
            const date = new Date(p.createdAt)
            const today = new Date()
            return date.toDateString() === today.toDateString()
          }).length,
          monthly: currentPayments.filter(p => {
            const date = new Date(p.createdAt)
            const now = new Date()
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
          }).length,
        },
      }

      // Calculate revenue by date (last 30 days)
      const revenueByDate: { [key: string]: number } = {}
      const last30Days = Array.from({ length: 30 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        return date.toISOString().split('T')[0]
      })

      last30Days.forEach(date => {
        revenueByDate[date] = 0
      })

      currentPayments.forEach(payment => {
        const date = new Date(payment.createdAt).toISOString().split('T')[0]
        if (revenueByDate[date] !== undefined) {
          revenueByDate[date] += payment.amount
        }
      })

      analyticsData.revenue.byDate = Object.entries(revenueByDate)
        .map(([date, amount]) => ({ date, amount }))
        .reverse()

      console.log('✅ Analytics calculated:', {
        revenueTotal: analyticsData.revenue.total,
        subscribersTotal: analyticsData.subscribers.total,
        paymentsTotal: analyticsData.payments.total,
      })

      setAnalytics(analyticsData)
    } catch (error) {
      console.error('Error calculating analytics:', error)
      setAnalytics(null)
    } finally {
      setAnalyticsLoading(false)
    }
  }

  // Filter data based on search
  const filteredPayments = payments.filter(p =>
    p.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredSubscribers = subscribers.filter(s =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Login page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card max-w-md w-full p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/70 text-sm">Enter password to access</p>
        </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 focus:bg-white/10 transition-all"
                placeholder="Enter admin password"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)',
              }}
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  // Main dashboard
    return (
    <div className="min-h-screen bg-primary-dark">
      {/* Push Registration for PWA */}
      {isAuthenticated && <PushRegistration />}
      
      {/* Live Updates Component */}
      {isAuthenticated && (
        <AdminLiveUpdates
          pollMs={5000}
          onVisitorsUpdate={(data) => {
            if (data.success !== false && data.data) {
              const visitorsList = data.data.visitors || []
              const activeSessionsList = data.data.activeSessions || []
              const stats = data.data.stats || {}
              const countries = data.data.countries || []
              const countriesRec = data.data.countriesRecord || {}
              const pages = data.data.pages || []
              const daily = data.data.dailyStats || []
              
              setVisitors(visitorsList)
              setActiveSessions(activeSessionsList)
              setVisitorStats({
                totalVisitors: stats.totalVisitors ?? (stats as any).total ?? 0,
                uniqueVisitors: stats.uniqueVisitors ?? (stats as any).unique ?? 0,
                currentVisitors: stats.currentVisitors ?? stats.activeNow ?? 0,
                last24HoursVisitors: stats.last24HoursVisitors ?? 0,
                lastWeekVisitors: stats.lastWeekVisitors ?? 0,
                lastMonthVisitors: stats.lastMonthVisitors ?? 0,
                todayVisitors: stats.todayVisitors ?? (stats as any).today ?? 0,
                monthlyVisitors: stats.monthlyVisitors ?? (stats as any).thisMonth ?? 0,
                activeNow: stats.activeNow ?? 0,
              })
              setTopCountries(countries)
              setCountriesRecord(countriesRec)
              setTopPages(pages)
              setDailyVisitorStats(daily)
              setComingSoonVisitors(data.data.comingSoonVisitors || [])
              setComingSoonStats(data.data.comingSoonStats || { total: 0, today: 0, thisWeek: 0, thisMonth: 0 })
              setTopSources(data.data.sources || [])
              setSourceTypes(data.data.sourceTypes || [])
              setUtmCampaigns(data.data.campaigns || [])
            }
          }}
          onPaymentsUpdate={(data) => {
            if (data.success !== false) {
              const paymentsList = data.payments || []
              const stats = data.stats || {}
              setPayments(paymentsList)
              setPaymentStats({
                totalRevenue: stats.totalRevenue ?? 0,
                count: stats.count ?? 0,
              })
            }
          }}
          onSubscribersUpdate={(data) => {
            // Only update if we have valid data structure
            if (data.success !== false && (data.data || data.subscribers)) {
              const subscribersList = data.data?.subscribers || data.subscribers || []
              console.log(`✅ AdminLiveUpdates: Updating ${subscribersList.length} subscribers`)
              setSubscribers(subscribersList)
            }
          }}
        />
      )}
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary-dark/95 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-white/70 text-sm mt-1">The Orange Code</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Notification Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-2 rounded-lg border transition-all ${
                    soundEnabled
                      ? 'bg-azure-blue/20 border-azure-blue/30 text-azure-blue'
                      : 'bg-white/5 border-white/10 text-white/50'
                  }`}
                  title={soundEnabled ? 'Sound notifications ON' : 'Sound notifications OFF'}
                >
                  <Bell className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    if (!notificationsEnabled && 'Notification' in window) {
                      Notification.requestPermission()
                    }
                    setNotificationsEnabled(!notificationsEnabled)
                  }}
                  className={`p-2 rounded-lg border transition-all ${
                    notificationsEnabled
                      ? 'bg-green-500/20 border-green-500/30 text-green-400'
                      : 'bg-white/5 border-white/10 text-white/50'
                  }`}
                  title={notificationsEnabled ? 'Browser notifications ON' : 'Browser notifications OFF'}
                >
                  <Bell className={`w-5 h-5 ${notificationsEnabled ? 'fill-current' : ''}`} />
                </button>
              </div>
              <button 
                onClick={fetchData}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
                title="Refresh data"
              >
                <RefreshCw className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg border border-red-500/30 text-red-300 transition-all flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/10 bg-primary-dark/50 backdrop-blur-sm sticky top-[73px] z-40">
        <div className="container mx-auto px-2 sm:px-4 md:px-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide scroll-smooth -mx-2 px-2 sm:mx-0 sm:px-0">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'subscribers', label: 'Subscribers', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: Activity },
              { id: 'visitors', label: 'Visitors', icon: Globe },
              { id: 'content', label: 'Content Planner', icon: Calendar },
              { id: '30day', label: '30-Day Generator', icon: Sparkles },
            ].map((tab) => (
            <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center gap-1.5 sm:gap-2 border-b-2 transition-all flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'border-azure-blue text-azure-blue'
                    : 'border-transparent text-white/70 hover:text-white hover:border-white/20'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="whitespace-nowrap text-sm sm:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Cards - Use actual data from payments and subscribers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-azure-blue/20 rounded-lg">
                      <DollarSign className="w-6 h-6 text-azure-blue" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-white/70 text-sm mb-1">Total Revenue</h3>
                  <p className="text-3xl font-bold text-white">
                    {paymentsLoading ? '...' : paymentStats.totalRevenue.toFixed(2)} AED
                  </p>
                  <p className="text-xs text-white/50 mt-2">
                    {paymentsLoading ? '...' : payments.filter(p => {
                      const date = new Date(p.createdAt)
                      const now = new Date()
                      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                    }).reduce((sum, p) => sum + p.amount, 0).toFixed(2)} AED this month
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-orange/20 rounded-lg">
                      <Users className="w-6 h-6 text-orange" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-white/70 text-sm mb-1">Total Subscribers</h3>
                  <p className="text-3xl font-bold text-white">
                    {subscribersLoading ? '...' : subscribers.length.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/50 mt-2">
                    {subscribersLoading ? '...' : subscribers.filter(s => {
                      const date = new Date(s.subscribedAt)
                      const now = new Date()
                      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                    }).length} this month
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-bright-blue/20 rounded-lg">
                      <CreditCard className="w-6 h-6 text-bright-blue" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-white/70 text-sm mb-1">Total Payments</h3>
                  <p className="text-3xl font-bold text-white">
                    {paymentsLoading ? '...' : paymentStats.count.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/50 mt-2">
                    {paymentsLoading ? '...' : payments.filter(p => {
                      const date = new Date(p.createdAt)
                      const today = new Date()
                      return date.toDateString() === today.toDateString()
                    }).length} today
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-white/70 text-sm mb-1">Today's Revenue</h3>
                  <p className="text-3xl font-bold text-white">
                    {paymentsLoading ? '...' : payments.filter(p => {
                      const date = new Date(p.createdAt)
                      const today = new Date()
                      return date.toDateString() === today.toDateString()
                    }).reduce((sum, p) => sum + p.amount, 0).toFixed(2)} AED
                  </p>
                  <p className="text-xs text-white/50 mt-2">
                    {paymentsLoading ? '...' : payments.filter(p => {
                      const date = new Date(p.createdAt)
                      const today = new Date()
                      return date.toDateString() === today.toDateString()
                    }).length} payments today
                  </p>
                </motion.div>
              </div>

              {/* Charts */}
              {(() => {
                // Calculate revenue by date from actual payments
                const revenueByDate: { [key: string]: number } = {}
                const last30Days = Array.from({ length: 30 }, (_, i) => {
                  const date = new Date()
                  date.setDate(date.getDate() - i)
                  return date.toISOString().split('T')[0]
                })

                last30Days.forEach(date => {
                  revenueByDate[date] = 0
                })

                payments.forEach(payment => {
                  const date = new Date(payment.createdAt).toISOString().split('T')[0]
                  if (revenueByDate[date] !== undefined) {
                    revenueByDate[date] += payment.amount
                  }
                })

                const chartData = Object.entries(revenueByDate)
                  .map(([date, amount]) => ({ date, amount }))
                  .reverse()

                return chartData.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass-card p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">Revenue Trend (30 Days)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="date"
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                        />
                        <YAxis
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(1, 1, 30, 0.95)',
                            border: '1px solid rgba(0, 212, 255, 0.3)',
                            borderRadius: '8px',
                            color: '#fff',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="amount"
                          stroke="#00d4ff"
                          strokeWidth={2}
                          dot={{ fill: '#00d4ff', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass-card p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">Payment Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={(() => {
                            const todayPayments = payments.filter(p => {
                              const date = new Date(p.createdAt)
                              const today = new Date()
                              return date.toDateString() === today.toDateString()
                            }).length
                            const monthlyPayments = payments.filter(p => {
                              const date = new Date(p.createdAt)
                              const now = new Date()
                              return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                            }).length
                            return [
                              { name: 'Today', value: todayPayments },
                              { name: 'This Month', value: monthlyPayments - todayPayments },
                              { name: 'Total', value: payments.length - monthlyPayments },
                            ]
                          })()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(props: any) => {
                            const percent = props.percent || 0
                            const name = props.name || ''
                            return `${name} ${(percent * 100).toFixed(0)}%`
                          }}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {(() => {
                            const todayPayments = payments.filter(p => {
                              const date = new Date(p.createdAt)
                              const today = new Date()
                              return date.toDateString() === today.toDateString()
                            }).length
                            const monthlyPayments = payments.filter(p => {
                              const date = new Date(p.createdAt)
                              const now = new Date()
                              return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                            }).length
                            return [
                              { name: 'Today', value: todayPayments },
                              { name: 'This Month', value: monthlyPayments - todayPayments },
                              { name: 'Total', value: payments.length - monthlyPayments },
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))
                          })()}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(1, 1, 30, 0.95)',
                            border: '1px solid rgba(0, 212, 255, 0.3)',
                            borderRadius: '8px',
                            color: '#fff',
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>
                )
              })()}
            </motion.div>
          )}

          {activeTab === 'payments' && (
            <motion.div
              key="payments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Search and Filters */}
              <div className="glass-card p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search payments..."
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50"
                    />
                  </div>
                  <button
                    onClick={fetchPayments}
                    className="px-4 py-2 bg-azure-blue/20 hover:bg-azure-blue/30 rounded-lg border border-azure-blue/30 text-azure-blue transition-all flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
                </div>
              </div>

              {/* Payments Table */}
              <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white">Recent Payments</h2>
                </div>
                {paymentsLoading ? (
                  <div className="p-8 text-center text-white/70">Loading payments...</div>
                ) : filteredPayments.length === 0 ? (
                  <div className="p-8 text-center text-white/70">No payments found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Payment ID</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Customer</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Amount</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPayments.map((payment, index) => (
                          <motion.tr
                            key={payment.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-t border-white/5 hover:bg-white/5 transition-colors"
                          >
                            <td className="px-6 py-4 text-sm text-white/90 font-mono">{payment.id.substring(0, 20)}...</td>
                            <td className="px-6 py-4">
                              <div>
                                <p className="text-white font-medium">{payment.customerName}</p>
                                <p className="text-white/60 text-xs">{payment.customerEmail}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-white font-semibold">
                              {payment.amount.toLocaleString()} {payment.currency}
                            </td>
                            <td className="px-6 py-4">
                              {payment.status === 'succeeded' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                  <CheckCircle className="w-3 h-3" />
                                  Succeeded
                                </span>
                              ) : payment.status === 'pending' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                                  <Clock className="w-3 h-3" />
                                  Pending
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                                  <XCircle className="w-3 h-3" />
                                  Failed
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-white/70 text-sm">
                              {new Date(payment.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {(payment.amount === 149 && payment.currency === 'AED') || (payment.metadata?.ebookType || payment.metadata?.type) && (
                                  <button
                                    onClick={() => {
                                      setSelectedPayment(payment)
                                      setCustomEmail(payment.customerEmail)
                                      setResendModalOpen(true)
                                    }}
                                    className="px-3 py-1.5 bg-orange/20 hover:bg-orange/30 border border-orange/30 rounded-lg text-orange text-xs font-medium transition-colors flex items-center gap-1"
                                    title="Resend ebook (can change email address)"
                                  >
                                    <Mail className="w-3 h-3" />
                                    Resend Ebook
                                  </button>
                                )}
                                {payment.stripeChargeId && (
                                  <a
                                    href={`https://dashboard.stripe.com/payments/${payment.stripeChargeId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 bg-azure-blue/20 hover:bg-azure-blue/30 border border-azure-blue/30 rounded-lg text-azure-blue text-xs font-medium transition-colors flex items-center gap-1"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    Stripe
                                  </a>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'subscribers' && (
            <motion.div
              key="subscribers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Search and Filters */}
              <div className="glass-card p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search subscribers..."
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50"
                    />
                  </div>
            <button 
                    onClick={fetchSubscribers}
                    className="px-4 py-2 bg-azure-blue/20 hover:bg-azure-blue/30 rounded-lg border border-azure-blue/30 text-azure-blue transition-all flex items-center gap-2"
            >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
            </button>
          </div>
        </div>

              {/* Subscribers Table */}
              <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white">Subscribers</h2>
                </div>
                {subscribersLoading ? (
                  <div className="p-8 text-center text-white/70">Loading subscribers...</div>
                ) : filteredSubscribers.length === 0 ? (
                  <div className="p-8 text-center text-white/70">No subscribers found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Subscribed</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email Stats</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Welcome Email</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Source</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSubscribers.map((subscriber, index) => (
                          <motion.tr
                            key={subscriber.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-t border-white/5 hover:bg-white/5 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div>
                                <p className="text-white font-medium">{subscriber.name}</p>
                                {subscriber.phone && (
                                  <p className="text-white/60 text-xs">{subscriber.phone}</p>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-white/90">{subscriber.email}</td>
                            <td className="px-6 py-4">
                              <div className="text-white/70 text-sm">
                                <p>{new Date(subscriber.subscribedAt).toLocaleDateString()}</p>
                                <p className="text-xs text-white/50">
                                  {new Date(subscriber.subscribedAt).toLocaleTimeString()}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1 text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="text-white/70">Sent:</span>
                                  <span className="text-white font-semibold">{subscriber.sent || 0}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Eye className="w-3 h-3 text-azure-blue" />
                                  <span className="text-white/70">Opens:</span>
                                  <span className="text-azure-blue font-semibold">{subscriber.opensCount || 0}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Activity className="w-3 h-3 text-orange" />
                                  <span className="text-white/70">Clicks:</span>
                                  <span className="text-orange font-semibold">{subscriber.clicksCount || 0}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {subscriber.welcomeEmailReceived ? (
                                <div className="flex flex-col gap-1">
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                    <CheckCircle className="w-3 h-3" />
                                    Received
                                  </span>
                                  {subscriber.welcomeEmailOpened && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-azure-blue/20 text-azure-blue rounded-full text-xs mt-1">
                                      <Eye className="w-3 h-3" />
                                      Opened
                                    </span>
                                  )}
                                  {subscriber.welcomeEmailClicked && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange/20 text-orange rounded-full text-xs mt-1">
                                      <Activity className="w-3 h-3" />
                                      Clicked
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs">
                                  <XCircle className="w-3 h-3" />
                                  Not Sent
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-azure-blue/20 text-azure-blue rounded-full text-xs">
                                {subscriber.source}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Google Analytics Section */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Google Analytics</h2>
                  <button
                    onClick={fetchGoogleAnalytics}
                    className="px-4 py-2 bg-azure-blue/20 hover:bg-azure-blue/30 rounded-lg border border-azure-blue/30 text-azure-blue transition-all flex items-center gap-2 text-sm"
                  >
                    <RefreshCw className={`w-4 h-4 ${gaLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                </div>
                {gaLoading ? (
                  <div className="p-8 text-center text-white/70">Loading Google Analytics...</div>
                ) : gaData ? (
                  <div className="space-y-4">
                    {gaData.configured ? (
                      <>
                        {gaData.setupRequired ? (
                          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                            <p className="text-yellow-400 text-sm font-semibold mb-2">Setup Required</p>
                            <p className="text-white/80 text-sm mb-3">
                              Google Analytics is configured ({gaData.measurementId}), but the Data API needs to be set up to see real-time data in the dashboard.
                            </p>
                            <p className="text-white/60 text-xs mb-3">
                              View your analytics directly in Google Analytics:
                            </p>
                            <a
                              href="https://analytics.google.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-block px-4 py-2 bg-azure-blue/20 hover:bg-azure-blue/30 border border-azure-blue/30 rounded-lg text-azure-blue text-sm transition-colors flex items-center gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Open Google Analytics Dashboard
                            </a>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white/5 rounded-lg p-4">
                              <p className="text-white/60 text-xs mb-1">Total Users</p>
                              <p className="text-2xl font-bold text-white">{gaData.stats?.totalUsers?.toLocaleString() || 0}</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                              <p className="text-white/60 text-xs mb-1">Active Now</p>
                              <p className="text-2xl font-bold text-orange">{gaData.realtimeUsers || 0}</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                              <p className="text-white/60 text-xs mb-1">Page Views</p>
                              <p className="text-2xl font-bold text-white">{gaData.stats?.pageViews?.toLocaleString() || 0}</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                              <p className="text-white/60 text-xs mb-1">Sessions</p>
                              <p className="text-2xl font-bold text-white">{gaData.stats?.sessions?.toLocaleString() || 0}</p>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="bg-orange/10 border border-orange/30 rounded-lg p-4">
                        <p className="text-orange text-sm font-semibold mb-2">Google Analytics Not Configured</p>
                        <p className="text-white/80 text-sm mb-3">
                          Add <code className="bg-white/10 px-2 py-1 rounded text-xs">NEXT_PUBLIC_GA_MEASUREMENT_ID</code> to Vercel environment variables to enable Google Analytics tracking.
                        </p>
                        <a
                          href="https://analytics.google.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-orange/20 hover:bg-orange/30 border border-orange/30 rounded-lg text-orange text-sm transition-colors flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Set Up Google Analytics
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 text-center text-white/70 text-sm">No Google Analytics data available</div>
                )}
              </div>

              {analyticsLoading ? (
                <div className="glass-card p-8 text-center text-white/70">Loading analytics...</div>
              ) : analytics ? (
                <>
                  {/* Revenue Chart */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass-card p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">Revenue Analytics</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={analytics.revenue.byDate}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="date"
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                        />
                        <YAxis
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(1, 1, 30, 0.95)',
                            border: '1px solid rgba(0, 212, 255, 0.3)',
                            borderRadius: '8px',
                            color: '#fff',
                          }}
                        />
                        <Bar dataKey="amount" fill="#00d4ff" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Detailed Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass-card p-6"
                    >
                      <h4 className="text-white/70 text-sm mb-2">Revenue Breakdown</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/70">Total</span>
                          <span className="text-white font-semibold">{analytics.revenue.total.toLocaleString()} AED</span>
              </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">This Month</span>
                          <span className="text-white font-semibold">{analytics.revenue.monthly.toLocaleString()} AED</span>
              </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Today</span>
                          <span className="text-white font-semibold">{analytics.revenue.today.toLocaleString()} AED</span>
              </div>
            </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass-card p-6"
                    >
                      <h4 className="text-white/70 text-sm mb-2">Subscriber Growth</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/70">Total</span>
                          <span className="text-white font-semibold">{analytics.subscribers.total.toLocaleString()}</span>
              </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">This Month</span>
                          <span className="text-white font-semibold">{analytics.subscribers.monthly}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Today</span>
                          <span className="text-white font-semibold">{analytics.subscribers.today}</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass-card p-6"
                    >
                      <h4 className="text-white/70 text-sm mb-2">Payment Stats</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/70">Total</span>
                          <span className="text-white font-semibold">{analytics.payments.total.toLocaleString()}</span>
                </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">This Month</span>
                          <span className="text-white font-semibold">{analytics.payments.monthly}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Today</span>
                          <span className="text-white font-semibold">{analytics.payments.today}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </>
              ) : (
                <div className="glass-card p-8 text-center text-white/70">No analytics data available</div>
              )}
            </motion.div>
          )}

          {activeTab === 'visitors' && (
            <motion.div
              key="visitors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Coming Soon Page Analytics */}
              {comingSoonStats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-6 mb-6 border-2 border-azure-blue/30"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-azure-blue" />
                        Coming Soon Page Analytics
                      </h2>
                      <p className="text-white/60 text-sm mt-1">
                        Track how many people visit your coming soon page and where they come from
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <h3 className="text-white/70 text-sm mb-1">Total Visits</h3>
                      <p className="text-2xl font-bold text-white">{comingSoonStats.total.toLocaleString()}</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <h3 className="text-white/70 text-sm mb-1">Today</h3>
                      <p className="text-2xl font-bold text-azure-blue">{comingSoonStats.today.toLocaleString()}</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <h3 className="text-white/70 text-sm mb-1">This Week</h3>
                      <p className="text-2xl font-bold text-orange">{comingSoonStats.thisWeek.toLocaleString()}</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <h3 className="text-white/70 text-sm mb-1">This Month</h3>
                      <p className="text-2xl font-bold text-green-400">{comingSoonStats.thisMonth.toLocaleString()}</p>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Sources */}
                    {topSources.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-white mb-4">Top Traffic Sources</h3>
                        <div className="space-y-2">
                          {topSources.slice(0, 10).map((source, index) => (
                            <motion.div
                              key={source.source}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                            >
                              <span className="text-white text-sm">{source.source}</span>
                              <span className="text-azure-blue font-semibold">{source.count}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Source Types */}
                    {sourceTypes.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-white mb-4">Source Types</h3>
                        <div className="space-y-2">
                          {sourceTypes.map((type, index) => (
                            <motion.div
                              key={type.type}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                            >
                              <span className="text-white text-sm capitalize">{type.type}</span>
                              <span className="text-orange font-semibold">{type.count}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* UTM Campaigns */}
                  {utmCampaigns.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-bold text-white mb-4">UTM Campaigns</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {utmCampaigns.slice(0, 9).map((campaign, index) => (
                          <motion.div
                            key={campaign.campaign}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-3 bg-white/5 rounded-lg border border-white/10"
                          >
                            <p className="text-white text-sm font-medium truncate">{campaign.campaign}</p>
                            <p className="text-azure-blue text-xs mt-1">{campaign.count} visits</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Coming Soon Visitors */}
                  {comingSoonVisitors.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-bold text-white mb-4">Recent Coming Soon Visitors</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-white/5">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-white">Time</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-white">Source</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-white">Location</th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-white">Campaign</th>
                            </tr>
                          </thead>
                          <tbody>
                            {comingSoonVisitors.slice(0, 20).map((visitor, index) => (
                              <motion.tr
                                key={visitor.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.02 }}
                                className="border-t border-white/5 hover:bg-white/5"
                              >
                                <td className="px-4 py-3 text-white/70 text-sm">
                                  {new Date(visitor.timestamp).toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-white text-sm">
                                  {(visitor as any).source || 'direct'}
                                </td>
                                <td className="px-4 py-3 text-white/70 text-sm">
                                  {visitor.country ? (
                                    <span>{visitor.city ? `${visitor.city}, ` : ''}{visitor.country}</span>
                                  ) : (
                                    <span className="text-white/40">Unknown</span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-white/70 text-sm">
                                  {(visitor as any).utmCampaign || '-'}
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Stats Cards - Visitor Statistics */}
              {visitorStats && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {/* Total Visitors */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6 border-2 border-azure-blue/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-azure-blue/20 rounded-lg">
                        <Globe className="w-6 h-6 text-azure-blue" />
                      </div>
                    </div>
                    <h3 className="text-white/70 text-sm mb-1">Total Visitors</h3>
                    <p className="text-3xl font-bold text-white">
                      {visitorStats.totalVisitors.toLocaleString()}
                    </p>
                  </motion.div>

                  {/* Unique Visitors */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6 border-2 border-orange/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-orange/20 rounded-lg">
                        <Users className="w-6 h-6 text-orange" />
                      </div>
                    </div>
                    <h3 className="text-white/70 text-sm mb-1">Unique Visitors</h3>
                    <p className="text-3xl font-bold text-white">
                      {(visitorStats.uniqueVisitors || visitorStats.totalVisitors || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-white/50 mt-2">Currently = Total</p>
                  </motion.div>

                  {/* Active Now */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6 border-2 border-green-500/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-green-500/20 rounded-lg">
                        <Activity className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400 font-semibold">Live</span>
                      </div>
                    </div>
                    <h3 className="text-white/70 text-sm mb-1">Active Now</h3>
                    <p className="text-3xl font-bold text-white">
                      {(visitorStats.currentVisitors || visitorStats.activeNow || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-white/50 mt-2">Last 60 seconds</p>
                  </motion.div>

                  {/* Today */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6 border-2 border-purple-500/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-500/20 rounded-lg">
                        <Calendar className="w-6 h-6 text-purple-400" />
                      </div>
                    </div>
                    <h3 className="text-white/70 text-sm mb-1">Today</h3>
                    <p className="text-3xl font-bold text-white">
                      {(visitorStats.todayVisitors || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-white/50 mt-2">This month: {(visitorStats.monthlyVisitors || 0).toLocaleString()}</p>
                  </motion.div>
                </div>
              )}

              {/* World Map Visualization - Always show */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="glass-card p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">World Map - Visitor Distribution</h3>
                
                {/* Interactive World Map */}
                <div className="relative w-full h-96 bg-white/5 rounded-lg border border-white/10 overflow-hidden mb-6 p-4">
                  <VisitorsWorldMap countries={countriesRecord} />
                </div>

                {/* Country List with Percentages */}
                {topCountries.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-white/70 text-sm mb-3">Top Countries by Visitor Count</h4>
                    {topCountries.slice(0, 10).map((country, index) => {
                      const total = topCountries.reduce((sum, c) => sum + c.count, 0)
                      const percentage = ((country.count / total) * 100).toFixed(1)
                      return (
                        <motion.div
                          key={country.country}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <MapPin className="w-4 h-4 text-azure-blue" />
                            <span className="text-white font-medium">{country.country}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="h-full bg-gradient-to-r from-azure-blue to-bright-blue"
                              />
                            </div>
                            <span className="text-azure-blue font-semibold text-sm w-16 text-right">
                              {percentage}%
                            </span>
                            <span className="text-white/70 text-sm w-12 text-right">
                              {country.count}
                            </span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </motion.div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visitor Trend Chart */}
                {dailyVisitorStats.length > 0 && (
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass-card p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">Visitor Trend (30 Days)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={dailyVisitorStats}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="date"
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                        />
                        <YAxis
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(1, 1, 30, 0.95)',
                            border: '1px solid rgba(0, 212, 255, 0.3)',
                            borderRadius: '8px',
                            color: '#fff',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="visitors"
                          stroke="#00d4ff"
                          strokeWidth={2}
                          dot={{ fill: '#00d4ff', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

                {/* Top Countries Chart */}
                {topCountries.length > 0 && (
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass-card p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">Top Countries</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={topCountries.slice(0, 10)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="country"
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis
                          stroke="rgba(255,255,255,0.5)"
                          tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(1, 1, 30, 0.95)',
                            border: '1px solid rgba(0, 212, 255, 0.3)',
                            borderRadius: '8px',
                            color: '#fff',
                          }}
                        />
                        <Bar dataKey="count" fill="#ff914d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </div>

              {/* Active Sessions - Always show */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Active Visitors Right Now</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={fetchVisitors}
                      className="px-2 py-1 bg-azure-blue/20 hover:bg-azure-blue/30 rounded border border-azure-blue/30 text-azure-blue text-xs transition-all"
                      title="Refresh visitors"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                      {activeSessions.filter((s: any) => s.isActive !== false && s.isActive !== undefined).length} Active
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeSessions.filter((s: any) => s.isActive !== false && s.isActive !== undefined).length > 0 ? (
                    activeSessions.filter((s: any) => s.isActive !== false && s.isActive !== undefined).map((session: any, index: number) => (
                      <motion.div
                        key={session.sessionId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-green-500/20 rounded-lg">
                            <Monitor className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm truncate">{session.page}</p>
                            {session.country && (
                              <p className="text-white/60 text-xs flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3 text-azure-blue" />
                                {session.city ? `${session.city}, ` : ''}{session.country}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Time on page:</span>
                            <span className="text-white font-semibold">
                              {session.timeOnPage ? `${Math.floor(session.timeOnPage / 60)}m ${session.timeOnPage % 60}s` : '0s'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Clicks:</span>
                            <span className="text-azure-blue font-semibold">{session.clicks || 0}</span>
                          </div>
                          {session.scrollDepth > 0 && (
                            <div className="flex items-center justify-between">
                              <span className="text-white/70">Scroll:</span>
                              <span className="text-orange font-semibold">{Math.round(session.scrollDepth)}%</span>
                            </div>
                          )}
                          {session.lastClick && (
                            <div className="pt-1 border-t border-white/10">
                              <p className="text-white/60 text-xs truncate">
                                Last click: {session.lastClick.target || 'Element'}
                              </p>
                            </div>
                          )}
                          <div className="flex items-center justify-between pt-1 border-t border-white/10">
                            <span className="text-white/50 text-xs">
                              {session.timeSinceLastActivity < 60 
                                ? `Active ${session.timeSinceLastActivity}s ago` 
                                : `Last seen ${Math.floor(session.timeSinceLastActivity / 60)}m ago`}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                      ))
                    ) : (
                      <div className="col-span-full p-8 text-center text-white/70">
                        <Activity className="w-12 h-12 mx-auto mb-4 text-white/30" />
                        <p className="mb-2 text-lg">No active visitors right now</p>
                        <p className="text-sm text-white/50 mb-2">
                          Open your website in another tab to see yourself as a visitor!
                        </p>
                        <p className="text-xs text-white/40 mb-4">
                          Active visitors are tracked in real-time. Refresh this page to see updates.
                        </p>
                        <div className="text-xs text-white/40 space-y-1">
                          <p>💡 Troubleshooting:</p>
                          <p>1. Check browser console (F12) for tracking logs</p>
                          <p>2. Verify KV_REST_API_URL and KV_REST_API_TOKEN are set in Vercel</p>
                          <p>3. Make sure VisitorTracker is loaded (check Network tab for /api/track-visitor calls)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

              {/* Top Pages */}
              {topPages.length > 0 && (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="glass-card p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Top Pages</h3>
                  <div className="space-y-2">
                    {topPages.slice(0, 10).map((page, index) => (
                      <motion.div
                        key={page.page}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <ExternalLink className="w-4 h-4 text-white/50 flex-shrink-0" />
                          <p className="text-white text-sm truncate">{page.page}</p>
                        </div>
                        <span className="text-azure-blue font-semibold text-sm ml-4">
                          {page.views.toLocaleString()} views
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Recent Visitors Table */}
              <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Recent Visitors</h2>
                    <p className="text-white/50 text-xs mt-1">
                      Visitor tracking is active. Open your website in another tab to see yourself here!
                    </p>
                  </div>
                  <button
                    onClick={fetchVisitors}
                    className="px-4 py-2 bg-azure-blue/20 hover:bg-azure-blue/30 rounded-lg border border-azure-blue/30 text-azure-blue transition-all flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>
                {visitorsLoading ? (
                  <div className="p-8 text-center text-white/70">Loading visitors...</div>
                ) : visitors.length === 0 ? (
                  <div className="p-8 text-center text-white/70">
                    <Globe className="w-12 h-12 mx-auto mb-4 text-white/30" />
                    <p className="mb-2">No visitors yet.</p>
                    <p className="text-sm text-white/50">
                      Visitor tracking is active! Open your website ({process.env.NEXT_PUBLIC_BASE_URL || 'theorangecode.com'}) in another tab or share it with someone to see visitor data appear here.
                    </p>
                    <p className="text-xs text-white/40 mt-4">
                      The tracker automatically records: page views, location, IP address, clicks, scroll depth, and time on page.
                    </p>
                  </div>
                ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Timestamp</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">IP Address</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Location</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Page/Path</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Referrer</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">User Agent</th>
                      </tr>
                    </thead>
                    <tbody>
                        {visitors.slice(0, 50).map((visitor, index) => (
                          <motion.tr
                            key={visitor.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.02 }}
                            className="border-t border-white/5 hover:bg-white/5 transition-colors"
                          >
                            <td className="px-6 py-4 text-white/70 text-sm">
                              {new Date(visitor.timestamp).toLocaleString()}
                          </td>
                            <td className="px-6 py-4 text-white/90 text-sm font-mono">
                              {visitor.ip || 'Unknown'}
                          </td>
                            <td className="px-6 py-4">
                              {visitor.country ? (
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-3 h-3 text-azure-blue" />
                                  <span className="text-white text-sm">
                                    {visitor.city ? `${visitor.city}, ` : ''}{visitor.country}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-white/50 text-sm">Unknown</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <ExternalLink className="w-3 h-3 text-white/50" />
                                <span className="text-white text-sm">{visitor.page}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {visitor.referrer ? (
                                <a
                                  href={visitor.referrer}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-azure-blue text-sm hover:underline truncate max-w-xs block"
                                  title={visitor.referrer}
                                >
                                  {visitor.referrer.length > 50 ? `${visitor.referrer.substring(0, 50)}...` : visitor.referrer}
                                </a>
                              ) : (
                                <span className="text-white/50 text-sm">Direct</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-xs text-white/60 truncate max-w-xs block" title={visitor.userAgent || 'Unknown'}>
                                {visitor.userAgent ? (
                                  visitor.userAgent.length > 60 
                                    ? `${visitor.userAgent.substring(0, 60)}...` 
                                    : visitor.userAgent
                                ) : (
                                  'Unknown'
                                )}
                              </span>
                            </td>
                          </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            </motion.div>
          )}

          {activeTab === 'content' && (
            <ContentPlannerTab />
          )}
          {activeTab === '30day' && (
            <DayContentGenerator />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

// Content Planner Component
function ContentPlannerTab() {
  const [content, setContent] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingContent, setEditingContent] = useState<any>(null)
  const [connections, setConnections] = useState({
    instagram: { connected: false },
    linkedin: { connected: false },
    pinterest: { connected: false },
    twitter: { connected: false },
  })
  const [formData, setFormData] = useState({
    caption: '',
    hashtags: '',
    altText: '',
    mediaUrl: '',
    platforms: [] as string[],
    scheduledDate: '',
    status: 'draft' as 'draft' | 'scheduled' | 'published',
    location: '',
    tags: '', // comma-separated usernames/handles to tag
  })
  const [showBrandModal, setShowBrandModal] = useState(false)
  const [brandProfile, setBrandProfile] = useState({
    name: 'The Orange Code',
    colors: ['#E89F6B', '#A7A7A7', '#50A0F0', '#00d4ff', '#ff914d'],
    toneOfVoice: 'Professional, inspiring, culturally intelligent, empowering, sophisticated',
    targetAudience: 'Professionals seeking Cultural Intelligence and leadership development in international environments',
    bannedTopics: [] as string[],
    examplePosts: [] as Array<{ caption: string; hashtags: string[] }>,
  })
  const [brandLoading, setBrandLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid')
  const [showConnectionModal, setShowConnectionModal] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string>('')
  const [connectionCredentials, setConnectionCredentials] = useState({
    apiKey: '',
    apiSecret: '',
    accessToken: '',
    username: '',
    password: '',
  })

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-600' },
    { id: 'pinterest', name: 'Pinterest', icon: ImageIcon, color: 'bg-red-600' },
    { id: 'twitter', name: 'X (Twitter)', icon: Twitter, color: 'bg-black' },
  ]

  useEffect(() => {
    fetchContent()
    fetchConnections()
    fetchBrandProfile()
    
    // Check for OAuth success/error messages in URL
    const urlParams = new URLSearchParams(window.location.search)
    const success = urlParams.get('success')
    const error = urlParams.get('error')
    
    if (success) {
      const platform = success.replace('_connected', '')
      alert(`${platform.charAt(0).toUpperCase() + platform.slice(1)} account connected successfully!`)
      fetchConnections()
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname)
    }
    
    if (error) {
      const platform = error.replace('_auth_failed', '').replace('_token_failed', '').replace('_auth_error', '')
      alert(`Failed to connect ${platform}: ${error}`)
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  const fetchConnections = async () => {
    try {
      const response = await fetch('/api/admin/connections')
      const data = await response.json()
      if (data.success) {
        setConnections(data.data)
      }
    } catch (error) {
      console.error('Error fetching connections:', error)
    }
  }

  const fetchBrandProfile = async () => {
    try {
      const response = await fetch('/api/admin/brand')
      const data = await response.json()
      if (data.success && data.data) {
        setBrandProfile({
          name: data.data.name || 'The Orange Code',
          colors: data.data.colors || ['#E89F6B', '#A7A7A7', '#50A0F0', '#00d4ff', '#ff914d'],
          toneOfVoice: data.data.toneOfVoice || 'Professional, inspiring, culturally intelligent, empowering, sophisticated',
          targetAudience: data.data.targetAudience || 'Professionals seeking Cultural Intelligence and leadership development in international environments',
          bannedTopics: data.data.bannedTopics || [],
          examplePosts: data.data.examplePosts || [],
        })
      }
    } catch (error) {
      console.error('Error fetching brand profile:', error)
    }
  }

  const handleSaveBrandProfile = async () => {
    setBrandLoading(true)
    try {
      const response = await fetch('/api/admin/brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandProfile),
      })

      const data = await response.json()
      if (data.success) {
        setShowBrandModal(false)
        // Refresh brand profile display
        await fetchBrandProfile()
      } else {
        alert(`Failed to save brand profile: ${data.error}`)
      }
    } catch (error) {
      console.error('Error saving brand profile:', error)
      alert('Failed to save brand profile')
    } finally {
      setBrandLoading(false)
    }
  }

  const handleConnect = (platform: string) => {
    setSelectedPlatform(platform)
    setConnectionCredentials({
      apiKey: '',
      apiSecret: '',
      accessToken: '',
      username: '',
      password: '',
    })
    setShowConnectionModal(true)
  }

  const handleSaveConnection = async () => {
    try {
      const response = await fetch('/api/admin/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: selectedPlatform,
          credentials: connectionCredentials,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setShowConnectionModal(false)
        await fetchConnections()
      } else {
        alert(`Failed to connect: ${data.error}`)
      }
    } catch (error) {
      console.error('Error connecting:', error)
      alert('Failed to connect account')
    }
  }

  const handleDisconnect = async (platform: string) => {
    if (!confirm(`Are you sure you want to disconnect ${platform}?`)) return
    
    try {
      const response = await fetch(`/api/admin/connections?platform=${platform}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      if (data.success) {
        await fetchConnections()
      }
    } catch (error) {
      console.error('Error disconnecting:', error)
    }
  }

  const fetchContent = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/content')
      const data = await response.json()
      if (data.success) {
        setContent(data.data.content || [])
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlatformToggle = (platformId: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingContent ? '/api/admin/content' : '/api/admin/content'
      const method = editingContent ? 'PUT' : 'POST'
      const body = editingContent ? { id: editingContent.id, ...formData } : formData

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      if (data.success) {
        await fetchContent()
        setShowCreateModal(false)
        setEditingContent(null)
        setFormData({
          caption: '',
          hashtags: '',
          altText: '',
          mediaUrl: '',
          platforms: [],
          scheduledDate: '',
          status: 'draft',
          location: '',
          tags: '',
        })
      }
    } catch (error) {
      console.error('Error saving content:', error)
    }
  }

  const handlePublish = async (contentId: string, platform: string) => {
    try {
      const response = await fetch('/api/admin/content/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId, platform }),
      })

      const data = await response.json()
      if (data.success) {
        await fetchContent()
      } else {
        alert(`Failed to publish: ${data.error}`)
      }
    } catch (error) {
      console.error('Error publishing:', error)
      alert('Failed to publish content')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return

    try {
      const response = await fetch(`/api/admin/content?id=${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (data.success) {
        await fetchContent()
      }
    } catch (error) {
      console.error('Error deleting content:', error)
    }
  }

  const handleEdit = (item: any) => {
    setEditingContent(item)
    setFormData({
      caption: item.caption || '',
      hashtags: Array.isArray(item.hashtags) ? item.hashtags.join(', ') : item.hashtags || '',
      altText: item.altText || '',
      mediaUrl: item.mediaUrl || '',
      platforms: item.platforms || [],
      scheduledDate: item.scheduledDate || '',
      status: item.status || 'draft',
      location: item.location || '',
      tags: item.tags || '',
    })
    setShowCreateModal(true)
  }

  return (
    <motion.div
      key="content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Content Planner</h2>
          <p className="text-white/70 text-sm mt-1">Create and schedule posts for all your social media platforms</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-white/5 rounded-lg border border-white/10 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded text-sm transition-all ${
                viewMode === 'grid'
                  ? 'bg-azure-blue/20 text-azure-blue border border-azure-blue/30'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded text-sm transition-all ${
                viewMode === 'calendar'
                  ? 'bg-azure-blue/20 text-azure-blue border border-azure-blue/30'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-1" />
              Calendar
            </button>
          </div>
          <button
            onClick={() => {
              setShowCreateModal(true)
              setEditingContent(null)
            setFormData({
              caption: '',
              hashtags: '',
              altText: '',
              mediaUrl: '',
              platforms: [],
              scheduledDate: '',
              status: 'draft',
              location: '',
              tags: '',
            })
            }}
            className="px-4 py-2 bg-azure-blue/20 hover:bg-azure-blue/30 rounded-lg border border-azure-blue/30 text-azure-blue transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Post
          </button>
        </div>
      </div>

      {/* Brand Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 mb-6 border-2 border-azure-blue/30"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Brand Profile</h3>
            <p className="text-white/70 text-sm">Configure your brand identity for AI-powered content generation</p>
          </div>
          <button
            onClick={() => setShowBrandModal(true)}
            className="px-4 py-2 bg-azure-blue/20 hover:bg-azure-blue/30 rounded-lg border border-azure-blue/30 text-azure-blue text-sm transition-all flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Configure
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/50 text-xs mb-1">Tone of Voice</p>
            <p className="text-white text-sm">{brandProfile.toneOfVoice}</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/50 text-xs mb-1">Target Audience</p>
            <p className="text-white text-sm">{brandProfile.targetAudience}</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/50 text-xs mb-1">Brand Colors</p>
            <div className="flex gap-2 mt-1 flex-wrap">
              {brandProfile.colors.map((color, idx) => (
                <div key={idx} className="w-6 h-6 rounded border border-white/20" style={{ backgroundColor: color }} title={color} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social Media Connections */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-white mb-4">Social Media Accounts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((platform) => {
            const Icon = platform.icon
            const isConnected = connections[platform.id as keyof typeof connections]?.connected
            
            return (
              <div
                key={platform.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isConnected
                    ? 'border-green-500/50 bg-green-500/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${platform.color} text-white`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{platform.name}</p>
                    <p className={`text-xs ${isConnected ? 'text-green-400' : 'text-white/50'}`}>
                      {isConnected ? 'Connected' : 'Not connected'}
                    </p>
                  </div>
                </div>
                {isConnected ? (
                  <button
                    onClick={() => handleDisconnect(platform.id)}
                    className="w-full px-3 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg border border-red-500/30 text-red-400 text-sm transition-all"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={() => handleConnect(platform.id)}
                    className="w-full px-3 py-2 bg-azure-blue/20 hover:bg-azure-blue/30 rounded-lg border border-azure-blue/30 text-azure-blue text-sm transition-all"
                  >
                    Connect Account
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Visual Feed Preview (Instagram Grid) */}
      {content.filter((c: any) => c.platforms.includes('instagram')).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Instagram Feed Preview</h3>
          <div className="grid grid-cols-3 gap-2 max-w-2xl mx-auto">
            {content
              .filter((c: any) => c.platforms.includes('instagram') && c.status !== 'published')
              .slice(0, 9)
              .map((item: any, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10 cursor-move hover:border-azure-blue/50 transition-all group relative"
                >
                  <div
                    draggable
                    onDragStart={(e: React.DragEvent) => {
                      e.dataTransfer.setData('text/plain', item.id)
                    }}
                    onDragOver={(e: React.DragEvent) => {
                      e.preventDefault()
                      e.currentTarget.classList.add('border-azure-blue')
                    }}
                    onDragLeave={(e: React.DragEvent) => {
                      e.currentTarget.classList.remove('border-azure-blue')
                    }}
                    onDrop={(e: React.DragEvent) => {
                      e.preventDefault()
                      const draggedId = e.dataTransfer.getData('text/plain')
                      const dropIndex = index
                      // Reorder logic would go here
                      e.currentTarget.classList.remove('border-azure-blue')
                    }}
                    className="w-full h-full"
                  >
                  {item.mediaUrl ? (
                    <img
                      src={item.mediaUrl}
                      alt={item.altText || item.caption}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-xs text-center px-2 line-clamp-2">{item.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
          <p className="text-white/50 text-xs text-center mt-4">
            Drag to reorder • This preview shows your upcoming Instagram feed
          </p>
        </motion.div>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Scheduled Posts Calendar</h3>
          {loading ? (
            <div className="p-8 text-center text-white/70">Loading calendar...</div>
          ) : (
            <CalendarView content={content} onEdit={handleEdit} />
          )}
        </motion.div>
      )}

      {/* Content Grid */}
      {viewMode === 'grid' && (
        <>
          {loading ? (
            <div className="glass-card p-8 text-center text-white/70">Loading content...</div>
          ) : content.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 text-center"
        >
          <div className="max-w-md mx-auto">
            <div className="p-4 bg-azure-blue/20 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-azure-blue" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No Content Yet</h3>
            <p className="text-white/70 mb-6">
              Start creating amazing social media posts! Click the "Create Post" button above to get started.
            </p>
            <button
              onClick={() => {
                setShowCreateModal(true)
                setEditingContent(null)
            setFormData({
              caption: '',
              hashtags: '',
              altText: '',
              mediaUrl: '',
              platforms: [],
              scheduledDate: '',
              status: 'draft',
              location: '',
              tags: '',
            })
              }}
              className="px-6 py-3 bg-azure-blue/20 hover:bg-azure-blue/30 rounded-lg border border-azure-blue/30 text-azure-blue transition-all flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Create Your First Post
            </button>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-white/50 text-sm mb-4">Quick Start Guide:</p>
              <div className="space-y-3 text-left max-w-xs mx-auto">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-azure-blue/20 rounded text-azure-blue text-xs font-bold mt-0.5">1</div>
                  <p className="text-white/70 text-sm">Connect your social media accounts (Instagram, LinkedIn, Pinterest, X)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-azure-blue/20 rounded text-azure-blue text-xs font-bold mt-0.5">2</div>
                  <p className="text-white/70 text-sm">Click "Create Post" and upload an image</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-azure-blue/20 rounded text-azure-blue text-xs font-bold mt-0.5">3</div>
                  <p className="text-white/70 text-sm">Use AI to generate captions and hashtags automatically</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-azure-blue/20 rounded text-azure-blue text-xs font-bold mt-0.5">4</div>
                  <p className="text-white/70 text-sm">Schedule or publish to all your connected platforms</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              {/* Media Preview */}
              {item.mediaUrl && (
                <div className="mb-4 rounded-lg overflow-hidden bg-white/5">
                  <img
                    src={item.mediaUrl}
                    alt={item.altText}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {/* Platforms */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.platforms.map((platform: string) => {
                  const platformInfo = platforms.find(p => p.id === platform)
                  if (!platformInfo) return null
                  const Icon = platformInfo.icon
                  return (
                    <span
                      key={platform}
                      className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${platformInfo.color} text-white`}
                    >
                      <Icon className="w-3 h-3" />
                      {platformInfo.name}
                    </span>
                  )
                })}
              </div>

              {/* Caption */}
              <p className="text-white text-sm mb-3 line-clamp-3">{item.caption}</p>

              {/* Hashtags */}
              {item.hashtags && item.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.hashtags.slice(0, 5).map((tag: string, idx: number) => (
                    <span key={idx} className="text-azure-blue text-xs">
                      #{tag}
                    </span>
                  ))}
                  {item.hashtags.length > 5 && (
                    <span className="text-white/50 text-xs">+{item.hashtags.length - 5} more</span>
                  )}
                </div>
              )}

              {/* Status & Date */}
              <div className="flex items-center justify-between mb-4 pt-3 border-t border-white/10">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'published' ? 'bg-green-500/20 text-green-400' :
                  item.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {item.status}
                </span>
                {item.scheduledDate && (
                  <span className="text-white/50 text-xs">
                    {new Date(item.scheduledDate).toLocaleDateString()}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {item.status !== 'published' && (
                  <>
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    {item.platforms.map((platform: string) => (
                      <button
                        key={platform}
                        onClick={() => handlePublish(item.id, platform)}
                        className="px-3 py-2 bg-azure-blue/20 hover:bg-azure-blue/30 rounded-lg border border-azure-blue/30 text-azure-blue text-sm transition-all"
                        title={`Publish to ${platform}`}
                      >
                        <Send className="w-3 h-3" />
                      </button>
                    ))}
          </>
        )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg border border-red-500/30 text-red-400 transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
      </div>
            </motion.div>
          ))}
    </div>
          )}
        </>
      )}

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingContent ? 'Edit Content' : 'Create New Post'}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setEditingContent(null)
                }}
                className="text-white/70 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Platforms Selection */}
              <div>
                <label className="block text-white/70 text-sm mb-2">Select Platforms</label>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => {
                    const Icon = platform.icon
                    const isSelected = formData.platforms.includes(platform.id)
                    return (
                      <button
                        key={platform.id}
                        type="button"
                        onClick={() => handlePlatformToggle(platform.id)}
                        className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                          isSelected
                            ? 'border-azure-blue bg-azure-blue/20'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-azure-blue' : 'text-white/50'}`} />
                        <span className={`text-sm ${isSelected ? 'text-white' : 'text-white/70'}`}>
                          {platform.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Media Upload */}
              <div>
                <label className="block text-white/70 text-sm mb-2 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Media (Image/Video)
                </label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={async (e) => {
                      const files = e.target.files
                      if (files && files.length > 0) {
                        const file = files[0]
                        // In production, upload to storage (Vercel Blob, Supabase Storage, etc.)
                        // For now, create a local URL for preview
                        const url = URL.createObjectURL(file)
                        setFormData({ ...formData, mediaUrl: url })
                        
                        // Analyze image for brand fit
                        try {
                          const analyzeResponse = await fetch('/api/admin/analyze-image', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ imageUrl: url }),
                          })
                          const analyzeData = await analyzeResponse.json()
                          if (analyzeData.success) {
                            console.log('Brand fit score:', analyzeData.data.brandFitScore)
                            // Show brand fit score in UI
                          }
                        } catch (error) {
                          console.error('Error analyzing image:', error)
                        }
                      }
                    }}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-azure-blue/20 file:text-azure-blue hover:file:bg-azure-blue/30"
                  />
                  <input
                    type="url"
                    value={formData.mediaUrl}
                    onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                    placeholder="Or enter image URL (https://example.com/image.jpg)"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50"
                  />
                  {formData.mediaUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden bg-white/5">
                      <img
                        src={formData.mediaUrl}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Caption */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-white/70 text-sm">Caption</label>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/admin/generate-caption', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            imageUrl: formData.mediaUrl,
                            existingCaption: formData.caption,
                          }),
                        })
                        const data = await response.json()
                        if (data.success) {
                          setFormData({ ...formData, caption: data.data.caption })
                        }
                      } catch (error) {
                        console.error('Error generating caption:', error)
                      }
                    }}
                    className="px-3 py-1 bg-azure-blue/20 hover:bg-azure-blue/30 rounded-lg border border-azure-blue/30 text-azure-blue text-xs transition-all flex items-center gap-1"
                    disabled={!formData.mediaUrl}
                  >
                    <Sparkles className="w-3 h-3" />
                    AI Generate
                  </button>
                </div>
                <textarea
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  placeholder="Write your caption here... or click 'AI Generate' to create one automatically based on your brand voice"
                  rows={6}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50 resize-none"
                  required
                />
                <p className="text-white/50 text-xs mt-1">{formData.caption.length} characters</p>
              </div>

              {/* Hashtags */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-white/70 text-sm flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Hashtags (comma-separated)
                  </label>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/admin/generate-hashtags', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            caption: formData.caption,
                            platform: formData.platforms[0] || 'instagram',
                          }),
                        })
                        const data = await response.json()
                        if (data.success) {
                          setFormData({ ...formData, hashtags: data.data.hashtags.join(', ') })
                        }
                      } catch (error) {
                        console.error('Error generating hashtags:', error)
                      }
                    }}
                    className="px-3 py-1 bg-azure-blue/20 hover:bg-azure-blue/30 rounded-lg border border-azure-blue/30 text-azure-blue text-xs transition-all flex items-center gap-1"
                    disabled={!formData.caption}
                  >
                    <Sparkles className="w-3 h-3" />
                    AI Generate
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.hashtags}
                  onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                  placeholder="marketing, business, leadership (or click 'AI Generate' for automatic hashtags)"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50"
                />
              </div>

              {/* Alt Text */}
              <div>
                <label className="block text-white/70 text-sm mb-2">Alt Text (for accessibility)</label>
                <input
                  type="text"
                  value={formData.altText}
                  onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                  placeholder="Describe the image for screen readers"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-white/70 text-sm mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Add location (e.g., Abu Dhabi, UAE)"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50"
                />
              </div>

              {/* Tags (Mentions) */}
              <div>
                <label className="block text-white/70 text-sm mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Tag People (comma-separated usernames/handles)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="@username1, @username2 (without @ also works)"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50"
                />
                <p className="text-white/50 text-xs mt-1">Enter usernames separated by commas. Use @ for Instagram/Twitter, or just the username.</p>
              </div>

              {/* Scheduled Date */}
              <div>
                <label className="block text-white/70 text-sm mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Schedule Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value, status: e.target.value ? 'scheduled' : 'draft' })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-azure-blue/50"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-white/70 text-sm mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-azure-blue/50"
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg text-white font-semibold transition-all"
                  style={{
                    background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)',
                  }}
                >
                  {editingContent ? 'Update Content' : 'Create Content'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false)
                    setEditingContent(null)
                  }}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Connection Modal */}
      {showConnectionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Connect {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}</h3>
              <button
                onClick={() => setShowConnectionModal(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {selectedPlatform === 'instagram' && (
                <div>
                  <label className="block text-white/70 text-sm mb-2">Instagram Access Token</label>
                  <input
                    type="password"
                    value={connectionCredentials.accessToken}
                    onChange={(e) => setConnectionCredentials({ ...connectionCredentials, accessToken: e.target.value })}
                    placeholder="Enter your Instagram access token"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50"
                  />
                  <p className="text-white/50 text-xs mt-1">Get your access token from Instagram Graph API</p>
                </div>
              )}
              
              {selectedPlatform === 'linkedin' && (
                <div>
                  <label className="block text-white/70 text-sm mb-2">LinkedIn Access Token</label>
                  <input
                    type="password"
                    value={connectionCredentials.accessToken}
                    onChange={(e) => setConnectionCredentials({ ...connectionCredentials, accessToken: e.target.value })}
                    placeholder="Enter your LinkedIn access token"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50"
                  />
                  <p className="text-white/50 text-xs mt-1">Get your access token from LinkedIn API</p>
                </div>
              )}
              
              {selectedPlatform === 'pinterest' && (
                <div>
                  <label className="block text-white/70 text-sm mb-2">Pinterest Access Token</label>
                  <input
                    type="password"
                    value={connectionCredentials.accessToken}
                    onChange={(e) => setConnectionCredentials({ ...connectionCredentials, accessToken: e.target.value })}
                    placeholder="Enter your Pinterest access token"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50"
                  />
                  <p className="text-white/50 text-xs mt-1">Get your access token from Pinterest API</p>
                </div>
              )}
              
              {selectedPlatform === 'twitter' && (
                <>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Twitter API Key</label>
                    <input
                      type="password"
                      value={connectionCredentials.apiKey}
                      onChange={(e) => setConnectionCredentials({ ...connectionCredentials, apiKey: e.target.value })}
                      placeholder="Enter your Twitter API key"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Twitter API Secret</label>
                    <input
                      type="password"
                      value={connectionCredentials.apiSecret}
                      onChange={(e) => setConnectionCredentials({ ...connectionCredentials, apiSecret: e.target.value })}
                      placeholder="Enter your Twitter API secret"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Twitter Access Token</label>
                    <input
                      type="password"
                      value={connectionCredentials.accessToken}
                      onChange={(e) => setConnectionCredentials({ ...connectionCredentials, accessToken: e.target.value })}
                      placeholder="Enter your Twitter access token"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-azure-blue/50"
                    />
                  </div>
                </>
              )}
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveConnection}
                  className="flex-1 px-6 py-3 bg-azure-blue/20 hover:bg-azure-blue/30 rounded-lg border border-azure-blue/30 text-azure-blue transition-all"
                >
                  Connect
                </button>
                <button
                  onClick={() => setShowConnectionModal(false)}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Platform Previews */}
      {formData.mediaUrl && formData.platforms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Platform Previews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.platforms.includes('instagram') && (
              <InstagramPreview post={formData} />
            )}
            {formData.platforms.includes('twitter') && (
              <TwitterPreview post={formData} />
            )}
            {formData.platforms.includes('linkedin') && (
              <LinkedInPreview post={formData} />
            )}
            {formData.platforms.includes('pinterest') && (
              <PinterestPreview post={formData} />
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// Instagram Preview Component
function InstagramPreview({ post }: { post: any }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm mx-auto">
      {/* Instagram Header */}
      <div className="flex items-center gap-3 p-3 border-b border-gray-200">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
            <span className="text-xs font-bold text-gray-800">TC</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">theorangecode</p>
          {post.location && (
            <p className="text-xs text-gray-500">{post.location}</p>
          )}
        </div>
        <div className="text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </div>
      </div>
      
      {/* Image */}
      {post.mediaUrl && (
        <div className="aspect-square bg-gray-100">
          <img src={post.mediaUrl} alt={post.altText || 'Post'} className="w-full h-full object-cover" />
        </div>
      )}
      
      {/* Actions */}
      <div className="p-3 flex items-center gap-4">
        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        <svg className="w-6 h-6 text-gray-900 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </div>
      
      {/* Caption */}
      <div className="px-3 pb-2">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">theorangecode</span>{' '}
          {post.caption && (
            <span>{post.caption.substring(0, 100)}{post.caption.length > 100 ? '...' : ''}</span>
          )}
        </p>
        {post.tags && (
          <p className="text-sm text-blue-600 mt-1">
            {post.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean).map((tag: string) => 
              tag.startsWith('@') ? tag : `@${tag}`
            ).join(' ')}
          </p>
        )}
        {post.hashtags && (
          <p className="text-sm text-blue-600 mt-1">
            {post.hashtags.split(',').map((tag: string) => tag.trim()).filter(Boolean).map((tag: string) => 
              tag.startsWith('#') ? tag : `#${tag}`
            ).join(' ')}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-2">View all comments</p>
      </div>
    </div>
  )
}

// Twitter/X Preview Component
function TwitterPreview({ post }: { post: any }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm mx-auto p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold">TC</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-gray-900">The Orange Code</span>
            <span className="text-gray-500">@theorangecode</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 text-sm">2h</span>
          </div>
          {post.caption && (
            <p className="text-gray-900 mb-3 whitespace-pre-wrap">{post.caption}</p>
          )}
          {post.mediaUrl && (
            <div className="rounded-2xl overflow-hidden mb-3 border border-gray-200">
              <img src={post.mediaUrl} alt={post.altText || 'Post'} className="w-full h-48 object-cover" />
            </div>
          )}
          {post.tags && (
            <p className="text-blue-600 text-sm mb-2">
              {post.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean).map((tag: string) => 
                tag.startsWith('@') ? tag : `@${tag}`
              ).join(' ')}
            </p>
          )}
          {post.hashtags && (
            <p className="text-blue-600 text-sm mb-3">
              {post.hashtags.split(',').map((tag: string) => tag.trim()).filter(Boolean).map((tag: string) => 
                tag.startsWith('#') ? tag : `#${tag}`
              ).join(' ')}
            </p>
          )}
          <div className="flex items-center justify-between text-gray-500 text-sm pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="flex items-center gap-1 hover:text-green-500 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div className="flex items-center gap-1 hover:text-red-500 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// LinkedIn Preview Component
function LinkedInPreview({ post }: { post: any }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm mx-auto">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">TC</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">The Orange Code</p>
            <p className="text-sm text-gray-600">Company · 2h</p>
          </div>
        </div>
        {post.caption && (
          <p className="text-gray-900 mb-3 whitespace-pre-wrap">{post.caption}</p>
        )}
        {post.mediaUrl && (
          <div className="rounded-lg overflow-hidden mb-3 border border-gray-200">
            <img src={post.mediaUrl} alt={post.altText || 'Post'} className="w-full h-48 object-cover" />
          </div>
        )}
        {post.location && (
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{post.location}</span>
          </div>
        )}
        {post.hashtags && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.hashtags.split(',').slice(0, 3).map((tag: string) => (
              <span key={tag} className="text-blue-600 text-sm hover:underline cursor-pointer">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between text-gray-600 text-sm pt-3 border-t border-gray-200">
          <button className="flex items-center gap-2 hover:text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>Like</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Comment</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Pinterest Preview Component
function PinterestPreview({ post }: { post: any }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-xs mx-auto">
      {post.mediaUrl && (
        <div className="relative">
          <img src={post.mediaUrl} alt={post.altText || 'Post'} className="w-full object-cover" />
          <div className="absolute top-2 right-2 bg-red-500 rounded-full p-2 cursor-pointer">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6c0 4.314 4.38 7.5 6 7.5s6-3.186 6-7.5a6 6 0 00-6-6zM10 15a1 1 0 100 2 1 1 0 000-2z" />
            </svg>
          </div>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">TC</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">The Orange Code</p>
          </div>
        </div>
        {post.caption && (
          <p className="text-gray-900 text-sm mb-2 line-clamp-3">{post.caption}</p>
        )}
        {post.location && (
          <div className="flex items-center gap-1 text-gray-600 text-xs mb-2">
            <MapPin className="w-3 h-3" />
            <span>{post.location}</span>
          </div>
        )}
        {post.hashtags && (
          <div className="flex flex-wrap gap-1">
            {post.hashtags.split(',').slice(0, 3).map((tag: string) => (
              <span key={tag} className="text-blue-600 text-xs hover:underline cursor-pointer">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Calendar View Component for Scheduled Posts
function CalendarView({ content, onEdit }: { content: any[]; onEdit: (item: any) => void }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Get scheduled posts for the selected date
  const scheduledPosts = content.filter((item: any) => {
    if (!item.scheduledDate) return false
    const postDate = new Date(item.scheduledDate)
    const selected = selectedDate || new Date()
    return postDate.toDateString() === selected.toDateString()
  })

  // Get all posts grouped by date
  const postsByDate: { [key: string]: any[] } = {}
  content.forEach((item: any) => {
    if (item.scheduledDate) {
      const date = new Date(item.scheduledDate).toISOString().split('T')[0]
      if (!postsByDate[date]) {
        postsByDate[date] = []
      }
      postsByDate[date].push(item)
    }
  })

  // Generate calendar days
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days = []
  // Empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white transition-all"
        >
          <ArrowDownRight className="w-5 h-5 rotate-90" />
        </button>
        <h4 className="text-xl font-bold text-white">
          {monthNames[month]} {year}
        </h4>
        <button
          onClick={nextMonth}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white transition-all"
        >
          <ArrowUpRight className="w-5 h-5 rotate-90" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day Headers */}
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-center text-white/70 text-sm font-semibold">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="p-2" />
          }

          const dateStr = date.toISOString().split('T')[0]
          const postsOnDay = postsByDate[dateStr] || []
          const isToday = date.toDateString() === new Date().toDateString()
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(date)}
              className={`p-2 rounded-lg border-2 transition-all text-left min-h-[80px] ${
                isSelected
                  ? 'border-azure-blue bg-azure-blue/20'
                  : isToday
                  ? 'border-orange/50 bg-orange/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-orange' : 'text-white'}`}>
                {date.getDate()}
              </div>
              {postsOnDay.length > 0 && (
                <div className="space-y-1">
                  {postsOnDay.slice(0, 2).map((post: any) => (
                    <div
                      key={post.id}
                      className="text-xs bg-azure-blue/30 text-azure-blue px-1.5 py-0.5 rounded truncate"
                      title={post.caption?.substring(0, 50)}
                    >
                      {post.platforms?.slice(0, 2).join(', ')} {postsOnDay.length > 2 ? '...' : ''}
                    </div>
                  ))}
                  {postsOnDay.length > 2 && (
                    <div className="text-xs text-azure-blue font-semibold">
                      +{postsOnDay.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Selected Date Posts */}
      {selectedDate && scheduledPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 glass-card p-6"
        >
          <h4 className="text-lg font-bold text-white mb-4">
            Posts Scheduled for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h4>
          <div className="space-y-4">
            {scheduledPosts.map((item: any) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {item.mediaUrl && (
                    <img
                      src={item.mediaUrl}
                      alt={item.altText}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {item.platforms?.map((platform: string) => {
                        const platformInfo = [
                          { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
                          { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-600' },
                          { id: 'pinterest', name: 'Pinterest', icon: ImageIcon, color: 'bg-red-600' },
                          { id: 'twitter', name: 'X (Twitter)', icon: Twitter, color: 'bg-black' },
                        ].find(p => p.id === platform)
                        if (!platformInfo) return null
                        const Icon = platformInfo.icon
                        return (
                          <span
                            key={platform}
                            className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${platformInfo.color} text-white`}
                          >
                            <Icon className="w-3 h-3" />
                            {platformInfo.name}
                          </span>
                        )
                      })}
                      <span className="text-white/50 text-xs ml-auto">
                        {new Date(item.scheduledDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-white text-sm line-clamp-2">{item.caption}</p>
                    <button
                      onClick={() => onEdit(item)}
                      className="mt-2 text-azure-blue text-xs hover:underline"
                    >
                      Edit post
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {selectedDate && scheduledPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 glass-card p-8 text-center"
        >
          <Calendar className="w-12 h-12 mx-auto mb-4 text-white/30" />
          <p className="text-white/70">No posts scheduled for {selectedDate.toLocaleDateString()}</p>
        </motion.div>
      )}

      {/* Resend Ebook Modal */}
      <AnimatePresence>
        {resendModalOpen && selectedPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => !resending && setResendModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 max-w-md w-full mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Resend Ebook</h3>
                <button
                  onClick={() => !resending && setResendModalOpen(false)}
                  disabled={resending}
                  className="text-white/50 hover:text-white transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Payment Details</label>
                  <div className="bg-white/5 rounded-lg p-3 text-sm">
                    <p className="text-white"><span className="text-white/60">Customer:</span> {selectedPayment.customerName}</p>
                    <p className="text-white/70 text-xs mt-1"><span className="text-white/50">Original Email:</span> {selectedPayment.customerEmail}</p>
                    <p className="text-white/70 text-xs mt-1"><span className="text-white/50">Amount:</span> {selectedPayment.amount} {selectedPayment.currency}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Email Address <span className="text-orange">*</span>
                  </label>
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="Enter email address"
                    disabled={resending}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-orange/50 disabled:opacity-50"
                  />
                  <p className="text-white/50 text-xs mt-1">
                    Enter the correct email address to receive the ebook
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={async () => {
                      if (!customEmail || !customEmail.includes('@')) {
                        alert('Please enter a valid email address')
                        return
                      }

                      setResending(true)
                      try {
                        // Determine ebook type based on payment amount
                        const ebookType = (selectedPayment.amount === 149 && selectedPayment.currency === 'AED') 
                          ? 'beyond-formalities' 
                          : selectedPayment.metadata?.ebookType || selectedPayment.metadata?.type || 'beyond-formalities'

                        const response = await fetch('/api/admin/resend-ebook', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            email: customEmail,
                            customerName: selectedPayment.customerName,
                            orderId: selectedPayment.id,
                            ebookType: ebookType,
                          }),
                        })
                        const data = await response.json()
                        if (data.success) {
                          alert(`✅ Ebook sent successfully to ${customEmail}`)
                          setResendModalOpen(false)
                          setCustomEmail('')
                          setSelectedPayment(null)
                        } else {
                          alert(`❌ Error: ${data.error}`)
                        }
                      } catch (error: any) {
                        alert(`❌ Error: ${error.message}`)
                      } finally {
                        setResending(false)
                      }
                    }}
                    disabled={resending || !customEmail || !customEmail.includes('@')}
                    className="flex-1 px-4 py-2 bg-orange hover:bg-orange/80 disabled:bg-white/10 disabled:text-white/50 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {resending ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        Send Ebook
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (!resending) {
                        setResendModalOpen(false)
                        setCustomEmail('')
                        setSelectedPayment(null)
                      }
                    }}
                    disabled={resending}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
