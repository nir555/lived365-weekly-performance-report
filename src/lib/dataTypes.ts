export interface MarketingData {
  emailsSent: number;
  positiveReplies: number;
  negativeReplies: number;
  totalMeetingSchedule: number;
  meetingSuccess: number;
  newAccountIntroductionTotal: number;
  newAccountIntroductionSuccess: number;
  clientReachout: number;
  clientReachoutPositive: number;
  clientReachoutNegative: number;
  kanboxPositive: number;
  kanboxNegative: number;
}

export interface ClientData {
  requirementNew: number;
  requirementOld: number;
  submitProfiles: number;
  scheduleInterview: number;
  startContract: number;
}

export interface ResourceData {
  totalReachout: number;
  registerOnLiveD365: number;
  inquiryPostLinkedIn: number;
  submitProfilesByKrishna: number;
}

export interface ModData {
  partnerRegistration: number;
  clientRegistration: number;
}

export interface WeeklyData {
  weekStart: string;
  weekEnd: string;
  marketing: MarketingData;
  client: ClientData;
  resource: ResourceData;
  mod: ModData;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  category: 'marketing' | 'client' | 'resource' | 'mod';
  field: string;
  weekStart: string;
  weekEnd: string;
  text: string;
  createdAt: string;
}

export const emptyMarketingData: MarketingData = {
  emailsSent: 0,
  positiveReplies: 0,
  negativeReplies: 0,
  totalMeetingSchedule: 0,
  meetingSuccess: 0,
  newAccountIntroductionTotal: 0,
  newAccountIntroductionSuccess: 0,
  clientReachout: 0,
  clientReachoutPositive: 0,
  clientReachoutNegative: 0,
  kanboxPositive: 0,
  kanboxNegative: 0,
};

export const emptyClientData: ClientData = {
  requirementNew: 0,
  requirementOld: 0,
  submitProfiles: 0,
  scheduleInterview: 0,
  startContract: 0,
};

export const emptyResourceData: ResourceData = {
  totalReachout: 0,
  registerOnLiveD365: 0,
  inquiryPostLinkedIn: 0,
  submitProfilesByKrishna: 0,
};

export const emptyModData: ModData = {
  partnerRegistration: 0,
  clientRegistration: 0,
};

export function createEmptyWeeklyData(weekStart: string, weekEnd: string): WeeklyData {
  const now = new Date().toISOString();
  return {
    weekStart,
    weekEnd,
    marketing: { ...emptyMarketingData },
    client: { ...emptyClientData },
    resource: { ...emptyResourceData },
    mod: { ...emptyModData },
    createdAt: now,
    updatedAt: now,
  };
}
