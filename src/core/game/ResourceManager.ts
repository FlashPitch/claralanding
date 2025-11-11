/**
 * ZombieFront.io - Resource Manager
 * Manages resource production, consumption, and storage
 */

import {
  Resources,
  ResourceType,
  ResourceNode,
  ResourceProduction,
  Structure,
  StructureType,
  Player,
  GameEvent,
  GameEventType,
  GAME_CONFIG
} from '../types/GameTypes';

export class ResourceManager {
  private eventCallbacks: ((event: GameEvent) => void)[] = [];

  /**
   * Create starting resources for a new player
   */
  public createStartingResources(): Resources {
    return {
      food: GAME_CONFIG.STARTING_FOOD,
      medicine: GAME_CONFIG.STARTING_MEDICINE,
      weapons: GAME_CONFIG.STARTING_WEAPONS,
      materials: GAME_CONFIG.STARTING_MATERIALS,
      survivors: GAME_CONFIG.STARTING_SURVIVORS
    };
  }

  /**
   * Update resource production for a player
   */
  public updateProduction(player: Player, deltaTime: number): void {
    const production = this.calculateProduction(player.structures);

    // Apply production (deltaTime is in seconds)
    Object.keys(production).forEach((resourceType) => {
      const type = resourceType as ResourceType;
      const amount = production[type] * (deltaTime / 60); // Convert to per-second rate

      switch (type) {
        case 'food':
          player.resources.food += amount;
          break;
        case 'medicine':
          player.resources.medicine += amount;
          break;
        case 'weapons':
          player.resources.weapons += amount;
          break;
        case 'materials':
          player.resources.materials += amount;
          break;
      }
    });

    // Update production rates map
    player.resourceProduction = new Map(
      Object.entries(production) as [ResourceType, number][]
    );
  }

  /**
   * Calculate total production from structures
   */
  public calculateProduction(structures: Structure[]): Record<ResourceType, number> {
    const production: Record<ResourceType, number> = {
      food: 0,
      medicine: 0,
      weapons: 0,
      materials: 0
    };

    structures.forEach((structure) => {
      if (!structure.isActive || !structure.production) return;

      const structProduction = this.getStructureProduction(structure);

      Object.keys(structProduction).forEach((type) => {
        const resourceType = type as ResourceType;
        production[resourceType] += structProduction[resourceType];
      });
    });

    return production;
  }

  /**
   * Get production for a specific structure
   */
  private getStructureProduction(structure: Structure): Record<ResourceType, number> {
    const production: Record<ResourceType, number> = {
      food: 0,
      medicine: 0,
      weapons: 0,
      materials: 0
    };

    if (!structure.production) return production;

    const baseRate = structure.production.baseRate;
    const bonusRate = structure.production.bonusRate;
    const efficiency = structure.production.efficiency;

    const totalRate = (baseRate + bonusRate) * efficiency;

    switch (structure.type) {
      case StructureType.FARM:
        production.food = totalRate;
        break;
      case StructureType.HOSPITAL:
        production.medicine = totalRate;
        break;
      case StructureType.WORKSHOP:
        production.weapons = totalRate;
        break;
      case StructureType.WAREHOUSE:
        production.materials = totalRate * 0.5;
        break;
    }

    return production;
  }

  /**
   * Consume resources
   */
  public consumeResources(player: Player, cost: Resources): boolean {
    // Check if player has enough resources
    if (!this.canAfford(player.resources, cost)) {
      return false;
    }

    // Deduct resources
    player.resources.food -= cost.food;
    player.resources.medicine -= cost.medicine;
    player.resources.weapons -= cost.weapons;
    player.resources.materials -= cost.materials;
    player.resources.survivors -= cost.survivors;

    this.emitEvent({
      type: GameEventType.RESOURCES_GATHERED,
      timestamp: Date.now(),
      data: { playerId: player.id, consumed: cost }
    });

    return true;
  }

  /**
   * Check if player can afford a cost
   */
  public canAfford(resources: Resources, cost: Resources): boolean {
    return (
      resources.food >= cost.food &&
      resources.medicine >= cost.medicine &&
      resources.weapons >= cost.weapons &&
      resources.materials >= cost.materials &&
      resources.survivors >= cost.survivors
    );
  }

  /**
   * Add resources to player
   */
  public addResources(player: Player, resources: Resources): void {
    player.resources.food += resources.food;
    player.resources.medicine += resources.medicine;
    player.resources.weapons += resources.weapons;
    player.resources.materials += resources.materials;
    player.resources.survivors += resources.survivors;

    this.emitEvent({
      type: GameEventType.RESOURCES_GATHERED,
      timestamp: Date.now(),
      data: { playerId: player.id, gathered: resources }
    });
  }

  /**
   * Trade resources between players
   */
  public tradeResources(
    from: Player,
    to: Player,
    offer: Resources,
    request: Resources,
    allianceBonus: number = 0
  ): boolean {
    // Check if from player can afford the offer
    if (!this.canAfford(from.resources, offer)) {
      return false;
    }

    // Check if to player can afford the request
    if (!this.canAfford(to.resources, request)) {
      return false;
    }

    // Apply alliance bonus (reduce cost)
    const adjustedRequest = this.applyBonus(request, allianceBonus);

    // Execute trade
    this.consumeResources(from, offer);
    this.addResources(from, adjustedRequest);

    this.consumeResources(to, request);
    this.addResources(to, offer);

    this.emitEvent({
      type: GameEventType.RESOURCES_TRADED,
      timestamp: Date.now(),
      data: {
        from: from.id,
        to: to.id,
        offer,
        request
      }
    });

    return true;
  }

  /**
   * Apply bonus multiplier to resources
   */
  private applyBonus(resources: Resources, bonus: number): Resources {
    return {
      food: Math.floor(resources.food * (1 + bonus)),
      medicine: Math.floor(resources.medicine * (1 + bonus)),
      weapons: Math.floor(resources.weapons * (1 + bonus)),
      materials: Math.floor(resources.materials * (1 + bonus)),
      survivors: resources.survivors // Survivors not affected by bonus
    };
  }

  /**
   * Calculate survivor consumption (food needed)
   */
  public calculateSurvivorConsumption(survivorCount: number): number {
    return survivorCount * 0.5; // 0.5 food per survivor per minute
  }

  /**
   * Process survivor consumption
   */
  public processSurvivorConsumption(player: Player, deltaTime: number): void {
    const consumption = this.calculateSurvivorConsumption(player.resources.survivors);
    const foodNeeded = consumption * (deltaTime / 60);

    if (player.resources.food >= foodNeeded) {
      player.resources.food -= foodNeeded;
    } else {
      // Not enough food - survivors start dying
      const deficit = foodNeeded - player.resources.food;
      player.resources.food = 0;

      const survivorsLost = Math.floor(deficit / 2);
      player.resources.survivors = Math.max(0, player.resources.survivors - survivorsLost);

      if (survivorsLost > 0) {
        this.emitEvent({
          type: GameEventType.UNIT_KILLED,
          timestamp: Date.now(),
          data: {
            playerId: player.id,
            reason: 'starvation',
            count: survivorsLost
          }
        });
      }
    }
  }

  /**
   * Gather resources from a node
   */
  public gatherFromNode(
    player: Player,
    node: ResourceNode,
    gatherRate: number = 1
  ): number {
    if (node.depleted || node.amount <= 0) {
      return 0;
    }

    const gathered = Math.min(node.amount, gatherRate);
    node.amount -= gathered;

    if (node.amount <= 0) {
      node.depleted = true;
    }

    // Add to player resources
    switch (node.type) {
      case 'food':
        player.resources.food += gathered;
        break;
      case 'medicine':
        player.resources.medicine += gathered;
        break;
      case 'weapons':
        player.resources.weapons += gathered;
        break;
      case 'materials':
        player.resources.materials += gathered;
        break;
    }

    return gathered;
  }

  /**
   * Regenerate resource node
   */
  public regenerateNode(node: ResourceNode, deltaTime: number): void {
    if (node.amount >= node.maxCapacity) {
      return;
    }

    const regeneration = node.regenerationRate * (deltaTime / 60);
    node.amount = Math.min(node.maxCapacity, node.amount + regeneration);

    if (node.amount > 0) {
      node.depleted = false;
    }
  }

  /**
   * Get total resource value (for scoring)
   */
  public getTotalResourceValue(resources: Resources): number {
    return (
      resources.food +
      resources.medicine * 2 +
      resources.weapons * 3 +
      resources.materials * 1.5 +
      resources.survivors * 10
    );
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
}

export default ResourceManager;
