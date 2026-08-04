import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPage = () => {
    const containerClasses = "max-w-md mx-auto mt-20 p-8 bg-slate-900 rounded-lg shadow-xl text-slate-200";
    const headingClasses = "text-3xl font-bold text-emerald-400 mb-6 text-center";
    const formClasses = "flex flex-col";
    const inputClasses = "w-full p-3 mb-4 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-emerald-400 transition-colors";
    const selectClasses = "w-full p-3 mb-6 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-emerald-400 transition-colors text-slate-200";
    const buttonClasses = "w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded transition-colors";

    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("");
    
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedApplication = {
            company,
            position,
            status
        }

        try {
            const response = await fetch(`http://localhost:3000/api/applications/${id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(updatedApplication),
                credentials: "include"
            })

            if (response.ok) {
                console.log('Application Successfully Updated');
                navigate('/dashboard');
            }
            else if (response.status === 401) {
                console.log(`${response.error}`);
            }
        }
        catch (err) {
            console.log(`Server error Occured`, err);
        }
    }

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/applications/${id}`, {
                    credentials: "include"
                })

                if (response.ok) {
                    const data = await response.json();
                    setCompany(data.company);
                    setPosition(data.position);
                    setStatus(data.status);
                }
            }
            catch (err) {
                console.log(`Could not fetch the data`, err);
            }
        }

        fetchApplication();
    }, [id])

  return (
    <div className={containerClasses}>
        <h1 className={headingClasses}>Update Application</h1>
        <form onSubmit={handleSubmit} className={formClasses}>
            <input 
                type="text" 
                placeholder='Enter the title' 
                value={company} 
                onChange={(e) => setCompany(e.target.value)} 
                className={inputClasses}
            />
            <input 
                type="text" 
                placeholder='Enter the position' 
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

export default EditPage;