import React, { useEffect } from 'react';
import { getAdminSettings } from '../services/storageService';

interface AdSenseProps {
  slot?: string; // Optional slot ID if you have specific ad units
  format?: 'auto' | 'fluid' | 'rectangle';
}

const AdSense: React.FC<AdSenseProps> = ({ slot, format = 'auto' }) => {
  const settings = getAdminSettings();

  useEffect(() => {
    if (settings.adSenseId) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error", e);
      }
    }
  }, [settings.adSenseId]);

  if (!settings.adSenseId) {
    return null; // Don't render anything if no ID is set
  }

  return (
    <div className="my-8 overflow-hidden rounded-lg bg-slate-900/50 border border-slate-800 p-4 text-center">
      <div className="text-xs text-slate-600 uppercase mb-2 tracking-widest">Advertisement</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={settings.adSenseId}
        data-ad-slot={slot || "1234567890"} // Placeholder slot if none provided
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSense;