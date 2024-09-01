import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [role, setRole] = useState('user');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.33:3000/login', {
        password,
        role,
        [role === 'professional' ? 'doctorId' : 'aadharNumber']: identifier,
      });

      localStorage.setItem('token', response.data.token);

      if (role === 'user') {
        navigate('/dashboard');
      } else {
        navigate('/professional-dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed: ' + error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <select 
          className="mb-4 w-full p-2 border border-gray-300 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="professional">Medical Professional</option>
        </select>
        <input
          type="text"
          placeholder={role === 'user' ? 'Aadhaar Number' : 'Doctor ID'}
          className="mb-4 w-full p-2 border border-gray-300 rounded"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="mt-4 flex justify-between">
          <button
            className="text-blue-500"
            onClick={() => navigate('/signup-user')}
          >
            Signup as User
          </button>
          <button
            className="text-blue-500"
            onClick={() => navigate('/signup-professional')}
          >
            Signup as Professional
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
