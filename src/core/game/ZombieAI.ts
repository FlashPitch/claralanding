/**
 * ZombieFront.io - Zombie AI System
 * Manages zombie behavior, pathfinding, and horde formation
 */

import {
  Zombie,
  ZombieType,
  ZombieState,
  ZombieStats,
  Horde,
  Coordinates,
  MapTile,
  Survivor,
  Structure,
  GameEvent,
  GameEventType
} from '../types/GameTypes';

/**
 * Simple pathfinding node for A* algorithm
 */
interface PathNode {
  coord: Coordinates;
  g: number; // Cost from start
  h: number; // Heuristic to goal
  f: number; // Total cost
  parent: PathNode | null;
}

export class ZombieAI {
  private zombies: Map<string, Zombie>;
  private hordes: Map<string, Horde>;
  private eventCallbacks: ((event: GameEvent) => void)[] = [];

  constructor() {
    this.zombies = new Map();
    this.hordes = new Map();
  }

  /**
   * Create a new zombie
   */
  public spawnZombie(
    type: ZombieType,
    position: Coordinates
  ): Zombie {
    const stats = this.getDefaultStats(type);

    const zombie: Zombie = {
      id: this.generateId(),
      type,
      position,
      stats,
      target: null,
      state: ZombieState.IDLE,
      hordeId: null
    };

    this.zombies.set(zombie.id, zombie);

    return zombie;
  }

  /**
   * Get default stats for a zombie type
   */
  private getDefaultStats(type: ZombieType): ZombieStats {
    const statsMap: Record<ZombieType, ZombieStats> = {
      [ZombieType.WALKER]: {
        health: 50,
        maxHealth: 50,
        attack: 5,
        defense: 2,
        speed: 1,
        infectionChance: 0.2,
        detectionRange: 5
      },
      [ZombieType.RUNNER]: {
        health: 30,
        maxHealth: 30,
        attack: 8,
        defense: 1,
        speed: 3,
        infectionChance: 0.15,
        detectionRange: 8
      },
      [ZombieType.TANK]: {
        health: 150,
        maxHealth: 150,
        attack: 15,
        defense: 8,
        speed: 0.5,
        infectionChance: 0.3,
        detectionRange: 4
      },
      [ZombieType.SPITTER]: {
        health: 40,
        maxHealth: 40,
        attack: 10,
        defense: 1,
        speed: 1.5,
        infectionChance: 0.4,
        detectionRange: 10
      },
      [ZombieType.HORDE]: {
        health: 100,
        maxHealth: 100,
        attack: 20,
        defense: 5,
        speed: 2,
        infectionChance: 0.25,
        detectionRange: 12
      }
    };

    return { ...statsMap[type] };
  }

  /**
   * Update all zombies
   */
  public update(
    deltaTime: number,
    survivors: Survivor[],
    structures: Structure[],
    tiles: Map<string, MapTile>
  ): void {
    this.zombies.forEach((zombie) => {
      this.updateZombie(zombie, deltaTime, survivors, structures, tiles);
    });

    // Update hordes
    this.updateHordes(deltaTime);
  }

  /**
   * Update a single zombie's behavior
   */
  private updateZombie(
    zombie: Zombie,
    deltaTime: number,
    survivors: Survivor[],
    structures: Structure[],
    tiles: Map<string, MapTile>
  ): void {
    // If part of horde, horde controls movement
    if (zombie.hordeId) {
      return;
    }

    switch (zombie.state) {
      case ZombieState.IDLE:
        this.handleIdleState(zombie, survivors, structures);
        break;

      case ZombieState.WANDERING:
        this.handleWanderingState(zombie, survivors, structures, tiles);
        break;

      case ZombieState.CHASING:
        this.handleChasingState(zombie, deltaTime);
        break;

      case ZombieState.ATTACKING:
        this.handleAttackingState(zombie);
        break;

      case ZombieState.FEEDING:
        this.handleFeedingState(zombie);
        break;
    }
  }

  /**
   * Handle idle state - look for targets
   */
  private handleIdleState(
    zombie: Zombie,
    survivors: Survivor[],
    structures: Structure[]
  ): void {
    // Detect nearby survivors or structures
    const target = this.findNearestTarget(zombie, survivors, structures);

    if (target) {
      zombie.target = target;
      zombie.state = ZombieState.CHASING;
    } else {
      // Start wandering
      zombie.state = ZombieState.WANDERING;
      zombie.target = this.getRandomNearbyPosition(zombie.position, 10);
    }
  }

  /**
   * Handle wandering state - random movement
   */
  private handleWanderingState(
    zombie: Zombie,
    survivors: Survivor[],
    structures: Structure[],
    tiles: Map<string, MapTile>
  ): void {
    // Check for targets while wandering
    const target = this.findNearestTarget(zombie, survivors, structures);

    if (target) {
      zombie.target = target;
      zombie.state = ZombieState.CHASING;
      return;
    }

    // Move towards wander target
    if (zombie.target) {
      this.moveTowards(zombie, zombie.target, zombie.stats.speed);

      // Reached wander target
      if (this.distance(zombie.position, zombie.target) < 1) {
        zombie.state = ZombieState.IDLE;
        zombie.target = null;
      }
    }
  }

  /**
   * Handle chasing state - pursue target
   */
  private handleChasingState(zombie: Zombie, deltaTime: number): void {
    if (!zombie.target) {
      zombie.state = ZombieState.IDLE;
      return;
    }

    // Move towards target
    this.moveTowards(zombie, zombie.target, zombie.stats.speed * deltaTime);

    // Check if reached target
    const dist = this.distance(zombie.position, zombie.target);
    if (dist < 1.5) {
      zombie.state = ZombieState.ATTACKING;
    }

    // Lost target (too far)
    if (dist > zombie.stats.detectionRange * 2) {
      zombie.state = ZombieState.IDLE;
      zombie.target = null;
    }
  }

  /**
   * Handle attacking state
   */
  private handleAttackingState(zombie: Zombie): void {
    if (!zombie.target) {
      zombie.state = ZombieState.IDLE;
      return;
    }

    // Attack logic handled by combat system
    // Zombie just maintains attack state

    // Check if target still in range
    const dist = this.distance(zombie.position, zombie.target);
    if (dist > 2) {
      zombie.state = ZombieState.CHASING;
    }
  }

  /**
   * Handle feeding state
   */
  private handleFeedingState(zombie: Zombie): void {
    // Zombies feed for a duration then return to idle
    setTimeout(() => {
      zombie.state = ZombieState.IDLE;
    }, 3000);
  }

  /**
   * Find nearest target (survivor or structure)
   */
  private findNearestTarget(
    zombie: Zombie,
    survivors: Survivor[],
    structures: Structure[]
  ): Coordinates | null {
    let nearest: Coordinates | null = null;
    let minDistance = zombie.stats.detectionRange;

    // Check survivors
    survivors.forEach((survivor) => {
      const dist = this.distance(zombie.position, survivor.position);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = survivor.position;
      }
    });

    // Check structures
    structures.forEach((structure) => {
      const dist = this.distance(zombie.position, structure.position);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = structure.position;
      }
    });

    return nearest;
  }

  /**
   * Form a horde from nearby zombies
   */
  public formHorde(zombieIds: string[]): Horde | null {
    if (zombieIds.length < 10) {
      return null; // Minimum horde size
    }

    const hordeZombies: Zombie[] = [];
    let totalX = 0;
    let totalY = 0;
    let totalStrength = 0;
    let totalSpeed = 0;

    zombieIds.forEach((id) => {
      const zombie = this.zombies.get(id);
      if (zombie) {
        hordeZombies.push(zombie);
        totalX += zombie.position.x;
        totalY += zombie.position.y;
        totalStrength += zombie.stats.attack + zombie.stats.health;
        totalSpeed += zombie.stats.speed;
      }
    });

    if (hordeZombies.length === 0) return null;

    const hordeId = this.generateId();
    const center: Coordinates = {
      x: totalX / hordeZombies.length,
      y: totalY / hordeZombies.length
    };

    const horde: Horde = {
      id: hordeId,
      zombies: hordeZombies,
      center,
      direction: { x: 0, y: 0 },
      strength: totalStrength,
      speed: totalSpeed / hordeZombies.length
    };

    // Mark zombies as part of horde
    hordeZombies.forEach((z) => {
      z.hordeId = hordeId;
    });

    this.hordes.set(hordeId, horde);

    this.emitEvent({
      type: GameEventType.HORDE_SPAWNED,
      timestamp: Date.now(),
      data: { hordeId, size: hordeZombies.length }
    });

    return horde;
  }

  /**
   * Update horde movement and behavior
   */
  private updateHordes(deltaTime: number): void {
    this.hordes.forEach((horde) => {
      // Recalculate center
      let totalX = 0;
      let totalY = 0;
      let aliveCount = 0;

      horde.zombies.forEach((zombie) => {
        if (zombie.stats.health > 0) {
          totalX += zombie.position.x;
          totalY += zombie.position.y;
          aliveCount++;
        }
      });

      if (aliveCount === 0) {
        // Horde destroyed
        this.hordes.delete(horde.id);
        return;
      }

      horde.center = {
        x: totalX / aliveCount,
        y: totalY / aliveCount
      };

      // Move horde towards direction
      horde.zombies.forEach((zombie) => {
        if (zombie.stats.health > 0) {
          this.moveTowards(zombie, {
            x: horde.center.x + horde.direction.x,
            y: horde.center.y + horde.direction.y
          }, horde.speed * deltaTime);
        }
      });
    });
  }

  /**
   * Set horde direction (for player-controlled hordes)
   */
  public setHordeDirection(hordeId: string, direction: Coordinates): void {
    const horde = this.hordes.get(hordeId);
    if (horde) {
      horde.direction = direction;
    }
  }

  /**
   * Pathfinding using simplified A* algorithm
   */
  public calculatePath(
    from: Coordinates,
    to: Coordinates,
    tiles: Map<string, MapTile>
  ): Coordinates[] {
    // Simplified pathfinding for performance
    // In production, use a proper A* implementation

    const path: Coordinates[] = [];
    const current = { ...from };
    const maxSteps = 100;
    let steps = 0;

    while (this.distance(current, to) > 1 && steps < maxSteps) {
      const dx = to.x - current.x;
      const dy = to.y - current.y;

      // Normalize and step
      const dist = Math.sqrt(dx * dx + dy * dy);
      current.x += dx / dist;
      current.y += dy / dist;

      path.push({ ...current });
      steps++;
    }

    return path;
  }

  /**
   * Move zombie towards target
   */
  private moveTowards(
    zombie: Zombie,
    target: Coordinates,
    speed: number
  ): void {
    const dx = target.x - zombie.position.x;
    const dy = target.y - zombie.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
      zombie.position.x += (dx / dist) * speed;
      zombie.position.y += (dy / dist) * speed;
    }
  }

  /**
   * Calculate distance between two points
   */
  private distance(a: Coordinates, b: Coordinates): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Get random nearby position
   */
  private getRandomNearbyPosition(
    center: Coordinates,
    radius: number
  ): Coordinates {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * radius;

    return {
      x: center.x + Math.cos(angle) * r,
      y: center.y + Math.sin(angle) * r
    };
  }

  /**
   * Spawn a wave of zombies
   */
  public spawnWave(
    intensity: number,
    spawnPoints: Coordinates[]
  ): Zombie[] {
    const zombies: Zombie[] = [];
    const zombieCount = Math.floor(intensity * 10);

    for (let i = 0; i < zombieCount; i++) {
      const spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];

      // Distribute zombie types
      let type: ZombieType;
      const rand = Math.random();

      if (rand < 0.6) type = ZombieType.WALKER;
      else if (rand < 0.8) type = ZombieType.RUNNER;
      else if (rand < 0.95) type = ZombieType.SPITTER;
      else type = ZombieType.TANK;

      const zombie = this.spawnZombie(type, spawnPoint);
      zombies.push(zombie);
    }

    return zombies;
  }

  /**
   * Adjust difficulty based on player performance
   */
  public adjustDifficulty(playerCount: number, averageLevel: number): void {
    // Spawn more/stronger zombies based on players
    const difficultyMultiplier = 1 + (playerCount * 0.2) + (averageLevel * 0.1);

    // This would affect spawn rates and zombie stats
    // Implementation depends on game balance
  }

  /**
   * Remove a zombie
   */
  public removeZombie(zombieId: string): void {
    const zombie = this.zombies.get(zombieId);
    if (!zombie) return;

    // Remove from horde if part of one
    if (zombie.hordeId) {
      const horde = this.hordes.get(zombie.hordeId);
      if (horde) {
        horde.zombies = horde.zombies.filter((z) => z.id !== zombieId);
      }
    }

    this.zombies.delete(zombieId);
  }

  /**
   * Get all zombies
   */
  public getAllZombies(): Map<string, Zombie> {
    return this.zombies;
  }

  /**
   * Get all hordes
   */
  public getAllHordes(): Map<string, Horde> {
    return this.hordes;
  }

  /**
   * Register event callback
   */
  public onEvent(callback: (event: GameEvent) => void): void {
    this.eventCallbacks.push(callback);
  }

  /**
   * Emit an event
   */
  private emitEvent(event: GameEvent): void {
    this.eventCallbacks.forEach((callback) => callback(event));
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `zombie_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default ZombieAI;
