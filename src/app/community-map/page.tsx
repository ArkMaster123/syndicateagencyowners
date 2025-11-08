'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

const PhaserGame = dynamic(() => import('@/app/community-map/components/Game'), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Community Map...</div>
});

export default function CommunityMapPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="absolute top-0 left-0 right-0 z-10 glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-lg"></div>
              <span className="text-xl font-bold text-white">Agency Syndicate</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-white/70 hover:text-violet-400 transition-colors">← Back to Home</Link>
              <div className="flex items-center space-x-2 text-white/70">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Live Community Map</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16">
        <PhaserGame />
      </div>

      <div className="fixed bottom-4 left-4 right-4 z-20">
        <div className="glass-effect rounded-lg p-4 max-w-sm">
          <h3 className="text-white font-semibold mb-2">How to Play</h3>
          <div className="text-white/70 text-sm space-y-1">
            <p>🎮 Use <kbd className="px-2 py-1 bg-white/20 rounded">Arrow Keys</kbd> or <kbd className="px-2 py-1 bg-white/20 rounded">WASD</kbd> to move</p>
            <p>👥 Walk up to team members and press <kbd className="px-2 py-1 bg-white/20 rounded">Space</kbd> to book meetings</p>
            <p>📱 On mobile, use the on-screen D-pad</p>
          </div>
        </div>
      </div>
    </div>
  );
}
