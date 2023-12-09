import React, { useState } from 'react';

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь вы можете обработать данные формы, например, отправить их на сервер
    console.log(formData);
  };

  return (
    <div>
      <h2>Форма обратной связи</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Электронная почта:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message">Сообщение:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default FeedbackForm;