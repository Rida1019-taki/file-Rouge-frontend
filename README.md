# Tomobilty.ma — Frontend

## 1. Nom du projet

**Tomobilty.ma — Frontend**

---

## 2. Présentation du projet

Tomobilty.ma est une application web de location de voitures développée avec React.
L'interface permet aux clients de rechercher des véhicules, consulter leurs informations et effectuer des réservations.
Elle permet également aux owners de gérer leurs véhicules et leurs réservations, ainsi qu'aux administrateurs de superviser la plateforme.
L'objectif principal est de proposer une interface moderne, responsive et simple à utiliser.

---

## 3. Problématique

Les utilisateurs peuvent avoir des difficultés à trouver rapidement une voiture correspondant à leurs besoins, notamment selon la ville, le prix, la catégorie ou la disponibilité.

Le frontend de Tomobilty.ma propose une interface centralisée permettant de rechercher les voitures, consulter leurs détails et gérer les réservations en communiquant avec l'API Spring Boot.

---

## 4. Fonctionnalités principales

* **Créer** un compte et se connecter.
* **Rechercher** des voitures selon plusieurs critères.
* **Consulter** les détails d'une voiture.
* **Réserver** une voiture selon les dates disponibles.
* **Gérer** les voitures et les réservations selon le rôle de l'utilisateur.
* **Consulter** les tableaux de bord adaptés à chaque rôle.

---

# 5. Technologies utilisées

| Technologie     | Utilisation                              |
| --------------- | ---------------------------------------- |
| React.js        | Développement de l'interface utilisateur |
| React Router    | Gestion de la navigation entre les pages |
| Axios           | Communication avec l'API REST            |
| React Hook Form | Gestion des formulaires                  |
| Yup             | Validation des formulaires               |
| JavaScript      | Logique de l'application                 |
| HTML5           | Structure des pages                      |
| CSS3            | Mise en forme et responsive design       |
| Git / GitHub    | Versionnement du projet                  |
| VS Code         | Environnement de développement           |

---

# 6. Architecture du projet

Le frontend est organisé en plusieurs parties afin de faciliter la maintenance du code.

```text
src/
├── components/
├── pages/
├── layouts/
├── services/
├── hooks/
├── context/
├── routes/
├── assets/
└── App.js
```

Les composants sont réutilisés dans différentes pages et les appels vers le backend sont centralisés dans les services.

---

# 7. Installation et lancement

## 7.1 Prérequis

Pour utiliser le frontend, vous devez disposer de :

* **Node.js**
* **npm**
* **Git**
* **VS Code**
* Un navigateur web moderne
* Le backend Tomobilty.ma lancé localement

---

## 7.2 Cloner le dépôt

```bash
git clone LIEN_DU_DEPOT_FRONTEND
```

Puis :

```bash
cd NOM_DU_PROJET_FRONTEND
```

---

## 7.3 Installer les dépendances

```bash
npm install
```

---

## 7.4 Configurer l'API

Le frontend doit communiquer avec l'API Spring Boot.

Configurer l'URL de l'API dans le fichier de configuration prévu par le projet.

Exemple :

```env
REACT_APP_API_URL=http://localhost:8080
```

> Le nom de la variable doit correspondre à celui utilisé dans le projet.

---

## 7.5 Lancer le projet

```bash
npm start
```

Selon la configuration du projet, il peut également être nécessaire d'utiliser :

```bash
npm run dev
```

---

## 7.6 Ouvrir le projet

Après le lancement, l'application est généralement accessible à :

```text
http://localhost:3000
```

---

# 8. Pages principales

L'application contient plusieurs espaces adaptés aux différents utilisateurs.

### Pages publiques

* Accueil
* Liste des voitures
* Détails d'une voiture
* Connexion
* Inscription

### Espace Client

* Tableau de bord
* Profil
* Mes réservations
* Détails des réservations

### Espace Owner

* Tableau de bord
* Mes voitures
* Ajouter une voiture
* Modifier une voiture
* Réservations
* Statistiques

### Espace Administrateur

* Tableau de bord
* Utilisateurs
* Voitures
* Réservations
* Gestion des annonces
* Statistiques

---

# 9. Recherche et filtrage

Le frontend permet aux utilisateurs de rechercher des voitures selon plusieurs critères :

* Ville
* Prix
* Catégorie
* Marque
* Transmission
* Carburant
* Disponibilité

Les critères sélectionnés sont transmis au backend afin de récupérer les résultats correspondants.

---

# 10. Authentification

L'application utilise l'authentification JWT fournie par le backend.

Après la connexion :

```text
Utilisateur
     │
     ▼
Connexion
     │
     ▼
API Spring Boot
     │
     ▼
JWT
     │
     ▼
Frontend
     │
     ▼
Accès selon le rôle
```

Les rôles principaux sont :

* **CLIENT**
* **OWNER**
* **ADMIN**

Les routes protégées sont accessibles uniquement aux utilisateurs autorisés.

---

# 11. Communication avec le Backend

Le frontend utilise **Axios** pour communiquer avec l'API REST Spring Boot.

Exemple :

```javascript
axios.get("/api/cars");
```

Les requêtes permettent notamment de :

* récupérer les voitures ;
* créer une réservation ;
* modifier une voiture ;
* supprimer une voiture ;
* récupérer les réservations ;
* gérer le profil utilisateur.

---

# 12. Responsive Design

L'interface est conçue pour fonctionner sur différents écrans :

* Ordinateur
* Tablette
* Smartphone

L'objectif est de permettre aux utilisateurs d'utiliser la plateforme facilement depuis différents appareils.

---

# 13. Captures d'écran

## Capture 1 — Page d'accueil

![Page d'accueil](screenshots/home.png)

Cette capture présente la page principale de Tomobilty.ma et permet à l'utilisateur de commencer sa recherche de véhicules.

---

## Capture 2 — Liste des voitures

![Liste des voitures](screenshots/cars.png)

Cette capture présente les véhicules disponibles avec leurs informations principales et les options de recherche et de filtrage.

---

# 14. Difficultés rencontrées

## Difficulté 1 — Communication Frontend / Backend

### Problème rencontré

La communication entre l'application React et l'API Spring Boot nécessite une configuration correcte de l'URL de l'API et de l'authentification.

### Recherches / Tests

Des tests ont été réalisés avec Axios et Postman afin de vérifier les requêtes envoyées au backend.

### Solution

Les appels API ont été centralisés dans les services frontend et l'authentification JWT a été intégrée aux requêtes protégées.

### Ce que j'ai appris

Cette difficulté m'a permis de mieux comprendre la communication entre une application React et une API REST Spring Boot.

---

## Difficulté 2 — Gestion des rôles et des routes protégées

### Problème rencontré

Les utilisateurs n'ont pas tous accès aux mêmes fonctionnalités.

### Recherches / Tests

Des tests ont été réalisés avec les différents rôles afin de vérifier les accès aux pages protégées.

### Solution

La navigation et l'accès aux fonctionnalités sont contrôlés selon le rôle de l'utilisateur connecté.

### Ce que j'ai appris

Cette partie m'a permis de mieux comprendre la gestion de l'authentification côté frontend et la protection des routes React.

---

# 15. Améliorations possibles

Dans une prochaine version, je pourrais :

* **Ajouter** un système de paiement en ligne.
* **Ajouter** des notifications en temps réel.
* **Améliorer** les filtres et la recherche des véhicules.
* **Ajouter** une carte interactive pour afficher les véhicules par localisation.

Ces améliorations permettraient d'améliorer l'expérience utilisateur et de rendre la plateforme plus complète.

---

# 16. Auteur

**Rida Taki**

Projet : **Tomobilty.ma**

Développement Frontend avec **React.js**.
