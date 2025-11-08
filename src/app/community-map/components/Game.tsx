'use client';

import { useEffect, useRef, useState } from 'react';
import { TilesetLoader } from '../utils/TilesetLoader';
import { MapParser } from '../utils/MapParser';
import { GameState } from '../utils/types';
import { CharacterSpriteManager } from '../utils/CharacterSpriteManager';
import { JitsiMeetingRoom } from '../utils/types';
import JitsiMeeting from './JitsiMeeting';
import NameModal from './NameModal';

interface WorkAdventureAPI {
  // WorkAdventure specific properties if needed
  [key: string]: unknown;
}

declare global {
  interface Window {
    workadventure?: WorkAdventureAPI;
    bookMeeting?: (npcId: string) => void;
  }
}

// Simple player state management using browser storage (WorkAdventure approach)
const PLAYER_NAME_KEY = 'wa_player_name';

function getStoredPlayerName(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(PLAYER_NAME_KEY);
}

function setStoredPlayerName(name: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(PLAYER_NAME_KEY, name);
}

// Helper function to find valid spawn position (not in walls)
function findValidSpawnPosition(
  mapParser: MapParser,
  preferredX: number,
  preferredY: number,
  mapWidth: number,
  mapHeight: number
): { x: number; y: number } {
  // Check if preferred position is valid
  if (!mapParser.isCollisionTile(Math.floor(preferredX), Math.floor(preferredY))) {
    return { x: preferredX, y: preferredY };
  }
  
  // Search in a spiral pattern around preferred position
  for (let radius = 1; radius < 10; radius++) {
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
          const testX = Math.floor(preferredX + dx);
          const testY = Math.floor(preferredY + dy);
          if (testX >= 1 && testX < mapWidth - 1 && testY >= 1 && testY < mapHeight - 1) {
            if (!mapParser.isCollisionTile(testX, testY)) {
              return { x: testX + 0.5, y: testY + 0.5 };
            }
          }
        }
      }
    }
  }
  
  // Fallback to center
  return { x: 15, y: 10 };
}

export default function GameComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [currentNPC, setCurrentNPC] = useState<GameState['npcs'][0] | null>(null);
  const assetsLoadedRef = useRef(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const characterSpriteManagerRef = useRef<CharacterSpriteManager>(new CharacterSpriteManager());
  const [animationFrame, setAnimationFrame] = useState(0);
  const [currentJitsiRoom, setCurrentJitsiRoom] = useState<JitsiMeetingRoom | null>(null);
  const [jitsiRooms, setJitsiRooms] = useState<JitsiMeetingRoom[]>([]);
  const [pendingJitsiRoom, setPendingJitsiRoom] = useState<JitsiMeetingRoom | null>(null);
  const pendingJitsiRoomRef = useRef<JitsiMeetingRoom | null>(null);
  
  // Player state (WorkAdventure approach - session storage)
  const [playerName, setPlayerName] = useState<string | null>(() => getStoredPlayerName());

  // Handle player name submission
  const handleNameSubmit = (name: string) => {
    setStoredPlayerName(name);
    setPlayerName(name);
  };

  useEffect(() => {
    if (!canvasRef.current || !playerName) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    console.log('[WorkAdventure] Starting game for player:', playerName);

    // Initialize utilities
    const tilesetLoader = new TilesetLoader();
    const mapParser = new MapParser();
    const characterSpriteManager = characterSpriteManagerRef.current;

    // Game state with updated dimensions for office map
    const gameState: GameState = {
      player: { x: 10, y: 15, facing: 'down' },
      npcs: [
        { id: 'james', name: 'James Mitchell', role: 'CEO - Growth Strategy', x: 8, y: 8, available: true, color: '#8b5cf6' },
        { id: 'sarah', name: 'Sarah Chen', role: 'AI Marketing Expert', x: 15, y: 8, available: true, color: '#6366f1' },
        { id: 'marcus', name: 'Marcus Rodriguez', role: 'SEO Specialist', x: 22, y: 8, available: false, color: '#10b981' },
        { id: 'community', name: 'Community Manager', role: 'General Help', x: 8, y: 15, available: true, color: '#8b5cf6' },
        { id: 'ai', name: 'AI Assistant', role: '24/7 Support', x: 15, y: 15, available: true, color: '#6366f1' },
        { id: 'cat', name: 'Whiskers', role: 'Office Cat', x: 12, y: 12, available: false, color: '#f59e0b' },
      ],
      tileSize: 32,
      mapWidth: 31,
      mapHeight: 21,
      keys: {},
      mobileControls: { up: false, down: false, left: false, right: false }
    };

    // Cat wandering AI state
    const catAI = {
      direction: 'down' as 'up' | 'down' | 'left' | 'right',
      moveTimer: 0,
      directionChangeTimer: 0,
      speed: 0.025  // Reduced by 2x
    };

    // Load assets and initialize game (WorkAdventure approach)
    const initGame = async () => {
      try {
        const mapData = await mapParser.loadMap('/office.tmj');
        await tilesetLoader.loadTilesets(mapData.tilesets);
        await characterSpriteManager.loadSprites();
        
        const rooms = mapParser.getJitsiMeetingRooms();
        setJitsiRooms(rooms);
        
        // Fix spawn positions
        const playerPos = findValidSpawnPosition(mapParser, gameState.player.x, gameState.player.y, gameState.mapWidth, gameState.mapHeight);
        gameState.player.x = playerPos.x;
        gameState.player.y = playerPos.y;
        
        gameState.npcs.forEach(npc => {
          const pos = findValidSpawnPosition(mapParser, npc.x, npc.y, gameState.mapWidth, gameState.mapHeight);
          npc.x = pos.x;
          npc.y = pos.y;
        });
        
        setAssetsLoaded(true);
        assetsLoadedRef.current = true;
        setGameLoaded(true);
        // Don't call gameLoop() here - it's already running
        setupControls();
      } catch (error) {
        console.error('[WorkAdventure] Init failed:', error);
      }
    };

    // Generate a random player sprite ID (WorkAdventure approach)
    const playerSpriteId = characterSpriteManager.getRandomCharacter(Math.random() > 0.5 ? 'male' : 'female');

    // Game loop
    const gameLoop = () => {
      update();
      render();
      requestAnimationFrame(gameLoop);
    };

    // Update game state
    const update = () => {
      handleMovement();
      updateCatAI();
      checkJitsiRoomProximity(); // Check Jitsi rooms FIRST
      checkNPCProximity(); // Then check NPCs (which will skip if in Jitsi room)
    };

    // Render game with tiles
    const render = () => {
      if (!ctx || !canvas) {
        console.log('[Render] Skipping - ctx:', !!ctx, 'canvas:', !!canvas);
        return;
      }
      if (!assetsLoadedRef.current) {
        // Draw loading screen
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2);
        return;
      }

      // Clear canvas
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate viewport (center on player)
      const viewportWidth = Math.ceil(canvas.width / gameState.tileSize);
      const viewportHeight = Math.ceil(canvas.height / gameState.tileSize);
      const viewportX = Math.max(0, Math.min(gameState.player.x - Math.floor(viewportWidth / 2), gameState.mapWidth - viewportWidth));
      const viewportY = Math.max(0, Math.min(gameState.player.y - Math.floor(viewportHeight / 2), gameState.mapHeight - viewportHeight));

      // Draw floor layers
      const floorLayers = mapParser.getFloorLayers();
      floorLayers.forEach(layer => {
        for (let y = 0; y < layer.height; y++) {
          for (let x = 0; x < layer.width; x++) {
            const tileIndex = y * layer.width + x;
            const tileId = layer.data[tileIndex];
            
            if (tileId > 0) {
              const screenX = (x - viewportX) * gameState.tileSize;
              const screenY = (y - viewportY) * gameState.tileSize;
              
              if (screenX >= -gameState.tileSize && screenX < canvas.width &&
                  screenY >= -gameState.tileSize && screenY < canvas.height) {
                tilesetLoader.drawTile(ctx, tileId, screenX, screenY, gameState.tileSize);
              }
            }
          }
        }
      });

      // Draw wall layers
      const wallLayers = mapParser.getWallLayers();
      wallLayers.forEach(layer => {
        for (let y = 0; y < layer.height; y++) {
          for (let x = 0; x < layer.width; x++) {
            const tileIndex = y * layer.width + x;
            const tileId = layer.data[tileIndex];
            
            if (tileId > 0) {
              const screenX = (x - viewportX) * gameState.tileSize;
              const screenY = (y - viewportY) * gameState.tileSize;
              
              if (screenX >= -gameState.tileSize && screenX < canvas.width &&
                  screenY >= -gameState.tileSize && screenY < canvas.height) {
                tilesetLoader.drawTile(ctx, tileId, screenX, screenY, gameState.tileSize);
              }
            }
          }
        }
      });

      // Draw furniture layers
      const furnitureLayers = mapParser.getFurnitureLayers();
      furnitureLayers.forEach(layer => {
        for (let y = 0; y < layer.height; y++) {
          for (let x = 0; x < layer.width; x++) {
            const tileIndex = y * layer.width + x;
            const tileId = layer.data[tileIndex];
            
            if (tileId > 0) {
              const screenX = (x - viewportX) * gameState.tileSize;
              const screenY = (y - viewportY) * gameState.tileSize;
              
              if (screenX >= -gameState.tileSize && screenX < canvas.width &&
                  screenY >= -gameState.tileSize && screenY < canvas.height) {
                tilesetLoader.drawTile(ctx, tileId, screenX, screenY, gameState.tileSize);
              }
            }
          }
        }
      });

      // Collect all entities (NPCs + player + online players) and sort by Y position for proper depth
      const entities = [
        ...gameState.npcs.map((npc, index) => ({
          type: 'npc' as const,
          npc,
          index,
          y: npc.y
        })),
        {
          type: 'player' as const,
          y: gameState.player.y
        },
      ];

      // Sort by Y position so entities further up are drawn first (behind)
      entities.sort((a, b) => a.y - b.y);

      // Draw all entities in sorted order
      entities.forEach(entity => {
        if (entity.type === 'npc') {
          const npc = entity.npc;
          const index = entity.index;
          const screenX = (npc.x - viewportX) * gameState.tileSize;
          const screenY = (npc.y - viewportY) * gameState.tileSize;
          
          if (screenX >= -gameState.tileSize && screenX < canvas.width &&
              screenY >= -gameState.tileSize && screenY < canvas.height) {
            
            // Use cat sprite for cat NPC, otherwise use character sprites
            let characterId: string;
            let facing: 'up' | 'down' | 'left' | 'right' = 'down';
            
            if (npc.id === 'cat') {
              characterId = 'cat_01';
              facing = catAI.direction;
            } else {
              characterId = index % 2 === 0 ? 'male_01' : 'female_01';
            }
            
            characterSpriteManager.drawCharacter(ctx, characterId, screenX, screenY, facing, npc.id === 'cat' ? animationFrame : 0);
            
            // Draw NPC name (skip for cat)
            if (npc.id !== 'cat') {
              ctx.fillStyle = '#ffffff';
              ctx.font = 'bold 10px Arial';
              ctx.textAlign = 'center';
              ctx.fillText(npc.name, screenX + gameState.tileSize / 2, screenY - 5);
              
              // Draw availability indicator
              ctx.fillStyle = npc.available ? '#10b981' : '#ef4444';
              ctx.beginPath();
              ctx.arc(
                screenX + gameState.tileSize - 6,
                screenY + 6,
                3,
                0,
                Math.PI * 2
              );
              ctx.fill();
            }
          }
        } else if (entity.type === 'online_player') {
          // Draw online player
          const player = entity.player;
          const screenX = (player.x - viewportX) * gameState.tileSize;
          const screenY = (player.y - viewportY) * gameState.tileSize;
          
          if (screenX >= -gameState.tileSize && screenX < canvas.width &&
              screenY >= -gameState.tileSize && screenY < canvas.height) {
            
            // Draw online player sprite
            characterSpriteManager.drawCharacter(ctx, player.spriteId, screenX, screenY, player.facing, 0);
            
            // Draw online player name
            ctx.fillStyle = '#60a5fa'; // Blue color for online players
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(player.name, screenX + gameState.tileSize / 2, screenY - 5);
            
            // Draw online indicator
            ctx.fillStyle = '#10b981';
            ctx.beginPath();
            ctx.arc(
              screenX + gameState.tileSize - 6,
              screenY + 6,
              3,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        } else {
          // Draw local player
          const playerScreenX = (gameState.player.x - viewportX) * gameState.tileSize;
          const playerScreenY = (gameState.player.y - viewportY) * gameState.tileSize;
          
          // Draw player sprite with animation
          characterSpriteManager.drawCharacter(ctx, playerSpriteId, playerScreenX, playerScreenY, gameState.player.facing, animationFrame);
          
          // Draw player name
          ctx.fillStyle = '#fbbf24';
          ctx.font = 'bold 10px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(playerName || 'You', playerScreenX + gameState.tileSize / 2, playerScreenY - 5);
        }
      });

      // Draw interaction prompts
      if (pendingJitsiRoom) {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.9)';
        ctx.fillRect(50, canvas.height - 80, canvas.width - 100, 60);
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        const message = pendingJitsiRoom.jitsiTriggerMessage || 'Press SPACE to enter Jitsi meet room';
        ctx.fillText(message, canvas.width / 2, canvas.height - 50);
      }
    };

    // Handle player movement with collision detection
    const handleMovement = () => {
      const speed = 0.15;
      let newX = gameState.player.x;
      let newY = gameState.player.y;
      let newFacing = gameState.player.facing;
      let hasMoved = false;

      if (gameState.keys['ArrowUp'] || gameState.keys['w'] || gameState.mobileControls.up) {
        newY = Math.max(1, gameState.player.y - speed);
        newFacing = 'up';
        hasMoved = true;
      }
      if (gameState.keys['ArrowDown'] || gameState.keys['s'] || gameState.mobileControls.down) {
        newY = Math.min(gameState.mapHeight - 2, gameState.player.y + speed);
        newFacing = 'down';
        hasMoved = true;
      }
      if (gameState.keys['ArrowLeft'] || gameState.keys['a'] || gameState.mobileControls.left) {
        newX = Math.max(1, gameState.player.x - speed);
        newFacing = 'left';
        hasMoved = true;
      }
      if (gameState.keys['ArrowRight'] || gameState.keys['d'] || gameState.mobileControls.right) {
        newX = Math.min(gameState.mapWidth - 2, gameState.player.x + speed);
        newFacing = 'right';
        hasMoved = true;
      }

      // Check collision with map data
      if (!checkWallCollision(newX, newY)) {
        gameState.player.x = newX;
        gameState.player.y = newY;
        gameState.player.facing = newFacing;
        
        // Position updated successfully
      }
    };

    // Check wall collision using map data
    const checkWallCollision = (x: number, y: number) => {
      const gridX = Math.floor(x);
      const gridY = Math.floor(y);
      
      // Check map boundaries
      if (gridX < 1 || gridX >= gameState.mapWidth - 1 || 
          gridY < 1 || gridY >= gameState.mapHeight - 1) {
        return true;
      }
      
      // Check collision layer from map
      return mapParser.isCollisionTile(gridX, gridY);
    };

    // Update cat AI for wandering behavior
    const updateCatAI = () => {
      const cat = gameState.npcs.find(npc => npc.id === 'cat');
      if (!cat) return;

      catAI.moveTimer++;
      catAI.directionChangeTimer++;

      // Change direction randomly every 2-5 seconds (at 60fps)
      if (catAI.directionChangeTimer > 120 + Math.random() * 180) {
        const directions: ('up' | 'down' | 'left' | 'right')[] = ['up', 'down', 'left', 'right'];
        catAI.direction = directions[Math.floor(Math.random() * directions.length)];
        catAI.directionChangeTimer = 0;
      }

      // Move cat in current direction
      let newX = cat.x;
      let newY = cat.y;

      switch (catAI.direction) {
        case 'up':
          newY = cat.y - catAI.speed;
          break;
        case 'down':
          newY = cat.y + catAI.speed;
          break;
        case 'left':
          newX = cat.x - catAI.speed;
          break;
        case 'right':
          newX = cat.x + catAI.speed;
          break;
      }

      // Check collision more thoroughly - check the grid tile the cat is moving into
      const currentGridX = Math.floor(cat.x);
      const currentGridY = Math.floor(cat.y);
      const newGridX = Math.floor(newX);
      const newGridY = Math.floor(newY);
      
      // Check if moving to a new grid tile, and if so, verify it's not a wall
      const isMovingToNewTile = newGridX !== currentGridX || newGridY !== currentGridY;
      const isValidMove = !checkWallCollision(newX, newY) && 
                          (!isMovingToNewTile || !checkWallCollision(newGridX, newGridY));

      if (isValidMove) {
        cat.x = newX;
        cat.y = newY;
      } else {
        // Hit a wall, change direction
        const directions: ('up' | 'down' | 'left' | 'right')[] = ['up', 'down', 'left', 'right'];
        catAI.direction = directions[Math.floor(Math.random() * directions.length)];
        catAI.directionChangeTimer = 0;
      }
    };

    // Check NPC proximity
    const checkNPCProximity = () => {
      // Don't check NPC proximity if we're in a Jitsi room
      if (pendingJitsiRoomRef.current || currentJitsiRoom) {
        setCurrentNPC(null);
        return;
      }

      let nearestNPC = null;
      let minDistance = Infinity;

      gameState.npcs.forEach(npc => {
        const distance = Math.sqrt(
          Math.pow(gameState.player.x - npc.x, 2) + 
          Math.pow(gameState.player.y - npc.y, 2)
        );
        
        if (distance < 1.5 && distance < minDistance) {
          minDistance = distance;
          nearestNPC = npc;
        }
      });

      setCurrentNPC(nearestNPC);
    };

    // Check if player is in a Jitsi meeting room zone
    const checkJitsiRoomProximity = () => {
      const playerX = gameState.player.x;
      const playerY = gameState.player.y;
      
      // Get latest rooms from map parser (in case they weren't loaded yet)
      const rooms = mapParser.getJitsiMeetingRooms();
      if (rooms.length === 0) return;
      
      let currentRoom: JitsiMeetingRoom | null = null;
      
      for (const room of rooms) {
        // Check if player is within the room bounds
        const inRoom = playerX >= room.x && playerX < room.x + room.width &&
                       playerY >= room.y && playerY < room.y + room.height;
        
        if (inRoom) {
          currentRoom = room;
          console.log('[Jitsi] Player in room:', room.name, {
            playerPos: { x: playerX, y: playerY },
            roomBounds: { x: room.x, y: room.y, width: room.width, height: room.height }
          });
          break;
        }
      }

      if (currentRoom) {
        if (currentRoom.jitsiTrigger === 'onenter') {
          // Auto-open Jitsi meeting
          setCurrentJitsiRoom(currentRoom);
          setPendingJitsiRoom(null);
          pendingJitsiRoomRef.current = null;
        } else if (currentRoom.jitsiTrigger === 'onaction') {
          // Show pending room (waiting for spacebar)
          if (pendingJitsiRoomRef.current?.id !== currentRoom.id) {
            console.log('[Jitsi] Entered meeting room:', currentRoom.name, 'at', { x: playerX, y: playerY });
          }
          setPendingJitsiRoom(currentRoom);
          pendingJitsiRoomRef.current = currentRoom;
        }
      } else {
        // Player left all rooms - close if not pending
        if (pendingJitsiRoomRef.current) {
          console.log('[Jitsi] Left meeting room:', pendingJitsiRoomRef.current.name);
        }
        if (!pendingJitsiRoomRef.current) {
          setCurrentJitsiRoom(null);
        }
        setPendingJitsiRoom(null);
        pendingJitsiRoomRef.current = null;
      }
    };

    // Setup controls
    const setupControls = () => {
      // Keyboard controls
      const handleKeyDown = (e: KeyboardEvent) => {
        gameState.keys[e.key] = true;
        
        if (e.key === ' ') {
          e.preventDefault();
          console.log('[Spacebar] Pressed - pendingJitsiRoom:', pendingJitsiRoomRef.current?.name, 'currentNPC:', currentNPC?.name);
          // Check ref first for up-to-date value
          if (pendingJitsiRoomRef.current) {
            console.log('[Jitsi] Opening meeting room:', pendingJitsiRoomRef.current.name);
            // Open Jitsi meeting room
            setCurrentJitsiRoom(pendingJitsiRoomRef.current);
            setPendingJitsiRoom(null);
            pendingJitsiRoomRef.current = null;
            setCurrentNPC(null); // Clear NPC to prevent modal
          }
          // NPC modal functionality removed
        }
      };

      const handleKeyUp = (e: KeyboardEvent) => {
        gameState.keys[e.key] = false;
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      // Mobile controls
      if (window.innerWidth <= 768) {
        createMobileControls();
      }
    };

    // Create mobile controls
    const createMobileControls = () => {
      const controlsDiv = document.createElement('div');
      controlsDiv.className = 'fixed bottom-4 right-4 z-50 glass-effect rounded-lg p-4';
      controlsDiv.innerHTML = `
        <div class="grid grid-cols-3 gap-2 max-w-xs">
          <div></div>
          <button id="mobile-up" class="px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30">↑</button>
          <div></div>
          <button id="mobile-left" class="px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30">←</button>
          <button id="mobile-down" class="px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30">↓</button>
          <button id="mobile-right" class="px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30">→</button>
        </div>
      `;
      document.body.appendChild(controlsDiv);

      // Mobile control events
      const handleMobileControl = (direction: keyof typeof gameState.mobileControls, pressed: boolean) => {
        gameState.mobileControls[direction] = pressed;
        setTimeout(() => {
          gameState.mobileControls[direction] = false;
        }, 100);
      };

      document.getElementById('mobile-up')?.addEventListener('touchstart', () => handleMobileControl('up', true));
      document.getElementById('mobile-up')?.addEventListener('touchend', () => handleMobileControl('up', false));
      document.getElementById('mobile-down')?.addEventListener('touchstart', () => handleMobileControl('down', true));
      document.getElementById('mobile-down')?.addEventListener('touchend', () => handleMobileControl('down', false));
      document.getElementById('mobile-left')?.addEventListener('touchstart', () => handleMobileControl('left', true));
      document.getElementById('mobile-left')?.addEventListener('touchend', () => handleMobileControl('left', false));
      document.getElementById('mobile-right')?.addEventListener('touchstart', () => handleMobileControl('right', true));
      document.getElementById('mobile-right')?.addEventListener('touchend', () => handleMobileControl('right', false));
    };

    // Open meeting modal
    // NPC meeting modal removed - using Jitsi rooms instead

    // Start rendering immediately (shows loading screen)
    gameLoop();
    
    // Start game initialization
    initGame();

    return () => {
      // Cleanup
      window.removeEventListener('keydown', () => {});
      window.removeEventListener('keyup', () => {});
      document.querySelectorAll('.fixed').forEach(el => el.remove());
    };
  }, [playerName]); // Only re-run when playerName changes

  // Animation frame counter
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(prev => (prev + 1) % 4);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Debug logging
  console.log('[Game] Render - playerName:', playerName, 'gameLoaded:', gameLoaded);

  return (
    <>
      {!playerName && (
        <>
          <div className="fixed inset-0 bg-red-500/20 z-50 pointer-events-none" />
          <NameModal onSubmit={handleNameSubmit} />
        </>
      )}
      
      <div className="w-full h-full flex items-center justify-center bg-black relative">
        <canvas 
          ref={canvasRef}
          width={1024}
          height={768}
          className="border border-white/20 rounded-lg max-w-full"
          style={{ imageRendering: 'pixelated' }}
        />
        {!gameLoaded && playerName && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="text-white text-xl">
              {assetsLoaded ? 'Loading Community Map...' : 'Loading Assets...'}
            </div>
          </div>
        )}
        {currentJitsiRoom && (
          <JitsiMeeting 
            room={currentJitsiRoom} 
            onClose={() => setCurrentJitsiRoom(null)} 
          />
        )}
      </div>
    </>
  );
}
