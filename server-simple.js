/**
 * Simple ZombieFront.io Server (JavaScript)
 * Quick server for development
 */

import express from 'express';
import { WebSocketServer } from 'ws';
import compression from 'compression';
import { createServer } from 'http';

const PORT = 3000;
const WS_PORT = 3001;

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(compression());
app.use(express.json());
app.use(express.static('dist/client'));

// Basic routes
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.get('/api/status', (_req, res) => {
  res.json({
    server: 'ZombieFront.io',
    version: '0.1.0',
    players: connectedPlayers.size,
    uptime: process.uptime()
  });
});

// WebSocket Server
const wss = new WebSocketServer({ port: WS_PORT });
const connectedPlayers = new Map();

wss.on('connection', (ws) => {
  const playerId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  connectedPlayers.set(playerId, ws);

  console.log(`✅ Player ${playerId.slice(0, 15)}... connected (Total: ${connectedPlayers.size})`);

  ws.send(JSON.stringify({
    type: 'connected',
    playerId,
    message: 'Welcome to ZombieFront.io!'
  }));

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());

      switch (message.type) {
        case 'ping':
          ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
          break;

        case 'join_game':
          const playerData = {
            id: playerId,
            name: message.name || `Survivor_${playerId.slice(0, 6)}`,
            joinedAt: Date.now()
          };

          ws.send(JSON.stringify({
            type: 'game_joined',
            player: playerData,
            gameState: {
              map: { width: 50, height: 50 },
              players: connectedPlayers.size
            }
          }));

          broadcast({
            type: 'player_joined',
            player: playerData
          }, playerId);
          break;

        default:
          console.log('Unknown message:', message.type);
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  ws.on('close', () => {
    connectedPlayers.delete(playerId);
    console.log(`❌ Player disconnected (Total: ${connectedPlayers.size})`);

    broadcast({
      type: 'player_left',
      playerId
    }, playerId);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

function broadcast(message, excludePlayerId) {
  const data = JSON.stringify(message);
  connectedPlayers.forEach((ws, id) => {
    if (id !== excludePlayerId && ws.readyState === 1) {
      ws.send(data);
    }
  });
}

// Start server
httpServer.listen(PORT, () => {
  console.log('\n🧟 ZombieFront.io Server');
  console.log('================================');
  console.log(`HTTP:      http://localhost:${PORT}`);
  console.log(`WebSocket: ws://localhost:${WS_PORT}`);
  console.log(`Mode:      Development`);
  console.log('================================\n');
});

// Heartbeat
setInterval(() => {
  if (connectedPlayers.size > 0) {
    broadcast({
      type: 'heartbeat',
      timestamp: Date.now(),
      players: connectedPlayers.size
    });
  }
}, 1000);

// Shutdown
process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down...');
  wss.close(() => {
    httpServer.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});

console.log('Starting ZombieFront.io Server...');
