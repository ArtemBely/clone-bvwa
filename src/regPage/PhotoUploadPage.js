// PhotoUploadPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PhotoUploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { userId } = useParams(); // Получаем userId из URL параметра
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadClick = async () => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('photo', selectedFile);

        try {
            const token = localStorage.getItem('Bearer'); // Получаем токен из localStorage
            if (!token) {
                alert('You are not authenticated. Please login.');
                navigate('/login'); // Перенаправление на страницу входа
                return;
            }


            const response = await fetch(`/api/v1/user/${userId}/photo`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` // Добавляем токен в заголовки запроса
                },
                body: formData,
            });

            if (response.ok) {
                // Здесь может быть логика обновления состояния или перенаправления
                alert('Photo uploaded successfully');
                navigate('/products'); // Перенаправление на страницу продуктов после загрузки
            } else {
                alert('Failed to upload photo. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('An error occurred while uploading the photo.');
        }
    };

    return (
        <div className='upload-photo-container'>
            <h2>Upload your photo</h2>
            <input type="file" className='photo-input' onChange={handleFileChange} />
            <button className="upload-btn" onClick={handleUploadClick}>Upload</button>
            <label className="input-file"></label>
        </div>
    );
};

export default PhotoUploadPage;
