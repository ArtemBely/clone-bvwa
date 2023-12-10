import React, { useState } from 'react';

const LoginPage = ({ onBack, onRegister }) => {
  const [loginResponse, setLoginResponse] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (event) => {
    event.preventDefault();

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
        window.location.href = '/products';

      } else {
        console.error('Ошибка аутентификации:', await response.text());

      }
    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };

  return (
    <div className="login-container">
      <form method="POST" onSubmit={handleLogin}>
        <div className="login-window">
          <h2>Login window</h2>
          <input name="email" type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="submit-button">Login</button>
          <button className="register-button" ><a href="/register">Register</a></button>
          <br />
          <button onClick={onBack} className="back-button">Back</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
