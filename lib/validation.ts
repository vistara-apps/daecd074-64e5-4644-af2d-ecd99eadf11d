import { CaptionRequest, HashtagRequest, ScheduleRequest } from './types';

export function validateCaptionRequest(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.theme || typeof data.theme !== 'string' || data.theme.trim().length === 0) {
    errors.push('Theme is required and must be a non-empty string');
  }

  if (data.theme && data.theme.length > 500) {
    errors.push('Theme must be less than 500 characters');
  }

  const validPlatforms = ['instagram', 'twitter', 'facebook', 'linkedin'];
  if (!data.platform || !validPlatforms.includes(data.platform)) {
    errors.push('Platform must be one of: ' + validPlatforms.join(', '));
  }

  const validTones = ['casual', 'professional', 'funny', 'inspirational'];
  if (!data.tone || !validTones.includes(data.tone)) {
    errors.push('Tone must be one of: ' + validTones.join(', '));
  }

  if (!data.farcasterId || typeof data.farcasterId !== 'string') {
    errors.push('Farcaster ID is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateHashtagRequest(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.niche || typeof data.niche !== 'string' || data.niche.trim().length === 0) {
    errors.push('Niche is required and must be a non-empty string');
  }

  if (data.niche && data.niche.length > 100) {
    errors.push('Niche must be less than 100 characters');
  }

  const validPlatforms = ['instagram', 'twitter', 'linkedin', 'tiktok'];
  if (!data.platform || !validPlatforms.includes(data.platform)) {
    errors.push('Platform must be one of: ' + validPlatforms.join(', '));
  }

  if (!data.farcasterId || typeof data.farcasterId !== 'string') {
    errors.push('Farcaster ID is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateScheduleRequest(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const validPlatforms = ['instagram', 'twitter', 'facebook', 'linkedin', 'tiktok'];
  if (!data.platform || !validPlatforms.includes(data.platform)) {
    errors.push('Platform must be one of: ' + validPlatforms.join(', '));
  }

  if (!data.farcasterId || typeof data.farcasterId !== 'string') {
    errors.push('Farcaster ID is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function sanitizeInput(input: string): string {
  // Basic sanitization - remove potentially harmful characters
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
}

export function validateFarcasterId(farcasterId: string): boolean {
  // Basic validation for Farcaster ID format
  // In production, you might want more sophisticated validation
  return typeof farcasterId === 'string' && farcasterId.length > 0 && farcasterId.length < 100;
}

