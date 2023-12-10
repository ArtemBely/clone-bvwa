import React, { useState } from 'react';

const EditUser = () => {
  const [photo, setPhoto] = useState('');
  const token = localStorage.getItem('Bearer ') || ''; // Получение токена из localStorage

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert('Please select a photo');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('photo', photo);

      const response = await fetch('http://localhost:8080/api/v1/user/26/photo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Использование токена из localStorage
          // Другие необходимые заголовки, если требуются
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }

      const data = await response.json();
      console.log('Photo uploaded:', data);
      // Дополнительные действия после успешной загрузки фотографии
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div className="edit-user">
      <h2>Edit User</h2>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Upload Photo</button>
      </form>
    </div>
  );
};

export default EditUser;
