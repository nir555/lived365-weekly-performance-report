import { useState, useMemo } from 'react';
import { Mail, Calendar, FileText, UserPlus, TrendingUp, Target, Handshake, Building2, BookUser, ChevronLeft, ChevronRight, CalendarDays, BarChart3 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { WeekSelector } from '@/components/dashboard/WeekSelector';
import { KPICard } from '@/components/dashboard/KPICard';
import { SectionCard } from '@/components/dashboard/SectionCard';
import { MetricRow } from '@/components/dashboard/MetricRow';
import { NotesSearch } from '@/components/dashboard/NotesSearch';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { getWeeksForMonth, getCurrentWeek } from '@/lib/weekUtils';
import { getWeeklyData, getWeeklyDataByWeek, getNotesForWeek, getNoteForField } from '@/lib/storage';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

export default function Dashboard() {
  const [monthOffset, setMonthOffset] = useState(0);
  const weeks = useMemo(() => getWeeksForMonth(monthOffset, true), [monthOffset]);
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek().value);
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
  
  const currentMonth = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    return format(date, 'MMMM yyyy');
  }, [monthOffset]);
  
  const allData = useMemo(() => getWeeklyData(), []);
  const weekData = useMemo(() => getWeeklyDataByWeek(selectedWeek), [selectedWeek]);
  const weekNotes = useMemo(() => getNotesForWeek(selectedWeek), [selectedWeek]);

  // Get data filtered by selected month for charts
  const monthFilteredData = useMemo(() => {
    if (viewMode === 'weekly') {
      return allData;
    }
    
    // For monthly view, filter all data to only include weeks from selected month
    const monthWeekValues = weeks.map(w => w.value);
    return allData.filter(item => monthWeekValues.includes(item.weekStart));
  }, [allData, weeks, viewMode]);

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
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-x-hidden">
      <Header />
      
      <main className="w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 md:gap-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2 md:gap-4 mb-3">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow flex-shrink-0">
                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent truncate">Performance Dashboard</h1>
            </div>
            <p className="text-muted-foreground ml-12 md:ml-16 text-sm md:text-base">Track your team's weekly metrics and achievements</p>
          </div>
          
          <div className="flex flex-row items-center flex-wrap gap-2 md:gap-3">
              <div className="flex items-center gap-2 bg-card rounded-lg border border-border p-1">
              <button
                onClick={() => setMonthOffset(monthOffset - 1)}
                className="p-2 hover:bg-accent rounded-md transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium px-3 whitespace-nowrap">{currentMonth}</span>
              <button
                onClick={() => setMonthOffset(monthOffset + 1)}
                disabled={monthOffset > 0}
                className="p-2 hover:bg-accent rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'weekly' | 'monthly')}>
              <TabsList className="h-9 bg-muted/50 rounded-xl p-1">
                <TabsTrigger value="weekly" className="rounded-lg text-xs sm:text-sm px-3 sm:px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm gap-1.5 flex items-center">
                  <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Weekly
                </TabsTrigger>
                <TabsTrigger value="monthly" className="rounded-lg text-xs sm:text-sm px-3 sm:px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm gap-1.5 flex items-center">
                  <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Monthly
                </TabsTrigger>
              </TabsList>
            </Tabs>
            {viewMode === 'weekly' && (
              <WeekSelector 
                selectedWeek={selectedWeek} 
                onWeekChange={setSelectedWeek} 
                weeks={weeks}
              />
            )}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          <KPICard 
            label="Emails Sent" 
            value={displayData.marketing.emailsSent} 
            icon={Mail} 
            category="marketing"
            delay={0}
          />
          <KPICard 
            label="Meetings Scheduled" 
            value={displayData.marketing.totalMeetingSchedule} 
            icon={Calendar} 
            category="marketing"
            delay={50}
          />
          <KPICard 
            label="Profiles Submitted" 
            value={displayData.client.submitProfiles} 
            icon={FileText} 
            category="client"
            delay={100}
          />
          <KPICard 
            label="LiveD Registrations" 
            value={displayData.resource.registerOnLiveD365} 
            icon={UserPlus} 
            category="resource"
            delay={150}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <PerformanceChart data={monthFilteredData} type="pie" />
          <PerformanceChart data={monthFilteredData} type="line" />
        </div>

        {/* Main Grid - Metrics & Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Category Sections */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            <SectionCard title="Marketing" category="marketing" icon={Target} badge={marketingTotal} defaultOpen={false}>
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

            <SectionCard title="Client" category="client" icon={Handshake} badge={clientTotal} defaultOpen={false}>
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

            <SectionCard title="Resource" category="resource" icon={BookUser} badge={resourceTotal} defaultOpen={false}>
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

            <SectionCard title="Mod" category="mod" icon={Building2} badge={modTotal} defaultOpen={false}>
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

          {/* Right Column - Notes */}
          <div>
            {viewMode === 'weekly' ? (
              <div className="bg-card rounded-lg border border-border p-4 md:p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Notes for this week</h3>
                {weekNotes.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {weekNotes.map((note) => (
                      <div key={note.id} className="p-3 bg-accent/50 rounded-lg border border-border/50">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-primary/20 text-primary">
                              {note.category}
                            </span>
                            <span className="text-xs text-muted-foreground">{note.field}</span>
                          </div>
                        </div>
                        <p className="text-sm text-foreground">{note.text}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(note.createdAt).toLocaleDateString()} {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No notes added for this week yet</p>
                )}
              </div>
            ) : (
              <NotesSearch />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}