import React, { useState, useEffect } from 'react';


const ProductCard = ({ id, title, description, price, image, onClick }) => {
  const [token, setToken] = useState(localStorage.getItem('Bearer') || '');
  const [isClicked, setIsClicked] = useState(false);

  const[nazev, setNazev] = useState('');
  const[popis, setPopis] = useState('');
  const[cena, setCena] = useState('');
  const[vyrobce, setVyrobce] = useState('');
  const[mnozstvi, setMnozstvi] = useState('');
  const[category, setCategory] = useState('');

  useEffect(() => {
    // Обновление состояния при изменении значения в localStorage
    const handleStorageChange = () => {
      setToken(localStorage.getItem('Bearer') || '');
    };

    // Подписка на событие изменения localStorage
    window.addEventListener('storage', handleStorageChange);

    // Отписка от события при размонтировании компонента
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


  const handleAddToCart = () => {
    setIsClicked(true); // Set the card as clicked
    onClick({ id, title, description, price, image });
  };
 /*   это для фетча данных из дб
 try {
    // Выполнить запрос к API
    const response = await fetch('http://localhost:8080/api/v1/auth/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Другие необходимые заголовки
      },
      body: JSON.stringify({
        nazev,
        popis,
        cena,
        vyrobce,
        mnozstvi,
        category
      })
    });
    const data = await response.json();

   if(response.ok) {
      // Сохранение токена в localStorage
      localStorage.setItem('Bearer ', data.token);
      // Дополнительные действия после успешной аутентификации, например, перенаправление
    } else {
      // Обработка ошибок аутентификации
      console.error('Ошибка аутентификации:', data);
    }
  } catch (error) {
    console.error('Ошибка запроса:', error);
  }
  
};
*/
  return (
    <div
      className={`product-card ${isClicked ? 'product-card-clicked' : ''}`}
      onClick={handleAddToCart}
    >
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Price: ${price}</p>
    </div>
  );
};
export default ProductCard;
