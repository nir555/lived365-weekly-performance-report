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
      gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      border: 'border-emerald-200/50',
      text: 'text-emerald-600',
    },
    client: {
      gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      border: 'border-blue-200/50',
      text: 'text-blue-600',
    },
    resource: {
      gradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
      iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600',
      border: 'border-amber-200/50',
      text: 'text-amber-600',
    },
    mod: {
      gradient: 'from-rose-500/10 via-rose-500/5 to-transparent',
      iconBg: 'bg-gradient-to-br from-rose-500 to-rose-600',
      border: 'border-rose-200/50',
      text: 'text-rose-600',
    },
  };

  const styles = category ? categoryStyles[category] : {
    gradient: 'from-primary/10 via-primary/5 to-transparent',
    iconBg: 'bg-gradient-to-br from-primary to-primary/80',
    border: 'border-primary/20',
    text: 'text-primary',
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border shadow-sm hover:shadow-xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-2 animate-fade-in group cursor-default",
        styles.border
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40", styles.gradient)} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 sm:mb-3 truncate">
              {label}
            </p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
          </div>
          <div className={cn(
            "flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-lg sm:rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 flex-shrink-0",
            styles.iconBg
          )}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
        </div>
        
        {trend !== undefined && (
          <div className="mt-4 flex items-center gap-1.5 pt-3 border-t border-border/50">
            <div className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
              trend > 0 && "bg-emerald-100 text-emerald-700",
              trend < 0 && "bg-rose-100 text-rose-700",
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
            <span className="text-xs text-muted-foreground">vs last week</span>
          </div>
        )}
      </div>
    </div>
  );
}