import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    aadharNumber: '',
    password: '',
    emergencyContact: '',
    bloodGroup: '',
    allergies: '',
    pastSurgery: '',
    otherMedicalConditions: '',
    photo: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();
      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }

      await axios.post('http://192.168.1.33:3000/upload', formDataObj);
      alert('User registered successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed: ' + error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 text-center">Signup as User</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="aadharNumber"
          placeholder="Aadhaar Number"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="allergies"
          placeholder="Allergies"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="pastSurgery"
          placeholder="Past Surgery"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="otherMedicalConditions"
          placeholder="Other Medical Conditions"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
          onChange={handleChange}
        />
        <input
          type="file"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
          onChange={handleFileChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupUser;
