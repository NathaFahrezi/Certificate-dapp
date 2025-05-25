import axios from 'axios';

const PINATA_API_KEY = 'e9a8a59754dbc18b3570';
const PINATA_SECRET_API_KEY = 'f34f451cadd52a63a3e70a56ad9605652b4cbde5b0686eb49d357fee54f8b0ca';

export const uploadToPinata = async (file) => {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post(url, formData, {
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'multipart/form-data',
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    },
  });

  return res.data.IpfsHash;
};
