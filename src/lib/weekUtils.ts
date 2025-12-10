import { startOfWeek, endOfWeek, format, addWeeks, subWeeks, isSameWeek, parseISO } from 'date-fns';

export interface WeekRange {
  start: Date;
  end: Date;
  label: string;
  value: string;
}

export function getWeekRange(date: Date): WeekRange {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  const end = new Date(start);
  end.setDate(start.getDate() + 4); // Friday
  
  return {
    start,
    end,
    label: `${format(start, 'd MMM')} – ${format(end, 'd MMM')}`,
    value: format(start, 'yyyy-MM-dd'),
  };
}

export function getWeeksForMonth(monthOffset: number = 0, includeCurrentOnly: boolean = true): WeekRange[] {
  const today = new Date();
  const targetMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const weeks: WeekRange[] = [];
  
  // Get the first day of the month
  const firstDayOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), 1);
  
  // Get the last day of the month
  const lastDayOfMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0);
  
  // Get first Monday of or before the month
  let current = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
  
  // Get current week for comparison
  const currentWeek = getWeekRange(today);
  
  // Only apply current-only filter if viewing current month
  const isCurrentMonth = monthOffset === 0;
  
  // Generate weeks that fall within this month
  while (current <= lastDayOfMonth) {
    const week = getWeekRange(current);
    const weekEnd = new Date(current);
    weekEnd.setDate(current.getDate() + 4); // Friday of that week
    
    // Check if the week overlaps with the target month
    if (weekEnd >= firstDayOfMonth && current <= lastDayOfMonth) {
      if (includeCurrentOnly && isCurrentMonth) {
        // Only add if this week is on or before current week (for current month only)
        if (week.value <= currentWeek.value) {
          weeks.push(week);
        }
      } else {
        weeks.push(week);
      }
    }
    
    current = addWeeks(current, 1);
  }
  
  return weeks;
}

export function getCurrentWeek(): WeekRange {
  return getWeekRange(new Date());
}

export function formatWeekLabel(weekStart: string): string {
  const start = parseISO(weekStart);
  const end = new Date(start);
  end.setDate(start.getDate() + 4);
  return `${format(start, 'd MMM')} – ${format(end, 'd MMM yyyy')}`;
}
