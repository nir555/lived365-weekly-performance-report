import { useState, ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EntrySectionCardProps {
  title: string;
  category: 'marketing' | 'client' | 'resource' | 'mod';
  children: ReactNode;
  defaultOpen?: boolean;
}

const categoryStyles = {
  marketing: {
    border: 'border-l-marketing',
    bg: 'bg-marketing/5',
    dot: 'bg-marketing',
  },
  client: {
    border: 'border-l-client',
    bg: 'bg-client/5',
    dot: 'bg-client',
  },
  resource: {
    border: 'border-l-resource',
    bg: 'bg-resource/5',
    dot: 'bg-resource',
  },
  mod: {
    border: 'border-l-mod',
    bg: 'bg-mod/5',
    dot: 'bg-mod',
  },
};

export function EntrySectionCard({ title, category, children, defaultOpen = true }: EntrySectionCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const styles = categoryStyles[category];

  return (
    <div className={cn(
      "section-card border-l-4 overflow-hidden animate-fade-in",
      styles.border
    )}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between p-4 transition-colors",
          styles.bg,
          "hover:bg-accent/50"
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn("h-2.5 w-2.5 rounded-full", styles.dot)} />
          <h3 className="text-base font-semibold text-foreground capitalize">
            {title}
          </h3>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 animate-accordion-down">
          {children}
        </div>
      )}
    </div>
  );
}
