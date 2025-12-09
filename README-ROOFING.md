# Excellence Toiture - Homepage Premium

Une homepage ultra moderne et design pour un artisan couvreur avec une identité de marque forte et professionnelle.

## 🎨 Identité de Marque

### Palette de Couleurs
- **Ardoise foncé** : `#1e293b` - Couleur principale, évoque la solidité et le professionnalisme
- **Terracotta moderne** : `#dc6b4a` - Couleur d'accent, rappelle les tuiles traditionnelles
- **Beige naturel** : `#f5f1e8` - Fond chaleureux et élégant
- **Or accent** : `#d4af37` - Touche de prestige et d'excellence

### Typographie
- **Titres** : Inter (sans-serif moderne)
- **Corps de texte** : Crimson Text (serif élégant)

## 📱 Structure de la Page

### 1. Navigation Premium
- Logo animé avec rotation au hover
- Menu desktop avec liens soulignés au hover
- Menu mobile responsive avec animation
- Bouton téléphone mis en avant
- Effet de transparence au scroll

### 2. Hero Section (Fullscreen)
- Background parallaxe avec image haute qualité
- Titre accrocheur avec animation fade-in
- Badge "Artisan Certifié RGE"
- 2 CTA contrastés : "Devis Gratuit" et "Nos Réalisations"
- Scroll indicator animé

### 3. Barre de Réassurance
- 4 badges : Expérience, Garantie, Certification, Satisfaction
- Animations au scroll avec délais échelonnés
- Icônes personnalisées

### 4. Services Premium (6 services)
- **Couverture Traditionnelle** - Tuiles, ardoises, zinc
- **Toiture Terrasse** - Étanchéité et aménagement
- **Isolation Thermique** - Performance énergétique
- **Zinguerie** - Gouttières et évacuation
- **Rénovation Patrimoine** - Restauration historique
- **Panneaux Solaires** - Solutions écologiques

Chaque carte avec :
- Icône custom colorée
- Titre et description
- Effet hover avec élévation
- Lien "En savoir plus"

### 5. Galerie Réalisations
- Système de filtres (Tous, Résidentiel, Commercial, Patrimoine)
- Grid responsive avec cards
- Images Unsplash haute qualité
- Overlay avec infos au hover
- Effet zoom sur l'image
- Bouton "Voir le projet"

### 6. Pourquoi Nous Choisir
- Layout asymétrique avec 4 arguments clés
- Images superposées avec badge central "500+ Projets"
- Animations au scroll
- Focus sur : Expertise, Matériaux, Délais, SAV

### 7. Certifications & Partenaires
- Slider automatique en boucle
- Logos en grayscale → couleur au hover
- RGE, Qualibat, Imerys, Velux, etc.

### 8. Témoignages Clients
- Carrousel avec navigation
- 3 témoignages avec notation 5★
- Photo, nom, projet
- Auto-play avec pause au hover
- Support tactile (swipe)

### 9. CTA Final avec Formulaire
- Design split : Message + Formulaire
- 3 points de vérification
- Champs : Nom, Téléphone, Email, Type de projet, Message
- Validation et feedback visuel
- Notifications de succès/erreur
- Bouton téléphone grand format

### 10. Footer Premium
- 4 colonnes : Société, Services, Liens, Contact
- Logo et description
- Réseaux sociaux
- Zone d'intervention (Île-de-France)
- Mentions légales et CGV

## ⚡ Fonctionnalités Techniques

### Animations & Interactions
- **Parallaxe** sur hero background
- **Scroll animations** avec Intersection Observer
- **Hover effects** sophistiqués sur toutes les cartes
- **Smooth scroll** pour navigation interne
- **Slider testimonials** avec navigation et auto-play
- **Gallery filters** avec animations échelonnées
- **Form validation** avec feedback temps réel

### Performance
- **Lazy loading** des images
- **Code optimisé** avec classes utilitaires Tailwind
- **Animations CSS** performantes (GPU-accelerated)
- **Debounce/Throttle** sur événements scroll
- **Preload** des ressources critiques

### Accessibilité
- **Navigation clavier** complète
- **Focus management** dans le menu mobile
- **ARIA labels** sur éléments interactifs
- **Contraste** de couleurs respecté (WCAG AA)
- **Responsive** mobile-first

### Analytics
- Tracking des clics sur CTA
- Tracking des soumissions de formulaire
- Tracking de la profondeur de scroll
- Prêt pour Google Analytics / Matomo

## 🚀 Installation et Utilisation

### Prérequis
```bash
Node.js 14+ et npm
```

### Installation
```bash
# Installer les dépendances
npm install

# Build Tailwind CSS
npm run build:tailwind

# Ou en mode développement (watch)
npm run start:tailwind
```

### Fichiers Principaux
- `roofing-homepage.html` - Page HTML principale
- `roofing-styles.css` - Styles CSS personnalisés
- `roofing-script.js` - JavaScript pour interactions
- `tailwind.config.js` - Configuration Tailwind avec thème
- `tailwind-build.css` - CSS Tailwind compilé

### Déploiement
1. Assurez-vous que `tailwind-build.css` est à jour
2. Uploadez tous les fichiers sur votre serveur
3. Ouvrez `roofing-homepage.html` dans le navigateur

## 🎯 Personnalisation

### Modifier les Couleurs
Éditez `tailwind.config.js` :
```javascript
colors: {
  slate: { dark: '#votre-couleur' },
  terracotta: { DEFAULT: '#votre-couleur' },
  // ...
}
```
Puis rebuild : `npm run build:tailwind`

### Changer les Images
Remplacez les URLs Unsplash dans `roofing-homepage.html` par vos propres images.

### Ajouter/Modifier Services
Dupliquez une `service-card` dans la section Services et modifiez le contenu.

### Modifier le Formulaire
Éditez la fonction `handleSubmit()` dans `roofing-script.js` pour connecter votre backend/API.

### Analytics
Ajoutez votre ID Google Analytics dans le `<head>` :
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA-XXXXXXX"></script>
```

## 📊 Performance

### Lighthouse Scores (objectifs)
- **Performance** : > 90
- **Accessibility** : > 95
- **Best Practices** : > 90
- **SEO** : > 90

### Optimisations Appliquées
- Minification CSS avec Tailwind
- Animations CSS hardware-accelerated
- Lazy loading images
- Debounced scroll events
- Pas de frameworks lourds (vanilla JS)

## 🎨 Design System

### Spacing
- Base : 0.25rem (4px)
- Utilisé : 1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24

### Border Radius
- Small : 0.5rem (8px)
- Medium : 0.75rem (12px)
- Large : 1rem (16px)
- XL : 1.5rem (24px)

### Shadows
- sm : `0 4px 12px rgba(...)`
- md : `0 8px 24px rgba(...)`
- lg : `0 12px 40px rgba(...)`

### Transitions
- Fast : 200ms
- Normal : 300ms
- Slow : 400ms
- Easing : cubic-bezier(0.4, 0, 0.2, 1)

## 📱 Breakpoints

- **Mobile** : < 640px
- **Tablet** : 640px - 1024px
- **Desktop** : > 1024px
- **XL** : > 1280px

## 🔧 Modules JavaScript

### Navigation
- Scroll effect sur navbar
- Menu mobile toggle
- Smooth scroll

### ScrollAnimations
- Intersection Observer
- Parallaxe hero
- Animations échelonnées

### GalleryFilters
- Filtrage dynamique
- Animations au changement

### TestimonialsSlider
- Navigation prev/next
- Auto-play
- Touch/swipe support

### ContactForm
- Validation
- Submit handling
- Notifications

### PerformanceOptimizer
- Lazy loading
- Resource preload
- Page load handling

### Analytics
- Event tracking
- Scroll depth
- Form interactions

### Accessibility
- Keyboard navigation
- Focus management
- ARIA enhancement

## 📞 Support

Pour toute question sur l'utilisation ou la personnalisation :
- Documentation Tailwind : https://tailwindcss.com/docs
- MDN Web Docs : https://developer.mozilla.org

## 📄 Licence

Ce projet est fourni tel quel pour Excellence Toiture.

---

**Développé avec ❤️ et ☕**

Stack : HTML5 • CSS3 • JavaScript ES6+ • Tailwind CSS 3.4
