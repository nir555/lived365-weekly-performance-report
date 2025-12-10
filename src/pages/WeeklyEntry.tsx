import { useState, useMemo, useEffect } from 'react';
import { Save, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { WeekSelector } from '@/components/dashboard/WeekSelector';
import { EntrySectionCard } from '@/components/entry/EntrySectionCard';
import { MetricInput } from '@/components/entry/MetricInput';
import { Button } from '@/components/ui/button';
import { getWeeksForMonth, getCurrentWeek, formatWeekLabel } from '@/lib/weekUtils';
import { getWeeklyDataByWeek, saveWeeklyData, saveNote, getNoteForField } from '@/lib/storage';
import { WeeklyData, createEmptyWeeklyData } from '@/lib/dataTypes';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO, addDays } from 'date-fns';

export default function WeeklyEntry() {
  const { toast } = useToast();
  const [monthOffset, setMonthOffset] = useState(0);
  const weeks = useMemo(() => getWeeksForMonth(monthOffset, true), [monthOffset]);
  const currentWeek = useMemo(() => getCurrentWeek().value, []);
  const [selectedWeek, setSelectedWeek] = useState<string>(currentWeek);
  const [isSaving, setIsSaving] = useState(false);
  
  const currentMonth = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    return format(date, 'MMMM yyyy');
  }, [monthOffset]);
  
  const weekEnd = useMemo(() => {
    const start = parseISO(selectedWeek);
    return format(addDays(start, 4), 'yyyy-MM-dd');
  }, [selectedWeek]);

  const [formData, setFormData] = useState<WeeklyData>(() => {
    const existing = getWeeklyDataByWeek(selectedWeek);
    return existing || createEmptyWeeklyData(selectedWeek, weekEnd);
  });

  useEffect(() => {
    const existing = getWeeklyDataByWeek(selectedWeek);
    setFormData(existing || createEmptyWeeklyData(selectedWeek, weekEnd));
  }, [selectedWeek, weekEnd]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      saveWeeklyData({
        ...formData,
        weekStart: selectedWeek,
        weekEnd,
      });
      toast({
        title: "Data Saved",
        description: `Weekly data for ${formatWeekLabel(selectedWeek)} has been saved.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save data. Please try again.",
        variant: "destructive",
      });
    }
    setIsSaving(false);
  };

  const handleAddNote = (category: 'marketing' | 'client' | 'resource' | 'mod', field: string) => (text: string) => {
    saveNote({
      category,
      field,
      weekStart: selectedWeek,
      weekEnd,
      text,
    });
    toast({
      title: "Note Added",
      description: "Your note has been saved.",
    });
  };

  const updateMarketing = (key: keyof typeof formData.marketing, value: number) => {
    setFormData(prev => ({
      ...prev,
      marketing: { ...prev.marketing, [key]: value },
    }));
  };

  const updateClient = (key: keyof typeof formData.client, value: number) => {
    setFormData(prev => ({
      ...prev,
      client: { ...prev.client, [key]: value },
    }));
  };

  const updateResource = (key: keyof typeof formData.resource, value: number) => {
    setFormData(prev => ({
      ...prev,
      resource: { ...prev.resource, [key]: value },
    }));
  };

  const updateMod = (key: keyof typeof formData.mod, value: number) => {
    setFormData(prev => ({
      ...prev,
      mod: { ...prev.mod, [key]: value },
    }));
  };

  return (
    <div className="min-h-screen w-screen bg-background overflow-x-hidden">
      <Header />
      
      <main className="w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Weekly Data Entry</h1>
            <p className="text-muted-foreground mt-1">Enter your team's performance metrics</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 bg-card rounded-lg border border-border p-1 w-full sm:w-auto">
              <button
                onClick={() => setMonthOffset(monthOffset - 1)}
                className="p-2 hover:bg-accent rounded-md transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium px-3 whitespace-nowrap flex-1 sm:flex-none text-center">{currentMonth}</span>
              <button
                onClick={() => setMonthOffset(monthOffset + 1)}
                disabled={monthOffset > 0}
                className="p-2 hover:bg-accent rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <WeekSelector 
              selectedWeek={selectedWeek} 
              onWeekChange={setSelectedWeek} 
              weeks={weeks}
            />
            <Button onClick={handleSave} disabled={isSaving} className="gap-2 w-full sm:w-auto">
              {isSaving ? (
                <CheckCircle className="h-4 w-4 animate-pulse" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Data
            </Button>
          </div>
        </div>

        {/* Selected Week Display */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
          <p className="text-sm text-muted-foreground">Currently editing:</p>
          <p className="text-lg font-semibold text-foreground">{formatWeekLabel(selectedWeek)}</p>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          {/* Marketing Section */}
          <EntrySectionCard title="Marketing" category="marketing">
            <MetricInput
              label="Marketing Email Sent"
              value={formData.marketing.emailsSent}
              onChange={(v) => updateMarketing('emailsSent', v)}
              onAddNote={handleAddNote('marketing', 'Marketing Email Sent')}
              note={getNoteForField(selectedWeek, 'marketing', 'Marketing Email Sent')}
              subFields={[
                { key: 'positive', label: 'Positive Reply', value: formData.marketing.positiveReplies, onChange: (v) => updateMarketing('positiveReplies', v) },
                { key: 'negative', label: 'Negative Reply', value: formData.marketing.negativeReplies, onChange: (v) => updateMarketing('negativeReplies', v) },
              ]}
            />
            <MetricInput
              label="Total Meeting Schedule"
              value={formData.marketing.totalMeetingSchedule}
              onChange={(v) => updateMarketing('totalMeetingSchedule', v)}
              onAddNote={handleAddNote('marketing', 'Total Meeting Schedule')}
              note={getNoteForField(selectedWeek, 'marketing', 'Total Meeting Schedule')}
              subFields={[
                { key: 'success', label: 'Success', value: formData.marketing.meetingSuccess, onChange: (v) => updateMarketing('meetingSuccess', v) },
              ]}
            />
            <MetricInput
              label="New Account Introduction"
              showMainInput={false}
              computedTotal={formData.marketing.newAccountIntroductionTotal + formData.marketing.newAccountIntroductionSuccess}
              onAddNote={handleAddNote('marketing', 'New Account Introduction')}
              note={getNoteForField(selectedWeek, 'marketing', 'New Account Introduction')}
              subFields={[
                { key: 'total', label: 'Total', value: formData.marketing.newAccountIntroductionTotal, onChange: (v) => updateMarketing('newAccountIntroductionTotal', v) },
                { key: 'success', label: 'Success', value: formData.marketing.newAccountIntroductionSuccess, onChange: (v) => updateMarketing('newAccountIntroductionSuccess', v) },
              ]}
            />
            <MetricInput
              label="Client Reachout"
              showMainInput={false}
              computedTotal={formData.marketing.clientReachoutPositive + formData.marketing.clientReachoutNegative}
              onAddNote={handleAddNote('marketing', 'Client Reachout')}
              note={getNoteForField(selectedWeek, 'marketing', 'Client Reachout')}
              subFields={[
                { key: 'positive', label: 'Positive Reply', value: formData.marketing.clientReachoutPositive, onChange: (v) => updateMarketing('clientReachoutPositive', v) },
                { key: 'negative', label: 'Negative Reply', value: formData.marketing.clientReachoutNegative, onChange: (v) => updateMarketing('clientReachoutNegative', v) },
              ]}
            />
            <MetricInput
              label="Kanbox"
              showMainInput={false}
              computedTotal={formData.marketing.kanboxPositive + formData.marketing.kanboxNegative}
              onAddNote={handleAddNote('marketing', 'Kanbox')}
              note={getNoteForField(selectedWeek, 'marketing', 'Kanbox')}
              subFields={[
                { key: 'positive', label: 'Positive', value: formData.marketing.kanboxPositive, onChange: (v) => updateMarketing('kanboxPositive', v) },
                { key: 'negative', label: 'Negative', value: formData.marketing.kanboxNegative, onChange: (v) => updateMarketing('kanboxNegative', v) },
              ]}
            />
          </EntrySectionCard>

          {/* Client Section */}
          <EntrySectionCard title="Client" category="client">
            <MetricInput
              label="Get Requirement"
              showMainInput={false}
              computedTotal={formData.client.requirementNew + formData.client.requirementOld}
              onAddNote={handleAddNote('client', 'Get Requirement')}
              note={getNoteForField(selectedWeek, 'client', 'Get Requirement')}
              subFields={[
                { key: 'new', label: 'New', value: formData.client.requirementNew, onChange: (v) => updateClient('requirementNew', v) },
                { key: 'old', label: 'Old', value: formData.client.requirementOld, onChange: (v) => updateClient('requirementOld', v) },
              ]}
            />
            <MetricInput
              label="Submit Profiles to Clients"
              value={formData.client.submitProfiles}
              onChange={(v) => updateClient('submitProfiles', v)}
              onAddNote={handleAddNote('client', 'Submit Profiles to Clients')}
              note={getNoteForField(selectedWeek, 'client', 'Submit Profiles to Clients')}
            />
            <MetricInput
              label="Schedule Interview"
              value={formData.client.scheduleInterview}
              onChange={(v) => updateClient('scheduleInterview', v)}
              onAddNote={handleAddNote('client', 'Schedule Interview')}
              note={getNoteForField(selectedWeek, 'client', 'Schedule Interview')}
            />
            <MetricInput
              label="Start Contract"
              value={formData.client.startContract}
              onChange={(v) => updateClient('startContract', v)}
              onAddNote={handleAddNote('client', 'Start Contract')}
              note={getNoteForField(selectedWeek, 'client', 'Start Contract')}
            />
          </EntrySectionCard>

          {/* Resource Section */}
          <EntrySectionCard title="Resource" category="resource">
            <MetricInput
              label="Resource Reachout (Krisha)"
              showMainInput={false}
              computedTotal={formData.resource.totalReachout + formData.resource.registerOnLiveD365}
              onAddNote={handleAddNote('resource', 'Resource Reachout (Krisha)')}
              note={getNoteForField(selectedWeek, 'resource', 'Resource Reachout (Krisha)')}
              subFields={[
                { key: 'total', label: 'Total Reachout', value: formData.resource.totalReachout, onChange: (v) => updateResource('totalReachout', v) },
                { key: 'register', label: 'Register on LiveD365', value: formData.resource.registerOnLiveD365, onChange: (v) => updateResource('registerOnLiveD365', v) },
              ]}
            />
            <MetricInput
              label="Inquiry Post - LinkedIn (Krisha)"
              value={formData.resource.inquiryPostLinkedIn}
              onChange={(v) => updateResource('inquiryPostLinkedIn', v)}
              onAddNote={handleAddNote('resource', 'Inquiry Post - LinkedIn (Krisha)')}
              note={getNoteForField(selectedWeek, 'resource', 'Inquiry Post - LinkedIn (Krisha)')}
            />
            <MetricInput
              label="Submit Profiles by Krishna"
              value={formData.resource.submitProfilesByKrishna}
              onChange={(v) => updateResource('submitProfilesByKrishna', v)}
              onAddNote={handleAddNote('resource', 'Submit Profiles by Krishna')}
              note={getNoteForField(selectedWeek, 'resource', 'Submit Profiles by Krishna')}
            />
          </EntrySectionCard>

          {/* Mod Section */}
          <EntrySectionCard title="Mod" category="mod">
            <MetricInput
              label="Partner Registration"
              value={formData.mod.partnerRegistration}
              onChange={(v) => updateMod('partnerRegistration', v)}
              onAddNote={handleAddNote('mod', 'Partner Registration')}
              note={getNoteForField(selectedWeek, 'mod', 'Partner Registration')}
            />
            <MetricInput
              label="Client Registration"
              value={formData.mod.clientRegistration}
              onChange={(v) => updateMod('clientRegistration', v)}
              onAddNote={handleAddNote('mod', 'Client Registration')}
              note={getNoteForField(selectedWeek, 'mod', 'Client Registration')}
            />
          </EntrySectionCard>
        </div>
      </main>
    </div>
  );
}
