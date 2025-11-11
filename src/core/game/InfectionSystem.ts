/**
 * ZombieFront.io - Infection System
 * Manages the spread of zombie infection across the map and among survivors
 */

import {
  InfectionSystem,
  InfectionStatus,
  InfectionLevel,
  Survivor,
  MapTile,
  Coordinates,
  GameEvent,
  GameEventType,
  GAME_CONFIG
} from '../types/GameTypes';

export class InfectionManager {
  private config: InfectionSystem;
  private infectedSurvivors: Map<string, InfectionStatus>;
  private eventCallbacks: ((event: GameEvent) => void)[] = [];

  constructor(config: InfectionSystem) {
    this.config = config;
    this.infectedSurvivors = new Map();
  }

  /**
   * Infect a survivor
   */
  public infectSurvivor(
    survivor: Survivor,
    source: string = 'zombie_bite'
  ): InfectionStatus {
    const now = Date.now();

    const status: InfectionStatus = {
      isInfected: true,
      progress: 0,
      infectedAt: now,
      source,
      isCurable: true,
      medicineNeeded: GAME_CONFIG.MEDICINE_PER_CURE
    };

    this.infectedSurvivors.set(survivor.id, status);
    survivor.isInfected = true;
    survivor.infectionTime = now;

    this.emitEvent({
      type: GameEventType.UNIT_INFECTED,
      timestamp: now,
      data: { survivorId: survivor.id, source }
    });

    return status;
  }

  /**
   * Update infection progress for all infected survivors
   */
  public updateInfections(deltaTime: number): void {
    const now = Date.now();

    this.infectedSurvivors.forEach((status, survivorId) => {
      if (!status.isInfected) return;

      // Calculate infection progress
      const timeSinceInfection = now - status.infectedAt;
      const progressPercentage = (timeSinceInfection / (this.config.incubationTime * 1000)) * 100;

      status.progress = Math.min(100, progressPercentage);

      // Check if cure is still possible
      if (status.progress > this.config.cureThreshold) {
        status.isCurable = false;
      }

      // Check if survivor turns into zombie
      if (status.progress >= 100) {
        this.turnSurvivorIntoZombie(survivorId);
      }
    });
  }

  /**
   * Attempt to cure an infected survivor
   */
  public cureSurvivor(
    survivorId: string,
    medicineAmount: number
  ): { success: boolean; message: string } {
    const status = this.infectedSurvivors.get(survivorId);

    if (!status) {
      return { success: false, message: 'Survivor is not infected' };
    }

    if (!status.isCurable) {
      return { success: false, message: 'Infection too advanced to cure' };
    }

    if (medicineAmount < status.medicineNeeded) {
      return {
        success: false,
        message: `Need ${status.medicineNeeded} medicine, only have ${medicineAmount}`
      };
    }

    // Cure successful
    this.infectedSurvivors.delete(survivorId);

    this.emitEvent({
      type: GameEventType.UNIT_INFECTED,
      timestamp: Date.now(),
      data: { survivorId, cured: true }
    });

    return { success: true, message: 'Survivor cured successfully' };
  }

  /**
   * Turn an infected survivor into a zombie
   */
  private turnSurvivorIntoZombie(survivorId: string): void {
    const status = this.infectedSurvivors.get(survivorId);
    if (!status) return;

    this.infectedSurvivors.delete(survivorId);

    this.emitEvent({
      type: GameEventType.UNIT_TURNED,
      timestamp: Date.now(),
      data: { survivorId }
    });
  }

  /**
   * Spread infection to adjacent map tiles
   */
  public spreadInfectionOnMap(
    tiles: Map<string, MapTile>,
    deltaTime: number
  ): void {
    const tilesToUpdate: MapTile[] = [];

    tiles.forEach((tile) => {
      if (tile.infectionLevel === InfectionLevel.SAFE) return;

      // Calculate infection spread
      const spreadRate = this.config.globalInfectionRate * (deltaTime / 60);
      tile.infectionProgress = Math.min(100, tile.infectionProgress + spreadRate);

      // Update infection level based on progress
      tile.infectionLevel = this.calculateInfectionLevel(tile.infectionProgress);

      // Spread to adjacent tiles
      if (tile.infectionProgress > 50) {
        tilesToUpdate.push(tile);
      }
    });

    // Infect adjacent tiles
    tilesToUpdate.forEach((tile) => {
      this.infectAdjacentTiles(tiles, tile);
    });
  }

  /**
   * Infect adjacent tiles to a given tile
   */
  private infectAdjacentTiles(
    tiles: Map<string, MapTile>,
    sourceTile: MapTile
  ): void {
    const adjacentCoords = this.getAdjacentCoordinates(sourceTile.coordinates);

    adjacentCoords.forEach((coord) => {
      const key = `${coord.q},${coord.r}`;
      const adjacentTile = tiles.get(key);

      if (!adjacentTile) return;

      // Skip if already highly infected
      if (adjacentTile.infectionLevel >= InfectionLevel.HIGH) return;

      // Spread infection
      const spreadAmount = this.config.globalInfectionRate * 0.5;
      adjacentTile.infectionProgress = Math.min(
        100,
        adjacentTile.infectionProgress + spreadAmount
      );

      adjacentTile.infectionLevel = this.calculateInfectionLevel(
        adjacentTile.infectionProgress
      );

      if (adjacentTile.infectionProgress > 10 && adjacentTile.infectionProgress <= 10 + spreadAmount) {
        this.emitEvent({
          type: GameEventType.ZONE_INFECTED,
          timestamp: Date.now(),
          data: { coordinates: adjacentTile.coordinates }
        });
      }
    });
  }

  /**
   * Calculate infection level from progress percentage
   */
  private calculateInfectionLevel(progress: number): InfectionLevel {
    if (progress < 10) return InfectionLevel.SAFE;
    if (progress < 30) return InfectionLevel.LOW;
    if (progress < 60) return InfectionLevel.MEDIUM;
    if (progress < 90) return InfectionLevel.HIGH;
    return InfectionLevel.CRITICAL;
  }

  /**
   * Get adjacent hex coordinates
   */
  private getAdjacentCoordinates(coord: Coordinates): Coordinates[] {
    // Hex grid adjacent cells
    const { q, r } = coord as any;
    return [
      { q: q + 1, r: r },
      { q: q - 1, r: r },
      { q: q, r: r + 1 },
      { q: q, r: r - 1 },
      { q: q + 1, r: r - 1 },
      { q: q - 1, r: r + 1 }
    ];
  }

  /**
   * Check if a survivor is at risk of infection in their current tile
   */
  public checkInfectionRisk(
    survivor: Survivor,
    tile: MapTile
  ): { atRisk: boolean; riskLevel: number } {
    const baseRisk = tile.infectionProgress / 100;
    const zombieRisk = Math.min(1, tile.zombieCount / 50);
    const totalRisk = (baseRisk + zombieRisk) / 2;

    return {
      atRisk: totalRisk > 0.1,
      riskLevel: totalRisk
    };
  }

  /**
   * Get infection status for a survivor
   */
  public getInfectionStatus(survivorId: string): InfectionStatus | null {
    return this.infectedSurvivors.get(survivorId) || null;
  }

  /**
   * Calculate chance of infection from combat
   */
  public calculateCombatInfectionChance(
    attackerType: string,
    defenderHasProtection: boolean
  ): number {
    let baseChance = 0.2; // 20% base chance

    // Adjust based on zombie type
    if (attackerType === 'spitter') {
      baseChance = 0.4;
    } else if (attackerType === 'tank') {
      baseChance = 0.3;
    }

    // Protection reduces chance
    if (defenderHasProtection) {
      baseChance *= 0.5;
    }

    return baseChance;
  }

  /**
   * Clean up a zone (reduce infection)
   */
  public cleanZone(tile: MapTile, cleaningPower: number): void {
    tile.infectionProgress = Math.max(0, tile.infectionProgress - cleaningPower);
    tile.infectionLevel = this.calculateInfectionLevel(tile.infectionProgress);
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
   * Get total number of infected survivors
   */
  public getTotalInfected(): number {
    return this.infectedSurvivors.size;
  }

  /**
   * Get infection statistics
   */
  public getStatistics() {
    let curable = 0;
    let critical = 0;

    this.infectedSurvivors.forEach((status) => {
      if (status.isCurable) curable++;
      if (status.progress > 80) critical++;
    });

    return {
      totalInfected: this.infectedSurvivors.size,
      curable,
      critical,
      globalRate: this.config.globalInfectionRate
    };
  }
}

export default InfectionManager;
