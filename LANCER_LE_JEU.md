# 🎮 Comment Lancer ZombieFront.io

## 📋 Prérequis

**Node.js doit être installé sur votre machine.**

Vérifiez avec :
```bash
node --version
# Doit afficher v18.0.0 ou supérieur
```

Si pas installé : **[Télécharger Node.js](https://nodejs.org/)**

---

## 🚀 Méthode 1 : Script Automatique (Recommandé)

### Sur Linux/Mac :
```bash
./start-game.sh
```

### Sur Windows :
```bash
# Ouvrir PowerShell ou Git Bash
bash start-game.sh
```

Le script va :
1. ✅ Installer les dépendances
2. ✅ Compiler le client
3. ✅ Lancer le serveur
4. ✅ Vous donner l'URL

Ensuite **ouvrez votre navigateur** sur : **http://localhost:3000**

---

## 🚀 Méthode 2 : Manuelle

### 1. Installer les dépendances
```bash
npm install
```

### 2. Compiler le client
```bash
npm run build-dev
```

### 3. Lancer le serveur
```bash
node server-simple.js
```

### 4. Ouvrir le navigateur
Aller sur : **http://localhost:3000**

---

## 🎯 Vérifier que ça Marche

### Le serveur devrait afficher :
```
🧟 ZombieFront.io Server
================================
HTTP:      http://localhost:3000
WebSocket: ws://localhost:3001
Mode:      Development
================================
```

### Tester l'API :
```bash
curl http://localhost:3000/health
# Doit répondre : {"status":"ok",...}
```

---

## 🛑 Arrêter le Serveur

### Linux/Mac :
```bash
killall node
```

### Windows :
```powershell
# Ouvrir le gestionnaire de tâches
# Tuer le processus "node.exe"
```

Ou appuyer sur **Ctrl+C** dans le terminal où tourne le serveur.

---

## 🧪 Tester le Multijoueur

1. Ouvrir **plusieurs onglets** sur `http://localhost:3000`
2. Chaque onglet = un joueur différent
3. Le compteur "Players: X" va augmenter !

---

## 🐛 Problèmes Courants

### "Port 3000 déjà utilisé"
```bash
# Tuer le processus qui utilise le port
killall node

# Ou changer le port dans server-simple.js
const PORT = 3001; // Au lieu de 3000
```

### "Cannot find module"
```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
```

### "Webpack error"
```bash
# Rebuilder le client
npm run build-dev
```

### Le navigateur affiche une page blanche
1. Ouvrir la **console** (F12)
2. Regarder les erreurs
3. Vérifier que les fichiers `dist/client/*.js` existent

---

## 📂 Structure des Fichiers

```
zombiefront/
├── server-simple.js       ← Serveur
├── start-game.sh         ← Script de lancement
├── dist/client/          ← Client compilé
│   ├── index.html
│   └── bundle.*.js
├── src/                  ← Code source
└── package.json
```

---

## 🎮 Jouer !

Une fois sur http://localhost:3000 :

1. **Entrer votre nom** dans le champ
2. **Cliquer sur "Join Game"**
3. **C'est parti !** 🧟

Le jeu affichera :
- 🍕 Nourriture
- 💊 Médicaments
- 🔫 Armes
- 🔧 Matériaux
- 👥 Survivants

Pour l'instant c'est un prototype. Les zombies et la carte seront ajoutés progressivement !

---

## ⚡ Raccourcis Utiles

### Relancer rapidement :
```bash
killall node && node server-simple.js &
```

### Voir les logs du serveur :
```bash
# Les logs s'affichent dans le terminal
```

### Rebuild + Relancer :
```bash
npm run build-dev && killall node && node server-simple.js &
```

---

## 🆘 Besoin d'Aide ?

Vérifiez :
1. Node.js installé ? `node --version`
2. Dépendances installées ? `ls node_modules`
3. Client compilé ? `ls dist/client`
4. Serveur actif ? `curl http://localhost:3000/health`

Si tout est OK mais ça ne marche toujours pas, il y a peut-être un **firewall** qui bloque le port 3000.

---

**Bon jeu ! Survivez à l'apocalypse zombie ! 🧟‍♂️🎮**
