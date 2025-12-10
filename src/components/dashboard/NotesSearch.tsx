import { useState } from 'react';
import { Search, MessageSquare, Calendar, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchNotes, getNotes } from '@/lib/storage';
import { Note } from '@/lib/dataTypes';
import { cn } from '@/lib/utils';

const categoryColors = {
  marketing: 'bg-primary/10 text-primary border-primary/20',
  client: 'bg-primary/10 text-primary border-primary/20',
  resource: 'bg-primary/10 text-primary border-primary/20',
  mod: 'bg-primary/10 text-primary border-primary/20',
};

export function NotesSearch() {
  const [query, setQuery] = useState('');
  const allNotes = getNotes();
  const results = query ? searchNotes(query) : allNotes.slice(0, 5);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
          <MessageSquare className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-base font-semibold text-foreground">Notes Search</h3>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search notes across all weeks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-10 bg-muted/30 border-border/50 rounded-xl focus:bg-card transition-colors"
        />
      </div>

      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
        {results.length === 0 ? (
          <div className="text-center py-8">
            <div className="h-12 w-12 mx-auto rounded-full bg-muted flex items-center justify-center mb-3">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              {query ? 'No notes found' : 'No notes yet'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Add notes during data entry
            </p>
          </div>
        ) : (
          results.map((note, index) => (
            <NoteCard key={index} note={note} />
          ))
        )}
      </div>
    </div>
  );
}

function NoteCard({ note }: { note: Note }) {
  const categoryStyle = categoryColors[note.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-700 border-gray-200';

  return (
    <div className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50">
      <div className="flex items-start gap-2 mb-2">
        <span className={cn(
          "text-xs font-medium px-2 py-0.5 rounded-md capitalize border",
          categoryStyle
        )}>
          {note.category}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Tag className="h-3 w-3" />
          {note.field}
        </span>
      </div>
      <p className="text-sm text-foreground line-clamp-2 mb-2">{note.text}</p>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Calendar className="h-3 w-3" />
        <span>{note.weekStart} — {note.weekEnd}</span>
      </div>
    </div>
  );
}