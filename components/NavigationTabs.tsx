'use client';

import { useState } from 'react';
import { MessageSquare, Hash, Clock } from 'lucide-react';

export type TabType = 'caption' | 'hashtags' | 'schedule';

interface NavigationTabsProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export function NavigationTabs({ 
  activeTab = 'caption', 
  onTabChange 
}: NavigationTabsProps) {
  const [currentTab, setCurrentTab] = useState<TabType>(activeTab);

  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab);
    onTabChange?.(tab);
  };

  const tabs = [
    {
      id: 'caption' as TabType,
      label: 'Caption',
      icon: MessageSquare,
    },
    {
      id: 'hashtags' as TabType,
      label: 'Hashtags',
      icon: Hash,
    },
    {
      id: 'schedule' as TabType,
      label: 'Schedule',
      icon: Clock,
    },
  ];

  return (
    <div className="flex bg-surface rounded-lg p-sm shadow-card">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`
              flex-1 flex items-center justify-center gap-2 py-md px-sm rounded-md
              font-medium text-sm transition-colors duration-200
              ${isActive 
                ? 'bg-primary text-white' 
                : 'text-textSecondary hover:text-textPrimary hover:bg-gray-50'
              }
            `}
          >
            <Icon size={16} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
