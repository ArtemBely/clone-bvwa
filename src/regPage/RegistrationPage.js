import React, { useEffect, useState } from 'react';

const RegisterPage = ({ onRegister }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [dateofbirth, setDateofbirth] = useState('');
  const [token, setToken] = useState(localStorage.getItem('Bearer ') || '');

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('Bearer') || '');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      // Выполнить запрос к API
      const response = await fetch('/api/v1/auth/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Другие необходимые заголовки
        },
        body: JSON.stringify({
          email,
          password,
          name,
          surname,
          phone,
          dateofbirth
        })
      });


      const data = await response.json();

      if (response.ok) {

        localStorage.setItem('Bearer', data.token);
        window.location.href = '/products';

        // Дополнительные действия после успешной аутентификации, например, перенаправление
      } else {
        // Обработка ошибок аутентификации
        console.error('Ошибка аутентификации:', data);
      }
    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };



  return (
    <div className="register-window">
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <input name="name" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input name="surname" type="text" placeholder="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
        <input name="phone" type="tel" placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input name='dateofbirth' type="date" placeholder="dateofbirth" value={dateofbirth} onChange={(e) => setDateofbirth(e.target.value)} />
        <input name="email" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
