'use client';

import { useState } from 'react';
import { NavigationTabs, TabType } from './NavigationTabs';
import { CaptionGenerator } from './CaptionGenerator';
import { HashtagSuggestions } from './HashtagSuggestions';
import { ScheduleSuggestions } from './ScheduleSuggestions';

export function TipGeneratorForm() {
  const [activeTab, setActiveTab] = useState<TabType>('caption');

  const renderContent = () => {
    switch (activeTab) {
      case 'caption':
        return <CaptionGenerator />;
      case 'hashtags':
        return <HashtagSuggestions />;
      case 'schedule':
        return <ScheduleSuggestions />;
      default:
        return <CaptionGenerator />;
    }
  };

  return (
    <div className="space-y-lg">
      <NavigationTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      <div className="animate-fade-in">
        {renderContent()}
      </div>
    </div>
  );
}
