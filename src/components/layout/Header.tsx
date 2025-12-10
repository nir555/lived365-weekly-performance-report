import { BarChart3, FileText, Menu, X } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 overflow-x-hidden">
      <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-7xl flex h-16 items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="text-base sm:text-lg font-semibold text-foreground truncate">
              LiveD365
            </span>
          </div>
          
          <nav className="hidden sm:flex items-center gap-1">
            <NavLink
              to="/"
              className={cn(
                "hidden sm:flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              activeClassName="!bg-primary/10 !text-primary"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </NavLink>
            <NavLink
              to="/entry"
              className={cn(
                "hidden sm:flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              activeClassName="!bg-primary/10 !text-primary"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Weekly Entry</span>
            </NavLink>
          </nav>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
          <span className="hidden sm:inline text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            Weekly Portal
          </span>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card overflow-x-hidden">
          <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-7xl py-3 space-y-1">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full",
                "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              activeClassName="!bg-primary/10 !text-primary"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </NavLink>
            <NavLink
              to="/entry"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full",
                "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              activeClassName="!bg-primary/10 !text-primary"
            >
              <FileText className="h-4 w-4" />
              Weekly Entry
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
