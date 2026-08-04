import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const loadingContainerStyles = "min-h-screen flex items-center justify-center bg-gray-50";
    const loadingTextStyles = "text-xl font-semibold text-gray-700";

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/auth/me', {
                    credentials: "include"
                });

                if (response.status === 401) {
                    setIsLoggedIn(false);
                    setUser(null);
                } else if (response.status === 200) {
                    const data = await response.json();
                    setIsLoggedIn(true);
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuthorization();
    }, []);

    if (loading) {
        return (
            <div className={loadingContainerStyles}>
                <p className={loadingTextStyles}>Checking session...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}