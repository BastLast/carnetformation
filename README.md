# Carnet de Formation

Site web statique pour afficher un catalogue de formations et conférences.

## 🚀 Démarrage rapide

1. Cloner le repository
2. Ouvrir `index.html` dans un navigateur web

Ou utiliser un serveur HTTP local:
```bash
python3 -m http.server 8080
# Puis ouvrir http://localhost:8080
```

## 📋 Fonctionnalités

### Vue Liste
- Affichage en cartes de toutes les formations et conférences
- Filtrage par type, niveau, format et certification
- Recherche textuelle dans les titres et descriptions
- Affichage détaillé de chaque événement (modules, tags, prix, etc.)

### Vue Calendrier
- Calendrier mensuel avec navigation
- Événements affichés par date
- Liste détaillée des événements du mois sélectionné

### Filtres disponibles
- **Type**: Formation ou Conférence
- **Niveau**: Débutant, Intermédiaire, Avancé, Tous niveaux
- **Format**: Présentiel, Distanciel, Hybride
- **Certifiante**: Oui/Non
- **Recherche**: Recherche libre dans le contenu

## 📁 Structure des fichiers

```
carnetformation/
├── index.html         # Page principale
├── styles.css         # Styles CSS
├── script.js          # Logique JavaScript
├── formations.json    # Données des formations/conférences
└── README.md          # Documentation
```

## 📝 Format des données (formations.json)

```json
{
  "id": "identifiant-unique",
  "categorie": "Catégorie de la formation",
  "titre": "Titre de la formation",
  "description": "Description détaillée",
  "modules": ["Module 1", "Module 2"],
  "duree": "2 jours",
  "type": "Formation | Conférence",
  "prix": "500€",
  "date": "2025-12-15",
  "horaire": "09:00-17:00",
  "niveau": "Débutant | Intermédiaire | Avancé | Tous niveaux",
  "lien_inscription": "https://...",
  "lien_details": "https://...",
  "organisateur": "Nom de l'organisateur",
  "public_cible": ["Public 1", "Public 2"],
  "tags": ["tag1", "tag2"],
  "certifiante": true | false,
  "format": "Présentiel | Distanciel | Hybride"
}
```

## ✨ Personnalisation

Pour ajouter ou modifier des formations/conférences, éditez le fichier `formations.json` en suivant la structure ci-dessus.

## 🎨 Design

- Design responsive (mobile et desktop)
- Interface moderne avec dégradés
- Navigation intuitive entre les vues
- Cartes interactives avec effet hover

## 📄 Licence

Voir le fichier LICENSE pour plus de détails.