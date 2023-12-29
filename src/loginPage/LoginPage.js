import React, { useState } from 'react';

const LoginPage = ({ onBack }) => {
  const [loginResponse, setLoginResponse] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginResponse(''); // Clear previous responses

    try {
      const response = await fetch('/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('Bearer', data.token);
        localStorage.setItem('UserEmail', data.email);
        window.location.href = '/products';
      } else {
        const errorText = await response.text();
        console.error('Ошибка аутентификации:', errorText);
        setLoginResponse('Invalid email or password. Please try again.');
        alert('Invalid email or password. Please try again.'); // Display an alert
      }
    } catch (error) {
      console.error('Ошибка запроса:', error);
      setLoginResponse('An error occurred during the request. Please try again.');
      alert('An error occurred during the request. Please try again.'); // Display an alert
    }
  };

  return (
    <div className="login-container">
      <form method="POST" onSubmit={handleLogin}>
        <div className="login-window">
          <h2>Login window</h2>
          <input name="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="submit-button">Login</button>
          <button type="button" className="register-button" onClick={() => window.location.href = '/register'}>Register</button>
          <br />
          <button type="button" onClick={onBack} className="back-button">Back</button>
          {/* Display error message */}
          {loginResponse && <p className="error-message">{loginResponse}</p>}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
