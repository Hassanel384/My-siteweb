# 🚀 Installation et Configuration WordPress pour Claritas

## ✅ Étape 1 : Accéder à WordPress

Votre WordPress est déjà accessible à :
**http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io**

L'API REST fonctionne correctement ! ✅

## 📦 Étape 2 : Installer les plugins nécessaires

### Option A : Utiliser WooCommerce (Recommandé)

WooCommerce est **déjà installé** sur votre WordPress ! 🎉

1. **Activer WooCommerce** (si pas déjà fait)
   - Allez dans **Extensions > Extensions installées**
   - Activez **WooCommerce**

2. **Configurer WooCommerce**
   - Suivez l'assistant de configuration
   - Désactivez le paiement en ligne (vous vendez sur devis)
   - Configurez les catégories de produits :
     - ORL & Maxillo-Faciale
     - Chirurgie Plastique
     - Neurochirurgie

3. **Ajouter des produits**
   - Allez dans **Produits > Ajouter un produit**
   - Remplissez :
     - Titre du produit
     - Description
     - Image du produit
     - Catégorie
     - Prix (ou "Sur devis")

### Option B : Utiliser un Custom Post Type

Si vous préférez ne pas utiliser WooCommerce :

1. **Copier le code PHP**
   - Ouvrez le fichier `wordpress-config/functions.php`
   - Copiez tout le code

2. **Ajouter au thème WordPress**
   - Dans WordPress, allez dans **Apparence > Éditeur de thème**
   - Ouvrez le fichier `functions.php` de votre thème
   - Collez le code à la fin du fichier
   - Cliquez sur **Mettre à jour le fichier**

3. **Installer Advanced Custom Fields (ACF)**
   - Allez dans **Extensions > Ajouter**
   - Recherchez "Advanced Custom Fields"
   - Installez et activez le plugin

4. **Vérifier l'installation**
   - Vous devriez voir un nouveau menu **Produits Médicaux** dans l'admin
   - Cliquez dessus pour ajouter des produits

## 📝 Étape 3 : Ajouter du contenu de test

### Produits

Créez au moins 3-6 produits avec :
- **Titre** : Ex. "Microscope Chirurgical ORL"
- **Description** : Description détaillée du produit
- **Image à la une** : Photo du produit
- **Catégorie** : ORL & Maxillo-Faciale, etc.
- **Spécifications techniques** (si ACF installé)
- **Fichier PDF** : Fiche technique (optionnel)

### Articles de blog

1. Allez dans **Articles > Ajouter**
2. Créez 3-5 articles avec :
   - Titre
   - Contenu (au moins 200 mots)
   - Image à la une
   - Catégorie

## 🔧 Étape 4 : Configuration des permaliens

**IMPORTANT** : Pour que l'API fonctionne correctement

1. Allez dans **Réglages > Permaliens**
2. Sélectionnez **Nom de l'article** ou **Structure personnalisée**
3. Cliquez sur **Enregistrer les modifications**

## 🧪 Étape 5 : Tester l'API

Ouvrez ces URLs dans votre navigateur pour vérifier :

### Posts (Articles)
```
http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wp/v2/posts
```

### Products (WooCommerce)
```
http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wc/v3/products
```
OU
```
http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wp/v2/products
```

### Produits (Custom Post Type)
```
http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wp/v2/produits
```

### Catégories
```
http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wp/v2/categories
```

## 🎨 Étape 6 : Lancer le site Next.js

Une fois le contenu ajouté dans WordPress :

```bash
cd "c:\Users\hassan\Desktop\NV projet"
npm run dev
```

Ouvrez : **http://localhost:3000/fr**

Le site devrait maintenant afficher le contenu de WordPress ! 🎉

## 🔍 Dépannage

### L'API ne retourne rien
- Vérifiez que les produits sont **publiés** (pas en brouillon)
- Vérifiez les permaliens (Réglages > Permaliens)
- Videz le cache WordPress si vous avez un plugin de cache

### Erreur 404 sur l'API
- Allez dans **Réglages > Permaliens**
- Cliquez sur **Enregistrer** sans rien changer
- Cela va régénérer les règles de réécriture

### Les images ne s'affichent pas
- Vérifiez que chaque produit/article a une **image à la une**
- Vérifiez que les images sont accessibles publiquement

## 📚 Ressources

- **Documentation WooCommerce** : https://woocommerce.com/documentation/
- **API REST WordPress** : https://developer.wordpress.org/rest-api/
- **Advanced Custom Fields** : https://www.advancedcustomfields.com/

## ✅ Checklist finale

- [ ] WordPress accessible
- [ ] WooCommerce activé OU Custom Post Type créé
- [ ] ACF installé (si custom post type)
- [ ] Permaliens configurés
- [ ] 3-6 produits créés avec images
- [ ] 3-5 articles de blog créés
- [ ] API testée et fonctionnelle
- [ ] Site Next.js lancé avec `npm run dev`
- [ ] Contenu visible sur http://localhost:3000/fr

---

**Besoin d'aide ?** Vérifiez les logs dans la console du navigateur ou dans le terminal Next.js.
