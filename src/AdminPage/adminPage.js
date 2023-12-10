import React, { useState } from 'react';
import EditUser from '../UserPage/EditUser';

const AdminPage = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const token = localStorage.getItem('Bearer ') || '';

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/v1/users?email=${email}&name=${name}&surname=${surname}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          // Другие необходимые заголовки, такие как авторизация с помощью токена
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const userData = await response.json();
      setFoundUser(userData);
      console.log('Found user:', userData);
      // Дополнительные действия после успешного поиска пользователя
    } catch (error) {
      console.error('Error searching for user:', error);
    }
  };
  const handleEditUser = () => {
    // Перенаправление на страницу редактирования пользователя (EditUser)
    window.location.href = '/EditUser1234/EditUser'; // Измените путь на ваш нужный маршрут
  };


  return (
    <div className="admin-container">
      <div className="admin-window">
        <h2>Admin Page</h2>
        <form onSubmit={handleSearch}>
          <input name="name" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <input name="surname" type="text" placeholder="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
          <input name="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" className="search-button">
            Search
          </button>
          <button onClick={onClose} className="close-button">
            Close
          </button>
        </form>
        {foundUser && (
          <div className="user-details">
            <h3>User Details:</h3>
            <p>Name: {foundUser.name}</p>
            <p>Email: {foundUser.email}</p>
            <p>Surname: {foundUser.surname}</p>
            {/* Дополнительные данные о пользователе */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
