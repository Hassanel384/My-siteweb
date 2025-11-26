# Claritas - Site Web Matériel Médical ORL

Site Next.js 14+ avec TypeScript, Tailwind CSS et WordPress Headless CMS.

## 🚀 Installation

### Site Claritas - Next.js 14 + WordPress Headless

Site web moderne pour Claritas, entreprise spécialisée dans le matériel médical ORL.

## ✅ État du projet

- ✅ WordPress API accessible et fonctionnelle
- ✅ WooCommerce installé sur WordPress
- ✅ Structure Next.js complète
- ✅ Toutes les pages créées
- ✅ Composants réutilisables
- ✅ Multilingue FR/EN
- ✅ Design responsive

## 🚀 Installation rapide

### 1. Installer Node.js et les dépendances

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### 2. Configurer WordPress

Suivez le guide détaillé : **[INSTALLATION_WORDPRESS.md](./INSTALLATION_WORDPRESS.md)**

Le site fonctionnera immédiatement mais affichera des listes vides jusqu'à ce que vous ajoutiez du contenu dans WordPress.

## 🌐 URLs

- **Site Next.js** : http://localhost:3000/fr
- **WordPress** : http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io
- **API WordPress** : http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wp/v2

## 📁 Structure du projet

```
├── app/
│   ├── [lang]/              # Routes multilingues (fr/en)
│   │   ├── page.tsx         # Page d'accueil
│   │   ├── produits/        # Pages produits
│   │   ├── blog/            # Pages blog
│   │   ├── services/        # Page services
│   │   ├── a-propos/        # Page à propos
│   │   └── contact/         # Page contact
│   ├── api/                 # API Routes
│   │   ├── contact/         # Formulaire contact
│   │   ├── devis/           # Demande devis
│   │   ├── newsletter/      # Newsletter
│   │   └── sitemap/         # Sitemap XML
│   ├── globals.css          # Styles globaux
│   └── layout.tsx           # Layout racine
├── components/              # Composants réutilisables
├── lib/                     # Bibliothèques (WordPress API)
├── dictionaries/            # Traductions FR/EN
├── types/                   # Types TypeScript
└── public/                  # Fichiers statiques
```

## 🎨 Design

- **Couleurs principales:**
  - Blanc: 60%
  - Orange (#FF6B3D): 30%
  - Gris/Noir: 10%

## 🌐 API WordPress

- **Base URL:** http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wp/v2
- **Endpoints:**
  - `/posts` - Articles de blog
  - `/produits` - Produits (Custom Post Type)
  - `/categories` - Catégories

## ✨ Fonctionnalités

✅ Multilingue (FR/EN) avec switch dans header  
✅ Recherche globale (produits + blog)  
✅ Formulaires (contact, devis, newsletter)  
✅ ISR avec revalidation 60s  
✅ SEO optimisé avec meta descriptions  
✅ Responsive (mobile/tablet/desktop)  
✅ Images optimisées avec next/image  
✅ Sitemap.xml automatique  

## 📦 Commandes disponibles

```bash
npm run dev      # Développement (port 3000)
npm run build    # Build production
npm run start    # Démarrer production
npm run lint     # Linter ESLint
```

## 🔧 Configuration SMTP

Modifier `.env.local` avec vos informations d'envoi d'emails:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-app
EMAIL_FROM=noreply@claritas.com
EMAIL_TO=contact@claritas.com
```

## 📝 Catégories de produits

1. **ORL & Maxillo-Faciale**
   - Matériels
   - Instrumentations
   - Consommables

2. **Chirurgie Plastique**
   - Matériels
   - Instrumentations
   - Liposuccion

3. **Neurochirurgie**

## 🚀 Déploiement

```bash
# Build de production
npm run build

# Déployer sur Vercel (recommandé)
vercel deploy

# Ou autre plateforme supportant Next.js
```

## 📄 License

© 2024 Claritas. Tous droits réservés.
