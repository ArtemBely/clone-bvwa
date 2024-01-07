import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://137.184.45.201';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const userToken = localStorage.getItem('Bearer');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('Bearer');
    fetch(`${API_BASE_URL}/api/v1/users/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token} `
      }
    })
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        setError(error.message);
        navigate('/error', { state: { error: error.message } });
      });
  }, []);
  const handleEditUser = (user) => {
    navigate('/useredit', { state: { user } }); // Redirect to the user edit page
  };

  const handleClose = () => {
    navigate('/products'); // Redirect to the products page
  };

  return (
    <div className="admin-container">
      <div className="admin-window">
        <h2>Admin Page</h2>
        <button onClick={handleClose} className="close-button">Close</button>
        <div className="users-list">
          {users.map((user, index) => (
            <div key={index} className="user-details">
              <h3>User Details:</h3>
              <p>Name: {user.name}</p>
              <p>Surname: {user.surname}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Date of birth:{user.dateofbirth}</p>

              {/* Include other fields as necessary */}
              <button onClick={() => handleEditUser(user)} className="edit-user-button">
                Edit User
              </button>
              <hr/>
            </div>
          ))}
        </div>
      </div>

      <div className="questions" >
        <button className="button questionsNur" onClick={() => window.location.href = 'http://3.67.148.91'}>
          Chat
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
