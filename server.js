const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// Prepare Next.js app
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

// Store for online players
const onlinePlayers = new Map();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Initialize Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('[Socket.IO] Client connected:', socket.id);

    // Handle player join
    socket.on('player-join', (data) => {
      console.log('[Socket.IO] Player joined:', data.name, socket.id);

      const player = {
        id: socket.id,
        name: data.name,
        x: data.x,
        y: data.y,
        facing: data.facing,
        spriteId: data.spriteId
      };

      onlinePlayers.set(socket.id, player);

      // Send current online players to new player
      const playersArray = Array.from(onlinePlayers.values());
      socket.emit('players-list', playersArray);

      // Broadcast new player to all other clients
      socket.broadcast.emit('player-joined', player);

      console.log('[Socket.IO] Total players online:', onlinePlayers.size);
    });

    // Handle player movement
    socket.on('player-moved', (data) => {
      const player = onlinePlayers.get(socket.id);
      if (player) {
        player.x = data.x;
        player.y = data.y;
        player.facing = data.facing;
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
      const player = onlinePlayers.get(socket.id);
      if (player) {
        console.log('[Socket.IO] Player left:', player.name);
      }
      onlinePlayers.delete(socket.id);

      // Broadcast player left to all clients
      socket.broadcast.emit('player-left', { id: socket.id });

      console.log('[Socket.IO] Total players online:', onlinePlayers.size);
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Socket.IO server running`);
    });
});
