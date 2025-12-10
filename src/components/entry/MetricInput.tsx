import { useState } from 'react';
import { MessageSquarePlus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface MetricInputProps {
  label: string;
  value?: number;
  onChange?: (value: number) => void;
  onAddNote?: (note: string) => void;
  subFields?: { key: string; label: string; value: number; onChange: (value: number) => void }[];
  showMainInput?: boolean;
  computedTotal?: number;
  note?: string;
}

export function MetricInput({ label, value, onChange, onAddNote, subFields, showMainInput = true, computedTotal, note }: MetricInputProps) {
  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState('');

  const handleSaveNote = () => {
    if (noteText.trim() && onAddNote) {
      onAddNote(noteText.trim());
      setNoteText('');
      setShowNote(false);
    }
  };

  const displayTotal = computedTotal !== undefined ? computedTotal : value;

  return (
    <div className="py-3 border-b border-border/50 last:border-0">
      <div className="flex items-center gap-4">
        <label className="flex-1 text-sm font-medium text-foreground">
          {label}
        </label>
        {showMainInput && onChange ? (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            className="w-24 text-right bg-primary/15 border-primary/30 font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min={0}
          />
        ) : computedTotal !== undefined ? (
          <div className="w-24 text-right font-bold text-green-700 bg-green-100 border border-green-200 rounded-md px-3 py-2">
            {displayTotal}
          </div>
        ) : null}
        {onAddNote && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowNote(!showNote)}
            className="text-muted-foreground hover:text-primary"
          >
            <MessageSquarePlus className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {note && (
        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">{note}</p>
        </div>
      )}
      
      {subFields && subFields.length > 0 && (
        <div className="mt-3 ml-4 grid grid-cols-2 gap-3">
          {subFields.map((field) => (
            <div key={field.key} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-2 border border-slate-200 dark:border-slate-700">
              <label className="flex-1 text-xs font-medium text-foreground">
                {field.label}
              </label>
              <Input
                type="number"
                value={field.value || ''}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                className="w-16 text-right text-sm bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                min={0}
              />
            </div>
          ))}
        </div>
      )}
      
      {showNote && (
        <div className="mt-3 p-3 bg-accent/50 rounded-lg animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Add Note</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setShowNote(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <Textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Enter your note..."
            className="min-h-[60px] text-sm bg-card"
          />
          <div className="flex justify-end mt-2">
            <Button
              type="button"
              size="sm"
              onClick={handleSaveNote}
              disabled={!noteText.trim()}
            >
              Save Note
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
