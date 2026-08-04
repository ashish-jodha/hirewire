# 💼 HireWire

A full-stack job application tracking system built with React, Node.js, Express, and MongoDB.

Users can securely manage their job applications, track application progress, and organize their job search through an intuitive and responsive interface.

---

## ✨ Features

* 🔐 User registration and authentication
* 💼 Add, edit, and delete job applications
* 📊 Track application status throughout the hiring process
* 🛡️ Protected routes and user-specific authorization
* 🍪 Persistent login sessions
* ✅ Server-side validation using Joi
* 🔄 RESTful API built with Express
* 💾 Persistent data storage with MongoDB
* 🌍 Global authentication state using React Context
* 📱 Fully responsive user interface

---

## 🛠️ Tech Stack

| Technology        | Purpose                     |
| ----------------- | --------------------------- |
| React (Vite)      | Frontend Framework          |
| Tailwind CSS      | Styling                     |
| React Router DOM  | Routing & Navigation        |
| React Context API | Global Authentication State |
| Node.js           | Runtime Environment         |
| Express.js        | Backend Framework           |
| MongoDB           | Database                    |
| Mongoose          | ODM                         |
| Passport.js       | Authentication              |
| Joi               | Data Validation             |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js**
* **MongoDB** (running locally on the default port)

### Installation

Clone the repository:

```bash
git clone https://github.com/ashish-jodha/hirewire.git
```

Navigate to the project directory:

```bash
cd hirewire
```

### Start the Backend

```bash
cd backend
npm install
node app.js
```

### Start the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure

```text
hirewire/
├── backend/
│   ├── models/         # Database schemas
│   ├── routes/         # API routes
│   ├── middleware.js   # Authentication & authorization
│   ├── schema.js       # Joi validation
│   └── app.js          # Express server
│
├── frontend/
│   ├── src/
│   │   ├── AddPage.jsx
│   │   ├── App.jsx
│   │   ├── AuthContext.jsx
│   │   ├── DashBoard.jsx
│   │   ├── DeleteRoute.jsx
│   │   ├── EditPage.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SignUp.jsx
│   │   └── main.jsx
│   └── public/
│
└── .gitignore
```

---

## 👨‍💻 Author

**Ashish Jodha**