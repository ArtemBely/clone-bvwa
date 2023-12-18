import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/v1/users?email=${email}&name=${name}&surname=${surname}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Добавьте необходимые заголовки, например, для авторизации
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const userData = await response.json();
      setFoundUser(userData);
      console.log('Found user:', userData);
    } catch (error) {
      console.error('Error searching for user:', error);
    }
  };

  const handleEditUser = () => {
    navigate('/useredit', { state: { user: foundUser } }); // Перенаправление на страницу редактирования пользователя
  };

  const handleClose = () => {
    navigate('/products'); // Перенаправление на страницу продуктов
  };

  return (
    <div className="admin-container">
      <div className="admin-window">
        <h2>Admin Page</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
          <button onClick={handleClose} className="close-button">Close</button>
        </form>

        {foundUser && (
          <div className="user-details">
            <h3>User Details:</h3>
            <p>Name: {foundUser.name}</p>
            <p>Surname: {foundUser.surname}</p>
            <p>Email: {foundUser.email}</p>
            <button onClick={handleEditUser} className="edit-user-button">
              Edit User
            </button>
          </div>
        )}
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
