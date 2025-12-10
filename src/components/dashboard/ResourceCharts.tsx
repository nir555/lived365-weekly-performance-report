import { BookUser, ArrowDown } from 'lucide-react';
import { WeeklyData } from '@/lib/dataTypes';
import { format, parseISO } from 'date-fns';

interface ResourceChartsProps {
  data: WeeklyData[];
}

export function ResourceCharts({ data }: ResourceChartsProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gradient-to-br from-amber-50/50 to-transparent rounded-xl border border-amber-100/50 p-3 h-[100px] flex items-center justify-center">
        <p className="text-xs text-muted-foreground">No data available</p>
      </div>
    );
  }

  // Aggregate data across all weeks
  const aggregatedData = data.reduce((acc, weekData) => ({
    totalReachout: acc.totalReachout + weekData.resource.totalReachout,
    registerOnLiveD365: acc.registerOnLiveD365 + weekData.resource.registerOnLiveD365,
  }), { totalReachout: 0, registerOnLiveD365: 0 });

  const stages = [
    { label: 'Resource Reachout', value: aggregatedData.totalReachout, width: 100 },
    { label: 'LiveD365 Registered', value: aggregatedData.registerOnLiveD365, width: 70 },
  ];

  const dateRange = data.length > 0 ? 
    `${format(parseISO(data[0].weekStart), 'MMM d')} - ${format(parseISO(data[data.length - 1].weekStart), 'MMM d')}` : '';

  return (
    <div className="bg-blue-50 rounded-xl border border-blue-200 p-14">
      <div className="flex flex-col items-center space-y-1 py-1">
        {stages.map((stage, index) => (
          <div key={stage.label} className="w-full flex flex-col items-center">
            <div 
              className="relative bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg py-1 px-2 shadow-sm transition-all duration-300 hover:shadow-md"
              style={{ width: `${stage.width}%` }}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-3xs font-medium text-white truncate">{stage.label}</span>
                <span className="text-2xs font-bold text-white flex-shrink-0">{stage.value}</span>
              </div>
            </div>
            {index < stages.length - 1 && (
              <div className="flex justify-center my-0.25">
                <ArrowDown className="h-2 w-2 text-amber-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
