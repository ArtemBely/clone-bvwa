import React, { useState } from 'react';

const errorPage = ({ onBack, onRegister }) => {
    return (
        <div className="error-container">
            <form method="POST" onSubmit={handleLogin}>
                <div className="error-window">

                    <h2>IDI NAHUJ EBLAN</h2>
                    <p>Oshibka sosi huj</p>

                </div>
            </form>
        </div>
    );
};

export default errorPage;