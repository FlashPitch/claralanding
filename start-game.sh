#!/bin/bash

echo "🧟 ZombieFront.io - Local Launch Script"
echo "======================================="
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé !"
    echo "Téléchargez-le sur : https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js détecté : $(node --version)"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Build client if needed
if [ ! -d "dist/client" ]; then
    echo "🔨 Compilation du client..."
    npm run build-dev
fi

# Kill any existing server
echo "🧹 Nettoyage des anciens processus..."
killall node 2>/dev/null || true

# Start server
echo "🚀 Lancement du serveur..."
echo ""
node server-simple.js &

sleep 2

echo ""
echo "✅✅✅ Le jeu est prêt ! ✅✅✅"
echo ""
echo "🌐 Ouvrez votre navigateur sur :"
echo "   http://localhost:3000"
echo ""
echo "Pour arrêter le serveur :"
echo "   killall node"
echo ""
