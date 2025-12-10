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
      <SelectTrigger className="w-auto h-9 bg-card border-border rounded-xl shadow-sm font-medium gap-2 flex items-center px-3 sm:px-4">
        <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
        <SelectValue placeholder="Select week" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        {weeks.map((week) => (
          <SelectItem 
            key={week.value} 
            value={week.value}
            className="rounded-lg"
          >
            {week.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}