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
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'subscribers' | 'analytics' | 'visitors'>('overview')
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
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Phone</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Source</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Subscribed</th>
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
                            <td className="px-6 py-4 text-white font-medium">{subscriber.name}</td>
                            <td className="px-6 py-4 text-white/90">{subscriber.email}</td>
                            <td className="px-6 py-4 text-white/70">{subscriber.phone || 'N/A'}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-azure-blue/20 text-azure-blue rounded-full text-xs">
                                {subscriber.source}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-white/70 text-sm">
                              {new Date(subscriber.createdAt).toLocaleDateString()}
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
                    {activeSessions.map((session, index) => (
                      <motion.div
                        key={session.sessionId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-azure-blue/20 rounded-lg">
                            <Monitor className="w-4 h-4 text-azure-blue" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm">{session.page}</p>
                            {session.country && (
                              <p className="text-white/60 text-xs flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3" />
                                {session.city ? `${session.city}, ` : ''}{session.country}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="text-white/50 text-xs mt-2">
                          Last seen: {new Date(session.lastSeen).toLocaleTimeString()}
                        </p>
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
                  <h2 className="text-xl font-bold text-white">Recent Visitors</h2>
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
                  <div className="p-8 text-center text-white/70">No visitors yet. Data will appear here once visitors start browsing your site.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Time</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Page</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Location</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Referrer</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">IP</th>
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
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <ExternalLink className="w-3 h-3 text-white/50" />
                                <span className="text-white text-sm">{visitor.page}</span>
                              </div>
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
                            <td className="px-6 py-4 text-white/70 text-sm font-mono">
                              {visitor.ip}
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
        </AnimatePresence>
      </main>
    </div>
  )
}
