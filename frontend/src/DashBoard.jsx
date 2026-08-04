import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DashBoard = () => {
    const containerClasses = "max-w-6xl mx-auto p-8 text-slate-200 mt-10";
    const titleClasses = "text-3xl font-bold text-emerald-400 mb-8";
    const addLinkClasses = "bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded font-bold transition-colors inline-block mb-6";
    const gridClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    const cardClasses = "bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-xl flex flex-col justify-between";
    const companyClasses = "text-xl font-bold text-white mb-1";
    const positionClasses = "text-slate-300 mb-4";
    const statusClasses = "inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/20 self-start";
    const actionContainerClasses = "flex gap-3 mt-6 pt-4 border-t border-slate-700 w-full";
    const editBtnClasses = "flex-1 text-center bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 py-2 rounded transition-colors text-sm font-semibold";
    const deleteBtnClasses = "flex-1 text-center bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-2 rounded transition-colors text-sm font-semibold";
    const emptyStateClasses = "text-center py-20 bg-slate-900 rounded-lg border border-slate-800 shadow-inner mt-8";
    const emptyTitleClasses = "text-2xl font-bold text-slate-400 mb-2";
    const emptyTextClasses = "text-slate-500";

    const [applications, setApplications] = useState([]);

    const fetchApplication = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/applications", {
                credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                setApplications(data);
            }
        }
        catch (err) {
            console.log('Failed To Show Applications', err);
        }
    }

    useEffect(() => {
        fetchApplication();
    }, []);

    return (
        <div className={containerClasses}>
            <h1 className={titleClasses}>Your Job Applications</h1>
            <Link to="/add" className={addLinkClasses}>+ Add Application</Link>
            
            {applications.length === 0 ? (
                <div className={emptyStateClasses}>
                    <h2 className={emptyTitleClasses}>No applications found</h2>
                    <p className={emptyTextClasses}>You haven't added any job applications yet. Click the button above to get started!</p>
                </div>
            ) : (
                <div className={gridClasses}>
                    {applications.map((item) => {
                        return (
                            <div key={item._id} className={cardClasses}>
                                <div>
                                    <p className={companyClasses}>{item.company}</p>
                                    <p className={positionClasses}>{item.position}</p>
                                    <p className={statusClasses}>{item.status}</p>
                                </div>

                                {/* Upgraded UI Buttons */}
                                <div className={actionContainerClasses}>
                                    <Link to={`/edit/${item._id}`} className={editBtnClasses}>Edit</Link>
                                    <Link to={`/delete/${item._id}`} className={deleteBtnClasses}>Delete</Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default DashBoard;