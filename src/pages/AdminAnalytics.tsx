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
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">Insights into user behavior and system performance.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 hover:border-accent/50 transition-colors">
            <p className="text-sm text-muted-foreground mb-3 font-medium">Total Users</p>
            <p className="text-4xl font-bold mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">12,456</p>
            <div className="flex items-center gap-1.5 text-sm text-emerald-500 font-medium">
              <TrendingUp size={14} strokeWidth={2.5} />
              <span>12.5% vs last month</span>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 hover:border-accent/50 transition-colors">
            <p className="text-sm text-muted-foreground mb-3 font-medium">Active Users</p>
            <p className="text-4xl font-bold mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">8,921</p>
            <div className="flex items-center gap-1.5 text-sm text-emerald-500 font-medium">
              <TrendingUp size={14} strokeWidth={2.5} />
              <span>8.2% vs last month</span>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 hover:border-accent/50 transition-colors">
            <p className="text-sm text-muted-foreground mb-3 font-medium">New Signups</p>
            <p className="text-4xl font-bold mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">1,102</p>
            <div className="flex items-center gap-1.5 text-sm text-accent font-medium">
              <TrendingDown size={14} strokeWidth={2.5} />
              <span>3.1% vs last month</span>
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 hover:border-accent/50 transition-colors">
            <p className="text-sm text-muted-foreground mb-3 font-medium">Bounce Rate</p>
            <p className="text-4xl font-bold mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">23.8%</p>
            <div className="flex items-center gap-1.5 text-sm text-emerald-500 font-medium">
              <TrendingDown size={14} strokeWidth={2.5} />
              <span>5.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* User Behavior Chart */}
        <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">User Behavior Analysis</h2>
            <select className="bg-card border border-border/50 rounded-lg px-4 py-2 text-sm font-medium hover:border-accent/50 transition-colors cursor-pointer">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={behaviorData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                cursor={{ fill: 'hsl(var(--accent))', opacity: 0.1 }}
              />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--accent))" 
                radius={[6, 6, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Section - Venue Stats and Referrers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Count per Venue */}
          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-8">User Count per Venue</h2>
            <div className="space-y-7">
              {venueData.map((venue) => (
                <div key={venue.name}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold">{venue.name}</span>
                    <span className="text-sm text-muted-foreground font-medium">{venue.users.toLocaleString()} users</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-accent h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" 
                      style={{ width: `${(venue.users / venue.maxUsers) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Referrers */}
          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-8">Top Referrers</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Source</th>
                    <th className="text-right py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Users</th>
                    <th className="text-right py-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  {referrerData.map((referrer, index) => (
                    <tr key={referrer.source} className="border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-2 text-sm font-medium">{referrer.source}</td>
                      <td className="py-4 px-2 text-sm text-right font-semibold">{referrer.users.toLocaleString()}</td>
                      <td className="py-4 px-2 text-sm text-right text-emerald-500 font-bold">{referrer.conversion}</td>
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
