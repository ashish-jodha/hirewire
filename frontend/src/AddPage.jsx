import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AddPage = () => {
    const containerClasses = "max-w-md mx-auto mt-20 p-8 bg-slate-900 rounded-lg shadow-xl text-slate-200";
    const headingClasses = "text-3xl font-bold text-emerald-400 mb-6 text-center";
    const formClasses = "flex flex-col";
    const inputClasses = "w-full p-3 mb-4 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-emerald-400 transition-colors";
    const selectClasses = "w-full p-3 mb-6 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-emerald-400 transition-colors text-slate-200";
    const buttonClasses = "w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded transition-colors";

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("Applied");

    const addApplication = async (e) => {
        e.preventDefault();

        try {
            const newApplication = {
                company,
                position,
                status
            }

            const response = await fetch('http://localhost:3000/api/applications', {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(newApplication),
                credentials: "include"
            });

            if (response.ok) {
                console.log('Application Successfully Added');
                navigate('/dashboard');
            }
        }
        catch (err) {
            console.log(`Application Couldn't be Added`, err);
        }
    }

    return (
        <div className={containerClasses}>
            <h2 className={headingClasses}>Add New Application</h2>
            <form onSubmit={addApplication} className={formClasses}>
                <input 
                    type="text" 
                    placeholder='Enter Company Name' 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)} 
                    className={inputClasses}
                />
                <input 
                    type="text" 
                    placeholder='Enter Position' 
                    value={position} 
                    onChange={(e) => setPosition(e.target.value)} 
                    className={inputClasses}
                />
                <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)} 
                    className={selectClasses}
                >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <button type="submit" className={buttonClasses}> 
                    Submit 
                </button>
            </form>
        </div>
    )
}

export default AddPage;