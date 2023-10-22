import React, { createContext, useContext, useState, useEffect } from "react";
export const AuthContext = createContext(null);
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Load user data from local storage on initial render
        const userData = localStorage.getItem("userData");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const login = (userData) => {
        if (userData && userData.token) { // Ensuring there's a token before setting the user
            setUser(userData);
            localStorage.setItem("userData", JSON.stringify(userData));
        } else {
            console.error('Invalid user data provided to login:', userData);
        }
    };
    const updateUser = (updatedData) => {
        // Ensure there's a user to update and new data provided is valid
        if (user && updatedData) {
            const newUserData = {...user, ...updatedData};
            setUser(newUserData);
            localStorage.setItem("userData", JSON.stringify(newUserData));
        } else {
            console.error('Invalid or no user data to update:', updatedData);
        }
    };

    const logout = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/accounts/logout/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setUser(null);
            localStorage.removeItem("userData");

            // Sign the user out from Google.
            const gapi = window.gapi;
            if (gapi && gapi.auth2) {
                const auth2 = gapi.auth2.getAuthInstance();
                if (auth2) {
                    auth2.signOut().then(() => {
                        console.log("User signed out of Google");
                    });
                }
            }
            if (!response.ok) {
                console.error("Failed to log out on the backend.");
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
