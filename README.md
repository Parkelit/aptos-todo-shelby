# 📝 Aptos Todo — Powered by Shelby Protocol

A decentralized to-do list app built on **Aptos** using **Shelby blob storage**.
Every task is stored as a blob on Shelby Protocol, decentralized, permanent, and serverless.

---

## ✨ Features

- ✅ Add new tasks
- ✔️ Mark tasks as completed
- 🗑️ Delete tasks
- 👛 Petra Wallet integration
- 📦 Data stored on Shelby blob storage
- 📊 Live stats (total / pending / done)

---

## 🧱 Tech Stack

| Layer | Tech |
|-------|------|
| Blockchain | Aptos |
| Blob Storage | Shelby Protocol |
| Frontend | React + Vite + TypeScript |
| Wallet | Petra Wallet |
| State | TanStack Query |

---

## 📂 Project Structure

```
aptos-todo-shelby/
├── src/
│   ├── main.tsx        # Entry point and providers
│   ├── App.tsx         # Main app component
│   ├── App.module.css  # Styles
│   └── index.css       # Global styles
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example        # Environment template
└── .gitignore
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Parkelit/aptos-todo-shelby.git
cd aptos-todo-shelby
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup API Key
```bash
cp .env.example .env
```
Open `.env` and replace with your API key from [Geomi Dashboard](https://geomi.dev):
```
VITE_SHELBY_API_KEY=your_api_key_here
```

### 4. Run the app
```bash
npm run dev
```
Open **http://localhost:5173** in your browser.

### 5. Connect Wallet
- Install [Petra Wallet](https://petra.app) on Chrome
- Switch to **Shelbynet** in Petra settings
- Connect your wallet and start adding tasks

---

## 🔗 Links

- [Shelby Protocol](https://shelby.xyz)
- [Geomi Dashboard](https://geomi.dev)
- [Aptos Docs](https://aptos.dev)
- [Petra Wallet](https://petra.app)

---

## 📄 License

MIT License
