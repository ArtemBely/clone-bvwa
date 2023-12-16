import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const userToken = localStorage.getItem('Bearer');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('Bearer');
    fetch('api/v1/users/', {
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
              <p>Date of birth:{user.dateofbirth}</p>

              {/* Include other fields as necessary */}
              <button onClick={() => handleEditUser(user)} className="edit-user-button">
                Edit User
              </button>
              <hr />
            </div>
          ))}
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        height: '100px',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <button className="button questionsNur" onClick={() => window.location.href = 'http://localhost:8000'}>
          Chat
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
