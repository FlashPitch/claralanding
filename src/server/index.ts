/**
 * ZombieFront.io - Game Server
 * Main server entry point
 */

import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import compression from 'compression';
import { createServer } from 'http';

const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 3001;

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(compression());
app.use(express.json());
app.use(express.static('dist/client'));

// Basic routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.get('/api/status', (req, res) => {
  res.json({
    server: 'ZombieFront.io',
    version: '0.1.0',
    players: connectedPlayers.size,
    uptime: process.uptime()
  });
});

// WebSocket Server for game communication
const wss = new WebSocketServer({ port: WS_PORT });

const connectedPlayers = new Map<string, WebSocket>();

wss.on('connection', (ws: WebSocket) => {
  const playerId = generatePlayerId();
  connectedPlayers.set(playerId, ws);

  console.log(`Player ${playerId} connected. Total players: ${connectedPlayers.size}`);

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connected',
    playerId,
    message: 'Welcome to ZombieFront.io!'
  }));

  // Handle incoming messages
  ws.on('message', (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString());
      handlePlayerMessage(playerId, message, ws);
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  // Handle disconnect
  ws.on('close', () => {
    connectedPlayers.delete(playerId);
    console.log(`Player ${playerId} disconnected. Total players: ${connectedPlayers.size}`);

    // Broadcast to other players
    broadcast({
      type: 'player_left',
      playerId
    }, playerId);
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error(`WebSocket error for player ${playerId}:`, error);
  });
});

/**
 * Handle player messages
 */
function handlePlayerMessage(playerId: string, message: any, ws: WebSocket) {
  console.log(`Message from ${playerId}:`, message.type);

  switch (message.type) {
    case 'ping':
      ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
      break;

    case 'chat':
      broadcast({
        type: 'chat',
        playerId,
        message: message.content,
        timestamp: Date.now()
      });
      break;

    case 'join_game':
      handleJoinGame(playerId, message, ws);
      break;

    case 'player_action':
      handlePlayerAction(playerId, message);
      break;

    default:
      console.log('Unknown message type:', message.type);
  }
}

/**
 * Handle player joining game
 */
function handleJoinGame(playerId: string, message: any, ws: WebSocket) {
  const playerData = {
    id: playerId,
    name: message.name || `Player_${playerId.slice(0, 6)}`,
    joinedAt: Date.now()
  };

  ws.send(JSON.stringify({
    type: 'game_joined',
    player: playerData,
    gameState: {
      map: { width: 50, height: 50 },
      players: Array.from(connectedPlayers.keys()).length
    }
  }));

  // Broadcast to other players
  broadcast({
    type: 'player_joined',
    player: playerData
  }, playerId);
}

/**
 * Handle player action
 */
function handlePlayerAction(playerId: string, message: any) {
  // Broadcast action to all players
  broadcast({
    type: 'player_action',
    playerId,
    action: message.action,
    timestamp: Date.now()
  });
}

/**
 * Broadcast message to all connected players
 */
function broadcast(message: any, excludePlayerId?: string) {
  const data = JSON.stringify(message);

  connectedPlayers.forEach((ws, id) => {
    if (id !== excludePlayerId && ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
}

/**
 * Generate unique player ID
 */
function generatePlayerId(): string {
  return `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Start HTTP server
httpServer.listen(PORT, () => {
  console.log(`\n🧟 ZombieFront.io Server`);
  console.log(`================================`);
  console.log(`HTTP Server: http://localhost:${PORT}`);
  console.log(`WebSocket:   ws://localhost:${WS_PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`================================\n`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  wss.close(() => {
    httpServer.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});

// Game loop (simplified for now)
let lastUpdate = Date.now();
const TICK_RATE = 30; // 30 updates per second

setInterval(() => {
  const now = Date.now();
  const deltaTime = (now - lastUpdate) / 1000;
  lastUpdate = now;

  // Game update logic would go here
  // For now, just send heartbeat
  if (connectedPlayers.size > 0 && deltaTime > 0) {
    broadcast({
      type: 'heartbeat',
      timestamp: now,
      players: connectedPlayers.size
    });
  }
}, 1000 / TICK_RATE);
