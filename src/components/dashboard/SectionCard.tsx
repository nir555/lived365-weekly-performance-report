import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  category: 'marketing' | 'client' | 'resource' | 'mod';
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: number;
}

const categoryConfig = {
  marketing: {
    gradient: 'from-primary to-primary',
    lightBg: 'bg-primary/5',
    border: 'border-primary/20',
    hoverBg: 'hover:bg-primary/5',
    dot: 'bg-primary',
    badgeBg: 'bg-primary/10 text-primary',
  },
  client: {
    gradient: 'from-primary to-primary',
    lightBg: 'bg-primary/5',
    border: 'border-primary/20',
    hoverBg: 'hover:bg-primary/5',
    dot: 'bg-primary',
    badgeBg: 'bg-primary/10 text-primary',
  },
  resource: {
    gradient: 'from-primary to-primary',
    lightBg: 'bg-primary/5',
    border: 'border-primary/20',
    hoverBg: 'hover:bg-primary/5',
    dot: 'bg-primary',
    badgeBg: 'bg-primary/10 text-primary',
  },
  mod: {
    gradient: 'from-primary to-primary',
    lightBg: 'bg-primary/5',
    border: 'border-primary/20',
    hoverBg: 'hover:bg-primary/5',
    dot: 'bg-primary',
    badgeBg: 'bg-primary/10 text-primary',
  },
};

export function SectionCard({ title, category, children, defaultOpen = false, badge }: SectionCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const config = categoryConfig[category];

  return (
    <div className={cn(
      "bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl border shadow-sm overflow-hidden animate-fade-in transition-all duration-300 hover:shadow-md",
      config.border
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 transition-all gap-2",
          config.hoverBg
        )}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <h3 className="text-xs sm:text-sm font-semibold text-foreground truncate">
            {title}
          </h3>
          {badge !== undefined && badge > 0 && (
            <span className={cn("text-3xs sm:text-2xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-sm flex-shrink-0", config.badgeBg)}>
              {badge}
            </span>
          )}
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