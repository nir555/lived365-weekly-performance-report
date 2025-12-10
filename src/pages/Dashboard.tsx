import { useState, useMemo, useEffect } from 'react';
import { Mail, Calendar, FileText, UserPlus, TrendingUp, Target, Handshake, Building2, BookUser, ChevronLeft, ChevronRight, CalendarDays, BarChart3, Search } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { WeekSelector } from '@/components/dashboard/WeekSelector';
import { SectionCard } from '@/components/dashboard/SectionCard';
import { MetricRow } from '@/components/dashboard/MetricRow';
import { MarketingChart } from '@/components/dashboard/MarketingChart';
import { ClientPipeline } from '@/components/dashboard/ClientPipeline';
import { ResourceCharts } from '@/components/dashboard/ResourceCharts';
import { ModTrend } from '@/components/dashboard/ModTrend';
import { getWeeksForMonth, getCurrentWeek, formatWeekLabel } from '@/lib/weekUtils';
import { getWeeklyData, getWeeklyDataByWeek, getNotesForWeek, getNotes, getNoteForField } from '@/lib/storage';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { format, parseISO } from 'date-fns';

export default function Dashboard() {
  const [monthOffset, setMonthOffset] = useState(0);
  const weeks = useMemo(() => getWeeksForMonth(monthOffset, true), [monthOffset]);
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek().value);
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
  const [weekRange, setWeekRange] = useState(4); // Number of weeks to show in weekly view
  const [monthRange, setMonthRange] = useState(2); // Number of months to show in monthly view
  
  const currentMonth = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    return format(date, 'MMMM yyyy');
  }, [monthOffset]);
  
  const allData = useMemo(() => getWeeklyData(), []);
  const weekData = useMemo(() => getWeeklyDataByWeek(selectedWeek), [selectedWeek]);
  const weekNotes = useMemo(() => getNotesForWeek(selectedWeek), [selectedWeek]);
  const [notesQuery, setNotesQuery] = useState('');
  const allNotes = useMemo(() => getNotes(), []);

  useEffect(() => {
    setNotesQuery('');
  }, [selectedWeek, viewMode]);

  const filteredNotes = useMemo(() => {
    const sourceNotes = viewMode === 'weekly' ? weekNotes : allNotes;
    const normalized = notesQuery.trim().toLowerCase();
    if (!normalized) return sourceNotes;
    return sourceNotes.filter(note =>
      note.text.toLowerCase().includes(normalized) ||
      note.category.toLowerCase().includes(normalized) ||
      note.field.toLowerCase().includes(normalized)
    );
  }, [weekNotes, allNotes, viewMode, notesQuery]);

  // Get last N weeks for weekly view charts
  const lastNWeeks = useMemo(() => {
    const currentWeekIndex = allData.findIndex(w => w.weekStart === selectedWeek);
    if (currentWeekIndex === -1) return allData.slice(-weekRange);
    const startIndex = Math.max(0, currentWeekIndex - (weekRange - 1));
    return allData.slice(startIndex, currentWeekIndex + 1);
  }, [allData, selectedWeek, weekRange]);

  // Get data filtered by selected month for charts
  const monthFilteredData = useMemo(() => {
    if (viewMode === 'weekly') {
      return lastNWeeks;
    }
    
    // For monthly view, get current month and previous N-1 months
    const allMonthWeeks: string[] = [];
    for (let i = 0; i < monthRange; i++) {
      const monthWeeks = getWeeksForMonth(monthOffset - i, false).map(w => w.value);
      allMonthWeeks.push(...monthWeeks);
    }
    
    return allData.filter(item => allMonthWeeks.includes(item.weekStart));
  }, [allData, weeks, viewMode, monthOffset, selectedWeek, lastNWeeks, weekRange, monthRange]);

  // Calculate monthly data by aggregating all weeks in the selected month
  const monthlyData = useMemo(() => {
    if (viewMode !== 'monthly') return null;

    const monthData = {
      marketing: { emailsSent: 0, positiveReplies: 0, negativeReplies: 0, totalMeetingSchedule: 0, meetingSuccess: 0, newAccountIntroductionTotal: 0, newAccountIntroductionSuccess: 0, clientReachout: 0, clientReachoutPositive: 0, clientReachoutNegative: 0, kanboxPositive: 0, kanboxNegative: 0 },
      client: { requirementNew: 0, requirementOld: 0, submitProfiles: 0, scheduleInterview: 0, startContract: 0 },
      resource: { totalReachout: 0, registerOnLiveD365: 0, inquiryPostLinkedIn: 0, submitProfilesByKrishna: 0 },
      mod: { partnerRegistration: 0, clientRegistration: 0 },
    };

    // Sum all data from weeks in this month
    weeks.forEach(week => {
      const weekData = getWeeklyDataByWeek(week.value);
      if (weekData) {
        Object.keys(monthData).forEach(category => {
          const cat = category as keyof typeof monthData;
          Object.keys(monthData[cat]).forEach(key => {
            const k = key as keyof typeof monthData[typeof cat];
            (monthData[cat][k] as number) += (weekData[cat][k] as number) || 0;
          });
        });
      }
    });

    return monthData;
  }, [viewMode, weeks]);

  const displayData = viewMode === 'monthly' && monthlyData ? monthlyData : (weekData || {
    marketing: { emailsSent: 0, positiveReplies: 0, negativeReplies: 0, totalMeetingSchedule: 0, meetingSuccess: 0, newAccountIntroductionTotal: 0, newAccountIntroductionSuccess: 0, clientReachout: 0, clientReachoutPositive: 0, clientReachoutNegative: 0, kanboxPositive: 0, kanboxNegative: 0 },
    client: { requirementNew: 0, requirementOld: 0, submitProfiles: 0, scheduleInterview: 0, startContract: 0 },
    resource: { totalReachout: 0, registerOnLiveD365: 0, inquiryPostLinkedIn: 0, submitProfilesByKrishna: 0 },
    mod: { partnerRegistration: 0, clientRegistration: 0 },
  });

  // Calculate totals for badges
  const marketingTotal = displayData.marketing.emailsSent + displayData.marketing.totalMeetingSchedule;
  const clientTotal = displayData.client.requirementNew + displayData.client.requirementOld + displayData.client.submitProfiles;
  const resourceTotal = displayData.resource.totalReachout + displayData.resource.registerOnLiveD365;
  const modTotal = displayData.mod.partnerRegistration + displayData.mod.clientRegistration;

  return (
    <div className="min-h-screen w-screen bg-white dark:bg-slate-950 overflow-x-hidden">
      <Header />
      
      <main className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 space-y-3 sm:space-y-4 mx-auto max-w-7xl">
        {/* Header Section - Compact */}
        <div className="flex items-center justify-end gap-0.5 pb-1">
          <div className="flex items-center gap-0.5 rounded-lg border border-border bg-card/80 px-1 py-0.5">
            <button
              onClick={() => setMonthOffset(monthOffset - 1)}
              className="p-0.5 hover:bg-slate-200/40 dark:hover:bg-slate-700/40 rounded transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-2 w-2" />
            </button>
            <span className="text-3xs font-semibold tracking-tight px-0.5 whitespace-nowrap">{currentMonth}</span>
            <button
              onClick={() => setMonthOffset(monthOffset + 1)}
              disabled={monthOffset > 0}
              className="p-0.5 hover:bg-slate-200/40 dark:hover:bg-slate-700/40 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next month"
            >
              <ChevronRight className="h-2 w-2" />
            </button>
          </div>
          
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'weekly' | 'monthly')} className="w-auto">
            <TabsList className="flex h-4 bg-muted/60 rounded-lg p-0.5 gap-0.5">
              <TabsTrigger value="weekly" className="rounded text-3xs px-1 py-0 data-[state=active]:bg-card data-[state=active]:shadow-sm gap-0.5 flex items-center">
                <CalendarDays className="h-2 w-2" />
                <span className="hidden sm:inline">W</span>
              </TabsTrigger>
              <TabsTrigger value="monthly" className="rounded text-3xs px-1 py-0 data-[state=active]:bg-card data-[state=active]:shadow-sm gap-0.5 flex items-center">
                <BarChart3 className="h-2 w-2" />
                <span className="hidden sm:inline">M</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Range Selector */}
          <Select 
            value={viewMode === 'weekly' ? weekRange.toString() : monthRange.toString()} 
            onValueChange={(v) => viewMode === 'weekly' ? setWeekRange(Number(v)) : setMonthRange(Number(v))}
          >
            <SelectTrigger className="h-4 w-12 bg-card border-border rounded-lg shadow-sm text-3xs px-1 py-0.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {viewMode === 'weekly' ? (
                <>
                  <SelectItem value="1">1w</SelectItem>
                  <SelectItem value="2">2w</SelectItem>
                  <SelectItem value="3">3w</SelectItem>
                  <SelectItem value="4">4w</SelectItem>
                  <SelectItem value="6">6w</SelectItem>
                  <SelectItem value="8">8w</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="1">1m</SelectItem>
                  <SelectItem value="2">2m</SelectItem>
                  <SelectItem value="3">3m</SelectItem>
                  <SelectItem value="4">4m</SelectItem>
                  <SelectItem value="6">6m</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
          
          {viewMode === 'weekly' && (
            <div className="hidden lg:block">
              <WeekSelector 
                selectedWeek={selectedWeek} 
                onWeekChange={setSelectedWeek} 
                weeks={weeks}
              />
            </div>
          )}
        </div>
        
        {viewMode === 'weekly' && (
          <div className="lg:hidden">
            <WeekSelector 
              selectedWeek={selectedWeek} 
              onWeekChange={setSelectedWeek} 
              weeks={weeks}
            />
          </div>
        )}

        {/* KPI Summary - Single Modal Horizontal */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-border p-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 border-r border-border/50 pr-4">
              <p className="text-2xl font-bold text-foreground">{displayData.marketing.emailsSent}</p>
              <p className="text-4xs text-muted-foreground">Emails Sent</p>
            </div>
            <div className="flex-1 border-r border-border/50 pr-4">
              <p className="text-2xl font-bold text-foreground">{displayData.marketing.totalMeetingSchedule}</p>
              <p className="text-4xs text-muted-foreground">Meetings Scheduled</p>
            </div>
            <div className="flex-1 border-r border-border/50 pr-4">
              <p className="text-2xl font-bold text-foreground">{displayData.client.submitProfiles}</p>
              <p className="text-4xs text-muted-foreground">Profiles Submitted</p>
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-foreground">{displayData.resource.registerOnLiveD365}</p>
              <p className="text-4xs text-muted-foreground">LiveD Registrations</p>
            </div>
          </div>
        </div>

        {/* Charts Section - 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-4 pb-4">
          {/* Marketing Emails */}
          <div className="space-y-3">
            <h2 className="text-5xs font-semibold text-foreground">
              Marketing Emails
            </h2>
            <MarketingChart data={monthFilteredData} type="email" />
          </div>

          {/* Apollo */}
          <div className="space-y-3">
            <h2 className="text-5xs font-semibold text-foreground">
              Apollo
            </h2>
            <MarketingChart data={monthFilteredData} type="apollo" />
          </div>

          {/* LinkedIn */}
          <div className="space-y-3">
            <h2 className="text-5xs font-semibold text-foreground">
              LinkedIn
            </h2>
            <MarketingChart data={monthFilteredData} type="linkedin" />
          </div>

          {/* Client Pipeline */}
          <div className="space-y-3">
            <h2 className="text-5xs font-semibold text-foreground">
              Client Pipeline
            </h2>
            <ClientPipeline data={monthFilteredData} />
          </div>

          {/* Resource Pipeline */}
          <div className="space-y-3">
            <h2 className="text-5xs font-semibold text-foreground">
              Resource Pipeline
            </h2>
            <ResourceCharts data={monthFilteredData} />
          </div>

          {/* MOD Trend */}
          <div className="space-y-3">
            <h2 className="text-5xs font-semibold text-foreground">
              MOD Overview
            </h2>
            <ModTrend data={monthFilteredData} />
          </div>
        </div>

        {/* Metrics + Notes */}
        <div className="grid gap-3 pt-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-2">
            <SectionCard title="Marketing" category="marketing" badge={marketingTotal} defaultOpen={false}>
              <MetricRow 
                label="Marketing Email Sent" 
                value={displayData.marketing.emailsSent}
                subValues={[
                  { label: 'Positive Reply', value: displayData.marketing.positiveReplies },
                  { label: 'Negative Reply', value: displayData.marketing.negativeReplies },
                ]}
                category="marketing"
                note={viewMode === 'weekly' ? getNoteForField(selectedWeek, 'marketing', 'Marketing Email Sent') : undefined}
              />
              <MetricRow 
                label="Total Meeting Schedule" 
                value={displayData.marketing.totalMeetingSchedule}
                subValues={[
                  { label: 'Total', value: displayData.marketing.totalMeetingSchedule },
                  { label: 'Success', value: displayData.marketing.meetingSuccess },
                ]}
                category="marketing"
                note={viewMode === 'weekly' ? getNoteForField(selectedWeek, 'marketing', 'Total Meeting Schedule') : undefined}
              />
              <MetricRow 
                label="New Account Introduction" 
                value={displayData.marketing.newAccountIntroductionTotal + displayData.marketing.newAccountIntroductionSuccess}
                subValues={[
                  { label: 'Total', value: displayData.marketing.newAccountIntroductionTotal },
                  { label: 'Success', value: displayData.marketing.newAccountIntroductionSuccess },
                ]}
                category="marketing"
                note={viewMode === 'weekly' ? getNoteForField(selectedWeek, 'marketing', 'New Account Introduction') : undefined}
              />
              <MetricRow 
                label="Client Reachout" 
                value={displayData.marketing.clientReachoutPositive + displayData.marketing.clientReachoutNegative}
                subValues={[
                  { label: 'Positive Reply', value: displayData.marketing.clientReachoutPositive },
                  { label: 'Negative Reply', value: displayData.marketing.clientReachoutNegative },
                ]}
                category="marketing"
                note={viewMode === 'weekly' ? getNoteForField(selectedWeek, 'marketing', 'Client Reachout') : undefined}
              />
              <MetricRow 
                label="Kanbox" 
                value={displayData.marketing.kanboxPositive + displayData.marketing.kanboxNegative}
                subValues={[
                  { label: 'Positive', value: displayData.marketing.kanboxPositive },
                  { label: 'Negative', value: displayData.marketing.kanboxNegative },
                ]}
                category="marketing"
                note={viewMode === 'weekly' ? getNoteForField(selectedWeek, 'marketing', 'Kanbox') : undefined}
              />
            </SectionCard>

            <SectionCard title="Client" category="client" badge={clientTotal} defaultOpen={false}>
              <MetricRow 
                label="Get Requirement" 
                value={displayData.client.requirementNew + displayData.client.requirementOld}
                subValues={[
                  { label: 'New', value: displayData.client.requirementNew },
                  { label: 'Old', value: displayData.client.requirementOld },
                ]}
                category="client"
                note={viewMode === 'weekly' ? getNoteForField(selectedWeek, 'client', 'Get Requirement') : undefined}
              />
              <MetricRow 
                label="Submit Profiles to Clients" 
                value={displayData.client.submitProfiles} 
                category="client"
                note={viewMode === 'weekly' ? getNoteForField(selectedWeek, 'client', 'Submit Profiles to Clients') : undefined}
              />
              <MetricRow 
                label="Schedule Interview" 
                value={displayData.client.scheduleInterview} 
                category="client"
                note={viewMode === 'weekly' ? getNoteForField(selectedWeek, 'client', 'Schedule Interview') : undefined}
              />
              <MetricRow 
                label="Start Contract" 
                value={displayData.client.startContract} 
                category="client"
                note={viewMode === 'weekly' ? getNoteForField(selectedWeek, 'client', 'Start Contract') : undefined}
              />
            </SectionCard>

            <SectionCard title="Resource" category="resource" badge={resourceTotal} defaultOpen={false}>
              <MetricRow 
                label="Resource Reachout (Krisha)" 
                value={displayData.resource.totalReachout}
                subValues={[
                  { label: 'Total Reachout', value: displayData.resource.totalReachout },
                  { label: 'Register on LiveD365', value: displayData.resource.registerOnLiveD365 },
                ]}
                category="resource"
                note={viewMode === 'weekly' ? getNoteForField(selectedWeek, 'resource', 'Resource Reachout (Krisha)') : undefined}
              />
              <MetricRow 
                label="Inquiry Post - LinkedIn (Krisha)" 
                value={displayData.resource.inquiryPostLinkedIn} 
                category="resource"
                note={viewMode === 'weekly' ? getNoteForField(selectedWeek, 'resource', 'Inquiry Post - LinkedIn (Krisha)') : undefined}
              />
              <MetricRow 
                label="Submit Profiles by Krishna" 
                value={displayData.resource.submitProfilesByKrishna} 
                category="resource"
                note={viewMode === 'weekly' ? getNoteForField(selectedWeek, 'resource', 'Submit Profiles by Krishna') : undefined}
              />
            </SectionCard>

            <SectionCard title="Mod" category="mod" badge={modTotal} defaultOpen={false}>
              <MetricRow 
                label="Partner Registration" 
                value={displayData.mod.partnerRegistration} 
                category="mod"
                note={viewMode === 'weekly' ? getNoteForField(selectedWeek, 'mod', 'Partner Registration') : undefined}
              />
              <MetricRow 
                label="Client Registration" 
                value={displayData.mod.clientRegistration} 
                category="mod"
                note={viewMode === 'weekly' ? getNoteForField(selectedWeek, 'mod', 'Client Registration') : undefined}
              />
            </SectionCard>
          </div>
          <div className="space-y-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xs font-semibold text-foreground">{viewMode === 'weekly' ? 'Week Notes' : 'Notes Explorer'}</h3>
                  <p className="text-3xs text-muted-foreground">
                    {viewMode === 'weekly' ? formatWeekLabel(selectedWeek) : 'All recorded notes'}
                  </p>
                </div>
                <span className="text-3xs text-muted-foreground">
                  {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
                </span>
              </div>
              <div className="relative">
                <Search className="absolute inset-y-0 left-3 my-auto h-3 w-3 text-muted-foreground" />
                <Input
                  value={notesQuery}
                  onChange={(event) => setNotesQuery(event.target.value)}
                  className="pl-9 h-8 text-2xs"
                  placeholder={viewMode === 'weekly' ? 'Search this week notes' : 'Search all notes'}
                />
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-2 space-y-1">
              {filteredNotes.length > 0 ? (
                <div className="space-y-0.5 max-h-48 overflow-y-auto pr-1">
                  {filteredNotes.map((note) => (
                    <div key={note.id} className="p-1.5 bg-accent/40 rounded border border-border/50 space-y-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="inline-flex items-center text-3xs font-semibold uppercase tracking-wide px-1 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                          {note.category}
                        </span>
                        <span className="text-2xs text-muted-foreground">{format(parseISO(note.createdAt), 'MMM d, h:mm a')}</span>
                      </div>
                      <div>
                        <p className="text-3xs text-muted-foreground font-medium mb-0">{note.field}</p>
                        <p className="text-2xs text-foreground leading-tight line-clamp-2">{note.text}</p>
                      </div>
                      <div className="flex items-center gap-1 text-2xs text-muted-foreground">
                        <Calendar className="h-2.5 w-2.5" />
                        <span className="text-2xs">{note.weekStart} — {note.weekEnd}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-2xs text-muted-foreground italic">No notes added</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}