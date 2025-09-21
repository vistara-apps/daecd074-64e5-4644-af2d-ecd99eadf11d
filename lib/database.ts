import { User, GeneratedTip } from './types';
import fs from 'fs';
import path from 'path';

// Simple file-based storage for development
// In production, this should be replaced with a proper database
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const TIPS_FILE = path.join(DATA_DIR, 'tips.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize empty data files if they don't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

if (!fs.existsSync(TIPS_FILE)) {
  fs.writeFileSync(TIPS_FILE, JSON.stringify([]));
}

// User management functions
export async function getUserByFarcasterId(farcasterId: string): Promise<User | null> {
  try {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as User[];
    return users.find(user => user.farcasterId === farcasterId) || null;
  } catch (error) {
    console.error('Error reading users:', error);
    return null;
  }
}

export async function createUser(farcasterId: string): Promise<User> {
  const newUser: User = {
    userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    farcasterId,
    creationDate: new Date(),
    subscriptionStatus: 'free',
  };

  try {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as User[];
    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

export async function updateUserSubscription(userId: string, status: 'free' | 'premium'): Promise<void> {
  try {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as User[];
    const userIndex = users.findIndex(user => user.userId === userId);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex].subscriptionStatus = status;
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error updating user subscription:', error);
    throw new Error('Failed to update subscription');
  }
}

// Generated tips management functions
export async function saveGeneratedTip(tip: Omit<GeneratedTip, 'tipId' | 'creationDate'>): Promise<GeneratedTip> {
  const newTip: GeneratedTip = {
    ...tip,
    tipId: `tip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    creationDate: new Date(),
  };

  try {
    const tips = JSON.parse(fs.readFileSync(TIPS_FILE, 'utf-8')) as GeneratedTip[];
    tips.push(newTip);
    fs.writeFileSync(TIPS_FILE, JSON.stringify(tips, null, 2));
    return newTip;
  } catch (error) {
    console.error('Error saving tip:', error);
    throw new Error('Failed to save tip');
  }
}

export async function getUserTips(userId: string, limit: number = 50): Promise<GeneratedTip[]> {
  try {
    const tips = JSON.parse(fs.readFileSync(TIPS_FILE, 'utf-8')) as GeneratedTip[];
    return tips
      .filter(tip => tip.userId === userId)
      .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Error reading user tips:', error);
    return [];
  }
}

export async function getUserTipCount(userId: string): Promise<number> {
  try {
    const tips = JSON.parse(fs.readFileSync(TIPS_FILE, 'utf-8')) as GeneratedTip[];
    return tips.filter(tip => tip.userId === userId).length;
  } catch (error) {
    console.error('Error counting user tips:', error);
    return 0;
  }
}

// Analytics functions
export async function getTotalUsers(): Promise<number> {
  try {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8')) as User[];
    return users.length;
  } catch (error) {
    console.error('Error counting users:', error);
    return 0;
  }
}

export async function getTotalTips(): Promise<number> {
  try {
    const tips = JSON.parse(fs.readFileSync(TIPS_FILE, 'utf-8')) as GeneratedTip[];
    return tips.length;
  } catch (error) {
    console.error('Error counting tips:', error);
    return 0;
  }
}

export async function getTipsByType(): Promise<Record<string, number>> {
  try {
    const tips = JSON.parse(fs.readFileSync(TIPS_FILE, 'utf-8')) as GeneratedTip[];
    const stats: Record<string, number> = {};

    tips.forEach(tip => {
      stats[tip.tipType] = (stats[tip.tipType] || 0) + 1;
    });

    return stats;
  } catch (error) {
    console.error('Error getting tip statistics:', error);
    return {};
  }
}

