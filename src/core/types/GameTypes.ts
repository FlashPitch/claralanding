/**
 * ZombieFront.io - Core Game Types
 * Based on OpenFrontIO architecture
 * Adapted for zombie survival gameplay
 */

// ============================================================================
// COORDINATES & MAP
// ============================================================================

export interface Coordinates {
  x: number;
  y: number;
}

export interface HexCoordinates extends Coordinates {
  q: number; // Cube coordinate q
  r: number; // Cube coordinate r
  s: number; // Cube coordinate s
}

export enum BiomeType {
  CITY = 'city',
  SUBURB = 'suburb',
  RURAL = 'rural',
  FOREST = 'forest',
  DESERT = 'desert',
  MOUNTAIN = 'mountain',
  WATER = 'water'
}

export enum InfectionLevel {
  SAFE = 0,      // Green - 0-10% infection
  LOW = 1,       // Yellow - 10-30% infection
  MEDIUM = 2,    // Orange - 30-60% infection
  HIGH = 3,      // Red - 60-90% infection
  CRITICAL = 4   // Black - 90-100% infection
}

export interface MapTile {
  coordinates: HexCoordinates;
  biome: BiomeType;
  infectionLevel: InfectionLevel;
  infectionProgress: number; // 0-100%
  zombieCount: number;
  controller: string | null; // Player ID
  structures: Structure[];
  resources: ResourceNode[];
  isVisible: boolean;
  lastUpdated: number; // Timestamp
}

export interface GameMap {
  width: number;
  height: number;
  tiles: Map<string, MapTile>; // Key: "x,y"
  name: string;
  region: string; // "Europe", "Asia", "America"
}

// ============================================================================
// RESOURCES
// ============================================================================

export interface Resources {
  food: number;       // Needed for survival
  medicine: number;   // Cures infections
  weapons: number;    // Combat zombies
  materials: number;  // Build structures
  survivors: number;  // Population (special resource)
}

export enum ResourceType {
  FOOD = 'food',
  MEDICINE = 'medicine',
  WEAPONS = 'weapons',
  MATERIALS = 'materials'
}

export interface ResourceNode {
  type: ResourceType;
  amount: number;
  regenerationRate: number; // Per second
  maxCapacity: number;
  depleted: boolean;
}

export interface ResourceProduction {
  baseRate: number;
  bonusRate: number;
  efficiency: number; // 0-1 multiplier
}

// ============================================================================
// SURVIVORS & UNITS
// ============================================================================

export enum SurvivorType {
  CIVILIAN = 'civilian',    // Weak combat, strong production
  SOLDIER = 'soldier',      // Strong combat, weak production
  MEDIC = 'medic',         // Heals infections
  ENGINEER = 'engineer',    // Builds faster
  SCOUT = 'scout'          // Extended vision, detection
}

export interface SurvivorStats {
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  vision: number;
  buildSpeed: number;
  productionBonus: number;
}

export interface Survivor {
  id: string;
  type: SurvivorType;
  position: Coordinates;
  stats: SurvivorStats;
  isInfected: boolean;
  infectionProgress: number; // 0-100%, turns at 100%
  infectionTime: number; // Timestamp when infected
  morale: number; // 0-100%
  experience: number;
  level: number;
}

// ============================================================================
// ZOMBIES
// ============================================================================

export enum ZombieType {
  WALKER = 'walker',       // Slow, weak
  RUNNER = 'runner',       // Fast, medium
  TANK = 'tank',          // Slow, very resistant
  SPITTER = 'spitter',    // Ranged, infects
  HORDE = 'horde'         // Massive group
}

export interface ZombieStats {
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  infectionChance: number; // Probability to infect on hit
  detectionRange: number;
}

export interface Zombie {
  id: string;
  type: ZombieType;
  position: Coordinates;
  stats: ZombieStats;
  target: Coordinates | null;
  state: ZombieState;
  hordeId: string | null; // If part of a horde
}

export enum ZombieState {
  IDLE = 'idle',
  WANDERING = 'wandering',
  CHASING = 'chasing',
  ATTACKING = 'attacking',
  FEEDING = 'feeding'
}

export interface Horde {
  id: string;
  zombies: Zombie[];
  center: Coordinates;
  direction: Coordinates;
  strength: number; // Combined strength
  speed: number; // Average speed
}

// ============================================================================
// STRUCTURES
// ============================================================================

export enum StructureType {
  // Defensive
  BARRICADE = 'barricade',      // Blocks zombies, low health
  WALL = 'wall',                // Strong defense
  WATCHTOWER = 'watchtower',    // Vision, shoots zombies
  TRAP = 'trap',                // Zombie trap
  GATE = 'gate',                // Controlled passage

  // Safe zones
  SAFE_HOUSE = 'safe_house',    // Survivor refuge
  SHELTER = 'shelter',          // Basic protection

  // Production
  FARM = 'farm',                // Produces food
  HOSPITAL = 'hospital',        // Produces medicine, heals
  WORKSHOP = 'workshop',        // Produces weapons
  WAREHOUSE = 'warehouse',      // Stores resources

  // Military
  ARMORY = 'armory',           // Stores weapons, trains soldiers
  BUNKER = 'bunker',           // Strong defense, command center

  // Special
  RADIO_TOWER = 'radio_tower', // Communication, extended vision
  LABORATORY = 'laboratory'     // Research, cure development
}

export interface StructureStats {
  health: number;
  maxHealth: number;
  defense: number;
  attackRange: number;
  attackDamage: number;
  visionRange: number;
  capacity: number; // For storage/population
}

export interface Structure {
  id: string;
  type: StructureType;
  position: Coordinates;
  owner: string; // Player ID
  stats: StructureStats;
  level: number;
  constructionProgress: number; // 0-100%
  isActive: boolean;
  production?: ResourceProduction;
  garrison?: Survivor[]; // Units inside
}

export interface StructureBlueprint {
  type: StructureType;
  cost: Resources;
  buildTime: number; // Seconds
  baseStats: StructureStats;
  requirements: string[]; // Prerequisites
}

// ============================================================================
// INFECTION SYSTEM
// ============================================================================

export interface InfectionSystem {
  globalInfectionRate: number;    // Base infection spread rate (0-100%)
  incubationTime: number;         // Seconds before transformation
  zombieSpawnRate: number;        // Zombies spawned per second
  infectionRadius: number;        // Tiles affected by infection
  curePossible: boolean;          // Can infections be cured?
  cureThreshold: number;          // % of infection that can be cured
}

export interface InfectionStatus {
  isInfected: boolean;
  progress: number;        // 0-100%
  infectedAt: number;      // Timestamp
  source: string;          // How infected (bite, scratch, etc)
  isCurable: boolean;
  medicineNeeded: number;  // Amount to cure
}

// ============================================================================
// PLAYER & ALLIANCE
// ============================================================================

export interface Player {
  id: string;
  name: string;
  color: string;
  isAlive: boolean;

  // Resources
  resources: Resources;
  resourceProduction: Map<ResourceType, number>;

  // Territory
  controlledTiles: Set<string>; // Tile coordinates
  structures: Structure[];

  // Units
  survivors: Survivor[];
  maxPopulation: number;

  // Stats
  level: number;
  experience: number;
  score: number;

  // Alliance
  allianceId: string | null;

  // Settings
  autoAllocateResources: boolean;
  defensePriority: DefensePriority;
}

export enum DefensePriority {
  BALANCED = 'balanced',
  AGGRESSIVE = 'aggressive',
  DEFENSIVE = 'defensive',
  ECONOMIC = 'economic'
}

export interface Alliance {
  id: string;
  name: string;
  leader: string; // Player ID
  members: string[]; // Player IDs

  // Settings
  sharedResources: boolean;
  sharedVision: boolean;
  commonDefense: boolean;

  // Stats
  totalTerritory: number;
  combinedStrength: number;

  createdAt: number;
}

export interface AllianceRequest {
  id: string;
  from: string; // Player ID
  to: string;   // Player ID
  message: string;
  timestamp: number;
  status: 'pending' | 'accepted' | 'rejected';
}

// ============================================================================
// COMBAT
// ============================================================================

export interface CombatEvent {
  id: string;
  timestamp: number;
  location: Coordinates;

  // Participants
  attackers: (Survivor | Structure)[];
  defenders: Zombie[];

  // Results
  attackerCasualties: number;
  defenderCasualties: number;
  newInfections: number;

  // Outcome
  winner: 'attackers' | 'defenders' | 'draw';
}

export interface Attack {
  attacker: string; // Unit/Structure ID
  target: string;   // Unit/Structure ID
  damage: number;
  hitChance: number;
  infectionChance: number;
  criticalHit: boolean;
}

export interface CombatResult {
  damage: number;
  killed: boolean;
  infected: boolean;
  criticalHit: boolean;
}

// ============================================================================
// GAME STATE
// ============================================================================

export interface GameState {
  // Meta
  id: string;
  createdAt: number;
  lastUpdate: number;

  // Game mode
  mode: GameMode;
  status: GameStatus;

  // Map
  map: GameMap;

  // Players
  players: Map<string, Player>;
  alliances: Map<string, Alliance>;

  // Global infection
  globalInfectionLevel: number; // 0-100%
  totalZombies: number;
  zombies: Map<string, Zombie>;
  hordes: Map<string, Horde>;

  // Game settings
  settings: GameSettings;

  // Statistics
  stats: GameStatistics;
}

export enum GameMode {
  SURVIVAL = 'survival',         // Standard survival mode
  HORDE = 'horde',              // Players control zombies
  COOPERATIVE = 'cooperative',   // Co-op with objectives
  SANDBOX = 'sandbox'           // No limits, customizable
}

export enum GameStatus {
  WAITING = 'waiting',
  STARTING = 'starting',
  IN_PROGRESS = 'in_progress',
  PAUSED = 'paused',
  ENDED = 'ended'
}

export interface GameSettings {
  maxPlayers: number;
  startingResources: Resources;
  infectionSystem: InfectionSystem;
  difficultyLevel: DifficultyLevel;
  gameDuration: number; // Seconds, 0 = unlimited
  victoryCondition: VictoryCondition;
  friendlyFire: boolean;
  allowLateJoin: boolean;
}

export enum DifficultyLevel {
  EASY = 'easy',
  NORMAL = 'normal',
  HARD = 'hard',
  NIGHTMARE = 'nightmare',
  CUSTOM = 'custom'
}

export enum VictoryCondition {
  LAST_SURVIVOR = 'last_survivor',
  TERRITORY_CONTROL = 'territory_control', // Control X% of map
  SCORE_LIMIT = 'score_limit',
  TIME_LIMIT = 'time_limit',
  OBJECTIVE = 'objective' // Complete specific objectives
}

export interface GameStatistics {
  totalKills: Map<string, number>; // Player ID -> kills
  survivorsLost: Map<string, number>;
  resourcesGathered: Map<string, Resources>;
  structuresBuilt: Map<string, number>;
  zombiesKilled: number;
  totalInfections: number;
  gamesPlayed: number;
  victories: number;
}

// ============================================================================
// EVENTS & UPDATES
// ============================================================================

export interface GameEvent {
  type: GameEventType;
  timestamp: number;
  data: any;
}

export enum GameEventType {
  // Player events
  PLAYER_JOINED = 'player_joined',
  PLAYER_LEFT = 'player_left',
  PLAYER_DIED = 'player_died',

  // Combat events
  COMBAT_STARTED = 'combat_started',
  COMBAT_ENDED = 'combat_ended',
  UNIT_KILLED = 'unit_killed',
  STRUCTURE_DESTROYED = 'structure_destroyed',

  // Infection events
  UNIT_INFECTED = 'unit_infected',
  UNIT_TURNED = 'unit_turned',
  INFECTION_SPREAD = 'infection_spread',
  ZONE_INFECTED = 'zone_infected',

  // Building events
  STRUCTURE_BUILT = 'structure_built',
  STRUCTURE_UPGRADED = 'structure_upgraded',

  // Resource events
  RESOURCES_GATHERED = 'resources_gathered',
  RESOURCES_TRADED = 'resources_traded',

  // Alliance events
  ALLIANCE_FORMED = 'alliance_formed',
  ALLIANCE_BROKEN = 'alliance_broken',

  // Horde events
  HORDE_SPAWNED = 'horde_spawned',
  HORDE_APPROACHING = 'horde_approaching',

  // Game events
  GAME_STARTED = 'game_started',
  GAME_ENDED = 'game_ended',
  WAVE_STARTED = 'wave_started'
}

export interface GameUpdate {
  timestamp: number;
  changes: StateChange[];
}

export interface StateChange {
  type: 'create' | 'update' | 'delete';
  entity: string; // Entity type
  id: string;
  data: any;
}

// ============================================================================
// ACTIONS
// ============================================================================

export interface PlayerAction {
  playerId: string;
  type: ActionType;
  timestamp: number;
  data: any;
}

export enum ActionType {
  MOVE_UNITS = 'move_units',
  ATTACK = 'attack',
  BUILD_STRUCTURE = 'build_structure',
  UPGRADE_STRUCTURE = 'upgrade_structure',
  REPAIR_STRUCTURE = 'repair_structure',
  DEMOLISH_STRUCTURE = 'demolish_structure',
  GATHER_RESOURCES = 'gather_resources',
  ALLOCATE_RESOURCES = 'allocate_resources',
  TRADE_RESOURCES = 'trade_resources',
  RECRUIT_SURVIVOR = 'recruit_survivor',
  TREAT_INFECTION = 'treat_infection',
  QUARANTINE = 'quarantine',
  FORM_ALLIANCE = 'form_alliance',
  BREAK_ALLIANCE = 'break_alliance',
  SEND_MESSAGE = 'send_message'
}

// ============================================================================
// PROGRESSION & ACHIEVEMENTS
// ============================================================================

export interface PlayerProgression {
  level: number;
  experience: number;
  experienceToNextLevel: number;
  skillPoints: number;
  unlockedStructures: StructureType[];
  unlockedUnits: SurvivorType[];
  achievements: Achievement[];
  statistics: PlayerStatistics;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: number;
  reward?: Resources;
}

export interface PlayerStatistics {
  gamesPlayed: number;
  gamesWon: number;
  totalPlayTime: number; // Seconds
  totalKills: number;
  totalDeaths: number;
  structuresBuilt: number;
  resourcesGathered: Resources;
  highestScore: number;
  longestSurvival: number; // Seconds
}

// ============================================================================
// SKILLS
// ============================================================================

export enum SkillTree {
  SURVIVAL = 'survival',
  COMBAT = 'combat',
  CONSTRUCTION = 'construction',
  LEADERSHIP = 'leadership'
}

export interface Skill {
  id: string;
  tree: SkillTree;
  name: string;
  description: string;
  cost: number; // Skill points
  maxLevel: number;
  currentLevel: number;
  requirements: string[]; // Other skill IDs
  effect: SkillEffect;
}

export interface SkillEffect {
  type: 'percentage' | 'flat' | 'unlock';
  stat: string; // What stat it affects
  value: number;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

export const GAME_CONFIG = {
  // Map
  DEFAULT_MAP_SIZE: 100,
  TILE_SIZE: 64,

  // Resources
  STARTING_FOOD: 100,
  STARTING_MEDICINE: 50,
  STARTING_WEAPONS: 20,
  STARTING_MATERIALS: 80,
  STARTING_SURVIVORS: 5,

  // Infection
  BASE_INFECTION_RATE: 2, // % per minute
  INCUBATION_TIME: 300, // 5 minutes
  CURE_THRESHOLD: 30, // Can cure if < 30% infected
  MEDICINE_PER_CURE: 10,

  // Combat
  BASE_ATTACK_DAMAGE: 10,
  CRITICAL_HIT_CHANCE: 0.1, // 10%
  CRITICAL_MULTIPLIER: 2.0,

  // Zombies
  ZOMBIE_SPAWN_RATE: 1, // Per minute per infected tile
  HORDE_MIN_SIZE: 10,
  HORDE_MAX_SIZE: 100,

  // Game
  TICK_RATE: 30, // Updates per second
  AUTO_SAVE_INTERVAL: 60, // Seconds

  // Multiplayer
  MAX_PLAYERS: 50,
  MAX_ALLIANCE_SIZE: 6
};

export default GAME_CONFIG;
