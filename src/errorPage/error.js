import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
    const location = useLocation();
    const error = location.state?.error || 'Unknown error';

    return (

        
        <div className="error-container">
            <p1>
                ERROR: 404 !!!!<br/>
                HE-HE-HE-HE-HE-HE-HE-HE
            </p1>
            <div className="error-window">
                <h2>Error Occurred</h2>
                <p>{error}</p>
                {/* Back button or other navigation options */}
            </div>
        </div>
    );
};

export default ErrorPage;
