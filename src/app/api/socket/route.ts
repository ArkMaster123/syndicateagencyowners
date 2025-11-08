import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { NextRequest } from 'next/server';

// Store for online players
const onlinePlayers = new Map<string, {
  id: string;
  name: string;
  x: number;
  y: number;
  facing: 'up' | 'down' | 'left' | 'right';
  spriteId: string;
}>();

let io: SocketIOServer | null = null;

// Initialize Socket.IO server
function initSocketServer(httpServer: HTTPServer) {
  if (io) return io;

  io = new SocketIOServer(httpServer, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('[Socket.IO] Client connected:', socket.id);

    // Handle player join
    socket.on('player-join', (data: { name: string; x: number; y: number; facing: string; spriteId: string }) => {
      console.log('[Socket.IO] Player joined:', data.name, socket.id);

      const player = {
        id: socket.id,
        name: data.name,
        x: data.x,
        y: data.y,
        facing: data.facing as 'up' | 'down' | 'left' | 'right',
        spriteId: data.spriteId
      };

      onlinePlayers.set(socket.id, player);

      // Send current online players to new player
      const playersArray = Array.from(onlinePlayers.values());
      socket.emit('players-list', playersArray);

      // Broadcast new player to all other clients
      socket.broadcast.emit('player-joined', player);
    });

    // Handle player movement
    socket.on('player-moved', (data: { x: number; y: number; facing: string }) => {
      const player = onlinePlayers.get(socket.id);
      if (player) {
        player.x = data.x;
        player.y = data.y;
        player.facing = data.facing as 'up' | 'down' | 'left' | 'right';
        onlinePlayers.set(socket.id, player);

        // Broadcast movement to all other clients
        socket.broadcast.emit('player-moved', {
          id: socket.id,
          x: data.x,
          y: data.y,
          facing: data.facing
        });
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('[Socket.IO] Client disconnected:', socket.id);
      onlinePlayers.delete(socket.id);

      // Broadcast player left to all clients
      socket.broadcast.emit('player-left', { id: socket.id });
    });
  });

  return io;
}

// This is a workaround for Next.js App Router
// Socket.IO needs to be attached to the HTTP server
export async function GET(req: NextRequest) {
  // In production, you'll need a custom server
  // For development, we'll use a different approach
  return new Response(
    JSON.stringify({
      error: 'Socket.IO requires a custom server. Please use the standalone socket server.'
    }),
    { status: 501, headers: { 'Content-Type': 'application/json' } }
  );
}
