# 📋 To-Do List API

## 🚀 Description
Cette API permet de gérer une liste de tâches (**To-Do List**) avec les opérations CRUD (Create, Read, Update, Delete). Elle est construite avec **Node.js, Express.js et MongoDB**.

## 📌 Fonctionnalités
✅ Ajouter une nouvelle tâche
✅ Récupérer toutes les tâches
✅ Récupérer une tâche spécifique
✅ Mettre à jour une tâche
✅ Supprimer une tâche

## 🛠️ Technologies utilisées
- **🟢 Node.js** - Environnement d'exécution JavaScript
- **⚡ Express.js** - Framework web pour Node.js
- **🗄️ MongoDB** - Base de données NoSQL
- **🔗 Mongoose** - ODM pour MongoDB

## 📦 Installation
### 📥 Cloner le repo
```bash
git clone https://github.com/StyvenManaja/ToDo-List.git
cd ToDo-List
```

### 📌 Installer les dépendances
```bash
npm install
```

### 🛠️ Configurer la base de données
Crée un fichier `.env` à la racine du projet et ajoute :
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### ▶️ Démarrer le serveur
```bash
npm start
```

## 📡 Routes de l'API
| Méthode | Endpoint | Description |
|---------|---------|-------------|
| **📝 POST** | `/tasks` | Ajouter une nouvelle tâche |
| **📂 GET** | `/tasks` | Récupérer toutes les tâches |
| **🔍 GET** | `/tasks/:id` | Récupérer une tâche spécifique |
| **🛠 PUT** | `/tasks/:id` | Mettre à jour une tâche |
| **🗑 DELETE** | `/tasks/:id` | Supprimer une tâche |

## 🛠 Exemples d'utilisation
### ➕ Ajouter une tâche
```json
POST /tasks
{
  "title": "Apprendre Node.js",
  "completed": false
}
```

### 📂 Récupérer toutes les tâches
```json
GET /tasks
[
  {
    "_id": "65a1b2c3d4e5f67890",
    "title": "Apprendre Node.js",
    "completed": false
  }
]
```

## 📜 Licence
Ce projet est sous licence **MIT**. Tu peux l'utiliser librement. 🚀

---
🔥 **Créé par [StyvenManaja](https://github.com/StyvenManaja)** 🔥

