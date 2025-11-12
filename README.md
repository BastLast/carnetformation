# 📚 Le Catalogue de Formations

Bienvenue sur le catalogue de formations ! Cette application web permet de visualiser et filtrer des formations et conférences disponibles.

## 📋 Description du Projet

Le catalogue de formations est une application web simple et intuitive qui permet de :
- **Consulter** la liste des formations et conférences disponibles
- **Filtrer** les formations par type, niveau, format, certification
- **Rechercher** des formations par mots-clés
- **Visualiser** les formations dans un calendrier mensuel
- **Accéder** directement aux liens d'inscription pour chaque formation

L'application est entièrement en français et conçue pour être facile à utiliser et à maintenir.

## 🚀 Utilisation

Pour utiliser l'application, il suffit d'ouvrir le fichier `index.html` dans un navigateur web moderne. Aucune installation n'est nécessaire.

Vous pouvez également utiliser un serveur web local :
```bash
# Avec Python 3
python3 -m http.server 8080

# Avec Node.js (npx)
npx http-server -p 8080
```

Puis ouvrez votre navigateur à l'adresse : `http://localhost:8080`

## ✏️ Comment Mettre à Jour le Fichier formations.json

Le fichier `formations.json` contient toutes les formations et conférences affichées dans le catalogue. Voici comment le modifier :

### Structure d'une Formation

Chaque formation est un objet JSON avec les champs suivants :

```json
{
  "id": "identifiant-unique",
  "categorie": "Catégorie de la formation",
  "titre": "Titre de la formation",
  "description": "Description concise (évitez de répéter les infos déjà présentes dans d'autres champs)",
  "modules": ["Module 1", "Module 2"],
  "duree": "2 heures",
  "type": "Formation",
  "prix": "Gratuit",
  "date": "2025-12-15",
  "horaire": "10:00-12:00",
  "niveau": "Tous niveaux",
  "lien": "https://example.com/formation",
  "organisateur": "Nom de l'organisateur",
  "public_cible": ["Public 1", "Public 2"],
  "tags": ["tag1", "tag2"],
  "certifiante": false,
  "format": "Distanciel"
}
```

### Description des Champs

| Champ | Type | Description | Obligatoire |
|-------|------|-------------|-------------|
| `id` | String | Identifiant unique de la formation (ex: "ergo-001") | ✅ Oui |
| `categorie` | String | Catégorie principale (ex: "Ergo", "Féminisme") | ✅ Oui |
| `titre` | String | Titre complet de la formation | ✅ Oui |
| `description` | String | Description concise (ne pas répéter durée, modules, prix) | ✅ Oui |
| `modules` | Array | Liste des modules ou chapitres (peut être vide `[]`) | ✅ Oui |
| `duree` | String | Durée de la formation (ex: "2h30", "6 heures") | ✅ Oui |
| `type` | String | "Formation" ou "Conférence" | ✅ Oui |
| `prix` | String | Prix ou "Gratuit" | ✅ Oui |
| `date` | String | Date au format YYYY-MM-DD ou `""` si toujours disponible | ✅ Oui |
| `horaire` | String | Horaire (ex: "10:00-12:00") ou "En ligne" | ✅ Oui |
| `niveau` | String | "Débutant", "Intermédiaire", "Avancé", "Tous niveaux", "Niveau 1", "Niveau 2" | ✅ Oui |
| `lien` | String | Lien unique vers la page de la formation | ✅ Oui |
| `organisateur` | String | Nom de l'organisme organisateur | ✅ Oui |
| `public_cible` | Array | Liste des publics visés | ✅ Oui |
| `tags` | Array | Mots-clés pour la recherche | ✅ Oui |
| `certifiante` | Boolean | `true` ou `false` | ✅ Oui |
| `format` | String | "Présentiel", "Distanciel" ou "Hybride" | ✅ Oui |

### Formations Sans Date Précise

Pour les formations **toujours disponibles** (formations en ligne à la demande), utilisez une chaîne vide pour le champ `date` :

```json
{
  "date": "",
  "horaire": "En ligne"
}
```

Ces formations seront affichées avec la mention "Toujours disponible" et n'apparaîtront pas dans le calendrier.

### Conseils pour la Description

La description doit être **concise** et ne pas répéter les informations déjà affichées :
- ❌ Ne pas répéter : durée, prix, format, horaire, modules
- ✅ À inclure : objectifs, contenu unique, prérequis éventuels

**Exemple de bonne description :**
```json
"description": "Cette formation vous donnera les clés pour comprendre les troubles DYS et adapter vos pratiques pédagogiques."
```

**Exemple à éviter :**
```json
"description": "Formation de 2h30 à 10€. Comprend 3 modules : Module 1, Module 2, Module 3. Format distanciel."
```

### Ajouter une Nouvelle Formation

1. Ouvrez le fichier `formations.json`
2. Ajoutez une virgule après la dernière formation
3. Copiez le modèle ci-dessus
4. Remplissez tous les champs
5. Vérifiez que le JSON est valide (utilisez un validateur JSON en ligne si besoin)
6. Sauvegardez le fichier

### Vérifier la Validité du JSON

Après modification, vérifiez que le fichier est valide :
- Utilisez un éditeur avec validation JSON (VS Code, Sublime Text)
- Ou utilisez un validateur en ligne : https://jsonlint.com/
- Testez dans le navigateur que les formations s'affichent correctement

## 📁 Structure des Fichiers

```
carnetformation/
├── index.html          # Page HTML principale
├── script.js           # Logique JavaScript de l'application
├── styles.css          # Feuille de styles
├── formations.json     # Données des formations (à modifier)
└── README.md          # Ce fichier
```

## 🛠️ Technologies Utilisées

- **HTML5** : Structure de la page
- **CSS3** : Mise en forme et design responsive
- **JavaScript (Vanilla)** : Logique applicative, pas de framework
- **JSON** : Format de données pour les formations

## 📝 Licence

Voir le fichier LICENSE pour plus d'informations.

## 🤝 Contribution

Pour contribuer :
1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Commitez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request