import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  trend?: number;
  category?: 'marketing' | 'client' | 'resource' | 'mod';
  delay?: number;
}

export function KPICard({ label, value, icon: Icon, trend, category, delay = 0 }: KPICardProps) {
  const categoryStyles = {
    marketing: {
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconBg: 'bg-primary',
      border: 'border-primary/20',
      text: 'text-primary',
    },
    client: {
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconBg: 'bg-primary',
      border: 'border-primary/20',
      text: 'text-primary',
    },
    resource: {
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconBg: 'bg-primary',
      border: 'border-primary/20',
      text: 'text-primary',
    },
    mod: {
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconBg: 'bg-primary',
      border: 'border-primary/20',
      text: 'text-primary',
    },
  };

  const styles = category ? categoryStyles[category] : {
    gradient: 'from-primary/10 via-primary/5 to-transparent',
    iconBg: 'bg-primary',
    border: 'border-primary/20',
    text: 'text-primary',
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-white dark:bg-slate-800 rounded-lg border shadow-sm p-2 transition-all duration-300 hover:shadow-md animate-fade-in group cursor-default",
        styles.border
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40", styles.gradient)} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-1.5">
          <div className="flex-1 min-w-0">
            <p className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5 truncate">
              {label}
            </p>
            <p className="text-xs font-bold text-foreground tracking-tight">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
          </div>
            <div className={cn(
              "flex h-5 w-5 items-center justify-center rounded shadow-sm transition-transform duration-300 group-hover:scale-105 flex-shrink-0",
            styles.iconBg
          )}>
            <Icon className="h-2.5 w-2.5 text-white" />
          </div>
        </div>
        
        {trend !== undefined && (
          <div className="mt-1 flex items-center gap-1 pt-1 border-t border-border/50">
            <div className={cn(
              "flex items-center gap-0.5 px-1 py-0.5 rounded-full text-3xs font-medium",
              trend > 0 && "bg-primary/20 text-primary",
              trend < 0 && "bg-red-100 text-red-700",
              trend === 0 && "bg-gray-100 text-gray-600"
            )}>
              {trend > 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : trend < 0 ? (
                <TrendingDown className="h-3 w-3" />
              ) : (
                <Minus className="h-3 w-3" />
              )}
              {trend > 0 ? '+' : ''}{trend}%
            </div>
            <span className="text-3xs text-muted-foreground">vs last week</span>
          </div>
        )}
      </div>
    </div>
  );
}