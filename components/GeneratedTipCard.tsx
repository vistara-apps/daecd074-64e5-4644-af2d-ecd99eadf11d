'use client';

import { Copy, RefreshCw, Check } from 'lucide-react';
import { useState } from 'react';

interface GeneratedTipCardProps {
  title: string;
  content: string;
  onCopy: () => void;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export function GeneratedTipCard({ 
  title, 
  content, 
  onCopy, 
  onRegenerate,
  isRegenerating = false 
}: GeneratedTipCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card animate-slide-up">
      <div className="space-y-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-textPrimary">
            {title}
          </h3>
        </div>
        
        <div className="bg-gray-50 rounded-md p-lg">
          <pre className="text-sm text-textPrimary whitespace-pre-wrap font-sans leading-relaxed">
            {content}
          </pre>
        </div>

        <div className="flex gap-md">
          <button
            onClick={handleCopy}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </button>
          
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={16} className={isRegenerating ? 'animate-spin' : ''} />
              {isRegenerating ? 'Generating...' : 'Regenerate'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
