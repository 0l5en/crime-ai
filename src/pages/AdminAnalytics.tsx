import Header from "@/components/Header";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from "lucide-react";

const AdminAnalytics = () => {
  // Placeholder data for user behavior chart
  const behaviorData = [
    { name: 'Week 1', value: 850 },
    { name: 'Week 2', value: 620 },
    { name: 'Week 3', value: 780 },
    { name: 'Week 4', value: 710 },
    { name: 'Week 5', value: 920 },
    { name: 'Week 6', value: 650 },
    { name: 'Week 7', value: 800 },
  ];

  // Placeholder data for venue users
  const venueData = [
    { name: 'Grand Arena', users: 4281, maxUsers: 5000 },
    { name: 'City Concert Hall', users: 2912, maxUsers: 5000 },
    { name: 'The Underground Club', users: 1845, maxUsers: 5000 },
    { name: 'Riverside Theater', users: 953, maxUsers: 5000 },
  ];

  // Placeholder data for referrers
  const referrerData = [
    { source: 'google.com', users: 3201, conversion: '15.2%' },
    { source: 'facebook.com', users: 2150, conversion: '11.8%' },
    { source: 'twitter.com', users: 1567, conversion: '9.3%' },
    { source: 'Direct', users: 1234, conversion: '7.5%' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0e1a' }}>
      <Header />

      <div className="container py-12">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#ffffff' }}>Analytics & Reports</h1>
          <p style={{ color: '#8b92a7' }}>Insights into user behavior and system performance.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Users Kachel */}
          <div className="rounded-xl p-6 border" style={{ backgroundColor: '#1a1f2e', borderColor: '#2a3142' }}>
            <div className="flex flex-col h-full">
              <p className="text-sm font-medium mb-4" style={{ color: '#8b92a7' }}>Total Users</p>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-5xl font-bold mb-3" style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>12,456</p>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium pt-2" style={{ color: '#10b981', borderTop: '1px solid #2a3142' }}>
                <TrendingUp size={16} strokeWidth={2.5} />
                <span>12.5% vs last month</span>
              </div>
            </div>
          </div>

          {/* Active Users Kachel */}
          <div className="rounded-xl p-6 border" style={{ backgroundColor: '#1a1f2e', borderColor: '#2a3142' }}>
            <div className="flex flex-col h-full">
              <p className="text-sm font-medium mb-4" style={{ color: '#8b92a7' }}>Active Users</p>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-5xl font-bold mb-3" style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>8,921</p>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium pt-2" style={{ color: '#10b981', borderTop: '1px solid #2a3142' }}>
                <TrendingUp size={16} strokeWidth={2.5} />
                <span>8.2% vs last month</span>
              </div>
            </div>
          </div>

          {/* New Signups Kachel */}
          <div className="rounded-xl p-6 border" style={{ backgroundColor: '#1a1f2e', borderColor: '#2a3142' }}>
            <div className="flex flex-col h-full">
              <p className="text-sm font-medium mb-4" style={{ color: '#8b92a7' }}>New Signups</p>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-5xl font-bold mb-3" style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>1,102</p>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium pt-2" style={{ color: '#ef4444', borderTop: '1px solid #2a3142' }}>
                <TrendingDown size={16} strokeWidth={2.5} />
                <span>3.1% vs last month</span>
              </div>
            </div>
          </div>

          {/* Bounce Rate Kachel */}
          <div className="rounded-xl p-6 border" style={{ backgroundColor: '#1a1f2e', borderColor: '#2a3142' }}>
            <div className="flex flex-col h-full">
              <p className="text-sm font-medium mb-4" style={{ color: '#8b92a7' }}>Bounce Rate</p>
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-5xl font-bold mb-3" style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>23.8%</p>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium pt-2" style={{ color: '#10b981', borderTop: '1px solid #2a3142' }}>
                <TrendingDown size={16} strokeWidth={2.5} />
                <span>5.4% vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Behavior Chart */}
        <div className="rounded-lg p-6 mb-8" style={{ backgroundColor: '#1a1f2e' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold" style={{ color: '#ffffff' }}>User Behavior Analysis</h2>
            <select className="rounded-lg px-4 py-2 text-sm cursor-pointer" style={{ backgroundColor: '#0a0e1a', color: '#8b92a7', border: '1px solid #2a3142' }}>
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={behaviorData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3142" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#8b92a7"
                tick={{ fill: '#8b92a7', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#8b92a7"
                tick={{ fill: '#8b92a7', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1f2e',
                  border: '1px solid #2a3142',
                  borderRadius: '0.5rem',
                  color: '#ffffff'
                }}
                cursor={{ fill: '#ef4444', opacity: 0.1 }}
              />
              <Bar 
                dataKey="value" 
                fill="#ef4444" 
                radius={[4, 4, 0, 0]}
                maxBarSize={80}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Section - Venue Stats and Referrers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Count per Venue */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1f2e' }}>
            <h2 className="text-xl font-bold mb-6" style={{ color: '#ffffff' }}>User Count per Venue</h2>
            <div className="space-y-6">
              {venueData.map((venue) => (
                <div key={venue.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm" style={{ color: '#ffffff' }}>{venue.name}</span>
                    <span className="text-sm" style={{ color: '#8b92a7' }}>{venue.users.toLocaleString()} users</span>
                  </div>
                  <div className="w-full rounded-full h-2 overflow-hidden" style={{ backgroundColor: '#2a3142' }}>
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${(venue.users / venue.maxUsers) * 100}%`,
                        backgroundColor: '#ef4444'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Referrers */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#1a1f2e' }}>
            <h2 className="text-xl font-bold mb-6" style={{ color: '#ffffff' }}>Top Referrers</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #2a3142' }}>
                    <th className="text-left py-3 text-sm font-medium" style={{ color: '#8b92a7' }}>Source</th>
                    <th className="text-right py-3 text-sm font-medium" style={{ color: '#8b92a7' }}>Users</th>
                    <th className="text-right py-3 text-sm font-medium" style={{ color: '#8b92a7' }}>Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  {referrerData.map((referrer, index) => (
                    <tr key={referrer.source} style={{ borderBottom: index < referrerData.length - 1 ? '1px solid #2a3142' : 'none' }}>
                      <td className="py-4 text-sm" style={{ color: '#ffffff' }}>{referrer.source}</td>
                      <td className="py-4 text-sm text-right" style={{ color: '#ffffff' }}>{referrer.users.toLocaleString()}</td>
                      <td className="py-4 text-sm text-right font-medium" style={{ color: '#10b981' }}>{referrer.conversion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
