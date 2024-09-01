import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://192.168.1.33:3000/userData', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://192.168.1.33:3000/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('User data updated successfully');
      setIsEditing(false);
      setUserData(formData);
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update user data');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 text-center">User Dashboard</h2>
        {!isEditing ? (
          <div>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Aadhaar Number:</strong> {userData.aadharNumber}</p>
            <p><strong>Emergency Contact:</strong> {userData.emergencyContact}</p>
            <p><strong>Blood Group:</strong> {userData.bloodGroup}</p>
            <p><strong>Allergies:</strong> {userData.allergies}</p>
            <p><strong>Past Surgery:</strong> {userData.pastSurgery}</p>
            <p><strong>Other Medical Conditions:</strong> {userData.otherMedicalConditions}</p>
            <button
              className="bg-blue-500 text-white w-full py-2 mt-4 rounded hover:bg-blue-600"
              onClick={() => setIsEditing(true)}
            >
              Edit Information
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="mb-4 w-full p-2 border border-gray-300 rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="emergencyContact"
              placeholder="Emergency Contact"
              className="mb-4 w-full p-2 border border-gray-300 rounded"
              value={formData.emergencyContact}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="bloodGroup"
              placeholder="Blood Group"
              className="mb-4 w-full p-2 border border-gray-300 rounded"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="allergies"
              placeholder="Allergies"
              className="mb-4 w-full p-2 border border-gray-300 rounded"
              value={formData.allergies}
              onChange={handleChange}
            />
            <input
              type="text"
              name="pastSurgery"
              placeholder="Past Surgery"
              className="mb-4 w-full p-2 border border-gray-300 rounded"
              value={formData.pastSurgery}
              onChange={handleChange}
            />
            <input
              type="text"
              name="otherMedicalConditions"
              placeholder="Other Medical Conditions"
              className="mb-4 w-full p-2 border border-gray-300 rounded"
              value={formData.otherMedicalConditions}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white w-full py-2 mt-2 rounded hover:bg-gray-600"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
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

export default UserDashboard;
