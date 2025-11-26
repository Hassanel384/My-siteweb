# 🚀 Déploiement Rapide - 5 Minutes

## ✅ Votre configuration actuelle

- ✅ WordPress accessible publiquement : `http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io`
- ✅ Site Next.js prêt à déployer
- ✅ Toutes les pages créées

## 🎯 Déploiement en 3 étapes

### Étape 1 : Installer Vercel CLI (1 minute)

Ouvrez PowerShell et exécutez :

```powershell
npm install -g vercel
```

### Étape 2 : Se connecter à Vercel (1 minute)

```powershell
vercel login
```

Suivez les instructions dans votre navigateur.

### Étape 3 : Déployer (3 minutes)

```powershell
cd "c:\Users\hassan\Desktop\NV projet"
vercel --prod
```

Répondez aux questions :
- **Set up and deploy?** → `Y` (Oui)
- **Which scope?** → Sélectionnez votre compte
- **Link to existing project?** → `N` (Non)
- **Project name?** → `claritas` (ou votre choix)
- **Directory?** → Appuyez sur `Entrée`
- **Override settings?** → `N` (Non)

## 🎉 C'est fait !

Vercel vous donnera une URL comme :
```
https://claritas.vercel.app
```

Votre site est maintenant **accessible au public** ! 🌐

## 🔧 Configuration supplémentaire (optionnel)

### Ajouter un domaine personnalisé

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet `claritas`
3. Allez dans **Settings > Domains**
4. Ajoutez votre domaine (ex: `www.claritas.com`)
5. Configurez les DNS selon les instructions

### Configurer les emails (SMTP)

1. Dans Vercel Dashboard : **Settings > Environment Variables**
2. Ajoutez :
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `votre-email@gmail.com`
   - `SMTP_PASS` = `votre-mot-de-passe-app`

3. Redéployez :
```powershell
vercel --prod
```

## 📱 Tester votre site

Une fois déployé, testez :
- ✅ Page d'accueil : `https://votre-site.vercel.app/fr`
- ✅ Produits : `https://votre-site.vercel.app/fr/produits`
- ✅ Blog : `https://votre-site.vercel.app/fr/blog`
- ✅ Contact : `https://votre-site.vercel.app/fr/contact`

## 🔄 Mises à jour futures

Pour mettre à jour votre site après des modifications :

```powershell
cd "c:\Users\hassan\Desktop\NV projet"
vercel --prod
```

## ❓ Problèmes courants

### "Command not found: vercel"
Redémarrez PowerShell après l'installation.

### "No token found"
Exécutez `vercel login` à nouveau.

### "Build failed"
Vérifiez que `npm run build` fonctionne localement d'abord.

## 📞 Besoin d'aide ?

Documentation Vercel : https://vercel.com/docs

---

**Votre site Claritas sera en ligne en moins de 5 minutes ! 🚀**
