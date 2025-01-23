import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://up34-backend.onrender.com/api/users', formData);
      setResponseMessage(res.data.message);
      setFormData({ name: '', email: '', number: '' });
    } catch (error) {
      setResponseMessage('Error submitting the form.');
      console.log(error);
    }
  };

  const handleusers = async (req,res) => {

     try {
      
      const res = await axios.get('https://up34-backend.onrender.com/api/users');
      // console.log(res.data.users);
      setUsers(res.data.users);
     } catch (error) {
      console.log(error);
     }
  }

  console.log(users)

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">User Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300" 
              required 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300" 
              required 
            />
          </div>
          <div>
            <label htmlFor="number" className="block text-gray-700">Number</label>
            <input 
              type="number" 
              id="number" 
              name="number" 
              value={formData.number} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300" 
              required 
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
        {responseMessage && <p className="mt-4 text-green-500">{responseMessage}</p>}
      </div>
      <button type="submit" onClick={handleusers} className=" w-[32%] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-5">
            Get Users
      </button>
      
      {users.length > 0 && (
        <div className='w-[38%]  mt-5 text-white flex flex-col items-start justify-start border-4 border-green-500 text-bold p-2'>
        {users.map((user) => (
          <div key={user._id}>
            <div className='flex gap-10 border-2 border-slate-300 mb-2 overflow-auto'>
              <p>{user.name}</p>
              <p>{user.email}</p>

            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

export default App;
