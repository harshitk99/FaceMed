import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const ProfessionalDashboard = () => {
  const [photo, setPhoto] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useCamera, setUseCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null); // State to store the captured image
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
    setCapturedImage(null); // Clear the captured image if a new file is selected
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc); // Store the captured image
    setUseCamera(false); // Stop the webcam

    // Convert the captured image to a blob and set it as a File object
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => setPhoto(new File([blob], "captured.png", { type: "image/png" })));
  };

  const handleScan = async () => {
    if (!photo) {
      alert('Please upload or capture a photo to scan');
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
        
        <div className="mb-4">
          <button
            className="bg-gray-500 text-white w-full py-2 rounded hover:bg-gray-600"
            onClick={() => {
              setUseCamera(!useCamera);
              setCapturedImage(null); // Reset captured image if switching modes
            }}
          >
            {useCamera ? 'Switch to Upload' : 'Use Camera'}
          </button>
        </div>

        {useCamera ? (
          <div className="mb-4">
            {!capturedImage ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                className="w-full h-auto mb-4"
              />
            ) : (
              <img src={capturedImage} alt="Captured" className="w-full h-auto mb-4" />
            )}
            {!capturedImage && (
              <button
                className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
                onClick={handleCapture}
              >
                Capture Photo
              </button>
            )}
          </div>
        ) : (
          <input
            type="file"
            className="mb-4 w-full p-2 border border-gray-300 rounded"
            onChange={handleFileChange}
            required
          />
        )}

        {capturedImage && (
          <div className="mb-4">
            <h3 className="text-lg mb-2">Captured Image:</h3>
            <img src={capturedImage} alt="Captured" className="w-full h-auto mb-4" />
          </div>
        )}

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