import React, { useState, useEffect } from 'react';

const ShoppingCart = ({ cartItems }) => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Функция подсчёта суммы и количества
  const getCartSummary = (items) => {
    const summary = items.reduce((acc, item) => {
      // Если товар уже есть в аккумуляторе, увеличиваем количество и сумму
      if (acc.items[item.id]) {
        acc.items[item.id].quantity += 1;
        acc.items[item.id].totalPrice += item.cena;
      } else {
        // Если товара ещё нет, добавляем его
        acc.items[item.id] = { ...item, quantity: 1, totalPrice: item.cena };
      }

      acc.totalQuantity += 1;
      acc.totalPrice += item.cena;

      return acc;
    }, { items: {}, totalQuantity: 0, totalPrice: 0 });

    // Получаем массив уникальных товаров
    const uniqueItems = Object.values(summary.items);
    return {
      uniqueItems,
      totalQuantity: summary.totalQuantity,
      totalPrice: summary.totalPrice,
    };
  };

  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    const summary = getCartSummary(updatedCartItems);
    setProducts(summary.uniqueItems);
    setTotalQuantity(summary.totalQuantity);
    setTotalPrice(summary.totalPrice);
    // Обновляем корзину в localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const clearCart = () => {
    // Очищаем корзину и localStorage
    setProducts([]);
    setTotalQuantity(0);
    setTotalPrice(0);
    localStorage.removeItem('cartItems');
  };

  const checkout = () => {
    // Генерируем текст для алерта
    const cartSummaryText = products.map(item => `${item.nazev} (x${item.quantity}): $${item.totalPrice}`).join('\n');
    const totalText = `Total Quantity: ${totalQuantity}\nTotal Price: $${totalPrice}`;

    // Отображаем алерт с информацией о заказе
    alert(`Your Order:\n${cartSummaryText}\n\n${totalText}`);
  };

  useEffect(() => {
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      const summary = getCartSummary(cartItems);
      setProducts(summary.uniqueItems);
      setTotalQuantity(summary.totalQuantity);
      setTotalPrice(summary.totalPrice);
    }
  }, [cartItems]);

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart">
        <h2>Shopping Cart</h2>
        {totalQuantity > 0 ? (
          <>
            <ul>
              {products.map((item, index) => (
                <li key={index}>
                  <div className='card2'>
                    <h3>{item.nazev} (x{item.quantity})</h3>
                    <p>Price: ${item.cena} each</p>
                    <p>Total: ${item.totalPrice}</p>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="shopping-cart-summary">
              <p>Total Quantity: {totalQuantity}</p>
              <p>Total Price: ${totalPrice}</p>
            </div>
            <button onClick={checkout}>Checkout</button>
            <button onClick={clearCart}>Clear Cart</button>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;