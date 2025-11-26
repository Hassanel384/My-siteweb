# 🚀 Guide : Upload Direct sur Vercel

## Étape 1 : Préparer le projet (1 minute)

### Vérifier que tout est prêt

```powershell
cd "c:\Users\hassan\Desktop\NV projet"

# Vérifier que le build fonctionne
npm run build
```

Si le build réussit, vous êtes prêt ! ✅

---

## Étape 2 : Créer un compte Vercel (1 minute)

1. Allez sur **https://vercel.com**
2. Cliquez sur **"Sign Up"**
3. Choisissez **"Continue with GitHub"** (ou Email)
4. Autorisez Vercel à accéder à GitHub

---

## Étape 3 : Importer depuis GitHub (2 minutes)

### Si votre projet est sur GitHub :

1. Dans Vercel Dashboard, cliquez sur **"Add New..."** → **"Project"**
2. Cliquez sur **"Import Git Repository"**
3. Trouvez votre repository **"NV projet"** dans la liste
4. Cliquez sur **"Import"**

### Configuration automatique :

Vercel détectera automatiquement :
- ✅ Framework : **Next.js**
- ✅ Build Command : `npm run build`
- ✅ Output Directory : `.next`
- ✅ Install Command : `npm install`

### Ajouter les variables d'environnement :

Avant de déployer, cliquez sur **"Environment Variables"** et ajoutez :

**Name** : `WORDPRESS_API_URL`  
**Value** : `http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wp/v2`

5. Cliquez sur **"Deploy"**

⏱️ **Temps de déploiement** : 2-3 minutes

---

## Étape 4 : Votre site est en ligne ! 🎉

Une fois le déploiement terminé :

1. Vercel vous donnera une URL comme : `https://nv-projet.vercel.app`
2. Cliquez sur **"Visit"** pour voir votre site
3. Testez : `https://votre-site.vercel.app/fr`

---

## 🔧 Configuration Avancée (Optionnel)

### Ajouter un domaine personnalisé

1. Dans votre projet Vercel → **Settings** → **Domains**
2. Ajoutez votre domaine (ex: `www.claritas.com`)
3. Configurez les DNS selon les instructions Vercel

### Ajouter les variables SMTP (pour les emails)

1. **Settings** → **Environment Variables**
2. Ajoutez :
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `votre-email@gmail.com`
   - `SMTP_PASS` = `votre-mot-de-passe-app`
3. **Deployments** → **Redeploy**

---

## 🔄 Mises à jour automatiques

Chaque fois que vous faites un `git push` sur GitHub :
- ✅ Vercel détecte automatiquement le changement
- ✅ Build et déploie la nouvelle version
- ✅ Votre site est mis à jour en 2-3 minutes

---

## 📱 URLs de votre site

Après déploiement, vous aurez :

- **Production** : `https://votre-projet.vercel.app`
- **Français** : `https://votre-projet.vercel.app/fr`
- **Anglais** : `https://votre-projet.vercel.app/en`

---

## ✅ Checklist de déploiement

- [ ] Compte Vercel créé
- [ ] Projet importé depuis GitHub
- [ ] Variable `WORDPRESS_API_URL` ajoutée
- [ ] Déploiement lancé
- [ ] Site accessible publiquement
- [ ] Pages testées (accueil, produits, blog, contact)
- [ ] Formulaires testés
- [ ] Version mobile testée

---

## ❓ Problèmes courants

### Build échoue
```
Error: Cannot find module 'next'
```
**Solution** : Vérifiez que `package.json` contient toutes les dépendances

### 404 sur toutes les pages
**Solution** : Vérifiez que le `Output Directory` est bien `.next`

### Variables d'environnement non prises en compte
**Solution** : Redéployez après avoir ajouté les variables

---

## 🎯 Prochaines étapes

1. ✅ Ajouter du contenu dans WordPress
2. ✅ Tester le site en production
3. ✅ Configurer un domaine personnalisé (optionnel)
4. ✅ Configurer Google Analytics (optionnel)
5. ✅ Soumettre à Google Search Console

---

**Votre site Claritas est maintenant en ligne ! 🚀**

Support Vercel : https://vercel.com/docs
