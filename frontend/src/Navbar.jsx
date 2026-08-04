import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navContainerClasses = "flex justify-between items-center p-4 bg-slate-900 text-white";
    const brandClasses = "text-2xl font-bold text-emerald-400 hover:text-emerald-300";
    const linkGroupClasses = "flex items-center gap-6";
    const linkClasses = "text-slate-300 hover:text-white transition-colors font-medium";
    const welcomeTextClasses = "text-slate-400 italic";
    const logoutBtnClasses = "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold transition-colors";

    const { isLoggedIn, setIsLoggedIn, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                credentials: "include"
            });

            if (response.ok) {
                setIsLoggedIn(false);
                navigate('/login');
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <nav className={navContainerClasses}>
            <Link to="/" className={brandClasses}>HireWire</Link>

            {!isLoggedIn ? (
                <div className={linkGroupClasses}>
                    <Link to="/login" className={linkClasses}>Login</Link>
                    <Link to="/register" className={linkClasses}>Register</Link>
                </div>
            ) : (
                <div className={linkGroupClasses}>
                    <span className={welcomeTextClasses}>Hello, {user?.username}</span>
                    <Link to="/dashboard" className={linkClasses}>Dashboard</Link>
                    <button onClick={handleLogout} className={logoutBtnClasses}>
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}