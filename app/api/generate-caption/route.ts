import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function POST(request: NextRequest) {
  try {
    const { theme, platform, tone } = await request.json();

    if (!theme) {
      return NextResponse.json(
        { error: 'Theme is required' },
        { status: 400 }
      );
    }

    const prompt = `Create an engaging ${tone} social media caption for ${platform} about: ${theme}

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

    return NextResponse.json({ caption });
  } catch (error) {
    console.error('Error generating caption:', error);
    return NextResponse.json(
      { error: 'Failed to generate caption' },
      { status: 500 }
    );
  }
}
