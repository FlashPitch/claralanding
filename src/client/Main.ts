/**
 * ZombieFront.io - Client Main Entry Point
 * Initializes the game client and rendering
 */

import { Application } from 'pixi.js';

class ZombieFrontClient {
  private app: Application;
  private ws: WebSocket | null = null;
  private playerId: string | null = null;
  private isConnected: boolean = false;

  constructor() {
    this.app = new Application();
    this.init();
  }

  /**
   * Initialize the client
   */
  private async init() {
    console.log('🧟 ZombieFront.io Client Initializing...');

    // Initialize Pixi.js
    await this.initPixi();

    // Setup UI
    this.setupUI();

    // Connect to server
    this.connectToServer();

    // Start game loop
    this.startGameLoop();

    console.log('✅ Client initialized successfully!');
  }

  /**
   * Initialize Pixi.js application
   */
  private async initPixi() {
    await this.app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1a1a1a,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true
    });

    // Add canvas to DOM
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      gameContainer.appendChild(this.app.canvas);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    console.log('✅ Pixi.js initialized');
  }

  /**
   * Setup UI elements
   */
  private setupUI() {
    // Update status
    this.updateStatus('Connecting to server...');

    // Setup event listeners
    const joinButton = document.getElementById('join-game');
    if (joinButton) {
      joinButton.addEventListener('click', () => this.joinGame());
    }

    console.log('✅ UI setup complete');
  }

  /**
   * Connect to WebSocket server
   */
  private connectToServer() {
    const wsUrl = `ws://localhost:3001`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('✅ Connected to server');
        this.isConnected = true;
        this.updateStatus('Connected! Ready to play.');
      };

      this.ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        this.handleServerMessage(message);
      };

      this.ws.onclose = () => {
        console.log('❌ Disconnected from server');
        this.isConnected = false;
        this.updateStatus('Disconnected from server');

        // Try to reconnect after 3 seconds
        setTimeout(() => this.connectToServer(), 3000);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.updateStatus('Connection error');
      };

    } catch (error) {
      console.error('Failed to connect:', error);
      this.updateStatus('Failed to connect to server');
    }
  }

  /**
   * Handle messages from server
   */
  private handleServerMessage(message: any) {
    console.log('Server message:', message.type);

    switch (message.type) {
      case 'connected':
        this.playerId = message.playerId;
        console.log('Player ID:', this.playerId);
        break;

      case 'game_joined':
        console.log('Joined game:', message);
        this.onGameJoined(message);
        break;

      case 'player_joined':
        console.log('Player joined:', message.player);
        break;

      case 'player_left':
        console.log('Player left:', message.playerId);
        break;

      case 'heartbeat':
        // Server heartbeat, could update UI
        this.updatePlayerCount(message.players);
        break;

      case 'pong':
        // Ping response
        break;

      default:
        console.log('Unknown message type:', message.type);
    }
  }

  /**
   * Join the game
   */
  private joinGame() {
    if (!this.isConnected || !this.ws) {
      alert('Not connected to server!');
      return;
    }

    const nameInput = document.getElementById('player-name') as HTMLInputElement;
    const playerName = nameInput?.value || 'Anonymous';

    this.ws.send(JSON.stringify({
      type: 'join_game',
      name: playerName
    }));

    console.log('Joining game as:', playerName);
  }

  /**
   * Handle game joined
   */
  private onGameJoined(data: any) {
    // Hide menu, show game
    const menu = document.getElementById('menu');
    const gameUI = document.getElementById('game-ui');

    if (menu) menu.style.display = 'none';
    if (gameUI) gameUI.style.display = 'block';

    this.updateStatus(`Playing as ${data.player.name}`);

    // Initialize game graphics
    this.initGameGraphics();
  }

  /**
   * Initialize game graphics
   */
  private initGameGraphics() {
    // Create a simple welcome text
    const text = new PIXI.Text({
      text: '🧟 ZombieFront.io\n\nGame Starting...',
      style: {
        fontFamily: 'Arial',
        fontSize: 48,
        fill: 0x00ff00,
        align: 'center'
      }
    });

    text.anchor.set(0.5);
    text.x = this.app.screen.width / 2;
    text.y = this.app.screen.height / 2;

    this.app.stage.addChild(text);

    console.log('✅ Game graphics initialized');
  }

  /**
   * Start game loop
   */
  private startGameLoop() {
    this.app.ticker.add((delta) => {
      this.update(delta.deltaTime);
    });

    console.log('✅ Game loop started');
  }

  /**
   * Update game state
   */
  private update(deltaTime: number) {
    // Game update logic goes here
    // For now, just rotating text if it exists
    if (this.app.stage.children.length > 0) {
      this.app.stage.children.forEach((child) => {
        if (child instanceof PIXI.Text) {
          child.rotation += 0.001 * deltaTime;
        }
      });
    }
  }

  /**
   * Update status message
   */
  private updateStatus(message: string) {
    const statusElement = document.getElementById('status');
    if (statusElement) {
      statusElement.textContent = message;
    }
  }

  /**
   * Update player count
   */
  private updatePlayerCount(count: number) {
    const countElement = document.getElementById('player-count');
    if (countElement) {
      countElement.textContent = `Players: ${count}`;
    }
  }

  /**
   * Send ping to server
   */
  public ping() {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify({ type: 'ping' }));
    }
  }
}

// Initialize client when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  const client = new ZombieFrontClient();

  // Expose client for debugging
  (window as any).zombieFront = client;

  // Send ping every 5 seconds to keep connection alive
  setInterval(() => client.ping(), 5000);
});
