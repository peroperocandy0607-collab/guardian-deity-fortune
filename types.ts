export interface UserInput {
  birthDate: string;
  birthTime: string; // Optional, can be empty
  gender: 'male' | 'female' | 'other';
  name: string;
}

export interface TimelineEvent {
  period: string; // e.g., "幼少期 (0〜15歳)"
  description: string;
}

export interface FortuneResult {
  deityName: string;
  deityTitle: string;
  deityDescription: string;
  deityVisualDescription: string;
  deityImage?: string; // Base64 image string
  essence: string;
  love: string;
  work: string;
  destiny: string; // General destiny text
  timeline: TimelineEvent[]; // Specific timeline breakdown
  luckyColor: string;
  guardianItem: string;
  soulConnection: string;
}

export interface LoadingState {
  isLoading: boolean;
  message: string;
}
