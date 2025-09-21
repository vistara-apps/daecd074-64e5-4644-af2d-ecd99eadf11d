import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
      dangerouslyAllowBrowser: true,
    });

    const { niche, platform } = await request.json();

    if (!niche) {
      return NextResponse.json(
        { error: 'Niche is required' },
        { status: 400 }
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

    return NextResponse.json({ hashtags });
  } catch (error) {
    console.error('Error generating hashtags:', error);
    return NextResponse.json(
      { error: 'Failed to generate hashtags' },
      { status: 500 }
    );
  }
}
