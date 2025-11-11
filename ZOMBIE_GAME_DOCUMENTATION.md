# ZombieFront.io - Documentation Complète

## 📋 Vue d'ensemble

**ZombieFront.io** est un jeu de stratégie en temps réel multijoueur basé sur l'architecture open source d'OpenFront.io, adapté pour une apocalypse zombie. Les joueurs doivent survivre, étendre leur territoire, former des alliances et combattre des hordes de zombies.

---

## 🎮 Concept du Jeu

### Objectif Principal
Survivre à l'apocalypse zombie en:
- Sécurisant et étendant des zones sûres (Safe Zones)
- Gérant des ressources limitées (nourriture, armes, médicaments)
- Formant des alliances avec d'autres survivants
- Combattant les hordes de zombies
- Évitant la propagation de l'infection

### Types de Joueurs
1. **Survivants** (mode principal) - Joueurs humains gérant des groupes de survivants
2. **Horde Master** (mode alternatif) - Contrôler une horde de zombies

---

## 🗺️ Mécaniques de Jeu

### 1. Système de Territoire

#### Zones Sûres (Safe Zones)
- **Zone Verte** : Complètement sécurisée, production de ressources optimale
- **Zone Jaune** : Partiellement sécurisée, risque d'infection faible
- **Zone Orange** : Danger modéré, présence de zombies
- **Zone Rouge** : Hautement infectée, hordes de zombies actives
- **Zone Noire** : Zone morte, impossible à récupérer sans aide massive

#### Contrôle Territorial
- Les joueurs étendent leur territoire en construisant des structures
- Chaque zone contrôlée génère des ressources
- Les zones non défendues peuvent être envahies par les zombies
- La perte de contrôle entraîne la propagation de l'infection

### 2. Système de Ressources

#### Types de Ressources
```typescript
interface Resources {
  food: number;        // Nourriture - Nécessaire pour la survie
  medicine: number;    // Médicaments - Soigne les infections
  weapons: number;     // Armes - Combat contre les zombies
  materials: number;   // Matériaux - Construction de structures
  survivors: number;   // Survivants - Population active
}
```

#### Production de Ressources
- **Fermes** : Produisent de la nourriture (nécessite zone verte)
- **Hôpitaux** : Produisent des médicaments
- **Ateliers** : Produisent des armes et outils
- **Entrepôts** : Stockent les ressources
- **Refuges** : Augmentent la capacité de survivants

### 3. Système d'Infection et Propagation

#### Mécanique d'Infection
```typescript
interface InfectionSystem {
  infectionRate: number;        // Taux de propagation (0-100%)
  incubationTime: number;       // Temps avant transformation (secondes)
  zombieSpawnRate: number;      // Vitesse d'apparition des zombies
  infectionRadius: number;      // Rayon de propagation
}
```

#### Règles de Propagation
1. Un survivant infecté se transforme en zombie après le temps d'incubation
2. Les zombies se propagent vers les zones adjacentes non protégées
3. Les barricades ralentissent la propagation
4. Les médicaments peuvent guérir les infections récentes (< 30% du temps d'incubation)
5. Les hordes de zombies augmentent en taille dans les zones rouges

### 4. Système de Combat

#### Types d'Unités Survivantes
```typescript
enum SurvivorType {
  CIVILIAN = 'civilian',      // Faible combat, forte production
  SOLDIER = 'soldier',        // Fort combat, faible production
  MEDIC = 'medic',           // Soigne les infections
  ENGINEER = 'engineer',      // Construit plus vite
  SCOUT = 'scout'            // Vision étendue, détection
}
```

#### Types de Zombies
```typescript
enum ZombieType {
  WALKER = 'walker',         // Lent, faible
  RUNNER = 'runner',         // Rapide, moyen
  TANK = 'tank',            // Lent, très résistant
  SPITTER = 'spitter',      // À distance, infecte
  HORDE = 'horde'           // Groupe massif
}
```

#### Combat System
- Combat au tour par tour avec résolution en temps réel
- Dégâts basés sur type d'arme vs type de zombie
- Risque d'infection pendant le combat (5-20% selon protection)
- Munitions limitées - rechargement nécessaire

### 5. Structures Défensives

#### Types de Structures
```typescript
interface DefensiveStructure {
  id: string;
  type: StructureType;
  health: number;
  defense: number;
  cost: Resources;
  buildTime: number;
}

enum StructureType {
  BARRICADE = 'barricade',        // Bloque zombies, santé faible
  WALL = 'wall',                  // Forte défense
  WATCHTOWER = 'watchtower',      // Vision étendue, tire sur zombies
  TRAP = 'trap',                  // Piège à zombies
  GATE = 'gate',                  // Passage contrôlé
  SAFE_HOUSE = 'safe_house',      // Refuge pour survivants
  HOSPITAL = 'hospital',          // Soigne infections
  ARMORY = 'armory'              // Stocke armes
}
```

#### Construction
- Nécessite des matériaux et du temps
- Les ingénieurs construisent 50% plus vite
- Les structures endommagées peuvent être réparées
- Les zombies peuvent détruire les structures faibles

### 6. Système d'Alliance

#### Alliance entre Survivants
```typescript
interface Alliance {
  id: string;
  name: string;
  members: Player[];
  sharedResources: boolean;
  sharedVision: boolean;
  commonDefense: boolean;
}
```

#### Avantages d'Alliance
- Partage de ressources optionnel
- Vision partagée sur la carte
- Défense commune contre les hordes
- Commerce de ressources avec bonus
- Possibilité de secours en cas d'attaque

### 7. Système de Carte

#### Structure de Carte
- Basée sur des cartes géographiques réelles (Europe, Amérique, Asie)
- Divisée en hexagones/grilles
- Différents biomes : Ville, Campagne, Forêt, Désert
- Points d'intérêt : Hôpitaux, Bases militaires, Entrepôts

#### Propagation Géographique
```typescript
interface MapTile {
  coordinates: { x: number; y: number };
  biome: BiomeType;
  infectionLevel: number;     // 0-100%
  zombieCount: number;
  controller: Player | null;
  structures: Structure[];
  resources: ResourceNode[];
}
```

---

## 🏗️ Architecture Technique

### Stack Technologique (Basé sur OpenFrontIO)

#### Frontend
- **TypeScript** (92.8% du code)
- **Pixi.js 8** : Rendu graphique 2D performant
- **React** : Interface utilisateur
- **Webpack 5** : Bundling
- **Tailwind CSS** : Styling

#### Backend
- **Node.js** avec **Express**
- **WebSocket** : Communication temps réel
- **TypeScript**
- **Jest** : Testing

#### Infrastructure
- **Docker** : Containerisation
- **AWS S3** : Stockage des cartes
- **OpenTelemetry** : Monitoring

### Structure du Projet
```
zombiefront/
├── src/
│   ├── client/              # Code client
│   │   ├── graphics/        # Rendu Pixi.js
│   │   ├── components/      # Composants React
│   │   ├── sound/          # Effets sonores
│   │   └── Main.ts         # Point d'entrée client
│   ├── core/               # Logique partagée
│   │   ├── game/           # Mécaniques de jeu
│   │   │   ├── Game.ts
│   │   │   ├── Player.ts
│   │   │   ├── Zombie.ts
│   │   │   ├── Infection.ts
│   │   │   ├── Alliance.ts
│   │   │   └── Resources.ts
│   │   ├── pathfinding/    # IA des zombies
│   │   └── utilities/      # Utilitaires
│   └── server/             # Code serveur
│       ├── GameServer.ts   # Serveur de jeu
│       ├── matchmaking/    # Système de matchmaking
│       └── persistence/    # Sauvegarde des parties
├── resources/              # Assets graphiques
├── map-generator/          # Génération de cartes
└── docs/                   # Documentation
```

---

## 🎯 Modes de Jeu

### 1. Mode Survival (Principal)
- **Joueurs** : 2-50 survivants
- **Objectif** : Survivre le plus longtemps et contrôler le plus de territoire
- **Durée** : Parties de 30-120 minutes
- **Victoire** :
  - Contrôle de 70% de la carte
  - Dernier survivant
  - Score le plus élevé après temps limite

### 2. Mode Horde
- **Joueurs** : 1-10 Horde Masters contrôlent les zombies
- **Objectif** : Infecter toute la carte
- **Mécanique spéciale** : Les Horde Masters peuvent diriger les hordes stratégiquement

### 3. Mode Campagne Coopérative
- **Joueurs** : 2-6 joueurs en coopération
- **Objectif** : Compléter des objectifs spécifiques
- **Scénarios** :
  - Évacuation : Atteindre un point d'extraction
  - Défense : Tenir une position pendant X minutes
  - Sauvetage : Récupérer des survivants
  - Cure : Trouver et sécuriser un laboratoire

### 4. Mode Sandbox
- **Solo ou multijoueur**
- Paramètres personnalisables
- Pas de limite de temps
- Idéal pour tester des stratégies

---

## 📊 Système de Progression

### Expérience et Niveaux
```typescript
interface PlayerProgression {
  level: number;
  experience: number;
  skillPoints: number;
  unlockedStructures: StructureType[];
  achievements: Achievement[];
  statistics: PlayerStats;
}
```

### Compétences Débloquables
1. **Survie**
   - Production de nourriture +25%
   - Résistance à l'infection +10%

2. **Combat**
   - Dégâts d'armes +15%
   - Précision +20%

3. **Construction**
   - Vitesse de construction +30%
   - Coût de matériaux -15%

4. **Leadership**
   - Capacité de survivants +10
   - Bonus d'alliance +25%

---

## 🎨 Aspects Visuels et Sonores

### Graphiques
- **Style** : Top-down 2D avec style semi-réaliste
- **Palette** : Tons désaturés pour ambiance post-apocalyptique
- **Animations** :
  - Déplacement des survivants et zombies
  - Attaques et combats
  - Construction de structures
  - Propagation de l'infection (effet visuel)

### Sons
- Gémissements de zombies (varié selon type)
- Coups de feu et explosions
- Alarmes et sirènes
- Musique d'ambiance tendue
- Sons d'interface

---

## 🔧 APIs et Interfaces Clés

### Game API
```typescript
class ZombieGame {
  // État du jeu
  getGameState(): GameState;

  // Actions du joueur
  buildStructure(type: StructureType, position: Coordinates): boolean;
  moveUnits(units: Unit[], destination: Coordinates): void;
  attackZombies(units: Unit[], targets: Zombie[]): void;
  formAlliance(targetPlayer: Player): void;
  tradeResources(partner: Player, offer: Resources, request: Resources): void;

  // Gestion des ressources
  gatherResources(zone: MapTile): void;
  allocateResources(distribution: ResourceAllocation): void;

  // Système d'infection
  checkInfection(survivor: Survivor): InfectionStatus;
  treatInfection(survivor: Survivor, medicine: number): boolean;
  quarantine(survivor: Survivor): void;
}
```

### Zombie AI API
```typescript
class ZombieAI {
  // Comportement des zombies
  calculatePath(from: Coordinates, to: Coordinates): Path;
  formHorde(zombies: Zombie[]): Horde;
  attackTarget(horde: Horde, target: Structure | Unit): void;
  spreadInfection(infectedZone: MapTile): void;

  // Difficulté adaptative
  adjustDifficulty(playerCount: number, averageLevel: number): void;
  spawnWave(intensity: number): Zombie[];
}
```

---

## 🚀 Roadmap de Développement

### Phase 1 : Fondations (Semaines 1-4)
- [ ] Setup du projet TypeScript/React
- [ ] Architecture client/serveur de base
- [ ] Système de carte basique
- [ ] Rendu graphique avec Pixi.js
- [ ] Déplacement des unités

### Phase 2 : Mécaniques Core (Semaines 5-8)
- [ ] Système de ressources
- [ ] Construction de structures
- [ ] Combat de base
- [ ] Système d'infection
- [ ] IA des zombies basique

### Phase 3 : Multijoueur (Semaines 9-12)
- [ ] Serveur WebSocket
- [ ] Synchronisation des joueurs
- [ ] Système d'alliance
- [ ] Matchmaking

### Phase 4 : Contenu (Semaines 13-16)
- [ ] Multiples types de zombies
- [ ] Variété de structures
- [ ] Différentes cartes
- [ ] Modes de jeu

### Phase 5 : Polish (Semaines 17-20)
- [ ] Effets visuels et sonores
- [ ] Équilibrage
- [ ] Optimisation performance
- [ ] Tests utilisateurs

---

## 📖 Références OpenFront.io

### Documentation Source
- **Repository** : https://github.com/openfrontio/OpenFrontIO
- **Wiki** : https://openfront.miraheze.org/wiki/Main_Page
- **Discord** : https://discord.gg/jRpxXvG42t
- **Tutorial** : https://youtu.be/jvHEvbko3uw

### Fichiers Clés Adaptés
1. **Game.ts** → **ZombieGame.ts** : Logique de jeu principale
2. **PlayerImpl.ts** → **SurvivorPlayer.ts** : Gestion des survivants
3. **UnitImpl.ts** → **Survivor.ts** / **Zombie.ts** : Unités
4. **AllianceImpl.ts** → **SurvivorAlliance.ts** : Système d'alliance
5. **GameMap.ts** → **InfectedMap.ts** : Carte avec infection
6. **AttackImpl.ts** → **CombatSystem.ts** : Combat zombies

---

## 🎓 Concepts Techniques Avancés

### Optimisation de Performance
- **Spatial Partitioning** : QuadTree pour gestion efficace des zombies
- **Object Pooling** : Réutilisation des objets zombies/projectiles
- **LOD (Level of Detail)** : Réduction de détails pour zombies éloignés
- **Delta Compression** : Optimisation de la bande passante réseau

### IA des Zombies
- **Pathfinding** : A* optimisé pour hordes
- **Flocking Behavior** : Comportement de groupe réaliste
- **State Machine** : États des zombies (idle, chase, attack, feed)
- **Influence Maps** : Attraction vers bruit/mouvement

### Synchronisation Réseau
- **Client-Side Prediction** : Réduction de la latence
- **Server Reconciliation** : Correction des désynchronisations
- **Lag Compensation** : Gestion des connexions lentes
- **Entity Interpolation** : Mouvement fluide des zombies

---

## 📝 Notes de Développement

### Différences avec OpenFront.io
1. **Thème** : Guerre territoriale → Survie zombie
2. **Ressources** : Économie abstraite → Ressources de survie tangibles
3. **Ennemis** : PvP uniquement → PvE + PvP
4. **Infection** : N/A → Mécanique centrale
5. **Objectif** : Conquête → Survie

### Défis Techniques
- Gérer des milliers de zombies simultanément
- Synchronisation de l'infection en temps réel
- Équilibrage PvE/PvP
- Performance avec beaucoup de joueurs et zombies

### Innovations par rapport à l'original
- Système d'infection dynamique
- Double gameplay (Survivants + Hordes)
- Mécaniques de survie (faim, santé, moral)
- Mode coopératif avec objectifs

---

## 📄 Licence

Ce projet est inspiré d'OpenFront.io (open source). Le code sera distribué sous licence MIT pour encourager la collaboration et les contributions communautaires.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Domaines prioritaires :
- Équilibrage des mécaniques
- Nouveaux types de zombies/structures
- Optimisation de performance
- Création de cartes
- Traductions

---

*Document créé le 2025-11-11*
*Basé sur OpenFront.io - https://github.com/openfrontio/OpenFrontIO*
