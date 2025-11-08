'use client';

import { useEffect, useRef, useState } from 'react';

interface Character {
  id: string;
  name: string;
  path: string;
}

// Build character list from available sprites
const buildCharacterList = (): Character[] => {
  const characters: Character[] = [];

  // School uniform 1 - females
  for (let i = 1; i <= 18; i++) {
    characters.push({
      id: `su1_female_${i.toString().padStart(2, '0')}`,
      name: `Student ${i}`,
      path: `/character-sprites/school-characters/school uniform 1/su1 Student fmale ${i.toString().padStart(2, '0')}.png`
    });
  }

  // School uniform 1 - males
  for (let i = 1; i <= 13; i++) {
    characters.push({
      id: `su1_male_${i.toString().padStart(2, '0')}`,
      name: `Student ${i + 18}`,
      path: `/character-sprites/school-characters/school uniform 1/su1 Student male ${i.toString().padStart(2, '0')}.png`
    });
  }

  return characters;
};

interface CharacterSelectorProps {
  onSelect: (characterId: string) => void;
}

export default function CharacterSelector({ onSelect }: CharacterSelectorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationFrame, setAnimationFrame] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const characters = buildCharacterList();
  const currentCharacter = characters[currentIndex];

  // Animation loop for sprite preview
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(prev => (prev + 1) % 4);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Draw character sprite on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Clear canvas
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw character sprite (facing down, animated)
      const frameWidth = 32;
      const frameHeight = 32;
      const framesPerRow = 4;

      // Row 0 is facing down
      const sourceX = animationFrame * frameWidth;
      const sourceY = 0;

      // Scale up 4x for better visibility
      const scale = 4;
      const destX = (canvas.width - frameWidth * scale) / 2;
      const destY = (canvas.height - frameHeight * scale) / 2;

      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        frameWidth,
        frameHeight,
        destX,
        destY,
        frameWidth * scale,
        frameHeight * scale
      );
    };
    img.src = currentCharacter.path;
  }, [currentCharacter, animationFrame]);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + characters.length) % characters.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % characters.length);
  };

  const handleSelect = () => {
    onSelect(currentCharacter.id);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSelect();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="glass-effect rounded-2xl p-8 max-w-md w-full mx-4">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Choose Your Character
        </h2>

        {/* Character preview */}
        <div className="bg-gradient-to-b from-violet-900/50 to-indigo-900/50 rounded-xl p-8 mb-6 border border-white/10">
          <canvas
            ref={canvasRef}
            width={256}
            height={256}
            className="w-full h-auto"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        {/* Character name */}
        <div className="text-center mb-6">
          <p className="text-white/70 text-sm mb-1">Character</p>
          <p className="text-white text-xl font-semibold">{currentCharacter.name}</p>
          <p className="text-white/50 text-sm mt-1">
            {currentIndex + 1} / {characters.length}
          </p>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handlePrevious}
            className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/10 hover:border-white/20 hover:scale-105"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/10 hover:border-white/20 hover:scale-105"
          >
            Next →
          </button>
        </div>

        {/* Select button */}
        <button
          onClick={handleSelect}
          className="w-full px-6 py-4 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg"
        >
          Select Character
        </button>

        {/* Keyboard hint */}
        <p className="text-white/50 text-xs text-center mt-4">
          Use arrow keys ← → to navigate
        </p>
      </div>
    </div>
  );
}
