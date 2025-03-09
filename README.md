# 📋 To-Do List API

## 🚀 Description
This API allows managing a **To-Do List** with CRUD operations (Create, Read, Update, Delete). It is built with **Node.js, Express.js, and MongoDB**.

## 📌 Features
✅ Add a new task
✅ Retrieve all tasks
✅ Retrieve a specific task
✅ Update a task
✅ Delete a task

## 🛠️ Technologies Used
- **🟢 Node.js** - JavaScript runtime environment
- **⚡ Express.js** - Web framework for Node.js
- **🗄️ MongoDB** - NoSQL database
- **🔗 Mongoose** - ODM for MongoDB

## 📦 Installation
### 📥 Clone the repository
```bash
git clone https://github.com/StyvenManaja/ToDo-List.git
cd ToDo-List
```

### 📌 Install dependencies
```bash
npm install
```

### 🛠️ Configure the database
Create a `.env` file at the root of the project and add:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### ▶️ Start the server
```bash
npm start
```

## 📡 API Routes
| Method | Endpoint | Description |
|---------|---------|-------------|
| **📝 POST** | `/tasks` | Add a new task |
| **📂 GET** | `/tasks` | Retrieve all tasks |
| **🔍 GET** | `/tasks/:id` | Retrieve a specific task |
| **🛠 PUT** | `/tasks/:id` | Update a task |
| **🗑 DELETE** | `/tasks/:id` | Delete a task |

## 🛠 Usage Examples
### ➕ Add a Task
```json
POST /tasks
{
  "title": "Learn Node.js",
  "completed": false
}
```

### 📂 Retrieve All Tasks
```json
GET /tasks
[
  {
    "_id": "65a1b2c3d4e5f67890",
    "title": "Learn Node.js",
    "completed": false
  }
]
```

## 📜 License
This project is under the **MIT** license. Feel free to use it. 🚀

---
🔥 **Created by [StyvenManaja](https://github.com/StyvenManaja)** 🔥

