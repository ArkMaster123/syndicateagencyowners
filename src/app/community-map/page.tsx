'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

const PhaserGame = dynamic(() => import('@/app/community-map/components/Game'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-background text-foreground flex items-center justify-center">Loading Community Map...</div>
});

export default function CommunityMapPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with landing page styling */}
      <header className="fixed top-0 left-0 right-0 z-10 border-b border-foreground/10">
        <div className="mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-foreground/10 to-foreground/20 border border-foreground/20 flex items-center justify-center backdrop-blur-md">
                <span className="text-foreground font-serif text-xl italic">B&B</span>
              </div>
              <span className="font-serif text-2xl italic tracking-tight text-foreground">
                Born & Brand
              </span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-foreground/70 hover:text-foreground transition-colors text-sm"
              >
                ← Back to Home
              </Link>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/20 bg-foreground/5 backdrop-blur-md">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-foreground/70 text-sm">Live</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Game Canvas */}
      <div className="pt-20">
        <PhaserGame />
      </div>

      {/* Instructions Card */}
      <div className="fixed bottom-6 left-6 z-20">
        <div className="rounded-xl border border-foreground/10 bg-foreground/20 p-5 shadow-2xl backdrop-blur-md max-w-sm">
          <h3 className="text-foreground font-semibold mb-3 text-base">How to Play</h3>
          <div className="text-foreground/80 text-sm space-y-2">
            <p>🎮 Use <kbd className="px-2 py-1 bg-foreground/10 rounded border border-foreground/20 text-xs">Arrow Keys</kbd> or <kbd className="px-2 py-1 bg-foreground/10 rounded border border-foreground/20 text-xs">WASD</kbd> to move</p>
            <p>👥 Walk around to explore the community map</p>
            <p>📱 On mobile, use the on-screen controls</p>
          </div>
        </div>
      </div>
    </div>
  );
}
