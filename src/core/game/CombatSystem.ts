/**
 * ZombieFront.io - Combat System
 * Handles combat between survivors and zombies
 */

import {
  Survivor,
  Zombie,
  Structure,
  Attack,
  CombatResult,
  CombatEvent,
  GameEvent,
  GameEventType,
  GAME_CONFIG
} from '../types/GameTypes';
import { InfectionManager } from './InfectionSystem';

export class CombatSystem {
  private infectionManager: InfectionManager;
  private eventCallbacks: ((event: GameEvent) => void)[] = [];
  private combatHistory: CombatEvent[] = [];

  constructor(infectionManager: InfectionManager) {
    this.infectionManager = infectionManager;
  }

  /**
   * Execute combat between a survivor and a zombie
   */
  public combatSurvivorVsZombie(
    survivor: Survivor,
    zombie: Zombie
  ): CombatResult {
    const attack = this.calculateAttack(survivor, zombie);
    const result = this.resolveAttack(attack, zombie, survivor);

    // Check for infection
    if (!result.killed && Math.random() < zombie.stats.infectionChance) {
      this.infectionManager.infectSurvivor(survivor, 'zombie_bite');
      result.infected = true;
    }

    // Record combat event
    this.recordCombat(survivor, zombie, result);

    return result;
  }

  /**
   * Execute combat between a structure and zombies
   */
  public combatStructureVsZombies(
    structure: Structure,
    zombies: Zombie[]
  ): Map<string, CombatResult> {
    const results = new Map<string, CombatResult>();

    if (!structure.stats.attackDamage || structure.stats.attackRange === 0) {
      return results; // Structure cannot attack
    }

    zombies.forEach((zombie) => {
      const distance = this.calculateDistance(
        structure.position,
        zombie.position
      );

      if (distance <= structure.stats.attackRange) {
        const attack: Attack = {
          attacker: structure.id,
          target: zombie.id,
          damage: structure.stats.attackDamage,
          hitChance: 0.85, // Structures are more accurate
          infectionChance: 0,
          criticalHit: false
        };

        const result = this.resolveAttack(attack, zombie);
        results.set(zombie.id, result);
      }
    });

    return results;
  }

  /**
   * Zombie attacks survivor or structure
   */
  public zombieAttack(
    zombie: Zombie,
    target: Survivor | Structure
  ): CombatResult {
    const attack: Attack = {
      attacker: zombie.id,
      target: target.id,
      damage: zombie.stats.attack,
      hitChance: 0.7,
      infectionChance: zombie.stats.infectionChance,
      criticalHit: false
    };

    const result = this.resolveAttack(attack, target);

    // Try to infect if target is survivor
    if ('isInfected' in target && !result.killed) {
      if (Math.random() < zombie.stats.infectionChance) {
        this.infectionManager.infectSurvivor(target, 'zombie_attack');
        result.infected = true;
      }
    }

    return result;
  }

  /**
   * Calculate attack parameters
   */
  private calculateAttack(
    attacker: Survivor | Structure,
    target: Zombie | Survivor | Structure
  ): Attack {
    const attackerStats = 'stats' in attacker ? attacker.stats : attacker.stats;
    const baseDamage = attackerStats.attack || 0;

    // Check for critical hit
    const criticalHit = Math.random() < GAME_CONFIG.CRITICAL_HIT_CHANCE;
    const damage = criticalHit
      ? baseDamage * GAME_CONFIG.CRITICAL_MULTIPLIER
      : baseDamage;

    // Calculate hit chance based on attacker type
    let hitChance = 0.75; // Base 75%
    if ('type' in attacker) {
      if (attacker.type === 'soldier') hitChance = 0.85;
      else if (attacker.type === 'scout') hitChance = 0.8;
    }

    return {
      attacker: attacker.id,
      target: target.id,
      damage,
      hitChance,
      infectionChance: 0,
      criticalHit
    };
  }

  /**
   * Resolve an attack against a target
   */
  private resolveAttack(
    attack: Attack,
    target: Zombie | Survivor | Structure,
    attacker?: Survivor
  ): CombatResult {
    const result: CombatResult = {
      damage: 0,
      killed: false,
      infected: false,
      criticalHit: attack.criticalHit
    };

    // Check if attack hits
    if (Math.random() > attack.hitChance) {
      return result; // Miss
    }

    // Calculate damage after defense
    const targetStats = target.stats;
    const actualDamage = Math.max(1, attack.damage - (targetStats.defense || 0));

    result.damage = actualDamage;
    targetStats.health -= actualDamage;

    // Check if target is killed
    if (targetStats.health <= 0) {
      targetStats.health = 0;
      result.killed = true;

      this.emitEvent({
        type: GameEventType.UNIT_KILLED,
        timestamp: Date.now(),
        data: { targetId: target.id, attackerId: attack.attacker }
      });
    }

    return result;
  }

  /**
   * Mass combat between multiple units
   */
  public massiveCombat(
    survivors: Survivor[],
    zombies: Zombie[],
    structures: Structure[]
  ): CombatEvent {
    const combatEvent: CombatEvent = {
      id: this.generateId(),
      timestamp: Date.now(),
      location: survivors[0]?.position || zombies[0]?.position || { x: 0, y: 0 },
      attackers: [...survivors, ...structures],
      defenders: zombies,
      attackerCasualties: 0,
      defenderCasualties: 0,
      newInfections: 0,
      winner: 'draw'
    };

    // Survivors attack zombies
    survivors.forEach((survivor) => {
      const nearestZombie = this.findNearestTarget(survivor.position, zombies);
      if (nearestZombie) {
        const result = this.combatSurvivorVsZombie(survivor, nearestZombie);
        if (result.killed) combatEvent.defenderCasualties++;
        if (result.infected) combatEvent.newInfections++;
      }
    });

    // Structures attack zombies
    structures.forEach((structure) => {
      const nearbyZombies = this.findNearbyTargets(
        structure.position,
        zombies,
        structure.stats.attackRange
      );
      const results = this.combatStructureVsZombies(structure, nearbyZombies);
      results.forEach((result) => {
        if (result.killed) combatEvent.defenderCasualties++;
      });
    });

    // Zombies counter-attack
    zombies.filter(z => z.stats.health > 0).forEach((zombie) => {
      const target = this.findNearestTarget(
        zombie.position,
        [...survivors, ...structures]
      );
      if (target) {
        const result = this.zombieAttack(zombie, target);
        if (result.killed) combatEvent.attackerCasualties++;
        if (result.infected) combatEvent.newInfections++;
      }
    });

    // Determine winner
    if (combatEvent.defenderCasualties > combatEvent.attackerCasualties) {
      combatEvent.winner = 'attackers';
    } else if (combatEvent.attackerCasualties > combatEvent.defenderCasualties) {
      combatEvent.winner = 'defenders';
    }

    this.combatHistory.push(combatEvent);

    this.emitEvent({
      type: GameEventType.COMBAT_ENDED,
      timestamp: Date.now(),
      data: combatEvent
    });

    return combatEvent;
  }

  /**
   * Calculate distance between two positions
   */
  private calculateDistance(
    pos1: { x: number; y: number },
    pos2: { x: number; y: number }
  ): number {
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Find nearest target from a position
   */
  private findNearestTarget<T extends { position: { x: number; y: number }; stats: { health: number } }>(
    position: { x: number; y: number },
    targets: T[]
  ): T | null {
    let nearest: T | null = null;
    let minDistance = Infinity;

    targets.forEach((target) => {
      if (target.stats.health <= 0) return; // Skip dead targets

      const distance = this.calculateDistance(position, target.position);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = target;
      }
    });

    return nearest;
  }

  /**
   * Find all targets within range
   */
  private findNearbyTargets<T extends { position: { x: number; y: number }; stats: { health: number } }>(
    position: { x: number; y: number },
    targets: T[],
    range: number
  ): T[] {
    return targets.filter((target) => {
      if (target.stats.health <= 0) return false;
      const distance = this.calculateDistance(position, target.position);
      return distance <= range;
    });
  }

  /**
   * Record a combat interaction
   */
  private recordCombat(
    survivor: Survivor,
    zombie: Zombie,
    result: CombatResult
  ): void {
    // Record for statistics
  }

  /**
   * Get combat history
   */
  public getCombatHistory(): CombatEvent[] {
    return this.combatHistory;
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
    return `combat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default CombatSystem;
