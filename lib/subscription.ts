import { User, SubscriptionLimits, GeneratedTip } from './types';
import { getUserTips, getUserTipCount } from './database';

export const SUBSCRIPTION_LIMITS: SubscriptionLimits = {
  free: {
    captionsPerDay: 5,
    hashtagsPerDay: 3,
    schedulesPerDay: 2,
  },
  premium: {
    captionsPerDay: 50,
    hashtagsPerDay: 25,
    schedulesPerDay: 10,
  },
};

export async function checkUserLimits(user: User, tipType: 'caption' | 'hashtags' | 'schedule'): Promise<{
  canUse: boolean;
  remaining: number;
  limit: number;
  upgradeRequired: boolean;
}> {
  const limits = SUBSCRIPTION_LIMITS[user.subscriptionStatus];
  const limitKey = tipType === 'caption' ? 'captionsPerDay' :
                   tipType === 'hashtags' ? 'hashtagsPerDay' : 'schedulesPerDay';

  const limit = limits[limitKey];

  // Get today's tips for this user and type
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const userTips = await getUserTips(user.userId, 100); // Get recent tips
  const todaysTips = userTips.filter(tip => {
    const tipDate = new Date(tip.creationDate);
    tipDate.setHours(0, 0, 0, 0);
    return tipDate.getTime() === today.getTime() && tip.tipType === tipType;
  });

  const used = todaysTips.length;
  const remaining = Math.max(0, limit - used);
  const canUse = remaining > 0;

  return {
    canUse,
    remaining,
    limit,
    upgradeRequired: !canUse && user.subscriptionStatus === 'free',
  };
}

export function getSubscriptionBenefits(): {
  free: string[];
  premium: string[];
} {
  return {
    free: [
      '5 captions per day',
      '3 hashtag suggestions per day',
      '2 schedule recommendations per day',
      'Basic AI-powered tips',
    ],
    premium: [
      '50 captions per day',
      '25 hashtag suggestions per day',
      '10 schedule recommendations per day',
      'Advanced AI customization',
      'Priority support',
      'Export and save tips',
    ],
  };
}

export function calculateUpgradePrice(): {
  monthly: number;
  yearly: number;
  currency: string;
} {
  return {
    monthly: 4.99,
    yearly: 39.99,
    currency: 'USD',
  };
}

export async function trackTipUsage(userId: string, tipType: 'caption' | 'hashtags' | 'schedule'): Promise<void> {
  // This would typically send to an analytics service
  // For now, we'll just log it
  console.log(`User ${userId} used ${tipType} feature`);
}

