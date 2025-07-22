
### 📦 E-Commerce Web3 Integration – README

This project integrates basic Web3 functionality into an E-commerce frontend, meeting the following blockchain-focused requirements:

## ✅ 1. Wallet Connection (MetaMask)

**Implemented Features:**
- Users can **connect** or **disconnect** MetaMask wallet via the top-right "Connect Wallet" button.
- When connected:
  - The **truncated wallet address** (e.g. `0x1234...A12b`) is displayed.
  - The current **network name** (e.g. `Ethereum Mainnet`, `Polygon`) is shown next to the wallet address.
- After connecting, wallet state remains active on reload unless disconnected.
- Button UI updates based on connection state (e.g., “Connecting...” while MetaMask is opening).

**How it's handled:**
- Wallet connection uses [`ethers.js`](https://docs.ethers.io/) with a `Web3Context` providing state to the app.
- Listens for `accountsChanged` and `chainChanged` events from `window.ethereum` to automatically re-sync state when the user switches accounts or networks.

## ✅ 2. Network Change Detection

**Implemented Behavior:**
- If the user switches the network in MetaMask, the app detects the change.
- The new network name updates automatically in the UI without refresh.

**How it's handled:**
- Subscribes to `window.ethereum.on('chainChanged')` and `ethereum.on('accountsChanged')`.
- On change, the app reconnects the wallet and updates state via `ethers.providers.Web3Provider`.

## ✅ 3. Transaction Lifecycle UI Sync

This is demonstrated in the `Checkout` flow.

**Implemented Features:**
- Button triggers a **simulated transaction** using `ethers.js`.
- UI shows:
  - 🔄 **Loading / "Please confirm in wallet..."**
  - ⏳ **"Transaction submitted"**
  - ✅ **"Transaction Complete!"**
  - ❌ **Errors / rejection messages**

**How it's handled:**
- The `Checkout` page uses `useState` + `react-hot-toast` + `provider.getSigner().sendTransaction(...)`, and tracks:
  - **Idle → Pending → Success/Error** transaction statuses with UI feedback and toast notifications.
- Simulated TX is for `0.001 ETH` (or any amount) sent to user's own address for demonstration.

## 🖥️ Demo Recording

The demo video includes:
- Navigating to the shop & checkout page.
- Connecting MetaMask wallet.
- Switching networks (e.g. Ethereum 🔁 Polygon).
- Completing a simulated transaction with real-time UI updates:
  - Confirm prompt
  - Loader
  - Success state
  - Error handling (if wallet is not connected or TX rejected)

## ⚙️ Tech Stack

- React.js
- Ethers.js
- Redux (for product/cart state)
- Bootstrap / Skeleton UI loaders
- React Hot Toast (for feedback)
- Wallet: MetaMask (Injected via `window.ethereum`)

## 📁 File Overview

| File/Folder           | Purpose                                     |
|-----------------------|---------------------------------------------|
| `web3Context.js`      | Manages wallet address, network, connection state |
| `Navbar.jsx`          | Displays connect wallet button and network response |
| `Checkout.jsx`        | Handles transaction simulation & UI feedback flow |

## ✍️ Notes

- Compatible networks: Ethereum, Goerli, Sepolia, Polygon, Mumbai.
- App gracefully handles unsupported networks or accounts being disconnected.
- Code is modular and testable (though testing is not included per guideline).

## 🎯 Summary

This completed module meets all required criteria:
- ✅ Wallet connect/disconnect
- ✅ Dynamic UI based on connection/network state
- ✅ Full transaction UI sync lifecycle
- ✅ Demo video and clean implementation

