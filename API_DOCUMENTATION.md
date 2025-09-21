# Social Boost AI API Documentation

## Overview

Social Boost AI provides AI-powered social media optimization tools through RESTful APIs. The API enables users to generate captions, hashtags, and posting schedules for various social media platforms.

## Base URL

```
https://your-domain.com/api
```

## Authentication

All API endpoints require a `farcasterId` parameter for user identification and tracking. In production, this would be obtained from the Farcaster frame context.

## Rate Limiting

- **Free users**: Limited daily usage (5 captions, 3 hashtags, 2 schedules per day)
- **Premium users**: Higher limits (50 captions, 25 hashtags, 10 schedules per day)
- Rate limit responses include remaining quota information

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message",
  "data": {
    "remaining": 4,
    "limit": 5,
    "upgradeRequired": false
  }
}
```

## Endpoints

### 1. Generate Caption

Generate AI-powered social media captions based on content theme, platform, and desired tone.

**Endpoint:** `POST /api/generate-caption`

**Request Body:**
```json
{
  "theme": "sunset photography session",
  "platform": "instagram",
  "tone": "casual",
  "farcasterId": "user_123"
}
```

**Parameters:**
- `theme` (string, required): Description of the content (max 500 characters)
- `platform` (string, required): Target platform - "instagram", "twitter", "facebook", "linkedin"
- `tone` (string, required): Desired tone - "casual", "professional", "funny", "inspirational"
- `farcasterId` (string, required): User identifier

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "caption": "✨ Chasing sunsets and capturing magic! 📸 Nothing beats that golden hour glow. What's your favorite time to shoot?\n\n#sunset #photography #goldenHour #nature #explore",
    "tipId": "tip_1234567890_abc123",
    "remaining": 4,
    "limit": 5
  }
}
```

**Rate Limit Response (429):**
```json
{
  "success": false,
  "error": "Daily limit reached. Upgrade to premium for unlimited access.",
  "data": {
    "remaining": 0,
    "limit": 5,
    "upgradeRequired": true
  }
}
```

### 2. Generate Hashtags

Generate relevant hashtags for content based on niche and target platform.

**Endpoint:** `POST /api/generate-hashtags`

**Request Body:**
```json
{
  "niche": "fitness motivation",
  "platform": "instagram",
  "farcasterId": "user_123"
}
```

**Parameters:**
- `niche` (string, required): Content niche/category (max 100 characters)
- `platform` (string, required): Target platform - "instagram", "twitter", "linkedin", "tiktok"
- `farcasterId` (string, required): User identifier

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "hashtags": "#fitness #motivation #gym #workout #health #fitfam #training #exercise #lifestyle #goals",
    "tipId": "tip_1234567890_def456",
    "remaining": 2,
    "limit": 3
  }
}
```

### 3. Generate Schedule

Get optimal posting schedules for different social media platforms.

**Endpoint:** `POST /api/generate-schedule`

**Request Body:**
```json
{
  "platform": "instagram",
  "timezone": "EST",
  "farcasterId": "user_123"
}
```

**Parameters:**
- `platform` (string, required): Target platform - "instagram", "twitter", "facebook", "linkedin", "tiktok"
- `timezone` (string, optional): User's timezone (defaults to "UTC")
- `farcasterId` (string, required): User identifier

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "schedule": {
      "title": "📅 Instagram Posting Schedule",
      "peak": "Wednesday 11 AM and Friday 2 PM",
      "weekdays": ["Monday: 11 AM - 1 PM", "Tuesday: 11 AM - 1 PM", ...],
      "weekend": ["Saturday: 10 AM - 12 PM", "Sunday: 2 PM - 4 PM"],
      "tip": "Post during peak hours for maximum engagement. Use Stories for additional reach.",
      "timezone": "EST",
      "content": "📅 Instagram Posting Schedule\n\n🔥 Peak Times: Wednesday 11 AM and Friday 2 PM\n\n📊 Weekday Schedule:\n• Monday: 11 AM - 1 PM\n• Tuesday: 11 AM - 1 PM\n..."
    },
    "tipId": "tip_1234567890_ghi789",
    "remaining": 1,
    "limit": 2
  }
}
```

### 4. User Management

**Endpoint:** `POST /api/user`

Create or retrieve user information.

**Request Body:**
```json
{
  "farcasterId": "user_123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "userId": "user_abc123",
      "farcasterId": "user_123",
      "creationDate": "2024-01-15T10:30:00.000Z",
      "subscriptionStatus": "free",
      "tipCount": 12,
      "lastActivity": "2024-01-20T14:25:00.000Z"
    },
    "stats": {
      "totalTips": 12,
      "recentTips": [
        {
          "tipId": "tip_123",
          "tipType": "caption",
          "content": "...",
          "platform": "instagram",
          "creationDate": "2024-01-20T14:25:00.000Z"
        }
      ]
    }
  }
}
```

**Endpoint:** `GET /api/user?farcasterId=user_123`

Retrieve user information.

## Data Models

### User
```typescript
interface User {
  userId: string;
  farcasterId: string;
  creationDate: Date;
  subscriptionStatus: 'free' | 'premium';
  tipCount: number;
  lastActivity: Date;
}
```

### GeneratedTip
```typescript
interface GeneratedTip {
  tipId: string;
  userId: string;
  tipType: 'caption' | 'hashtags' | 'schedule';
  content: string;
  creationDate: Date;
  platform: string;
  metadata?: Record<string, any>;
}
```

## Subscription Limits

### Free Plan
- Captions: 5 per day
- Hashtags: 3 per day
- Schedules: 2 per day

### Premium Plan
- Captions: 50 per day
- Hashtags: 25 per day
- Schedules: 10 per day

## Error Codes

- `400`: Bad Request - Invalid input parameters
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error - Server-side error

## Environment Variables

Required environment variables for the API:

```env
# AI API Keys (choose one)
OPENROUTER_API_KEY=your_openrouter_api_key
# OR
OPENAI_API_KEY=your_openai_api_key

# MiniKit API Key
NEXT_PUBLIC_MINIKIT_API_KEY=your_minikit_api_key
```

## Rate Limiting Headers

The API includes rate limiting information in response headers:

- `X-RateLimit-Remaining`: Number of requests remaining
- `X-RateLimit-Limit`: Total request limit
- `X-RateLimit-Reset`: Time when the limit resets (Unix timestamp)

## SDK Examples

### JavaScript/TypeScript

```javascript
// Generate a caption
const response = await fetch('/api/generate-caption', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    theme: 'beach vacation',
    platform: 'instagram',
    tone: 'casual',
    farcasterId: 'user_123'
  })
});

const data = await response.json();
if (data.success) {
  console.log('Generated caption:', data.data.caption);
} else {
  console.error('Error:', data.error);
}
```

## Support

For API support or questions, please contact the development team.

