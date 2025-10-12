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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Users</p>
            <p className="text-3xl font-bold mb-1">12,456</p>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp size={16} />
              <span>12.5% vs last month</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Active Users</p>
            <p className="text-3xl font-bold mb-1">8,921</p>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp size={16} />
              <span>8.2% vs last month</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">New Signups</p>
            <p className="text-3xl font-bold mb-1">1,102</p>
            <div className="flex items-center gap-1 text-sm text-red-500">
              <TrendingDown size={16} />
              <span>3.1% vs last month</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-2">Bounce Rate</p>
            <p className="text-3xl font-bold mb-1">23.8%</p>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingDown size={16} />
              <span>5.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* User Behavior Chart */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">User Behavior Analysis</h2>
            <select className="bg-background border border-border rounded px-3 py-1.5 text-sm">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={behaviorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem'
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Section - Venue Stats and Referrers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Count per Venue */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">User Count per Venue</h2>
            <div className="space-y-6">
              {venueData.map((venue) => (
                <div key={venue.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{venue.name}</span>
                    <span className="text-sm text-muted-foreground">{venue.users.toLocaleString()} users</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-accent h-full rounded-full transition-all" 
                      style={{ width: `${(venue.users / venue.maxUsers) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Referrers */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Top Referrers</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">Source</th>
                    <th className="text-right py-3 text-sm font-medium text-muted-foreground">Users</th>
                    <th className="text-right py-3 text-sm font-medium text-muted-foreground">Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  {referrerData.map((referrer) => (
                    <tr key={referrer.source} className="border-b border-border last:border-0">
                      <td className="py-4 text-sm">{referrer.source}</td>
                      <td className="py-4 text-sm text-right">{referrer.users.toLocaleString()}</td>
                      <td className="py-4 text-sm text-right text-green-500 font-medium">{referrer.conversion}</td>
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
