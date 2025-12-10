import { WeeklyData, Note, createEmptyWeeklyData } from './dataTypes';

const WEEKLY_DATA_KEY = 'lived365_weekly_data';
const NOTES_KEY = 'lived365_notes';

// Sample data for demonstration
const sampleData: WeeklyData[] = [
  {
    weekStart: '2025-10-06',
    weekEnd: '2025-10-10',
    marketing: {
      emailsSent: 45000,
      positiveReplies: 5,
      negativeReplies: 3,
      totalMeetingSchedule: 2,
      meetingSuccess: 1,
      newAccountIntroductionTotal: 2,
      newAccountIntroductionSuccess: 1,
      clientReachout: 320,
      clientReachoutPositive: 4,
      clientReachoutNegative: 2,
      kanboxPositive: 3,
      kanboxNegative: 1,
    },
    client: {
      requirementNew: 2,
      requirementOld: 3,
      submitProfiles: 4,
      scheduleInterview: 3,
      startContract: 1,
    },
    resource: {
      totalReachout: 12,
      registerOnLiveD365: 42,
      inquiryPostLinkedIn: 3,
      submitProfilesByKrishna: 6,
    },
    mod: {
      partnerRegistration: 2,
      clientRegistration: 2,
    },
    createdAt: '2025-10-10T10:00:00Z',
    updatedAt: '2025-10-10T10:00:00Z',
  },
  {
    weekStart: '2025-10-13',
    weekEnd: '2025-10-17',
    marketing: {
      emailsSent: 52000,
      positiveReplies: 7,
      negativeReplies: 4,
      totalMeetingSchedule: 3,
      meetingSuccess: 2,
      newAccountIntroductionTotal: 3,
      newAccountIntroductionSuccess: 2,
      clientReachout: 380,
      clientReachoutPositive: 5,
      clientReachoutNegative: 3,
      kanboxPositive: 4,
      kanboxNegative: 2,
    },
    client: {
      requirementNew: 3,
      requirementOld: 2,
      submitProfiles: 5,
      scheduleInterview: 4,
      startContract: 2,
    },
    resource: {
      totalReachout: 15,
      registerOnLiveD365: 50,
      inquiryPostLinkedIn: 4,
      submitProfilesByKrishna: 8,
    },
    mod: {
      partnerRegistration: 3,
      clientRegistration: 1,
    },
    createdAt: '2025-10-17T10:00:00Z',
    updatedAt: '2025-10-17T10:00:00Z',
  },
  {
    weekStart: '2025-10-20',
    weekEnd: '2025-10-24',
    marketing: {
      emailsSent: 48000,
      positiveReplies: 6,
      negativeReplies: 3,
      totalMeetingSchedule: 2,
      meetingSuccess: 1,
      newAccountIntroductionTotal: 2,
      newAccountIntroductionSuccess: 1,
      clientReachout: 350,
      clientReachoutPositive: 4,
      clientReachoutNegative: 2,
      kanboxPositive: 3,
      kanboxNegative: 1,
    },
    client: {
      requirementNew: 2,
      requirementOld: 4,
      submitProfiles: 3,
      scheduleInterview: 3,
      startContract: 1,
    },
    resource: {
      totalReachout: 13,
      registerOnLiveD365: 45,
      inquiryPostLinkedIn: 3,
      submitProfilesByKrishna: 7,
    },
    mod: {
      partnerRegistration: 1,
      clientRegistration: 2,
    },
    createdAt: '2025-10-24T10:00:00Z',
    updatedAt: '2025-10-24T10:00:00Z',
  },
  {
    weekStart: '2025-10-27',
    weekEnd: '2025-10-31',
    marketing: {
      emailsSent: 55000,
      positiveReplies: 8,
      negativeReplies: 4,
      totalMeetingSchedule: 4,
      meetingSuccess: 3,
      newAccountIntroductionTotal: 3,
      newAccountIntroductionSuccess: 2,
      clientReachout: 400,
      clientReachoutPositive: 6,
      clientReachoutNegative: 3,
      kanboxPositive: 5,
      kanboxNegative: 2,
    },
    client: {
      requirementNew: 4,
      requirementOld: 3,
      submitProfiles: 6,
      scheduleInterview: 5,
      startContract: 2,
    },
    resource: {
      totalReachout: 18,
      registerOnLiveD365: 55,
      inquiryPostLinkedIn: 5,
      submitProfilesByKrishna: 10,
    },
    mod: {
      partnerRegistration: 2,
      clientRegistration: 3,
    },
    createdAt: '2025-10-31T10:00:00Z',
    updatedAt: '2025-10-31T10:00:00Z',
  },
  {
    weekStart: '2025-11-03',
    weekEnd: '2025-11-07',
    marketing: {
      emailsSent: 50000,
      positiveReplies: 7,
      negativeReplies: 3,
      totalMeetingSchedule: 3,
      meetingSuccess: 2,
      newAccountIntroductionTotal: 2,
      newAccountIntroductionSuccess: 1,
      clientReachout: 360,
      clientReachoutPositive: 5,
      clientReachoutNegative: 2,
      kanboxPositive: 4,
      kanboxNegative: 1,
    },
    client: {
      requirementNew: 3,
      requirementOld: 2,
      submitProfiles: 4,
      scheduleInterview: 3,
      startContract: 1,
    },
    resource: {
      totalReachout: 14,
      registerOnLiveD365: 48,
      inquiryPostLinkedIn: 4,
      submitProfilesByKrishna: 8,
    },
    mod: {
      partnerRegistration: 2,
      clientRegistration: 1,
    },
    createdAt: '2025-11-07T10:00:00Z',
    updatedAt: '2025-11-07T10:00:00Z',
  },
  {
    weekStart: '2025-11-10',
    weekEnd: '2025-11-14',
    marketing: {
      emailsSent: 58000,
      positiveReplies: 9,
      negativeReplies: 5,
      totalMeetingSchedule: 4,
      meetingSuccess: 3,
      newAccountIntroductionTotal: 4,
      newAccountIntroductionSuccess: 3,
      clientReachout: 420,
      clientReachoutPositive: 7,
      clientReachoutNegative: 3,
      kanboxPositive: 6,
      kanboxNegative: 2,
    },
    client: {
      requirementNew: 5,
      requirementOld: 3,
      submitProfiles: 7,
      scheduleInterview: 5,
      startContract: 3,
    },
    resource: {
      totalReachout: 20,
      registerOnLiveD365: 60,
      inquiryPostLinkedIn: 6,
      submitProfilesByKrishna: 11,
    },
    mod: {
      partnerRegistration: 3,
      clientRegistration: 2,
    },
    createdAt: '2025-11-14T10:00:00Z',
    updatedAt: '2025-11-14T10:00:00Z',
  },
  {
    weekStart: '2025-11-17',
    weekEnd: '2025-11-21',
    marketing: {
      emailsSent: 54000,
      positiveReplies: 8,
      negativeReplies: 4,
      totalMeetingSchedule: 3,
      meetingSuccess: 2,
      newAccountIntroductionTotal: 3,
      newAccountIntroductionSuccess: 2,
      clientReachout: 390,
      clientReachoutPositive: 6,
      clientReachoutNegative: 2,
      kanboxPositive: 5,
      kanboxNegative: 2,
    },
    client: {
      requirementNew: 4,
      requirementOld: 2,
      submitProfiles: 5,
      scheduleInterview: 4,
      startContract: 2,
    },
    resource: {
      totalReachout: 16,
      registerOnLiveD365: 52,
      inquiryPostLinkedIn: 5,
      submitProfilesByKrishna: 9,
    },
    mod: {
      partnerRegistration: 2,
      clientRegistration: 2,
    },
    createdAt: '2025-11-21T10:00:00Z',
    updatedAt: '2025-11-21T10:00:00Z',
  },
  {
    weekStart: '2025-11-24',
    weekEnd: '2025-11-28',
    marketing: {
      emailsSent: 46000,
      positiveReplies: 6,
      negativeReplies: 3,
      totalMeetingSchedule: 2,
      meetingSuccess: 1,
      newAccountIntroductionTotal: 2,
      newAccountIntroductionSuccess: 1,
      clientReachout: 330,
      clientReachoutPositive: 4,
      clientReachoutNegative: 2,
      kanboxPositive: 3,
      kanboxNegative: 1,
    },
    client: {
      requirementNew: 2,
      requirementOld: 3,
      submitProfiles: 3,
      scheduleInterview: 2,
      startContract: 1,
    },
    resource: {
      totalReachout: 11,
      registerOnLiveD365: 40,
      inquiryPostLinkedIn: 3,
      submitProfilesByKrishna: 6,
    },
    mod: {
      partnerRegistration: 1,
      clientRegistration: 1,
    },
    createdAt: '2025-11-28T10:00:00Z',
    updatedAt: '2025-11-28T10:00:00Z',
  },
  {
    weekStart: '2025-12-01',
    weekEnd: '2025-12-05',
    marketing: {
      emailsSent: 52000,
      positiveReplies: 7,
      negativeReplies: 4,
      totalMeetingSchedule: 3,
      meetingSuccess: 2,
      newAccountIntroductionTotal: 3,
      newAccountIntroductionSuccess: 2,
      clientReachout: 370,
      clientReachoutPositive: 5,
      clientReachoutNegative: 3,
      kanboxPositive: 4,
      kanboxNegative: 2,
    },
    client: {
      requirementNew: 3,
      requirementOld: 3,
      submitProfiles: 4,
      scheduleInterview: 3,
      startContract: 1,
    },
    resource: {
      totalReachout: 15,
      registerOnLiveD365: 50,
      inquiryPostLinkedIn: 4,
      submitProfilesByKrishna: 8,
    },
    mod: {
      partnerRegistration: 2,
      clientRegistration: 2,
    },
    createdAt: '2025-12-05T10:00:00Z',
    updatedAt: '2025-12-05T10:00:00Z',
  },
];

export function getWeeklyData(): WeeklyData[] {
  const stored = localStorage.getItem(WEEKLY_DATA_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    // Return data if it has entries
    if (parsed && parsed.length > 0) {
      return parsed;
    }
  }
  // Initialize with sample data
  localStorage.setItem(WEEKLY_DATA_KEY, JSON.stringify(sampleData));
  return sampleData;
}

export function getWeeklyDataByWeek(weekStart: string): WeeklyData | null {
  const data = getWeeklyData();
  return data.find(d => d.weekStart === weekStart) || null;
}

export function saveWeeklyData(weeklyData: WeeklyData): void {
  const allData = getWeeklyData();
  const existingIndex = allData.findIndex(d => d.weekStart === weeklyData.weekStart);
  
  if (existingIndex >= 0) {
    allData[existingIndex] = { ...weeklyData, updatedAt: new Date().toISOString() };
  } else {
    allData.push(weeklyData);
  }
  
  localStorage.setItem(WEEKLY_DATA_KEY, JSON.stringify(allData));
}

export function getNotes(): Note[] {
  const stored = localStorage.getItem(NOTES_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}

export function saveNote(note: Omit<Note, 'id' | 'createdAt'>): Note {
  const notes = getNotes();
  const newNote: Note = {
    ...note,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  notes.push(newNote);
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  return newNote;
}

export function searchNotes(query: string): Note[] {
  const notes = getNotes();
  if (!query.trim()) return notes;
  
  const lowerQuery = query.toLowerCase();
  return notes.filter(note => 
    note.text.toLowerCase().includes(lowerQuery) ||
    note.category.toLowerCase().includes(lowerQuery) ||
    note.field.toLowerCase().includes(lowerQuery)
  );
}

export function getNotesForWeek(weekStart: string): Note[] {
  const notes = getNotes();
  return notes.filter(note => note.weekStart === weekStart);
}

export function getNoteForField(weekStart: string, category: string, field: string): string | undefined {
  const notes = getNotes();
  const note = notes.find(
    n => n.weekStart === weekStart && n.category === category && n.field === field
  );
  return note?.text;
}

export function getMonthlyAggregation(year: number, month: number): WeeklyData | null {
  const data = getWeeklyData();
  const monthData = data.filter(d => {
    const date = new Date(d.weekStart);
    return date.getFullYear() === year && date.getMonth() === month;
  });
  
  if (monthData.length === 0) return null;
  
  // Aggregate all weeks
  const aggregated = createEmptyWeeklyData(
    monthData[0].weekStart,
    monthData[monthData.length - 1].weekEnd
  );
  
  monthData.forEach(week => {
    // Marketing
    Object.keys(week.marketing).forEach(key => {
      (aggregated.marketing as any)[key] += (week.marketing as any)[key];
    });
    // Client
    Object.keys(week.client).forEach(key => {
      (aggregated.client as any)[key] += (week.client as any)[key];
    });
    // Resource
    Object.keys(week.resource).forEach(key => {
      (aggregated.resource as any)[key] += (week.resource as any)[key];
    });
    // Mod
    Object.keys(week.mod).forEach(key => {
      (aggregated.mod as any)[key] += (week.mod as any)[key];
    });
  });
  
  return aggregated;
}

// Reset data to sample data (useful for testing/demo)
export function resetToSampleData(): void {
  localStorage.setItem(WEEKLY_DATA_KEY, JSON.stringify(sampleData));
}
