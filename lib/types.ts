export interface User {
  userId: string;
  farcasterId: string;
  creationDate: Date;
  subscriptionStatus: 'free' | 'premium';
}

export interface GeneratedTip {
  tipId: string;
  userId: string;
  tipType: 'caption' | 'hashtags' | 'schedule';
  content: string;
  creationDate: Date;
  platform: string;
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
