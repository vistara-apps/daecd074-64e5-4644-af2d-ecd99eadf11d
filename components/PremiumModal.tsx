'use client';

import { useState } from 'react';
import { X, Crown, Check } from 'lucide-react';
import { getSubscriptionBenefits, calculateUpgradePrice } from '../lib/subscription';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade?: () => void;
}

export function PremiumModal({ isOpen, onClose, onUpgrade }: PremiumModalProps) {
  const [isUpgrading, setIsUpgrading] = useState(false);

  if (!isOpen) return null;

  const benefits = getSubscriptionBenefits();
  const pricing = calculateUpgradePrice();

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    // In production, this would integrate with a payment provider
    // For now, we'll just simulate the upgrade
    setTimeout(() => {
      setIsUpgrading(false);
      onUpgrade?.();
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg shadow-card max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-lg">
            <div className="flex items-center gap-md">
              <Crown className="text-accent" size={24} />
              <h2 className="text-xl font-bold text-textPrimary">Upgrade to Premium</h2>
            </div>
            <button
              onClick={onClose}
              className="text-textSecondary hover:text-textPrimary transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Pricing */}
          <div className="text-center mb-lg">
            <div className="text-3xl font-bold text-primary mb-sm">
              ${pricing.monthly}/month
            </div>
            <div className="text-sm text-textSecondary">
              or ${pricing.yearly}/year (save 25%)
            </div>
          </div>

          {/* Benefits Comparison */}
          <div className="space-y-lg mb-lg">
            <div>
              <h3 className="font-semibold text-textPrimary mb-md">Free Plan</h3>
              <ul className="space-y-sm">
                {benefits.free.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-sm text-sm text-textSecondary">
                    <Check size={16} className="text-textSecondary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-textPrimary mb-md flex items-center gap-sm">
                <Crown size={16} className="text-accent" />
                Premium Plan
              </h3>
              <ul className="space-y-sm">
                {benefits.premium.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-sm text-sm text-textPrimary">
                    <Check size={16} className="text-accent" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-md">
            <button
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpgrading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : (
                <>
                  <Crown size={16} />
                  Upgrade to Premium
                </>
              )}
            </button>

            <p className="text-xs text-textSecondary text-center">
              Cancel anytime. 30-day money-back guarantee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

