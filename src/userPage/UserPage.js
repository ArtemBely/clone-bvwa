import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserPage = ({ user }) => {
    const navigate = useNavigate(); // Hook for navigation

    const handleButtonClick = () => {
        // Example function to handle button click
        navigate('/products'); // Navigate to another page on button click
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Go back</button> {/* Button to trigger navigation */}
            <h1>User Profile</h1>
            <div>
                <img src={user.photo} alt={`${user.firstName} ${user.lastName}`} />
                <h2>{user.firstName} {user.lastName}</h2>
            </div>
        </div>
    );
};

export default UserPage;
