import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // State to hold user data
    const [error, setError] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('Bearer');

        fetch('/api/v1/users', {
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
            })
            .catch(error => {
                setError(error.message);
                navigate('/error', { state: { error: error.message } });
            });
    }, []);

    const handleButtonClick = () => {
        navigate('/products');
    };

    // Render user information if available
    return (
        <div>
            <button onClick={handleButtonClick}>Go back</button>
            <h1>User Profile</h1>
            {user ? (
                <div>
                    <img src={user.photo} alt={`${user.firstName} ${user.lastName}`} />
                    <h2>{user.firstName} {user.lastName}</h2>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
};

export default UserPage;
