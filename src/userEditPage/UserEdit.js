import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


const UserEdit = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь можно добавить логику проверки пароля
        if (user.password === user.confirmPassword) {
            // Отправить данные
            console.log('User data submitted:', user);
        } else {
            alert('Пароли не совпадают');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                type="text"
                name="surname"
                value={user.surname}
                onChange={handleChange}
                placeholder="Surname"
            />
            <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Phone"
            />
            <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
            />
            <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
            />
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default UserEdit;
