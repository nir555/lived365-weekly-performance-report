import { Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WeekRange } from '@/lib/weekUtils';

interface WeekSelectorProps {
  selectedWeek: string;
  onWeekChange: (weekStart: string) => void;
  weeks: WeekRange[];
}

export function WeekSelector({ selectedWeek, onWeekChange, weeks }: WeekSelectorProps) {
  return (
    <Select value={selectedWeek} onValueChange={onWeekChange}>
      <SelectTrigger className="w-auto h-4 bg-card border-border rounded-md shadow-sm text-3xs gap-1 flex items-center px-1">
        <Calendar className="h-2 w-2 text-primary flex-shrink-0" />
        <SelectValue placeholder="Select week" />
      </SelectTrigger>
      <SelectContent className="rounded-md">
        {weeks.map((week) => (
          <SelectItem 
            key={week.value} 
            value={week.value}
            className="rounded"
          >
            {week.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}