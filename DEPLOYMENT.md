# Deployment Guide - Tiki Village

Ce guide explique comment déployer la plateforme Tiki Village sur **Coolify** (auto-hébergé).

## Prérequis

- Un serveur avec **Coolify** installé (LXC, VPS, ou dédié)
- Un compte GitHub (pour le déploiement automatique depuis le repo)
- Un compte PayZen/OSB pour le traitement des paiements

## Architecture

```
┌─────────────────────────────────┐
│           Coolify               │
│  ┌───────────┐  ┌───────────┐  │
│  │  Next.js  │  │ PostgreSQL│  │
│  │  (App)    │──│   (DB)    │  │
│  │  :3000    │  │   :5432   │  │
│  └───────────┘  └───────────┘  │
│        │                        │
│  ┌───────────┐                  │
│  │  Volume   │                  │
│  │  (media)  │                  │
│  └───────────┘                  │
└─────────────────────────────────┘
```

## Étape 1 : Configuration dans Coolify

### Option A : Déploiement via Docker Compose

1. Dans Coolify, créez un nouveau projet
2. Ajoutez une nouvelle ressource → **Docker Compose**
3. Connectez votre repository GitHub `TahitiZoom/tiki-village`
4. Coolify détectera automatiquement le `docker-compose.yml`

### Option B : Déploiement via Dockerfile

1. Dans Coolify, créez un nouveau projet
2. Ajoutez une nouvelle ressource → **Dockerfile**
3. Connectez votre repository GitHub
4. Ajoutez séparément un service **PostgreSQL** dans le même projet

## Étape 2 : Variables d'environnement

Configurez ces variables dans l'interface Coolify :

### Base de données
```
DATABASE_URL=postgresql://tikivillage:<mot_de_passe>@db:5432/tikivillage
POSTGRES_PASSWORD=<mot_de_passe_sécurisé>
```

### Payload CMS
```
PAYLOAD_SECRET=<clé_aléatoire_32_caractères_minimum>
NEXT_PUBLIC_SERVER_URL=https://votre-domaine.pf
```

### PayZen
```
PAYZEN_SHOP_ID=votre_shop_id
PAYZEN_MODE=TEST
PAYZEN_TEST_KEY=votre_test_key
PAYZEN_PROD_KEY=votre_prod_key
PAYZEN_HMAC_TEST_KEY=votre_hmac_test_key
PAYZEN_HMAC_PROD_KEY=votre_hmac_prod_key
PAYZEN_PUBLIC_TEST_KEY=votre_public_test_key
PAYZEN_PUBLIC_PROD_KEY=votre_public_prod_key
```

### Email
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=vaimoe@tikivillage.pf
SMTP_PASSWORD=your-smtp-password-here
SMTP_FROM=accueil@tikivillage.pf
SMTP_ADMIN_EMAIL=accueil@tikivillage.pf
```

## Étape 3 : Configuration du domaine

1. Dans Coolify, allez dans les paramètres du service
2. Ajoutez votre domaine personnalisé (ex : `www.tikivillage.pf`)
3. Coolify gère automatiquement les certificats SSL via Let's Encrypt
4. Mettez à jour `NEXT_PUBLIC_SERVER_URL` avec votre domaine

## Étape 4 : Post-déploiement

### 1. Créer le compte administrateur

Visitez votre site :
```
https://votre-domaine.pf/admin
```

Créez votre compte admin :
- Email : admin@tikivillage.pf
- Mot de passe : [Choisir un mot de passe fort]
- Rôle : Admin

### 2. Configurer les Webhooks PayZen

Dans votre tableau de bord PayZen, configurez :

**Webhook standard :**
```
https://votre-domaine.pf/api/payzen/notify
```

**Webhook REST API :**
```
https://votre-domaine.pf/api/payzen/notify-rest
```

### 3. Données initiales

Utilisez les endpoints de seed (protégés par `SEED_TOKEN`) :
```
https://votre-domaine.pf/api/seed-all
```

Ou manuellement :
1. Connectez-vous au panneau d'administration
2. Créez les catégories (Ateliers, Soirées, Mariages)
3. Créez les produits (voir `SEED_DATA.md`)
4. Configurez les Globals (Header, Footer, SiteSettings)

## Sauvegardes

### Base de données PostgreSQL

Coolify propose des sauvegardes automatiques pour PostgreSQL. Vous pouvez aussi les faire manuellement :

```bash
# Sauvegarde
docker exec <container_postgres> pg_dump -U tikivillage tikivillage > backup_$(date +%Y%m%d).sql

# Restauration
docker exec -i <container_postgres> psql -U tikivillage tikivillage < backup.sql
```

### Fichiers média

Le volume `media_data` contient tous les fichiers uploadés. Sauvegardez-le régulièrement.

## Dépannage

### Erreurs de build

**Erreur : Cannot find module '@payloadcms/...'**
- Solution : Reconstruisez l'image Docker dans Coolify

**Erreur : Database connection failed**
- Vérifiez que le service PostgreSQL est bien démarré
- Vérifiez la variable `DATABASE_URL`
- Vérifiez que le container app peut joindre le container db

### Erreurs runtime

**PayZen webhook ne fonctionne pas**
- Vérifiez l'URL du webhook dans PayZen
- Vérifiez les variables d'environnement
- Consultez les logs dans Coolify

**Images qui ne se chargent pas**
- Vérifiez que le volume media est bien monté
- Vérifiez les permissions du dossier `/app/media`

## Checklist de sécurité

- [ ] Utiliser un `PAYLOAD_SECRET` fort (32+ caractères)
- [ ] Mot de passe PostgreSQL fort et unique
- [ ] Variables PayZen de production uniquement en production
- [ ] HTTPS activé (automatique avec Coolify + Let's Encrypt)
- [ ] Sauvegardes automatiques configurées
- [ ] Audits de sécurité réguliers avec `npm audit`

## Mise à jour

Pour mettre à jour l'application :

1. Poussez vos modifications sur la branche `main`
2. Coolify détecte automatiquement le changement et redéploie
3. Ou déclenchez manuellement un redéploiement depuis l'interface Coolify

## Support

Pour les problèmes de déploiement :
- Coolify : https://coolify.io/docs
- Payload CMS : https://payloadcms.com/docs
- PostgreSQL : https://www.postgresql.org/docs/
