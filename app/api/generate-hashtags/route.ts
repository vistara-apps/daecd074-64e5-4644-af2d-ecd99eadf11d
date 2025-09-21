import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getUserByFarcasterId, createUser, saveGeneratedTip } from '../../../lib/database';
import { checkUserLimits, trackTipUsage } from '../../../lib/subscription';
import { ApiResponse } from '../../../lib/types';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function POST(request: NextRequest) {
  try {
    const { niche, platform, farcasterId } = await request.json();

    if (!niche) {
      return NextResponse.json(
        { success: false, error: 'Niche is required' } as ApiResponse,
        { status: 400 }
      );
    }

    if (!farcasterId) {
      return NextResponse.json(
        { success: false, error: 'Farcaster ID is required' } as ApiResponse,
        { status: 400 }
      );
    }

    // Get or create user
    let user = await getUserByFarcasterId(farcasterId);
    if (!user) {
      user = await createUser(farcasterId);
    }

    // Check subscription limits
    const limitCheck = await checkUserLimits(user, 'hashtags');
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

    const prompt = `Generate 10-15 relevant hashtags for ${platform} content in the ${niche} niche.

Guidelines:
- Mix of popular and niche-specific hashtags
- Include trending hashtags when relevant
- Optimize for ${platform} hashtag best practices
- Focus on hashtags that will increase discoverability
- Include both broad and specific hashtags
- No explanations, just hashtags separated by spaces

Generate only the hashtags with # symbols, separated by spaces.`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a social media hashtag expert who knows which hashtags drive the most engagement and discoverability.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const hashtags = completion.choices[0]?.message?.content?.trim();

    if (!hashtags) {
      throw new Error('No hashtags generated');
    }

    // Save the generated tip
    const savedTip = await saveGeneratedTip({
      userId: user.userId,
      tipType: 'hashtags',
      content: hashtags,
      platform,
      metadata: { niche },
    });

    // Track usage
    await trackTipUsage(user.userId, 'hashtags');

    const response: ApiResponse<{
      hashtags: string;
      tipId: string;
      remaining: number;
      limit: number;
    }> = {
      success: true,
      data: {
        hashtags,
        tipId: savedTip.tipId,
        remaining: limitCheck.remaining - 1,
        limit: limitCheck.limit,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating hashtags:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate hashtags' } as ApiResponse,
      { status: 500 }
    );
  }
}
