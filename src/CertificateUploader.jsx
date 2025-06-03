import React, { useState } from 'react';
import { uploadToPinata } from './pinata';
import { ethers } from 'ethers';
import contractABI from './abis/DigitalCertificateStorage.json';

const contractAddress = '0xeDBDB98dD452F42678878CDcDF9F755C94eb8B8f';

const CertificateUploader = () => {
  const [name, setName] = useState('');
  const [certificateId, setCertificateId] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !certificateId || !file) {
      alert('Lengkapi semua field.');
      return;
    }

    setLoading(true);
    setTxHash('');
    setIpfsHash('');

    try {
      // Upload ke IPFS via Pinata
      const ipfsHash = await uploadToPinata(file);
      console.log('✅ IPFS Hash:', ipfsHash);
      setIpfsHash(ipfsHash);

      // Setup ethers.js
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Panggil smart contract
      const tx = await contract.issueCertificate(certificateId, name, ipfsHash);
      const receipt = await tx.wait();
      console.log('✅ TX Hash:', receipt.hash);
      setTxHash(receipt.hash);

      alert('✅ Sertifikat berhasil disimpan!');
    } catch (err) {
      console.error('❌ Error saat menyimpan:', err);
      alert('❌ Gagal menyimpan sertifikat!');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Sertifikat Digital</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nama Pemilik</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Masukkan Nama"
          />
        </div>

        <div>
          <label className="block font-medium">Certificate ID</label>
          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Masukkan ID"
          />
        </div>

        <div>
          <label className="block font-medium">Upload File Sertifikat</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
            accept=".pdf,.png,.jpg,.jpeg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Menyimpan...' : 'Simpan Sertifikat'}
        </button>
      </form>

      {ipfsHash && (
        <div className="mt-4 text-sm">
          <p><strong>✅ IPFS Hash:</strong> {ipfsHash}</p>
          <a
            href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Lihat Sertifikat di IPFS
          </a>
        </div>
      )}

      {txHash && (
        <div className="mt-2 text-sm">
          <p><strong>✅ TX Hash:</strong> {txHash}</p>
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Lihat di Etherscan
          </a>
        </div>
      )}
    </div>
  );
};

export default CertificateUploader;
