import React, { useState } from 'react';

const AdminPage = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [foundUser, setFoundUser] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/v1/users?email=${email}&name=${name}&surname=${surname}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Other necessary headers, such as authorization using a token
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const userData = await response.json();
      setFoundUser(userData);
      console.log('Found user:', userData);
      // Additional actions after successfully finding the user
    } catch (error) {
      console.error('Error searching for user:', error);
    }
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
          <div> </div>
        </form>
        {foundUser && (
          <div className="user-details">
            <h3>User Details:</h3>
            <p>Name: {foundUser.name}</p>
            <p>Email: {foundUser.email}</p>
            <p>Surname: {foundUser.surname}</p>
            {/* Additional user data */}
          </div>

        )}
      </div>
      <div
        style={{
          backgroundColor: 'white',
          height: '100px',
          width: '100%',
          position: 'fixed',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button className="button questionsNur" onClick={() => window.location.href = 'http://localhost:8000'}>
          Chat
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
