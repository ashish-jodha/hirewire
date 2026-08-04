import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const containerClasses = "max-w-md mx-auto mt-20 p-8 bg-slate-900 rounded-lg shadow-xl text-slate-200";
    const headingClasses = "text-3xl font-bold text-emerald-400 mb-6 text-center";
    const inputClasses = "w-full p-3 mb-4 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-emerald-400 transition-colors";
    const buttonClasses = "w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded transition-colors mt-2";

    const { setIsLoggedIn, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            username, 
            password
        };

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(newUser),
                credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                setIsLoggedIn(true);
                setUser(data.user);
                navigate('/dashboard');
            } else {
                setIsLoggedIn(false);
                setUser(null);
                alert("Login failed. Please check your credentials.");
            }
        } catch(err) {
            console.log(`Login Failed`, err);
        }
    }

    return (
        <div className={containerClasses}>
            <h2 className={headingClasses}>Login to HireWire</h2>
            
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder='Enter Your Name' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className={inputClasses}
                />
                <input 
                    type="password" 
                    placeholder='Enter Your Password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className={inputClasses}
                />
                <button type="submit" className={buttonClasses}> 
                    Submit 
                </button>
            </form>
        </div>
    )
}

export default Login;