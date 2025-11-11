# 📚 OpenFront.io - Sources et Documentation

Ce document liste toutes les sources et la documentation open source d'OpenFront.io utilisées pour créer ZombieFront.io.

---

## 🔗 Liens Officiels OpenFront.io

### Principaux
- **Site Web**: https://openfront.io/
- **GitHub Repository**: https://github.com/openfrontio/OpenFrontIO
- **Wiki**: https://openfront.miraheze.org/wiki/Main_Page
- **Discord**: https://discord.gg/jRpxXvG42t
- **Tutoriel Vidéo**: https://youtu.be/jvHEvbko3uw

### Informations du Projet
- **Licence**: Open Source
- **Commits**: 2,683
- **Contributeurs**: 149
- **Releases**: 99
- **Langage Principal**: TypeScript (92.8%)

---

## 🏗️ Architecture Technique

### Stack Technologique Analysée

#### Frontend
```json
{
  "rendering": "Pixi.js 8",
  "ui": "React",
  "bundler": "Webpack 5",
  "compiler": "SWC",
  "styling": "Tailwind CSS + PostCSS",
  "testing": "Jest + jsDOM"
}
```

#### Backend
```json
{
  "runtime": "Node.js",
  "framework": "Express",
  "realtime": "WebSocket (ws)",
  "logging": "Winston",
  "validation": "Zod",
  "auth": "JWT (jose)",
  "compression": "compression middleware"
}
```

#### Observabilité
- OpenTelemetry (metrics, logs, traces)
- AWS S3 pour stockage des cartes

---

## 📁 Structure du Code Source

### Organisation des Dossiers

```
OpenFrontIO/
├── src/
│   ├── client/              # Code client (35 fichiers TS)
│   │   ├── AccountModal.ts
│   │   ├── ClientGameRunner.ts
│   │   ├── Cosmetics.ts
│   │   ├── InputHandler.ts
│   │   ├── Matchmaking.ts
│   │   ├── Transport.ts
│   │   ├── components/
│   │   ├── data/
│   │   ├── graphics/         # Rendu Pixi.js
│   │   ├── sound/
│   │   ├── styles/
│   │   └── utilities/
│   │
│   ├── core/                # Logique partagée
│   │   ├── ApiSchemas.ts
│   │   ├── GameRunner.ts
│   │   ├── Schemas.ts
│   │   ├── Util.ts
│   │   ├── configuration/
│   │   ├── execution/
│   │   ├── game/            # Mécaniques principales
│   │   │   ├── Game.ts / GameImpl.ts
│   │   │   ├── GameView.ts
│   │   │   ├── PlayerImpl.ts
│   │   │   ├── AllianceImpl.ts
│   │   │   ├── UnitImpl.ts
│   │   │   ├── AttackImpl.ts
│   │   │   ├── GameMap.ts
│   │   │   ├── TrainStation.ts
│   │   │   ├── RailNetwork.ts
│   │   │   └── Stats.ts
│   │   ├── pathfinding/
│   │   ├── utilities/
│   │   ├── validations/
│   │   └── worker/
│   │
│   ├── server/              # Code serveur
│   └── global.d.ts
│
├── resources/               # Assets
├── map-generator/           # Génération procédurale de cartes
└── docs/
```

---

## 🎮 Mécaniques de Jeu Analysées

### 1. Système de Territoire
- **Contrôle territorial**: Expansion et défense de zones
- **Cartes géographiques**: Europe, Asie, Afrique
- **Structure hexagonale/grid**: Division en tuiles

### 2. Système d'Alliance
- **AllianceImpl.ts**: Gestion des alliances entre joueurs
- **AllianceRequestImpl.ts**: Système de requêtes
- Partage de ressources et vision commune

### 3. Système de Joueurs
- **PlayerImpl.ts** (31.8KB): Données et actions des joueurs
- **TeamAssignment.ts**: Organisation en équipes
- Gestion des ressources et du territoire

### 4. Système d'Unités
- **UnitImpl.ts** (11.7KB): Mécanique des unités
- **UnitGrid.ts**: Organisation spatiale
- Déplacement et combat

### 5. Système de Combat
- **AttackImpl.ts**: Système d'attaque
- Combat en temps réel
- Calcul de dégâts

### 6. Infrastructure
- **TrainStation.ts**: Stations de train
- **RailNetwork.ts**: Réseau ferroviaire
- **TransportShipUtils.ts**: Logistique navale
- Connexion et transport

### 7. Carte et Terrain
- **GameMap.ts** (12.8KB): Structure de carte
- **TerrainMapLoader.ts**: Chargement terrain
- **TerrainSearchMap.ts**: Navigation
- Données géographiques réelles

### 8. Statistiques
- **Stats.ts / StatsImpl.ts**: Statistiques de jeu
- **StatsSchemas.ts**: Validation des stats
- **UserSettings.ts**: Préférences joueurs

---

## 🔄 Adaptations pour ZombieFront.io

### Correspondances de Fichiers

| OpenFront.io | ZombieFront.io | Adaptation |
|--------------|----------------|------------|
| `Game.ts` | `ZombieGame.ts` | Logique de survie zombie |
| `PlayerImpl.ts` | `SurvivorPlayer.ts` | Gestion survivants |
| `UnitImpl.ts` | `Survivor.ts` + `Zombie.ts` | Deux types d'unités |
| `AllianceImpl.ts` | `SurvivorAlliance.ts` | Alliances de survivants |
| `GameMap.ts` | `InfectedMap.ts` | Carte avec infection |
| `AttackImpl.ts` | `CombatSystem.ts` | Combat vs zombies |
| N/A | `InfectionSystem.ts` | **NOUVEAU** - Propagation |
| N/A | `ZombieAI.ts` | **NOUVEAU** - IA zombies |

### Nouvelles Fonctionnalités

1. **Système d'Infection** ✨
   - Propagation dynamique
   - Incubation et transformation
   - Zones d'infection (5 niveaux)

2. **IA des Zombies** 🧟
   - Comportement (idle, wander, chase, attack, feed)
   - Formation de hordes
   - Pathfinding A*
   - Différents types (Walker, Runner, Tank, Spitter)

3. **Ressources de Survie** 📦
   - Nourriture, Médicaments, Armes, Matériaux
   - Production et stockage
   - Gestion de la pénurie

4. **Structures Défensives** 🏰
   - Barricades, Murs, Tours
   - Safe Houses, Hôpitaux
   - Entrepôts, Armureries

---

## 📊 Package.json Comparaison

### Dépendances Communes
```json
{
  "express": "Serveur web",
  "ws": "WebSocket",
  "winston": "Logging",
  "compression": "Compression HTTP",
  "uuid": "Génération ID",
  "jose": "JWT",
  "zod": "Validation"
}
```

### Dépendances Dev Communes
```json
{
  "typescript": "5.7",
  "webpack": "5",
  "pixi.js": "8",
  "jest": "Testing",
  "eslint": "Linting",
  "prettier": "Formatting",
  "tailwindcss": "Styling"
}
```

### Scripts Adaptés
```json
{
  "dev": "Client + serveur",
  "build-prod": "Build production",
  "test": "Jest tests",
  "lint": "ESLint",
  "gen-maps": "Génération cartes"
}
```

---

## 🎯 Fonctionnalités Conservées d'OpenFront

### ✅ Gardées
1. **Architecture Client/Serveur**: WebSocket temps réel
2. **Système de Carte**: Hex grid, données géographiques
3. **Multijoueur**: Jusqu'à 50 joueurs
4. **Alliances**: Coopération entre joueurs
5. **Ressources**: Gestion économique
6. **Construction**: Structures et défenses
7. **Matchmaking**: Système de lobby
8. **Progression**: Niveaux et stats

### 🔄 Modifiées
1. **Objectif**: Conquête → Survie
2. **Ennemis**: PvP uniquement → PvE + PvP
3. **Ressources**: Abstrait → Tangible (nourriture, médecine)
4. **Unités**: Militaires → Survivants + Zombies
5. **Territoire**: Contrôle → Safe Zones vs Infected Zones

### ✨ Ajoutées
1. **Système d'Infection**: Mécanique centrale unique
2. **Zombies**: IA, types, hordes
3. **Survie**: Faim, santé, moral
4. **Mode Coopératif**: Objectifs communs
5. **Mode Horde**: Contrôle des zombies

---

## 📖 Documentation Extraite

### README.md d'OpenFront
```markdown
# OpenFront.io
Online real-time strategy game focused on territorial control and alliance building

Features:
- Territorial Expansion
- Structure Building
- Alliance System
- Resource Management
- Multiple Maps (Europe, Asia, Africa)
- Cross-Platform (browsers)
```

### Installation OpenFront
```bash
# Prérequis
npm >= 10.9.2

# Installation
git clone https://github.com/openfrontio/OpenFrontIO
npm install

# Développement
npm run dev              # Full dev
npm run start:client     # Client only
npm run start:server-dev # Server only
```

---

## 🔍 Analyses des Fichiers Clés

### GameRunner.ts
- **Taille**: 7,676 bytes
- **Fonction**: Boucle de jeu principale
- **Utilisation**: Base pour notre game loop

### PlayerImpl.ts
- **Taille**: 31,800 bytes
- **Fonction**: Gestion complète des joueurs
- **Adaptation**: Template pour SurvivorPlayer

### GameMap.ts
- **Taille**: 12,800 bytes
- **Fonction**: Structure de carte
- **Adaptation**: Base pour InfectedMap avec zones d'infection

### UnitGrid.ts
- **Taille**: 6,200 bytes
- **Fonction**: Spatial partitioning
- **Utilisation**: Optimisation pour milliers de zombies

---

## 🛠️ Outils de Développement

### Configuration
- **TypeScript Config**: Strict mode, ES2022
- **ESLint**: Style guide du projet
- **Prettier**: Formatage automatique
- **Husky**: Git hooks
- **lint-staged**: Pre-commit checks

### Testing
- **Jest**: Framework de test
- **Coverage**: Couverture de code
- **Perf Tests**: Tests de performance

### Build
- **Webpack**: Bundling
- **SWC**: Compilation rapide
- **Babel**: Transpilation

---

## 📈 Statistiques du Projet

### OpenFront.io
- **Lignes de code**: ~50,000+ (estimé)
- **Fichiers TypeScript**: 100+
- **Années de développement**: 3+
- **Communauté**: Active (Discord, GitHub)

### ZombieFront.io (Progression)
- **Documentation**: ✅ Complète (2 docs majeures)
- **Types**: ✅ GameTypes.ts (500+ lignes)
- **Infection**: ✅ InfectionSystem.ts
- **Zombie AI**: ✅ ZombieAI.ts
- **Package**: ✅ Configuré
- **TypeScript**: ✅ tsconfig.json

---

## 🎓 Apprentissages Clés

### Architecture
1. **Séparation Client/Server/Core**: Organisation claire
2. **TypeScript Strict**: Type safety maximale
3. **Event-Driven**: Communication par événements
4. **State Management**: État centralisé du jeu

### Performance
1. **Spatial Partitioning**: QuadTree/Grid pour collisions
2. **Object Pooling**: Réutilisation d'objets
3. **Delta Compression**: Optimisation réseau
4. **LOD**: Level of Detail pour rendu

### Multijoueur
1. **WebSocket**: Communication bidirectionnelle
2. **Client Prediction**: Réduction latence
3. **Server Authority**: Serveur fait foi
4. **Reconciliation**: Correction des désync

---

## 🔗 Ressources Complémentaires

### Tutoriels Recommandés
- Architecture RTS: Voir GameRunner.ts
- Pathfinding: A* dans pathfinding/
- Networking: Transport.ts et serveur WebSocket
- Rendering: graphics/ avec Pixi.js

### Communauté
- **Discord OpenFront**: Poser des questions
- **GitHub Issues**: Voir problèmes résolus
- **Wiki**: Documentation détaillée

---

## 📝 Notes de Migration

### Fichiers à Créer (Phase Suivante)
1. ✅ Core Types (GameTypes.ts)
2. ✅ Infection System
3. ✅ Zombie AI
4. ⏳ Combat System
5. ⏳ Resource Manager
6. ⏳ Map Manager
7. ⏳ Game Server
8. ⏳ Client Renderer
9. ⏳ UI Components

### Priorités
1. **Semaine 1-2**: Fondations (setup, core systems)
2. **Semaine 3-4**: Mécaniques de base
3. **Semaine 5-8**: Multijoueur
4. **Semaine 9-12**: Contenu
5. **Semaine 13-16**: Polish

---

## 🙏 Crédits

Merci à l'équipe OpenFront.io pour:
- Architecture solide et bien documentée
- Code open source de qualité
- Communauté accueillante
- Inspiration pour ce projet

**OpenFront.io**: https://github.com/openfrontio/OpenFrontIO

---

*Document créé le 2025-11-11*
*Analyse complète de la base de code OpenFront.io pour adaptation en ZombieFront.io*
