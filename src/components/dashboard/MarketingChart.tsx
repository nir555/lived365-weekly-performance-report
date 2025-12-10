import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Mail, Send, Linkedin } from 'lucide-react';
import { WeeklyData } from '@/lib/dataTypes';
import { format, parseISO } from 'date-fns';

interface MarketingChartProps {
  data: WeeklyData[];
  type: 'email' | 'apollo' | 'linkedin';
}

export function MarketingChart({ data, type }: MarketingChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gradient-to-br from-green-50/50 to-transparent rounded-xl border border-green-100/50 p-2 h-[180px] flex items-center justify-center">
        <p className="text-xs text-muted-foreground">No data available</p>
      </div>
    );
  }

  const chartData = data.map(weekData => {
    const weekLabel = format(parseISO(weekData.weekStart), 'MMM d');
    
    if (type === 'email') {
      return {
        name: weekLabel,
        'Replies': weekData.marketing.positiveReplies + weekData.marketing.negativeReplies,
        'Meetings': weekData.marketing.totalMeetingSchedule,
        'Introductions': weekData.marketing.newAccountIntroductionSuccess,
      };
    } else if (type === 'apollo') {
      return {
        name: weekLabel,
        'Replies': weekData.marketing.clientReachoutPositive + weekData.marketing.clientReachoutNegative,
        'Meetings': Math.floor(weekData.marketing.totalMeetingSchedule * 0.4),
        'Introductions': Math.floor(weekData.marketing.newAccountIntroductionSuccess * 0.4),
      };
    } else {
      return {
        name: weekLabel,
        'Replies': weekData.marketing.kanboxPositive + weekData.marketing.kanboxNegative,
        'Meetings': Math.floor(weekData.marketing.totalMeetingSchedule * 0.3),
        'Introductions': Math.floor(weekData.marketing.newAccountIntroductionSuccess * 0.3),
      };
    }
  });

  const getTitle = () => {
    if (type === 'email') return 'Marketing Emails';
    if (type === 'apollo') return 'Apollo';
    return 'LinkedIn';
  };

  const getIcon = () => {
    if (type === 'email') return Mail;
    if (type === 'apollo') return Send;
    return Linkedin;
  };

  const Icon = getIcon();
  const colorMap = {
    email: { bg: 'bg-blue-50', border: 'border-blue-200' },
    apollo: { bg: 'bg-blue-50', border: 'border-blue-200' },
    linkedin: { bg: 'bg-blue-50', border: 'border-blue-200' }
  };
  const { bg, border } = colorMap[type];

  // Calculate totals
  const totalSent = data.reduce((sum, weekData) => {
    if (type === 'email') {
      return sum + weekData.marketing.emailsSent;
    } else if (type === 'apollo') {
      return sum + (weekData.marketing.clientReachoutPositive + weekData.marketing.clientReachoutNegative);
    } else {
      return sum + (weekData.marketing.kanboxPositive + weekData.marketing.kanboxNegative);
    }
  }, 0);

  const dateRange = data.length > 0 ? 
    `${format(parseISO(data[0].weekStart), 'MMM d')} - ${format(parseISO(data[data.length - 1].weekStart), 'MMM d')}` : '';

  return (
    <div className={`${bg} rounded-xl border ${border} p-3`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xs font-semibold text-foreground">Total: {totalSent}</span>
        <span className="text-3xs text-muted-foreground">{dateRange}</span>
      </div>
      <div className="h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ left: 0, right: 15, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 8, fill: 'hsl(var(--muted-foreground))' }} 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 8, fill: 'hsl(var(--muted-foreground))' }} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '9px',
                padding: '4px',
              }}
              cursor={{ fill: 'hsl(var(--muted)/0.08)' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '8px', paddingTop: '4px' }}
              iconType="circle"
              iconSize={6}
            />
            <Bar dataKey="Replies" fill="#3b82f6" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Meetings" fill="#f59e0b" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Introductions" fill="#2E8B57" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
