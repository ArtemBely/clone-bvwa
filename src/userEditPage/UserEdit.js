import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserEdit = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.password === user.confirmPassword) {
            fetch('/api/v1/user/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Include authorization token if required
                    // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
                },
                body: JSON.stringify(user)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('User data updated:', data);
                    alert('User data successfully updated');
                })
                .catch(error => {
                    setError(error.message);
                    navigate('/error', { state: { error: error.message } });
                });
        } else {
            alert('Пароли не совпадают');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* ... input fields ... */}
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default UserEdit;
