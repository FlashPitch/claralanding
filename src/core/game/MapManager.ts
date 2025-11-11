/**
 * ZombieFront.io - Map Manager
 * Manages game map, tiles, and spatial queries
 */

import {
  GameMap,
  MapTile,
  HexCoordinates,
  BiomeType,
  InfectionLevel,
  Structure,
  Zombie,
  Survivor,
  Coordinates
} from '../types/GameTypes';

export class MapManager {
  private map: GameMap;

  constructor(width: number, height: number, name: string = 'Default Map') {
    this.map = this.generateMap(width, height, name);
  }

  /**
   * Generate a new map
   */
  private generateMap(width: number, height: number, name: string): GameMap {
    const tiles = new Map<string, MapTile>();

    for (let q = 0; q < width; q++) {
      for (let r = 0; r < height; r++) {
        const s = -q - r;
        const tile = this.createTile({ q, r, s, x: q, y: r });
        tiles.set(this.getTileKey({ q, r, s, x: q, y: r }), tile);
      }
    }

    return {
      width,
      height,
      tiles,
      name,
      region: 'Default Region'
    };
  }

  /**
   * Create a single tile
   */
  private createTile(coordinates: HexCoordinates): MapTile {
    // Randomly assign biome (this could be more sophisticated)
    const biomes = [
      BiomeType.CITY,
      BiomeType.SUBURB,
      BiomeType.RURAL,
      BiomeType.FOREST
    ];
    const biome = biomes[Math.floor(Math.random() * biomes.length)];

    return {
      coordinates,
      biome,
      infectionLevel: InfectionLevel.SAFE,
      infectionProgress: 0,
      zombieCount: 0,
      controller: null,
      structures: [],
      resources: [],
      isVisible: false,
      lastUpdated: Date.now()
    };
  }

  /**
   * Get tile by coordinates
   */
  public getTile(coordinates: HexCoordinates): MapTile | undefined {
    return this.map.tiles.get(this.getTileKey(coordinates));
  }

  /**
   * Get tile key for map lookup
   */
  private getTileKey(coordinates: HexCoordinates): string {
    return `${coordinates.q},${coordinates.r}`;
  }

  /**
   * Get adjacent tiles to a given tile
   */
  public getAdjacentTiles(coordinates: HexCoordinates): MapTile[] {
    const { q, r } = coordinates;
    const adjacentCoords = [
      { q: q + 1, r: r, s: -q - 1 - r, x: q + 1, y: r },
      { q: q - 1, r: r, s: -q + 1 - r, x: q - 1, y: r },
      { q: q, r: r + 1, s: -q - r - 1, x: q, y: r + 1 },
      { q: q, r: r - 1, s: -q - r + 1, x: q, y: r - 1 },
      { q: q + 1, r: r - 1, s: -q - 1 - r + 1, x: q + 1, y: r - 1 },
      { q: q - 1, r: r + 1, s: -q + 1 - r - 1, x: q - 1, y: r + 1 }
    ];

    return adjacentCoords
      .map(coord => this.getTile(coord))
      .filter(tile => tile !== undefined) as MapTile[];
  }

  /**
   * Get tiles within range of a position
   */
  public getTilesInRange(
    center: HexCoordinates,
    range: number
  ): MapTile[] {
    const tiles: MapTile[] = [];
    const { q, r } = center;

    for (let dq = -range; dq <= range; dq++) {
      for (let dr = -range; dr <= range; dr++) {
        const ds = -dq - dr;
        if (Math.abs(ds) <= range) {
          const coord: HexCoordinates = {
            q: q + dq,
            r: r + dr,
            s: -q - dq - r - dr,
            x: q + dq,
            y: r + dr
          };
          const tile = this.getTile(coord);
          if (tile) tiles.push(tile);
        }
      }
    }

    return tiles;
  }

  /**
   * Set tile controller
   */
  public setController(coordinates: HexCoordinates, playerId: string | null): boolean {
    const tile = this.getTile(coordinates);
    if (!tile) return false;

    tile.controller = playerId;
    tile.lastUpdated = Date.now();
    return true;
  }

  /**
   * Add structure to tile
   */
  public addStructure(coordinates: HexCoordinates, structure: Structure): boolean {
    const tile = this.getTile(coordinates);
    if (!tile) return false;

    tile.structures.push(structure);
    tile.lastUpdated = Date.now();
    return true;
  }

  /**
   * Remove structure from tile
   */
  public removeStructure(coordinates: HexCoordinates, structureId: string): boolean {
    const tile = this.getTile(coordinates);
    if (!tile) return false;

    tile.structures = tile.structures.filter(s => s.id !== structureId);
    tile.lastUpdated = Date.now();
    return true;
  }

  /**
   * Update zombie count on tile
   */
  public updateZombieCount(coordinates: HexCoordinates, zombies: Zombie[]): void {
    const tile = this.getTile(coordinates);
    if (!tile) return;

    // Count zombies on this tile
    const zombiesOnTile = zombies.filter(z =>
      Math.floor(z.position.x) === coordinates.q &&
      Math.floor(z.position.y) === coordinates.r
    );

    tile.zombieCount = zombiesOnTile.length;
    tile.lastUpdated = Date.now();
  }

  /**
   * Get all tiles controlled by a player
   */
  public getPlayerTiles(playerId: string): MapTile[] {
    const tiles: MapTile[] = [];
    this.map.tiles.forEach(tile => {
      if (tile.controller === playerId) {
        tiles.push(tile);
      }
    });
    return tiles;
  }

  /**
   * Get all infected tiles
   */
  public getInfectedTiles(minLevel: InfectionLevel = InfectionLevel.LOW): MapTile[] {
    const tiles: MapTile[] = [];
    this.map.tiles.forEach(tile => {
      if (tile.infectionLevel >= minLevel) {
        tiles.push(tile);
      }
    });
    return tiles;
  }

  /**
   * Find nearest safe tile to a position
   */
  public findNearestSafeTile(coordinates: HexCoordinates): MapTile | null {
    let nearest: MapTile | null = null;
    let minDistance = Infinity;

    this.map.tiles.forEach(tile => {
      if (tile.infectionLevel === InfectionLevel.SAFE) {
        const distance = this.calculateDistance(coordinates, tile.coordinates);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = tile;
        }
      }
    });

    return nearest;
  }

  /**
   * Calculate hex distance between two coordinates
   */
  private calculateDistance(a: HexCoordinates, b: HexCoordinates): number {
    return (
      Math.abs(a.q - b.q) +
      Math.abs(a.r - b.r) +
      Math.abs(a.s - b.s)
    ) / 2;
  }

  /**
   * Get map statistics
   */
  public getMapStatistics(): {
    totalTiles: number;
    infectedTiles: number;
    controlledTiles: number;
    safeTiles: number;
    zombieTotal: number;
  } {
    let infectedTiles = 0;
    let controlledTiles = 0;
    let safeTiles = 0;
    let zombieTotal = 0;

    this.map.tiles.forEach(tile => {
      if (tile.infectionLevel > InfectionLevel.SAFE) infectedTiles++;
      if (tile.controller !== null) controlledTiles++;
      if (tile.infectionLevel === InfectionLevel.SAFE) safeTiles++;
      zombieTotal += tile.zombieCount;
    });

    return {
      totalTiles: this.map.tiles.size,
      infectedTiles,
      controlledTiles,
      safeTiles,
      zombieTotal
    };
  }

  /**
   * Convert world position to hex coordinates
   */
  public worldToHex(worldPos: Coordinates): HexCoordinates {
    const q = Math.floor(worldPos.x);
    const r = Math.floor(worldPos.y);
    const s = -q - r;

    return { q, r, s, x: q, y: r };
  }

  /**
   * Convert hex coordinates to world position
   */
  public hexToWorld(hexCoord: HexCoordinates): Coordinates {
    return {
      x: hexCoord.q,
      y: hexCoord.r
    };
  }

  /**
   * Get the game map
   */
  public getMap(): GameMap {
    return this.map;
  }

  /**
   * Update tile visibility for a player
   */
  public updateVisibility(
    playerTiles: MapTile[],
    visionRange: number
  ): void {
    // Reset all tiles to not visible
    this.map.tiles.forEach(tile => {
      tile.isVisible = false;
    });

    // Set player tiles and tiles in range to visible
    playerTiles.forEach(playerTile => {
      playerTile.isVisible = true;
      const nearbyTiles = this.getTilesInRange(playerTile.coordinates, visionRange);
      nearbyTiles.forEach(tile => {
        tile.isVisible = true;
      });
    });
  }

  /**
   * Export map data (for saving)
   */
  public exportMapData(): string {
    const data = {
      width: this.map.width,
      height: this.map.height,
      name: this.map.name,
      region: this.map.region,
      tiles: Array.from(this.map.tiles.entries())
    };
    return JSON.stringify(data);
  }

  /**
   * Import map data (for loading)
   */
  public importMapData(jsonData: string): void {
    const data = JSON.parse(jsonData);
    this.map = {
      width: data.width,
      height: data.height,
      name: data.name,
      region: data.region,
      tiles: new Map(data.tiles)
    };
  }
}

export default MapManager;
