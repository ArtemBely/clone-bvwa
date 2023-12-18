import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UserEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state?.user; // Assume this includes the user ID

    // Initial state now includes the ID
    const [user, setUser] = useState({
        id: userData?.id || null,
        name: userData?.name || '',
        surname: userData?.surname || '',
        email: userData?.email || '',
        phone: userData?.phone || ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for user ID
        if (!user.id) {
            setError('No user ID provided for update');
            return;
        }

        const token = localStorage.getItem('Bearer');
        fetch(`/api/v1/user/${user.id}`, { // Use user.id in the API endpoint
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: user.name,
                surname: user.surname,
                email: user.email,
                phone: user.phone,
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert('User data successfully updated');
                navigate('/admin'); // Navigate to the user profile page or elsewhere
            })
            .catch(error => {
                setError(error.toString());
                alert('Error updating user: ' + error.toString());
            });
    };

    return (
        <div>
            <h2>Edit User</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={user.name} onChange={handleChange} />
                </label>
                <label>
                    Surname:
                    <input type="text" name="surname" value={user.surname} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={user.email} onChange={handleChange} />
                </label>
                <label>
                    Phone:
                    <input type="tel" name="phone" value={user.phone} onChange={handleChange} />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default UserEdit;
