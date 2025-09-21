export interface User {
  userId: string;
  farcasterId: string;
  creationDate: Date;
  subscriptionStatus: 'free' | 'premium';
  tipCount: number;
  lastActivity: Date;
}

export interface GeneratedTip {
  tipId: string;
  userId: string;
  tipType: 'caption' | 'hashtags' | 'schedule';
  content: string;
  creationDate: Date;
  platform: string;
  metadata?: Record<string, any>; // Additional data like request parameters
}

export interface CaptionRequest {
  theme: string;
  platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin';
  tone: 'casual' | 'professional' | 'funny' | 'inspirational';
}

export interface HashtagRequest {
  niche: string;
  platform: 'instagram' | 'twitter' | 'linkedin' | 'tiktok';
}

export interface ScheduleRequest {
  platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin' | 'tiktok';
  timezone: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SubscriptionLimits {
  free: {
    captionsPerDay: number;
    hashtagsPerDay: number;
    schedulesPerDay: number;
  };
  premium: {
    captionsPerDay: number;
    hashtagsPerDay: number;
    schedulesPerDay: number;
  };
}

export interface AnalyticsEvent {
  eventId: string;
  userId: string;
  eventType: 'tip_generated' | 'subscription_upgraded' | 'feature_used';
  eventData: Record<string, any>;
  timestamp: Date;
}
