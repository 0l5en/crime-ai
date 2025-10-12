import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  Users, Briefcase, CheckCircle, Target, Crown, Building,
  TrendingUp, TrendingDown, Clock, Star, Activity, 
  ArrowUpRight, Calendar
} from 'lucide-react';

const AdminAnalytics = () => {
  // KPI Data
  const kpiData = [
    {
      title: "Total Users",
      value: "12,456",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      sparkline: [45, 52, 48, 65, 70, 68, 75]
    },
    {
      title: "Active Cases",
      value: "1,847",
      change: "+8.2%",
      trend: "up",
      icon: Briefcase,
      sparkline: [120, 115, 130, 125, 140, 138, 145]
    },
    {
      title: "Solved Cases",
      value: "3,291",
      change: "+18.7%",
      trend: "up",
      icon: CheckCircle,
      sparkline: [200, 210, 205, 230, 245, 250, 260]
    },
    {
      title: "Success Rate",
      value: "87.3%",
      change: "+2.4%",
      trend: "up",
      icon: Target,
      sparkline: [82, 83, 85, 84, 86, 87, 87]
    },
    {
      title: "Premium Subscriptions",
      value: "2,847",
      change: "-3.1%",
      trend: "down",
      icon: Crown,
      sparkline: [320, 315, 310, 305, 298, 295, 290]
    },
    {
      title: "Venue Registrations",
      value: "456",
      change: "+24.8%",
      trend: "up",
      icon: Building,
      sparkline: [35, 40, 42, 48, 52, 55, 58]
    }
  ];

  // User Activity Data (Line Chart)
  const userActivityData = [
    { date: '01.01', totalUsers: 11200, activeUsers: 8400, newSignups: 120 },
    { date: '08.01', totalUsers: 11350, activeUsers: 8650, newSignups: 150 },
    { date: '15.01', totalUsers: 11520, activeUsers: 8820, newSignups: 170 },
    { date: '22.01', totalUsers: 11780, activeUsers: 9100, newSignups: 260 },
    { date: '29.01', totalUsers: 12050, activeUsers: 9350, newSignups: 270 },
    { date: '05.02', totalUsers: 12280, activeUsers: 9580, newSignups: 230 },
    { date: '12.02', totalUsers: 12456, activeUsers: 9750, newSignups: 176 }
  ];

  // User Distribution by Role (Pie Chart)
  const userRoleData = [
    { name: 'Regular Users', value: 8945, color: '#8b92a7' },
    { name: 'Premium Users', value: 2847, color: '#ef4444' },
    { name: 'Venue Owners', value: 456, color: '#f59e0b' },
    { name: 'Admins', value: 208, color: '#10b981' }
  ];

  // Cases by Status (Bar Chart)
  const caseStatusData = [
    { status: 'Active', count: 1847, color: '#3b82f6' },
    { status: 'Solved', count: 3291, color: '#10b981' },
    { status: 'In Review', count: 542, color: '#f59e0b' },
    { status: 'Abandoned', count: 187, color: '#ef4444' }
  ];

  // Top Venues Data
  const topVenues = [
    { name: 'Mystery Manor Hotel', cases: 145, users: 2340, revenue: '€12,450' },
    { name: 'Sunset Resort & Spa', cases: 132, users: 2180, revenue: '€11,230' },
    { name: 'Alpine Chalet Lodge', cases: 118, users: 1890, revenue: '€9,870' },
    { name: 'Oceanview Apartments', cases: 97, users: 1650, revenue: '€8,240' },
    { name: 'Downtown Plaza Hotel', cases: 86, users: 1420, revenue: '€7,180' }
  ];

  // Recent Activity Feed
  const recentActivity = [
    { type: 'user', text: 'New premium user registered', time: '2 min ago', icon: Users },
    { type: 'case', text: 'Case #1847 marked as solved', time: '15 min ago', icon: CheckCircle },
    { type: 'venue', text: 'New venue registration pending', time: '1 hour ago', icon: Building },
    { type: 'alert', text: 'System health check completed', time: '2 hours ago', icon: Activity },
    { type: 'user', text: '50+ users active in last hour', time: '3 hours ago', icon: TrendingUp }
  ];

  return (
    <div className="analytics-page">
      <div className="container-fluid" style={{ maxWidth: '1600px' }}>
        
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div>
                <h1 className="display-4 fw-bold text-white mb-2">Analytics Dashboard</h1>
                <p className="analytics-text-secondary mb-0">Real-time system overview and performance metrics</p>
              </div>
              <div className="d-flex align-items-center gap-2 px-4 py-2 rounded analytics-bg-card">
                <Calendar className="analytics-text-secondary" size={16} />
                <span className="text-white small">Last 30 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="row g-4 mb-4">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
            const trendClass = kpi.trend === 'up' ? 'analytics-trend-up' : 'analytics-trend-down';
            const trendColor = kpi.trend === 'up' ? '#10b981' : '#ef4444';
            
            return (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="card analytics-kpi-card h-100">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start justify-content-between mb-4">
                      <div className="analytics-icon-wrapper">
                        <Icon className="analytics-text-primary" size={24} />
                      </div>
                      <div className={`d-flex align-items-center gap-1 px-2 py-1 rounded ${trendClass}`}>
                        <TrendIcon size={16} />
                        <span className="small fw-semibold">{kpi.change}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="small analytics-text-secondary mb-2">{kpi.title}</p>
                      <p className="display-5 fw-bold text-white mb-0">{kpi.value}</p>
                    </div>

                    {/* Mini Sparkline */}
                    <div style={{ height: '48px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={kpi.sparkline.map((val, i) => ({ value: val }))}>
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={trendColor} 
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Chart - User Activity */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card analytics-chart-card">
              <div className="card-body p-4">
                <div className="mb-4">
                  <h2 className="h3 fw-bold text-white mb-2">User Activity Over Time</h2>
                  <p className="analytics-text-secondary mb-0">Track user growth and engagement trends</p>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2f3e" />
                    <XAxis dataKey="date" stroke="#8b92a7" />
                    <YAxis stroke="#8b92a7" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #2a2f3e', borderRadius: '8px' }}
                      labelStyle={{ color: '#8b92a7' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="totalUsers" stroke="#3b82f6" strokeWidth={3} name="Total Users" />
                    <Line type="monotone" dataKey="activeUsers" stroke="#10b981" strokeWidth={3} name="Active Users" />
                    <Line type="monotone" dataKey="newSignups" stroke="#ef4444" strokeWidth={3} name="New Signups" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Section - Charts */}
        <div className="row g-4 mb-4">
          {/* Pie Chart - User Distribution */}
          <div className="col-12 col-lg-6">
            <div className="card analytics-chart-card h-100">
              <div className="card-body p-4">
                <div className="mb-4">
                  <h2 className="h4 fw-bold text-white mb-2">User Distribution by Role</h2>
                  <p className="analytics-text-secondary mb-0">Breakdown of user types</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userRoleData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userRoleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #2a2f3e', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Bar Chart - Cases by Status */}
          <div className="col-12 col-lg-6">
            <div className="card analytics-chart-card h-100">
              <div className="card-body p-4">
                <div className="mb-4">
                  <h2 className="h4 fw-bold text-white mb-2">Cases by Status</h2>
                  <p className="analytics-text-secondary mb-0">Current case distribution</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={caseStatusData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2f3e" />
                    <XAxis type="number" stroke="#8b92a7" />
                    <YAxis dataKey="status" type="category" stroke="#8b92a7" width={100} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid #2a2f3e', borderRadius: '8px' }}
                    />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {caseStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Section - Table & Activity Feed */}
        <div className="row g-4 mb-4">
          {/* Top Venues Table */}
          <div className="col-12 col-lg-6">
            <div className="card analytics-chart-card h-100">
              <div className="card-body p-4">
                <div className="mb-4">
                  <h2 className="h4 fw-bold text-white mb-2">Top Venues</h2>
                  <p className="analytics-text-secondary mb-0">Best performing venues by activity</p>
                </div>
                <div className="d-flex flex-column gap-3">
                  {topVenues.map((venue, index) => (
                    <div key={index} className="analytics-venue-item">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-3">
                          <span className="display-6 fw-bold analytics-text-primary">#{index + 1}</span>
                          <span className="text-white fw-semibold">{venue.name}</span>
                        </div>
                        <ArrowUpRight className="analytics-text-secondary" size={20} />
                      </div>
                      <div className="d-flex align-items-center justify-content-between small analytics-text-secondary" style={{ marginLeft: '3.5rem' }}>
                        <span>{venue.cases} cases</span>
                        <span>{venue.users} users</span>
                        <span className="fw-semibold" style={{ color: '#10b981' }}>{venue.revenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="col-12 col-lg-6">
            <div className="card analytics-chart-card h-100">
              <div className="card-body p-4">
                <div className="mb-4">
                  <h2 className="h4 fw-bold text-white mb-2">Recent Activity</h2>
                  <p className="analytics-text-secondary mb-0">Latest system events and updates</p>
                </div>
                <div className="d-flex flex-column gap-3">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="analytics-activity-item d-flex align-items-start gap-3">
                        <div className="p-2 rounded analytics-bg-card">
                          <Icon className="analytics-text-primary" size={16} />
                        </div>
                        <div className="flex-grow-1">
                          <p className="text-white small mb-1">{activity.text}</p>
                          <p className="analytics-text-secondary mb-0" style={{ fontSize: '0.75rem' }}>{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Statistics Cards */}
        <div className="row g-4">
          {/* Average Case Completion Time */}
          <div className="col-12 col-md-4">
            <div className="card analytics-kpi-card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-4">
                  <div className="analytics-icon-wrapper">
                    <Clock style={{ color: '#3b82f6' }} size={32} />
                  </div>
                  <div>
                    <p className="analytics-text-secondary small mb-1">Avg. Completion Time</p>
                    <p className="display-6 fw-bold text-white mb-1">4.2 days</p>
                    <div className="d-flex align-items-center gap-1">
                      <TrendingDown style={{ color: '#10b981' }} size={16} />
                      <span className="small" style={{ color: '#10b981' }}>-12% faster</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Satisfaction Score */}
          <div className="col-12 col-md-4">
            <div className="card analytics-kpi-card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-4">
                  <div className="analytics-icon-wrapper">
                    <Star style={{ color: '#f59e0b' }} size={32} />
                  </div>
                  <div>
                    <p className="analytics-text-secondary small mb-1">User Satisfaction</p>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <p className="display-6 fw-bold text-white mb-0">4.8</p>
                      <div className="d-flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={16}
                            fill={star <= 4 ? "#f59e0b" : "none"} 
                            stroke="#f59e0b" 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <TrendingUp style={{ color: '#10b981' }} size={16} />
                      <span className="small" style={{ color: '#10b981' }}>+0.3 this month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Health Status */}
          <div className="col-12 col-md-4">
            <div className="card analytics-kpi-card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-4">
                  <div className="analytics-icon-wrapper">
                    <Activity style={{ color: '#10b981' }} size={32} />
                  </div>
                  <div className="flex-grow-1">
                    <p className="analytics-text-secondary small mb-1">System Health</p>
                    <p className="display-6 fw-bold text-white mb-2">Excellent</p>
                    <div className="d-flex align-items-center gap-2">
                      <div className="analytics-health-bar flex-grow-1">
                        <div className="analytics-health-bar-fill" style={{ width: '98%' }} />
                      </div>
                      <span className="small" style={{ color: '#10b981' }}>98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;