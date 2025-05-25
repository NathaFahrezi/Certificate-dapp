import { BrowserProvider, Contract } from "ethers";
import abi from "./abis/DigitalCertificateStorage.json";

// Ganti dengan alamat smart contract kamu
const contractAddress = "0xeDBDB98dD452F42678878CDcDF9F755C94eb8B8f";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new BrowserProvider(window.ethereum); // ethers@6
  const signer = await provider.getSigner();
  return new Contract(contractAddress, abi, signer);
};
