# 💳 Banking Frontend

A modern, Revolut-inspired banking frontend built with React. Connects to the Banking API for full banking functionality.

**Live App:** `https://bankingfrontend-nu.vercel.app/`  
**Backend API:** `https://banking-api-wo4z.onrender.com`

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React |
| Styling | CSS (Revolut-inspired dark theme) |
| Auth | JWT (stored in memory) |
| Hosting | Vercel |
| API Communication | HTTP Requests (Fetch API) |

---

## ✨ Features

- 🔐 **Login** — Card number + PIN authentication
- 💰 **Balance** — View current account balance
- 💸 **Withdraw** — Transfer money from account
- ❌ **Close Account** — Delete account permanently
- 🎨 **Modern UI** — Dark theme, Revolut-inspired design

---

## 🔗 API Connection

The frontend connects to the Banking API at:
```
https://banking-api-wo4z.onrender.com
```

After login, the JWT token is stored **in memory only** (not in localStorage) for security. The token is sent with every request in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

---

## 🏃 Running Locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
# or
npm start
```

App runs at `http://localhost:3000`

> **Note:** Make sure the Banking API is running locally or update the API URL to point to the live Render deployment.

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/      # React components
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/
├── package.json
└── vite.config.js / package.json
```

---

## ☁️ Deployment

Deployed on **Vercel** — automatically redeploys on every push to `main` branch.

```bash
# Push to GitHub to trigger auto-deploy
git add .
git commit -m "your message"
git push
```

---

## 🔐 Security Notes

- JWT tokens are stored **in memory only** — cleared on page refresh
- No sensitive data stored in localStorage or cookies
- All API communication goes through HTTPS
- Passwords/PINs never stored on the frontend

---

## 🏦 Related

- **Backend Repository:** [banking-api](https://github.com/dineetaa/banking-api)
- **Live API:** `https://banking-api-wo4z.onrender.com/health`

---

## 👨‍💻 Author

Frontend for the Containerized Microservice Deployment project.
