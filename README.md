# 🎓 Certificate DApp

A decentralized application (DApp) for uploading, storing, and verifying digital certificates using **IPFS** and **Ethereum smart contract**.

---

## 🚀 Features

- Upload certificate data + file (PDF/image) via web interface
- Store certificate file on **IPFS** (via Pinata)
- Save certificate metadata & IPFS hash to **Ethereum smart contract**
- Prevent duplicate certificate entries (based on IPFS hash)
- Retrieve and verify certificates from blockchain
- Built with **React.js**, **Ethers.js**, **Solidity**, and **Hardhat**

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Smart Contract**: Solidity, deployed via Hardhat
- **Blockchain**: Ethereum Testnet (Sepolia)
- **Storage**: IPFS (Pinata)
- **Wallet**: MetaMask

---

## 📦 Project Structure

```bash
certificate-dapp/
├── contracts/                 # Solidity smart contract
│   └── DigitalCertificateStorage.sol
├── frontend/                  # React frontend
│   └── src/
│       ├── components/
│       │   └── CertificateUploader.jsx
│       └── App.jsx
├── scripts/                   # Deployment script
│   └── deploy.js
├── .env                       # Local environment variables (ignored)
├── hardhat.config.js
└── README.md

