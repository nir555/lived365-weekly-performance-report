import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart, BarChart, Bar } from 'recharts';
import { WeeklyData } from '@/lib/dataTypes';
import { format, parseISO } from 'date-fns';
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

interface PerformanceChartProps {
  data: WeeklyData[];
  type: 'line' | 'bar' | 'pie';
  dataKey?: string;
}

const COLORS = {
  marketing: '#10b981',
  client: '#3b82f6',
  resource: '#f59e0b',
  mod: '#f43f5e',
  positive: '#10b981',
  negative: '#f43f5e',
};

export function PerformanceChart({ data, type }: PerformanceChartProps) {
  if (type === 'line') {
    const chartData = data.map(d => ({
      week: format(parseISO(d.weekStart), 'MMM d'),
      Meetings: d.marketing.totalMeetingSchedule,
      Submissions: d.client.submitProfiles,
      Interviews: d.client.scheduleInterview,
    }));

    return (
      <div className="bg-gradient-to-br from-blue-50/50 to-transparent rounded-2xl border border-blue-100/50 p-5 h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Weekly Trends</h3>
            <p className="text-xs text-muted-foreground">Performance over time</p>
          </div>
        </div>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMeetings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.marketing} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={COLORS.marketing} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.client} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={COLORS.client} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="week" 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                axisLine={false}
                tickLine={false}
                dy={8}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                axisLine={false}
                tickLine={false}
                dx={-8}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  padding: '12px',
                }}
                cursor={{ fill: 'hsl(var(--muted)/0.08)' }}
                labelStyle={{ fontWeight: 600, marginBottom: 4 }}
              />
              <Area 
                type="monotone" 
                dataKey="Meetings" 
                stroke={COLORS.marketing} 
                strokeWidth={2.5} 
                fill="url(#colorMeetings)"
                dot={{ fill: COLORS.marketing, strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey="Submissions" 
                stroke={COLORS.client} 
                strokeWidth={2.5} 
                fill="url(#colorSubmissions)"
                dot={{ fill: COLORS.client, strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.marketing }} />
            <span className="text-xs text-muted-foreground">Meetings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.client }} />
            <span className="text-xs text-muted-foreground">Submissions</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'bar') {
    const chartData = [
      { name: 'Marketing', value: data.reduce((sum, d) => sum + d.marketing.emailsSent + d.marketing.totalMeetingSchedule, 0), fill: COLORS.marketing },
      { name: 'Client', value: data.reduce((sum, d) => sum + d.client.submitProfiles + d.client.scheduleInterview, 0), fill: COLORS.client },
      { name: 'Resource', value: data.reduce((sum, d) => sum + d.resource.totalReachout + d.resource.registerOnLiveD365, 0), fill: COLORS.resource },
      { name: 'Mod', value: data.reduce((sum, d) => sum + d.mod.partnerRegistration + d.mod.clientRegistration, 0), fill: COLORS.mod },
    ];

    return (
      <div className="bg-gradient-to-br from-amber-50/50 to-transparent rounded-2xl border border-amber-100/50 p-5 h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Category Breakdown</h3>
            <p className="text-xs text-muted-foreground">Activity by department</p>
          </div>
        </div>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis 
                type="number" 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  padding: '12px',
                }} 
                cursor={{ fill: 'hsl(var(--muted)/0.08)' }}
              />
              <Bar 
                dataKey="value" 
                radius={[0, 8, 8, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-border/50 flex-wrap">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'pie') {
    const latestData = data[data.length - 1];
    if (!latestData) return null;

    const positive = latestData.marketing.positiveReplies || 0;
    const negative = latestData.marketing.negativeReplies || 0;
    const total = positive + negative;

    const pieData = [
      { name: 'Positive', value: positive || 3, color: COLORS.positive },
      { name: 'Negative', value: negative || 2, color: COLORS.negative },
    ];

    const displayPositive = positive || 3;
    const displayNegative = negative || 2;

    return (
      <div className="bg-gradient-to-br from-emerald-50/50 to-transparent rounded-2xl border border-emerald-100/50 p-5 h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
            <PieChartIcon className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Reply Sentiment</h3>
            <p className="text-xs text-muted-foreground">Response quality ratio</p>
          </div>
        </div>
        
        <div className="h-[220px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{displayPositive + displayNegative}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-6 pt-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.positive }} />
            <span className="text-xs text-muted-foreground">Positive ({displayPositive})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.negative }} />
            <span className="text-xs text-muted-foreground">Negative ({displayNegative})</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}