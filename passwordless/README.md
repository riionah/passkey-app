# 🔐 Passkey Authentication App (Bachelor Project)

This project is a **Passkey Authentication System** built with:

* ⚛️ React (Frontend)
* 🟢 Node.js + Express (Backend)
* 🔑 WebAuthn API (Passkeys)

It allows users to:

* Register using a **passkey**
* Login securely without passwords
* Authenticate using device biometrics (Windows Hello, fingerprint, etc.)

---

## 🚀 Features

* ✅ Passkey Registration (WebAuthn)
* ✅ Passkey Login (Passwordless)
* ✅ Secure Challenge-Response Authentication
* ✅ React Routing (Login → Dashboard)
* ✅ Simple Express Backend

---

## 🛠️ Technologies Used

* React
* React Router
* Node.js
* Express
* WebAuthn API
* Crypto (Node.js)
* Base64URL encoding

---

## 📁 Project Structure

```
project/
│
├── backend/
│   └── server.js
│
├── frontend/
│   ├── App.js
│   ├── Login.js
│   ├── Dashboard.js
│   └── index.js
│
└── README.md
```

---
## ✅ Requirements

- Node.js (v18+ recommended)
- npm
- Modern browser (Chrome, Edge) with WebAuthn support
## ⚙️ Installation

### 1. Clone the repository

```
git clone https://github.com/riionah/passkey-app.git
cd passkey-app
```

---

### 2. Install backend dependencies

```
cd backend
npm install
```

---

### 3. Install frontend dependencies

```
cd ../frontend
npm install
```

---

## ▶️ Running the Project

### Start Backend

```
cd backend
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

### Start Frontend

```
cd frontend
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔐 How It Works

### Register

1. User enters username
2. Server generates a **challenge**
3. Browser creates a **credential (passkey)**
4. Credential is saved on server

### Login

1. Server sends a new challenge
2. Browser signs the challenge using the stored passkey
3. If valid → user is authenticated

---

## ⚠️ Important Notes

* This is a **demo project** (in-memory storage is used)
* Data is lost when server restarts
* For production:

  * Use a database (MongoDB / PostgreSQL)
  * Implement full WebAuthn verification
  * Add HTTPS (required for passkeys)

---

## 🎓 Purpose

This project was developed as part of a **Bachelor Thesis** to demonstrate:

* Passwordless authentication
* Modern web security practices
* WebAuthn implementation

---

## 📸 Screens

* Login page (Register & Login with Passkey)
* Dashboard after successful login

---

## 📌 Future Improvements

* Database integration
* Full WebAuthn verification
* Multi-device support
* UI improvements

---

## 👤 Author

Rione Hazrolli
Computer Science Student

---

## 📄 License

This project is for educational purposes only.

---

## 🔒 Security Note

This project demonstrates the basics of WebAuthn authentication.
Full verification of signatures and attestation is not implemented.