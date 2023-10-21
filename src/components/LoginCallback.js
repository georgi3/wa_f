import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import {processUserData} from "../utils/apiUtils";

async function fetchUserProfile(accessToken) {
    const endpoint = '/api/users/profile';
    const headers = { "Authorization": `Bearer ${accessToken}` };
    const response = await fetch(endpoint, { headers });
    return await response.json();
}
export default function LoginCallback() {
    const { login } = useAuth();
    const [token, setToken] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const extractedToken = queryParams.get('token');
        if (extractedToken) {
            setToken(extractedToken);
        }
    }, [location]);

    useEffect(() => {
        if (token) {
            const returnUrl = sessionStorage.getItem('returnUrl') || '/';
            sessionStorage.removeItem('returnUrl');
            console.log(returnUrl)
            async function getUserProfile() {
                try {
                    const data = await fetchUserProfile(token);
                    await login(processUserData(data));
                    navigate(returnUrl);
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            }
            getUserProfile();
        }
    }, [token, navigate]);
    // Add a loader instead
    return <div>Processing login...</div>;
}

