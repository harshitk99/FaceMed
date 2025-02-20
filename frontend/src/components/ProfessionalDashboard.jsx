import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfessionalDashboard = () => {
  const [photo, setPhoto] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleScan = async () => {
    if (!photo) {
      alert('Please upload a photo to scan');
      return;
    }

    const formData = new FormData();
    formData.append('photo', photo);

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post('http://192.168.1.33:3000/verify', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResultData(response.data);
    } catch (error) {
      console.error('Error scanning photo:', error);
      alert('Failed to retrieve data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 text-center">Medical Professional Dashboard</h2>
        <input
          type="file"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
          onChange={handleFileChange}
          required
        />
        <button
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
          onClick={handleScan}
          disabled={loading}
        >
          {loading ? 'Scanning...' : 'Scan and Retrieve Data'}
        </button>
        {resultData && (
          <div className="mt-4">
            <h3 className="text-lg mb-2">Patient Information:</h3>
            <p><strong>Name:</strong> {resultData.name}</p>
            <p><strong>Aadhaar Number:</strong> {resultData.aadharNumber}</p>
            <p><strong>Emergency Contact:</strong> {resultData.emergencyContact}</p>
            <p><strong>Blood Group:</strong> {resultData.bloodGroup}</p>
            <p><strong>Allergies:</strong> {resultData.allergies}</p>
            <p><strong>Past Surgery:</strong> {resultData.pastSurgery}</p>
            <p><strong>Other Medical Conditions:</strong> {resultData.otherMedicalConditions}</p>
          </div>
        )}
        <button
          className="bg-red-500 text-white w-full py-2 mt-4 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
