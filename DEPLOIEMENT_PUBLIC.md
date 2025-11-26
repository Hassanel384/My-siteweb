# 🌐 Déploiement Public du Site Claritas

## ✅ Configuration Actuelle

Votre WordPress est **déjà accessible publiquement** :
- **URL** : http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io
- **API** : http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wp/v2

Le site Next.js pointe déjà vers cette URL publique. Il ne reste plus qu'à déployer le site Next.js pour qu'il soit accessible au public.

## 🚀 Option 1 : Déployer sur Vercel (Recommandé - GRATUIT)

### Étape 1 : Créer un compte Vercel

1. Allez sur https://vercel.com
2. Cliquez sur **Sign Up**
3. Connectez-vous avec GitHub, GitLab ou email

### Étape 2 : Installer Vercel CLI

```bash
npm install -g vercel
```

### Étape 3 : Se connecter à Vercel

```bash
vercel login
```

### Étape 4 : Déployer le site

```bash
cd "c:\Users\hassan\Desktop\NV projet"
vercel
```

Suivez les instructions :
- **Set up and deploy?** → Yes
- **Which scope?** → Votre compte
- **Link to existing project?** → No
- **Project name?** → claritas (ou votre choix)
- **Directory?** → ./ (appuyez sur Entrée)
- **Override settings?** → No

### Étape 5 : Configurer les variables d'environnement

Dans le dashboard Vercel :
1. Allez dans **Settings > Environment Variables**
2. Ajoutez :
   - `WORDPRESS_API_URL` = `http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wp/v2`
   - `SMTP_HOST` = votre serveur SMTP
   - `SMTP_PORT` = 587
   - `SMTP_USER` = votre email
   - `SMTP_PASS` = votre mot de passe

### Étape 6 : Redéployer

```bash
vercel --prod
```

**Votre site sera accessible à** : `https://claritas.vercel.app` (ou votre domaine personnalisé)

---

## 🚀 Option 2 : Déployer sur Netlify (Alternative GRATUITE)

### Étape 1 : Créer un compte Netlify

1. Allez sur https://netlify.com
2. Créez un compte gratuit

### Étape 2 : Installer Netlify CLI

```bash
npm install -g netlify-cli
```

### Étape 3 : Se connecter

```bash
netlify login
```

### Étape 4 : Build et déployer

```bash
cd "c:\Users\hassan\Desktop\NV projet"
npm run build
netlify deploy --prod
```

---

## 🚀 Option 3 : Utiliser un serveur VPS

Si vous avez un serveur (DigitalOcean, AWS, etc.) :

### 1. Installer Node.js sur le serveur

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Cloner le projet

```bash
git clone votre-repo
cd NV-projet
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Créer le fichier .env.local

```bash
nano .env.local
```

Ajoutez :
```env
WORDPRESS_API_URL=http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wp/v2
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe
```

### 5. Build et lancer

```bash
npm run build
npm run start
```

### 6. Configurer PM2 (pour garder le site en ligne)

```bash
npm install -g pm2
pm2 start npm --name "claritas" -- start
pm2 startup
pm2 save
```

### 7. Configurer Nginx (reverse proxy)

```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/claritas
```

Ajoutez :
```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activez :
```bash
sudo ln -s /etc/nginx/sites-available/claritas /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🌐 Option 4 : Exposer temporairement avec Ngrok

Pour tester rapidement en public :

### 1. Installer Ngrok

Téléchargez depuis https://ngrok.com/download

### 2. Lancer le site Next.js

```bash
npm run dev
```

### 3. Exposer avec Ngrok

```bash
ngrok http 3000
```

Ngrok vous donnera une URL publique comme :
`https://abc123.ngrok.io`

**Note** : Cette URL change à chaque redémarrage (version gratuite)

---

## 📝 Domaine Personnalisé

### Pour Vercel

1. Achetez un domaine (ex: claritas.com)
2. Dans Vercel : **Settings > Domains**
3. Ajoutez votre domaine
4. Configurez les DNS selon les instructions

### Pour Netlify

1. Dans Netlify : **Domain Settings**
2. Ajoutez votre domaine personnalisé
3. Configurez les DNS

---

## ✅ Checklist de Déploiement

- [ ] WordPress accessible publiquement
- [ ] Contenu ajouté dans WordPress (produits + articles)
- [ ] Site Next.js testé localement (`npm run dev`)
- [ ] Variables d'environnement configurées
- [ ] Build réussi (`npm run build`)
- [ ] Déployé sur Vercel/Netlify/VPS
- [ ] Site accessible publiquement
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] HTTPS activé (automatique sur Vercel/Netlify)
- [ ] Formulaires testés en production
- [ ] SEO vérifié (Google Search Console)

---

## 🎯 Recommandation

**Pour Claritas, je recommande Vercel** :
- ✅ Gratuit pour les projets Next.js
- ✅ Déploiement en 1 commande
- ✅ HTTPS automatique
- ✅ CDN mondial
- ✅ Builds automatiques
- ✅ Domaine personnalisé gratuit
- ✅ Support Next.js natif

---

## 📞 Support

Si vous avez besoin d'aide :
1. Vérifiez que WordPress est accessible
2. Testez l'API : http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wp/v2/posts
3. Vérifiez les logs de déploiement
4. Consultez la documentation de la plateforme choisie

---

**Votre site sera bientôt en ligne ! 🚀**
