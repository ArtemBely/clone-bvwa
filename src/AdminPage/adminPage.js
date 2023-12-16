import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add necessary headers, e.g., for authorization
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
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
        <div className="users-list">
          {users.map((user, index) => (
            <div key={index} className="user-details">
              <h3>User Details:</h3>
              <p>ID: {user.id}</p>
              <p>Name: {user.name}</p>
              <p>Surname: {user.surname}</p>
              <p>Email: {user.email}</p>
              <p>Username: {user.username}</p>
              <p>Role: {user.role}</p>
              {/* Include other fields as necessary */}
              <button onClick={() => handleEditUser(user)} className="edit-user-button">
                Edit User
              </button>
            </div>
          ))}
        </div>
        <button onClick={handleClose} className="close-button">Close</button>
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
