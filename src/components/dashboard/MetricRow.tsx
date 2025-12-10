import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';

interface MetricRowProps {
  label: string;
  value: number | string;
  subValues?: { label: string; value: number | string }[];
  category?: 'marketing' | 'client' | 'resource' | 'mod';
  note?: string;
}

const categoryStyles = {
  marketing: {
    text: 'text-emerald-700',
    bg: 'bg-green-100 border border-green-200',
    subBg: 'bg-emerald-50/50 border-emerald-100',
  },
  client: {
    text: 'text-blue-700',
    bg: 'bg-green-100 border border-green-200',
    subBg: 'bg-blue-50/50 border-blue-100',
  },
  resource: {
    text: 'text-amber-700',
    bg: 'bg-green-100 border border-green-200',
    subBg: 'bg-amber-50/50 border-amber-100',
  },
  mod: {
    text: 'text-rose-700',
    bg: 'bg-green-100 border border-green-200',
    subBg: 'bg-rose-50/50 border-rose-100',
  },
};

export function MetricRow({ label, value, subValues, category, note }: MetricRowProps) {
  const styles = category ? categoryStyles[category] : {
    text: 'text-green-700',
    bg: 'bg-green-100 border border-green-200',
    subBg: 'bg-secondary/50 border-border',
  };

  return (
    <div className="group py-2 sm:py-3 rounded-lg sm:rounded-xl px-3 sm:px-4 -mx-3 sm:-mx-4 transition-all hover:bg-muted/40">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate flex-1">
          {label}
        </span>
        <div className={cn(
          "min-w-[56px] text-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm shadow-sm transition-all group-hover:shadow-md flex-shrink-0",
          styles.bg,
          styles.text
        )}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {note && (
          <div className="flex-shrink-0" title={note}>
            <MessageSquare className="h-4 w-4 text-primary" />
          </div>
        )}
      </div>
      
      {note && (
        <div className="mt-2 p-2 sm:p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">{note}</p>
        </div>
      )}
      
      {subValues && subValues.length > 0 && (
        <div className="mt-2 sm:mt-3 ml-0 grid grid-cols-2 gap-2 sm:gap-3">
          {subValues.map((sub, idx) => (
            <div 
              key={idx} 
              className={cn(
                "flex flex-col rounded-lg px-3 sm:px-4 py-2 sm:py-3 border transition-all hover:border-opacity-100",
                styles.subBg
              )}
            >
              <span className="text-xs text-muted-foreground font-medium mb-0.5 sm:mb-1 truncate">{sub.label}</span>
              <span className={cn("text-sm sm:text-base font-bold", styles.text)}>
                {typeof sub.value === 'number' ? sub.value.toLocaleString() : sub.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}