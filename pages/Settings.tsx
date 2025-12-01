import React, { useState, useEffect } from 'react';
import { Save, Settings as SettingsIcon, User, Lock, AlertCircle, Globe, DollarSign } from 'lucide-react';
import { getAdminSettings, saveAdminSettings } from '../services/storageService';

const Settings: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [googleSiteVerification, setGoogleSiteVerification] = useState('');
  const [adSenseId, setAdSenseId] = useState('');
  
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    const settings = getAdminSettings();
    setUsername(settings.username);
    setPassword(settings.password);
    setGoogleSiteVerification(settings.googleSiteVerification || '');
    setAdSenseId(settings.adSenseId || '');
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
        setMessage({ type: 'error', text: 'Username and password cannot be empty.' });
        return;
    }
    
    saveAdminSettings({ 
        username, 
        password,
        googleSiteVerification,
        adSenseId
    });
    setMessage({ type: 'success', text: 'Settings updated successfully!' });
    
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
       <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-slate-800 rounded-lg">
                <SettingsIcon className="h-6 w-6 text-brand-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Admin Settings</h1>
       </div>

       <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 shadow-xl">
           <form onSubmit={handleSave} className="space-y-8">
                
                {/* Security Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white border-b border-slate-800 pb-2">Security</h3>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-slate-600" />
                            </div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-800 text-slate-200 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-600" />
                            </div>
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-800 text-slate-200 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* SEO & Monetization Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white border-b border-slate-800 pb-2">SEO & Monetization</h3>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Google Site Verification Code</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Globe className="h-5 w-5 text-slate-600" />
                            </div>
                            <input
                                type="text"
                                placeholder="e.g., uL0-k3y..."
                                value={googleSiteVerification}
                                onChange={(e) => setGoogleSiteVerification(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-800 text-slate-200 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 focus:outline-none"
                            />
                        </div>
                        <p className="mt-1 text-xs text-slate-500">From Google Search Console. Just the code, not the full HTML tag.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">AdSense Publisher ID</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <DollarSign className="h-5 w-5 text-slate-600" />
                            </div>
                            <input
                                type="text"
                                placeholder="e.g., ca-pub-0000000000000000"
                                value={adSenseId}
                                onChange={(e) => setAdSenseId(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-800 text-slate-200 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 focus:outline-none"
                            />
                        </div>
                        <p className="mt-1 text-xs text-slate-500">From Google AdSense Settings.</p>
                    </div>
                </div>

                {message && (
                    <div className={`p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {message.text}
                    </div>
                )}

                <div className="pt-4 border-t border-slate-800">
                    <button
                        type="submit"
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-brand-500/20"
                    >
                        <Save className="h-5 w-5" />
                        Save Changes
                    </button>
                </div>
           </form>
       </div>
    </div>
  );
};

export default Settings;