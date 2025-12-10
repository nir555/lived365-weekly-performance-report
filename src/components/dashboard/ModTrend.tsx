import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { Building2 } from 'lucide-react';
import { WeeklyData } from '@/lib/dataTypes';
import { format, parseISO } from 'date-fns';

interface ModTrendProps {
  data: WeeklyData[];
}

export function ModTrend({ data }: ModTrendProps) {
  const chartData = data.slice(-5).map(d => ({
    week: format(parseISO(d.weekStart), 'MMM d'),
    Partner: d.mod.partnerRegistration,
    Client: d.mod.clientRegistration,
  }));

  const latest = data[data.length - 1];
  
  const dateRange = data.length > 0 ? 
    `${format(parseISO(data[0].weekStart), 'MMM d')} - ${format(parseISO(data[data.length - 1].weekStart), 'MMM d')}` : '';

  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex items-center justify-center gap-10 text-2xs font-normal text-muted-foreground">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-1">
            <div 
              className="h-1.5 w-1.5 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span>{entry.dataKey}: {entry.dataKey === 'Partner' ? latest?.mod.partnerRegistration || 0 : latest?.mod.clientRegistration || 0}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-blue-50 rounded-xl border border-blue-200 p-0.25 space-y-1">
      <div className="flex items-center justify-between px-2 py-1">
        <span className="text-3xs text-muted-foreground"></span>
        <span className="text-3xs text-muted-foreground">{dateRange}</span>
      </div>
      <div className="h-40 px-2 pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ left: 15, right: 5, top: 5, bottom: 5 }}>
            <XAxis 
              dataKey="week"
              tick={{ fontSize: 7, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 7, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
              width={25}
              allowDecimals={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '8px',
                padding: '4px',
              }}
              cursor={{ fill: 'hsl(var(--muted)/0.08)' }}
            />
            <Legend 
              content={renderCustomLegend}
              wrapperStyle={{ paddingTop: '8px' }}
            />
            <Line 
              type="monotone" 
              dataKey="Partner" 
              stroke="#f43f5e" 
              strokeWidth={2} 
              dot={{ fill: '#f43f5e', r: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="Client" 
              stroke="#ec4899" 
              strokeWidth={2} 
              dot={{ fill: '#ec4899', r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
