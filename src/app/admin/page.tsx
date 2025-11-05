'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  todayVisitors: number
  monthlyVisitors: number
  activeNow: number
}

const COLORS = ['#00d4ff', '#ff914d', '#0099ff', '#00ffff']

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'subscribers' | 'analytics' | 'visitors' | 'content'>('overview')
  const [payments, setPayments] = useState<Payment[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([])
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null)
  const [topCountries, setTopCountries] = useState<Array<{ country: string; count: number }>>([])
  const [topPages, setTopPages] = useState<Array<{ page: string; views: number }>>([])
  const [dailyVisitorStats, setDailyVisitorStats] = useState<Array<{ date: string; visitors: number }>>([])
  const [paymentsLoading, setPaymentsLoading] = useState(false)
  const [subscribersLoading, setSubscribersLoading] = useState(false)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [visitorsLoading, setVisitorsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Check if already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      fetchData()
    }
  }, [])

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(() => {
      console.log('🔄 Auto-refreshing data...')
      fetchData()
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [isAuthenticated])

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
        setAuthError('Invalid password')
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
    fetchPayments()
    fetchSubscribers()
    fetchAnalytics()
    fetchVisitors()
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
        const pages = data.data.pages || []
        const daily = data.data.dailyStats || []
        
        console.log(`✅ Loaded ${visitorsList.length} visitors, ${activeSessionsList.length} active sessions`)
        setVisitors(visitorsList)
        setActiveSessions(activeSessionsList)
        setVisitorStats(stats)
        setTopCountries(countries)
        setTopPages(pages)
        setDailyVisitorStats(daily)
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
      console.log('📊 Payments response:', { success: data.success, paymentsCount: data.data?.payments?.length || 0 })
      if (data.success) {
        const paymentsList = data.data.payments || []
        console.log(`✅ Loaded ${paymentsList.length} payments`)
        setPayments(paymentsList)
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

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true)
    try {
      const response = await fetch('/api/admin/analytics')
      const data = await response.json()
      if (data.success) {
        setAnalytics(data.data)
      } else {
        console.error('Failed to fetch analytics:', data.error)
        setAnalytics(null)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-primary-dark/95 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-white/70 text-sm mt-1">The Orange Code</p>
            </div>
            <div className="flex items-center gap-4">
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
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'subscribers', label: 'Subscribers', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: Activity },
              { id: 'visitors', label: 'Visitors', icon: Globe },
              { id: 'content', label: 'Content Planner', icon: Calendar },
            ].map((tab) => (
            <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-azure-blue text-azure-blue'
                    : 'border-transparent text-white/70 hover:text-white hover:border-white/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="whitespace-nowrap">{tab.label}</span>
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
              {/* Stats Cards */}
              {analytics && (
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
                      {analytics.revenue.total.toLocaleString()} AED
                    </p>
                    <p className="text-xs text-white/50 mt-2">
                      {analytics.revenue.monthly.toLocaleString()} AED this month
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
                      {analytics.subscribers.total.toLocaleString()}
                    </p>
                    <p className="text-xs text-white/50 mt-2">
                      {analytics.subscribers.monthly} this month
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
                      {analytics.payments.total.toLocaleString()}
                    </p>
                    <p className="text-xs text-white/50 mt-2">
                      {analytics.payments.today} today
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
                      {analytics.revenue.today.toLocaleString()} AED
                    </p>
                    <p className="text-xs text-white/50 mt-2">
                      {analytics.payments.today} payments today
                    </p>
                  </motion.div>
                </div>
              )}

              {/* Charts */}
              {analytics && analytics.revenue.byDate.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass-card p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">Revenue Trend (30 Days)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={analytics.revenue.byDate}>
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
                          data={[
                            { name: 'Today', value: analytics.payments.today },
                            { name: 'This Month', value: analytics.payments.monthly - analytics.payments.today },
                            { name: 'Total', value: analytics.payments.total - analytics.payments.monthly },
                          ]}
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
                          {[
                            { name: 'Today', value: analytics.payments.today },
                            { name: 'This Month', value: analytics.payments.monthly - analytics.payments.today },
                            { name: 'Total', value: analytics.payments.total - analytics.payments.monthly },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
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
              )}
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
              {/* Stats Cards */}
              {visitorStats && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-azure-blue/20 rounded-lg">
                        <Globe className="w-6 h-6 text-azure-blue" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-white/70 text-sm mb-1">Total Visitors</h3>
                    <p className="text-3xl font-bold text-white">
                      {visitorStats.totalVisitors.toLocaleString()}
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
                    <h3 className="text-white/70 text-sm mb-1">Unique Visitors</h3>
                    <p className="text-3xl font-bold text-white">
                      {visitorStats.uniqueVisitors.toLocaleString()}
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-bright-blue/20 rounded-lg">
                        <Activity className="w-6 h-6 text-bright-blue" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-white/70 text-sm mb-1">Active Now</h3>
                    <p className="text-3xl font-bold text-white">
                      {visitorStats.activeNow.toLocaleString()}
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-green-500/20 rounded-lg">
                        <Calendar className="w-6 h-6 text-green-400" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-white/70 text-sm mb-1">Today</h3>
                    <p className="text-3xl font-bold text-white">
                      {visitorStats.todayVisitors.toLocaleString()}
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-500/20 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-purple-400" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-white/70 text-sm mb-1">This Month</h3>
                    <p className="text-3xl font-bold text-white">
                      {visitorStats.monthlyVisitors.toLocaleString()}
                    </p>
                  </motion.div>
                </div>
              )}

              {/* World Map Visualization */}
              {topCountries.length > 0 && (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="glass-card p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Visitor Distribution by Country</h3>
                  <div className="space-y-3">
                    {topCountries.map((country, index) => {
                      const total = topCountries.reduce((sum, c) => sum + c.count, 0)
                      const percentage = ((country.count / total) * 100).toFixed(1)
                      return (
                        <motion.div
                          key={country.country}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
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
                </motion.div>
              )}

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

              {/* Active Sessions */}
              {activeSessions.length > 0 && (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Active Visitors Right Now</h3>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                      {activeSessions.length} Active
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeSessions.filter((s: any) => s.isActive).map((session: any, index: number) => (
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
                    ))}
                  </div>
                </motion.div>
              )}

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
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Time</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">IP Address</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Location</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Page</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Referrer</th>
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
                                >
                                  {visitor.referrer}
                                </a>
                              ) : (
                                <span className="text-white/50 text-sm">Direct</span>
                              )}
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

  const handleConnect = (platform: string) => {
    window.location.href = `/api/auth/${platform}`
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
            })
          }}
          className="px-4 py-2 bg-azure-blue/20 hover:bg-azure-blue/30 rounded-lg border border-azure-blue/30 text-azure-blue transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Post
        </button>
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
            onClick={() => {
              // Open brand settings modal (we'll add this)
              alert('Brand settings modal coming soon! For now, AI generation uses default brand settings.')
            }}
            className="px-4 py-2 bg-azure-blue/20 hover:bg-azure-blue/30 rounded-lg border border-azure-blue/30 text-azure-blue text-sm transition-all flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Configure
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/50 text-xs mb-1">Tone of Voice</p>
            <p className="text-white text-sm">Professional, inspiring, culturally intelligent</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/50 text-xs mb-1">Target Audience</p>
            <p className="text-white text-sm">Professionals seeking cultural intelligence</p>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/50 text-xs mb-1">Brand Colors</p>
            <div className="flex gap-2 mt-1">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-[#E89F6B] to-[#A7A7A7] to-[#50A0F0]"></div>
              <span className="text-white text-xs">Brand Palette</span>
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

      {/* Content Grid */}
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
    </motion.div>
  )
}
