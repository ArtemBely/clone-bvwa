/*import React, { useState, useEffect } from 'react';


const ProductCard = () => {
  // const [token, setToken] = useState(localStorage.getItem('Bearer') || '');
  // const [isClicked, setIsClicked] = useState(false);

  // const [nazev, setNazev] = useState('');
  // const [popis, setPopis] = useState('');
  // const [cena, setCena] = useState('');
  // const [vyrobce, setVyrobce] = useState('');
  // const [mnozstvi, setMnozstvi] = useState('');
  // const [category, setCategory] = useState('');

  // useEffect(() => {
  //   // Обновление состояния при изменении значения в localStorage
  //   const handleStorageChange = () => {
  //     setToken(localStorage.getItem('Bearer') || '');
  //   };

  //   // Подписка на событие изменения localStorage
  //   window.addEventListener('storage', handleStorageChange);

  //   // Отписка от события при размонтировании компонента
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);


  // const handleAddToCart = () => {
  //   setIsClicked(true); // Set the card as clicked
  //   onClick({ id, nazev, popis, vyrobce, cena, category, image });
  // };

  const [prod, setProd] = useState([]);
  const token = localStorage.getItem('Bearer ');

  try {
    fetch('http://localhost:8080/api/v1/products', {
      method: 'GET', // или 'POST', 'PUT' и т.д.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setProd(data);
      })
      .catch(error => {
        console.error('Ошибка аутентификации:', error);
      });

  } catch (error) {
    console.error('Ошибка запроса:', error);
  }


  return (
    <div
      className={'product-card-clicked'}
    // onClick={handleAddToCart}
    >
      {/* <img src={image} alt={title} />
    <h3>{nazev}</h3>
    <p>{popis}</p>
    <p>Price: ${cena}</p> }
      {prod.map((item, index) => (
        <li key={index}>
          <div>
            <h3>{item.nazev}</h3>
            <p>Description: {item.popis}</p>
            <p>Price: ${item.cena}</p>
          </div>
        </li>
      ))}
    </div>
  );
}
export default ProductCard;
*/

import React, { useState, useEffect } from 'react';

const ProductCard = () => {
  const [prod, setProd] = useState([]);
  const token = localStorage.getItem('Bearer');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Здесь можно обработать ошибку "token expired"
            console.error('Ошибка аутентификации: Токен устарел или недействителен');
            // Выполните здесь действия для обработки истекшего токена, например, перенаправление на страницу входа
          } else {
            throw new Error('Ошибка сервера');
          }
        }

        const data = await response.json();
        setProd(data);
      } catch (error) {
        console.error('Ошибка запроса:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className={'product-card-clicked'}>
      {prod.map((item, index) => (
        <li key={index}>
          <div>
            <h3>{item.nazev}</h3>
            <p>Description: {item.popis}</p>
            <p>Price: ${item.cena}</p>
          </div>
        </li>
      ))}
    </div>
  );
};

export default ProductCard;

