'use client';

import { useState } from 'react';

interface NameModalProps {
  onSubmit: (name: string) => void;
}

export default function NameModal({ onSubmit }: NameModalProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    
    if (name.trim().length > 20) {
      setError('Name must be less than 20 characters');
      return;
    }
    
    console.log('[NameModal] Submitting name:', name.trim());
    onSubmit(name.trim());
  };
  
  // Debug: log when modal renders
  console.log('[NameModal] Rendering modal');

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100]" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome!</h2>
        <p className="text-white/70 mb-6">Enter your name to join the community map</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="Your first name"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-violet-500 transition-colors mb-2"
            autoFocus
            maxLength={20}
          />
          
          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}
          
          <button
            type="submit"
            className="w-full px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all"
          >
            Join Community
          </button>
        </form>
        
        <p className="text-white/50 text-xs mt-4 text-center">
          Your name will be visible to other users on the map
        </p>
      </div>
    </div>
  );
}

