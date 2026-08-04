import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteRoute = () => {
    const containerClasses = "flex justify-center items-center min-h-screen bg-slate-950 text-emerald-400 text-2xl font-bold animate-pulse";

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const deleteApplication = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/applications/${id}`, {
                    method: "DELETE",
                    credentials: "include"
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(`${data.message}`);
                    navigate('/dashboard');
                }
                else if (response.status === 401) {
                    const errorData = await response.json();
                    console.log(`${errorData.error}`);
                }
            }
            catch (err) {
                console.log(`Failed To delete application`, err);
            }
        }

        deleteApplication();
    }, [id, navigate]);

    return (
        <div className={containerClasses}>
            <p>Deleting Your Application...</p>
        </div>
    )
}

export default DeleteRoute;