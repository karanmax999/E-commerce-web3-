// src/web3Context.js
import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast"; // ✅ add toast support (optional)

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [network, setNetwork] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not detected");
        return;
      }

      setIsConnecting(true);

      const newProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await newProvider.send("eth_requestAccounts", []);

      const signer = newProvider.getSigner();
      const address = await signer.getAddress();
      const net = await newProvider.getNetwork();

      setWalletAddress(address);
      setNetwork(net.name); // string like 'homestead' or 'matic'
      setProvider(newProvider);

      toast.success(`✅ Connected on ${getReadableNetworkName(net.chainId)}`);
    } catch (err) {
      console.error("Wallet connection error:", err);
      toast.error("❌ Wallet connection failed.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setNetwork(null);
    setProvider(null);
    toast("🔌 Wallet disconnected");
  };

  const getReadableNetworkName = (chainId) => {
    const networks = {
      1: "Ethereum Mainnet",
      137: "Polygon",
      11155111: "Sepolia",
      80001: "Mumbai",
      5: "Goerli",
    };
    return networks[chainId] || `Unknown Network (${chainId})`;
  };

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (_accounts) => {
      if (_accounts.length === 0) {
        disconnectWallet();
      } else {
        connectWallet();
      }
    };

    const handleChainChanged = (_chainId) => {
      connectWallet();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  return (
    <Web3Context.Provider
      value={{
        walletAddress,
        network,
        provider,
        connectWallet,
        disconnectWallet,
        isConnecting,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
