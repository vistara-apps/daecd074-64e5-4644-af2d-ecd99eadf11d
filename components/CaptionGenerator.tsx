'use client';

import { useState } from 'react';
import { Sparkles, Copy, RefreshCw } from 'lucide-react';
import { GeneratedTipCard } from './GeneratedTipCard';

interface CaptionData {
  theme: string;
  platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin';
  tone: 'casual' | 'professional' | 'funny' | 'inspirational';
}

export function CaptionGenerator() {
  const [formData, setFormData] = useState<CaptionData>({
    theme: '',
    platform: 'instagram',
    tone: 'casual',
  });
  const [generatedCaption, setGeneratedCaption] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!formData.theme.trim()) return;

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate caption');
      }

      const data = await response.json();
      setGeneratedCaption(data.caption);
    } catch (error) {
      console.error('Error generating caption:', error);
      // Fallback caption for demo
      setGeneratedCaption(
        `✨ ${formData.theme} ✨\n\nCapture the moment and make it count! 📸 What's your favorite way to express creativity?\n\n#${formData.platform} #creative #inspiration`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCaption);
      // Could add toast notification here
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="space-y-lg">
      <div className="card space-y-lg">
        <div className="space-y-md">
          <label className="block text-sm font-medium text-textPrimary">
            Content Theme
          </label>
          <textarea
            value={formData.theme}
            onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
            placeholder="Describe your content (e.g., sunset photo, product launch, motivational quote)"
            className="input-field min-h-[80px] resize-none"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-md">
          <div className="space-y-md">
            <label className="block text-sm font-medium text-textPrimary">
              Platform
            </label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value as CaptionData['platform'] })}
              className="input-field"
            >
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>

          <div className="space-y-md">
            <label className="block text-sm font-medium text-textPrimary">
              Tone
            </label>
            <select
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value as CaptionData['tone'] })}
              className="input-field"
            >
              <option value="casual">Casual</option>
              <option value="professional">Professional</option>
              <option value="funny">Funny</option>
              <option value="inspirational">Inspirational</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!formData.theme.trim() || isGenerating}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Generate Caption
            </>
          )}
        </button>
      </div>

      {generatedCaption && (
        <GeneratedTipCard
          title="Generated Caption"
          content={generatedCaption}
          onCopy={handleCopy}
          onRegenerate={handleGenerate}
          isRegenerating={isGenerating}
        />
      )}
    </div>
  );
}
