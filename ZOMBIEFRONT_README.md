# 🧟 ZombieFront.io

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Based on OpenFront](https://img.shields.io/badge/Based%20on-OpenFront.io-orange.svg)](https://github.com/openfrontio/OpenFrontIO)

**Un jeu de stratégie en temps réel multijoueur basé sur la survie zombie**

Inspiré par l'architecture open source d'[OpenFront.io](https://openfront.io/), ZombieFront.io transforme le concept de contrôle territorial en une lutte désespérée pour la survie contre des hordes de zombies.

---

## 🎮 Aperçu du Jeu

ZombieFront.io est un RTS multijoueur où les joueurs doivent:
- 🏗️ Construire et défendre des zones sûres
- 🤝 Former des alliances avec d'autres survivants
- ⚔️ Combattre des hordes de zombies
- 💊 Gérer la propagation de l'infection
- 📦 Récolter et gérer des ressources limitées (nourriture, armes, médicaments)

### Caractéristiques Principales

- **Système d'Infection Dynamique**: L'infection se propage en temps réel sur la carte
- **IA des Zombies Avancée**: Différents types de zombies avec comportements uniques
- **Formation de Hordes**: Les zombies se regroupent en hordes massives
- **Multijoueur Temps Réel**: Jusqu'à 50 joueurs simultanément
- **Cartes Géographiques**: Basées sur des régions réelles (Europe, Asie, Amérique)
- **Modes de Jeu Variés**: Survival, Horde, Coopératif, Sandbox

---

## 🛠️ Stack Technique

### Frontend
- **TypeScript** - Langage principal
- **Pixi.js 8** - Rendu graphique 2D haute performance
- **React** - Interface utilisateur
- **Webpack 5** - Module bundling
- **Tailwind CSS** - Styling

### Backend
- **Node.js** + **Express** - Serveur de jeu
- **WebSocket** - Communication temps réel
- **TypeScript** - Type safety côté serveur

### Tools
- **Jest** - Testing
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Docker** - Containerisation

---

## 📁 Structure du Projet

```
zombiefront/
├── src/
│   ├── client/                 # Code client
│   │   ├── graphics/          # Rendu Pixi.js
│   │   ├── components/        # Composants React
│   │   ├── sound/            # Effets sonores
│   │   └── Main.ts           # Point d'entrée
│   │
│   ├── core/                  # Logique partagée
│   │   ├── types/            # Types TypeScript
│   │   │   └── GameTypes.ts  # Interfaces principales
│   │   │
│   │   ├── game/             # Mécaniques de jeu
│   │   │   ├── ZombieGame.ts     # Classe principale
│   │   │   ├── InfectionSystem.ts # Système d'infection
│   │   │   ├── ZombieAI.ts       # IA des zombies
│   │   │   ├── CombatSystem.ts   # Combat
│   │   │   ├── ResourceManager.ts # Ressources
│   │   │   ├── AllianceManager.ts # Alliances
│   │   │   └── MapManager.ts     # Gestion carte
│   │   │
│   │   ├── pathfinding/      # Algorithmes A*
│   │   └── utilities/        # Utilitaires
│   │
│   └── server/               # Code serveur
│       ├── GameServer.ts     # Serveur principal
│       ├── matchmaking/      # Matchmaking
│       └── persistence/      # Sauvegarde
│
├── resources/                # Assets
│   ├── sprites/             # Images
│   ├── sounds/              # Audio
│   └── maps/                # Données de carte
│
├── docs/                    # Documentation
│   └── ZOMBIE_GAME_DOCUMENTATION.md
│
├── tests/                   # Tests
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
```

---

## 🚀 Installation

### Prérequis

- **Node.js** >= 18.x
- **npm** >= 10.9.2
- Navigateur moderne (Chrome, Firefox, Edge)

### Setup

```bash
# Cloner le repository
git clone https://github.com/votre-username/zombiefront.git
cd zombiefront

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Ou lancer client et serveur séparément
npm run start:client  # Client only
npm run start:server-dev  # Server only
```

---

## 🎯 Modes de Jeu

### 1. 🏃 Mode Survival (Principal)
- **Joueurs**: 2-50
- **Objectif**: Survivre et contrôler le territoire
- **Durée**: 30-120 minutes
- **Victoire**: Contrôle de 70% de la carte OU dernier survivant

### 2. 🧟‍♂️ Mode Horde
- **Joueurs**: 1-10 Horde Masters
- **Objectif**: Infecter toute la carte
- **Spécial**: Contrôle stratégique des hordes de zombies

### 3. 🤝 Mode Coopératif
- **Joueurs**: 2-6 en coopération
- **Objectif**: Compléter des missions
- **Scénarios**:
  - Évacuation
  - Défense de position
  - Sauvetage de survivants
  - Recherche de cure

### 4. 🛠️ Mode Sandbox
- Configuration personnalisable
- Pas de limite de temps
- Idéal pour tests et stratégies

---

## 🎮 Mécaniques de Jeu

### Ressources
```typescript
{
  food: number;       // Survie des survivants
  medicine: number;   // Soigne infections
  weapons: number;    // Combat
  materials: number;  // Construction
  survivors: number;  // Population
}
```

### Types de Zombies
- **Walker** 🚶: Lent, faible
- **Runner** 🏃: Rapide, dangereux
- **Tank** 🛡️: Très résistant
- **Spitter** 💉: Attaque à distance, infecte
- **Horde** 👥: Groupe massif

### Types de Survivants
- **Civilian** 👨: Production élevée
- **Soldier** 🎖️: Combat fort
- **Medic** ⚕️: Soigne infections
- **Engineer** 🔧: Construction rapide
- **Scout** 🔭: Vision étendue

### Structures
- **Défensives**: Barricades, Murs, Tours de Guet
- **Sûres**: Safe Houses, Abris
- **Production**: Fermes, Hôpitaux, Ateliers
- **Militaires**: Armureries, Bunkers
- **Spéciales**: Tours Radio, Laboratoires

---

## 🧬 Système d'Infection

### Propagation
- **Taux de base**: 2% par minute
- **Incubation**: 5 minutes
- **Zones d'infection**: 5 niveaux (Verte → Noire)

### Traitement
- **Seuil de cure**: < 30% d'infection
- **Coût**: 10 médicaments par cure
- **Quarantaine**: Isoler les infectés

---

## 🤝 Système d'Alliance

### Avantages
- ✅ Partage de ressources optionnel
- ✅ Vision partagée
- ✅ Défense commune
- ✅ Commerce avec bonus
- ✅ Secours en cas d'attaque

---

## 📊 Progression

### Système de Niveaux
- Gain d'XP par actions (kills, construction, survie)
- Débloquage de structures avancées
- Amélioration des capacités

### Arbres de Compétences
1. **Survie**: Production +25%, Résistance infection +10%
2. **Combat**: Dégâts +15%, Précision +20%
3. **Construction**: Vitesse +30%, Coût -15%
4. **Leadership**: Capacité +10, Bonus alliance +25%

---

## 🔧 Commandes de Développement

```bash
# Développement
npm run dev              # Client + serveur avec hot reload
npm run dev:staging      # Contre serveurs staging
npm run dev:prod         # Contre serveurs production

# Build
npm run build-dev        # Build développement
npm run build-prod       # Build production optimisé

# Tests
npm test                 # Lancer tests
npm run test:coverage    # Avec couverture
npm run perf            # Tests de performance

# Code Quality
npm run format          # Format avec Prettier
npm run lint            # Lint avec ESLint
npm run lint:fix        # Auto-fix linting

# Serveur
npm run start:server        # Serveur production
npm run start:server-dev    # Serveur développement

# Client
npm run start:client    # Client dev server

# Utilitaires
npm run gen-maps        # Générer cartes
npm run tunnel          # Tunnel pour tests
```

---

## 🎨 Assets et Ressources

### Sources d'Inspiration
- **OpenFront.io**: Architecture et mécaniques de base
- **Cartes**: Données géographiques réelles
- **Style visuel**: Post-apocalyptique, désaturé

### Besoin d'Assets
- Sprites de zombies (Walker, Runner, Tank, Spitter)
- Sprites de survivants (5 types)
- Structures (15+ types)
- Effets visuels (infection, combat, explosions)
- Sons (gémissements, tirs, alarmes, ambiance)

---

## 📖 Documentation

### Documentation Complète
Voir [ZOMBIE_GAME_DOCUMENTATION.md](./ZOMBIE_GAME_DOCUMENTATION.md) pour:
- Architecture technique détaillée
- Spécifications des mécaniques
- APIs et interfaces
- Guides de développement
- Roadmap

### Documentation OpenFront.io
- **Repository**: https://github.com/openfrontio/OpenFrontIO
- **Wiki**: https://openfront.miraheze.org/wiki/Main_Page
- **Discord**: https://discord.gg/jRpxXvG42t

---

## 🗺️ Roadmap

### ✅ Phase 1: Fondations (Semaines 1-4)
- [x] Documentation complète
- [x] Architecture TypeScript de base
- [x] Système d'infection
- [x] IA des zombies
- [ ] Setup client/serveur
- [ ] Rendu graphique Pixi.js

### 🔄 Phase 2: Mécaniques Core (Semaines 5-8)
- [ ] Système de ressources
- [ ] Construction de structures
- [ ] Combat
- [ ] Gestion de carte

### 📅 Phase 3: Multijoueur (Semaines 9-12)
- [ ] Serveur WebSocket
- [ ] Synchronisation
- [ ] Alliances
- [ ] Matchmaking

### 📅 Phase 4: Contenu (Semaines 13-16)
- [ ] Multiples types de zombies/structures
- [ ] Cartes variées
- [ ] Modes de jeu
- [ ] Progression

### 📅 Phase 5: Polish (Semaines 17-20)
- [ ] Effets visuels/sonores
- [ ] Équilibrage
- [ ] Optimisation
- [ ] Tests utilisateurs

---

## 🤝 Contribution

Les contributions sont les bienvenues!

### Domaines Prioritaires
- 🎮 Équilibrage des mécaniques
- 🧟 Nouveaux types de zombies/structures
- ⚡ Optimisation de performance
- 🗺️ Création de cartes
- 🌍 Traductions

### Comment Contribuer
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

Inspiré par [OpenFront.io](https://github.com/openfrontio/OpenFrontIO) - également sous licence open source.

---

## 🙏 Remerciements

- **OpenFront.io** - Architecture et inspiration
- Communauté open source
- Tous les contributeurs

---

## 📧 Contact

- **Discord**: [À créer]
- **GitHub Issues**: https://github.com/votre-username/zombiefront/issues
- **Email**: votre-email@example.com

---

## 🌟 Soutenez le Projet

Si vous aimez ZombieFront.io:
- ⭐ Star le repository
- 🐛 Signaler les bugs
- 💡 Proposer des features
- 🤝 Contribuer au code
- 📢 Partager avec vos amis

---

**Survivez. Construisez. Prospérez. 🧟‍♂️**

*Document créé le 2025-11-11*
*Basé sur OpenFront.io - https://github.com/openfrontio/OpenFrontIO*
