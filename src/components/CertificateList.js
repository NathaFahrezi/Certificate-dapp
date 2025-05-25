import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./ui/Cardd";
import Button from "./ui/Buttonn";
import Input from "./ui/Inputt";

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔁 Fetch data sertifikat dari backend
  const fetchCertificates = async (query = "") => {
    try {
      setLoading(true);
      const res = query
        ? await axios.get(`http://localhost:5000/api/certificates/search?name=${query}`)
        : await axios.get("http://localhost:5000/api/certificates");
      setCertificates(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCertificates(search);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/certificates/${id}`);
      fetchCertificates();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Certificate List</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : certificates.length === 0 ? (
        <p className="text-center text-gray-500">No certificates found.</p>
      ) : (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <Card key={cert._id} className="p-4 shadow-md bg-white rounded-lg">
              <p><strong>Name:</strong> {cert.name}</p>
              <p><strong>Department:</strong> {cert.department}</p>
              <p><strong>IPFS Hash:</strong> <a
                href={`https://gateway.pinata.cloud/ipfs/${cert.ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >{cert.ipfsHash}</a></p>
              <Button className="mt-2 bg-red-600 hover:bg-red-700" onClick={() => handleDelete(cert._id)}>
                Delete
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateList;
