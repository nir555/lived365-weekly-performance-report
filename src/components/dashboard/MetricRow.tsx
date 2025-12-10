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
    text: 'text-primary',
    bg: 'bg-primary/10 border border-primary/20',
    subBg: 'bg-primary/5 border-primary/20',
  },
  client: {
    text: 'text-primary',
    bg: 'bg-primary/10 border border-primary/20',
    subBg: 'bg-primary/5 border-primary/20',
  },
  resource: {
    text: 'text-primary',
    bg: 'bg-primary/10 border border-primary/20',
    subBg: 'bg-primary/5 border-primary/20',
  },
  mod: {
    text: 'text-primary',
    bg: 'bg-primary/10 border border-primary/20',
    subBg: 'bg-primary/5 border-primary/20',
  },
};

export function MetricRow({ label, value, subValues, category, note }: MetricRowProps) {
  const styles = category ? categoryStyles[category] : {
    text: 'text-green-700',
    bg: 'bg-green-100 border border-green-200',
    subBg: 'bg-secondary/50 border-border',
  };

  return (
    <div className="group py-1 rounded-lg px-2 -mx-2 transition-all hover:bg-muted/40">
      <div className="flex items-center justify-between gap-2">
        <span className="text-3xs font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate flex-1">
          {label}
        </span>
        <div className={cn(
          "min-w-[50px] text-center px-2 py-0.5 rounded-lg font-bold text-lg shadow-sm transition-all group-hover:shadow-md flex-shrink-0",
          styles.bg,
          styles.text
        )}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {note && (
          <div className="flex-shrink-0" title={note}>
            <MessageSquare className="h-3.5 w-3.5 text-primary" />
          </div>
        )}
      </div>
      
      {note && (
        <div className="mt-1 p-1 bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 rounded">
          <p className="text-2xs text-primary dark:text-primary/90">{note}</p>
        </div>
      )}
      
      {subValues && subValues.length > 0 && (
        <div className="mt-1 ml-0 grid grid-cols-2 gap-1">
          {subValues.map((sub, idx) => (
            <div 
              key={idx} 
              className={cn(
                "flex flex-col rounded px-2 py-1 border transition-all hover:border-opacity-100",
                styles.subBg
              )}
            >
              <span className="text-2xs text-muted-foreground font-medium mb-0.5 truncate">{sub.label}</span>
              <span className={cn("text-sm font-bold", styles.text)}>
                {typeof sub.value === 'number' ? sub.value.toLocaleString() : sub.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}