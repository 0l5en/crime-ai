import { Card } from "@/components/ui/card";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  Users, Briefcase, CheckCircle, Target, Crown, Building,
  TrendingUp, TrendingDown, Clock, Star, Activity, 
  ArrowUpRight, ArrowDownRight, Calendar
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
    <div className="min-h-screen p-6" style={{ backgroundColor: '#0a0e1a' }}>
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-[#8b92a7]">Real-time system overview and performance metrics</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#1a1f2e' }}>
            <Calendar className="w-4 h-4 text-[#8b92a7]" />
            <span className="text-white text-sm">Last 30 days</span>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
            const trendColor = kpi.trend === 'up' ? '#10b981' : '#ef4444';
            
            return (
              <Card 
                key={index} 
                className="p-6 border-none transition-all hover:scale-105"
                style={{ backgroundColor: '#1a1f2e' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#0a0e1a' }}>
                    <Icon className="w-6 h-6" style={{ color: '#ef4444' }} />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded" style={{ backgroundColor: trendColor + '20' }}>
                    <TrendIcon className="w-4 h-4" style={{ color: trendColor }} />
                    <span className="text-sm font-semibold" style={{ color: trendColor }}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-[#8b92a7]">{kpi.title}</p>
                  <p className="text-4xl font-bold text-white">{kpi.value}</p>
                </div>

                {/* Mini Sparkline */}
                <div className="mt-4 h-12">
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
              </Card>
            );
          })}
        </div>

        {/* Main Chart - User Activity */}
        <Card className="p-6 border-none" style={{ backgroundColor: '#1a1f2e' }}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">User Activity Over Time</h2>
            <p className="text-[#8b92a7]">Track user growth and engagement trends</p>
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
        </Card>

        {/* Two Column Section - Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart - User Distribution */}
          <Card className="p-6 border-none" style={{ backgroundColor: '#1a1f2e' }}>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">User Distribution by Role</h2>
              <p className="text-[#8b92a7]">Breakdown of user types</p>
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
          </Card>

          {/* Bar Chart - Cases by Status */}
          <Card className="p-6 border-none" style={{ backgroundColor: '#1a1f2e' }}>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Cases by Status</h2>
              <p className="text-[#8b92a7]">Current case distribution</p>
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
          </Card>
        </div>

        {/* Two Column Section - Table & Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Venues Table */}
          <Card className="p-6 border-none" style={{ backgroundColor: '#1a1f2e' }}>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Top Venues</h2>
              <p className="text-[#8b92a7]">Best performing venues by activity</p>
            </div>
            <div className="space-y-3">
              {topVenues.map((venue, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg hover:bg-opacity-80 transition-all cursor-pointer"
                  style={{ backgroundColor: '#0a0e1a' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-[#ef4444]">#{index + 1}</span>
                      <span className="text-white font-semibold">{venue.name}</span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#8b92a7]" />
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#8b92a7] ml-12">
                    <span>{venue.cases} cases</span>
                    <span>{venue.users} users</span>
                    <span className="text-[#10b981] font-semibold">{venue.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity Feed */}
          <Card className="p-6 border-none" style={{ backgroundColor: '#1a1f2e' }}>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Recent Activity</h2>
              <p className="text-[#8b92a7]">Latest system events and updates</p>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-opacity-80 transition-all"
                    style={{ backgroundColor: '#0a0e1a' }}
                  >
                    <div className="p-2 rounded" style={{ backgroundColor: '#1a1f2e' }}>
                      <Icon className="w-4 h-4 text-[#ef4444]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.text}</p>
                      <p className="text-[#8b92a7] text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Bottom Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Average Case Completion Time */}
          <Card className="p-6 border-none" style={{ backgroundColor: '#1a1f2e' }}>
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#0a0e1a' }}>
                <Clock className="w-8 h-8 text-[#3b82f6]" />
              </div>
              <div>
                <p className="text-[#8b92a7] text-sm mb-1">Avg. Completion Time</p>
                <p className="text-3xl font-bold text-white">4.2 days</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-4 h-4 text-[#10b981]" />
                  <span className="text-sm text-[#10b981]">-12% faster</span>
                </div>
              </div>
            </div>
          </Card>

          {/* User Satisfaction Score */}
          <Card className="p-6 border-none" style={{ backgroundColor: '#1a1f2e' }}>
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#0a0e1a' }}>
                <Star className="w-8 h-8 text-[#f59e0b]" />
              </div>
              <div>
                <p className="text-[#8b92a7] text-sm mb-1">User Satisfaction</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-white">4.8</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="w-4 h-4" 
                        fill={star <= 4 ? "#f59e0b" : "none"} 
                        stroke="#f59e0b" 
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-[#10b981]" />
                  <span className="text-sm text-[#10b981]">+0.3 this month</span>
                </div>
              </div>
            </div>
          </Card>

          {/* System Health Status */}
          <Card className="p-6 border-none" style={{ backgroundColor: '#1a1f2e' }}>
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#0a0e1a' }}>
                <Activity className="w-8 h-8 text-[#10b981]" />
              </div>
              <div>
                <p className="text-[#8b92a7] text-sm mb-1">System Health</p>
                <p className="text-3xl font-bold text-white">Excellent</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: '#0a0e1a' }}>
                    <div className="h-2 rounded-full" style={{ width: '98%', backgroundColor: '#10b981' }} />
                  </div>
                  <span className="text-sm text-[#10b981]">98%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;