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
        className="fixed top-4 right-4 z-30 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-full transition-all hover:scale-110 border border-white/10"
        title="Settings"
      >
        <Settings className="w-6 h-6 text-white" />
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
          <div className="fixed top-20 right-4 z-50 w-80 glass-effect rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Settings
            </h3>

            {/* Current Player Info */}
            <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/70 text-sm mb-1">Current Player</p>
              <p className="text-white font-semibold">{playerName}</p>
            </div>

            {/* Menu Options */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  onChangeName();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center gap-3 border border-white/10 hover:border-white/20"
              >
                <User className="w-5 h-5" />
                <span>Change Name</span>
              </button>

              <button
                onClick={() => {
                  onChangeCharacter();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center gap-3 border border-white/10 hover:border-white/20"
              >
                <Users className="w-5 h-5" />
                <span>Change Character</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 px-4 py-2 text-white/70 hover:text-white text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
}
