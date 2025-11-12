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

L'application est accessible en ligne via GitHub Pages ou en ouvrant simplement le fichier `index.html` dans un navigateur web moderne. Aucune installation n'est nécessaire.

## ✏️ Comment Mettre à Jour le Fichier formations.json

Le fichier `formations.json` contient toutes les formations et conférences affichées dans le catalogue. 

### 📝 Modifier via l'Interface GitHub (recommandé pour débutants)

**Vous n'avez besoin d'aucune connaissance technique !** Suivez simplement ces étapes :

1. **Connectez-vous** à GitHub avec votre compte
2. **Naviguez** jusqu'au fichier `formations.json` dans le dépôt
3. **Cliquez** sur l'icône ✏️ (crayon) en haut à droite du fichier pour l'éditer
4. **Modifiez** le contenu directement dans l'éditeur web (voir ci-dessous pour la structure)
5. **Descendez** en bas de la page et ajoutez un message décrivant vos changements (ex: "Ajout d'une nouvelle formation sur l'autisme")
6. **Cliquez** sur le bouton vert "Commit changes" pour enregistrer vos modifications
7. **Attendez** quelques secondes : le site se met automatiquement à jour !

⚠️ **Attention** : Respectez bien la structure JSON (guillemets, virgules, crochets). Si vous faites une erreur, l'éditeur GitHub vous le signalera en rouge.

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

**Via l'interface GitHub :**

1. **Ouvrez** le fichier `formations.json` en cliquant sur le nom du fichier
2. **Cliquez** sur l'icône ✏️ (crayon) pour l'éditer
3. **Trouvez** la dernière formation dans la liste (cherchez le dernier `}` avant le `]` final)
4. **Ajoutez une virgule** après le `}` de la dernière formation
5. **Copiez-collez** le modèle ci-dessus
6. **Remplissez** tous les champs avec les informations de votre nouvelle formation
7. **Vérifiez** que :
   - Tous les textes sont entre guillemets `"comme ceci"`
   - Les virgules sont bien placées entre chaque ligne (sauf la dernière ligne d'un bloc)
   - Les crochets `[]` et accolades `{}` sont bien fermés
8. **Enregistrez** en cliquant sur "Commit changes" en bas de la page

### ⚠️ Erreurs Courantes à Éviter

- ❌ **Oublier une virgule** entre deux formations → L'éditeur GitHub le signalera en rouge
- ❌ **Virgule en trop** après la dernière formation → Retirez-la !
- ❌ **Guillemets oubliés** autour des textes → Tous les textes doivent être entre `"guillemets"`
- ❌ **Date mal formatée** → Utilisez le format AAAA-MM-JJ (ex: 2025-12-25) ou `""` pour toujours disponible

💡 **Astuce** : Si GitHub affiche une erreur en rouge, lisez le message qui vous indique où se trouve le problème (ligne et colonne).

## 🎯 Exemples de Modifications Courantes

### Modifier le prix d'une formation
```json
"prix": "15€",  ← Changez simplement le texte entre guillemets
```

### Changer une date
```json
"date": "2025-12-25",  ← Format : Année-Mois-Jour
```

### Ajouter un tag
```json
"tags": ["Tag1", "Tag2", "NouveauTag"],  ← Ajoutez-le à la fin avec une virgule
```

### Rendre une formation toujours disponible
```json
"date": "",  ← Laissez vide entre guillemets
```

## ❓ Besoin d'Aide ?

- **Validation automatique** : L'éditeur GitHub vérifie automatiquement votre code et affiche les erreurs
- **Prévisualisation** : Après avoir enregistré, attendez quelques secondes et actualisez le site pour voir vos changements
- **Problème** : Si le site ne s'affiche plus correctement, regardez l'historique des modifications (onglet "History" sur GitHub) et annulez votre dernier changement

## 📁 Fichiers du Projet

- **formations.json** : Le fichier que vous modifierez le plus souvent (liste des formations)
- **index.html** : La structure de la page web (ne pas modifier sauf besoin avancé)
- **script.js** : Le code qui fait fonctionner le site (ne pas modifier)
- **styles.css** : La mise en forme visuelle du site (ne pas modifier)
- **README.md** : Ce guide d'utilisation

## 📝 Licence

Voir le fichier LICENSE pour plus d'informations.