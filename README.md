# 📝 Aptos Todo — Powered by Shelby Protocol

A decentralized to-do list app built on **Aptos** using **Shelby blob storage**.  
Every task tersimpan sebagai blob di Shelby Protocol — terdesentralisasi, permanen, dan tanpa server.

---

## ✨ Features

- ✅ Tambah task baru
- ✔️ Tandai task sebagai selesai
- 🗑️ Hapus task
- 👛 Petra Wallet integration
- 📦 Data disimpan di Shelby blob storage
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
│   ├── main.tsx        # Entry point + providers
│   ├── App.tsx         # Main app component
│   ├── App.module.css  # Styles
│   └── index.css       # Global styles
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example        # Template env
└── .gitignore
```

---

## 🚀 Cara Menjalankan

### 1. Clone repo
```bash
git clone https://github.com/USERNAME/aptos-todo-shelby.git
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
Buka file `.env`, ganti dengan API key dari [Geomi Dashboard](https://geomi.dev):
```
VITE_SHELBY_API_KEY=api_key_kamu_disini
```

### 4. Jalankan di browser
```bash
npm run dev
```

Buka **http://localhost:5173** di browser.

### 5. Connect Wallet
- Install [Petra Wallet](https://petra.app) di Chrome
- Switch ke **Shelbynet** di settings Petra
- Connect wallet di app → mulai tambah task!

---

## 🔗 Links

- [Shelby Protocol](https://shelby.xyz)
- [Geomi Dashboard](https://geomi.dev)
- [Aptos Docs](https://aptos.dev)
- [Petra Wallet](https://petra.app)

---

## 📄 License

MIT License
