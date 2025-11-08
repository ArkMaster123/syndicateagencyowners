'use client';

import { Settings, User, Users } from 'lucide-react';
import { useState } from 'react';

interface SettingsMenuProps {
  playerName: string;
  onChangeName: () => void;
  onChangeCharacter: () => void;
}

export default function SettingsMenu({ playerName, onChangeName, onChangeCharacter }: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 right-6 z-30 p-3 bg-foreground/10 hover:bg-foreground/20 backdrop-blur-lg rounded-full transition-all hover:scale-110 border border-foreground/20 shadow-lg"
        title="Settings"
      >
        <Settings className="w-5 h-5 text-foreground" />
      </button>

      {/* Settings Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed top-24 right-6 z-50 w-80 rounded-xl border border-foreground/10 bg-foreground/20 p-6 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Settings
            </h3>

            {/* Current Player Info */}
            <div className="mb-6 p-4 bg-foreground/10 rounded-lg border border-foreground/20">
              <p className="text-foreground/70 text-sm mb-1">Current Player</p>
              <p className="text-foreground font-semibold">{playerName}</p>
            </div>

            {/* Menu Options */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  onChangeName();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-lg transition-all flex items-center gap-3 border border-foreground/20 hover:border-foreground/30"
              >
                <User className="w-5 h-5" />
                <span>Change Name</span>
              </button>

              <button
                onClick={() => {
                  onChangeCharacter();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-lg transition-all flex items-center gap-3 border border-foreground/20 hover:border-foreground/30"
              >
                <Users className="w-5 h-5" />
                <span>Change Character</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 px-4 py-2 text-foreground/70 hover:text-foreground text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
}
