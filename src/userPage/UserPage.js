import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [error, setError] = useState('');
    const token = localStorage.getItem('Bearer');
    const email = localStorage.getItem('UserEmail'); // Email is stored in local storage after login

    useEffect(() => {
        if (!token) {
            setError('Authentication token is missing.');
            navigate('/'); // Or your login route
            return;
        }

        if (!email) {
            setError('User email is missing.');
            navigate('/'); // Or some route to retrieve the email
            return;
        }

        // Fetch user details
        fetch(`/api/v1/user?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
                return fetch(`/api/v1/user/${data.id}/photo`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('You have no photo');
                }
                return response.blob();
            })
            .then(blob => {
                const imageUrl = URL.createObjectURL(blob);
                setPhotoUrl(imageUrl);
            })
            .catch(error => {


            });

    }, [navigate, email, token]);

    const handleButtonClick = () => {
        navigate('/products');
    };

    const handleAddPhotoClick = () => {
        // Предположим, что у вас есть идентификатор пользователя в состоянии 'user'
        if (user && user.id) {
            navigate(`/upload-photo/${user.id}`);
        } else {
            setError('User ID is missing.');
        }
    };

    return (
        <div>
            {user ? (
                <div className="user-details">
                    <h3>User Details:</h3>
                    {photoUrl && <img src={photoUrl} alt={`${user.name}'s profile`} className='profilePhoto' />}
                    <p>Name: {user.name}</p>
                    <p>Surname: {user.surname}</p>
                    <p>Email: {user.email}</p>
                    <p>Date of Birth: {user.dateofbirth}</p>
                    {/* Include other fields as necessary */}
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
            {error && <p className="error-message">{error}</p>}
            <button className='back' onClick={handleButtonClick}>Go Back to Products</button>
            <button className='back' onClick={handleAddPhotoClick}>Add Photo</button>
        </div>
    );
}

export default UserPage;
