import { Handshake, ArrowDown } from 'lucide-react';
import { WeeklyData } from '@/lib/dataTypes';
import { format, parseISO } from 'date-fns';

interface ClientPipelineProps {
  data: WeeklyData[];
}

export function ClientPipeline({ data }: ClientPipelineProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50/50 to-transparent rounded-xl border border-blue-100/50 p-3 h-[100px] flex items-center justify-center">
        <p className="text-xs text-muted-foreground">No data available</p>
      </div>
    );
  }

  // Aggregate data across all weeks
  const aggregatedData = data.reduce((acc, weekData) => ({
    submitProfilesByKrishna: acc.submitProfilesByKrishna + weekData.resource.submitProfilesByKrishna,
    submitProfiles: acc.submitProfiles + weekData.client.submitProfiles,
    scheduleInterview: acc.scheduleInterview + weekData.client.scheduleInterview,
    startContract: acc.startContract + weekData.client.startContract,
  }), { submitProfilesByKrishna: 0, submitProfiles: 0, scheduleInterview: 0, startContract: 0 });

  const stages = [
    { label: 'Profiles by Krishna', value: aggregatedData.submitProfilesByKrishna, width: 100 },
    { label: 'Profiles Submitted', value: aggregatedData.submitProfiles, width: 85 },
    { label: 'Interviews Scheduled', value: aggregatedData.scheduleInterview, width: 70 },
    { label: 'Contracts Started', value: aggregatedData.startContract, width: 55 },
  ];

  const dateRange = data.length > 0 ? 
    `${format(parseISO(data[0].weekStart), 'MMM d')} - ${format(parseISO(data[data.length - 1].weekStart), 'MMM d')}` : '';

  return (
    <div className="bg-blue-50 rounded-xl border border-blue-200 p-3">
      <div className="flex flex-col items-center space-y-1 py-1">
        {stages.map((stage, index) => (
          <div key={stage.label} className="w-full flex flex-col items-center">
            <div 
              className="relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg py-1 px-2 shadow-sm transition-all duration-300 hover:shadow-md"
              style={{ width: `${stage.width}%` }}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-3xs font-medium text-white truncate">{stage.label}</span>
                <span className="text-2xs font-bold text-white flex-shrink-0">{stage.value}</span>
              </div>
            </div>
            {index < stages.length - 1 && (
              <div className="flex justify-center my-0.25">
                <ArrowDown className="h-2 w-2 text-blue-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
