import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getUserByFarcasterId, createUser, saveGeneratedTip } from '../../../lib/database';
import { checkUserLimits, trackTipUsage } from '../../../lib/subscription';
import { ApiResponse } from '../../../lib/types';
import { validateCaptionRequest, sanitizeInput } from '../../../lib/validation';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = validateCaptionRequest(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.errors.join(', ') } as ApiResponse,
        { status: 400 }
      );
    }

    const { theme, platform, tone, farcasterId } = body;

    // Sanitize inputs
    const sanitizedTheme = sanitizeInput(theme);

    // Get or create user
    let user = await getUserByFarcasterId(farcasterId);
    if (!user) {
      user = await createUser(farcasterId);
    }

    // Check subscription limits
    const limitCheck = await checkUserLimits(user, 'caption');
    if (!limitCheck.canUse) {
      return NextResponse.json(
        {
          success: false,
          error: limitCheck.upgradeRequired
            ? 'Daily limit reached. Upgrade to premium for unlimited access.'
            : 'Daily limit reached. Try again tomorrow.',
          data: {
            remaining: limitCheck.remaining,
            limit: limitCheck.limit,
            upgradeRequired: limitCheck.upgradeRequired,
          }
        } as ApiResponse,
        { status: 429 }
      );
    }

    const prompt = `Create an engaging ${tone} social media caption for ${platform} about: ${sanitizedTheme}

Guidelines:
- Keep it ${tone} in tone
- Include relevant emojis
- Add 3-5 relevant hashtags
- Make it engaging and likely to get likes
- Optimize for ${platform} best practices
- Keep it concise but impactful

Generate only the caption, no additional text.`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a social media expert who creates viral, engaging captions that get lots of likes and engagement.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.8,
    });

    const caption = completion.choices[0]?.message?.content?.trim();

    if (!caption) {
      throw new Error('No caption generated');
    }

    // Save the generated tip
    const savedTip = await saveGeneratedTip({
      userId: user.userId,
      tipType: 'caption',
      content: caption,
      platform,
      metadata: { theme: sanitizedTheme, tone },
    });

    // Track usage
    await trackTipUsage(user.userId, 'caption');

    const response: ApiResponse<{
      caption: string;
      tipId: string;
      remaining: number;
      limit: number;
    }> = {
      success: true,
      data: {
        caption,
        tipId: savedTip.tipId,
        remaining: limitCheck.remaining - 1,
        limit: limitCheck.limit,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating caption:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate caption' } as ApiResponse,
      { status: 500 }
    );
  }
}
