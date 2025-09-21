'use client';

import { useState } from 'react';
import { Clock, Copy } from 'lucide-react';
import { GeneratedTipCard } from './GeneratedTipCard';

interface ScheduleData {
  platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin' | 'tiktok';
  timezone: string;
}

export function ScheduleSuggestions() {
  const [formData, setFormData] = useState<ScheduleData>({
    platform: 'instagram',
    timezone: 'UTC',
  });
  const [generatedSchedule, setGeneratedSchedule] = useState<string>('');

  const scheduleData = {
    instagram: {
      weekdays: ['Monday: 11 AM - 1 PM', 'Tuesday: 11 AM - 1 PM', 'Wednesday: 11 AM - 1 PM', 'Thursday: 11 AM - 1 PM', 'Friday: 11 AM - 1 PM'],
      weekend: ['Saturday: 10 AM - 12 PM', 'Sunday: 2 PM - 4 PM'],
      peak: 'Wednesday 11 AM and Friday 2 PM'
    },
    twitter: {
      weekdays: ['Monday: 9 AM - 10 AM', 'Tuesday: 9 AM - 10 AM', 'Wednesday: 9 AM - 10 AM', 'Thursday: 9 AM - 10 AM', 'Friday: 9 AM - 10 AM'],
      weekend: ['Saturday: 9 AM - 10 AM', 'Sunday: 9 AM - 10 AM'],
      peak: 'Wednesday 9 AM and Friday 5 PM'
    },
    facebook: {
      weekdays: ['Monday: 1 PM - 3 PM', 'Tuesday: 1 PM - 3 PM', 'Wednesday: 1 PM - 3 PM', 'Thursday: 1 PM - 3 PM', 'Friday: 1 PM - 3 PM'],
      weekend: ['Saturday: 12 PM - 2 PM', 'Sunday: 12 PM - 2 PM'],
      peak: 'Wednesday 3 PM and Saturday 12 PM'
    },
    linkedin: {
      weekdays: ['Monday: 8 AM - 10 AM', 'Tuesday: 8 AM - 10 AM', 'Wednesday: 8 AM - 10 AM', 'Thursday: 8 AM - 10 AM', 'Friday: 8 AM - 10 AM'],
      weekend: ['Saturday: Not recommended', 'Sunday: Not recommended'],
      peak: 'Tuesday 10 AM and Wednesday 12 PM'
    },
    tiktok: {
      weekdays: ['Monday: 6 AM - 10 AM', 'Tuesday: 6 AM - 10 AM', 'Wednesday: 6 AM - 10 AM', 'Thursday: 6 AM - 10 AM', 'Friday: 6 AM - 10 AM'],
      weekend: ['Saturday: 7 AM - 9 AM', 'Sunday: 7 AM - 9 AM'],
      peak: 'Tuesday 9 AM and Thursday 12 PM'
    }
  };

  const handleGenerate = async () => {
    try {
      // For demo purposes, using a mock farcasterId
      // In production, this would come from the Farcaster frame context
      const farcasterId = 'demo_user_' + Date.now();

      const response = await fetch('/api/generate-schedule', {
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
        throw new Error(data.error || 'Failed to generate schedule');
      }

      setGeneratedSchedule(data.data.schedule.content);
    } catch (error) {
      console.error('Error generating schedule:', error);
      // Fallback to client-side generation
      const data = scheduleData[formData.platform as keyof typeof scheduleData];
      const schedule = `
📅 Best Posting Times for ${formData.platform.charAt(0).toUpperCase() + formData.platform.slice(1)}

🔥 Peak Times: ${data.peak}

📊 Weekday Schedule:
${data.weekdays.join('\n')}

🎯 Weekend Schedule:
${data.weekend.join('\n')}

⏰ Timezone: ${formData.timezone}

💡 Tip: Consistency is key! Post regularly during these optimal windows for maximum engagement.
      `.trim();

      setGeneratedSchedule(schedule);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedSchedule);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="space-y-lg">
      <div className="card space-y-lg">
        <div className="space-y-md">
          <label className="block text-sm font-medium text-textPrimary">
            Platform
          </label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value as ScheduleData['platform'] })}
            className="input-field"
          >
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>

        <div className="space-y-md">
          <label className="block text-sm font-medium text-textPrimary">
            Timezone
          </label>
          <select
            value={formData.timezone}
            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            className="input-field"
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time (EST)</option>
            <option value="PST">Pacific Time (PST)</option>
            <option value="GMT">Greenwich Mean Time (GMT)</option>
            <option value="CET">Central European Time (CET)</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Clock size={16} />
          Get Optimal Schedule
        </button>
      </div>

      {generatedSchedule && (
        <GeneratedTipCard
          title="Optimal Posting Schedule"
          content={generatedSchedule}
          onCopy={handleCopy}
        />
      )}
    </div>
  );
}
