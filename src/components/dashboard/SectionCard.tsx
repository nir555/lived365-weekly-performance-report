import { useState, ReactNode } from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  category: 'marketing' | 'client' | 'resource' | 'mod';
  icon?: LucideIcon;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: number;
}

const categoryConfig = {
  marketing: {
    gradient: 'from-emerald-500 to-emerald-600',
    lightBg: 'bg-emerald-50',
    border: 'border-emerald-100',
    hoverBg: 'hover:bg-emerald-50/50',
    dot: 'bg-emerald-500',
    badgeBg: 'bg-emerald-100 text-emerald-700',
  },
  client: {
    gradient: 'from-blue-500 to-blue-600',
    lightBg: 'bg-blue-50',
    border: 'border-blue-100',
    hoverBg: 'hover:bg-blue-50/50',
    dot: 'bg-blue-500',
    badgeBg: 'bg-blue-100 text-blue-700',
  },
  resource: {
    gradient: 'from-amber-500 to-amber-600',
    lightBg: 'bg-amber-50',
    border: 'border-amber-100',
    hoverBg: 'hover:bg-amber-50/50',
    dot: 'bg-amber-500',
    badgeBg: 'bg-amber-100 text-amber-700',
  },
  mod: {
    gradient: 'from-rose-500 to-rose-600',
    lightBg: 'bg-rose-50',
    border: 'border-rose-100',
    hoverBg: 'hover:bg-rose-50/50',
    dot: 'bg-rose-500',
    badgeBg: 'bg-rose-100 text-rose-700',
  },
};

export function SectionCard({ title, category, icon: Icon, children, defaultOpen = false, badge }: SectionCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const config = categoryConfig[category];

  return (
    <div className={cn(
      "bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border shadow-sm overflow-hidden animate-fade-in transition-all duration-300 hover:shadow-lg",
      config.border
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 transition-all gap-2",
          config.hoverBg
        )}
      >
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className={cn(
            "h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110 flex-shrink-0",
            config.gradient
          )}>
            {Icon ? (
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            ) : (
              <div className="h-2 w-2 rounded-full bg-white" />
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-foreground truncate">
              {title}
            </h3>
            {badge !== undefined && badge > 0 && (
              <span className={cn("text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-sm flex-shrink-0", config.badgeBg)}>
                {badge}
              </span>
            )}
          </div>
        </div>
        <ChevronDown className={cn(
          "h-5 w-5 text-muted-foreground transition-transform duration-300 font-bold flex-shrink-0",
          isOpen && "rotate-180"
        )} />
      </button>
      
      <div className={cn(
        "grid transition-all duration-300 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-border/50">
            <div className="space-y-2">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}