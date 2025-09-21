'use client';

import { useState } from 'react';
import { Hash, Copy, RefreshCw } from 'lucide-react';
import { GeneratedTipCard } from './GeneratedTipCard';

interface HashtagData {
  niche: string;
  platform: 'instagram' | 'twitter' | 'linkedin' | 'tiktok';
}

export function HashtagSuggestions() {
  const [formData, setFormData] = useState<HashtagData>({
    niche: '',
    platform: 'instagram',
  });
  const [generatedHashtags, setGeneratedHashtags] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!formData.niche.trim()) return;

    setIsGenerating(true);

    try {
      // For demo purposes, using a mock farcasterId
      // In production, this would come from the Farcaster frame context
      const farcasterId = 'demo_user_' + Date.now();

      const response = await fetch('/api/generate-hashtags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          farcasterId,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        if (data.error?.includes('Daily limit reached')) {
          alert(data.error);
          return;
        }
        throw new Error(data.error || 'Failed to generate hashtags');
      }

      setGeneratedHashtags(data.data.hashtags);
    } catch (error) {
      console.error('Error generating hashtags:', error);
      // Fallback hashtags for demo
      const sampleHashtags = [
        `#${formData.niche.replace(/\s+/g, '').toLowerCase()}`,
        '#trending',
        '#viral',
        '#explore',
        '#fyp',
        '#content',
        '#creative',
        '#inspiration',
        '#community',
        '#growth'
      ];
      setGeneratedHashtags(sampleHashtags.join(' '));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedHashtags);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="space-y-lg">
      <div className="card space-y-lg">
        <div className="space-y-md">
          <label className="block text-sm font-medium text-textPrimary">
            Content Niche
          </label>
          <input
            type="text"
            value={formData.niche}
            onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
            placeholder="e.g., fitness, food, travel, tech, fashion"
            className="input-field"
          />
        </div>

        <div className="space-y-md">
          <label className="block text-sm font-medium text-textPrimary">
            Platform
          </label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value as HashtagData['platform'] })}
            className="input-field"
          >
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!formData.niche.trim() || isGenerating}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Hash size={16} />
              Generate Hashtags
            </>
          )}
        </button>
      </div>

      {generatedHashtags && (
        <GeneratedTipCard
          title="Suggested Hashtags"
          content={generatedHashtags}
          onCopy={handleCopy}
          onRegenerate={handleGenerate}
          isRegenerating={isGenerating}
        />
      )}
    </div>
  );
}
